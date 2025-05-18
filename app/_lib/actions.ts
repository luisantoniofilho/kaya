"use server";

import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { z } from "zod";
import { productSchema, ProductType } from "../schemas/productSchema";
import { auth, signIn, signOut } from "./auth";
import { uploadImage } from "./blobActions";
import {
  addProduct,
  getProduct,
  getProducts,
  getUser,
  getUserProducts,
} from "./mongodb/mongodbActions";

export async function signInAction() {
  try {
    await signIn("google", { redirectTo: "/products" });
  } catch (error) {
    console.error("Sign in failed:", error);
  }
}

export async function signOutAction() {
  try {
    await signOut({ redirectTo: "/" });
  } catch (error) {
    console.error("Sign out failed: ", error);
  }
}

export async function addProductAction(formData: FormData) {
  try {
    const data = Object.fromEntries(
      Array.from(formData.entries()).filter(
        // Remove intern fields
        ([key]) => !key.startsWith("$ACTION_"),
      ),
    );

    const session = await auth();
    if (!session?.user?.email)
      return { error: "User not authenticated", data: null };

    const user = await getUser(session?.user?.email);
    const userId = user?._id.toHexString();
    if (!userId) return { error: "User ID not found", data: null };

    const productWithUserId = { ...data, userId };

    // Parse the object into the schema
    const result = productSchema.safeParse(productWithUserId);

    if (!result.success) {
      console.error(result.error.flatten());
      return { error: result.error.flatten(), data: null };
    }

    // Split the image and the product
    const { image, ...productParsed } = result.data;

    // Upload the image and take the url from vercel blob
    const { url: imageUrl } = await uploadImage(image as File);
    if (!imageUrl)
      return { error: "Erro ao fazer upload da imagem", data: null };

    // Add the image URL from blob store
    productParsed.imageUrl = imageUrl;

    await addProduct(productParsed);
    redirect("/products");
  } catch (error) {
    console.error("Error adding product: ", error);
    return { error: "Unexpected error while adding product", data: null };
  }
}

export default async function getProductAction(productId: string) {
  try {
    if (!ObjectId.isValid(productId))
      return { error: "Invalid product ID", data: null };

    const objectId = new ObjectId(productId);
    const product = await getProduct(objectId);

    return { data: product, error: null };
  } catch (error) {
    console.error("Error fetching product: ", error);
    return { error: "Failed to get product", data: null };
  }
}

export async function getProductsAction(): Promise<
  | ProductType[]
  | { error: z.inferFlattenedErrors<z.ZodArray<typeof productSchema>> }
> {
  const products = await getProducts();

  // Return the products with the id transformed from MongoDB ObjectID to HexString
  const productsWithStringId = products.map(({ _id, ...otherProperties }) => ({
    id: _id.toString(),
    ...otherProperties,
  }));

  // Parse the object array into the schema
  const result = z.array(productSchema).safeParse(productsWithStringId);

  if (!result.success) {
    console.error(result.error.flatten());
    return { error: result.error.flatten() };
  }

  const productsParsed = result.data;

  return productsParsed;
}

export async function getUserProductsAction() {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email)
      return { error: "User not authenticated", data: null };

    const user = await getUser(session.user.email);
    if (!user?._id) return { error: "User not found", data: null };

    // Array with user products
    const userProducts = await getUserProducts(user._id.toString());

    // Change the _id to id and convert it to string
    const userProductsWithStringId = userProducts.map(
      ({ _id, ...otherProperties }) => ({
        id: _id.toString(),
        ...otherProperties,
      }),
    );

    const result = z.array(productSchema).safeParse(userProductsWithStringId);

    if (!result.success) {
      console.error(result.error.flatten());
      return { error: result.error.flatten(), data: null };
    }

    const productsParsed = result.data;

    return productsParsed;
  } catch (error) {
    console.error("Error fetching user products: ", error);
    return {
      error: "Unexpected error while fetching user products",
      data: null,
    };
  }
}

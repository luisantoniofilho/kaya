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
  await signIn("google", { redirectTo: "/products" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function addProductAction(formData: FormData) {
  const data = Object.fromEntries(
    Array.from(formData.entries()).filter(
      // Remove intern fields
      ([key]) => !key.startsWith("$ACTION_"),
    ),
  );

  const session = await auth();
  if (!session?.user?.email) throw new Error("User not authenticated");

  // Take the user id
  const user = await getUser(session?.user?.email);
  // Get the user id
  const userId = user?._id.toHexString();
  if (!userId) return;

  const productWithUserId = { ...data, userId };

  // Parse the object into the schema
  const result = productSchema.safeParse(productWithUserId);

  if (!result.success) {
    console.error(result.error.flatten());
    return { error: result.error.flatten() };
  }

  // Split the image and the product
  const { image, ...productParsed } = result.data;

  // Upload the image and take the url from vercel blob
  const { url: imageUrl } = await uploadImage(image as File);

  // Add the image URL from blob store
  productParsed.imageUrl = imageUrl;

  await addProduct(productParsed);

  redirect("/products");
}

export default async function getProductAction(productId: string) {
  // Transform the productId into a MongoDB ObjectId
  const objectId = ObjectId.createFromHexString(productId);

  const product = await getProduct(objectId);
  return product;
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

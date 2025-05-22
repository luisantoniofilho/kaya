"use server";

import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { z } from "zod/v4";
import { getAuthenticatedUserEmail } from "../_helpers/getAuthenticatedEmail";
import { productSchema } from "../schemas/productSchema";
import { signIn, signOut } from "./auth";
import { deleteImage, uploadImage } from "./blobActions";
import {
  addProduct,
  deleteProduct,
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
  try {
    const data = Object.fromEntries(
      Array.from(formData.entries()).filter(
        // Remove intern fields
        ([key]) => !key.startsWith("$ACTION_"),
      ),
    );

    const userEmail = await getAuthenticatedUserEmail();

    const user = await getUser(userEmail);
    const userId = user?._id.toHexString();
    if (!userId) return { error: "User ID not found", data: null };

    const productWithUserId = { ...data, userId };

    // Parse the object into the schema
    const result = productSchema.safeParse(productWithUserId);

    if (!result.success) {
      console.error(result.error);
      return { error: z.prettifyError(result.error!), data: null };
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
    return { error: "Erro inesperado anunciando produto", data: null };
  }
}

export async function getProductAction(productId: string) {
  try {
    if (!ObjectId.isValid(productId))
      return { error: "Invalid product ID", data: null };

    const objectId = new ObjectId(productId);
    const product = await getProduct(objectId);

    return { data: product, error: null };
  } catch (error) {
    console.error("Error fetching product: ", error);
    return { error: "Erro ao buscar produto", data: null };
  }
}

export async function getProductsAction() {
  try {
    const products = await getProducts();
    const productsWithStringId = products.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }));

    const result = z.array(productSchema).safeParse(productsWithStringId);

    if (!result.success) {
      console.error(result.error);
      return { error: z.prettifyError(result.error!), data: null };
    }

    return { data: result.data, error: null };
  } catch (error) {
    console.error("Unexpected error in getProductsAction: ", error);
    return { data: null, error: "Erro inesperado procurando produtos" };
  }
}

export async function getUserProductsAction() {
  try {
    // Get the user email if it is authenticated
    const userEmail = await getAuthenticatedUserEmail();
    const user = await getUser(userEmail);
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
      console.error(result.error);
      return { error: z.prettifyError(result.error!), data: null };
    }

    const data = result.data;

    return { data };
  } catch (error) {
    console.error("Error fetching user products: ", error);
    return {
      error: "Erro inesperado buscando os produtos",
      data: null,
    };
  }
}

export async function deleteProductAction(productId: string) {
  try {
    const userEmail = await getAuthenticatedUserEmail();
    const user = await getUser(userEmail);

    const { data: product } = await getProductAction(productId);
    if (!product) return { error: "Produto não encontrado" };

    if (product.userId !== user?._id.toString())
      return { error: "Você não está autorizado a deletar esse  produto" };

    await deleteImage(product.imageUrl);

    const objProductIt = ObjectId.createFromHexString(productId);
    await deleteProduct(objProductIt);

    // Return true if delete is successful
    return { data: true, error: null };
  } catch (error) {
    console.error(error);
    return { error: "Erro desconhecido" };
  }
}

"use server";

import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { z } from "zod";
import { productSchema, ProductType } from "../schemas/productSchema";
import { signIn, signOut } from "./auth";
import { uploadImage } from "./blobActions";
import { addProduct, getProduct, getProducts } from "./mongodb/mongodbActions";

export async function signInAction() {
  await signIn("google", { redirectTo: "/products" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function addProductAction(formData: FormData) {
  // Remove intern fields
  const formDataEntries = Array.from(formData.entries()).filter(
    ([key]) => !key.startsWith("$ACTION_"),
  );

  // Split the image file and the other product details
  const { image: imageFile, ...rawProduct } =
    Object.fromEntries(formDataEntries);

  // Take the image url from vercel blob
  const { url: imagePath } = await uploadImage(imageFile as File);

  // Add the imagePath to the raw product
  rawProduct.imagePath = imagePath;

  // Parse the object into the schema
  const result = productSchema.safeParse(rawProduct);

  if (!result.success) {
    console.error(result.error.flatten());
    return { error: result.error.flatten() };
  }

  const productParsed = result.data;

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

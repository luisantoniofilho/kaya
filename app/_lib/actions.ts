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

  // Take the product
  const { ...rawProduct } = Object.fromEntries(formDataEntries);

  // Parse the object into the schema
  const result = productSchema.safeParse(rawProduct);

  if (!result.success) {
    console.error(result.error.flatten());
    return { error: result.error.flatten() };
  }

  // Take the product parsed
  const productParsed = result.data;

  // Upload the image and take the url from vercel blob
  const { url: imageUrl } = await uploadImage(productParsed.image as File);

  // Remove the image file
  delete productParsed.image;

  // Add the image URL in blob store
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

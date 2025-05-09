"use server";

import { redirect } from "next/navigation";
import { productSchema } from "../schemas/productSchema";
import { signIn, signOut } from "./auth";
import { uploadImage } from "./blobActions";
import { addProduct } from "./mongodb/mongodbActions";

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

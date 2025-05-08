"use server";

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

  // Parse the object into the schema
  const result = productSchema.safeParse(rawProduct);

  if (!result.success) {
    console.error(result.error.flatten());
    return { error: result.error.flatten() };
  }

  const productParsed = result.data;

  const blobImage = await uploadImage(imageFile as File);
  const imagePath = blobImage.url;

  console.log(imagePath);
  await addProduct(productParsed);
}

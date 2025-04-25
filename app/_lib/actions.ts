"use server";

import { signIn, signOut } from "../auth";
import { productSchema } from "../schemas/productSchema";

export async function signInAction() {
  await signIn("google", { redirectTo: "/products" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function addProductAction(formData: FormData) {
  const formDataEntries = Array.from(formData.entries()).filter(
    ([key]) => !key.startsWith("$ACTION_"),
  );
  // Remove intern fields

  const { image: imageFile, ...rawProduct } =
    Object.fromEntries(formDataEntries);

  // Parse the object into the schema
  const productParsed = productSchema.safeParse(rawProduct);

  if (!productParsed.success) {
    console.error(productParsed.error.flatten());
    return { error: productParsed.error.flatten() };
  }

  console.log(imageFile);
  // await addProduct(productParsed.data);
}

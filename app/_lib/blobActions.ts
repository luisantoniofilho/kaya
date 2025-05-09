"use server";

import { put } from "@vercel/blob";

export async function uploadImage(imageFile: File) {
  // Upload the product images to a storage
  const blob = await put(imageFile.name, imageFile, {
    access: "public",
    addRandomSuffix: true,
  });
  return blob;
}

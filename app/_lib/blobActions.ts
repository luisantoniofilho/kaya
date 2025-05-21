"use server";

import { del, put } from "@vercel/blob";

export async function uploadImage(imageFile: File) {
  // Upload the product images to a storage
  const blob = await put(imageFile.name, imageFile, {
    access: "public",
    addRandomSuffix: true,
  });
  return blob;
}

export async function deleteImage(imageUrl: string) {
  const blob = await del(imageUrl);

  return blob;
}

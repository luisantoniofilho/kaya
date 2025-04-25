import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  const blob = await put(file.name, file, {
    access: "public",
    contentType: file.type,
  });

  return NextResponse.json(blob);
}

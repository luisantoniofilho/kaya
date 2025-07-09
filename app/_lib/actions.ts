"use server";

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
  updateProduct,
} from "./neondb/neonActions";

/* //////////////////
// AUTH ACTIONS
*/ //////////////////

export async function signInAction() {
  // Initiates sign in with Google and redirects to products
  await signIn("google", { redirectTo: "/products" });
}

export async function signOutAction() {
  // Signs out and redirects to home
  await signOut({ redirectTo: "/" });
}

/* //////////////////
// PRODUCT ACTIONS
*/ //////////////////

// CREATE

export async function addProductAction(formData: FormData) {
  // Converts form data to object and removes internal fields
  const data = Object.fromEntries(
    Array.from(formData.entries()).filter(
      ([key]) => !key.startsWith("$ACTION_"),
    ),
  );

  // Gets the authenticated user's ID
  const userEmail = await getAuthenticatedUserEmail();
  const user = await getUser(userEmail);
  const userId = user?.id;

  if (!userId) return { error: "User ID not found", data: null };

  // Appends userId to product data
  const productWithUserId = { ...data, userId };

  // Validates the product data
  const result = productSchema.safeParse(productWithUserId);
  if (!result.success) {
    console.error(result.error);
    return { error: z.prettifyError(result.error), data: null };
  }

  // Extracts image file and remaining fields
  const { image, ...productParsed } = result.data;

  // Uploads the image and sets image URL
  const { url: imageUrl } = await uploadImage(image as File);
  if (!imageUrl) return { error: "Erro ao fazer upload da imagem", data: null };

  productParsed.imageUrl = imageUrl;

  // Stores the product in the database
  await addProduct(productParsed);

  // Redirect to product list
  redirect("/products");
}

// READ

export async function getProductAction(productId: number) {
  try {
    const product = await getProduct(productId);

    const result = productSchema.safeParse(product);
    if (!result.success) {
      console.error(result.error);
      return { error: z.prettifyError(result.error), data: null };
    }

    const { data: productParsed } = result;

    return { data: productParsed, error: null };
  } catch (error) {
    console.error("Error fetching product: ", error);
    return { error: "Erro ao buscar produto", data: null };
  }
}

export async function getProductsAction() {
  try {
    const products = await getProducts();

    // Validates the structure of all products
    const result = z.array(productSchema).safeParse(products);
    if (!result.success) {
      console.error(result.error);
      return { error: z.prettifyError(result.error), data: null };
    }

    return { data: result.data, error: null };
  } catch (error) {
    console.error("Unexpected error in getProductsAction: ", error);
    return { data: null, error: "Erro inesperado procurando produtos" };
  }
}

export async function getUserProductsAction() {
  try {
    // Gets authenticated user's ID
    const userEmail = await getAuthenticatedUserEmail();
    const user = await getUser(userEmail);
    if (!user?.id) return { error: "User not found", data: null };

    // Gets all products for this user
    const userProducts = await getUserProducts(user.id);

    // Validates structure
    const result = z.array(productSchema).safeParse(userProducts);
    if (!result.success) {
      console.error(result.error);
      return { error: z.prettifyError(result.error), data: null };
    }

    return { data: result.data };
  } catch (error) {
    console.error("Error fetching user products: ", error);
    return {
      error: "Erro inesperado buscando os produtos",
      data: null,
    };
  }
}

// UPDATE

export async function updateProductAction(formData: FormData) {
  try {
    // Converts form data to object and removes internal fields
    const rawProduct = Object.fromEntries(
      Array.from(formData.entries()).filter(
        ([key]) => !key.startsWith("$ACTION_"),
      ),
    );

    // Validates the product data
    const result = productSchema.safeParse(rawProduct);
    if (!result.success) {
      console.error(result.error);
      return { error: z.prettifyError(result.error), data: null };
    }

    const { data: editedProduct } = result;

    if (!editedProduct.id) {
      return {
        error: "ID do produto é obrigatório para atualização",
        data: null,
      };
    }

    // Gets authenticated user's credentials
    const userEmail = await getAuthenticatedUserEmail();
    const user = await getUser(userEmail);

    const { data: product } = await getProductAction(editedProduct.id);

    if (!product) {
      return {
        error: "Produto não encontrado",
        data: null,
      };
    }

    if (product.userId !== user?.id) {
      return {
        error: "Você não está autorizado a editar esse produto",
        data: null,
      };
    }

    await updateProduct(editedProduct);
    return { data: true };
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return { error: "Erro ao atualizar produto", data: null };
  }
}

// DELETE

export async function deleteProductAction(productId: number) {
  try {
    const userEmail = await getAuthenticatedUserEmail();
    const user = await getUser(userEmail);

    const { data: product } = await getProductAction(productId);
    if (!product) return { error: "Produto não encontrado" };

    // Checks if the user is authorized to delete the product
    if (product.userId !== user?.id)
      return { error: "Você não está autorizado a deletar esse produto" };

    if (!product.imageUrl)
      return { error: "Ocorreu um erro ao deletar produto!" };

    // Deletes associated image and product entry
    await deleteImage(product.imageUrl);
    await deleteProduct(productId);

    return { data: true };
  } catch (error) {
    console.error(error);
    return { error: "Erro desconhecido" };
  }
}

/* //////////////////
// USER ACTIONS
*/ //////////////////

export async function getUserAction(email: string) {
  try {
    const user = await getUser(email);
    if (!user) return { error: "User not found", data: null };
    return { data: user, error: null };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { error: "Erro ao buscar usuário", data: null };
  }
}

import { sql } from "./neonConfig";
import { ProductType } from "@/app/schemas/productSchema";
import { UserType } from "@/app/schemas/userSchema";

/* //////////////////
// COMMON FIELDS
*/ //////////////////

const BASE_PRODUCT_FIELDS = sql`
  id,
  title,
  description,
  category,
  price,
  image_url AS "imageUrl",
  contact_number AS "contactNumber",
  user_id AS "userId"
`;

/* //////////////////
// USER FUNCTIONS
*/ //////////////////

export async function addUser(user: UserType) {
  const result = await sql`
    INSERT INTO users(name, email)
    VALUES (${user.name}, ${user.email})
    RETURNING id
  `;

  const userId = result.at(0);
  if (!userId) throw new Error("Error inserting the user");
}

export async function getUser(userEmail: string) {
  const user = await sql`
    SELECT * FROM users
    WHERE email = ${userEmail}
  `;
  return user.at(0); // Can return undefined if not found
}

/* //////////////////
// PRODUCTS FUNCTIONS
*/ //////////////////

export async function addProduct(product: ProductType) {
  const result = await sql`
    INSERT INTO products(title, description, category, price, image_url, contact_number, user_id)
    VALUES (
      ${product.title},
      ${product.description},
      ${product.category},
      ${product.price},
      ${product.imageUrl},
      ${product.contactNumber},
      ${product.userId}
    )
    RETURNING id
  `;

  const productId = result.at(0)?.id;
  if (!productId) throw new Error("Unexpected error inserting the product");
}

export async function getProduct(productId: number) {
  const result = await sql`
    SELECT ${BASE_PRODUCT_FIELDS}
    FROM products
    WHERE id = ${productId}
  `;

  const product = result.at(0);
  if (!product) throw new Error("Product not found");

  return product;
}

export async function getProducts() {
  const products = await sql`
    SELECT ${BASE_PRODUCT_FIELDS}
    FROM products
  `;
  return products;
}

export async function getUserProducts(userId: number) {
  const userProducts = await sql`
    SELECT ${BASE_PRODUCT_FIELDS}
    FROM products
    WHERE user_id = ${userId}
  `;
  return userProducts;
}

export async function updateProduct(product: ProductType) {
  await sql`
    UPDATE products
    SET
      title = ${product.title},
      description = ${product.description},
      category = ${product.category},
      price = ${product.price},
      contact_number = ${product.contactNumber}
    WHERE id = ${product.id}
  `;
}

export async function deleteProduct(productId: number) {
  await sql`
    DELETE FROM products
    WHERE id = ${productId}
  `;
}

import { ProductType } from "@/app/schemas/productSchema";
import { UserType } from "@/app/schemas/userSchema";
import client from "./mongodbConfig";
import { ObjectId } from "mongodb";

// DATABASE
const db = client.db("kaya");

// COLLECTIONS
const usersCollection = db.collection("users");
const productsCollection = db.collection("products");

/* //////////////////
// USER FUNCTIONS
*/ //////////////////

export async function addUser(user: UserType) {
  // Add a user to the usersCollection
  const result = await usersCollection.insertOne(user);

  if (!result) throw new Error("User was not created");
}

export async function getUser(userEmail: string) {
  // Get the user with the userEmail
  const user = await usersCollection.findOne({ email: userEmail });

  return user;
}

/* //////////////////
// PRODUCTS FUNCTIONS
*/ //////////////////

export async function addProduct(product: ProductType) {
  // Insert the new product on the products collection
  await productsCollection.insertOne(product);
}

export async function getProduct(productId: ObjectId) {
  // Get a specific product with productId
  const product = await productsCollection.findOne({ _id: productId });

  return product;
}

export async function getProducts() {
  // Get all the products from productsCollection
  const products = await productsCollection.find({}).toArray();

  return products;
}

export async function getUserProducts(userId: string) {
  const userProducts = await productsCollection
    .find({ userId: userId })
    .toArray();

  return userProducts;
}

export async function deleteProduct(productId: ObjectId) {
  await productsCollection.deleteOne({ _id: productId });
}

import { ProductType } from "@/app/schemas/productSchema";
import { UserType } from "@/app/schemas/userSchema";
import client from "./mongodbConfig";

// Database
const db = client.db("kaya");

// Collections
const usersCollection = db.collection("users");
const productsCollection = db.collection("products");

export async function addUser(user: UserType) {
  const result = await usersCollection.insertOne(user);

  if (!result) throw new Error("User was not created");
}

export async function getUser(userEmail: string) {
  const user = await usersCollection.findOne({ email: userEmail });

  return user;
}

export async function addProduct(product: ProductType) {
  // Insert the new product on the products collection
  const result = await productsCollection.insertOne(product);
  console.log(
    `A document was inserted with the _id: ${result} ${result.insertedId}`,
  );
}

export async function getProducts() {
  const products = productsCollection.find({}).toArray();

  return products;
}

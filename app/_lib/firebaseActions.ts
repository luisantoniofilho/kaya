import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { ProductType } from "../schemas/productSchema";
import { db } from "./firebaseConfig";

export async function addProduct(product: ProductType) {
  await setDoc(doc(db, "products", product.title), {
    ...product,
  });
}

export async function getProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  const products = querySnapshot.docs.map((product) => product.data());
  return products;
}

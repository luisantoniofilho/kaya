import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { ProductType } from "../schemas/productSchema";

export async function addProduct(product: ProductType) {
  await setDoc(doc(db, "products", product.title), {
    ...product,
  });
}

export async function getProducts() {
  const q = query(collection(db, "products"));

  const querySnapshot = await getDocs(q);
  return querySnapshot;
}

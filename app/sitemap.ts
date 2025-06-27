import { MetadataRoute } from "next";
import { getProductsAction } from "./_lib/actions";
import { ProductType } from "./schemas/productSchema";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = "https://kayaoficial.vercel.app";
  const { data: products } = await getProductsAction();

  return [
    {
      url: baseURL,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    {
      url: `${baseURL}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    {
      url: `${baseURL}/products`,
      lastModified: new Date(),
    },
    ...(products ?? []).map((product: ProductType) => ({
      url: `${baseURL}/products/${product.id}`,
      lastModified: new Date(),
    })),
  ];
}

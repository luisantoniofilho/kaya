import { redirect } from "next/navigation";
import { auth } from "../_lib/auth";

export default async function getUserSession() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return session;
}

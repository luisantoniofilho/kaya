import { auth } from "../_lib/auth";

export async function getAuthenticatedUserEmail() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) throw new Error("User not authenticated");
  return email;
}

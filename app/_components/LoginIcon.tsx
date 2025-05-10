import Image from "next/image";
import { auth } from "../_lib/auth";
import { HeaderLink } from "./HeaderLink";

export async function LoginIcon() {
  const session = await auth();

  if (session)
    return (
      <HeaderLink href={"/account"}>
        <Image
          className="rounded-full"
          src={session.user?.image ?? "/default-avatar.png"}
          alt="User"
          width={25}
          height={25}
        />
      </HeaderLink>
    );
  return <HeaderLink href={"/login"}>Login</HeaderLink>;
}

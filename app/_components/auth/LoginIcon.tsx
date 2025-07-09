import Image from "next/image";
import { auth } from "../../_lib/auth";
import { DesktopLink } from "../layout/DesktopLink";

export async function LoginIcon() {
  const session = await auth();

  if (session)
    return (
      <DesktopLink href={"/account"}>
        <Image
          className="rounded-full"
          src={session.user?.image ?? "/default-avatar.png"}
          alt="User"
          width={25}
          height={25}
        />
      </DesktopLink>
    );

  return <DesktopLink href={"/login"}>Login</DesktopLink>;
}

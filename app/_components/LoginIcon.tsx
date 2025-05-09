import { Dispatch, SetStateAction } from "react";
import { HeaderLink } from "./HeaderLink";
import { useSession } from "next-auth/react";
import Image from "next/image";
import SpinnerMini from "./SpinnerMini";

export function LoginIcon({
  onClick,
}: {
  onClick?: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: session, status } = useSession();

  return (
    <HeaderLink href="/login">
      {status === "loading" ? (
        // Loading
        <SpinnerMini />
      ) : session ? (
        <Image
          className="rounded-full"
          src={session.user?.image ?? "/default-avatar.png"}
          alt="User"
          width={25}
          height={25}
          onClick={() => onClick?.((prev) => !prev)}
        />
      ) : (
        "Login"
      )}
    </HeaderLink>
  );
}

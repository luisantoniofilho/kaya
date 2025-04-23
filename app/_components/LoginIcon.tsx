import { Dispatch, SetStateAction } from "react";
import { HeaderLink } from "./HeaderLink";

export function LoginIcon({
  onClick,
}: {
  onClick?: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <HeaderLink onClick={() => onClick?.(false)} href="/userLogin">
      Login
    </HeaderLink>
  );
}

import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href: string;
  optionalClassname?: string;
  dataTest?: string;
};

export default function LinkButton({
  children,
  href,
  optionalClassname,
  dataTest,
}: ButtonProps) {
  return (
    <Link
      className={`mt-4 flex w-full cursor-pointer flex-col items-center rounded-2xl bg-cyan-600 px-4 py-2 text-center text-xl text-white transition-all hover:bg-cyan-700 hover:font-bold md:text-2xl ${optionalClassname}`}
      href={href}
      data-test={dataTest}
    >
      {children}
    </Link>
  );
}

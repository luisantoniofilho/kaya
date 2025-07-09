import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  type: "button" | "submit" | "reset";
  disable?: boolean;
  optionalClassname?: string;
  onClick?: () => void;
};

export default function Button({
  children,
  type,
  disable,
  optionalClassname,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`mt-4 flex w-full cursor-pointer flex-col items-center rounded-2xl px-4 py-2 text-center text-xl text-white transition-all hover:bg-cyan-700 hover:font-bold md:text-2xl ${optionalClassname} ${disable ? "bg-stone-800" : "bg-cyan-600"}`}
      type={type}
      disabled={disable ? disable : false}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

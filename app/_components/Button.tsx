import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  type: "button" | "submit" | "reset";
  disable?: boolean;
  onClick?: () => void;
};

export default function Button({
  children,
  type,
  disable,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`mt-4 w-full cursor-pointer rounded-2xl px-4 py-2 text-xl text-white transition-all hover:bg-cyan-700 hover:font-bold md:text-2xl ${disable ? "bg-stone-500" : "bg-cyan-600"}`}
      type={type}
      disabled={disable ? disable : false}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

import { ReactNode } from "react";

type InputProps = {
  type: string;
  placeholder?: string;
  name: string;
  optionalClassName?: string;
  children: ReactNode;
};

export default function Input({
  type,
  placeholder,
  name,
  optionalClassName,
  children,
}: InputProps) {
  return (
    <div>
      <label className="block font-medium text-gray-700">{children}</label>

      {type === "textarea" ? (
        <textarea
          required
          placeholder={placeholder}
          name={name}
          className={`w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${optionalClassName}`}
        />
      ) : (
        <input
          required
          type={type}
          placeholder={placeholder}
          className={`w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${optionalClassName}`}
        />
      )}
    </div>
  );
}

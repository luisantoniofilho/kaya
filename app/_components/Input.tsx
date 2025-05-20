import { ReactNode } from "react";

type InputProps = {
  type: string;
  placeholder?: string;
  name: string;
  optionalClassName?: string;
  accept?: string;
  min?: number;
  max?: number;
  size?: number;
  minLength?: number;
  maxLength?: number;
  children: ReactNode;
};

export default function Input({
  type,
  placeholder,
  name,
  optionalClassName,
  accept,
  minLength,
  min,
  maxLength,
  max,
  size,
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
          name={name}
          accept={accept}
          min={min}
          max={max}
          size={size}
          minLength={minLength}
          maxLength={maxLength}
          className={`w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${optionalClassName}`}
        />
      )}
    </div>
  );
}

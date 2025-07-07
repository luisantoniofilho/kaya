type SelectProps = {
  name: string;
  label: string;
  options: string[];
  defaultValue?: string;
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default function Select({
  name,
  label,
  options,
  defaultValue,
}: SelectProps) {
  return (
    <div>
      <label htmlFor={name} className="block font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-500"
        defaultValue={defaultValue ?? ""}
      >
        <option disabled value="">
          Selecione uma opção
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {capitalize(option)}
          </option>
        ))}
      </select>
    </div>
  );
}

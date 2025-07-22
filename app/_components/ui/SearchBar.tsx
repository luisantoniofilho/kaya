"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function SearchBar({
  defaultQuery = "",
}: {
  defaultQuery?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(defaultQuery);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (query) params.set("query", query);
    else params.delete("query");
    router.push(`?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSearch} className="relative mb-6 w-full max-w-lg">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar produtos..."
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500"
        data-test="search-input"
      />
      <button type="submit" className="absolute top-2.5 right-3 cursor-pointer">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
      </button>
    </form>
  );
}

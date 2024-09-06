import Search from "@/components/Search"
import SearchResults from "@/components/SearchResults"
import { Suspense } from "react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    page?: string;
  };
}) {
  const query = searchParams?.q || '';
  return (
    <div className="bg-white w-full h-screen text-black relative flex flex-col">
      <h2 className="p-1 absolute top-0 text-base w-full bg-gray-300 text-center">Buscador</h2>
      <Search placeholder="Buscar lugares..." />
      <Suspense key={query}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  )
}
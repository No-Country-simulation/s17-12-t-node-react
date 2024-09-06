import { BackArrow } from "@/components";
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
      <div className="p-2 absolute top-0 w-full bg-gray-300">
        <div className="absolute top-1"><BackArrow /></div>
        <h2 className="text-base text-center">Buscador</h2>
      </div>
      <Search placeholder="Buscar lugares..." />
      <Suspense key={query}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  )
}
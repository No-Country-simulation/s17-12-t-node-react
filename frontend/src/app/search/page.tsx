import { BackArrow } from "@/components";
import Search from "@/components/Search"
import SearchResults from "@/components/SearchResults"
import SearchResultsSkeleton from "@/ui/skeleton/searchResultsSkeleton";
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
      <div className="flex items-center p-4 absolute bg-FondoPrimary text-white top-0 w-full">
        <BackArrow />
        <h2 className="text-xl text-center mx-auto">Buscador</h2>
      </div>
      <Search placeholder="Buscar lugares..." />
      <Suspense key={query} fallback={<SearchResultsSkeleton />}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  )
}
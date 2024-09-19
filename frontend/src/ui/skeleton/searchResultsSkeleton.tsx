const SearchResultsSkeleton = () => {
  const skeletonArray = Array(5).fill(0)

  return (
    <div className="flex flex-col gap-2">
      {skeletonArray.map((_, index) => (
        <div key={index} className="flex border border-TextPrimary p-1 mx-4 gap-4 items-center animate-pulse">
          <div className="w-[100px] h-[62px] bg-FondoPrimary rounded-2xl"></div>

          <div className="w-full">
            <div className="w-3/4 h-6 bg-FondoPrimary rounded mb-2"></div>
            <div className="w-full h-4 bg-FondoPrimary rounded"></div>
            <div className="w-1/2 h-4 bg-FondoPrimary rounded mt-1"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SearchResultsSkeleton

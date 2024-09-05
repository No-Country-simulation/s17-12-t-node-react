import { Album } from "@/interfaces/album"
import Image from "next/image"

const BASE_URL = process.env.API_URL

type Props = {
  query: string
}

const SearchResults: React.FC<Props> = async ({ query }) => {
  const url = BASE_URL + '/album/search?q=' + query
  console.log(url);
  const data = await fetch(url)
  const results: Album[] = await data.json()
  console.log(results);

  return (
    <div className="flex flex-col gap-2">
      {results.length > 0 ? (
        <>
          {results.map((item) => (
            <div key={item.title} className="flex border border-gray-300 p-1 mx-4 gap-4 items-center">
              {item.photos[0] && (
                <Image src={item.photos[0].url} alt={item.photos[0].description} width={100} height={62} className="rounded-2xl" />
              )}
              <div>
                <h3 className="font-semibold text-xl mb-1">{item.title}</h3>
                {/* <div className="flex gap-1 flex-wrap">
                  {item.tags.slice(0, 2).map((tag) => (
                    <span className="rounded-2xl bg-gray-200 px-2" key={tag}>{tag}</span>
                  ))}
                </div> */}
                <span>{item.description}</span>
              </div>
            </div>
          ))}
        </>
      ) : (<>
      </>)}
    </div>
  )
}

export default SearchResults
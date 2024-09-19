import { AlbumFromFetch } from "@/interfaces/album"
import Image from "next/image"
import ReadOnlyEditor from "./LexicalEditor/ReadOnly"
import Link from "next/link"

const BASE_URL = process.env.API_URL

type Props = {
  query: string
}

const SearchResults: React.FC<Props> = async ({ query }) => {
  const url = BASE_URL + '/album/search?q=' + query
  const data = await fetch(url)
  const results: AlbumFromFetch[] = await data.json()

  return (
    <div className="flex flex-col gap-2">
      {results.length > 0 ? (
        <>
          {results.map((item) => (
            <Link href={'/album/' + item.id} key={item.id} className="flex border border-FondoPrimary p-1 mx-4 gap-4 items-center">
              {item.photos[0] && (
                <Image src={item.photos[0].url} alt={item.photos[0].description} width={100} height={62} className="rounded-2xl h-[62px]" />
              )}
              <div className="w-full h-20 overflow-hidden">
                <h3 className="font-semibold text-xl mb-1">{item.title}</h3>
                {/* <div className="flex gap-1 flex-wrap">
                  {item.tags.slice(0, 2).map((tag) => (
                    <span className="rounded-2xl bg-gray-200 px-2" key={tag}>{tag}</span>
                  ))}
                </div> */}
                <span>
                  {
                    item.description.includes('"root":')
                      ? <ReadOnlyEditor feed savedContent={item.description} />
                      : <>{item.description}</>
                  }
                </span>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <span className="mx-4">No se encontraron resultados</span>
      )}
    </div>
  )
}

export default SearchResults
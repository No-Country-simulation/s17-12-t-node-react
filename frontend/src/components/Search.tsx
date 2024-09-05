'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { IconSearch } from './icons'

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout>

    return (...args: Parameters<T>): void => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => fn(...args), delay)
    }
  }

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('q', term)
    } else {
      params.delete('q')
    }
    console.log(term)
    replace(`${pathname}?${params.toString()}`)
  }

  const debouncedFunction = debounce(handleSearch, 1000)

  return (
    <div className="relative flex mt-16 mx-3 mb-2">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="block w-full rounded-2xl border border-gray-400 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          debouncedFunction(e.target.value)
        }}
        defaultValue={searchParams.get('q')?.toString()}
      />
      <IconSearch className='absolute left-2 top-2' size={24} />
    </div>
  )
}

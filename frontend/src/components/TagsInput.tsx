import { useState } from "react"

interface Props {
  tags: string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
}

export const TagsInput: React.FC<Props> = ({ tags, setTags }) => {
  const [category, setCategory] = useState<string>("")

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value)
  }

  const handleCategoryKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()

      if (category.trim() !== "") {
        setTags((prevTags) => [...prevTags, category])
        setCategory("")
      }
    }
  }

  const handleDeleteCategory = (category: string) => {
    const newTags = tags.filter((tag) => tag !== category)
    setTags(newTags)
  }


  return (
    <div className="flex flex-col">
      <div className="flex items-end justify-between">
        <label htmlFor="tags">Categoría</label>
        <input
          className="border-b border-gray-400 focus-visible:outline-none"
          type="text"
          id="tags"
          name="tags"
          value={category}
          onChange={handleCategoryChange}
          onKeyDown={handleCategoryKeyPress}
        />
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <div key={index} className={`relative ${tag.includes(',') ? 'hidden' : ''}`}>
              {/* Arreglo provisorio para no mostrar el tag de ubicacion pero si enviarlo */}
              <span className="px-2 py-1 bg-blue-200 rounded-lg">{tag}</span>
              <button
                onClick={() => handleDeleteCategory(tag)}
                className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full w-4 h-4"
              >X</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
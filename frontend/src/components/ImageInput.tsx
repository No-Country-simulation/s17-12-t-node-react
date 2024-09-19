import { useState } from "react"

interface Props {
  url: string,
  descriptionPhoto: string
  saveDescription: (url: string, description: string) => void
}

const ImageDescription: React.FC<Props> = ({ url, descriptionPhoto, saveDescription }) => {
  const [showInput, setShowInput] = useState(false)
  const [description, setDescription] = useState(descriptionPhoto || "")

  const handleSave = () => {
    if (description.trim() !== "") {
      saveDescription(url, description)
    }
    setShowInput(!showInput)
  }

  //aca puedo hacer el delete image con el delete_token
  return (
    <>
      {showInput ? (
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Agregar descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-1"
          />
          <button onClick={handleSave} type="button" className="mt-2 bg-green-500 text-white p-2 rounded">Confirmar</button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowInput(!showInput)}
          className={`mt-2 bg-FondoPrimary ${description ? 'bg-cyan-600' : 'bg-green-500'} text-white p-2 rounded`}
        >{description ? 'Editar' : 'Agregar Descripción'}</button>
      )}
    </>
  )
}

export default ImageDescription

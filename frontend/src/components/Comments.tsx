'use client'
import { useState } from "react"
import { IconChat } from "@/components/icons"
import { SubmitButton } from "@/components/SubmitButton"
import Link from "next/link"
import { postCommentAction } from "@/actions/albumActions"
import { getUserById } from "@/actions/userActions"
import { Comment } from "@/interfaces/album"

interface CommentsProps {
  comments: Comment[]
  albumId: string,
  feed: boolean
}

const INITIAL_STATE = {
  userId: '',
  content: '',
}

export function Comments({ comments, albumId, feed }: CommentsProps) {
  const [showComments, setShowComments] = useState(!feed)
  const [newComment, setNewComment] = useState<Comment>(INITIAL_STATE)
  const [allComments, setAllComments] = useState(comments)
  const [success, setSuccess] = useState<string>("")
  const [error, setError] = useState<string>("")

  const toggleComments = () => {
    setShowComments(!showComments)
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment({ ...newComment, content: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const username = await getUserById(userId as string)
      const newBody = {
        username: username?.username,
        content: newComment.content
      }
      setAllComments([...allComments, newBody])
      const responseData = await postCommentAction(albumId, token, newComment.content)
      if (responseData) {
        setSuccess(responseData.message as string)
      }
      setNewComment(INITIAL_STATE)
    } catch (error: any) {
      setError('Error al comentar:' + error.message)
    }
  }

  return (
    <div className="relative">
      {feed && (
        <button type="button" onClick={toggleComments}>
          <IconChat className="cursor-pointer" />
        </button>
      )}
      {showComments && (
        <div className={`${feed ? 'absolute top-10 right-0 -left-[60px] min-w-[455px] w-[455px] h-max min-h-[250px] max-h-[500px] overflow-y-scroll bg-white border border-FondoPrimary shadow-lg z-10 rounded-lg p-4' : ''}`}>
          <div>
            <h3 className="text-lg font-semibold mb-2">Comentarios</h3>
            {allComments.length > 0 ? (
              <ul className="space-y-2">
                {allComments.map((comment) => (
                  <div key={comment._id || (comment.username + comment.content)} className="flex flex-col rounded-xl p-4 gap-2 border border-FondoPrimary">
                    <span><strong>{comment.username}</strong> dijo:</span>
                    <span>{comment.content}</span>
                  </div>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No hay comentarios.</p>
            )}
          </div>
          {feed && (
            <button type="button" onClick={() => setShowComments(!showComments)} className="absolute top-3 right-0 flex justify-center items-center text-lg font-bold bg-FondoPrimary text-white rounded-full size-7 cursor-pointer">x</button>
          )}
          {token ? (
            <form className="mt-4" onSubmit={handleSubmit}>
              <input
                type="text"
                value={newComment.content}
                onChange={handleChange}
                placeholder="Escribe un comentario..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              />
              <SubmitButton
                className="w-full mt-3 text-xl bg-FondoPrimary rounded h-12 text-white shadow-[0_4px_4px_0px_rgba(0,0,0,0.15)]"
                loadingText="Cargando..."
                text="Comentar"
              />
              {error && <p className="-mt-4 mx-4 text-end text-red-500 text-xs">{error}</p>}
              {success && <p className="-mt-4 mx-4 text-end text-green-500 text-xs">{success}</p>}
            </form>
          ) : (
            <Link href="/login" className="flex justify-center items-center mt-3 bg-FondoPrimary text-white w-full text-xl rounded h-12">
              Inicia Sesión/Registraté para comentar
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

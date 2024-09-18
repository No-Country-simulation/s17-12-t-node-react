'use client'
import { useEffect, useState } from "react"
import { IconChat } from "@/components/icons"
import { getAlbumById, postCommentAction } from "@/actions/albumActions"
import { SubmitButton } from "@/components/SubmitButton"
import { useFormState } from "react-dom"
import { Comment } from "@/interfaces/album"
import { getUserById } from "@/actions/userActions"

interface CommentsProps {
  comments: Comment[]
  albumId: string
}

const INITIAL_STATE = {
  data: null,
}

export function Comments({ comments, albumId }: CommentsProps) {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [allComments, setAllComments] = useState(comments)
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(true)

  let token = null
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token')
  }

  const postCommentActionComplete = postCommentAction.bind(null, albumId, token)

  const [formState, formAction] = useFormState(postCommentActionComplete, INITIAL_STATE)

  const toggleComments = () => {
    setShowComments(!showComments)
  }

  const fetchComments = async () => {
    try {
      const response = await getAlbumById(albumId)
      setAllComments(response.comments)
    } catch (error) {
      console.error("Error fetching comments:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserName = async (userId: string) => {
    if (!userNames[userId]) {
      try {
        const response = await getUserById(userId)
        setUserNames((prevNames) => ({
          ...prevNames,
          [userId]: response?.username as string,
        }))
      } catch (error) {
        console.error(`Error fetching user data for userId ${userId}:`, error)
      }
    }
  }

  useEffect(() => {
    if (newComment.trim() !== "" || formState.success) {
      fetchComments()
      setNewComment("")
    }
  }, [loading])

  useEffect(() => {
    allComments.forEach((comment) => {
      fetchUserName(comment.userId as string)
    })
  }, [])

  return (
    <div className="relative">
      <button type="button" onClick={toggleComments}>
        <IconChat className="cursor-pointer" />
      </button>
      {showComments && (
        <div className="absolute top-10 right-0 -left-[60px] min-w-[455px] w-[455px] h-max min-h-[250px] max-h-[500px] overflow-y-scroll bg-white border border-gray-300 rounded-lg p-4 shadow-lg z-10">
          <div>
            <h3 className="text-lg font-semibold mb-2">Comentarios</h3>
            {allComments.length > 0 ? (
              <ul className="space-y-2">
                {allComments.map((comment) => (
                  <div key={comment._id} className="flex flex-col rounded-xl p-4 gap-2 border">
                    <span><strong>{userNames[comment.userId as string] || "Usuario"}</strong> dijo:</span>
                    <span>{comment.content}</span>
                  </div>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No hay comentarios.</p>
            )}
          </div>
          <form className="mt-4" action={formAction}>
            <input
              type="text"
              id="comment"
              name="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
            <SubmitButton className="w-full mt-3 text-xl bg-FondoPrimary rounded h-12 text-white shadow-[0_4px_4px_0px_rgba(0,0,0,0.15)]" loadingText="Cargando..." text="Comentar" />
            {formState?.message && <p className="mt-2 mx-4 text-end text-red-500 text-xs">{formState?.message}</p>}
            {formState?.success && <p className="mt-2 mx-4 text-end text-green-500 text-xs">{formState?.success}</p>}
          </form>
        </div>
      )}
    </div>
  )
}

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { EditorState } from "lexical"
import { useEffect } from "react"

export default function OnChangePlugin({ onChange }: { onChange: (editorState: EditorState) => void }) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    const unregister = editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState)
    })

    return () => {
      unregister()
    }
  }, [editor, onChange])

  return null
}
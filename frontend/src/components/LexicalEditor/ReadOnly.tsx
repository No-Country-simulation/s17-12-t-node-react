import { $generateHtmlFromNodes } from '@lexical/html'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect, useState } from 'react'

function ConvertToHtml({ savedContent }: { savedContent: string }) {
  const [editor] = useLexicalComposerContext()
  const [htmlContent, setHtmlContent] = useState<string>('')

  useEffect(() => {
    editor.update(() => {
      const editorState = editor.parseEditorState(savedContent)
      const html = $generateHtmlFromNodes(editor, null)
      setHtmlContent(html)
    })
  }, [editor, savedContent])

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
}

const theme = {
}

const ReadOnlyEditor = ({ savedContent }: { savedContent: string }) => {
  const editorConfig = {
    namespace: 'ohmytrip description',
    nodes: [],
    theme: theme,
    onError(error: Error) {
      throw error
    },
  }

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <div className="editor-inner bg-[#868f7a8a]">
          <ConvertToHtml savedContent={savedContent} />
        </div>
      </div>
    </LexicalComposer>
  )
}

export default ReadOnlyEditor

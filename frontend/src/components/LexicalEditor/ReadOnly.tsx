'use client'
import { $generateHtmlFromNodes } from '@lexical/html'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect, useState } from 'react'

function ConvertToHtml({ savedContent, feed }: { savedContent: string, feed: boolean }) {
  const [editor] = useLexicalComposerContext()
  const [htmlContent, setHtmlContent] = useState<string>('')
  const [showAll, setShowAll] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      editor.update(() => {
        try {
          const editorState = editor.parseEditorState(JSON.parse(savedContent))
          editor.setEditorState(editorState)
          const html = $generateHtmlFromNodes(editor)
          setHtmlContent(() => html)
        } catch (error) {
          console.error('Error setting editor state:', error)
        } finally {
          setLoading(false)
        }
      })
    }
  }, [editor, savedContent, loading])



  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  const htmlParts = htmlContent.split('</p>')
  const displayedContent = showAll ? htmlContent : htmlParts.slice(0, 3).map(part => part + '</p>').join('')
  const displayedContentForFeed = htmlParts.slice(0, 2).map(part => part + '</p>').join('')

  return (
    <div className="relative">
      {loading ? (
        <div className="w-full h-28 bg-FondoPrimary rounded mb-2 animate-pulse"></div>
      ) : (
        <>
          {feed ? (
            <div className='flex flex-col gap-4' dangerouslySetInnerHTML={{ __html: displayedContentForFeed }} />
          ) : (
            <>
              <div className='flex flex-col gap-4' dangerouslySetInnerHTML={{ __html: displayedContent }} />
              <button type="button" onClick={toggleShowAll} className="mt-2 text-blue-500 font-bold text-center w-full">
                {showAll ? 'Ocultar' : 'Leer más'}
              </button>
            </>
          )}
        </>
      )}
    </div>
  )
}


const theme = {
}

const ReadOnlyEditor = ({ savedContent, feed }: { savedContent: string, feed: boolean }) => {
  const editorConfig = {
    namespace: 'ohmytrip description',
    nodes: [],
    theme: theme,
    onError(error: Error) {
      throw error
    },
    editable: typeof window !== 'undefined'
  }

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <div className="editor-inner">
          <ConvertToHtml feed={feed} savedContent={savedContent} />
        </div>
      </div>
    </LexicalComposer>
  )
}

export default ReadOnlyEditor

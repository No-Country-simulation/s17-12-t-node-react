import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import { $patchStyleText } from '@lexical/selection';
import { useCallback, useEffect, useRef, useState } from 'react';
import '../styles.css'

const LowPriority = 1;

function Divider() {
  return <div className="divider" />;
}

const FONT_FAMILY_OPTIONS: [string, string][] = [
  ['Arial', 'Arial'],
  ['Courier New', 'Courier New'],
  ['Georgia', 'Georgia'],
  ['Times New Roman', 'Times New Roman'],
  ['Trebuchet MS', 'Trebuchet MS'],
  ['Verdana', 'Verdana'],
];

function FontDropDown({
  editor,
  value,
  disabled = false,
  onChange
}: {
  editor: LexicalEditor;
  value: string;
  disabled?: boolean;
  onChange: (font: string) => void;

}): JSX.Element {
  const handleClick = useCallback(
    (option: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if (selection && $isRangeSelection(selection)) {
          // Aplica el estilo de la fuente seleccionada al texto seleccionado
          $patchStyleText(selection, { 'font-family': option });
          onChange(option); // Actualiza el estado de fontFamily
        }
      });
    },
    [editor, onChange],
  );

  return (
    <div className="dropdown">
      <button
        type='button'
        className={'toolbar-item'}
        disabled={disabled}
        aria-label="Formatting options for font family">
        <i className="format font" />
        <span className='text-xs self-end font-medium'>{value.split(' ')[0]}</span>
      </button>
      <div className="dropdown-content">
        {FONT_FAMILY_OPTIONS.map(([option, text]) => (
          <button
            type='button'
            key={option}
            onClick={() => handleClick(option)}
            className={`item ${value === option ? 'active' : ''}`}>
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [fontFamily, setFontFamily] = useState('Arial');

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));

      const nodes = selection.getNodes();
      if (nodes.length > 0) {
        const firstNode = nodes[0];
        const domNode = firstNode.getType() === 'text' ? firstNode.getLatest() : firstNode;

        // Verifica si domNode es un nodo DOM válido
        if (domNode instanceof HTMLElement) {
          const computedStyle = window.getComputedStyle(domNode);
          const currentFontFamily = computedStyle.fontFamily || 'Arial';
          setFontFamily(currentFontFamily);
        }
      }
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, $updateToolbar]);

  return (
    <div className="toolbar flex bg-[#B8BEB1] p-1 rounded-t-xl border-b border-slate-400 align-middle" ref={toolbarRef}>
      <button
        type='button'
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced"
        aria-label="Undo"
        title="Undo"
      >
        <i className="format undo" />
      </button>
      <button
        type='button'
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="toolbar-item"
        aria-label="Redo"
        title="Redo"
      >
        <i className="format redo" />
      </button>
      <Divider />
      <FontDropDown editor={editor} value={fontFamily} onChange={setFontFamily} />
      <button
        type='button'
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
        className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
        aria-label="Format Bold"
        title="Bold"
      >
        <i className="format bold" />
      </button>
      <button
        type='button'
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
        className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
        aria-label="Format Italics"
        title="Italic"
      >
        <i className="format italic" />
      </button>
      <button
        type='button'
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
        className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
        aria-label="Format Underline"
        title="Underline"
      >
        <i className="format underline" />
      </button>
      <button
        type='button'
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        }}
        className={'toolbar-item spaced ' + (isStrikethrough ? 'active' : '')}
        aria-label="Format Strikethrough"
        title="Strikethrough"
      >
        <i className="format strikethrough" />
      </button>
      <Divider />
      <button
        type='button'
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
        }}
        className="toolbar-item spaced"
        aria-label="Left Align"
        title="Left Align"
      >
        <i className="format left-align" />
      </button>
      <button
        type='button'
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
        }}
        className="toolbar-item spaced"
        aria-label="Center Align"
        title="Center Align"
      >
        <i className="format center-align" />
      </button>
      <button
        type='button'
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
        }}
        className="toolbar-item spaced"
        aria-label="Right Align"
        title='Right Align'
      >
        <i className="format right-align" />
      </button>
      <button
        type='button'
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
        }}
        className="toolbar-item"
        aria-label="Justify Align"
        title='justify'
      >
        <i className="format justify-align" />
      </button>
    </div>
  );
}

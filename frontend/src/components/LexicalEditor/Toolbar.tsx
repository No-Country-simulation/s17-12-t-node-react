import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $isTextNode,
  LexicalEditor,
} from 'lexical';
import { ChangeEvent, useState } from 'react';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_CHECK_LIST_COMMAND,
  REMOVE_LIST_COMMAND
} from "@lexical/list";

const blockTypeToBlockName = {
  bullet: "Bulleted List",
  number: "Numbered List",
  check: "Check List",
  paragraph: "Normal"
};

const Toolbar: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState<keyof typeof blockTypeToBlockName>(
    "paragraph"
  );

  const formatList = (listType) => {
    console.log(blockType);
    if (listType === "number" && blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      setBlockType("number");
    } else if (listType === "bullet" && blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
      setBlockType("bullet");
    } else if (listType === "check" && blockType !== "check") {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
      setBlockType("check");
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      setBlockType("paragraph");
    }
  };

  const applyTextFormat = (formatType: 'bold' | 'italic' | 'underline' | 'strikethrough') => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType);
      }
    });
  };

  const applyElementFormat = (formatType: 'left' | 'center' | 'right' | 'justify') => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, formatType);
  };

  const changeFontSize = (event: ChangeEvent<HTMLSelectElement>) => {
    const fontSize = event.target.value;
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.getNodes().forEach(node => {
          if ($isTextNode(node)) {
            // Aplicar el estilo del tamaño de fuente
            node.setStyle(`font-size: ${fontSize}px`);
          }
        });
      }
    });
  };

  const changeFontFamily = (event: ChangeEvent<HTMLSelectElement>) => {
    const fontFamily = event.target.value;
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.getNodes().forEach(node => {
          if ($isTextNode(node)) {
            // Aplicar el estilo de la fuente
            node.setStyle(`font-family: ${fontFamily}`);
          }
        });
      }
    });
  };

  return (
    <div className="toolbar">
      {/* Formatos de texto */}
      <button type='button' onClick={() => applyTextFormat('bold')}>Negrita</button>
      <button type='button' onClick={() => applyTextFormat('italic')}>Cursiva</button>
      <button type='button' onClick={() => applyTextFormat('underline')}>Subrayado</button>
      <button type='button' onClick={() => applyTextFormat('strikethrough')}>Tachado</button>

      {/* Alineación */}
      <button type='button' onClick={() => applyElementFormat('left')}>Alinear Izquierda</button>
      <button type='button' onClick={() => applyElementFormat('center')}>Centrar</button>
      <button type='button' onClick={() => applyElementFormat('right')}>Alinear Derecha</button>
      <button type='button' onClick={() => applyElementFormat('justify')}>Justificar</button>

      {/* Tamaño de fuente */}
      <label htmlFor="fontSize">Tamaño de letra:</label>
      <select id="fontSize" onChange={changeFontSize}>
        <option value="12">12</option>
        <option value="14">14</option>
        <option value="16">16</option>
        <option value="18">18</option>
        <option value="24">24</option>
        <option value="32">32</option>
      </select>

      {/* Familia de fuente */}
      <label htmlFor="fontFamily">Fuente:</label>
      <select id="fontFamily" onChange={changeFontFamily}>
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Verdana">Verdana</option>
      </select>

      <div className="toolbar">
        <button
          type='button'
          disabled={false}
          className={"toolbar-item spaced"}
          onClick={() => formatList("bullet")}
        >
          <span className="text">Bullet List</span>
        </button>
        <button
          type='button'
          disabled={false}
          className={"toolbar-item spaced"}
          onClick={() => formatList("number")}
        >
          <span className="text">Numbered List</span>
        </button>
        <button
          type='button'
          disabled={false}
          className={"toolbar-item spaced"}
          onClick={() => formatList("check")}
        >
          <span className="text">Check List</span>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;

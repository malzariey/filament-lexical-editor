/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {$createCodeNode} from '@lexical/code';
import {
    INSERT_CHECK_LIST_COMMAND,
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND,
} from '@lexical/list';

import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  $isQuoteNode,
  HeadingTagType,
} from '@lexical/rich-text';
import {$isAtNodeEnd, $patchStyleText, $setBlocksType} from '@lexical/selection';
import {$isTableSelection} from '@lexical/table';
import {$getNearestBlockElementAncestorOrThrow} from '@lexical/utils';
import {
    $createParagraphNode, $createTextNode,
    $getSelection,
    $isRangeSelection,
    $isTextNode, EditorThemeClasses,
    LexicalEditor,
} from 'lexical';

import {
  DEFAULT_FONT_SIZE,
  MAX_ALLOWED_FONT_SIZE,
  MIN_ALLOWED_FONT_SIZE,
} from './toolbar-context';
import {RangeSelection} from "lexical/LexicalSelection";
import {$createLinkNode, $isLinkNode} from "@lexical/link";

// eslint-disable-next-line no-shadow
export enum UpdateFontSizeType {
  increment = 1,
  decrement,
}

export const theme: EditorThemeClasses = {
    autocomplete: 'lexical__autocomplete',
    blockCursor: 'lexical__blockCursor',
    characterLimit: 'lexical__characterLimit',
    code: 'lexical__code',
    codeHighlight: {
        atrule: 'lexical__tokenAttr',
        attr: 'lexical__tokenAttr',
        boolean: 'lexical__tokenProperty',
        builtin: 'lexical__tokenSelector',
        cdata: 'lexical__tokenComment',
        char: 'lexical__tokenSelector',
        class: 'lexical__tokenFunction',
        'class-name': 'lexical__tokenFunction',
        comment: 'lexical__tokenComment',
        constant: 'lexical__tokenProperty',
        deleted: 'lexical__tokenProperty',
        doctype: 'lexical__tokenComment',
        entity: 'lexical__tokenOperator',
        function: 'lexical__tokenFunction',
        important: 'lexical__tokenVariable',
        inserted: 'lexical__tokenSelector',
        keyword: 'lexical__tokenAttr',
        namespace: 'lexical__tokenVariable',
        number: 'lexical__tokenProperty',
        operator: 'lexical__tokenOperator',
        prolog: 'lexical__tokenComment',
        property: 'lexical__tokenProperty',
        punctuation: 'lexical__tokenPunctuation',
        regex: 'lexical__tokenVariable',
        selector: 'lexical__tokenSelector',
        string: 'lexical__tokenSelector',
        symbol: 'lexical__tokenProperty',
        tag: 'lexical__tokenProperty',
        url: 'lexical__tokenOperator',
        variable: 'lexical__tokenVariable',
    },
    embedBlock: {
        base: 'lexical__embedBlock',
        focus: 'lexical__embedBlockFocus',
    },
    hashtag: 'lexical__hashtag',
    heading: {
        h1: 'lexical__h1',
        h2: 'lexical__h2',
        h3: 'lexical__h3',
        h4: 'lexical__h4',
        h5: 'lexical__h5',
        h6: 'lexical__h6',
    },
    hr: 'lexical__hr',
    image: 'lexical__editor-image',
    indent: 'lexical__indent',
    inlineImage: 'lexical__inline-editor-image',
    layoutContainer: 'lexical__layoutContainer',
    layoutItem: 'lexical__layoutItem',
    link: 'lexical__link',
    list: {
        checklist: 'lexical__checklist',
        listitem: 'lexical__listItem',
        listitemChecked: 'lexical__listItemChecked',
        listitemUnchecked: 'lexical__listItemUnchecked',
        nested: {
            listitem: 'lexical__nestedListItem',
        },
        olDepth: [
            'lexical__ol1',
            'lexical__ol2',
            'lexical__ol3',
            'lexical__ol4',
            'lexical__ol5',
        ],
        ul: 'lexical__ul',
    },
    ltr: 'lexical__ltr',
    mark: 'lexical__mark',
    markOverlap: 'lexical__markOverlap',
    paragraph: 'lexical__paragraph',
    quote: 'lexical__quote',
    rtl: 'lexical__rtl',
    table: 'lexical__table',
    tableAddColumns: 'lexical__tableAddColumns',
    tableAddRows: 'lexical__tableAddRows',
    tableCell: 'lexical__tableCell',
    tableCellActionButton: 'lexical__tableCellActionButton',
    tableCellActionButtonContainer:
        'lexical__tableCellActionButtonContainer',
    tableCellEditing: 'lexical__tableCellEditing',
    tableCellHeader: 'lexical__tableCellHeader',
    tableCellPrimarySelected: 'lexical__tableCellPrimarySelected',
    tableCellResizer: 'lexical__tableCellResizer',
    tableCellSelected: 'lexical__tableCellSelected',
    tableCellSortedIndicator: 'lexical__tableCellSortedIndicator',
    tableResizeRuler: 'lexical__tableCellResizeRuler',
    tableSelected: 'lexical__tableSelected',
    tableSelection: 'lexical__tableSelection',
    text: {
        bold: 'lexical__textBold',
        code: 'lexical__textCode',
        italic: 'lexical__textItalic',
        strikethrough: 'lexical__textStrikethrough',
        subscript: 'lexical__textSubscript',
        superscript: 'lexical__textSuperscript',
        underline: 'lexical__textUnderline',
        underlineStrikethrough: 'lexical__textUnderlineStrikethrough',
        lowercase: 'lexical__textLowercase',
        uppercase: 'lexical__textUppercase',
        capitalize: 'lexical__textCapitalize',
    },
};

/**
 * Calculates the new font size based on the update type.
 * @param currentFontSize - The current font size
 * @param updateType - The type of change, either increment or decrement
 * @returns the next font size
 */
export const calculateNextFontSize = (
  currentFontSize: number,
  updateType: UpdateFontSizeType | null,
) => {
  if (!updateType) {
    return currentFontSize;
  }

  let updatedFontSize: number = currentFontSize;
  switch (updateType) {
    case UpdateFontSizeType.decrement:
      switch (true) {
        case currentFontSize > MAX_ALLOWED_FONT_SIZE:
          updatedFontSize = MAX_ALLOWED_FONT_SIZE;
          break;
        case currentFontSize >= 48:
          updatedFontSize -= 12;
          break;
        case currentFontSize >= 24:
          updatedFontSize -= 4;
          break;
        case currentFontSize >= 14:
          updatedFontSize -= 2;
          break;
        case currentFontSize >= 9:
          updatedFontSize -= 1;
          break;
        default:
          updatedFontSize = MIN_ALLOWED_FONT_SIZE;
          break;
      }
      break;

    case UpdateFontSizeType.increment:
      switch (true) {
        case currentFontSize < MIN_ALLOWED_FONT_SIZE:
          updatedFontSize = MIN_ALLOWED_FONT_SIZE;
          break;
        case currentFontSize < 12:
          updatedFontSize += 1;
          break;
        case currentFontSize < 20:
          updatedFontSize += 2;
          break;
        case currentFontSize < 36:
          updatedFontSize += 4;
          break;
        case currentFontSize <= 60:
          updatedFontSize += 12;
          break;
        default:
          updatedFontSize = MAX_ALLOWED_FONT_SIZE;
          break;
      }
      break;

    default:
      break;
  }
  return updatedFontSize;
};





/**
 * Patches the selection with the updated font size.
 */
export const updateFontSizeInSelection = (
  editor: LexicalEditor,
  newFontSize: string | null,
  updateType: UpdateFontSizeType | null,
) => {
  const getNextFontSize = (prevFontSize: string | null): string => {
    if (!prevFontSize) {
      prevFontSize = `${DEFAULT_FONT_SIZE}px`;
    }
    prevFontSize = prevFontSize.slice(0, -2);
    const nextFontSize = calculateNextFontSize(
      Number(prevFontSize),
      updateType,
    );
    return `${nextFontSize}px`;
  };

  editor.update(() => {
    if (editor.isEditable()) {
      const selection = $getSelection();
      if (selection !== null) {
        $patchStyleText(selection, {
          'font-size': newFontSize || getNextFontSize,
        });
      }
    }
  });
};

export const updateFontSize = (
  editor: LexicalEditor,
  updateType: UpdateFontSizeType,
  input: HTMLInputElement,
) => {
  const inputValue = input.value;
  if (inputValue !== '') {
    const nextFontSize = calculateNextFontSize(Number(inputValue), updateType);
    updateFontSizeInSelection(editor, String(nextFontSize) + 'px', null);
    // @ts-ignore
      input.value = nextFontSize.toString();
  } else {
    updateFontSizeInSelection(editor, null, updateType);
  }
};

export const updateFontSizeByInputValue =  function (editor: LexicalEditor , inputValueNumber: number | null , input: HTMLInputElement) {
    if(inputValueNumber == null){
        return;
    }

    let updatedFontSize = inputValueNumber;

    if (inputValueNumber > MAX_ALLOWED_FONT_SIZE) {
        updatedFontSize = MAX_ALLOWED_FONT_SIZE;
        // @ts-ignore
        input.value = updatedFontSize.toString();

    } else if (inputValueNumber < MIN_ALLOWED_FONT_SIZE) {
        updatedFontSize = MIN_ALLOWED_FONT_SIZE;
        // @ts-ignore
        input.value = updatedFontSize.toString();

    }

    if (updatedFontSize != null) {
        updateFontSizeInSelection(editor,String(updatedFontSize) + 'px', null);
    }
};

export const formatParagraph = (editor: LexicalEditor) => {
  editor.update(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      $setBlocksType(selection, () => $createParagraphNode());
    }
  });
};

export const formatHeading = (
  editor: LexicalEditor,
  blockType: string,
  headingSize: HeadingTagType,
) => {
  if (blockType !== headingSize) {
    editor.update(() => {
      const selection = $getSelection();
      $setBlocksType(selection, () => $createHeadingNode(headingSize));
    });
  }
};

export const formatBulletList = (editor: LexicalEditor, blockType: string) => {
  if (blockType !== 'bullet') {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  } else {
    formatParagraph(editor);
  }
};

export const formatCheckList = (editor: LexicalEditor, blockType: string) => {
  if (blockType !== 'check') {
    editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
  } else {
    formatParagraph(editor);
  }
};

export const formatNumberedList = (
  editor: LexicalEditor,
  blockType: string,
) => {
  if (blockType !== 'number') {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  } else {
    formatParagraph(editor);
  }
};

export const formatQuote = (editor: LexicalEditor, blockType: string) => {
  if (blockType !== 'quote') {
    editor.update(() => {
      const selection = $getSelection();
      $setBlocksType(selection, () => $createQuoteNode());
    });
  }
};



export const formatCode = (editor: LexicalEditor, blockType: string) => {
  if (blockType !== 'code') {
    editor.update(() => {
      let selection = $getSelection();

      if (selection !== null) {
        if (selection.isCollapsed()) {
          $setBlocksType(selection, () => $createCodeNode());
        } else {
          const textContent = selection.getTextContent();
          const codeNode = $createCodeNode();
          selection.insertNodes([codeNode]);
          selection = $getSelection();
          if ($isRangeSelection(selection)) {
            selection.insertRawText(textContent);
          }
        }
      }
    });
  }
};

export const getSelectedNode =  function (selection : RangeSelection ) {
    const anchor = selection.anchor;
    const focus = selection.focus;
    const anchorNode = selection.anchor.getNode();
    const focusNode = selection.focus.getNode();
    if (anchorNode === focusNode) {
        return anchorNode;
    }
    const isBackward = selection.isBackward();
    if (isBackward) {
        return $isAtNodeEnd(focus) ? anchorNode : focusNode;
    } else {
        return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
    }
}
export const clearFormatting = (editor: LexicalEditor) => {
    formatParagraph(editor);
  editor.update(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection) || $isTableSelection(selection)) {
      const anchor = selection.anchor;
      const focus = selection.focus;
      const nodes = selection.getNodes();
      const extractedNodes = selection.extract();

      if (anchor.key === focus.key && anchor.offset === focus.offset) {
        return;
      }

      nodes.forEach((node, idx) => {
        // We split the first and last node by the selection
        // So that we don't format unselected text inside those nodes
        if ($isTextNode(node)) {
          // Use a separate variable to ensure TS does not lose the refinement
          let textNode = node;
          if (idx === 0 && anchor.offset !== 0) {
            textNode = textNode.splitText(anchor.offset)[1] || textNode;
          }
          if (idx === nodes.length - 1) {
            textNode = textNode.splitText(focus.offset)[0] || textNode;
          }
          /**
           * If the selected text has one format applied
           * selecting a portion of the text, could
           * clear the format to the wrong portion of the text.
           *
           * The cleared text is based on the length of the selected text.
           */
          // We need this in case the selected text only has one format
          const extractedTextNode = extractedNodes[0];
          if (nodes.length === 1 && $isTextNode(extractedTextNode)) {
            textNode = extractedTextNode;
          }

          if (textNode.__style !== '') {
            textNode.setStyle('');
          }
          if (textNode.__format !== 0) {
            textNode.setFormat(0);
            $getNearestBlockElementAncestorOrThrow(textNode).setFormat('');
          }
          node = textNode;
        } else if ($isHeadingNode(node) || $isQuoteNode(node) ) {
          node.replace($createParagraphNode(), true);
        } else if ( $isLinkNode(node)) {
            node.replace($createTextNode(node.getTextContent()), false);

        }

      });
    }
  });
};

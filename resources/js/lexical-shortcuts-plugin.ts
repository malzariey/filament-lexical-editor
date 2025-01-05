/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {TOGGLE_LINK_COMMAND} from '@lexical/link';
import {HeadingTagType} from '@lexical/rich-text';
import {
  COMMAND_PRIORITY_NORMAL,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  KEY_MODIFIER_COMMAND,
  LexicalEditor,
  OUTDENT_CONTENT_COMMAND,
} from 'lexical';

import {
  clearFormatting,
  formatBulletList,
  formatCheckList,
  formatCode,
  formatHeading,
  formatNumberedList,
  formatParagraph,
  formatQuote,
  updateFontSize,
  UpdateFontSizeType,
} from './utils';
import {
    isCapitalize,
    isCenterAlign,
    isClearFormatting,
    isDecreaseFontSize, isEndAlign,
    isFormatBulletList,
    isFormatCheckList,
    isFormatCode,
    isFormatHeading,
    isFormatNumberedList,
    isFormatParagraph,
    isFormatQuote,
    isIncreaseFontSize,
    isIndent,
    isInsertCodeBlock,
    isInsertLink,
    isJustifyAlign,
    isLeftAlign,
    isLowercase,
    isOutdent,
    isRightAlign, isStartAlign,
    isStrikeThrough,
    isSubscript,
    isSuperscript,
    isUppercase,
} from './shortcuts';

export function registerShortcuts(editor: LexicalEditor){
    const keyboardShortcutsHandler = (payload: KeyboardEvent) => {
    const event: KeyboardEvent = payload;

    if (isFormatParagraph(event)) {
        event.preventDefault();
        formatParagraph(editor);
    } else if (isFormatHeading(event)) {
        event.preventDefault();
        const {code} = event;
        const headingSize = `h${code[code.length - 1]}` as HeadingTagType;
        formatHeading(editor, null, headingSize);
    } else if (isFormatBulletList(event)) {
        event.preventDefault();
        formatBulletList(editor, null);
    } else if (isFormatNumberedList(event)) {
        event.preventDefault();
        formatNumberedList(editor, null);
    } else if (isFormatCheckList(event)) {
        event.preventDefault();
        formatCheckList(editor, null);
    } else if (isFormatCode(event)) {
        event.preventDefault();
        formatCode(editor, null);
    } else if (isFormatQuote(event)) {
        event.preventDefault();
        formatQuote(editor, null);
    } else if (isStrikeThrough(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
    } else if (isLowercase(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'lowercase');
    } else if (isUppercase(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'uppercase');
    } else if (isCapitalize(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'capitalize');
    } else if (isIndent(event)) {
        event.preventDefault();
        editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
    } else if (isOutdent(event)) {
        event.preventDefault();
        editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
    } else if (isCenterAlign(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
    } else if (isLeftAlign(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
    } else if (isRightAlign(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
    } else if (isJustifyAlign(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
    } else if (isStartAlign(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'start');
    } else if (isEndAlign(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'end');
    } else if (isSubscript(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript');
    } else if (isSuperscript(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript');
    } else if (isInsertCodeBlock(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
    } else if (isIncreaseFontSize(event)) {
        event.preventDefault();
        const editorShell = (event.target as HTMLElement).closest('.editor-shell');
        const fontSizeElement = (editorShell.querySelector('[x-ref="fontSize"]') as HTMLInputElement);
        updateFontSize(
            editor,
            UpdateFontSizeType.increment,
            fontSizeElement,
        );
    } else if (isDecreaseFontSize(event)) {
        event.preventDefault();
        const editorShell = (event.target as HTMLElement).closest('.editor-shell');
        const fontSizeElement = (editorShell.querySelector('[x-ref="fontSize"]') as HTMLInputElement);
        updateFontSize(
            editor,
            UpdateFontSizeType.decrement,
            fontSizeElement,
        );
    } else if (isClearFormatting(event)) {
        event.preventDefault();
        clearFormatting(editor);
    } else if (isInsertLink(event)) {
        event.preventDefault();
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }

    return false;
};

    return editor.registerCommand(
        KEY_MODIFIER_COMMAND,
        keyboardShortcutsHandler,
        COMMAND_PRIORITY_NORMAL,
    );

}








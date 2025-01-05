import {ElementFormatType} from "lexical";

export const MIN_ALLOWED_FONT_SIZE = 8;
export const MAX_ALLOWED_FONT_SIZE = 72;
export const DEFAULT_FONT_SIZE = 15;

const rootTypeToRootName = {
    root: 'Root',
    table: 'Table',
};
const FONT_FAMILY_OPTIONS: [string, string][] = [
    ['Arial', 'Arial'],
    ['Courier New', 'Courier New'],
    ['Georgia', 'Georgia'],
    ['Times New Roman', 'Times New Roman'],
    ['Trebuchet MS', 'Trebuchet MS'],
    ['Verdana', 'Verdana'],
];
export const blockTypeToBlockName = {
    bullet: 'Bulleted List',
    check: 'Check List',
    code: 'Code Block',
    h1: 'Heading 1',
    h2: 'Heading 2',
    h3: 'Heading 3',
    h4: 'Heading 4',
    h5: 'Heading 5',
    h6: 'Heading 6',
    number: 'Numbered List',
    paragraph: 'Normal',
    quote: 'Quote',
};

//disable eslint sorting rule for quick reference to toolbar state
/* eslint-disable sort-keys-fix/sort-keys-fix */
export const INITIAL_TOOLBAR_STATE = {
    none: false,
    bgColor: '#fff',
    blockType: 'paragraph' as keyof typeof blockTypeToBlockName,
    canRedo: false,
    canUndo: false,
    cannotRedo: true,
    cannotUndo: true,
    codeLanguage: '',
    elementFormat: 'left' as ElementFormatType,
    fontColor: '#000',
    fontFamily: 'Arial',
    // Current font size in px
    fontSize: `${DEFAULT_FONT_SIZE}px`,
    // Font size input value - for controlled input
    fontSizeInputValue: `${DEFAULT_FONT_SIZE}`,
    isBold: false,
    isCode: false,
    isImageCaption: false,
    isItalic: false,
    isLink: false,
    isRTL: false,
    isStrikethrough: false,
    isSubscript: false,
    isSuperscript: false,
    isUnderline: false,
    isLowercase: false,
    isUppercase: false,
    isCapitalize: false,
    rootType: 'root' as keyof typeof rootTypeToRootName,
};

<?php

namespace Malzariey\FilamentLexicalEditor\Enums;

enum ToolbarItem: string
{
    case UNDO = 'undo';
    case REDO = 'redo';
    case FONT_FAMILY = 'fontFamily';
    case NORMAL = 'normal';
    case H1 = 'h1';
    case H2 = 'h2';
    case H3 = 'h3';
    case H4 = 'h4';
    case H5 = 'h5';
    case H6 = 'h6';
    case BULLET = 'bullet';
    case NUMBERED = 'numbered';
    case QUOTE = 'quote';
    case CODE = 'code';
    case FONT_SIZE = 'fontSize';
    case BOLD = 'bold';
    case ITALIC = 'italic';
    case UNDERLINE = 'underline';
    case ICODE = 'icode';
    case LINK = 'link';
    case TEXT_COLOR = 'textColor';
    case BACKGROUND_COLOR = 'backgroundColor';
    case LOWERCASE = 'lowercase';
    case UPPERCASE = 'uppercase';
    case CAPITALIZE = 'capitalize';
    case STRIKETHROUGH = 'strikethrough';
    case SUBSCRIPT = 'subscript';
    case SUPERSCRIPT = 'superscript';
    case CLEAR = 'clear';
    case LEFT = 'left';
    case CENTER = 'center';
    case RIGHT = 'right';
    case JUSTIFY = 'justify';
    case START = 'start';
    case END = 'end';
    case INDENT = 'indent';
    case OUTDENT = 'outdent';
    //Horizontal Rule
    case HR = 'hr';
    case IMAGE = 'image';
    case DIVIDER = 'divider';
}

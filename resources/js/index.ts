import {
    $createHeadingNode,
    $createQuoteNode,
    $isHeadingNode,
    $isQuoteNode,
    HeadingNode,
    HeadingTagType,
    QuoteNode,
    registerRichText,
} from '@lexical/rich-text';
import {HashtagNode} from '@lexical/hashtag';

import {
    $createParagraphNode, $getRoot,
    $getSelection, $insertNodes,
    $isRangeSelection,
    createEditor,
    $isRootOrShadowRoot,
    EditorThemeClasses,
    ElementFormatType,
    FORMAT_ELEMENT_COMMAND,
    FORMAT_TEXT_COMMAND,
    INDENT_CONTENT_COMMAND,
    isDOMNode,
    isHTMLAnchorElement,
    LexicalEditor,
    OUTDENT_CONTENT_COMMAND,
    REDO_COMMAND, type TextFormatType,
    TextNode,
    UNDO_COMMAND, $isElementNode, CAN_UNDO_COMMAND, CAN_REDO_COMMAND,
} from 'lexical';


import {$getNearestNodeOfType, mergeRegister} from '@lexical/utils';
import {$isCodeNode, CODE_LANGUAGE_MAP, CodeNode} from '@lexical/code';
import {
    $getSelectionStyleValueForProperty,
    $isParentElementRTL,
    $patchStyleText,
    $setBlocksType
} from "@lexical/selection";

import {
    $isLinkNode,
    AutoLinkNode,
    LinkNode,
    TOGGLE_LINK_COMMAND
} from "@lexical/link";
import {
    $isListNode,
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    ListItemNode,
    ListNode,
    registerList
} from "@lexical/list";
import {createEmptyHistoryState, registerHistory} from "@lexical/history";
// @ts-ignore
import Coloris from "@melloware/coloris";

import {registerLexicalTextEntity} from '@lexical/text';
import * as Hashtag from './lexical-hashtag-plugin';
import {registerHorizontalRule , HorizontalRuleNode, INSERT_HORIZONTAL_RULE_COMMAND} from './lexical-horizontal-rule-plugin';

import {
    clearFormatting,
    formatCode,
    formatQuote,
    updateFontSize,
    updateFontSizeByInputValue,
    UpdateFontSizeType,
    theme, getSelectedNode
} from "./utils";
import {$findMatchingParent} from "@lexical/utils";

import {registerLink} from "./lexical-link-plugin";
import {$generateHtmlFromNodes , $generateNodesFromDOM} from '@lexical/html';
import {registerShortcuts} from "./lexical-shortcuts-plugin";
import {blockTypeToBlockName, DEFAULT_FONT_SIZE, INITIAL_TOOLBAR_STATE} from "./toolbar-context";
import {$isTableSelection} from "@lexical/table";
import {
    $isImageNode,
    ImageNode,
    INSERT_IMAGE_COMMAND,
    InsertImagePayload,
    registerInsertImageCommand
} from "./lexical-image-plugin";
import {$getNodeByKey} from "lexical";
const COMMAND_PRIORITY_LOW = 1;
export default function lexicalComponent({
                                             basicColors = [
                                                 '#d0021b',
                                                 '#f5a623',
                                                 '#f8e71c',
                                                 '#8b572a',
                                                 '#7ed321',
                                                 '#417505',
                                                 '#bd10e0',
                                                 '#9013fe',
                                                 '#4a90e2',
                                                 '#50e3c2',
                                                 '#b8e986',
                                                 '#000000',
                                                 '#4a4a4a',
                                                 '#9b9b9b',
                                                 '#ffffff',
                                             ],
                                             state,
                                             enabledToolbars = [
                                                 'undo',
                                                 'redo',
                                                 'normal',
                                                 'h1',
                                                 'h2',
                                                 'h3',
                                                 'h4',
                                                 'h5',
                                                 'h6',
                                                 'bullet',
                                                 'numbered',
                                                 'quote',
                                                 'code',
                                                 'fontSize',
                                                 'bold',
                                                 'italic',
                                                 'underline',
                                                 'icode',
                                                 'link',
                                                 'textColor',
                                                 'backgroundColor',
                                                 'lowercase',
                                                 'uppercase',
                                                 'capitalize',
                                                 'strikethrough',
                                                 'subscript',
                                                 'superscript',
                                                 'clear',
                                                 'left',
                                                 'center',
                                                 'right',
                                                 'justify',
                                                 'start',
                                                 'end',
                                                 'indent',
                                                 'outdent',
                                             ]
                                         }) {
    return {
        state: state,
        basicColors,
        toolbarState: INITIAL_TOOLBAR_STATE,
        showLinkEditor: false,
        linkEditMode: false,
        linkEditorAnchor : null as HTMLElement | null,
        linkEditorUrl: null as string | null,
        editor : null as LexicalEditor | null,
        enabledToolbars,
        init: function () {
            const editorElement = this.$refs.editor;
            const initialConfig = {
                namespace: 'lexical-editor',
                nodes: [
                    AutoLinkNode,
                    ListItemNode,
                    CodeNode,
                    HeadingNode,
                    LinkNode,
                    ListNode,
                    QuoteNode,
                    HashtagNode,
                    HorizontalRuleNode,
                    ImageNode,

                ],
                onError: console.error,
                theme: theme,
            };

            this.editor = createEditor(initialConfig);
            this.editor.setRootElement(editorElement);

            Coloris.init();

            // Registering Plugins
            mergeRegister(
                registerRichText(this.editor),
                registerList(this.editor),
                registerHistory(this.editor, createEmptyHistoryState(), 300),
                registerLink(this.editor),
                registerShortcuts(this.editor),
                registerHorizontalRule(this.editor),
                registerInsertImageCommand(this.editor),
                ...registerLexicalTextEntity(this.editor, Hashtag.getHashtagMatch, HashtagNode, Hashtag.$createHashtagNode_),

            );
            this.editor.registerCommand(
                CAN_UNDO_COMMAND,
                (payload) => {
                    this.updateToolbarState('canUndo', payload);
                    this.updateToolbarState('cannotUndo', !payload);
                    return false;
                },
                COMMAND_PRIORITY_LOW,
            );
            this.editor.registerCommand(
                CAN_REDO_COMMAND,
                (payload) => {
                    this.updateToolbarState('canRedo', payload);
                    this.updateToolbarState('cannotRedo', !payload);
                    return false;
                },
                COMMAND_PRIORITY_LOW,
            );
            this.editor.registerUpdateListener(({editorState}) => {
                editorState.read(() => {
                    this.state = $generateHtmlFromNodes(this.editor);
                    this.updateToolbar();
                });
            });

            if(this.state) {
                this.editor.update(() => {
                    // In the browser you can use the native DOMParser API to parse the HTML string.
                    const parser = new DOMParser();
                    const dom = parser.parseFromString(this.state, 'text/html');

                    // Once you have the DOM instance it's easy to generate LexicalNodes.
                    const nodes = $generateNodesFromDOM(this.editor, dom);

                    // Select the root
                    $getRoot().select();

                    // Insert them at a selection.
                    $insertNodes(nodes);
                });
            }

            this.registerToolbarActions();
        },
        updateLink: function () {
            this.editor?.dispatchCommand(
                TOGGLE_LINK_COMMAND,
                this.linkEditorUrl,
            );
            this.linkEditMode = false;

        },
        handleImage: function () {
            const files = this.$refs.image_input.files;
            const alt = this.$refs.image_alt.value;
            const reader = new FileReader();
            const _this = this;
            reader.onload = function () {
                if (typeof reader.result === 'string') {
                    const payload = {altText: alt, src: reader.result};
                    _this.insertImage(payload);
                }
                return '';
            };
            if(files !== null) {
                reader.readAsDataURL(files[0]);
            }

        },
        insertImage(payload: InsertImagePayload) {
            this.editor?.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
        },
        openImageEditor: function (nodeKey: string) {
            this.editor.read(() => {
                const node = $getNodeByKey(nodeKey);
                if($isImageNode(node)) {
                    const imageEditor = this.$refs.imageEditorModal;
                    const modalId = imageEditor?.getAttribute('modal-id');
                    if(modalId) {
                        const key = imageEditor.querySelector("[x-ref='image_editor_key']");
                        const alt = imageEditor.querySelector("[x-ref='image_editor_alt']");
                        const width = imageEditor.querySelector("[x-ref='image_editor_width']");
                        const height = imageEditor.querySelector("[x-ref='image_editor_height']");
                        key.value = nodeKey;
                        alt.value = node.getAltText();
                        width.value = node.getWidth().toString();
                        height.value = node.getHeight().toString();

                        this.$dispatch('open-modal', { id: modalId });
                    }

                }
            });
        },

        deleteImage: function (nodeKey: string) {
            const key = this.$refs.image_editor_key.value;

            this.editor.update(() => {
                const node = $getNodeByKey(key);
                if($isImageNode(node)) {
                    node.remove();
                }
            });
        },
        updateImage: function () {
            const key = this.$refs.image_editor_key.value;
            this.editor.update(() => {
                const node = $getNodeByKey(key);
                if($isImageNode(node)) {
                    node.setAltText(this.$refs.image_editor_alt.value);
                    node.setWidthAndHeight(Number(this.$refs.image_editor_width.value), Number(this.$refs.image_editor_height.value));

                }
            });

        },
        removeLink: function () {
            this.editor?.dispatchCommand(
                TOGGLE_LINK_COMMAND,
                null,
            );
            this.closeLinkEditorDialog();
        },
        showLinkEditorDialog: function (element: HTMLElement , url : string | null = null , editable : boolean = true) {
            this.$nextTick(() => {
                this.linkEditorAnchor = element;
                this.linkEditMode = editable;
                this.linkEditorUrl = url;
                this.showLinkEditor = true;
            });
        },
        closeLinkEditorDialog: function () {
            this.$nextTick(() => {
                this.linkEditorAnchor = null;
                this.linkEditorUrl = null;
                this.showLinkEditor = false;
            });

        },
        formatHeading: function (headingSize: HeadingTagType) {
            this.editor?.update(() => {
                const selection = $getSelection();
                $setBlocksType(selection, () => $createHeadingNode(headingSize));
            });
        },
        formatAlignment: function (elementFormatType: ElementFormatType) {
            this.editor?.dispatchCommand(FORMAT_ELEMENT_COMMAND, elementFormatType);
        },
        formatFontFamily: function (fontFamily: string) {
            this.editor.update(() => {
                const selection = $getSelection();
                if (selection !== null) {
                    $patchStyleText(selection, {
                        'font-family' : fontFamily,
                    });
                }
            });
        },
        formatText: function (formatTextType: TextFormatType) {
            this.editor?.dispatchCommand(FORMAT_TEXT_COMMAND, formatTextType);
        },
        formatParagraph: function () {
            this.editor?.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    $setBlocksType(selection, () => $createParagraphNode());
                }
            });
        },
        formatBulletList: function () {
            this.editor?.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        },
        formatNumberedList: function () {
            this.editor?.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        },
        formatLineCode: function () {
            this.editor?.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
        },
        insetLink: function () {
            this.editor?.dispatchCommand(TOGGLE_LINK_COMMAND, null);
        },
        insetHR: function () {
            this.editor?.dispatchCommand(
                INSERT_HORIZONTAL_RULE_COMMAND,
                undefined,
            );
        },
        getToolbarActions: function () {
            return {
                bold: () => this.formatText('bold'),
                strikethrough: () => this.formatText('strikethrough'),
                subscript: () => this.formatText('subscript'),
                lowercase: () => this.formatText('lowercase'),
                uppercase: () => this.formatText('uppercase'),
                capitalize: () => this.formatText('capitalize'),
                superscript: () => this.formatText('superscript'),
                italic: () => this.formatText('italic'),
                underline: () => this.formatText('underline'),
                link: (event: Event) => {
                    event.stopPropagation();
                    this.insetLink();
                },
                h1: () => this.formatHeading('h1'),
                h2: () => this.formatHeading('h2'),
                h3: () => this.formatHeading('h3'),
                h4: () => this.formatHeading('h4'),
                h5: () => this.formatHeading('h5'),
                h6: () => this.formatHeading('h6'),
                normal: () => this.formatParagraph(),
                bullet: () => this.formatBulletList(),
                numbered: () => this.formatNumberedList(),
                quote: () => formatQuote(this.editor, null),
                code: () => formatCode(this.editor, null),
                decrement: () => updateFontSize(this.editor, UpdateFontSizeType.decrement, this.$refs.fontSize),
                increment: () => updateFontSize(this.editor, UpdateFontSizeType.increment, this.$refs.fontSize),
                icode: () => this.formatLineCode(),
                fontSizeChange: () => updateFontSizeByInputValue(this.editor, Number(this.$refs.fontSize.value),this.$refs.fontSize),
                fontSizeKeydown: (event: any) => {
                    if (event.key === "Enter") {
                        event.stopPropagation();
                        event.preventDefault();
                        updateFontSizeByInputValue(this.editor, Number(this.$refs.fontSize.value),this.$refs.fontSize);
                    }
                },
                undo: () => this.editor?.dispatchCommand(UNDO_COMMAND, undefined),
                redo: () => this.editor?.dispatchCommand(REDO_COMMAND, undefined),
                left: () => this.formatAlignment('left'),
                right: () => this.formatAlignment('right'),
                center: () => this.formatAlignment('center'),
                justify: () => this.formatAlignment('justify'),
                start: () => this.formatAlignment('start'),
                end: () => this.formatAlignment('end'),
                indent: () => this.editor?.dispatchCommand(INDENT_CONTENT_COMMAND, undefined),
                outdent: () => this.editor?.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined),
                clear: () => clearFormatting(this.editor),
                textColor: () => {
                    this.$refs.text_color_input.click();
                    Coloris({
                        swatches: this.basicColors,
                        alpha: false,
                        formatToggle: true,
                    });
                },
                textColorChange: (event: Event) => {
                    const target = event.target as HTMLInputElement;
                    const color = target.value;

                    this.editor?.update(() => {
                        const selection = $getSelection();
                        if ($isRangeSelection(selection)) {
                            $patchStyleText(selection, { "color": color });
                        }
                    });
                },
                backgroundColor: () => {
                    this.$refs.background_color_input.click();
                    Coloris({
                        swatches: this.basicColors,
                        alpha: false,
                        formatToggle: true,
                    });
                },
                backgroundColorChange: (event: Event) => {
                    const target = event.target as HTMLInputElement;
                    const color = target.value;

                    this.editor?.update(() => {
                        const selection = $getSelection();
                        if ($isRangeSelection(selection)) {
                            $patchStyleText(selection, { "background-color": color });
                        }
                    });
                },
                fontFamily: (fontFamily: string) => {
                    this.formatFontFamily(fontFamily);
                },
                hr: () => this.insetHR(),
                image:()=>{
                    this.$refs.image.addEventListener("click", () => {
                        const modalId = this.$refs.imageModal?.getAttribute('modal-id');

                        if(modalId) {
                            this.$dispatch('open-modal', { id: modalId });
                        }
                    });
                }
            };
        },
        registerToolbarActions() {
            const actions = this.getToolbarActions();

            this.enabledToolbars.forEach(toolbar => {
                if(toolbar === 'backgroundColor') {
                    this.$refs.background_color.addEventListener("click", () => {
                        actions.backgroundColor();
                    });
                    this.$refs.background_color_input.addEventListener("change", (event : Event) => {
                        actions.backgroundColorChange(event);
                    });
                }else if(toolbar === 'textColor') {
                    this.$refs.text_color.addEventListener("click", () => {
                        actions.textColor();
                    });
                    this.$refs.text_color_input.addEventListener("change", (event : Event) => {
                        actions.textColorChange(event);
                    });
                }else if(toolbar === 'link') {
                    this.$refs.link.addEventListener("click", (event : Event) => {
                        actions.link(event);
                    });
                }else if(toolbar === 'fontSize') {
                    this.$refs.decrement.addEventListener("click", () => {
                        actions.decrement();
                    });

                    this.$refs.increment.addEventListener("click", () => {
                        actions.increment();
                    });

                    this.$refs.fontSize.addEventListener("change", () => {
                        actions.fontSizeChange();
                    });

                    this.$refs.fontSize.addEventListener("keydown", (event :any) => {
                        actions.fontSizeKeydown(event);
                    });

                }else if(toolbar === 'fontFamily') {
                    this.$refs.fontFamily.addEventListener("change", (event: any) => {
                        actions.fontFamily(event.target.value);
                    });
                }else if(toolbar === 'image') {
                    actions.image();


                    // this.$refs.image_input.addEventListener("change", (event : Event) => {
                    //
                    // });
                }else if(toolbar === 'divider') {
                    //Do nothing
                }else{
                    const action = actions[toolbar];

                    this.$refs[toolbar].addEventListener("click", () => {
                        if (action) {
                            action();
                        }
                    });
                }
            });
        },
        updateToolbar() {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                // if (activeEditor !== editor && $isEditorIsNestedEditor(activeEditor)) {
                //     const rootElement = activeEditor.getRootElement();
                //     this.updateToolbarState(
                //         'isImageCaption',
                //         !!rootElement?.parentElement?.classList.contains(
                //             'image-caption-container',
                //         ),
                //     );
                // } else {
                //     this.updateToolbarState('isImageCaption', false);
                // }

                const anchorNode = selection.anchor.getNode();
                let element =
                    anchorNode.getKey() === 'root'
                        ? anchorNode
                        : $findMatchingParent(anchorNode, (e) => {
                            const parent = e.getParent();
                            return parent !== null && $isRootOrShadowRoot(parent);
                        });

                if (element === null) {
                    element = anchorNode.getTopLevelElementOrThrow();
                }

                const elementKey = element.getKey();
                const elementDOM = this.editor.getElementByKey(elementKey);

                this.updateToolbarState('isRTL', $isParentElementRTL(selection));

                // Update links
                const node = getSelectedNode(selection);
                const parent = node.getParent();
                const isLink = $isLinkNode(parent) || $isLinkNode(node);
                this.updateToolbarState('isLink', isLink);

                // const tableNode = $findMatchingParent(node, $isTableNode);
                // if ($isTableNode(tableNode)) {
                //     this.updateToolbarState('rootType', 'table');
                // } else {
                //     this.updateToolbarState('rootType', 'root');
                // }

                if (elementDOM !== null) {
                    // setSelectedElementKey(elementKey);
                    if ($isListNode(element)) {
                        const parentList = $getNearestNodeOfType<ListNode>(
                            anchorNode,
                                ListNode,
                        );
                        const type = parentList
                            ? parentList.getListType()
                            : element.getListType();

                        this.updateToolbarState('blockType', type);
                    } else {
                        const type = $isHeadingNode(element)
                            ? element.getTag()
                            : element.getType();
                        if (type in blockTypeToBlockName) {
                            this.updateToolbarState(
                                'blockType',
                                type as keyof typeof blockTypeToBlockName,
                        );
                        }
                        if ($isCodeNode(element)) {
                            const language =
                                element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
                            this.updateToolbarState(
                                'codeLanguage',
                                language ? CODE_LANGUAGE_MAP[language] || language : '',
                            );
                            return;
                        }
                    }
                }

                // Handle buttons
                this.updateToolbarState(
                    'fontColor',
                    $getSelectionStyleValueForProperty(selection, 'color', '#000'),
                );
                this.updateToolbarState(
                    'bgColor',
                    $getSelectionStyleValueForProperty(
                        selection,
                        'background-color',
                        '#fff',
                    ),
                );
                this.updateToolbarState(
                    'fontFamily',
                    $getSelectionStyleValueForProperty(selection, 'font-family', 'Arial'),
                );
                let matchingParent;
                if ($isLinkNode(parent)) {
                    // If node is a link, we need to fetch the parent paragraph node to set format
                    matchingParent = $findMatchingParent(
                        node,
                        (parentNode) => $isElementNode(parentNode) && !parentNode.isInline(),
                    );
                }

                // If matchingParent is a valid node, pass it's format type
                this.updateToolbarState(
                    'elementFormat',
                    $isElementNode(matchingParent)
                        ? matchingParent.getFormatType()
                        : $isElementNode(node)
                            ? node.getFormatType()
                            : parent?.getFormatType() || 'left',
                );
            }
            if ($isRangeSelection(selection) || $isTableSelection(selection)) {
                // Update text format
                this.updateToolbarState('isBold', selection.hasFormat('bold'));
                this.updateToolbarState('isItalic', selection.hasFormat('italic'));
                this.updateToolbarState('isUnderline', selection.hasFormat('underline'));
                this.updateToolbarState(
                    'isStrikethrough',
                    selection.hasFormat('strikethrough'),
                );
                this.updateToolbarState('isSubscript', selection.hasFormat('subscript'));
                this.updateToolbarState('isSuperscript', selection.hasFormat('superscript'));
                this.updateToolbarState('isCode', selection.hasFormat('code'));
                this.updateToolbarState(
                    'fontSize',
                    $getSelectionStyleValueForProperty(selection, 'font-size', '15px'),
                );
                this.updateToolbarState('isLowercase', selection.hasFormat('lowercase'));
                this.updateToolbarState('isUppercase', selection.hasFormat('uppercase'));
                this.updateToolbarState('isCapitalize', selection.hasFormat('capitalize'));
            }
        },
        updateToolbarState(toolbar :string, value :any) {
            this.toolbarState[toolbar] = value;

            if(toolbar === 'fontColor' && this.$refs.text_color_input != null) {
                this.$nextTick(() => {
                    this.$refs.text_color_input.value = value;
                    this.$refs.text_color_input.dispatchEvent(new Event('input', { bubbles: true }));
                });
            }else if(toolbar === 'bgColor' && this.$refs.background_color_input != null) {
                this.$nextTick(() => {
                    this.$refs.background_color_input.value = value;
                    this.$refs.background_color_input.dispatchEvent(new Event('input', { bubbles: true }));

                });
            }else if(toolbar === 'fontSize' && this.$refs.fontSize != null) {
                this.$refs.fontSize.value = value.toString().replace("px","") ?? DEFAULT_FONT_SIZE;
            }else if(toolbar === 'fontFamily') {
                this.$refs.fontFamily.value = value;
            }
        },
    }
}

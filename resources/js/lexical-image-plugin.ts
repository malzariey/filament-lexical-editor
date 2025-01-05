import type { DOMConversionMap, DOMConversionOutput, DOMExportOutput, } from 'lexical';
import type { EditorConfig, LexicalEditor, LexicalNode, LexicalCommand} from 'lexical';
import type { NodeKey, SerializedEditor, SerializedLexicalNode, Spread, } from 'lexical';
import { $applyNodeReplacement, createEditor, DecoratorNode } from 'lexical';
import { $insertNodes, COMMAND_PRIORITY_EDITOR, createCommand} from "lexical";


/** イメージペイロード */
export interface ImagePayload {
    altText: string;
    caption?: LexicalEditor;
    height?: number;
    key?: NodeKey;
    maxWidth?: number;
    showCaption?: boolean;
    src: string;
    width?: number;
    captionsEnabled?: boolean;
}

/** イメージノードクラス */
export class ImageNode extends DecoratorNode<null> {
    __src: string;
    __altText: string;
    __width: 'inherit' | number;
    __height: 'inherit' | number;
    __maxWidth: number;
    __showCaption: boolean;
    __caption: LexicalEditor;
    // Captions cannot yet be used within editor cells
    __captionsEnabled: boolean;

    static getType(): string {
        return 'image';
    }

    static clone(node: ImageNode): ImageNode {
        return new ImageNode(
            node.__src,
            node.__altText,
            node.__maxWidth,
            node.__width,
            node.__height,
            node.__showCaption,
            node.__caption,
            node.__captionsEnabled,
            node.__key,
        );
    }

    static importJSON(serializedNode: SerializedImageNode): ImageNode {
        const { altText, height, width, maxWidth, caption, src, showCaption } =
            serializedNode;
        const node = $createImageNode({
            altText,
            height,
            maxWidth,
            showCaption,
            src,
            width,
        });
        const nestedEditor = node.__caption;
        const editorState = nestedEditor.parseEditorState(caption.editorState);
        if (!editorState.isEmpty()) {
            nestedEditor.setEditorState(editorState);
        }
        return node;
    }

    exportDOM(): DOMExportOutput {
        const element = document.createElement('img');
        element.setAttribute('src', this.__src);
        element.setAttribute('alt', this.__altText);
        element.setAttribute('width', this.__width.toString());
        element.setAttribute('height', this.__height.toString());
        return { element };
    }

    static importDOM(): DOMConversionMap | null {
        return {
            img: (node: Node) => ({
                conversion: convertImageElement,
                priority: 0,
            }),
        };
    }

    /** コンストラクタ */
    constructor(
        src: string,
        altText: string,
        maxWidth: number,
        width?: 'inherit' | number,
        height?: 'inherit' | number,
        showCaption?: boolean,
        caption?: LexicalEditor,
        captionsEnabled?: boolean,
        key?: NodeKey,
    ) {
        super(key);
        this.__src = src;
        this.__altText = altText;
        this.__maxWidth = maxWidth;
        this.__width = width || 'inherit';
        this.__height = height || 'inherit';
        this.__showCaption = showCaption || false;
        this.__caption = caption || createEditor();
        this.__captionsEnabled = captionsEnabled || captionsEnabled === undefined;
    }

    exportJSON(): SerializedImageNode {
        return {
            altText: this.getAltText(),
            caption: this.__caption.toJSON(),
            height: this.__height === 'inherit' ? 0 : this.__height,
            maxWidth: this.__maxWidth,
            showCaption: this.__showCaption,
            src: this.getSrc(),
            type: 'image',
            version: 1,
            width: this.__width === 'inherit' ? 0 : this.__width,
        };
    }

    setWidthAndHeight(
        width: 'inherit' | number,
        height: 'inherit' | number,
    ): void {
        const writable = this.getWritable();
        writable.__width = width;
        writable.__height = height;
    }

    setAltText(altText: string): void {
        const writable = this.getWritable();
        writable.__altText = altText;
    }

    // View

    createDOM(config: EditorConfig): HTMLElement {
        const span = document.createElement('span');
        const theme = config.theme;
        const className = theme.image;
        if (className !== undefined) {
            span.className = className;
        }
        span.classList.add('relative');
        span.classList.add('image-span');

        const element = document.createElement('img');
        element.setAttribute('src', this.__src);
        element.setAttribute('alt', this.__altText);
        element.style.width = this.__width === 'inherit' || this.__width == 0 ? undefined : this.__width + 'px';
        element.style.height = this.__height === 'inherit' || this.__height == 0 ? undefined : this.__height + 'px';

        const isSelectedClassName = 'focused';

        element.onclick = () => {
            element.classList.toggle(isSelectedClassName);
        }

        element?.setAttribute('x-on:click.outside', '$el.classList.remove("'+isSelectedClassName+'")');

        span.appendChild(element)

        const button = document.createElement('button');
        button.type = 'button';
        button.style.width = '2rem';
        button.style.height = '2rem';
        button.className = 'image-editor-button bg-gray-200 rounded-full';
        button.style.top = '0';
        button.style.right = '0';
        button.style.position = 'absolute';

        const icon = document.createElement('i');
        icon.className = 'edit';
        icon.style.width = '1.5rem';
        icon.style.height = '1.5rem';
        icon.style.display = 'block';
        icon.style.margin = 'auto';

        button.appendChild(icon);
        button.setAttribute('x-on:click', "openImageEditor('"+this.__key+"')");

        span.appendChild(button);

        return span;
    }
    updateDOM(prevNode: this, dom: HTMLElement, config: EditorConfig): boolean {
        const domElement = dom.querySelector('img') as HTMLImageElement;
        domElement.style.width = this.__width === 'inherit' || this.__width == 0 ? undefined : this.__width + 'px';
        domElement.style.height = this.__height === 'inherit' || this.__height == 0 ? undefined : this.__height + 'px';
        domElement.setAttribute('alt', this.__altText);

        return true;
    }

    getSrc(): string {
        return this.__src;
    }

    getAltText(): string {
        return this.__altText;
    }

    getWidth(): number {
        return this.__width === 'inherit' ? 0 : this.__width;
    }

    getHeight(): number {
        return this.__height === 'inherit' ? 0 : this.__height;
    }

    decorate(): null {
        return null;
    }
}

export type SerializedImageNode = Spread<
    {
        altText: string;
        caption: SerializedEditor;
        height?: number;
        maxWidth: number;
        showCaption: boolean;
        src: string;
        width?: number;
    },
    SerializedLexicalNode
>;

function convertImageElement(domNode: Node): null | DOMConversionOutput {
    const img = domNode as HTMLImageElement;
    // @ts-ignore
    if (img.src.startsWith('file:///')) {
        return null;
    }
    const { alt: altText, src, width, height } = img;
    const node = $createImageNode({ altText, height, src, width });
    return { node };
}

/** イメージノードの作成 */
export function $createImageNode({
                                     altText,
                                     height,
                                     maxWidth = 500,
                                     captionsEnabled,
                                     src,
                                     width,
                                     showCaption,
                                     caption,
                                     key,
                                 }: ImagePayload): ImageNode {
    return $applyNodeReplacement(
        new ImageNode(
            src,
            altText,
            maxWidth,
            width,
            height,
            showCaption,
            caption,
            captionsEnabled,
            key,
        ),
    );
}

export function $isImageNode(
    node: LexicalNode | null | undefined,
): node is ImageNode {
    return node instanceof ImageNode;
}



export type InsertImagePayload = Readonly<ImagePayload>;

export const registerInsertImageCommand = (editor: LexicalEditor) => {
    return editor.registerCommand<InsertImagePayload>(
        INSERT_IMAGE_COMMAND,
        (payload) => {
            const imageNode = $createImageNode(payload);
            $insertNodes([imageNode]);

            return true;
        },
        COMMAND_PRIORITY_EDITOR,
    )
}


export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
    createCommand('INSERT_IMAGE_COMMAND');

import {
    $getNearestNodeFromDOMNode, $getRoot,
    $getSelection,
    $isElementNode,
    $isRangeSelection,
    COMMAND_PRIORITY_LOW,
    getNearestEditorFromDOMNode,
    isDOMNode,
    isHTMLAnchorElement,
    LexicalEditor
} from "lexical";
import {$isLinkNode, $toggleLink, TOGGLE_LINK_COMMAND} from "@lexical/link";
import {getSelectedNode} from "./utils";
import {$findMatchingParent} from "@lexical/utils";

export function registerLink(editor: LexicalEditor) {

    editor.registerCommand(TOGGLE_LINK_COMMAND, (payload: any) => {
            const selection = $getSelection();
            if (!$isRangeSelection(selection)) {
                return false;
            }
            const rootDom = editor.getElementByKey($getRoot().getKey());

            const node = getSelectedNode(selection);
            const parent = node.getParent();
            if ($isLinkNode(parent) || $isLinkNode(node)) {
                $toggleLink(payload == undefined ? null : sanitizeUrl(payload), {
                    rel: 'noopener noreferrer',
                    target: '_blank',
                });

                if (payload == undefined) {
                    rootDom.dispatchEvent(new CustomEvent('close-link-editor-dialog'));
                }
            } else {
                $toggleLink("https://", {
                    rel: 'noopener noreferrer',
                    target: '_blank',
                });

                editor.read(() => {
                    const selection = $getSelection();
                    if ($isRangeSelection(selection)) {
                        const node = getSelectedNode(selection);
                        const elementKey = node.getKey();
                        const elementDOM = editor.getElementByKey(elementKey);

                        if (elementDOM != null) {
                            rootDom.dispatchEvent(new CustomEvent('link-created', {
                                detail: {
                                    url: "https://",
                                    target: elementDOM,
                                },
                            }));
                            // this.showLinkEditorDialog(elementDOM, "https://");
                        }

                    }
                });
            }
            return true;
        },
        COMMAND_PRIORITY_LOW
    );

    return editor.registerRootListener((rootElement, prevRootElement) => {
        if (prevRootElement !== null) {
            prevRootElement.removeEventListener('click', onClick);
            prevRootElement.removeEventListener('mouseup', onMouseUp);
        }
        if (rootElement !== null) {
            rootElement.addEventListener('click', onClick);
            rootElement.addEventListener('mouseup', onMouseUp);
        }
    });

}

export const sanitizeUrl = function (url: string): string {

    try {
        const parsedUrl = new URL(url);
        // eslint-disable-next-line no-script-url
        if (!SUPPORTED_URL_PROTOCOLS.has(parsedUrl.protocol)) {
            return 'about:blank';
        }
    } catch (error) {

        return url;
    }
    return url;
}

// @ts-ignore
const SUPPORTED_URL_PROTOCOLS = new Set([
    'http:',
    'https:',
    'mailto:',
    'sms:',
    'tel:',
]);


const urlRegExp = new RegExp(
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/,
);

export const validateUrl = function (url: string): boolean {
    // TODO Fix UI for link insertion; it should never default to an invalid URL such as https://.
    // Maybe show a dialog where they user can type the URL before inserting it.
    return url === 'https://' || urlRegExp.test(url);
}

const onClick = (event: MouseEvent) => {
    const target = event.target;
    if (!isDOMNode(target)) {
        return;
    }
    const nearestEditor = getNearestEditorFromDOMNode(target);

    if (nearestEditor === null) {
        return;
    }

    let url: string | null = null;
    let urlTarget: string | null = null;

    nearestEditor.update(() => {
        const clickedNode = $getNearestNodeFromDOMNode(target);
        if (clickedNode !== null) {
            const maybeLinkNode = $findMatchingParent(
                clickedNode,
                $isElementNode,
            );
            if ($isLinkNode(maybeLinkNode)) {
                url = maybeLinkNode.sanitizeUrl(maybeLinkNode.getURL());
                urlTarget = maybeLinkNode.getTarget();
            } else {
                const a = findMatchingDOM(target, isHTMLAnchorElement);
                if (a !== null) {
                    url = a.href;
                    urlTarget = a.target;
                }
            }
        }
    });

    if (url === null || url === '') {
        return;
    }
    // Allow user to select link text without follwing url
    const selection = nearestEditor.getEditorState().read($getSelection);

    if ($isRangeSelection(selection) && !selection.isCollapsed()) {
        event.preventDefault();
        return;
    }
    if (target !== null) {
        nearestEditor.read(() => {
            const rootDom =  nearestEditor.getElementByKey($getRoot().getKey());

            rootDom.dispatchEvent(new CustomEvent('link-clicked', {
                detail: {
                    url: url,
                    target: target,
                },
            }));
        });


    }
};

const onMouseUp = (event: MouseEvent) => {
    if (event.button === 1) {
        onClick(event);
    }
};

const findMatchingDOM = function <T extends Node>(
    startNode: Node,
    predicate: (node: Node) => node is T,
): T | null {
    let node: Node | null = startNode;
    while (node != null) {
        if (predicate(node)) {
            return node;
        }
        node = node.parentNode;
    }
    return null;
}




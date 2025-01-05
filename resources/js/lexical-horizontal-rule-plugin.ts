/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
    $getEditor,
    DOMConversionMap,
    DOMConversionOutput,
    DOMExportOutput,
    EditorConfig,
    LexicalCommand,
    LexicalNode,
    NodeKey,
    SerializedLexicalNode,
} from 'lexical';

import {
    addClassNamesToElement,
    mergeRegister,
    removeClassNamesFromElement,
} from '@lexical/utils';

import {
    $applyNodeReplacement,
    $isNodeSelection,
    CLICK_COMMAND,
    COMMAND_PRIORITY_LOW,
    createCommand,
    DecoratorNode,
    KEY_BACKSPACE_COMMAND,
    KEY_DELETE_COMMAND,
} from 'lexical';

import {$insertNodeToNearestRoot} from '@lexical/utils';
import {
    $getSelection,
    $isRangeSelection,
    COMMAND_PRIORITY_EDITOR, LexicalEditor,
} from 'lexical';
import {getActiveEditor} from "lexical/LexicalUpdates";

export type SerializedHorizontalRuleNode = SerializedLexicalNode;

export const INSERT_HORIZONTAL_RULE_COMMAND: LexicalCommand<void> =
    createCommand('INSERT_HORIZONTAL_RULE_COMMAND');

export class HorizontalRuleNode extends DecoratorNode<HTMLHRElement> {
    static getType(): string {
        return 'horizontalrule';
    }

    static clone(node: HorizontalRuleNode): HorizontalRuleNode {
        return new HorizontalRuleNode(node.__key);
    }

    static importJSON(
        serializedNode: SerializedHorizontalRuleNode,
    ): HorizontalRuleNode {
        return $createHorizontalRuleNode();
    }

    static importDOM(): DOMConversionMap | null {
        return {
            hr: () => ({
                conversion: $convertHorizontalRuleElement,
                priority: 0,
            }),
        };
    }

    exportDOM(): DOMExportOutput {
        return {element: document.createElement('hr')};
    }

    createDOM(config: EditorConfig): HTMLElement {
        const element = document.createElement('hr');
        addClassNamesToElement(element, config.theme.hr);

        const isSelectedClassName = 'selected';

        element?.addEventListener('click', () => {
            element.classList.toggle(isSelectedClassName);
        });

        element?.setAttribute('x-on:click.outside', '$el.classList.remove("'+isSelectedClassName+'")');

        return element;
    }

    getTextContent(): string {
        return '\n';
    }

    isInline(): false {
        return false;
    }

    updateDOM(): boolean {
        return false;
    }

    decorate(): HTMLHRElement {
        return $getEditor().getElementByKey(this.__key) as HTMLHRElement;
    }
}

function $convertHorizontalRuleElement(): DOMConversionOutput {
    return {node: $createHorizontalRuleNode()};
}

export function $createHorizontalRuleNode(): HorizontalRuleNode {
    return $applyNodeReplacement(new HorizontalRuleNode());
}

export function $isHorizontalRuleNode(
    node: LexicalNode | null | undefined,
): node is HorizontalRuleNode {
    return node instanceof HorizontalRuleNode;
}



export function registerHorizontalRule(editor: LexicalEditor) {

    return editor.registerCommand(
        INSERT_HORIZONTAL_RULE_COMMAND,
        (type) => {
            const selection = $getSelection();

            if (!$isRangeSelection(selection)) {
                return false;
            }

            const focusNode = selection.focus.getNode();

            if (focusNode !== null) {
                const horizontalRuleNode = $createHorizontalRuleNode();
                $insertNodeToNearestRoot(horizontalRuleNode);
            }

            return true;
        },
        COMMAND_PRIORITY_EDITOR,
    );

}

@php
    use Filament\Support\Facades\FilamentAsset;
    $statePath = $getStatePath();

@endphp
<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
>
    <div
        @class([
            'lexical-editor rounded-md relative text-gray-950 bg-white shadow-sm ring-1 dark:bg-white/5 dark:text-white',
            'ring-gray-950/10 dark:ring-white/20' => ! $errors->has($statePath),
            'ring-danger-600 dark:ring-danger-600' => $errors->has($statePath),
        ])

    >

        <div
            ax-load="visible"
            ax-load-src="{{ FilamentAsset::getAlpineComponentSrc('lexical-component', 'malzariey/filament-lexical-editor') }}"
            x-data="lexicalComponent({
                    state: $wire.{{ $applyStateBindingModifiers("\$entangle('{$statePath}')") }},
                    enabledToolbars: @js($getEnabledToolbars())
            })"

            x-ignore
            wire:ignore

            class="editor-shell w-full"
        >

            <div class="toolbar flex-wrap">
                @foreach($getEnabledToolbars() as $toolbar)
                    <x-filament-lexical-editor::toolbar :toolbar="$toolbar"/>
                @endforeach
            </div>

            <div class="editor-container tree-view p-2 ">
                <div class="editor-scroller">
                    <div x-ref="editor"
                         @link-clicked="showLinkEditorDialog( $event.detail.target,$event.detail.url, false)"
                         @link-created="showLinkEditorDialog( $event.detail.target, $event.detail.url,)"
                         @close-link-editor-dialog="closeLinkEditorDialog()"
                         class="editor" style="max-width: unset" contenteditable="true" role="textbox" spellcheck="true"
                         aria-placeholder="Enter some rich text..." data-lexical-editor="true"/>
                </div>
            </div>
            <x-filament-lexical-editor::dialogs/>

        </div>

    </div>


</x-dynamic-component>

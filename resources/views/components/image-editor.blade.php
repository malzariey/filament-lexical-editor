@php
    $id = uniqid();
@endphp
<div x-ref="imageEditorModal" modal-id="{{$id}}">
    <x-filament::modal  id="{{$id}}">
        <x-slot name="heading">
            @lang('filament-lexical-editor::lexical-editor.image_editor.update_image')
        </x-slot>
        <input type="text" class="hidden" id="alt-text" x-ref="image_editor_key"  value="" >

        <label for="alt-text">@lang('filament-lexical-editor::lexical-editor.image_editor.alt')</label>
            <x-filament::input.wrapper
                label="Image Upload"
            >
            <x-filament::input
                 type="text"
                x-ref="image_editor_alt"
            />
        </x-filament::input.wrapper>

        <label for="image_editor_width">@lang('filament-lexical-editor::lexical-editor.image_editor.width')</label>
        <x-filament::input.wrapper>
            <x-filament::input
                type="number"
                x-ref="image_editor_width"
            />
        </x-filament::input.wrapper>

        <label for="image_editor_height">@lang('filament-lexical-editor::lexical-editor.image_editor.height')</label>
        <x-filament::input.wrapper>
            <x-filament::input
                type="number"
                x-ref="image_editor_height"
            />
        </x-filament::input.wrapper>

        <x-slot name="footerActions">
            <div class="dialog-actions ms-auto">
                <x-filament::button
                    @click="$event.preventDefault();updateImage(); close()"
                >
                    @lang('filament-lexical-editor::lexical-editor.edit')
                </x-filament::button>
                <x-filament::button
                    @click="$event.preventDefault(); deleteImage(); close()"
                    color="danger"
                >
                    @lang('filament-lexical-editor::lexical-editor.delete')
                </x-filament::button>

                <x-filament::button
                    @click="$event.preventDefault(); close()"
                    color="gray"
                >
                    @lang('filament-lexical-editor::lexical-editor.cancel')
                </x-filament::button>

            </div>
        </x-slot>
    </x-filament::modal>

</div>


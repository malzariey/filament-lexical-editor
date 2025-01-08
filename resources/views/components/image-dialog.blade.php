@php
    $id = uniqid();
@endphp

<div x-ref="imageModal" modal-id="{{$id}}">
    <x-filament::modal  id="{{$id}}">
        <x-slot name="heading">
            @lang('filament-lexical-editor::lexical-editor.image_uploader.upload_image')
        </x-slot>
        {{-- Modal content --}}

        <label for="image-upload">@lang('filament-lexical-editor::lexical-editor.image_uploader.image')</label>
        <x-filament::input.wrapper>
            <x-filament::input
                type="file"
                accept="image/*"
                x-ref="image_input"
            />
        </x-filament::input.wrapper>

        <label for="alt-text">@lang('filament-lexical-editor::lexical-editor.image_uploader.alt')</label>

        <x-filament::input.wrapper>
            <x-filament::input
                type="text"
                x-ref="image_alt"
            />
        </x-filament::input.wrapper>



        <x-slot name="footerActions">
            <div class="dialog-actions ms-auto">
                <x-filament::button
                    @click="$event.preventDefault(); handleImage(); close()"
                >
                    @lang('filament-lexical-editor::lexical-editor.image_uploader.upload')
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


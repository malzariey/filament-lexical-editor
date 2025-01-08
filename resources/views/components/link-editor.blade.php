<template x-if="showLinkEditor">
    <div x-anchor.bottom-start="linkEditorAnchor" class="pt-2"
         @click.outside="closeLinkEditorDialog()"
    >
        <div class="dropdown w-96 align-middle relative">
            <div class="flex ps-3 py-3" x-show="linkEditMode">
                <div style="flex-grow: 3">
                    <x-filament::input.wrapper>
                        <x-filament::input
                            type="text"
                            x-model="linkEditorUrl"
                            x-on:keydown.enter="$event.preventDefault(); updateLink()"
                            style="width: 100%"
                        />
                    </x-filament::input.wrapper>
                </div>

                <div class="ms-2 flex-1 flex">
                    <div class="link-cancel dark:invert" @click="closeLinkEditorDialog()" role="button" tabindex="0"></div>
                    <div class="link-confirm dark:invert" @click="updateLink()" role="button" tabindex="0"></div>
                </div>
            </div>
            <div class="flex" x-show="linkEditMode == false">
                <a class="text-blue-500 hover:underline hover:text-blue-700 whitespace-nowrap overflow-hidden ms-2 text-ellipsis block break-words" style="padding: 12px 12px; flex-grow: 3" :href="linkEditorUrl" x-text="linkEditorUrl" target="_blank" rel="noopener noreferrer">
                </a>
                <div class="ms-2 flex-1 flex">
                    <div class="link-edit dark:invert" @click="linkEditMode = true" role="button" tabindex="0"></div>
                    <div class="link-trash dark:invert" @click="removeLink()" role="button" tabindex="0"></div>
                </div>

            </div>
        </div>
    </div>
</template>

@props(['activeOption' => 'none' , 'disableOption' => 'none' ,'ref' => '' , 'rtlRef' => null, 'title' => '' , 'rtlTitle' => null, 'shortcut' => '', 'rtlShortcut' => null , 'icon' => '' , 'rtlIcon' => null , 'class' => 'spaced' , 'iconClass' => 'icon' , ])
<div style="align-self: center">
    <button class="toolbar-item {{$class}}"  :class="{ 'active': toolbarState.{{$activeOption}} }" x-bind:disabled="toolbarState.{{$disableOption}}"
            x-ref="{{__('filament-lexical-editor::lexical-editor.direction') == "rtl" && $rtlRef != null ? $rtlRef : $ref}}"
            aria-label="{{__('filament-lexical-editor::lexical-editor.direction') == "rtl" && $rtlTitle != null ? $rtlTitle : $title}}"
            x-tooltip="'{{__('filament-lexical-editor::lexical-editor.direction') == "rtl" && $rtlTitle != null ? $rtlTitle . " ($rtlShortcut)" : $title . (filled($shortcut) ? " ($shortcut)" : "" ) }}'" type="button">
        <i class="{{$iconClass}} dark:invert {{__('filament-lexical-editor::lexical-editor.direction') == "rtl" && $rtlIcon != null ? $rtlIcon : $icon}}"></i>
    </button>
</div>

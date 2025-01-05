@props(['activeOption' => 'none' , 'disableOption' => 'none' ,'ref' => '' , 'rtlRef' => null, 'title' => '' , 'rtlTitle' => null, 'shortcut' => '', 'rtlShortcut' => null , 'icon' => '' , 'rtlIcon' => null , 'class' => 'spaced' , 'iconClass' => 'icon' , ])
<div style="align-self: center">
    <button class="toolbar-item {{$class}}"  :class="{ 'active': toolbarState.{{$activeOption}} }" x-bind:disabled="toolbarState.{{$disableOption}}"
            x-ref="{{__('messages.direction') == "rtl" && $rtlRef != null ? $rtlRef : $ref}}"
            aria-label="{{__('messages.direction') == "rtl" && $rtlTitle != null ? $rtlTitle : $title}}"
            x-tooltip="'{{__('messages.direction') == "rtl" && $rtlTitle != null ? $rtlTitle . " ($rtlShortcut)" : $title . (filled($shortcut) ? " ($shortcut)" : "" ) }}'" type="button">
        <i class="{{$iconClass}} {{__('messages.direction') == "rtl" && $rtlIcon != null ? $rtlIcon : $icon}}"></i>
    </button>
</div>

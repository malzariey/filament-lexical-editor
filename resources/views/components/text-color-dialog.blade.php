<div class="flex" x-tooltip="'{{ $title }}'">
    <button type="button"  x-ref="{{$ref}}"   class="toolbar-item color-picker gap-1">
        <input x-ref="{{$ref}}_input" data-coloris class="w-1 h-1 ">
        <span class="icon dark:invert {{$icon}}"></span><i class="dark:invert chevron-down"></i></button>
</div>

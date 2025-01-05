@props(['toolbar' => '' ])
@php
    $item = $toolbar instanceof \App\Enums\ToolbarItem ? $toolbar : \App\Enums\ToolbarItem::from($toolbar);
@endphp
@switch($item)
    @case(\App\Enums\ToolbarItem::UNDO)
        <x-toolbar-item ref="undo" disable-option="cannotUndo"  title="{{ __('messages.undo') }}" shortcut="Ctrl+Z" icon="undo"/>
        @break
    @case(\App\Enums\ToolbarItem::REDO)
        <x-toolbar-item ref="redo" disable-option="cannotRedo" title="{{ __('messages.redo') }}" shortcut="Ctrl+Y" icon="redo"/>
        @break
    @case(\App\Enums\ToolbarItem::FONT_FAMILY)
        <div class="relative w-52">
            <select x-ref="fontFamily" class="toolbar-item spaced font-family" x-tooltip="'{{ __('messages.font_family') }}'">
                <option value="Arial" style="font-family: Arial,serif">Arial</option>
                <option value="Courier New" style="font-family: 'Courier New',serif">Courier New</option>
                <option value="Georgia" style="font-family: Georgia,serif">Georgia</option>
                <option value="Times New Roman" style="font-family: 'Times New Roman',serif">Times New Roman</option>
                <option value="Verdana" style="font-family: Verdana,serif">Verdana</option>
            </select>

        </div>


        @break
    @case(\App\Enums\ToolbarItem::NORMAL)
        <x-toolbar-item active-option="blockType == 'paragraph'" ref="normal" title="{{ __('messages.normal') }}" shortcut="Ctrl+Alt+0" icon="paragraph"/>
        @break
    @case(\App\Enums\ToolbarItem::H1)
        <x-toolbar-item active-option="blockType == 'h1'" ref="h1" title="{{ __('messages.heading_1') }}" shortcut="Ctrl+Alt+1" icon="h1"/>
        @break
    @case(\App\Enums\ToolbarItem::H2)
        <x-toolbar-item ref="h2" active-option="blockType == 'h2'" title="{{ __('messages.heading_2') }}" shortcut="Ctrl+Alt+2" icon="h2"/>
        @break
    @case(\App\Enums\ToolbarItem::H3)
        <x-toolbar-item ref="h3" active-option="blockType == 'h3'" title="{{ __('messages.heading_3') }}" shortcut="Ctrl+Alt+3" icon="h3"/>
        @break
    @case(\App\Enums\ToolbarItem::H4)
        <x-toolbar-item ref="h4" active-option="blockType == 'h4'" title="{{ __('messages.heading_4') }}" shortcut="Ctrl+Alt+4" icon="h4"/>
        @break
    @case(\App\Enums\ToolbarItem::H5)
        <x-toolbar-item ref="h5" active-option="blockType == 'h5'" title="{{ __('messages.heading_5') }}" shortcut="Ctrl+Alt+5" icon="h5"/>
        @break
    @case(\App\Enums\ToolbarItem::H6)
        <x-toolbar-item ref="h6" active-option="blockType == 'h6'" title="{{ __('messages.heading_6') }}" shortcut="Ctrl+Alt+6" icon="h6"/>
        @break
    @case(\App\Enums\ToolbarItem::BULLET)
        <x-toolbar-item ref="bullet" active-option="blockType == 'bullet'" title="{{ __('messages.bullet_list') }}" shortcut="Ctrl+Alt+7" icon="bullet-list"/>
        @break
    @case(\App\Enums\ToolbarItem::NUMBERED)
        <x-toolbar-item ref="numbered" active-option="blockType == 'number'" title="{{ __('messages.numbered_list') }}" shortcut="Ctrl+Alt+8" icon="numbered-list"/>
        @break
    @case(\App\Enums\ToolbarItem::QUOTE)
        <x-toolbar-item ref="quote" active-option="blockType == 'quote'" title="{{ __('messages.quote') }}" shortcut="Ctrl+Alt+Q" icon="quote"/>
        @break
    @case(\App\Enums\ToolbarItem::CODE)
        <x-toolbar-item ref="code" active-option="blockType == 'code'" title="{{ __('messages.code_block') }}" shortcut="Ctrl+Alt+C" icon="code"/>
        @break
    @case(\App\Enums\ToolbarItem::FONT_SIZE)
        <x-toolbar-item ref="decrement" class="font-decrement" title="{{ __('messages.decrease_font_size') }}" shortcut="Ctrl+Shift+," icon-class="format" icon="minus-icon"/>
        <input type="number" title="Font size" x-ref="fontSize" class="toolbar-item font-size-input w-15 " min="8" max="72" value="15">
        <x-toolbar-item ref="increment" class="font-increment" title="{{ __('messages.increase_font_size') }}" shortcut="Ctrl+Shift+." icon-class="format" icon="add-icon"/>
        @break
    @case(\App\Enums\ToolbarItem::BOLD)
        <x-toolbar-item active-option="isBold" ref="bold" title="{{ __('messages.bold') }}" shortcut="Ctrl+B" icon="bold"/>
        @break
    @case(\App\Enums\ToolbarItem::ITALIC)
        <x-toolbar-item active-option="isItalic" ref="italic" title="{{ __('messages.italic') }}" shortcut="Ctrl+I" icon="italic"/>
        @break
    @case(\App\Enums\ToolbarItem::UNDERLINE)
        <x-toolbar-item  active-option="isUnderline" ref="underline" title="{{ __('messages.underline') }}" shortcut="Ctrl+U" icon="underline"/>
        @break
    @case(\App\Enums\ToolbarItem::ICODE)
        <x-toolbar-item active-option="isCode" ref="icode" title="{{ __('messages.insert_code_block') }}" shortcut="Ctrl+Shift+C" icon="code"/>
        @break
    @case(\App\Enums\ToolbarItem::LINK)
        <x-toolbar-item active-option="isLink" ref="link" title="{{ __('messages.insert_link') }}" shortcut="Ctrl+K" icon="link"/>
        @break
    @case(\App\Enums\ToolbarItem::TEXT_COLOR)
        <x-text-color-dialog ref="text_color" icon="font-color" :title="__('messages.formatting_text_color')"/>
        @break
    @case(\App\Enums\ToolbarItem::BACKGROUND_COLOR)
        <x-text-color-dialog ref="background_color" icon="bg-color" :title="__('messages.formatting_background_color')"/>
        @break
    @case(\App\Enums\ToolbarItem::LOWERCASE)
        <x-toolbar-item active-option="isLowercase" ref="lowercase" title="{{ __('messages.lowercase') }}" shortcut="Ctrl+Shift+1" icon="lowercase"/>
        @break
    @case(\App\Enums\ToolbarItem::UPPERCASE)
        <x-toolbar-item active-option="isUppercase" ref="uppercase" title="{{ __('messages.uppercase') }}" shortcut="Ctrl+Shift+2" icon="uppercase"/>
        @break
    @case(\App\Enums\ToolbarItem::CAPITALIZE)
        <x-toolbar-item active-option="isCapitalize" ref="capitalize" title="{{ __('messages.capitalize') }}" shortcut="Ctrl+Shift+3" icon="capitalize"/>
        @break
    @case(\App\Enums\ToolbarItem::STRIKETHROUGH)
        <x-toolbar-item active-option="isStrikethrough" ref="strikethrough" title="{{ __('messages.strikethrough') }}" shortcut="Ctrl+Shift+S" icon="strikethrough"/>
        @break
    @case(\App\Enums\ToolbarItem::SUBSCRIPT)
        <x-toolbar-item active-option="isSubscript" ref="subscript" title="{{ __('messages.subscript') }}" shortcut="Ctrl+," icon="subscript"/>
        @break
    @case(\App\Enums\ToolbarItem::SUPERSCRIPT)
        <x-toolbar-item active-option="isSuperscript" ref="superscript" title="{{ __('messages.superscript') }}" shortcut="Ctrl+." icon="superscript"/>
        @break
    @case(\App\Enums\ToolbarItem::CLEAR)
        <x-toolbar-item ref="clear" title="{{ __('messages.clear_text_formatting') }}" shortcut="Ctrl+/" icon="clear"/>
        @break
    @case(\App\Enums\ToolbarItem::LEFT)
        <x-toolbar-item active-option="elementFormat == 'left'" ref="left" rtl-ref="right" title="{{ __('messages.left_align') }}" rtl-title="{{ __('messages.right_align') }}" shortcut="Ctrl+Shift+L" rtl-shortcut="Ctrl+Shift+R" icon="left-align" rtl-icon="right-align"/>
        @break
    @case(\App\Enums\ToolbarItem::CENTER)
        <x-toolbar-item active-option="elementFormat == 'center'" ref="center" title="{{ __('messages.center_align') }}" shortcut="Ctrl+Shift+E" icon="center-align"/>
        @break
    @case(\App\Enums\ToolbarItem::RIGHT)
        <x-toolbar-item active-option="elementFormat == 'right'" ref="right" rtl-ref="left" title="{{ __('messages.right_align') }}" rtl-title="{{ __('messages.left_align') }}" shortcut="Ctrl+Shift+R" rtl-shortcut="Ctrl+Shift+L" icon="right-align" rtl-icon="left-align"/>
        @break
    @case(\App\Enums\ToolbarItem::JUSTIFY)
        <x-toolbar-item active-option="elementFormat == 'justify'" ref="justify" title="{{ __('messages.justify_align') }}" shortcut="Ctrl+Shift+J" icon="justify-align"/>
        @break
    @case(\App\Enums\ToolbarItem::START)
        <x-toolbar-item active-option="elementFormat == 'start'" ref="start" rtl-ref="end" title="{{ __('messages.start_align') }}" rtl-title="{{ __('messages.end_align') }}" shortcut="Ctrl+Shift+[" rtl-shortcut="Ctrl+Shift+]" icon="left-align" rtl-icon="right-align"/>
        @break
    @case(\App\Enums\ToolbarItem::END)
        <x-toolbar-item active-option="elementFormat == 'end'" ref="end" rtl-ref="start" title="{{ __('messages.end_align') }}" rtl-title="{{ __('messages.start_align') }}" shortcut="Ctrl+Shift+]" rtl-shortcut="Ctrl+Shift+[" icon="right-align" rtl-icon="left-align"/>
        @break
    @case(\App\Enums\ToolbarItem::INDENT)
        <x-toolbar-item  ref="indent" title="{{ __('messages.indent') }}" shortcut="Ctrl+]" icon="indent"/>
        @break
    @case(\App\Enums\ToolbarItem::OUTDENT)
        <x-toolbar-item ref="outdent" title="{{ __('messages.outdent') }}" shortcut="Ctrl+[" icon="outdent"/>
        @break
    @case(\App\Enums\ToolbarItem::HR)
        <x-toolbar-item ref="hr" title="{{ __('messages.hr') }}" shortcut="" icon="horizontal-rule"/>
        @break
    @case(\App\Enums\ToolbarItem::IMAGE)
        <x-toolbar-item ref="image" title="{{ __('messages.image') }}" shortcut="" icon="image"/>
        @break
    @case(\App\Enums\ToolbarItem::DIVIDER)
        <div class="divider"></div>
        @break
@endswitch

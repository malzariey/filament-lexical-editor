@props(['toolbar' => '' ])
@php
    use Malzariey\FilamentLexicalEditor\Enums\ToolbarItem;
    $item = $toolbar instanceof ToolbarItem ? $toolbar : ToolbarItem::from($toolbar);
@endphp
@switch($item)
    @case(ToolbarItem::UNDO)
        <x-filament-lexical-editor::toolbar-item ref="undo" disable-option="cannotUndo"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.undo') }}" shortcut="Ctrl+Z" icon="undo"/>
        @break
    @case(ToolbarItem::REDO)
        <x-filament-lexical-editor::toolbar-item ref="redo" disable-option="cannotRedo"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.redo') }}" shortcut="Ctrl+Y" icon="redo"/>
        @break
    @case(ToolbarItem::FONT_FAMILY)
        <div class="relative w-52 h-11 py-1">
            <select x-ref="fontFamily" class="toolbar-item spaced font-family"
                    x-tooltip="'{{ __('filament-lexical-editor::lexical-editor.font_family') }}'">
                <option value="Arial" style="font-family: Arial,serif">Arial</option>
                <option value="Courier New" style="font-family: 'Courier New',serif">Courier New</option>
                <option value="Georgia" style="font-family: Georgia,serif">Georgia</option>
                <option value="Times New Roman" style="font-family: 'Times New Roman',serif">Times New Roman</option>
                <option value="Verdana" style="font-family: Verdana,serif">Verdana</option>
            </select>

        </div>


        @break
    @case(ToolbarItem::NORMAL)
        <x-filament-lexical-editor::toolbar-item active-option="blockType == 'paragraph'" ref="normal"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.normal') }}" shortcut="Ctrl+Alt+0"
                                                 icon="paragraph"/>
        @break
    @case(ToolbarItem::H1)
        <x-filament-lexical-editor::toolbar-item active-option="blockType == 'h1'" ref="h1"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.heading_1') }}" shortcut="Ctrl+Alt+1"
                                                 icon="h1"/>
        @break
    @case(ToolbarItem::H2)
        <x-filament-lexical-editor::toolbar-item ref="h2" active-option="blockType == 'h2'"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.heading_2') }}" shortcut="Ctrl+Alt+2"
                                                 icon="h2"/>
        @break
    @case(ToolbarItem::H3)
        <x-filament-lexical-editor::toolbar-item ref="h3" active-option="blockType == 'h3'"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.heading_3') }}" shortcut="Ctrl+Alt+3"
                                                 icon="h3"/>
        @break
    @case(ToolbarItem::H4)
        <x-filament-lexical-editor::toolbar-item ref="h4" active-option="blockType == 'h4'"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.heading_4') }}" shortcut="Ctrl+Alt+4"
                                                 icon="h4"/>
        @break
    @case(ToolbarItem::H5)
        <x-filament-lexical-editor::toolbar-item ref="h5" active-option="blockType == 'h5'"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.heading_5') }}" shortcut="Ctrl+Alt+5"
                                                 icon="h5"/>
        @break
    @case(ToolbarItem::H6)
        <x-filament-lexical-editor::toolbar-item ref="h6" active-option="blockType == 'h6'"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.heading_6') }}" shortcut="Ctrl+Alt+6"
                                                 icon="h6"/>
        @break
    @case(ToolbarItem::BULLET)
        <x-filament-lexical-editor::toolbar-item ref="bullet" active-option="blockType == 'bullet'"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.bullet_list') }}" shortcut="Ctrl+Alt+7"
                                                 icon="bullet-list"/>
        @break
    @case(ToolbarItem::NUMBERED)
        <x-filament-lexical-editor::toolbar-item ref="numbered" active-option="blockType == 'number'"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.numbered_list') }}" shortcut="Ctrl+Alt+8"
                                                 icon="numbered-list"/>
        @break
    @case(ToolbarItem::QUOTE)
        <x-filament-lexical-editor::toolbar-item ref="quote" active-option="blockType == 'quote'"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.quote') }}" shortcut="Ctrl+Alt+Q" icon="quote"/>
        @break
    @case(ToolbarItem::CODE)
        <x-filament-lexical-editor::toolbar-item ref="code" active-option="blockType == 'code'"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.code_block') }}" shortcut="Ctrl+Alt+C"
                                                 icon="code"/>
        @break
    @case(ToolbarItem::FONT_SIZE)
        <x-filament-lexical-editor::toolbar-item ref="decrement" class="font-decrement"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.decrease_font_size') }}" shortcut="Ctrl+Shift+,"
                                                 icon-class="format" icon="minus-icon"/>
        <input type="number" title="Font size" x-ref="fontSize" class="toolbar-item font-size-input w-16 " min="8"
               max="72" value="15">
        <x-filament-lexical-editor::toolbar-item ref="increment" class="font-increment"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.increase_font_size') }}" shortcut="Ctrl+Shift+."
                                                 icon-class="format" icon="add-icon"/>
        @break
    @case(ToolbarItem::BOLD)
        <x-filament-lexical-editor::toolbar-item active-option="isBold" ref="bold" title="{{ __('filament-lexical-editor::lexical-editor.bold') }}"
                                                 shortcut="Ctrl+B" icon="bold"/>
        @break
    @case(ToolbarItem::ITALIC)
        <x-filament-lexical-editor::toolbar-item active-option="isItalic" ref="italic"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.italic') }}" shortcut="Ctrl+I" icon="italic"/>
        @break
    @case(ToolbarItem::UNDERLINE)
        <x-filament-lexical-editor::toolbar-item active-option="isUnderline" ref="underline"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.underline') }}" shortcut="Ctrl+U"
                                                 icon="underline"/>
        @break
    @case(ToolbarItem::ICODE)
        <x-filament-lexical-editor::toolbar-item active-option="isCode" ref="icode"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.insert_code_block') }}" shortcut="Ctrl+Shift+C"
                                                 icon="code"/>
        @break
    @case(ToolbarItem::LINK)
        <x-filament-lexical-editor::toolbar-item active-option="isLink" ref="link"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.insert_link') }}" shortcut="Ctrl+K"
                                                 icon="link"/>
        @break
    @case(ToolbarItem::TEXT_COLOR)
        <x-filament-lexical-editor::text-color-dialog ref="text_color" icon="font-color"
                                                      :title="__('filament-lexical-editor::lexical-editor.formatting_text_color')"/>
        @break
    @case(ToolbarItem::BACKGROUND_COLOR)
        <x-filament-lexical-editor::text-color-dialog ref="background_color" icon="bg-color"
                                                      :title="__('filament-lexical-editor::lexical-editor.formatting_background_color')"/>
        @break
    @case(ToolbarItem::LOWERCASE)
        <x-filament-lexical-editor::toolbar-item active-option="isLowercase" ref="lowercase"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.lowercase') }}" shortcut="Ctrl+Shift+1"
                                                 icon="lowercase"/>
        @break
    @case(ToolbarItem::UPPERCASE)
        <x-filament-lexical-editor::toolbar-item active-option="isUppercase" ref="uppercase"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.uppercase') }}" shortcut="Ctrl+Shift+2"
                                                 icon="uppercase"/>
        @break
    @case(ToolbarItem::CAPITALIZE)
        <x-filament-lexical-editor::toolbar-item active-option="isCapitalize" ref="capitalize"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.capitalize') }}" shortcut="Ctrl+Shift+3"
                                                 icon="capitalize"/>
        @break
    @case(ToolbarItem::STRIKETHROUGH)
        <x-filament-lexical-editor::toolbar-item active-option="isStrikethrough" ref="strikethrough"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.strikethrough') }}" shortcut="Ctrl+Shift+S"
                                                 icon="strikethrough"/>
        @break
    @case(ToolbarItem::SUBSCRIPT)
        <x-filament-lexical-editor::toolbar-item active-option="isSubscript" ref="subscript"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.subscript') }}" shortcut="Ctrl+,"
                                                 icon="subscript"/>
        @break
    @case(ToolbarItem::SUPERSCRIPT)
        <x-filament-lexical-editor::toolbar-item active-option="isSuperscript" ref="superscript"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.superscript') }}" shortcut="Ctrl+."
                                                 icon="superscript"/>
        @break
    @case(ToolbarItem::CLEAR)
        <x-filament-lexical-editor::toolbar-item ref="clear" title="{{ __('filament-lexical-editor::lexical-editor.clear_text_formatting') }}"
                                                 shortcut="Ctrl+/" icon="clear"/>
        @break
    @case(ToolbarItem::LEFT)
        <x-filament-lexical-editor::toolbar-item active-option="elementFormat == 'left'" ref="left" rtl-ref="right"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.left_align') }}"
                                                 rtl-title="{{ __('filament-lexical-editor::lexical-editor.right_align') }}" shortcut="Ctrl+Shift+L"
                                                 rtl-shortcut="Ctrl+Shift+R" icon="left-align" rtl-icon="right-align"/>
        @break
    @case(ToolbarItem::CENTER)
        <x-filament-lexical-editor::toolbar-item active-option="elementFormat == 'center'" ref="center"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.center_align') }}" shortcut="Ctrl+Shift+E"
                                                 icon="center-align"/>
        @break
    @case(ToolbarItem::RIGHT)
        <x-filament-lexical-editor::toolbar-item active-option="elementFormat == 'right'" ref="right" rtl-ref="left"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.right_align') }}"
                                                 rtl-title="{{ __('filament-lexical-editor::lexical-editor.left_align') }}" shortcut="Ctrl+Shift+R"
                                                 rtl-shortcut="Ctrl+Shift+L" icon="right-align" rtl-icon="left-align"/>
        @break
    @case(ToolbarItem::JUSTIFY)
        <x-filament-lexical-editor::toolbar-item active-option="elementFormat == 'justify'" ref="justify"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.justify_align') }}" shortcut="Ctrl+Shift+J"
                                                 icon="justify-align"/>
        @break
    @case(ToolbarItem::START)
        <x-filament-lexical-editor::toolbar-item active-option="elementFormat == 'start'" ref="start" rtl-ref="end"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.start_align') }}"
                                                 rtl-title="{{ __('filament-lexical-editor::lexical-editor.end_align') }}" shortcut="Ctrl+Shift+["
                                                 rtl-shortcut="Ctrl+Shift+]" icon="left-align" rtl-icon="right-align"/>
        @break
    @case(ToolbarItem::END)
        <x-filament-lexical-editor::toolbar-item active-option="elementFormat == 'end'" ref="end" rtl-ref="start"
                                                 title="{{ __('filament-lexical-editor::lexical-editor.end_align') }}"
                                                 rtl-title="{{ __('filament-lexical-editor::lexical-editor.start_align') }}" shortcut="Ctrl+Shift+]"
                                                 rtl-shortcut="Ctrl+Shift+[" icon="right-align" rtl-icon="left-align"/>
        @break
    @case(ToolbarItem::INDENT)
        <x-filament-lexical-editor::toolbar-item ref="indent" title="{{ __('filament-lexical-editor::lexical-editor.indent') }}" shortcut="Ctrl+]"
                                                 icon="indent"/>
        @break
    @case(ToolbarItem::OUTDENT)
        <x-filament-lexical-editor::toolbar-item ref="outdent" title="{{ __('filament-lexical-editor::lexical-editor.outdent') }}" shortcut="Ctrl+["
                                                 icon="outdent"/>
        @break
    @case(ToolbarItem::HR)
        <x-filament-lexical-editor::toolbar-item ref="hr" title="{{ __('filament-lexical-editor::lexical-editor.hr') }}" shortcut=""
                                                 icon="horizontal-rule"/>
        @break
    @case(ToolbarItem::IMAGE)
        <x-filament-lexical-editor::toolbar-item ref="image" title="{{ __('filament-lexical-editor::lexical-editor.image') }}" shortcut=""
                                                 icon="image"/>
        @break
    @case(ToolbarItem::DIVIDER)
        <div class="divider"></div>
        @break
@endswitch

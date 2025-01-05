<?php

namespace Malzariey\FilamentLexicalEditor;

use Closure;
use Filament\Forms\Components\Field;
use Malzariey\FilamentLexicalEditor\Enums\ToolbarItem;

class FilamentLexicalEditor extends Field{
    protected string $view = 'filament-lexical-editor::lexical-editor';

    public array | Closure $enabledToolbars = [
        ToolbarItem::UNDO, ToolbarItem::REDO,ToolbarItem::DIVIDER,ToolbarItem::FONT_FAMILY, ToolbarItem::DIVIDER,ToolbarItem::NORMAL, ToolbarItem::H1, ToolbarItem::H2, ToolbarItem::H3,
        ToolbarItem::H4, ToolbarItem::H5, ToolbarItem::H6,ToolbarItem::DIVIDER, ToolbarItem::BULLET, ToolbarItem::NUMBERED, ToolbarItem::QUOTE,
        ToolbarItem::CODE,ToolbarItem::DIVIDER, ToolbarItem::FONT_SIZE,ToolbarItem::DIVIDER, ToolbarItem::BOLD, ToolbarItem::ITALIC, ToolbarItem::UNDERLINE,
        ToolbarItem::ICODE, ToolbarItem::LINK,ToolbarItem::DIVIDER, ToolbarItem::TEXT_COLOR, ToolbarItem::BACKGROUND_COLOR,ToolbarItem::DIVIDER, ToolbarItem::LOWERCASE,
        ToolbarItem::UPPERCASE, ToolbarItem::CAPITALIZE, ToolbarItem::STRIKETHROUGH, ToolbarItem::SUBSCRIPT, ToolbarItem::SUPERSCRIPT,
        ToolbarItem::CLEAR,ToolbarItem::DIVIDER, ToolbarItem::LEFT, ToolbarItem::CENTER, ToolbarItem::RIGHT, ToolbarItem::JUSTIFY, ToolbarItem::START,
        ToolbarItem::END,ToolbarItem::DIVIDER, ToolbarItem::INDENT, ToolbarItem::OUTDENT,ToolbarItem::DIVIDER, ToolbarItem::HR,ToolbarItem::IMAGE,ToolbarItem::DIVIDER
    ];

    protected function setUp(): void
    {
        parent::setUp();

        $this->columnSpanFull();
    }
    public function enabledToolbars(array | Closure $enabledToolbars): static{
        $this->enabledToolbars = $enabledToolbars;

        return $this;
    }
    public function getEnabledToolbars(): array{
        return $this->evaluate($this->enabledToolbars);
    }
}

<?php

use Malzariey\FilamentLexicalEditor\Enums\ToolbarItem;
use Malzariey\FilamentLexicalEditor\FilamentLexicalEditor;
use Malzariey\FilamentLexicalEditor\LexicalEditor;

it('keeps the legacy class name as an alias', function (): void {
    expect(FilamentLexicalEditor::make('content'))->toBeInstanceOf(LexicalEditor::class);
});

it('allows toolbar items to be configured', function (): void {
    $field = LexicalEditor::make('content')
        ->enabledToolbars(fn (): array => [
            ToolbarItem::BOLD,
            ToolbarItem::ITALIC,
        ]);

    expect($field->getEnabledToolbars())->toBe([
        ToolbarItem::BOLD,
        ToolbarItem::ITALIC,
    ]);
});

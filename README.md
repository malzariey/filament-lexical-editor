# Filament Lexical Editor.

[![Latest Version on Packagist](https://img.shields.io/packagist/v/malzariey/filament-lexical-editor.svg?style=flat-square)](https://packagist.org/packages/malzariey/filament-lexical-editor)
[![Total Downloads](https://img.shields.io/packagist/dt/malzariey/filament-lexical-editor.svg?style=flat-square)](https://packagist.org/packages/malzariey/filament-lexical-editor)



This package provides an implementation of Meta's Lexical Editor within the FilamentPHP framework. It offers a modern, extensible text editor that can be easily integrated into your FilamentPHP projects.

## Installation

You can install the package via composer:

```bash
composer require malzariey/filament-lexical-editor
```

Optionally, you can publish the views using

```bash
php artisan vendor:publish --tag="filament-lexical-editor-views"
```



## Usage
Use the `FilamentLexicalEditor` field in your form schema to add the Lexical Editor to your form.
```php
    use Malzariey\FilamentLexicalEditor\FilamentLexicalEditor;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                FilamentLexicalEditor::make('content'),
            ]);
    }
```

## Customize Toolbar
You can customize the toolbar by using the `enabledToolbars` method. The method accepts an array of ToolbarItem constants. The following is a list of available toolbar items:

```php
    
    FilamentLexicalEditor::make('content')
        ->enabledToolbars([
            ToolbarItem::UNDO, ToolbarItem::REDO,ToolbarItem::FONT_FAMILY, ToolbarItem::NORMAL, ToolbarItem::H1, ToolbarItem::H2, ToolbarItem::H3,
            ToolbarItem::H4, ToolbarItem::H5, ToolbarItem::H6, ToolbarItem::BULLET, ToolbarItem::NUMBERED, ToolbarItem::QUOTE,
            ToolbarItem::CODE, ToolbarItem::FONT_SIZE, ToolbarItem::BOLD, ToolbarItem::ITALIC, ToolbarItem::UNDERLINE,
            ToolbarItem::ICODE, ToolbarItem::LINK, ToolbarItem::TEXT_COLOR, ToolbarItem::BACKGROUND_COLOR, ToolbarItem::LOWERCASE,
            ToolbarItem::UPPERCASE, ToolbarItem::CAPITALIZE, ToolbarItem::STRIKETHROUGH, ToolbarItem::SUBSCRIPT, ToolbarItem::SUPERSCRIPT,
            ToolbarItem::CLEAR, ToolbarItem::LEFT, ToolbarItem::CENTER, ToolbarItem::RIGHT, ToolbarItem::JUSTIFY, ToolbarItem::START,
            ToolbarItem::END, ToolbarItem::INDENT, ToolbarItem::OUTDENT, ToolbarItem::HR,ToolbarItem::IMAGE
        ]),

```

## Adding Dividers between Toolbar Actions
To add a divider between toolbar actions, you can use the ToolbarItem::DIVIDER constant.
```php
    
    FilamentLexicalEditor::make('content')
        ->enabledToolbars([
            ToolbarItem::UNDO, ToolbarItem::REDO,
            ToolbarItem::DIVIDER,
            ToolbarItem::FONT_FAMILY, 
            ToolbarItem::DIVIDER,
            ToolbarItem::NORMAL,
        ]),

```

### Screenshots

#### Light mode

![FilamentLexicalEditor Light](https://github.com/malzariey/filament-lexical-editor/raw/main/art/light.png)

#### Dark mode

![FilamentLexicalEditor Dark](https://github.com/malzariey/filament-lexical-editor/raw/main/art/dark.png)


# Styling

If you're [building a custom Filament theme](https://filamentphp.com/docs/2.x/admin/appearance#building-themes), you need one more step to make the calendar theme match your custom theme.

Add this line to your `resources/css/{panel_name}/theme.css` file.

```css
@import '/vendor/malzariey/filament-lexical-editor/resources/css/index.css';
```


## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [Majid Al Zariey](https://github.com/malzariey)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

## Acknowledgements

- This project makes use of [Lexical Editor](https://github.com/facebook/lexical) by [Meta](https://github.com/facebook).
- Special thanks to [JetBrains](https://www.jetbrains.com), whose support to open-source projects has been tremendously valuable for our project's progress and improvement. Through their [Open Source Support Program](https://www.jetbrains.com/community/opensource/#support), JetBrains has generously provided us with free licenses to their high-quality professional developer tools, including IntelliJ IDEA and PhpStorm. These tools have greatly improved our productivity and made it easier to maintain high quality code. JetBrains has demonstrated a strong commitment to assisting the open source community, making a significant contribution to promoting open-source software and collaboration. We wholeheartedly thank JetBrains for their support and for having us in their open-source project support program.

[![JetBrains Logo](https://www.jetbrains.com/company/brand/img/jetbrains_logo.png)](https://www.jetbrains.com/)

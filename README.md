# Implemenation of meta's lexical editor in FilamentPHP, a modern, extensible text editor framework.

[![Latest Version on Packagist](https://img.shields.io/packagist/v/malzariey/filament-lexical-editor.svg?style=flat-square)](https://packagist.org/packages/malzariey/filament-lexical-editor)
[![GitHub Tests Action Status](https://img.shields.io/github/actions/workflow/status/malzariey/filament-lexical-editor/run-tests.yml?branch=main&label=tests&style=flat-square)](https://github.com/malzariey/filament-lexical-editor/actions?query=workflow%3Arun-tests+branch%3Amain)
[![GitHub Code Style Action Status](https://img.shields.io/github/actions/workflow/status/malzariey/filament-lexical-editor/fix-php-code-styling.yml?branch=main&label=code%20style&style=flat-square)](https://github.com/malzariey/filament-lexical-editor/actions?query=workflow%3A"Fix+PHP+code+styling"+branch%3Amain)
[![Total Downloads](https://img.shields.io/packagist/dt/malzariey/filament-lexical-editor.svg?style=flat-square)](https://packagist.org/packages/malzariey/filament-lexical-editor)



This is where your description should go. Limit it to a paragraph or two. Consider adding a small example.

## Installation

You can install the package via composer:

```bash
composer require malzariey/filament-lexical-editor
```

You can publish and run the migrations with:

```bash
php artisan vendor:publish --tag="filament-lexical-editor-migrations"
php artisan migrate
```

You can publish the config file with:

```bash
php artisan vendor:publish --tag="filament-lexical-editor-config"
```

Optionally, you can publish the views using

```bash
php artisan vendor:publish --tag="filament-lexical-editor-views"
```

This is the contents of the published config file:

```php
return [
];
```

## Usage

```php
$filamentLexicalEditor = new Malzariey\FilamentLexicalEditor();
echo $filamentLexicalEditor->echoPhrase('Hello, Malzariey!');
```

## Testing

```bash
composer test
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

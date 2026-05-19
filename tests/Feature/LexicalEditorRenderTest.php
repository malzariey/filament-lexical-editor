<?php

use Filament\Support\Facades\FilamentAsset;

it('registers views and assets in a laravel app', function (): void {
    $this->app['router']->get('/lexical-editor-test', function () {
        return response()->json([
            'database' => config('database.connections.sqlite.database'),
            'view_exists' => view()->exists('filament-lexical-editor::lexical-editor'),
            'script_src' => FilamentAsset::getAlpineComponentSrc(
                'lexical-component',
                'malzariey/filament-lexical-editor',
            ),
        ]);
    });

    $this
        ->get('/lexical-editor-test')
        ->assertOk()
        ->assertJson([
            'database' => ':memory:',
            'view_exists' => true,
        ])
        ->assertJsonPath('script_src', fn (?string $src): bool => filled($src));
});

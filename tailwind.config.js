const preset = require('./vendor/filament/filament/tailwind.config.preset')

module.exports = {
    presets: [preset],
    content: [
        './resources/views/**/*.blade.php',
    ],
    safelist:[
        'dark:invert',
        'w-8',

    ]


}

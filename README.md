# Drawing / Animating SVG paths back and forth without external libraries

## Description
SVG line-drawing animations with promises and async functions and without dependencies
Async allows to chain animations.

## Description
Open the index.html in dist folder to see what is meant.

## Getting Started
To build it I used rollup with one simple plugin called `rollup-plugin-generate-html-template`. 
So you might run 

```yarn add rollup rollup-plugin-generate-html-template```

when you want to build this for older browser (no async), you need to run it through babel


## Authors

* **larslo**  (https://larslo.de)


## License

This project is licensed under the MIT License

## Todo

add an easing animation lib, all running just linear, maybe some of these https://gist.github.com/gre/1650294

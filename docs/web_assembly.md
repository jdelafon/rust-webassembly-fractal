
##### Make the wasm readable for debug

Install "wabt" (e.g. with Homebrew).

    wasm2wast mandelbrot.wasm -o mandelbrot.wast

##### Clean up the wasm file

With wasm-gc: https://github.com/alexcrichton/wasm-gc

    cargo install wasm-gc
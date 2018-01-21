
Refs:

- [hackernoon - Compiling Rust to WebAssembly guide](https://hackernoon.com/compiling-rust-to-webassembly-guide-411066a69fde)
- [asquera - Setting up a Rust dev env](http://asquera.de/blog/2017-03-03/setting-up-a-rust-devenv/)
- [asquera - The path to Rust on the web](http://asquera.de/blog/2017-04-10/the-path-to-rust-on-the-web/)


### Install Rust and environment

Used `rustup` to install Rust:

    curl https://sh.rustup.rs -sSf | sh
    # Follow instructions...

    rustup update
    rustup install stable
    rustup default stable
    rustup component add rust-src
    rustup component add rust-docs

Enable compilation from Rust to WebAssembly:
(...missing: how to get emsdk - the emscripten software dev kit)

    source ../emsdk-portable/emsdk_env.sh
    
    rustup target add wasm32-unknown-emscripten
    
Check that everything works:

    emcc -v
    cargo -V
    rustc -V

Start the project

    cargo init --bin mytest && cd mytest
    mv src/main.rs src/mandelbrot.rs
        

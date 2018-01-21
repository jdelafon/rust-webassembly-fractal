

Refs:

- [hackernoon - Compiling Rust to WebAssembly guide](https://hackernoon.com/compiling-rust-to-webassembly-guide-411066a69fde)
- [asquera - Setting up a Rust dev env](http://asquera.de/blog/2017-03-03/setting-up-a-rust-devenv/)
- [asquera - The path to Rust on the web](http://asquera.de/blog/2017-04-10/the-path-to-rust-on-the-web/)

### Install

Used `rustup` to install Rust:

    curl https://sh.rustup.rs -sSf | sh
    # Follow instructions...

    rustup update
    rustup install stable
    rustup default stable
    rustup component add rust-src
    rustup component add rust-docs

WebAssembly:

    rustup target add wasm32-unknown-emscripten

### Startup

(...missing: how to get emsdk - the emscripten software dev kit)

    source ../emsdk-portable/emsdk_env.sh

Check:

    emcc -v
    cargo -V
    rustc -V

Start the project

    cargo init --bin mytest && cd mytest
    mv src/main.rs src/mandelbrot.rs

### Compile to Web Assembly

    rustc --target=wasm32-unknown-emscripten src/mandelbrot.rs -o weba/mandelbrot.html

The build goes to /weba/. It produces a .wasm, a .js and a .html file.

* The .wasm is the WebAssembly binary file.
* The .html is ready to load in a browser with a built-in console.
* The .js is the file to load in a <script> tag in order to use wasm functions in JS.

##### Make the wasm readable

Install "wabt" (e.g. with Homebrew).

    wasm2wast mandelbrot.wasm -o mandelbrot.wast

### Run in a web page

- Go to /weba/
- Run a web server at localhost:8000:

      ```
      python -m SimpleHTTPServer
      ```
      
- Make sure web assembly is enabled in the browser
    - Chrome: `chrome://flags` -> "WebAssembly" stuff  
    - Firefox: `about:config` -> "wasm" stuff 
- Go to 'localhost:8000/index.html' in a browser. 

### Rust coding tools:

clippy: linting

    rustup run nightly cargo install clippy
    
rustfmt: code formatter

    cargo install rustfmt

##### Code completion service: Racer

    cargo install racer

In .bashrc:

    # Mac
    export RUST_SRC_PATH=${HOME}/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/src
    # Linux
    export RUST_SRC_PATH=${HOME}/.rustup/toolchains/stable-x86_64-unknown-linux-gnu/lib/rustlib/src/rust/src

Test that it works:

    racer complete std::io::B   # shows completion options
    
### Use a nightly build

(May be useful sometimes, e.g. installing clippy requires that)

    # Install the nightly alongside the stable version
    rustup toolchain install nightly
    # In a project directory
    rustup override set nightly



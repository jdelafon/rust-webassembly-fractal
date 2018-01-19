

Refs:

- [hackernoon](https://hackernoon.com/compiling-rust-to-webassembly-guide-411066a69fde)
- [asquera](http://asquera.de/blog/2017-03-03/setting-up-a-rust-devenv/)

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

    source ../emsdk-portable/emsdk_env.sh

Check:

    emcc -v
    cargo -V
    rustc -V

Start the project

    cargo init --bin mytest && cd mytest
    mv src/main.rs src/hello.rs

### Compile to Web Assembly

    rustc --target=wasm32-unknown-emscripten src/hello.rs -o weba/hello.html

The build goes to /weba/.

### Run in a web page

- Go to /weba/
- Run a web server at localhost:8000:

      python -m SimpleHTTPServer
      
  or 
  
      # npm install -g http-server
      http-server
      
- Make sure web assembly is enabled in the browser
    - Chrome: `chrome://flags` -> "WebAssembly" stuff  
    - Firefox: `about:config` -> "wasm" stuff 
- Go to 'localhost:8000/hello.html' in a browser. 

### Other tools:

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



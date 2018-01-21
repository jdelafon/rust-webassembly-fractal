
### Rust coding tools:

##### Formatting

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


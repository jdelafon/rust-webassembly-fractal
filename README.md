
### Startup

Load *emscripten* executables:

    source ../emsdk-portable/emsdk_env.sh

Check:

    emcc -v
    rustc -V

### Compile Rust files to Web Assembly

    rustc --target=wasm32-unknown-emscripten src/mandelbrot.rs -o weba/mandelbrot.html

The build goes to /weba/. It produces a ".wasm", a ".js" and a ".html" file.

* The .wasm is the WebAssembly binary file.
* The .html is ready to load in a browser with a built-in console.
* The .js is the file to load in a <script> tag in order to use wasm functions in JS.

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


### Make the wasm readable for debug

Install "wabt" (e.g. with Homebrew).

    wasm2wast mandelbrot.wasm -o mandelbrot.wast


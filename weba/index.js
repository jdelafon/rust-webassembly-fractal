
// Ref: http://progur.com/2017/02/create-mandelbrot-fractal-javascript.html


(function() {

    var maxIterations = 100;
    var magnificationFactor = 300;  // 2900
    var panX = 1.5;  // 0.6
    var panY = 1;  // 0.7
    var SIZE = 500;

    Module['onRuntimeInitialized'] = onRuntimeInitialized;
    function onRuntimeInitialized() {
        jsFractal();
        webaFractal();
    }

    /**
     * ----   WASM   ----
     */
    function webaFractal() {
        var canvas = newCanvas();
        var ctx = canvas.getContext("2d");
        var timeWeba = 0;
        var iterations = 0;

        for (var x = 0; x < canvas.width; x++) {
            for (var y = 0; y < canvas.height; y++) {

                var xx = x / magnificationFactor - panX;
                var yy = y / magnificationFactor - panY;

                /* WASM !!! */
                var t0 = performance.now();
                var belongsToSet = _belongs_to_mandelbrot_set(xx, yy, maxIterations);
                var t1 = performance.now();
                timeWeba += t1 - t0;
                iterations += 1;

                if (x % 100 < 1e-8 && y % 100 < 1e-8) {
                    console.log("Wasm:", t1 - t0, timeWeba);
                }

                drawPoint(ctx, x, y, belongsToSet);
            }
        }
        console.log("Wasm time:", timeWeba);
    }

    /**
     * ----   JS   ----
     */
    function jsFractal() {
        var canvas = newCanvas();
        var ctx = canvas.getContext("2d");
        var timeJS = 0;
        var iterations = 0;

        // warmup
        belongsToMandelbrotSet(0, 0, maxIterations);

        for (var x = 0; x < canvas.width; x++) {
            for (var y = 0; y < canvas.height; y++) {

                var xx = x / magnificationFactor - panX;
                var yy = y / magnificationFactor - panY;

                /* JS */
                var t0 = performance.now();
                var belongsToSet = belongsToMandelbrotSet(xx, yy, maxIterations);
                var t1 = performance.now();
                timeJS += t1 - t0;
                iterations += 1;

                if (x % 100 < 1e-8 && y % 100 < 1e-8) {
                    console.log("JS:", t1 - t0, timeJS);
                }

                drawPoint(ctx, x, y, belongsToSet);
            }
        }
        console.log("JS time:", timeJS);
    }

    /** JS version */
    function belongsToMandelbrotSet(x, y, maxIterations) {
        var realComponentOfResult = x;
        var imaginaryComponentOfResult = y;
        for (var i = 0; i <= maxIterations; i++) {
            var tempRealComponent = realComponentOfResult * realComponentOfResult
                - imaginaryComponentOfResult * imaginaryComponentOfResult
                + x;
            var tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult
                + y;
            realComponentOfResult = tempRealComponent;
            imaginaryComponentOfResult = tempImaginaryComponent;

            // Color: return as a percentage
            if (realComponentOfResult * imaginaryComponentOfResult > 5) {
                return (i / maxIterations * 100);
            }
        }
        return 0;   // Return zero if in set
    }

    function drawPoint(ctx, x, y, belongsToSet) {
        if (belongsToSet) {
            if (belongsToSet === 0) {
                ctx.fillStyle = '#000';
                ctx.fillRect(x,y, 1,1); // Draw a black pixel
            } else {
                ctx.fillStyle = 'hsl(0, 100%, ' + belongsToSet + '%)';
                ctx.fillRect(x,y, 1,1); // Draw a colorful pixel
            }
        }
    }

    function newCanvas() {
        var canvas = document.createElement("canvas");
        canvas.width = SIZE;
        canvas.height = SIZE;
        document.body.appendChild(canvas);
        return canvas;
    }

})();


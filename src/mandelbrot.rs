
// Functions that you wish to access from Javascript must be marked as no_mangle
#[no_mangle]
pub fn belongs_to_mandelbrot_set(x: f64, y: f64, max_iterations: u64) -> f64 {
    // println!("{}", format!("!!! {} {} {}", x, y, max_iterations));

    let mut real_component_of_result: f64 = x;
    let mut imaginary_component_of_result: f64 = y;

    for i in 0..max_iterations {
        let temp_real_component: f64 = real_component_of_result * real_component_of_result
            - imaginary_component_of_result * imaginary_component_of_result
            + x;
        let temp_imaginary_component: f64 = 2.0 * real_component_of_result * imaginary_component_of_result
            + y;
        real_component_of_result = temp_real_component;
        imaginary_component_of_result = temp_imaginary_component;

        // Color: return a percentage
        if real_component_of_result * imaginary_component_of_result > 5.0 {
            return i as f64 / max_iterations as f64 * 100.0;
        }
    }
    return 0.0;   // Return zero if in set
}

fn main() {
    println!("mais.rs: My fractal application in Rust");
}


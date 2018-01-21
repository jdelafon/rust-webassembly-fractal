
// Functions that you wish to access from Javascript
// must be marked as no_mangle
#[no_mangle]
pub fn belongs_to_mandelbrot_set(x: u32, y: u32, max_iterations: u32) -> f32 {
    println!("!!!");

    let mut real_component_of_result: f32 = x as f32;
    let mut imaginary_component_of_result: f32 = y as f32;

    for i in 0..max_iterations {
        let temp_real_component: f32 = real_component_of_result * real_component_of_result
            - imaginary_component_of_result * imaginary_component_of_result
            + x as f32;
        let temp_imaginary_component: f32 = 2.0 * real_component_of_result * imaginary_component_of_result
            + y as f32;
        real_component_of_result = temp_real_component;
        imaginary_component_of_result = temp_imaginary_component;

        // Return a number as a percentage
        if real_component_of_result * imaginary_component_of_result > 5.0 {
            return i as f32 / max_iterations as f32 * 100.0;
        }
    }
    return 0.0;   // Return zero if in set
}

fn main() {
    println!("My fractal application in Rust");
}


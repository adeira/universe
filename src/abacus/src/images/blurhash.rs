use blurhash_wasm::{encode, EncodingError};
use image::DynamicImage;

/// This function calculates blurhash of the image (https://blurha.sh/).
pub(in crate::images) fn calculate_image_blurhash(
    image: DynamicImage,
) -> Result<String, EncodingError> {
    // TODO: the Blurhash calculation appears to be very slow for large images!
    let input = image.to_rgba8();
    let (width, height) = input.dimensions();
    encode(input.into_vec(), 4, 4, width as usize, height as usize)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn blurhash_test() {
        let image = image::open("src/images/tests/data/img.png").unwrap();
        assert_eq!(
            calculate_image_blurhash(image).unwrap(),
            "UIFFXSUH]:+p@-5c+*JO@[s~[Q6.}.F_jDOZ"
        );
    }
}

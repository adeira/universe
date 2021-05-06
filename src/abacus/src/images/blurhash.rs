use blurhash_wasm::{encode, EncodingError};
use image::DynamicImage;

/// This function calculates blurhash of the image (https://blurha.sh/).
///
/// # How fast is encoding? Decoding?
///
/// Blurhash implementations are not very optimised. Running them on very large images can be a bit
/// slow. However! The trick to using the algorithm efficiently is to not run it on full-sized data.
/// The fine detail of an image is all thrown away, so you should scale your images down before
/// running BlurHash on them. If you are creating thumbnails, run BlurHash on those instead of the
/// full images. (source: https://github.com/woltapp/blurhash)
pub(in crate::images) fn calculate_image_blurhash(
    image: DynamicImage,
) -> Result<String, EncodingError> {
    let thumbnail = image.thumbnail(32, 32);
    let input = thumbnail.to_rgba8();
    let (width, height) = input.dimensions();
    encode(input.into_vec(), 4, 3, width as usize, height as usize)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn blurhash_test_png() {
        let image = image::open("src/images/tests/data/img.png").unwrap();
        assert_eq!(
            calculate_image_blurhash(image).unwrap(),
            "LJEMCJUH=z;a[OA3#uNY@]bC[RF5"
        );
    }

    #[test]
    fn blurhash_test_jpg() {
        let image = image::open("src/images/tests/data/img.jpg").unwrap();
        assert_eq!(
            calculate_image_blurhash(image).unwrap(),
            "LNN+%~-pTw^j}?VyVZV?}:VstQr:"
        );
    }
}

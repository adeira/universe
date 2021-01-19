// This module should be responsible for processing images:
// 1) generate blurhashes and save all the info into database (TODO)
// 2) strip images metadata (TODO)
// 3) upload images to S3 (TODO, via `rusoto_s3`)

use blurhash_wasm::{encode, EncodingError};
use image::DynamicImage;

pub(in crate::images) fn calculate_image_blurhash(
    image: DynamicImage,
) -> Result<String, EncodingError> {
    let input = image.to_rgba8();
    let (width, height) = input.dimensions();
    encode(input.into_vec(), 4, 3, width as usize, height as usize)
}

pub(in crate) fn resolve_cloudfront_url(path: &str) -> String {
    let cloudfront_domain = "https://d3uc46g155tf3t.cloudfront.net/";
    format!(
        "{}/{}",
        cloudfront_domain.trim_end_matches('/'),
        path.trim_start_matches('/')
    )
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::path::Path;

    #[test]
    fn blurhash_test() {
        let image = image::open("src/images/tests/data/img.png").unwrap();
        assert_eq!(
            calculate_image_blurhash(image).unwrap(),
            // should be "LGF5]+Yk^6#M@-5c,1J5@[or[Q6.", see: https://blurha.sh/
            "LIFFXSUH]:+p@-5c+*JO@[s~[Q6."
        );
    }

    #[test]
    fn resolve_cloudfrom_url_happy_path() {
        insta::assert_snapshot!(resolve_cloudfront_url("test.png"))
    }

    #[test]
    fn resolve_cloudfrom_url_leading_slash() {
        insta::assert_snapshot!(resolve_cloudfront_url("/test.png"))
    }
}

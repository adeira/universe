# Documentation: https://docs.brew.sh/Formula-Cookbook
#                https://rubydoc.brew.sh/Formula
class RossumDmv2Analyze < Formula
  desc ""
  homepage "https://github.com/adeira/universe"
  license ""

  on_macos do
    # openssl sha256 <file>
    url "https://github.com/adeira/universe/releases/download/rossum-dmv2-analyze%2F0.1.1/aarch64-apple-darwin"
    sha256 "3318dfb10f4cc2c5d0596495c63812d6139cc4c0e94eced353ff86863c83175c"
  end

  def install
    bin.install "aarch64-apple-darwin" => "rossum-dmv2-analyze"
  end

  test do
    # `test do` will create, run in and delete a temporary directory.
    #
    # This test will fail and we won't accept that! For Homebrew/homebrew-core
    # this will need to be a test that verifies the functionality of the
    # software. Run the test with `brew test adeira/universe/rossum-dmv2-analyze`. Options passed
    # to `brew install` such as `--HEAD` also need to be provided to `brew test`.
    #
    # The installed folder is not in the path, so use the entire path to any
    # executables being tested: `system "#{bin}/program", "do", "something"`.
    system "false"
  end
end

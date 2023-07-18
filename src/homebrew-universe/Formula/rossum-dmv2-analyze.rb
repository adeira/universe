# Documentation: https://docs.brew.sh/Formula-Cookbook
#                https://rubydoc.brew.sh/Formula
class RossumDmv2Analyze < Formula
  desc ""
  homepage "https://github.com/adeira/universe"
  license ""

  on_macos do
    on_arm do
      # openssl sha256 <file>
      url "https://github.com/adeira/universe/releases/download/rossum-dmv2-analyze%2F0.1.1/aarch64-apple-darwin"
      sha256 "3318dfb10f4cc2c5d0596495c63812d6139cc4c0e94eced353ff86863c83175c"
    end

    on_intel do
      # openssl sha256 <file>
      url "https://github.com/adeira/universe/releases/download/rossum-dmv2-analyze%2F0.1.1/x86_64-apple-darwin"
      sha256 "f85f3f0e67248bee76c7f095636361b17b72a704e2dc6d6ff9a8f3d9a044f517"
    end
  end

  def install
    if OS.mac? && Hardware::CPU.arm?
      bin.install "aarch64-apple-darwin" => "rossum-dmv2-analyze"
    end

    if OS.mac? && Hardware::CPU.intel?
      bin.install "x86_64-apple-darwin" => "rossum-dmv2-analyze"
    end
  end
end

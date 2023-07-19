# Documentation: https://docs.brew.sh/Formula-Cookbook
#                https://rubydoc.brew.sh/Formula
class RossumDmv2Analyze < Formula
  desc ""
  homepage "https://github.com/adeira/universe"
  license ""

  on_macos do
    on_arm do
      url "https://github.com/adeira/universe/releases/download/rossum-dmv2-analyze%2F0.2.0/aarch64-apple-darwin"
      sha256 "631098116c218ee1630609ea02cacbb6dd9040054a4b703fb1a30c92a8ac90cb"
    end

    on_intel do
      url "https://github.com/adeira/universe/releases/download/rossum-dmv2-analyze%2F0.2.0/x86_64-apple-darwin"
      sha256 "caaba937fe4e8fe962201dd5e7534b29be0ee58856a6092a52b9e299e4e78f79"
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

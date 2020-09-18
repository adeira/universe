"""
Builds Yarn Workspaces via Babel and makes it ready for other repositories.
"""

load("@build_bazel_rules_nodejs//:index.bzl", "js_library")
load("@npm//@babel/cli:index.bzl", "babel")

def build_yarn_workspace(name, package_name, deps = []):
    babel(
        name = "%s.es5" % name,
        outs = ["dist"],
        args = [
            "$(execpath src)",
            "--out-dir",
            "$(@D)/dist",
            "--out-file-extension",
            ".js",
            "--ignore",
            "**/__tests__/**",
        ],
        data = [
            ":package.json",
            ":src",
            "//:babel.config.js",
            "//:package.json",
            "@npm//@adeira/babel-preset-adeira",
        ],
    )

    js_library(
        name = name,
        package_name = package_name,
        srcs = ["package.json"],  # TODO: requires `"main": "dist/index",` which breaks our current setup
        visibility = ["//visibility:public"],  # TODO: should this be the default for everyone?
        deps = [":%s.es5" % name] + deps,
    )

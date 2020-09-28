"""
Builds Yarn Workspaces via Babel and makes it ready for other repositories.
"""

# TODO: https://github.com/bazelbuild/rules_nodejs/commit/1e357fdad4527477e34065ab9c880753522a4c41
load("@build_bazel_rules_nodejs//internal/js_library:js_library.bzl", "js_library")
load("@npm//@babel/cli:index.bzl", "babel")

# TODO: verify validity of `@generated` headers while building the project

def build_yarn_workspace(name, package_name, deps = []):
    babel(
        name = "%s.build" % name,
        outs = ["dist"],
        args = [
            "$(execpath src)",
            "--out-dir",
            "$(@D)/dist",
            "--ignore",  # TODO: do not ignore tests but run the compiled versions (?)
            "src/**/*.test.js",
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
        deps = [":%s.build" % name] + deps,
    )

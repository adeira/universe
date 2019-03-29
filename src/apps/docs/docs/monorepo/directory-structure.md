---
id: directory-structure
title: Directory structure of this monorepo
sidebar_label: Directory structure
---

Overall picture of this monorepo:

```text
/
├── flow-typed/                           # external Flow types definitions
├── node_modules/
├── node_modules_offline_mirror/
├── scripts/                              # support scripts for this monorepo
├── src/                                  # all the source codes
│   ├── apps/                             # all deployable applications
│   │   ├── automator/
│   │   │   ├── src/
│   │   │   └── package.json
│   │   └── graphql/                      # graphql.kiwi.com
│   │       ├── src/
│   │       └── package.json
│   └── packages/                         # private and public NPM packages
│       └── eslint-config-kiwicom/
│           ├── src/
│           └── package.json
├── terraform/                            # DevOps stuff
├── .eslintrc.js                          # global Eslint config
├── .flowconfig                           # global Flow config
├── .gitlab-ci.yml                        # global CI definition
└── package.json                          # global workspaces definition
```

As you can see we store all the code of this monorepo in `src` folder. This folder contains 2 subfolders dividing all our applications into 2 groups: deployables and NPM packages. Every directory inside these 2 categories is basically a repository (except it's all together in one monorepo). This way we can use our tools like Eslint and Flow across all our code but you can still keep your applications or NPM packages isolated. It also allows us to easily remove the project from monorepo into single repository if needed.

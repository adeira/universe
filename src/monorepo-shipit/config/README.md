_These instructions are mainly for `adeira/universe` maintainers._

This is the place where you can setup or change Shipit export configs. Refer to the main README or other configuration files to know how to do it.

# Creating a new Shipit config

There are additional manual steps necessary when creating a new config:

1. Create a new repository: https://github.com/organizations/adeira/repositories/new
1. Add a good description, simple template could be:

   ```text
   [READONLY] TKTK This repository is automatically exported from https://github.com/adeira/universe via Shipit
   ```

   Where `TKTK` is an actual repository description. For example, this is a description of [SX](https://github.com/adeira/sx):

   ```text
   [READONLY] 🐝 Atomic CSS-in-JS (not only) for Next.js applications. This repository is automatically exported from https://github.com/adeira/universe via Shipit
   ```

   This will not only help us to promote `adeira/universe` but it will also be clear to external contributors what's going on.

1. Invite `adeira/bots` to the repository with `write` access (https://github.com/adeira/eslint-config-adeira/settings/access) - without this, Shipit won't be able to export the repository! Do not invite anyone else (not even `adeira/devs`) - it should not be necessary.
1. Profit!

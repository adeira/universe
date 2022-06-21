<!-- https://github.blog/changelog/2021-11-24-specify-theme-context-for-images-in-markdown/ -->

![Universe-Light](https://raw.githubusercontent.com/adeira/universe/master/assets/universe-light-mode-crunch.png#gh-light-mode-only)![Universe-Dark](https://raw.githubusercontent.com/adeira/universe/master/assets/universe-dark-mode-crunch.png#gh-dark-mode-only)

<div align="center">

![Continuous Integration (JavaScript)](<https://github.com/adeira/universe/workflows/Continuous%20Integration%20(JavaScript)/badge.svg>) ![Continuous Integration (Rust)](<https://github.com/adeira/universe/workflows/Continuous%20Integration%20(Rust)/badge.svg>)

![Shipit](https://github.com/adeira/universe/workflows/Shipit/badge.svg) ![NPM Publisher](https://github.com/adeira/universe/workflows/NPM%20Publisher/badge.svg) ![Dockerfile Builder](https://github.com/adeira/universe/workflows/Dockerfile%20Builder/badge.svg)

</div>

## Quick start

```bash
git clone --depth=100 git@github.com:adeira/universe.git
cd universe
corepack enable
yarn install

chmod +x ./x
./x --help
```

_Please note: you have to use Yarn. It won't work with NPM!_

What now? There are many projects under [`src/`](/src) and all of them are tested and linted together (with many monorepo optimizations). You can try to run all the checks using our executor:

```bash
./x
```

It runs only the necessary checks based on what changed last. This monorepo is divided into many workspaces. You can access commands of each workspace like so:

```bash
yarn workspace @adeira/sx-design storybook
```

Specific workspace names can be found in individual `package.json` files of each workspace.

_Do you need some help? Feel free to [ask](https://github.com/adeira/universe/discussions). :)_

---
id: wiki-search-refresh
title: Wiki search refresh
sidebar_label: Wiki search refresh
---

The search on this Wiki is powered by [Algolia DocSearch](https://community.algolia.com/docsearch/). That means the search index is stored in Algolia and every time the content on Wiki is changed we need to refresh it. Algolia handles this automatically for public projects but that's not our case, so we have to run this process on our own.

How to run own DocSearch is [well documented](https://community.algolia.com/docsearch/run-your-own.html), unfortunately our Wiki is protected with [Cloudflare Access](https://www.cloudflare.com/products/cloudflare-access/) and the scraper does not support this yet.

## Install DocSearch scraper

The scraper is written in Python and it's expected you have `pipenv` installed.

Until the [PR with CF Access support](https://github.com/algolia/docsearch-scraper/pull/458) is merged, follow these steps:

```bash
git clone --single-branch --branch cloudflare-access git@github.com:michalsanger/docsearch-scraper.git
cd docsearch-scraper
cp .env.example .env
```

Values for the `.env` file can be found in our 1Password vault named `Monorepo`, please contact us on Slack in `#monorepo` if you need access.

Once you set the env vars, follow with next steps:

```bash
pipenv install
pipenv shell
```

To validate installation was successful run this command:

```bash
./docsearch run --help
```

## Run DocSearch scraper

All the info scraper needs to the job (what pages to scrape, how to categorize extracted content etc) is defined in the [config file](https://gitlab.skypicker.com/incubator/universe/blob/master/src/apps/docs/docsearch-config.json) that is part of the Wiki repository.

By running this command the Monorepo wiki is scraped and search index is updated:

```bash
./docsearch run <path/to/the/docsearch-config.json>
```

OK output looks like this:

```bash
> DocSearch: https://kiwi.wiki/incubator/universe/docs/monorepo/installation/ 18 records)
> DocSearch: https://kiwi.wiki/incubator/universe/docs/monorepo/testing/ 7 records)
> DocSearch: https://kiwi.wiki/incubator/universe/docs/graphql/testing/ 9 records)
> DocSearch: https://kiwi.wiki/incubator/universe/docs/guides/commit-messages/ 16 records)
> DocSearch: https://kiwi.wiki/incubator/universe/docs/guides/money/ 7 records)
> DocSearch: https://kiwi.wiki/incubator/universe/docs/graphql/faq/ 10 records)
```

_TODO: this command should be part of Docs pipeline that is run when MR is merged into master._

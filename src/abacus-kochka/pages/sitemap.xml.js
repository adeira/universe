// @flow

import { globby } from 'globby';
import { invariant } from '@adeira/js';
import type { Context } from 'next';

export async function getServerSideProps({ res }: Context): $FlowFixMe {
  const baseUrl = 'https://kochka.com.mx';

  const pages = await globby([
    'pages/**/[a-z_0-9]*{.js,.mdx}',
    '!pages/sitemap.xml.js', // this file

    // Next.js specific:
    '!pages/400.js',
    '!pages/500.js',
    '!pages/_*.js',
    '!pages/api',

    // App specific:
    '!pages/shop/**',
  ]);

  // TODO: fetch "shop" dynamic routes and append them to "pages" above

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => {
          const path = page
            .replace(/^pages/, '')
            .replace(/\.js$/, '')
            .replace(/\.mdx$/, '')
            .replace(/\/index$/, '');

          return `<url><loc>${baseUrl + path}</loc><changefreq>weekly</changefreq></url>`;
        })
        .join('\n')}
    </urlset>
  `;

  // $FlowFixMe[incompatible-use]:
  res.setHeader('Content-Type', 'text/xml');
  // $FlowFixMe[incompatible-use]:
  res.write(sitemap);
  // $FlowFixMe[incompatible-use]:
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  invariant(false, 'This component should never render!');
}

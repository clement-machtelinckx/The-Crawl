import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'The-Crawl',
  tagline: 'Règles & Lore + Résumés de sessions',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',

  organizationName: 'clement-machtelinckx',
  projectName: 'The-Crawl',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'rules',              // dossier
          routeBasePath: 'rules',     // URL
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/clement-machtelinckx/The-Crawl',
        },
        blog: {
          path: 'sessions',           // dossier
          routeBasePath: 'sessions',  // URL
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/clement-machtelinckx/The-Crawl',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['fr'],
        indexDocs: true,
        indexBlog: true,
        docsRouteBasePath: '/rules',
        blogRouteBasePath: '/sessions',
      },
    ],
  ],

  themeConfig: {
    image: undefined,
    colorMode: {
      respectPrefersColorScheme: true,
    },

    navbar: {
      title: 'The-Crawl',
      logo: {
        alt: 'The-Crawl',
        src: 'img/logo.svg',
      },
      items: [
        { to: '/rules', label: 'Règles & Lore', position: 'left' },
        { to: '/sessions', label: 'Sessions', position: 'left' },
        { type: 'search', position: 'right' },
        {
          href: 'https://github.com/clement-machtelinckx/The-Crawl',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Contenu',
          items: [
            { label: 'Règles & Lore', to: '/rules' },
            { label: 'Sessions', to: '/sessions' },
          ],
        },
        {
          title: 'Code',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/clement-machtelinckx/The-Crawl',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} The-Crawl.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

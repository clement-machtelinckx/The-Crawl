import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import 'dotenv/config';

const config: Config = {
  title: 'The-Crawl',
  tagline: 'Règles & Lore + Résumés de sessions',
  favicon: 'img/favicon.ico',

    customFields: {
        supabaseUrl: process.env.SUPABASE_URL ?? '',
        supabasePublishableKey: process.env.SUPABASE_PUBLISHABLE_KEY ?? '',
    },


  future: {
    v4: true,
  },

  url: 'https://the-crawl.vercel.app/',
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
            postsPerPage: 20,
            blogSidebarCount: 'ALL',
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

  plugins: [
  [
    '@docusaurus/plugin-pwa',
    {
      debug: false,
      offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
      pwaHead: [
        { tagName: 'link', rel: 'icon', href: '/img/icon-192.png' },
        { tagName: 'link', rel: 'manifest', href: '/manifest.webmanifest' },
        { tagName: 'meta', name: 'theme-color', content: '#111827' },
        { tagName: 'meta', name: 'apple-mobile-web-app-capable', content: 'yes' },
        { tagName: 'meta', name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { tagName: 'link', rel: 'apple-touch-icon', href: '/img/icon-192.png' },
      ],
    },
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
        { to: '/createur-personnage', label: 'Créateur de personnage', position: 'left' },
          {to: '/prochaine-session', label: 'session a venir', position: 'left'},
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
            { label: 'Créateur de personnage', to: '/createur-personnage' },
              {label: 'session a venir', to: '/prochaine-session'}
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

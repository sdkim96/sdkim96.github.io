import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import {themes as prismThemes} from 'prism-react-renderer';

// Read config.yaml
const rawConfig = yaml.load(
  fs.readFileSync(path.resolve(__dirname, 'config.yaml'), 'utf8'),
) as any;
const cfg = rawConfig.config;

// Scan docs/ top-level directories to build navbar + footer items
const docsDir = path.resolve(__dirname, 'docs');
const sections = fs
  .readdirSync(docsDir)
  .filter((name) => fs.statSync(path.join(docsDir, name)).isDirectory())
  .sort();

// Parse frontmatter from each section's index.md
function parseFrontmatter(filePath: string): Record<string, string> {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return {};
    return yaml.load(match[1]) as Record<string, string>;
  } catch {
    return {};
  }
}

const sectionMeta: Record<string, Record<string, string>> = {};
for (const dir of sections) {
  sectionMeta[dir] = parseFrontmatter(path.join(docsDir, dir, 'index.md'));
}

const navbarSectionItems = sections.map((dir) => {
  const meta = sectionMeta[dir];
  const label = meta.title ?? dir.charAt(0).toUpperCase() + dir.slice(1);
  return {
    to: `/${dir}`,
    label,
    position: 'left' as const,
    activeBaseRegex: `/${dir}/`,
  };
});

const navbarExternalItems = (cfg.navbar?.externalLinks ?? []).map(
  (link: {label: string; href: string}) => ({
    href: link.href,
    label: link.label,
    position: 'right' as const,
  }),
);

const footerLinks = sections.map((dir) => {
  const meta = sectionMeta[dir];
  const label = meta.title ?? dir.charAt(0).toUpperCase() + dir.slice(1);
  return {
    title: label,
    items: [{label, to: `/${dir}`}],
  };
});

// Add external links as a footer group
if (cfg.navbar?.externalLinks?.length) {
  footerLinks.push({
    title: 'Elsewhere',
    items: cfg.navbar.externalLinks.map((link: {label: string; href: string}) => ({
      label: link.label,
      href: link.href,
    })),
  });
}

const config: Config = {
  title: cfg.navbar?.title || 'Blog',
  tagline: '',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://sdkim96.github.io',
  baseUrl: '/',

  organizationName: 'sdkim96',
  projectName: 'sdkim96.github.io',
  deploymentBranch: 'gh-pages',

  trailingSlash: false,

  onBrokenLinks: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/sdkim96/sdkim96.github.io/tree/main/',
          async sidebarItemsGenerator({defaultSidebarItemsGenerator, ...args}) {
            const items = await defaultSidebarItemsGenerator(args);
            // Apply icon classes from index.md frontmatter
            return items.map((item) => {
              if (item.type === 'category') {
                const dirName = item.label?.toLowerCase();
                const meta = sectionMeta[dirName];
                if (meta?.icon) {
                  return {
                    ...item,
                    className: `sidebar-icon-${meta.icon}`,
                  };
                }
              }
              return item;
            });
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',

    colorMode: {
      defaultMode: cfg.theme?.colorMode ?? 'light',
      disableSwitch: false,
      respectPrefersColorScheme: cfg.theme?.respectPrefersColorScheme ?? true,
    },

    navbar: {
      title: cfg.navbar?.title || 'Home',
      items: [...navbarSectionItems, ...navbarExternalItems],
    },

    footer: {
      style: cfg.footer?.style ?? 'dark',
      links: footerLinks,
      copyright: cfg.footer?.copyright
        ? `Copyright © ${new Date().getFullYear()} ${cfg.footer.copyright}.`
        : undefined,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: cfg.theme?.prismLanguages ?? [],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

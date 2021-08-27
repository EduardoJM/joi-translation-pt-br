const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'joi-translation-pt-br',
  tagline: 'Erros de Validação para Usuários Reais',
  url: 'https://eduardojm.github.io/joi-translation-pt-br/',
  baseUrl: '/joi-translation-pt-br/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'EduardoJM', // Usually your GitHub org/user name.
  projectName: 'joi-translation-pt-br', // Usually your repo name.
  trailingSlash: false,
  themeConfig: {
    gtag: {
      trackingID: 'G-BHE4R64YZL',
    },
    navbar: {
      title: 'joi-translation-pt-br',
      logo: {
        alt: 'joi-translation-pt-br',
        src: 'img/draw_flag.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Tutorial',
        },
        {
          href: 'https://github.com/EduardoJM/joi-translation-pt-br',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentação',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Links',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/EduardoJM/joi-translation-pt-br',
            },
          ],
        },
        {
          title: 'Eduardo Oliveira',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/EduardoJM',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/edu_js_o',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/edujso/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} joi-translation-pt-br. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/EduardoJM/joi-translation-pt-br/edit/main/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

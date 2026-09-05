// A deliberately small Starlight site, used to demonstrate a PDF export end to end.
// Starlight's sidebar is an explicit list, so the two groups below are what the exported
// manual's structure follows.
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://example.com',
  integrations: [
    starlight({
      title: 'Orbit',
      // Starlight does not expose a navbar logo in its built markup the way Docusaurus does,
      // so Manuscrio needs --logo to put a mark on the cover. See the README.
      logo: { src: './src/assets/logo.svg', alt: 'Orbit' },
      sidebar: [
        { label: 'Introduction', link: '/' },
        { label: 'Installation', slug: 'install' },
        { label: 'Guides', items: ['guides/configuration', 'guides/deployment'] },
        { label: 'Reference', items: ['reference/cli', 'reference/api'] },
      ],
    }),
  ],
});

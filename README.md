# Starlight to PDF

Export a built **Astro Starlight** site to complete, publication-ready PDF manuals.

[![Export the example to PDF](https://github.com/manuscrio/starlight-pdf-export/actions/workflows/example.yml/badge.svg)](https://github.com/manuscrio/starlight-pdf-export/actions/workflows/example.yml)

Manuscrio reads the **build directory** — the `dist/` that `astro build` produces. It does not crawl
your published site, so there is nothing to deploy first and no URL to configure. If the build
succeeds, Manuscrio has everything it needs.

## Try it

You need Docker or Podman; the `manuscrio` command is a thin wrapper that runs the engine image.

```bash
npm run build
npx manuscrio@0.1.0 export ./dist --logo ./src/assets/logo.svg
```

That writes one PDF per documentation edition into `./manuscrio-output`.

### Why `--logo`

Starlight does not describe its logo in the built markup in a way an exporter can read, so
Manuscrio finds none and the manual carries no mark. `--logo` supplies one for the cover and the
running header. `manuscrio inspect ./dist` reports an empty `logo` field, which is what that means.

A navbar logo is often small; for a cover-sized mark, pass a high-resolution asset.

## In GitHub Actions

```yaml
- run: npm ci && npm run build

- name: Export the docs to PDF
  run: |
    npx --yes manuscrio@0.1.0 export dist \
      --logo src/assets/logo.svg \
      --output-dir manuscrio-output

- uses: actions/upload-artifact@v7
  with:
    name: manual
    path: manuscrio-output/*.pdf
```

[`.github/workflows/example.yml`](.github/workflows/example.yml) in this repository is the complete,
working version of that. GitLab CI and other providers: see [Run in
CI](https://manuscrio.com/docs/ci/).

## The example in this repository

[`example/`](example/) is a small but real Starlight site — six pages across two sidebar groups. CI
builds it and exports it on every push, so the PDF is a downloadable artifact on [the latest
run](https://github.com/manuscrio/starlight-pdf-export/actions/workflows/example.yml).

Copy it, or copy just the workflow.

## Scopes

Starlight's sidebar is an explicit list with no navbar section level above it, so `--scope section`
does not apply. Two scopes do:

| Scope | Produces |
| --- | --- |
| `--scope edition` *(default)* | one manual per edition |
| `--scope sidebar-root` | one manual per sidebar root |

Full reference — detection, editions, and what each refusal means — is on [Starlight to
PDF](https://manuscrio.com/docs/frameworks/starlight/).

## Evaluation Mode

With no licence, Manuscrio produces **complete** manuals carrying an evaluation watermark. Nothing
is truncated and no feature is withheld. The PDF this repository's CI publishes is watermarked,
deliberately: a licence is a bearer token and does not belong in a public repository.

See [Licensing](https://manuscrio.com/docs/licensing/) for how to supply one in a real pipeline.

## Licence

This repository — the example project, the workflows, and this README — is **MIT**. Copy it freely.

**The Manuscrio engine image it runs is proprietary software.** MIT covers the glue in this
repository and nothing else.

---

[manuscrio.com](https://manuscrio.com) · [`manuscrio` on npm](https://www.npmjs.com/package/manuscrio) · [Docusaurus](https://github.com/manuscrio/docusaurus-pdf-export) · [MkDocs](https://github.com/manuscrio/mkdocs-pdf-export)

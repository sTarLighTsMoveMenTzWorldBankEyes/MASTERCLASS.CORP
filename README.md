# Euro Finance Core

Responsive concept presentation for an independent European financial and digital infrastructure initiative. Built with React 19 and Vite, with local fonts and no required application backend or API credentials.

## Development

Use Node.js 24 and the existing checkout. Cloud tasks are already isolated; do not create a Git worktree unless explicitly requested.

```sh
cd /workspace/MASTERCLASS.CORP
npm ci
npm run dev
```

The development server uses port 5173. Production output is generated in `dist/`:

```sh
npm run build
npm run preview
```

## Browser checks

```sh
npm test
```

The suite exercises financing calculations, architecture navigation, card export, roadmap and risks, local PDF/image viewing, multilingual slides, actual video playback, mobile layout, and effects controls. It starts a development server when needed. It uses `/usr/bin/chromium` when available; otherwise install the Playwright browser with `npx playwright install chromium`. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to use another installed Chromium executable. A fresh environment may also need the operating-system libraries listed by Playwright.

## Netlify

The repository includes `netlify.toml` with:

- Build command: `npm run build`
- Publish directory: `dist`
- Node.js: `24`
- Static asset caching and response headers

In Netlify, import this GitHub repository and select the `main` branch. The configuration is detected automatically. No application secrets or environment variables are required. Alternatively, build locally and deploy the contents of `dist/` using Netlify's manual deploy interface. Do not deploy the source directory as the static output. Repository preparation does not itself create a Netlify site or publish a live deployment.

## Included experience

- Animated 3D-projected geographic globe and interactive five-layer architecture.
- Financing model: 600 million euros, with 35/30/20/10/5 percent allocations. The slider simulates proportional scenarios; it is not a forecast.
- Concept bank card, reversible card view, SVG export and organization-only vCard.
- Four development phases, six risk domains, and an example FMI mapping table.
- Eight-slide presentation with short narratives in 32 languages: all 24 official EU languages plus Arabic, Chinese, Hindi, Japanese, Korean, Turkish, Ukrainian and Russian. Headlines and controls remain German/English. This does not claim to cover every world language.
- Browser speech synthesis only when a matching installed voice exists. The cloud test browser may have no voices. No cloud translation or speech service is called.
- Original 40-second, 1280×720 H.264/AAC concept film with original ambient music, German on-screen text and WebVTT captions. The MP4 has no recorded voice track; speech is separate in the slide presentation.
- Red theater intro once per browser session, rainbow plasma frame, 1.3-second light sweep, stars, crystals, rain, clouds, wind, occasional subtle lightning, opt-in synthesized thunder, and an artistic sun/moon/eight-planet parade.
- Effects controls and reduced-motion support. Thunder is off until enabled. Effects preference is stored in localStorage; intro status in sessionStorage.
- Local PDF, image and video viewers. Selected files remain in the browser for the session; they are not uploaded or included in a deployed build.

## Documents and assets

- `public/documents/euro-finance-core-bericht.pdf`: 10-page report; Markdown source alongside it.
- `public/documents/euro-finance-core-storyboard.pdf`: 3-page storyboard, eight 5-second scenes; Markdown source alongside it.
- `public/media/euro-finance-core.mp4`: generated concept film.
- `public/media/poster.jpg` and `captions-de.vtt`.
- `scripts/generate_promo.py`: reproducible film generation using Python, Pillow, NumPy, ffmpeg and DejaVu fonts. The generated assets are committed, so these tools are not needed to build or deploy the website.

## Source status and outstanding material

Content is based on the user-provided “Euro Finance Core” text dated 27 October 2026. The source text's numbered references were not supplied as independently verifiable original documents.

`DP_MASTERBOOK_LETTRE.pdf` and `Archiv.tar.gz` exceeded the attachment transfer limit of 32 MiB. Their contents were not read, extracted, represented as verified, or integrated into the public website. Supply smaller PDFs, individual image/video files, or archives below that limit to complete their editorial and visual integration. The local viewers are a convenience, not a substitute for permanent integration.

Amounts, regulatory compliance, bank partnerships, financing, availability and latency figures are conceptual targets or proposed gates. No official affiliation, recognition or mandate from the European Commission, EIB or InvestEU is claimed. The site is an informational concept, not an operating bank or payment service. No official EU seals or counterfeit certifications are used.

## Project structure

`src/App.jsx` contains the main presentation and interactive models; `Globe.jsx` the canvas globe; `Atmosphere.jsx` the effects and planet parade; `MediaLibrary.jsx` the local media gallery; `Presentation.jsx` the slide/film modal; and `narration*.js` the translated short texts. All production assets are served locally from the built site.

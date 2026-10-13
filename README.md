# Mahil Gaila Dussehra

A Hindi-first, responsive website documenting the Shri Ramleela and Dussehra celebrations in Mahil Gaila, Punjab. The site brings event information, Ramleela resources, festival photography, and performer highlights together in one place.

> **Notice:** The website states that it is an independent informational resource and is not officially managed, sponsored, or endorsed by the Ramleela Welfare Committee Mahil Gaila. See the notice displayed on the home page.

## Website

Visit the deployed site at [mahilgailadussehra.vercel.app](https://mahilgailadussehra.vercel.app/).

## Features

- Home page with festival information, event schedule and countdown, performer profiles, video links, and contact form access.
- YouTube Shorts carousel with one active video player at a time, muted autoplay, and fullscreen viewing.
- Navratri Ramleela scripts and other public resources, including linked PDF documents.
- Photo gallery with search and year filters, covering Dussehra collections from 2011, 2012, and 2019–2026, plus the 2019 Sita-Ram Vivah collection.
- Light/dark theme selection saved in the browser and responsive navigation for smaller screens.
- Hindi content with selected English labels and a Hindi/English toggle for the home-page notice.
- Search engine metadata, Open Graph/Twitter sharing metadata, `robots.txt`, and `sitemap.xml`.

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- Font Awesome and Google Fonts loaded from external CDNs

The site is static. Its build uses Sharp to generate optimized WebP sizes for photo galleries, so install the Node.js dependencies before building or deploying.

## Project Structure

| Path | Purpose |
| --- | --- |
| `index.html` | Home page and festival information |
| `pages/gallery.html` | Searchable, filterable photo gallery |
| `CSS/index.css` | Home-page styles |
| `CSS/mgd-shorts.css` | Home-page YouTube Shorts styles |
| `CSS/gallery.css` | Gallery-page styles |
| `scripts/script.js` | Home-page interactions |
| `scripts/mgd-shorts.js` | Shorts carousel, YouTube player, and fullscreen controls |
| `scripts/gallery.js` | Gallery data and interactions |
| `assets/` | Festival photos, posters, cast images, thumbnails, and public resources |
| `robots.txt` | Crawler access and sitemap location |
| `sitemap.xml` | Public page URLs for search engines |

## Run Locally

Build the optimized site from the project root:

```powershell
npm install
npm run build
```

Then serve the generated `dist` directory with Python's built-in server:

```powershell
py -m http.server 8000 --directory dist
```

Open [http://localhost:8000](http://localhost:8000) in a browser. Stop the server with `Ctrl+C`.

## Updating Content

- Update page copy, event details, and metadata in `index.html` or `pages/gallery.html`.
- Add or replace media under the relevant `assets/` subdirectory. Keep filenames and paths in the HTML and JavaScript in sync; some asset directory names contain spaces. Run `npm run build` to generate 480px preview WebPs and 960px mobile / 1920px desktop lightbox WebPs without changing the originals.
- Add 2026 Dussehra photos with any filenames to `assets/dussehra 2026/`. Supported formats are JPG, JPEG, PNG, GIF, WebP, and AVIF. The build discovers these files automatically and updates that gallery.
- Update the home-page interactions in `scripts/script.js` and gallery entries/behavior in `scripts/gallery.js`.
- Review event dates, contact details, and outbound social links before publishing. Some contact and social values in the current page markup are placeholders.
- If the public site URL changes, update canonical and social metadata, `robots.txt`, and `sitemap.xml`.

## Deployment

Deploy the project with Vercel using the included `vercel.json`; its build command prepares the static files, generates optimized gallery images, and updates the 2026 photo manifest. After deployment, verify both pages and check that media paths containing spaces load correctly.
# Mahil Gaila Dussehra

A Hindi-first, responsive website documenting the Shri Ramleela and Dussehra celebrations in Mahil Gaila, Punjab. The site brings event information, Ramleela resources, festival photography, and performer highlights together in one place.

> **Notice:** The website states that it is an independent informational resource and is not officially managed, sponsored, or endorsed by the Ramleela Welfare Committee Mahil Gaila. See the notice displayed on the home page.

## Website

Visit the deployed site at [mahilgailadussehra.vercel.app](https://mahilgailadussehra.vercel.app/).

## Features

- Home page with festival information, event schedule and countdown, performer profiles, video links, and contact form access.
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

This is a static website: there is no package manager, build step, or application server required. A local HTTP server is recommended so that pages and assets resolve consistently.

## Project Structure

| Path | Purpose |
| --- | --- |
| `index.html` | Home page and festival information |
| `pages/gallery.html` | Searchable, filterable photo gallery |
| `CSS/index.css` | Home-page styles |
| `CSS/gallery.css` | Gallery-page styles |
| `scripts/script.js` | Home-page interactions |
| `scripts/gallery.js` | Gallery data and interactions |
| `assets/` | Festival photos, posters, cast images, thumbnails, and public resources |
| `robots.txt` | Crawler access and sitemap location |
| `sitemap.xml` | Public page URLs for search engines |

## Run Locally

From the project root, start Python's built-in static server:

```powershell
py -m http.server 8000
```

If the `py` launcher is unavailable, use `python -m http.server 8000`. Open [http://localhost:8000](http://localhost:8000) in a browser. Stop the server with `Ctrl+C`.

The site also works when `index.html` is opened directly, but a local server is preferable for testing links and assets.

## Updating Content

- Update page copy, event details, and metadata in `index.html` or `pages/gallery.html`.
- Add or replace media under the relevant `assets/` subdirectory. Keep filenames and paths in the HTML and JavaScript in sync; some asset directory names contain spaces.
- Update the home-page interactions in `scripts/script.js` and gallery entries/behavior in `scripts/gallery.js`.
- Review event dates, contact details, and outbound social links before publishing. Some contact and social values in the current page markup are placeholders.
- If the public site URL changes, update canonical and social metadata, `robots.txt`, and `sitemap.xml`.

## Deployment

Deploy the project directory as a static site using Vercel, Netlify, GitHub Pages, or another static host. Set the project root as the published directory and ensure the host serves `index.html` at `/`. No build command is needed. After deployment, verify both pages and check that media paths containing spaces load correctly.
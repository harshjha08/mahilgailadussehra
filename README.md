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
- Password-protected admin portal for homepage content, schedules, scripts, media, links, cast visibility, and stats. The bulk photo archive remains file-based and unchanged.

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
| `admin/` | Securely authenticated content-management portal |
| `supabase/setup.sql` | Database, access policies, and public media bucket setup |
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
- After configuring Supabase, manage homepage content at `/admin/`. The public photo archive (`pages/gallery.html` and its bulk image assets) remains unchanged; daily homepage highlights are managed separately and replace the previous highlight set.
- If the public site URL changes, update canonical and social metadata, `robots.txt`, and `sitemap.xml`.

## Deployment

Deploy the project with Vercel using the included `vercel.json`; its build command prepares the static files, generates optimized gallery images, and updates the 2026 photo manifest. After deployment, verify both pages and check that media paths containing spaces load correctly.

### Admin portal backend setup

The admin portal uses Supabase Auth, a row-level-security-protected JSON content record, and a public media bucket. A configured Supabase project is required for login, publishing, and uploads; until then, the current static website remains the public fallback.

1. Create a Supabase project. In **SQL Editor**, run [`supabase/setup.sql`](./supabase/setup.sql).
2. In **Authentication → Users**, create the admin account. Public sign-up is not part of this portal.
3. Copy that user's UUID and allowlist it in the SQL Editor:

   ```sql
   insert into public.site_admins (user_id)
   values ('ADMIN_USER_UUID');
   ```

4. Put the project URL and its public **anon/publishable key** in [`scripts/backend-config.js`](./scripts/backend-config.js). These browser-visible values are protected by the SQL row-level-security policies; never use a service-role key here.
5. Run `npm run build`, deploy to Vercel, then sign in at `/admin/`. On first login, the portal imports the website's current content; publish it once to create the live content record.

Uploaded images and PDFs are stored in Supabase Storage (20 MB maximum per file). Daily highlights are a single current set, not an archive. Supabase Auth, database, and storage usage are subject to your Supabase project's quotas and policies.
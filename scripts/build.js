const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const outputDirectory = path.join(projectRoot, 'dist');
const staticDirectories = ['assets', 'CSS', 'pages', 'scripts'];
const staticFiles = [
  'google694898bc6c42d26e.html',
  'index.html',
  'live-telecast-thumbnail.jpeg',
  'robots.txt',
  'sitemap.xml',
];
const imageExtensions = new Set([
  '.avif',
  '.gif',
  '.jpeg',
  '.jpg',
  '.png',
  '.webp',
]);

fs.rmSync(outputDirectory, { recursive: true, force: true });
fs.mkdirSync(outputDirectory, { recursive: true });

for (const directory of staticDirectories) {
  fs.cpSync(
    path.join(projectRoot, directory),
    path.join(outputDirectory, directory),
    { recursive: true },
  );
}

for (const file of staticFiles) {
  const source = path.join(projectRoot, file);
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, path.join(outputDirectory, file));
  }
}

const imageDirectory = path.join(
  projectRoot,
  'assets',
  'dussehra 2026',
);
const imagePaths = fs.readdirSync(imageDirectory, { withFileTypes: true })
  .filter(entry => entry.isFile())
  .filter(entry => imageExtensions.has(path.extname(entry.name).toLowerCase()))
  .map(entry => `/assets/dussehra%202026/${encodeURIComponent(entry.name)}`)
  .sort((left, right) => left.localeCompare(right, 'en', {
    numeric: true,
    sensitivity: 'base',
  }));

if (!imagePaths.length) {
  throw new Error('No supported images found in assets/dussehra 2026.');
}

fs.writeFileSync(
  path.join(outputDirectory, 'assets', 'dussehra 2026', 'gallery-images.json'),
  `${JSON.stringify(imagePaths, null, 2)}\n`,
);

console.log(`Built static site with ${imagePaths.length} Dussehra 2026 images.`);

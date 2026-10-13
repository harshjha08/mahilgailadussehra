const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

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
const galleryDirectoryPattern = /^(dussehra \d{4}|sitaRamVivah \d{4})$/i;
const imageVariants = {};

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

async function buildGalleryImageVariants() {
  const assetsDirectory = path.join(projectRoot, 'assets');
  const galleryDirectories = fs.readdirSync(assetsDirectory, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && galleryDirectoryPattern.test(entry.name));

  for (const directory of galleryDirectories) {
    const sourceDirectory = path.join(assetsDirectory, directory.name);
    const imageFiles = fs.readdirSync(sourceDirectory, { withFileTypes: true })
      .filter(entry => entry.isFile())
      .filter(entry => imageExtensions.has(path.extname(entry.name).toLowerCase()));

    for (const imageFile of imageFiles) {
      const relativePath = path.join(directory.name, imageFile.name);
      const sourcePath = path.join(sourceDirectory, imageFile.name);
      const outputName = `${path.parse(imageFile.name).name}.webp`;
      const outputPaths = {
        preview: path.join(outputDirectory, 'assets', 'gallery-optimized', 'preview', directory.name, outputName),
        mobile: path.join(outputDirectory, 'assets', 'gallery-optimized', 'mobile', directory.name, outputName),
        desktop: path.join(outputDirectory, 'assets', 'gallery-optimized', 'desktop', directory.name, outputName),
      };
      const sourceUrl = `/assets/${relativePath
        .split(path.sep)
        .map(encodeURIComponent)
        .join('/')}`;
      const variants = {};

      for (const [size, width, quality] of [
        ['preview', 480, 70],
        ['mobile', 960, 80],
        ['desktop', 1920, 82],
      ]) {
        const outputPath = outputPaths[size];
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        await sharp(sourcePath)
          .rotate()
          .resize({ width, withoutEnlargement: true })
          .webp({ quality })
          .toFile(outputPath);

        if (fs.statSync(outputPath).size < fs.statSync(sourcePath).size) {
          variants[size] = `/assets/gallery-optimized/${size}/${relativePath
            .split(path.sep)
            .map(encodeURIComponent)
            .join('/')
            .replace(/\.[^.]+$/, '.webp')}`;
        } else {
          fs.rmSync(outputPath);
          variants[size] = sourceUrl;
        }
      }

      const encodedPath = relativePath
        .split(path.sep)
        .map(encodeURIComponent)
        .join('/');
      imageVariants[`/assets/${encodedPath}`] = variants;
    }
  }

  fs.writeFileSync(
    path.join(outputDirectory, 'assets', 'gallery-image-variants.json'),
    `${JSON.stringify(imageVariants)}\n`,
  );

  return Object.keys(imageVariants).length;
}

async function buildSite() {
  const optimizedImageCount = await buildGalleryImageVariants();

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
  console.log(`Generated responsive WebP variants for ${optimizedImageCount} gallery images.`);
}

buildSite().catch(error => {
  console.error('Unable to build the site:', error);
  process.exitCode = 1;
});

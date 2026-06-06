import sharp from 'sharp';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const svg = readFileSync(join(root, 'static', 'icon.svg'));

const icons = [
	{ size: 192, name: 'icon-192.png' },
	{ size: 512, name: 'icon-512.png' },
	{ size: 180, name: 'apple-touch-icon.png' },
];

for (const { size, name } of icons) {
	await sharp(svg)
		.resize(size, size)
		.png()
		.toFile(join(root, 'static', name));
	console.log(`Generiert: static/${name}`);
}

console.log('Alle Icons wurden erfolgreich erstellt.');

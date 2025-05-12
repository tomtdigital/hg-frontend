import fs from 'fs';
import path from 'path';
import WordCellConfig from '../../api/data/client/word-cell-config.json';
import Image from 'next/image';
import GridPreviewClient from './components/grid-preview-client';

const imagesDirectory = path.join(process.cwd(), 'public/grid-previews');
const imageFiles = fs.readdirSync(imagesDirectory).filter((file) => {
  return /\.(png|jpe?g|gif|svg)$/.test(file);
});

const images = imageFiles.map((file) => `/grid-previews/${file}`);
const existingGridNames = Object.keys(WordCellConfig) as GridType[];
const validImages = existingGridNames.filter((name) => {
  return images.some((image) => image.includes(name));
});

export default async function GridPreviews() {
  return <GridPreviewClient imagePaths={validImages} config={WordCellConfig} />;
}

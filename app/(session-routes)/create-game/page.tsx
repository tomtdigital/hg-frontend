import fs from 'fs';
import path from 'path';
import WordCellConfig from '../../api/data/client/word-cell-config.json';
import CreateGameForm from './form';
import { Session } from 'next-auth';
import { getCachedUser } from '@/app/api/data/server/user';
import { redirect } from 'next/navigation';

const imagesDirectory = path.join(process.cwd(), 'public/grid-previews');
const imageFiles = fs.readdirSync(imagesDirectory).filter((file) => {
  return /\.(png|jpe?g|gif|svg)$/.test(file);
});

const images = imageFiles.map((file) => `/grid-previews/${file}`);
const existingGridNames = Object.keys(WordCellConfig) as GridType[];
const validImages = existingGridNames.filter((name) => {
  return images.some((image) => image.includes(name));
});

export default async function CreateGame() {
  const user: Fetched<Session['user']> = await getCachedUser();
  if (!user) redirect('/login');
  if (!user.admin) redirect('/games');

  return <CreateGameForm imagePaths={validImages} config={WordCellConfig} />;
}

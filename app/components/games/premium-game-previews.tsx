'use server';

import { fetchPremiumGamePreviews } from '@/app/api/data/server/games';
import Link from 'next/link';
import { PreviewLink } from '@/app/components/preview-link';
import { formatDate } from '@/app/utils/format-date';
import { getCompletionStatus } from '@/app/utils/get-completion-status';
import { fetchSessionPreviews } from '@/app/api/data/server/game-session';

export default async function PremiumGamePreviews() {
  const games: Fetched<GamePreview[]> = await fetchPremiumGamePreviews();
  const sessionPreviews: Fetched<GameSessionPreview[]> =
    await fetchSessionPreviews();

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      {games && games?.length > 0 ? (
        <>
          <p className='text-center'>Premium Games</p>
          {games.map((game: GamePreview) => {
            const date = formatDate(game.publishDate);
            const complete: boolean = getCompletionStatus(
              game,
              sessionPreviews
            );
            return (
              <div key={game._id} className='text-center'>
                <PreviewLink
                  key={game._id}
                  className='bg-purple text-white hover:bg-darkPurple'
                  href={`/game/${game._id}`}
                >
                  {date}
                </PreviewLink>
                <span className='block'>{complete && 'Complete'}</span>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <p className='text-center'>No games detected</p>
        </>
      )}
      <Link href='/games' className='text-purple-400 mt-4'>
        Back to games
      </Link>
    </div>
  );
}

'use server';

import { GamePreviews, fetchGamePreviews } from '@/app/api/data/server/games';
import { getCachedUser } from '@/app/api/data/server/user';
import { PreviewLink } from '@/app/components/preview-link';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { Session } from 'next-auth';
import Link from 'next/link';
import { formatDate } from '@/app/utils/format-date';
import { redirect } from 'next/navigation';
import { fetchSessionPreviews } from '@/app/api/data/server/game-session';
import { getCompletionStatus } from '@/app/utils/get-completion-status';

export default async function GamesPreview() {
  const user: Fetched<Session['user']> = await getCachedUser();
  if (!user) redirect('/login');
  const premiumMember: boolean = user.premium;
  const gamePreviews: Fetched<GamePreviews> = await fetchGamePreviews();
  const freeGames: Fetched<GamePreview[]> = gamePreviews?.freeGames;
  const premiumGames: Fetched<GamePreview[]> = gamePreviews?.premiumGames;
  const sessionPreviews: Fetched<GameSessionPreview[]> =
    await fetchSessionPreviews();

  return (
    <div className='flex flex-col items-center text-center'>
      {freeGames && freeGames?.length > 0 ? (
        <>
          <h2 className='text-xl'>Free</h2>
          <div className='flex w-full flex-col items-center'>
            {freeGames.map((game: GamePreview) => {
              const date = formatDate(game.publishDate);
              const complete: boolean = getCompletionStatus(
                game,
                sessionPreviews
              );
              return (
                <div key={game._id} className='mb-4'>
                  <PreviewLink href={`/game/${game._id}`}>{date}</PreviewLink>
                  <span className='block'>{complete && 'Complete'}</span>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <p>No free games detected</p>
        </>
      )}
      {premiumGames && premiumGames?.length > 0 ? (
        <div className='mt-[2em]'>
          <span
            className={clsx({
              'flex items-center justify-center': !premiumMember,
            })}
          >
            <h2
              className={`flex items-center justify-center text-xl ${
                premiumMember ? '' : 'mr-2'
              }`}
            >
              Premium{' '}
              {!premiumMember && (
                <LockClosedIcon className='ml-1 w-5 max-w-4' />
              )}
            </h2>
          </span>
          <div className='flex w-full flex-col items-center'>
            {premiumGames.map((game: GamePreview) => {
              const date = formatDate(game.publishDate);
              const complete: boolean = getCompletionStatus(
                game,
                sessionPreviews
              );
              return premiumMember ? (
                <div key={game._id} className='mb-4'>
                  <PreviewLink
                    key={game._id}
                    className='bg-purple text-white hover:bg-darkPurple'
                    href={`/game/${game._id}`}
                  >
                    {date}
                  </PreviewLink>
                  <span className='block'>{complete && 'Complete'}</span>
                </div>
              ) : (
                <span
                  key={game._id}
                  className='m-1 mb-4 block w-[8em] rounded-[10em] bg-midGrey p-4 text-center text-white'
                >
                  <p className='block'>{date}</p>
                </span>
              );
            })}
          </div>
          <div className='mt-[1em]'>
            {premiumMember ? (
              <>
                {premiumGames.length > 3 && (
                  <Link href='/games/premium' className='text-white'>
                    View all
                  </Link>
                )}
              </>
            ) : (
              <Link href='/upgrade' className='text-white'>
                Upgrade today!
              </Link>
            )}
          </div>
        </div>
      ) : (
        <>
          <p>No premium games detected</p>
        </>
      )}
    </div>
  );
}

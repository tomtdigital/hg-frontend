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
  const premiumMember: boolean = user.membership === 'premium';
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
                  <PreviewLink
                    href={`/game/${game._id}`}
                    className={`${complete ? 'mb-3' : ''}`}
                  >
                    {date}
                  </PreviewLink>
                  {complete && (
                    <span className='mt-1 rounded-full bg-green p-2 text-[0.75em]'>
                      {'✔️'}
                    </span>
                  )}
                </div>
              );
            })}
            {/* <PreviewLink href={`/game/mock`}>MOCK GAME</PreviewLink> */}
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
              Premium
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
                    className={`bg-purple-500 text-white hover:bg-purple-600 ${complete ? 'mb-3' : ''}`}
                    href={`/game/${game._id}`}
                  >
                    {date}
                  </PreviewLink>
                  {complete && (
                    <span className='mt-1 rounded-full bg-green p-2 text-[0.75em]'>
                      {'✔️'}
                    </span>
                  )}{' '}
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
        <div className='mt-[2em]'>
          <h2
            className={`mb-4 flex items-center justify-center text-xl ${
              premiumMember ? '' : 'mr-2'
            }`}
          >
            Premium
            {!premiumMember && <LockClosedIcon className='ml-1 w-5 max-w-4' />}
          </h2>
          <p>
            <em>No premium games detected</em>
          </p>
        </div>
      )}
      {user?.roles.includes('owner') && (
        <div className='mt-[2em]'>
          <h2 className='text-xl'>Tom & Hannah 🦀 </h2>
          <div className='flex w-full flex-col items-center text-white'>
            {gamePreviews?.ownerGames &&
            gamePreviews?.ownerGames?.length > 0 ? (
              gamePreviews.ownerGames.map((game: GamePreview) => {
                const date = formatDate(game.publishDate);
                return (
                  <PreviewLink
                    key={game._id}
                    href={`/game/${game._id}`}
                    className='mb-4 bg-orange-600 text-white hover:bg-orange-700'
                  >
                    {date}
                  </PreviewLink>
                );
              })
            ) : (
              <p>No crab games detected {':('}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

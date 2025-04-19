export const dynamic = 'force-dynamic';

import { fetchGame } from '@/app/api/data/server/game';
import { GameWrapper } from '@/app/components/game-wrapper';
import Game from '@/app/components/game/game';

export default async function GamePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const game: Fetched<Game> = await fetchGame(id);

  return (
    <>
      {game && (
        <GameWrapper>
          <Game />
        </GameWrapper>
      )}
    </>
  );
}

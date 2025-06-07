export const dynamic = 'force-dynamic';

import { fetchGame } from '@/app/api/data/server/game';
import { GameWrapper } from '@/app/components/game-wrapper';
import Game from '@/app/components/game/game';
import { getMockData } from '@/app/utils/get-mock-data';
import { shuffleArray } from '@/app/utils/shuffle-array';

export default async function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const game: Fetched<Game> = await fetchGame(id);
  const praise = shuffleArray([
    'Nice nice nice!!!',
    'Fucking galaxy brain!!!',
    'Loving that big brain energy!',
    "You're so fucking smart!!!",
    "All the Tom's go wild!!!",
    'Absolute scenes!!!',
  ]);

  return (
    <>
      {game && (
        <GameWrapper totalStages={game.main.length}>
          <Game grids={game.main} solution={game.solution} praise={praise} />
        </GameWrapper>
      )}
    </>
  );
}

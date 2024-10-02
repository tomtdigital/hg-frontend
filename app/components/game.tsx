import { FC } from "react";

type GameProps = {
  game: Fetched<Game>;
};

export const Game: FC<GameProps> = ({ game }) => {
  console.log(game);
  return (
    <>
      <div>Game Component</div>
    </>
  );
};

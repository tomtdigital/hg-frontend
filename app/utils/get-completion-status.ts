export function getCompletionStatus(
  game: GamePreview,
  sessions: Fetched<GameSessionPreview[]>
): boolean {
  return (
    sessions?.find((sess) => String(sess.game) === String(game._id))?.gameData
      ?.gameComplete || false
  );
}

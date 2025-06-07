export function getStorageKey(gameId: string, userId: string): string {
  return `hg-${gameId}-session-${userId}`;
}

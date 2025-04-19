export function getStorageKey(id?: string): string {
  return `hg-${id ? id + '-' : ''}session`;
}

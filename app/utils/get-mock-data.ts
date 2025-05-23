import { getBaseGrid } from './get-base-grid';

export const getMockData = (types: GridType[]): Game => {
  const main = types.map((type) => {
    const words = getBaseGrid(
      type,
      Array(7).fill({ word: 'a'.repeat(20) }) as GridData
    ).map((word) => word.length);
    return {
      grid: type,
      data: words.map((wordLength: number) => {
        const letters = 'abcdefghijklm';
        let answer = '';
        for (let index = 0; index < wordLength; index++) {
          answer += letters[index];
        }
        return {
          anagram: answer.split('').join(' '),
          word: answer,
          clue: answer,
        };
      }),
    };
  });

  return {
    _id: 'mock-id',
    _v: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishDate: '2025-04-21',
    premium: false,
    main,
    solution: 'abcde',
  };
};

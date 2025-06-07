import { CreateGameFormData } from '@/app/(session-routes)/create-game/form';

const shuffleLetters = (letters: string[]): string[] => {
  const original = Array.from(new Set(letters.map((l) => l.toLowerCase())));
  if (original.length <= 1) return original;

  let shuffled: string[];
  do {
    shuffled = [...original];
    // Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  } while (shuffled.join('') === original.join(''));

  return shuffled;
};

export function transformToApi(formData: CreateGameFormData): NewGame {
  return {
    main: [
      ...formData.items.map((item) => ({
        grid: item.gridType,
        name: item.name,
        data: item.words.map((word) => ({
          anagram: shuffleLetters(word.letters).join(' '),
          word: word.letters.join(''),
          clue: word.clue,
          details: word.details,
        })),
      })),
    ],
    solution: formData.solution,
    premium: formData.premium,
    publishDate: new Date(formData.publishDate),
  };
}

import { CreateGameFormData } from '@/app/(session-routes)/create-game/form';

const shuffleLetters = (letters: string[]): string[] => {
  if (letters.length <= 1) return letters;

  let shuffled: string[];
  do {
    shuffled = [...letters];
    // Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  } while (shuffled.join('') === letters.join(''));

  return shuffled;
};

export function transformToApi(formData: CreateGameFormData): NewGame {
  return {
    main: [
      ...formData.items.map((item) => ({
        grid: item.gridType,
        name: item.name,
        data: item.words.map((word) => ({
          anagram: shuffleLetters(word.letters).join(''),
          word: word.letters.join(''),
          clue: word.clue,
          details: word.details,
        })),
      })),
    ],
    title: formData.title,
    description: formData.description,
    solution: formData.solution,
    access: formData.access,
    publishDate: new Date(formData.publishDate),
  };
}

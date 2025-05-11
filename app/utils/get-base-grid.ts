export function getBaseGrid(type: GridType, data: GridData): FullGrid {
  switch (type) {
    case 'l-5':
      return [
        [
          { cell: 0, guess: '', answer: data[0].word[0].toUpperCase() },
          { cell: 4, guess: '', answer: data[0].word[1].toUpperCase() },
          { cell: 8, guess: '', answer: data[0].word[2].toUpperCase() },
          { cell: 12, guess: '', answer: data[0].word[3].toUpperCase() },
          { cell: 16, guess: '', answer: data[0].word[4].toUpperCase() },
        ],
        [
          { cell: 16, guess: '', answer: data[1].word[0].toUpperCase() },
          { cell: 17, guess: '', answer: data[1].word[1].toUpperCase() },
          { cell: 18, guess: '', answer: data[1].word[2].toUpperCase() },
          { cell: 19, guess: '', answer: data[1].word[3].toUpperCase() },
        ],
      ];
    case 'o-5':
      return [
        [
          { cell: 0, guess: '', answer: data[0].word[0].toUpperCase() },
          { cell: 1, guess: '', answer: data[0].word[1].toUpperCase() },
          { cell: 2, guess: '', answer: data[0].word[2].toUpperCase() },
          { cell: 3, guess: '', answer: data[0].word[3].toUpperCase() },
        ],
        [
          { cell: 16, guess: '', answer: data[1].word[0].toUpperCase() },
          { cell: 17, guess: '', answer: data[1].word[1].toUpperCase() },
          { cell: 18, guess: '', answer: data[1].word[2].toUpperCase() },
          { cell: 19, guess: '', answer: data[1].word[3].toUpperCase() },
        ],
        [
          { cell: 0, guess: '', answer: data[2].word[0].toUpperCase() },
          { cell: 4, guess: '', answer: data[2].word[1].toUpperCase() },
          { cell: 8, guess: '', answer: data[2].word[2].toUpperCase() },
          { cell: 12, guess: '', answer: data[2].word[3].toUpperCase() },
          { cell: 16, guess: '', answer: data[2].word[4].toUpperCase() },
        ],
        [
          { cell: 3, guess: '', answer: data[3].word[0].toUpperCase() },
          { cell: 7, guess: '', answer: data[3].word[1].toUpperCase() },
          { cell: 11, guess: '', answer: data[3].word[2].toUpperCase() },
          { cell: 15, guess: '', answer: data[3].word[3].toUpperCase() },
          { cell: 19, guess: '', answer: data[3].word[4].toUpperCase() },
        ],
      ];
    case 'e-7':
      return [
        [
          { cell: 0, guess: '', answer: data[0].word[0].toUpperCase() },
          { cell: 1, guess: '', answer: data[0].word[1].toUpperCase() },
          { cell: 2, guess: '', answer: data[0].word[2].toUpperCase() },
          { cell: 3, guess: '', answer: data[0].word[3].toUpperCase() },
          { cell: 4, guess: '', answer: data[0].word[4].toUpperCase() },
        ],
        [
          { cell: 15, guess: '', answer: data[1].word[0].toUpperCase() },
          { cell: 16, guess: '', answer: data[1].word[1].toUpperCase() },
          { cell: 17, guess: '', answer: data[1].word[2].toUpperCase() },
          { cell: 18, guess: '', answer: data[1].word[3].toUpperCase() },
          { cell: 19, guess: '', answer: data[1].word[4].toUpperCase() },
        ],
        [
          { cell: 30, guess: '', answer: data[2].word[0].toUpperCase() },
          { cell: 31, guess: '', answer: data[2].word[1].toUpperCase() },
          { cell: 32, guess: '', answer: data[2].word[2].toUpperCase() },
          { cell: 33, guess: '', answer: data[2].word[3].toUpperCase() },
          { cell: 34, guess: '', answer: data[2].word[4].toUpperCase() },
        ],
        [
          { cell: 0, guess: '', answer: data[3].word[0].toUpperCase() },
          { cell: 5, guess: '', answer: data[3].word[1].toUpperCase() },
          { cell: 10, guess: '', answer: data[3].word[2].toUpperCase() },
          { cell: 15, guess: '', answer: data[3].word[3].toUpperCase() },
          { cell: 20, guess: '', answer: data[3].word[4].toUpperCase() },
          { cell: 25, guess: '', answer: data[3].word[5].toUpperCase() },
          { cell: 30, guess: '', answer: data[3].word[6].toUpperCase() },
        ],
      ];
    case 'u-7':
      return [
        [
          { cell: 0, guess: '', answer: data[0].word[0].toUpperCase() },
          { cell: 5, guess: '', answer: data[0].word[1].toUpperCase() },
          { cell: 10, guess: '', answer: data[0].word[2].toUpperCase() },
          { cell: 15, guess: '', answer: data[0].word[3].toUpperCase() },
          { cell: 20, guess: '', answer: data[0].word[4].toUpperCase() },
          { cell: 25, guess: '', answer: data[0].word[5].toUpperCase() },
          { cell: 30, guess: '', answer: data[0].word[6].toUpperCase() },
        ],
        [
          { cell: 4, guess: '', answer: data[1].word[0].toUpperCase() },
          { cell: 9, guess: '', answer: data[1].word[1].toUpperCase() },
          { cell: 14, guess: '', answer: data[1].word[2].toUpperCase() },
          { cell: 19, guess: '', answer: data[1].word[3].toUpperCase() },
          { cell: 24, guess: '', answer: data[1].word[4].toUpperCase() },
          { cell: 29, guess: '', answer: data[1].word[5].toUpperCase() },
          { cell: 34, guess: '', answer: data[1].word[6].toUpperCase() },
        ],
        [
          { cell: 30, guess: '', answer: data[2].word[0].toUpperCase() },
          { cell: 31, guess: '', answer: data[2].word[1].toUpperCase() },
          { cell: 32, guess: '', answer: data[2].word[2].toUpperCase() },
          { cell: 33, guess: '', answer: data[2].word[3].toUpperCase() },
          { cell: 34, guess: '', answer: data[2].word[4].toUpperCase() },
        ],
      ];
    case 'i-9':
      return [
        [
          { cell: 0, guess: '', answer: data[0].word[0].toUpperCase() },
          { cell: 1, guess: '', answer: data[0].word[1].toUpperCase() },
          { cell: 2, guess: '', answer: data[0].word[2].toUpperCase() },
          { cell: 3, guess: '', answer: data[0].word[3].toUpperCase() },
          { cell: 4, guess: '', answer: data[0].word[4].toUpperCase() },
          { cell: 5, guess: '', answer: data[0].word[5].toUpperCase() },
          { cell: 6, guess: '', answer: data[0].word[6].toUpperCase() },
        ],
        [
          { cell: 56, guess: '', answer: data[1].word[0].toUpperCase() },
          { cell: 57, guess: '', answer: data[1].word[1].toUpperCase() },
          { cell: 58, guess: '', answer: data[1].word[2].toUpperCase() },
          { cell: 59, guess: '', answer: data[1].word[3].toUpperCase() },
          { cell: 60, guess: '', answer: data[1].word[4].toUpperCase() },
          { cell: 61, guess: '', answer: data[1].word[5].toUpperCase() },
          { cell: 62, guess: '', answer: data[1].word[6].toUpperCase() },
        ],
        [
          { cell: 3, guess: '', answer: data[2].word[0].toUpperCase() },
          { cell: 10, guess: '', answer: data[2].word[1].toUpperCase() },
          { cell: 17, guess: '', answer: data[2].word[2].toUpperCase() },
          { cell: 24, guess: '', answer: data[2].word[3].toUpperCase() },
          { cell: 31, guess: '', answer: data[2].word[4].toUpperCase() },
          { cell: 38, guess: '', answer: data[2].word[5].toUpperCase() },
          { cell: 45, guess: '', answer: data[2].word[6].toUpperCase() },
          { cell: 52, guess: '', answer: data[2].word[7].toUpperCase() },
          { cell: 59, guess: '', answer: data[2].word[8].toUpperCase() },
        ],
      ];
    case 'v-9':
      return [
        [
          { cell: 0, guess: '', answer: data[0].word[0].toUpperCase() },
          { cell: 7, guess: '', answer: data[0].word[1].toUpperCase() },
          { cell: 14, guess: '', answer: data[0].word[2].toUpperCase() },
          { cell: 22, guess: '', answer: data[0].word[3].toUpperCase() },
          { cell: 29, guess: '', answer: data[0].word[4].toUpperCase() },
          { cell: 36, guess: '', answer: data[0].word[5].toUpperCase() },
          { cell: 44, guess: '', answer: data[0].word[6].toUpperCase() },
          { cell: 51, guess: '', answer: data[0].word[7].toUpperCase() },
          { cell: 59, guess: '', answer: data[0].word[8].toUpperCase() },
        ],
        [
          { cell: 6, guess: '', answer: data[1].word[0].toUpperCase() },
          { cell: 13, guess: '', answer: data[1].word[1].toUpperCase() },
          { cell: 20, guess: '', answer: data[1].word[2].toUpperCase() },
          { cell: 26, guess: '', answer: data[1].word[3].toUpperCase() },
          { cell: 33, guess: '', answer: data[1].word[4].toUpperCase() },
          { cell: 40, guess: '', answer: data[1].word[5].toUpperCase() },
          { cell: 46, guess: '', answer: data[1].word[6].toUpperCase() },
          { cell: 53, guess: '', answer: data[1].word[7].toUpperCase() },
          { cell: 59, guess: '', answer: data[1].word[8].toUpperCase() },
        ],
      ];
    case 'a-9':
      return [
        [
          { cell: 3, guess: '', answer: data[0].word[0].toUpperCase() },
          { cell: 11, guess: '', answer: data[0].word[1].toUpperCase() },
          { cell: 19, guess: '', answer: data[0].word[2].toUpperCase() },
          { cell: 27, guess: '', answer: data[0].word[3].toUpperCase() },
          { cell: 34, guess: '', answer: data[0].word[4].toUpperCase() },
          { cell: 41, guess: '', answer: data[0].word[5].toUpperCase() },
          { cell: 48, guess: '', answer: data[0].word[6].toUpperCase() },
          { cell: 55, guess: '', answer: data[0].word[7].toUpperCase() },
          { cell: 62, guess: '', answer: data[0].word[8].toUpperCase() },
        ],
        [
          { cell: 28, guess: '', answer: data[1].word[0].toUpperCase() },
          { cell: 29, guess: '', answer: data[1].word[1].toUpperCase() },
          { cell: 30, guess: '', answer: data[1].word[2].toUpperCase() },
          { cell: 31, guess: '', answer: data[1].word[3].toUpperCase() },
          { cell: 32, guess: '', answer: data[1].word[4].toUpperCase() },
          { cell: 33, guess: '', answer: data[1].word[5].toUpperCase() },
          { cell: 34, guess: '', answer: data[1].word[6].toUpperCase() },
        ],
        [
          { cell: 3, guess: '', answer: data[2].word[0].toUpperCase() },
          { cell: 9, guess: '', answer: data[2].word[1].toUpperCase() },
          { cell: 15, guess: '', answer: data[2].word[2].toUpperCase() },
          { cell: 21, guess: '', answer: data[2].word[3].toUpperCase() },
          { cell: 28, guess: '', answer: data[2].word[4].toUpperCase() },
          { cell: 35, guess: '', answer: data[2].word[5].toUpperCase() },
          { cell: 42, guess: '', answer: data[2].word[6].toUpperCase() },
          { cell: 49, guess: '', answer: data[2].word[7].toUpperCase() },
          { cell: 56, guess: '', answer: data[2].word[8].toUpperCase() },
        ],
      ];
    case 'a-7':
      return [
        [
          { cell: 2, guess: '', answer: data[0].word[0].toUpperCase() },
          { cell: 8, guess: '', answer: data[0].word[1].toUpperCase() },
          { cell: 14, guess: '', answer: data[0].word[2].toUpperCase() },
          { cell: 19, guess: '', answer: data[0].word[3].toUpperCase() },
          { cell: 24, guess: '', answer: data[0].word[4].toUpperCase() },
          { cell: 29, guess: '', answer: data[0].word[5].toUpperCase() },
          { cell: 34, guess: '', answer: data[0].word[6].toUpperCase() },
        ],
        [
          { cell: 15, guess: '', answer: data[1].word[0].toUpperCase() },
          { cell: 16, guess: '', answer: data[1].word[1].toUpperCase() },
          { cell: 17, guess: '', answer: data[1].word[2].toUpperCase() },
          { cell: 18, guess: '', answer: data[1].word[3].toUpperCase() },
          { cell: 19, guess: '', answer: data[1].word[4].toUpperCase() },
        ],
        [
          { cell: 2, guess: '', answer: data[2].word[0].toUpperCase() },
          { cell: 6, guess: '', answer: data[2].word[1].toUpperCase() },
          { cell: 10, guess: '', answer: data[2].word[2].toUpperCase() },
          { cell: 15, guess: '', answer: data[2].word[3].toUpperCase() },
          { cell: 20, guess: '', answer: data[2].word[4].toUpperCase() },
          { cell: 25, guess: '', answer: data[2].word[5].toUpperCase() },
          { cell: 30, guess: '', answer: data[2].word[6].toUpperCase() },
        ],
      ];
    case 'b-5':
      return [
        [
          { cell: 0, guess: '', answer: data[0].word[0].toUpperCase() },
          { cell: 1, guess: '', answer: data[0].word[1].toUpperCase() },
          { cell: 2, guess: '', answer: data[0].word[2].toUpperCase() },
          { cell: 3, guess: '', answer: data[0].word[3].toUpperCase() },
        ],
        [
          { cell: 3, guess: '', answer: data[1].word[0].toUpperCase() },
          { cell: 7, guess: '', answer: data[1].word[1].toUpperCase() },
        ],
        [
          { cell: 15, guess: '', answer: data[2].word[0].toUpperCase() },
          { cell: 19, guess: '', answer: data[2].word[1].toUpperCase() },
        ],
        [
          { cell: 16, guess: '', answer: data[3].word[0].toUpperCase() },
          { cell: 17, guess: '', answer: data[3].word[1].toUpperCase() },
          { cell: 18, guess: '', answer: data[3].word[2].toUpperCase() },
          { cell: 19, guess: '', answer: data[3].word[3].toUpperCase() },
        ],
        [
          { cell: 0, guess: '', answer: data[4].word[0].toUpperCase() },
          { cell: 4, guess: '', answer: data[4].word[1].toUpperCase() },
          { cell: 8, guess: '', answer: data[4].word[2].toUpperCase() },
          { cell: 12, guess: '', answer: data[4].word[3].toUpperCase() },
          { cell: 16, guess: '', answer: data[4].word[4].toUpperCase() },
        ],
        [
          { cell: 8, guess: '', answer: data[5].word[0].toUpperCase() },
          { cell: 9, guess: '', answer: data[5].word[1].toUpperCase() },
          { cell: 10, guess: '', answer: data[5].word[2].toUpperCase() },
        ],
      ];
    case 'b-7':
      return [
        [
          { cell: 0, guess: '', answer: data[0].word[0].toUpperCase() },
          { cell: 1, guess: '', answer: data[0].word[1].toUpperCase() },
          { cell: 2, guess: '', answer: data[0].word[2].toUpperCase() },
          { cell: 3, guess: '', answer: data[0].word[3].toUpperCase() },
          { cell: 4, guess: '', answer: data[0].word[4].toUpperCase() },
        ],
        [
          { cell: 4, guess: '', answer: data[1].word[0].toUpperCase() },
          { cell: 9, guess: '', answer: data[1].word[1].toUpperCase() },
          { cell: 14, guess: '', answer: data[1].word[2].toUpperCase() },
        ],
        [
          { cell: 24, guess: '', answer: data[2].word[0].toUpperCase() },
          { cell: 29, guess: '', answer: data[2].word[1].toUpperCase() },
          { cell: 34, guess: '', answer: data[2].word[2].toUpperCase() },
        ],
        [
          { cell: 30, guess: '', answer: data[3].word[0].toUpperCase() },
          { cell: 31, guess: '', answer: data[3].word[1].toUpperCase() },
          { cell: 32, guess: '', answer: data[3].word[2].toUpperCase() },
          { cell: 33, guess: '', answer: data[3].word[3].toUpperCase() },
          { cell: 34, guess: '', answer: data[3].word[4].toUpperCase() },
        ],
        [
          { cell: 0, guess: '', answer: data[4].word[0].toUpperCase() },
          { cell: 5, guess: '', answer: data[4].word[1].toUpperCase() },
          { cell: 10, guess: '', answer: data[4].word[2].toUpperCase() },
          { cell: 15, guess: '', answer: data[4].word[3].toUpperCase() },
          { cell: 20, guess: '', answer: data[4].word[4].toUpperCase() },
          { cell: 25, guess: '', answer: data[4].word[5].toUpperCase() },
          { cell: 30, guess: '', answer: data[4].word[6].toUpperCase() },
        ],
        [
          { cell: 15, guess: '', answer: data[5].word[0].toUpperCase() },
          { cell: 16, guess: '', answer: data[5].word[1].toUpperCase() },
          { cell: 17, guess: '', answer: data[5].word[2].toUpperCase() },
          { cell: 18, guess: '', answer: data[5].word[3].toUpperCase() },
        ],
      ];
    case 'b-9':
      return [
        [
          { cell: 0, guess: '', answer: data[0].word[0].toUpperCase() },
          { cell: 1, guess: '', answer: data[0].word[1].toUpperCase() },
          { cell: 2, guess: '', answer: data[0].word[2].toUpperCase() },
          { cell: 3, guess: '', answer: data[0].word[3].toUpperCase() },
          { cell: 4, guess: '', answer: data[0].word[4].toUpperCase() },
          { cell: 5, guess: '', answer: data[0].word[5].toUpperCase() },
        ],
        [
          { cell: 13, guess: '', answer: data[1].word[0].toUpperCase() },
          { cell: 20, guess: '', answer: data[1].word[1].toUpperCase() },
          { cell: 27, guess: '', answer: data[1].word[2].toUpperCase() },
        ],
        [
          { cell: 41, guess: '', answer: data[2].word[0].toUpperCase() },
          { cell: 48, guess: '', answer: data[2].word[1].toUpperCase() },
          { cell: 55, guess: '', answer: data[2].word[2].toUpperCase() },
        ],
        [
          { cell: 56, guess: '', answer: data[3].word[0].toUpperCase() },
          { cell: 57, guess: '', answer: data[3].word[1].toUpperCase() },
          { cell: 58, guess: '', answer: data[3].word[2].toUpperCase() },
          { cell: 59, guess: '', answer: data[3].word[3].toUpperCase() },
          { cell: 60, guess: '', answer: data[3].word[4].toUpperCase() },
          { cell: 61, guess: '', answer: data[3].word[5].toUpperCase() },
        ],
        [
          { cell: 0, guess: '', answer: data[4].word[0].toUpperCase() },
          { cell: 7, guess: '', answer: data[4].word[1].toUpperCase() },
          { cell: 14, guess: '', answer: data[4].word[2].toUpperCase() },
          { cell: 21, guess: '', answer: data[4].word[3].toUpperCase() },
          { cell: 28, guess: '', answer: data[4].word[4].toUpperCase() },
          { cell: 35, guess: '', answer: data[4].word[5].toUpperCase() },
          { cell: 42, guess: '', answer: data[4].word[6].toUpperCase() },
          { cell: 49, guess: '', answer: data[4].word[7].toUpperCase() },
          { cell: 56, guess: '', answer: data[4].word[8].toUpperCase() },
        ],
        [
          { cell: 28, guess: '', answer: data[5].word[0].toUpperCase() },
          { cell: 29, guess: '', answer: data[5].word[1].toUpperCase() },
          { cell: 30, guess: '', answer: data[5].word[2].toUpperCase() },
          { cell: 31, guess: '', answer: data[5].word[3].toUpperCase() },
          { cell: 32, guess: '', answer: data[5].word[4].toUpperCase() },
          { cell: 33, guess: '', answer: data[5].word[5].toUpperCase() },
        ],
      ];
    case 'c-5':
      return [
        [
          { cell: 0, guess: '', answer: data[0].word[0].toUpperCase() },
          { cell: 1, guess: '', answer: data[0].word[1].toUpperCase() },
          { cell: 2, guess: '', answer: data[0].word[2].toUpperCase() },
          { cell: 3, guess: '', answer: data[0].word[3].toUpperCase() },
        ],
        [
          { cell: 16, guess: '', answer: data[1].word[0].toUpperCase() },
          { cell: 17, guess: '', answer: data[1].word[1].toUpperCase() },
          { cell: 18, guess: '', answer: data[1].word[2].toUpperCase() },
          { cell: 19, guess: '', answer: data[1].word[3].toUpperCase() },
        ],
        [
          { cell: 0, guess: '', answer: data[2].word[0].toUpperCase() },
          { cell: 4, guess: '', answer: data[2].word[1].toUpperCase() },
          { cell: 8, guess: '', answer: data[2].word[2].toUpperCase() },
          { cell: 12, guess: '', answer: data[2].word[3].toUpperCase() },
          { cell: 16, guess: '', answer: data[2].word[4].toUpperCase() },
        ],
      ];
    case 'c-7':
      return [
        [
          { cell: 0, guess: '', answer: data[0].word[0].toUpperCase() },
          { cell: 1, guess: '', answer: data[0].word[1].toUpperCase() },
          { cell: 2, guess: '', answer: data[0].word[2].toUpperCase() },
          { cell: 3, guess: '', answer: data[0].word[3].toUpperCase() },
          { cell: 4, guess: '', answer: data[0].word[4].toUpperCase() },
        ],
        [
          { cell: 30, guess: '', answer: data[1].word[0].toUpperCase() },
          { cell: 31, guess: '', answer: data[1].word[1].toUpperCase() },
          { cell: 32, guess: '', answer: data[1].word[2].toUpperCase() },
          { cell: 33, guess: '', answer: data[1].word[3].toUpperCase() },
          { cell: 34, guess: '', answer: data[1].word[4].toUpperCase() },
        ],
        [
          { cell: 0, guess: '', answer: data[2].word[0].toUpperCase() },
          { cell: 5, guess: '', answer: data[2].word[1].toUpperCase() },
          { cell: 10, guess: '', answer: data[2].word[2].toUpperCase() },
          { cell: 15, guess: '', answer: data[2].word[3].toUpperCase() },
          { cell: 20, guess: '', answer: data[2].word[4].toUpperCase() },
          { cell: 25, guess: '', answer: data[2].word[5].toUpperCase() },
          { cell: 30, guess: '', answer: data[2].word[6].toUpperCase() },
        ],
      ];
    case 'c-9':
      return [
        [
          { cell: 0, guess: '', answer: data[0].word[0].toUpperCase() },
          { cell: 1, guess: '', answer: data[0].word[1].toUpperCase() },
          { cell: 2, guess: '', answer: data[0].word[2].toUpperCase() },
          { cell: 3, guess: '', answer: data[0].word[3].toUpperCase() },
          { cell: 4, guess: '', answer: data[0].word[4].toUpperCase() },
          { cell: 5, guess: '', answer: data[0].word[5].toUpperCase() },
          { cell: 6, guess: '', answer: data[0].word[6].toUpperCase() },
        ],
        [
          { cell: 56, guess: '', answer: data[1].word[0].toUpperCase() },
          { cell: 57, guess: '', answer: data[1].word[1].toUpperCase() },
          { cell: 58, guess: '', answer: data[1].word[2].toUpperCase() },
          { cell: 59, guess: '', answer: data[1].word[3].toUpperCase() },
          { cell: 60, guess: '', answer: data[1].word[4].toUpperCase() },
          { cell: 61, guess: '', answer: data[1].word[5].toUpperCase() },
          { cell: 62, guess: '', answer: data[1].word[6].toUpperCase() },
        ],
        [
          { cell: 0, guess: '', answer: data[2].word[0].toUpperCase() },
          { cell: 7, guess: '', answer: data[2].word[1].toUpperCase() },
          { cell: 14, guess: '', answer: data[2].word[2].toUpperCase() },
          { cell: 21, guess: '', answer: data[2].word[3].toUpperCase() },
          { cell: 28, guess: '', answer: data[2].word[4].toUpperCase() },
          { cell: 35, guess: '', answer: data[2].word[5].toUpperCase() },
          { cell: 42, guess: '', answer: data[2].word[6].toUpperCase() },
          { cell: 49, guess: '', answer: data[2].word[7].toUpperCase() },
          { cell: 56, guess: '', answer: data[2].word[8].toUpperCase() },
        ],
      ];
    case 'd-5':
      return [
        [
          { cell: 0, guess: '', answer: data[0].word[0].toUpperCase() },
          { cell: 1, guess: '', answer: data[0].word[1].toUpperCase() },
          { cell: 2, guess: '', answer: data[0].word[2].toUpperCase() },
        ],
        [
          { cell: 7, guess: '', answer: data[1].word[0].toUpperCase() },
          { cell: 11, guess: '', answer: data[1].word[1].toUpperCase() },
          { cell: 15, guess: '', answer: data[1].word[2].toUpperCase() },
        ],
        [
          { cell: 16, guess: '', answer: data[2].word[0].toUpperCase() },
          { cell: 17, guess: '', answer: data[2].word[1].toUpperCase() },
          { cell: 18, guess: '', answer: data[2].word[2].toUpperCase() },
        ],
        [
          { cell: 0, guess: '', answer: data[3].word[0].toUpperCase() },
          { cell: 4, guess: '', answer: data[3].word[1].toUpperCase() },
          { cell: 8, guess: '', answer: data[3].word[2].toUpperCase() },
          { cell: 12, guess: '', answer: data[3].word[3].toUpperCase() },
          { cell: 16, guess: '', answer: data[3].word[4].toUpperCase() },
        ],
      ];
    case 'd-7':
      return [
        [
          { cell: 0, guess: '', answer: data[0].word[0].toUpperCase() },
          { cell: 1, guess: '', answer: data[0].word[1].toUpperCase() },
          { cell: 2, guess: '', answer: data[0].word[2].toUpperCase() },
          { cell: 3, guess: '', answer: data[0].word[3].toUpperCase() },
        ],
        [
          { cell: 9, guess: '', answer: data[1].word[0].toUpperCase() },
          { cell: 14, guess: '', answer: data[1].word[1].toUpperCase() },
          { cell: 19, guess: '', answer: data[1].word[2].toUpperCase() },
          { cell: 24, guess: '', answer: data[1].word[3].toUpperCase() },
          { cell: 29, guess: '', answer: data[1].word[4].toUpperCase() },
        ],
        [
          { cell: 30, guess: '', answer: data[2].word[0].toUpperCase() },
          { cell: 31, guess: '', answer: data[2].word[1].toUpperCase() },
          { cell: 32, guess: '', answer: data[2].word[2].toUpperCase() },
          { cell: 33, guess: '', answer: data[2].word[3].toUpperCase() },
        ],
        [
          { cell: 0, guess: '', answer: data[3].word[0].toUpperCase() },
          { cell: 5, guess: '', answer: data[3].word[1].toUpperCase() },
          { cell: 10, guess: '', answer: data[3].word[2].toUpperCase() },
          { cell: 15, guess: '', answer: data[3].word[3].toUpperCase() },
          { cell: 20, guess: '', answer: data[3].word[4].toUpperCase() },
          { cell: 25, guess: '', answer: data[3].word[5].toUpperCase() },
          { cell: 30, guess: '', answer: data[3].word[6].toUpperCase() },
        ],
      ];
    case 'd-9':
      return [
        [
          { cell: 0, guess: '', answer: data[0].word[0].toUpperCase() },
          { cell: 1, guess: '', answer: data[0].word[1].toUpperCase() },
          { cell: 2, guess: '', answer: data[0].word[2].toUpperCase() },
          { cell: 3, guess: '', answer: data[0].word[3].toUpperCase() },
          { cell: 4, guess: '', answer: data[0].word[4].toUpperCase() },
          { cell: 5, guess: '', answer: data[0].word[5].toUpperCase() },
        ],
        [
          { cell: 13, guess: '', answer: data[1].word[0].toUpperCase() },
          { cell: 20, guess: '', answer: data[1].word[1].toUpperCase() },
          { cell: 27, guess: '', answer: data[1].word[2].toUpperCase() },
          { cell: 34, guess: '', answer: data[1].word[3].toUpperCase() },
          { cell: 41, guess: '', answer: data[1].word[4].toUpperCase() },
          { cell: 48, guess: '', answer: data[1].word[5].toUpperCase() },
          { cell: 55, guess: '', answer: data[1].word[6].toUpperCase() },
        ],
        [
          { cell: 56, guess: '', answer: data[2].word[0].toUpperCase() },
          { cell: 57, guess: '', answer: data[2].word[1].toUpperCase() },
          { cell: 58, guess: '', answer: data[2].word[2].toUpperCase() },
          { cell: 59, guess: '', answer: data[2].word[3].toUpperCase() },
          { cell: 60, guess: '', answer: data[2].word[4].toUpperCase() },
          { cell: 61, guess: '', answer: data[2].word[5].toUpperCase() },
        ],
        [
          { cell: 0, guess: '', answer: data[3].word[0].toUpperCase() },
          { cell: 7, guess: '', answer: data[3].word[1].toUpperCase() },
          { cell: 14, guess: '', answer: data[3].word[2].toUpperCase() },
          { cell: 21, guess: '', answer: data[3].word[3].toUpperCase() },
          { cell: 28, guess: '', answer: data[3].word[4].toUpperCase() },
          { cell: 35, guess: '', answer: data[3].word[5].toUpperCase() },
          { cell: 42, guess: '', answer: data[3].word[6].toUpperCase() },
          { cell: 49, guess: '', answer: data[3].word[7].toUpperCase() },
          { cell: 56, guess: '', answer: data[3].word[8].toUpperCase() },
        ],
      ];
    default:
      throw new Error(`Invalid grid type: ${type}`);
  }
}

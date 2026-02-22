import { createRef } from 'react';

export const resetGridRefs = (gridArea: number) => {
  return Array.from({ length: gridArea }, () => createRef<HTMLDivElement>());
};

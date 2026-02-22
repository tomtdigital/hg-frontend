'use client';

import { useAppSelector } from '@/app/redux/hooks';

export default function CrosswordPreview() {
  const { crosswordFormData } = useAppSelector(
    (state) => state.createCrossword
  );
  console.log('Crossword form data in preview:', crosswordFormData);

  return <div>Crossword Preview</div>;
}

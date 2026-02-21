'use client';

import React, { KeyboardEvent, MutableRefObject } from 'react';

export default function GridPlanner({
  gridSize,
  gridRefs,
  gridValues,
  colorScheme,
  handleChange,
}: {
  gridSize: number;
  gridRefs: MutableRefObject<React.RefObject<HTMLDivElement>[]>;
  gridValues: string[];
  colorScheme: ColorScheme;
  handleChange: (index: number, e: KeyboardEvent<HTMLDivElement>) => void;
}) {
  return (
    <>
      <h2 className='my-4 text-2xl font-bold text-white'>Crossword Grid</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 60px)`,
          gap: 8,
          marginBottom: 20,
        }}
      >
        {gridValues.map((letter, i) => {
          const baseClass = `flex h-[60px] w-[60px] items-center justify-center border-2 cursor-pointer select-none text-2xl font-bold focus:border-4 focus:border-blue-500 focus:outline-none focus:bg-[var(--selected-color)] focus:text-[var(--selected-text-color)]`;
          const bgVarClass = `bg-[var(--bg-color)]`;
          const textColorClass = `text-[var(--text-color)]`;
          const finalClass = `${baseClass} ${bgVarClass} ${textColorClass}`;

          const bgColor = letter
            ? colorScheme?.filled || '#000000'
            : colorScheme?.empty || '#ffffff';
          const selectedColor = colorScheme?.selected || '#E0E0E0';
          const selectedTextColor = colorScheme?.selectedText || '#000000';
          const textColor = colorScheme?.filledText;

          return (
            <div
              key={i}
              ref={gridRefs?.current[i]}
              tabIndex={0}
              onKeyDown={(e) => handleChange(i, e)}
              onClick={() => gridRefs?.current[i]?.current?.focus()}
              className={finalClass}
              style={
                {
                  ['--bg-color']: bgColor,
                  ['--selected-color']: selectedColor,
                  ['--text-color']: textColor,
                  ['--selected-text-color']: selectedTextColor,
                } as React.CSSProperties
              }
            >
              {letter}
            </div>
          );
        })}
      </div>
    </>
  );
}

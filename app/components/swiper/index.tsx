// Swiper.tsx
import { ReactNode } from 'react';

interface Swiper {
  children: ReactNode;
  onLeft: () => void;
  onRight: () => void;
  enableSwipe?: boolean;
}

export default function Swiper({
  children,
  onLeft,
  onRight,
  enableSwipe = true,
}: Swiper) {
  return (
    <div
      className='flex w-full items-center justify-between'
      onTouchStart={(e) => {
        if (!enableSwipe) return;
        const touch = e.touches[0];
        type SwipeDiv = EventTarget & { _swipeStartX?: number };
        (e.currentTarget as SwipeDiv)._swipeStartX = touch.clientX;
      }}
      onTouchEnd={(e) => {
        if (!enableSwipe) return;
        const touch = e.changedTouches[0];
        type SwipeDiv = EventTarget & { _swipeStartX?: number };
        const startX = (e.currentTarget as SwipeDiv)._swipeStartX;
        if (startX !== undefined) {
          const diff = touch.clientX - startX;
          if (diff < -50) {
            onRight(); // Swipe left
          } else if (diff > 50) {
            onLeft(); // Swipe right
          }
        }
      }}
    >
      <button
        type='button'
        onClick={onLeft}
        aria-label='left'
        className='cursor-pointer border-none bg-none px-2 text-2xl text-midGrey'
      >
        &lt;
      </button>
      <div className='flex-1'>{children}</div>
      <button
        type='button'
        onClick={onRight}
        aria-label='right'
        className='cursor-pointer border-none bg-none px-2 text-2xl text-midGrey'
      >
        &gt;
      </button>
    </div>
  );
}

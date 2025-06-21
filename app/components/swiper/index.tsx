// Swiper.tsx
import { ReactNode } from 'react';

interface Swiper {
  children: ReactNode;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export default function Swiper({
  children,
  onSwipeLeft,
  onSwipeRight,
}: Swiper) {
  return (
    <div
      className='flex items-center'
      onTouchStart={(e) => {
        const touch = e.touches[0];
        type SwipeDiv = EventTarget & { _swipeStartX?: number };
        (e.currentTarget as SwipeDiv)._swipeStartX = touch.clientX;
      }}
      onTouchEnd={(e) => {
        const touch = e.changedTouches[0];
        type SwipeDiv = EventTarget & { _swipeStartX?: number };
        const startX = (e.currentTarget as SwipeDiv)._swipeStartX;
        if (startX !== undefined) {
          const diff = touch.clientX - startX;
          if (diff < -50) {
            onSwipeLeft();
          } else if (diff > 50) {
            onSwipeRight();
          }
        }
      }}
    >
      <button
        type='button'
        onClick={onSwipeRight}
        aria-label='Swipe right'
        className='cursor-pointer border-none bg-none px-2 text-2xl text-midGrey'
      >
        &lt;
      </button>
      <div className='flex-1'>{children}</div>
      <button
        type='button'
        onClick={onSwipeLeft}
        aria-label='Swipe left'
        className='cursor-pointer border-none bg-none px-2 text-2xl text-midGrey'
      >
        &gt;
      </button>
    </div>
  );
}

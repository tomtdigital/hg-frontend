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
      {children}
    </div>
  );
}

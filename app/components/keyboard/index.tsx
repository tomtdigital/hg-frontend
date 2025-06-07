import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { setKeyPressed } from '@/app/redux/slices/game-slice';
import { useEffect, useRef, useState } from 'react';

type KeyboardProps = {
  active: boolean;
};

const Keyboard = ({ active }: KeyboardProps) => {
  const [activeKey, setActiveKey] = useState<string>('');
  const isKeyPressedRef = useRef(false); // Use useRef to persist the value
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL'],
  ];

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.credentials.id);
  const gameComplete: boolean = useAppSelector(
    (state) => state.gameSession?.session.gameData.gameComplete
  );

  useEffect(() => {
    const handleKeyboardUse = ({ key }: { key: string }): void => {
      if (isKeyPressedRef.current) return;
      isKeyPressedRef.current = true;

      if (
        /^[a-zA-Z]+$/.test(key) &&
        (key.length === 1 || key === 'Backspace')
      ) {
        const formattedKey = key === 'Backspace' ? 'DEL' : key.toUpperCase();
        setActiveKey(formattedKey);
        dispatch(
          setKeyPressed({
            keyPressed: {
              letter: formattedKey,
            },
            userId,
          })
        );
      }
    };

    const handleKeyUp = () => {
      isKeyPressedRef.current = false;
      setTimeout(() => setActiveKey(''), 20);
    };

    window.addEventListener('keydown', handleKeyboardUse);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyboardUse);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <>
      {rows.map((row, index) => {
        let colClass = 'grid-cols-10';
        if (index === 1) colClass = 'grid-cols-9';
        if (index === 2) colClass = 'grid-cols-8';

        return (
          // Row container
          <div key={row.toString()} className={`grid ${colClass}`}>
            {row.map((char) => {
              return (
                //  Individual Buttons
                <div
                  key={char}
                  className={`mb-[0.2em] mr-[0.2em] flex cursor-pointer items-center justify-center rounded-[0.2em] bg-midGrey text-center font-bold text-white ${
                    activeKey === char ? 'bg-darkGrey' : ''
                  }`}
                  onClick={(event) => {
                    event.preventDefault();
                    if (!gameComplete && active) {
                      dispatch(
                        setKeyPressed({ keyPressed: { letter: char }, userId })
                      );
                    }
                  }}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    if (!gameComplete && active) {
                      setActiveKey(char);
                    }
                  }}
                  onMouseUp={(event) => {
                    event.preventDefault();
                    setTimeout(() => setActiveKey(''), 20);
                  }}
                  onTouchStart={(event) => {
                    event.preventDefault();
                    if (!gameComplete && active) {
                      setActiveKey(char);
                      dispatch(
                        setKeyPressed({ keyPressed: { letter: char }, userId })
                      );
                    }
                  }}
                  onTouchEnd={(event) => {
                    event.preventDefault();
                    setTimeout(() => setActiveKey(''), 20);
                  }}
                >
                  {char !== 'DEL' ? (
                    <div>{char}</div>
                  ) : (
                    <div className='flex justify-center'>
                      <svg
                        className='block w-[80%]'
                        fill='#fff'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 489.425 489.425'
                      >
                        <g>
                          <g>
                            <path
                              d='M122.825,394.663c17.8,19.4,43.2,30.6,69.5,30.6h216.9c44.2,0,80.2-36,80.2-80.2v-200.7c0-44.2-36-80.2-80.2-80.2h-216.9
				c-26.4,0-51.7,11.1-69.5,30.6l-111.8,121.7c-14.7,16.1-14.7,40.3,0,56.4L122.825,394.663z M29.125,233.063l111.8-121.8
				c13.2-14.4,32-22.6,51.5-22.6h216.9c30.7,0,55.7,25,55.7,55.7v200.6c0,30.7-25,55.7-55.7,55.7h-217c-19.5,0-38.3-8.2-51.5-22.6
				l-111.7-121.8C23.025,249.663,23.025,239.663,29.125,233.063z'
                            />
                            <path
                              d='M225.425,309.763c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6l47.8-47.8l47.8,47.8c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6
				c4.8-4.8,4.8-12.5,0-17.3l-47.9-47.8l47.8-47.8c4.8-4.8,4.8-12.5,0-17.3s-12.5-4.8-17.3,0l-47.8,47.8l-47.8-47.8
				c-4.8-4.8-12.5-4.8-17.3,0s-4.8,12.5,0,17.3l47.8,47.8l-47.8,47.8C220.725,297.263,220.725,304.962,225.425,309.763z'
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default Keyboard;

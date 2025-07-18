'use client';

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import {
  GameState,
  setReadDescription,
  setTabIndex,
} from '@/app/redux/slices/game-slice';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Keyboard from '../keyboard';
import Clue from './clue';
import { GridSection } from './grid-section';
import PageWrapper from './page-wrapper';
import Solution from './solution';
import GameStageSwipe from '../swiper/game-stage-swipe';
import { useEffect, useState } from 'react';
import { formatDate } from '@/app/utils/format-date';

type GameProps = {
  grids: GameGrid;
  solution: string;
  praise: string[];
  intro: {
    title: string;
    description?: string;
  };
};

export default function Game({ grids, solution, intro, praise }: GameProps) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const dispatch = useAppDispatch();
  const readDescription = useAppSelector((state) => state.game.readDescription);
  const userId = useAppSelector((state) => state.user.credentials.id);
  const storeGame: GameState = useAppSelector((state) => state.game);
  const storeSession: StoredGameSession = useAppSelector(
    (state) => state.gameSession?.session
  );
  const { tabIndex, advanceModalVisible } = storeGame;
  const { stage, score, gameComplete } = storeSession.gameData;

  const allWords = grids.flatMap((grid) => {
    const { data } = grid;
    return data.map((item) => item?.word ?? null);
  });
  const totalLetters = allWords.join('').length;
  const maxScore = totalLetters * 3;

  // TODO isolate in a hydration wrapper
  if (!hydrated)
    return (
      <div className='h-[calc(100vh-3em)] w-full flex-col items-center justify-center'>
        <div className='flex min-h-full w-full flex-col items-center justify-center'>
          <p>Loading...</p>
        </div>
      </div>
    );
  return (
    <PageWrapper>
      {/* TODO: ensure description is scrollable and displays fine on page */}
      {!readDescription ? (
        <>
          <div className='flex h-[calc(100vh-3em)] w-full flex-col items-center justify-center overflow-auto'>
            <div className='flex min-h-full w-full flex-col items-center justify-center'>
              <div className='mb-4 max-w-md text-center'>
                <h2 className='mb-2 text-2xl font-bold'>
                  {formatDate(intro.title)}
                </h2>
                <p className='text-lg'>{intro.description}</p>
              </div>
              <button
                className='mt-4 rounded bg-purple-500 px-6 py-2 text-white hover:bg-purple-600'
                onClick={() =>
                  dispatch(
                    setReadDescription({ readDescription: true, userId })
                  )
                }
              >
                Start Game
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='hidden h-md:block'>
            <Tabs
              selectedIndex={tabIndex}
              onSelect={(value) => {
                dispatch(setTabIndex({ tabIndex: value, userId }));
              }}
            >
              <div className='mt-[1em]'>
                <div className='text-center'>
                  <p className='text-[1.5em]'>Score- {score}</p>
                </div>
              </div>
              <div className='flex justify-center'>
                <TabList className='mb-[2em] mt-1 flex'>
                  {grids.map((game, index) => {
                    let unlocked = index === 0;
                    if (index > 0) unlocked = stage >= index;
                    let tabColors = 'border-midGrey bg-midGrey';
                    const isCurrent = index === tabIndex;
                    const isCompleted = stage > index;
                    if (isCompleted) {
                      tabColors = isCurrent
                        ? 'border-green-600 bg-green-500'
                        : 'border-green-400 bg-green-400';
                    } else if (unlocked) {
                      tabColors = isCurrent
                        ? `border-lightGrey-600 bg-lightGrey-500`
                        : `border-lightGrey-400 bg-lightGrey-400`;
                    }

                    return (
                      <Tab
                        key={game.grid + 'tab'}
                        className={`ml-1 mr-1 flex h-8 w-8 items-center justify-center rounded-[50%] border-2 border-solid ${tabColors} font-medium text-black ${
                          unlocked ? 'cursor-pointer' : ''
                        }`}
                        disabled={!unlocked}
                      >
                        <span className='block'>
                          {unlocked ? index + 1 : <>&#128274;</>}
                        </span>
                      </Tab>
                    );
                  })}
                  <Tab
                    className={`ml-1 mr-1 flex h-8 w-8 items-center justify-center rounded-[50%] border-2 border-solid font-medium ${
                      gameComplete
                        ? tabIndex === grids.length
                          ? 'border-green-600 bg-green-500 text-black'
                          : 'border-green-500 bg-green-400 text-black'
                        : tabIndex !== grids.length
                          ? 'border-purple-500 bg-purple-400 text-white'
                          : 'border-purple-600 bg-purple-500 text-white'
                    } cursor-pointer`}
                  >
                    {'💭'}
                  </Tab>
                </TabList>
              </div>
              {grids.map((game, index) => {
                const active =
                  !gameComplete && !advanceModalVisible && stage === index;

                return (
                  <TabPanel key={game.grid + 'grid'}>
                    <GameStageSwipe>
                      <GridSection
                        type={game.grid}
                        round={index}
                        data={game.data}
                        active={active}
                        praise={praise}
                        maxScore={maxScore}
                      />
                    </GameStageSwipe>
                    <div className='mt-[3em] h-[75px] h-lg:h-[90px]'>
                      <Clue
                        active={active}
                        gridSize={grids[tabIndex]?.data?.length || 0}
                      />
                    </div>
                    <div className='grid h-[calc(48vh-60px-75px-3em)] grid-cols-1 grid-rows-3 h-lg:h-[calc(48vh-60px-90px-3em)]'>
                      <Keyboard active={active} />
                    </div>
                  </TabPanel>
                );
              })}
              <TabPanel>
                {gameComplete ? (
                  <GameStageSwipe>
                    <Solution
                      text={solution}
                      active={!gameComplete}
                      maxScore={maxScore}
                      grids={grids}
                    />
                  </GameStageSwipe>
                ) : (
                  <div className='w-full px-4'>
                    <Solution
                      text={solution}
                      active={!gameComplete}
                      maxScore={maxScore}
                      grids={grids}
                    />
                  </div>
                )}
              </TabPanel>
            </Tabs>
          </div>
          <div className='block h-md:hidden'>
            <div className='flex h-full min-h-[300px] flex-col items-center justify-center'>
              <p className='mb-2 text-center text-lg font-semibold'>
                Please rotate your device
              </p>
              <p className='text-center text-sm text-gray-400'>
                Unable to display the game at this screen height.
              </p>
              <span role='img' aria-label='rotate' className='mt-4 text-4xl'>
                🔄
              </span>
            </div>
          </div>
        </>
      )}
    </PageWrapper>
  );
}

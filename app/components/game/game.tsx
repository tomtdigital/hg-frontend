'use client';

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import {
  GameState,
  setActiveWord,
  setTabIndex,
} from '@/app/redux/slices/game-slice';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Keyboard from '../keyboard';
import Clue from './clue';
import { GridSection } from './grid-section';
import PageWrapper from './page-wrapper';
import Solution from './solution';

type GameProps = {
  grids: GameGrid;
  solution: string;
  praise: string[];
};

export default function Game({ grids, solution, praise }: GameProps) {
  const dispatch = useAppDispatch();
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

  return (
    <PageWrapper>
      <>
        <Tabs
          selectedIndex={tabIndex}
          onSelect={(value) => {
            dispatch(setTabIndex(value));
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
                if (unlocked) {
                  tabColors = 'border-lightGrey bg-lightGrey';
                }
                if (stage > index) {
                  tabColors = 'border-green bg-green';
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
                      {unlocked ? (
                        stage > index ? (
                          '✔️'
                        ) : (
                          index + 1
                        )
                      ) : (
                        <>&#128274;</>
                      )}
                    </span>
                  </Tab>
                );
              })}
              <Tab
                className={`ml-1 mr-1 flex h-8 w-8 items-center justify-center rounded-[50%] border-2 border-solid font-medium ${
                  gameComplete
                    ? 'border-green bg-green text-black'
                    : 'border-purple bg-purple text-white'
                } cursor-pointer`}
              >
                {gameComplete ? '✔️' : '💭'}
              </Tab>
            </TabList>
          </div>
          {grids.map((game, index) => {
            const active =
              !gameComplete && !advanceModalVisible && stage === index;

            return (
              <TabPanel key={game.grid + 'grid'}>
                <GridSection
                  type={game.grid}
                  round={index}
                  data={game.data}
                  active={active}
                  praise={praise}
                  maxScore={maxScore}
                />
                <div className='mt-[3em] h-[100px]'>
                  <Clue active={active} />
                </div>
                <div className='grid h-[calc(48vh-60px-100px-3em)] grid-cols-1 grid-rows-3'>
                  <Keyboard active={active} />
                </div>
              </TabPanel>
            );
          })}
          <TabPanel>
            <Solution
              text={solution}
              active={!gameComplete}
              maxScore={maxScore}
            />
            <div className='grid h-[calc(48vh-60px-100px-3em)] grid-cols-1 grid-rows-3'>
              <Keyboard active={!gameComplete} />
            </div>
          </TabPanel>
        </Tabs>
      </>
    </PageWrapper>
  );
}

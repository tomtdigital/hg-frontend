'use client';

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { GameState, setTabIndex } from '@/app/redux/slices/game-slice';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Keyboard from '../keyboard';
import Clue from './clue';
import { GridSection } from './grid-section';
import PageWrapper from './page-wrapper';
import Solution from './solution';
import GameStageSwipe from '../swiper/game-stage-swipe';

type GameProps = {
  grids: GameGrid;
  solution: string;
  praise: string[];
};

export default function Game({ grids, solution, praise }: GameProps) {
  const dispatch = useAppDispatch();
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

  return (
    <PageWrapper>
      <div className='h-md:block hidden'>
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
                if (unlocked || index === tabIndex) {
                  tabColors = 'border-lightGrey bg-lightGrey';
                }
                if (stage > index && index !== tabIndex) {
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
                      {unlocked ? index + 1 : <>&#128274;</>}
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
                <div className='h-lg:h-[90px] mt-[3em] h-[75px]'>
                  <Clue active={active} />
                </div>
                <div className='h-lg:h-[calc(48vh-60px-90px-3em)] grid h-[calc(48vh-60px-75px-3em)] grid-cols-1 grid-rows-3'>
                  <Keyboard active={active} />
                </div>
              </TabPanel>
            );
          })}
          <TabPanel>
            <GameStageSwipe>
              <Solution
                text={solution}
                active={!gameComplete}
                maxScore={maxScore}
                grids={grids}
              />
            </GameStageSwipe>
            <div className='grid h-[calc(48vh-60px-100px-3em)] grid-cols-1 grid-rows-3'>
              <Keyboard active={!gameComplete} />
            </div>
          </TabPanel>
        </Tabs>
      </div>
      <div className='h-md:hidden block'>
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
    </PageWrapper>
  );
}

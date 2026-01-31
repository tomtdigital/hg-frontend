import GridCreator from './components/grid-creator';

export default async function CreateCrossword() {
  const size = 5;
  return (
    <>
      <GridCreator size={size} />
    </>
  );
}

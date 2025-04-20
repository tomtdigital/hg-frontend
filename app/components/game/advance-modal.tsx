import Modal from '../modal';

type AdvanceModalProps = {
  visible: boolean;
  stage: number;
  data: Word[];
  praise: string[];
  handleAdvance: () => void;
};

const AdvanceModal = ({
  visible,
  stage,
  data,
  praise,
  handleAdvance,
}: AdvanceModalProps) => (
  <Modal visible={visible}>
    <p className='text-2xl font-bold text-black'>Stage {stage + 1} Complete!</p>
    <p className='text-black'>{praise[stage]}</p>
    <p className='mb-2 text-black'>
      Here were the descriptors for your answers-
    </p>
    {data.map((item) => (
      <p key={item.word} className='text-black'>
        <strong>{item.word.toUpperCase()}</strong> - {item.clue}
      </p>
    ))}
    <div className='mt-4 flex justify-center'>
      <button
        className='rounded bg-yellow px-6 py-3 text-lg text-black'
        onClick={handleAdvance}
      >
        Advance
      </button>
    </div>
  </Modal>
);

export default AdvanceModal;

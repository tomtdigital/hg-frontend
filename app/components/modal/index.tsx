interface ModalProps {
  visible: boolean;
  children: React.ReactNode;
}

export default function Modal({ visible, children }: ModalProps) {
  return (
    <div
      className={`${
        !visible && 'hidden'
      } shadow-z1 fixed left-[50%] top-[50%] w-[calc(100vw-3em)] max-w-[350px] translate-x-[-50%] translate-y-[-50%] bg-white p-3`}
    >
      {children}
    </div>
  );
}

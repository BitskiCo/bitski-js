interface BitskiConnectProps {
  displayText?: string;
  onClick: () => void;
}

export const BitskiConnect = ({ displayText = 'Login', onClick }: BitskiConnectProps) => {
  return (
    <button
      className="bg-[color:var(--main-obsidian)] flex h-11 flex-col justify-center items-center px-5 py-0 rounded-2xl"
      onClick={onClick}
    >
      <p className="text-[color:var(--main-white,color(display-p3_1_1_1))] text-center text-[13px] not-italic font-[590] leading-[13px]">
        {displayText}
      </p>
    </button>
  );
};
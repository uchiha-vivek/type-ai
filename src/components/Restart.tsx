import { useRef } from "react";
import { MdRefresh } from "react-icons/md";

interface RestartProps {
  onRestart: () => void;
  className?: string;
}

const Restart = ({ onRestart: handleRestart, className = "" }: RestartProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  function handleClick() {
    buttonRef.current?.blur();
    handleRestart();
  }

  return (
    <button
      ref={buttonRef}
      className={`block rounded px-8 py-4 hover:bg-slate-700/50 ${className}`}
      onClick={handleClick}
    >
      <MdRefresh className="w-6 h-6" />
    </button>
  );
};

export default Restart;

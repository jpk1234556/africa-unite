import { Sun, Moon } from 'lucide-react';
import { AfricaLogo } from './AfricaLogo';

interface HeaderProps {
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode = true, onToggleTheme }) => {
  return (
    <header className="px-5 py-3 safe-top flex items-center justify-between border-b border-[#143224]/40 bg-[#06140e]/95 backdrop-blur-md sticky top-0 z-20">
      {/* Brand info */}
      <div className="flex items-center space-x-3">
        <AfricaLogo size={42} />
        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-white tracking-wide leading-none flex items-center gap-1.5 font-sans">
            <span className="text-[#facc15] font-extrabold">a</span>FRICA Unite
          </h1>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#6c8e7e] mt-1">
            LEDGER STATUS: <span className="text-[#86efac]">LIVE</span>
          </span>
        </div>
      </div>

      {/* Status pills & theme toggle */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#0a2318] border border-[#1d4634] text-xs font-semibold text-gray-200">
          <span className="w-1.5 h-1.5 rounded-full bg-[#eab308]"></span>
          <span className="text-[10px] tracking-wider text-gray-300 font-bold">ID: 1</span>
        </div>

        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#0a2318] border border-[#1d4634] text-xs font-semibold text-gray-200">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
          <span className="text-[10px] tracking-wider text-[#93c5aa] font-bold">ONLINE</span>
        </div>

        <button
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          className="p-1 rounded-full hover:bg-[#122e20] text-gray-300 hover:text-[#facc15] transition-colors"
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 text-gray-200 hover:text-[#facc15] transition-colors" />
          ) : (
            <Moon className="w-4 h-4 text-gray-200" />
          )}
        </button>
      </div>
    </header>
  );
};

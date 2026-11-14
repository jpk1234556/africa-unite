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

      {/* Status pill & theme toggle */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#0a2318] border border-[#1d4634] text-xs font-semibold text-gray-200">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
          <span className="text-[11px] tracking-wider text-[#93c5aa]">ONLINE</span>
        </div>

        <button
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          className="p-1.5 rounded-full hover:bg-[#122e20] text-gray-300 hover:text-white transition-colors"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-gray-200 hover:text-[#facc15] transition-colors" />
          ) : (
            <Moon className="w-5 h-5 text-gray-200" />
          )}
        </button>
      </div>
    </header>
  );
};

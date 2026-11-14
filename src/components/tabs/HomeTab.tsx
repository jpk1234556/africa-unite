import { BarChart3, Briefcase } from 'lucide-react';
import type { Group } from '../../types';

interface HomeTabProps {
  groups: Group[];
  onNavigateToGroups: () => void;
  onRequestLoan: () => void;
  onViewAssets: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  groups,
  onNavigateToGroups,
  onRequestLoan,
  onViewAssets,
}) => {
  return (
    <div className="px-4 sm:px-5 py-4 space-y-4 pb-28">
      {/* 1. Header: Dashboard */}
      <div className="flex items-center justify-between pt-1">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
          Dashboard
        </h2>

        {/* Golden Network Cluster Icon */}
        <div className="text-[#eab308] p-2">
          <svg
            className="w-8 h-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="18" cy="6" r="2.2" />
            <circle cx="6" cy="12" r="2.2" />
            <circle cx="18" cy="18" r="2.2" />
            <circle cx="12" cy="12" r="1.8" />
            <path d="M7.8 11.1l8.4-4.2" />
            <path d="M7.8 12.9l8.4 4.2" />
            <path d="M8.2 12h2" />
          </svg>
        </div>
      </div>

      {/* 3. WALLET POSITION */}
      <div className="bg-[#081d14]/90 border border-[#143224] rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20">
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#6c8e7e] block">
          WALLET POSITION
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1 mb-4 font-sans">
          UGX 724,422.24
        </h3>

        <div className="grid grid-cols-2 gap-2.5">
          {/* POWER */}
          <div className="bg-[#05150e]/95 border border-[#143224] rounded-xl p-3">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
              POWER
            </span>
            <span className="block text-base sm:text-lg font-bold text-[#22c55e] mt-1 font-sans">
              72.5K
            </span>
          </div>

          {/* ASSETS */}
          <div className="bg-[#05150e]/95 border border-[#143224] rounded-xl p-3">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
              ASSETS
            </span>
            <span className="block text-base sm:text-lg font-bold text-white mt-1 font-sans">
              1
            </span>
          </div>

          {/* GROUPS */}
          <button
            type="button"
            onClick={onNavigateToGroups}
            className="bg-[#05150e]/95 border border-[#143224] hover:border-[#22503a] rounded-xl p-3 text-left transition-colors cursor-pointer group"
          >
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e] group-hover:text-[#eab308] transition-colors">
              GROUPS
            </span>
            <span className="block text-base sm:text-lg font-bold text-white mt-1 font-sans">
              {groups.length || 3}
            </span>
          </button>

          {/* LOANS */}
          <div className="bg-[#05150e]/95 border border-[#143224] rounded-xl p-3">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
              LOANS
            </span>
            <span className="block text-base sm:text-lg font-bold text-white mt-1 font-sans">
              0
            </span>
          </div>
        </div>
      </div>

      {/* 4. TRUST COMMAND */}
      <div className="bg-[#081d14]/90 border border-[#143224] rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20">
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#6c8e7e] block">
          TRUST COMMAND
        </span>
        <div className="flex items-center justify-between mt-2 gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">
              72.5 / ESTABLISHED
            </h3>
            <p className="text-xs sm:text-sm text-[#8ca89b] mt-1 leading-relaxed">
              Repayment discipline feeds trust power.
            </p>
          </div>

          {/* Circular Trust Gauge Ring */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#102b1e]"
                strokeWidth="3.2"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#eab308]"
                strokeDasharray="72.5, 100"
                strokeWidth="3.2"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs sm:text-sm font-bold text-white font-sans">
              72.5
            </span>
          </div>
        </div>
      </div>

      {/* 6. AFRICAN MARKET POSTURE */}
      <div className="bg-[#081d14]/90 border border-[#143224] rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20">
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#6c8e7e] block mb-3">
          AFRICAN MARKET POSTURE
        </span>
        <div className="grid grid-cols-2 gap-2.5">
          {/* PRODUCTIVE CAPACITY */}
          <div className="bg-[#05150e]/95 border border-[#143224] rounded-xl p-3">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
              PRODUCTIVE CAPACITY
            </span>
            <span className="block text-sm sm:text-base font-bold text-white mt-1 font-sans tracking-tight">
              UGX 2,415,515.01
            </span>
          </div>

          {/* GROUP POOL */}
          <div className="bg-[#05150e]/95 border border-[#143224] rounded-xl p-3">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
              GROUP POOL
            </span>
            <span className="block text-sm sm:text-base font-bold text-white mt-1 font-sans tracking-tight">
              UGX 4,831,693.64
            </span>
          </div>

          {/* ASSET COLLATERAL */}
          <div className="bg-[#05150e]/95 border border-[#143224] rounded-xl p-3">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
              ASSET COLLATERAL
            </span>
            <span className="block text-sm sm:text-base font-bold text-white mt-1 font-sans tracking-tight">
              UGX 0.00
            </span>
          </div>

          {/* ACTIVE DEBT */}
          <div className="bg-[#05150e]/95 border border-[#143224] rounded-xl p-3">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
              ACTIVE DEBT
            </span>
            <span className="block text-sm sm:text-base font-bold text-white mt-1 font-sans tracking-tight">
              UGX 0.00
            </span>
          </div>

          {/* GROUPS */}
          <div className="bg-[#05150e]/95 border border-[#143224] rounded-xl p-3">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
              GROUPS
            </span>
            <span className="block text-sm sm:text-base font-bold text-white mt-1 font-sans">
              {groups.length || 3}
            </span>
          </div>

          {/* ASSETS */}
          <div className="bg-[#05150e]/95 border border-[#143224] rounded-xl p-3">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
              ASSETS
            </span>
            <span className="block text-sm sm:text-base font-bold text-white mt-1 font-sans">
              1
            </span>
          </div>
        </div>
      </div>

      {/* 7. Action Buttons: REQUEST NEW LOAN & VIEW ASSETS */}
      <div className="space-y-3 pt-1">
        <button
          type="button"
          onClick={onRequestLoan}
          className="w-full bg-[#eab308] hover:bg-[#facc15] text-[#06140e] font-extrabold text-sm sm:text-base py-3.5 px-4 rounded-xl flex items-center justify-center gap-2.5 transition-colors uppercase tracking-wider shadow-md shadow-[#eab308]/20 cursor-pointer"
        >
          <BarChart3 className="w-5 h-5 stroke-[2.5]" />
          <span>REQUEST NEW LOAN</span>
        </button>

        <button
          type="button"
          onClick={onViewAssets}
          className="w-full bg-[#081d14] border border-[#eab308]/60 hover:border-[#eab308] text-[#eab308] hover:text-white font-extrabold text-sm sm:text-base py-3.5 px-4 rounded-xl flex items-center justify-center gap-2.5 transition-colors uppercase tracking-wider cursor-pointer"
        >
          <Briefcase className="w-5 h-5 stroke-[2.2]" />
          <span>VIEW ASSETS</span>
        </button>
      </div>
    </div>
  );
};

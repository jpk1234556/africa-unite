import type { Group } from '../../types';
import { formatUGX, calculateFundedPercentage } from '../../utils/formatters';

interface GroupCardProps {
  group: Group;
  onOpenGroup: (group: Group) => void;
}

export const GroupCard = ({ group, onOpenGroup }: GroupCardProps) => {
  const percentage = calculateFundedPercentage(group.poolAmount, group.goalAmount);

  return (
    <div
      onClick={() => onOpenGroup(group)}
      className="bg-[#081d14]/90 border border-[#143224] hover:border-[#22503a] rounded-2xl p-3.5 sm:p-4 transition-all duration-200 cursor-pointer group shadow-lg shadow-black/25"
    >
      {/* Top Header: Avatar + Title & Subtitle + Open group */}
      <div className="flex items-center space-x-3">
        {/* Avatar Monogram */}
        <div className="w-11 h-11 rounded-xl bg-[#eab308] flex items-center justify-center text-[#06140e] font-extrabold text-sm sm:text-base flex-shrink-0 shadow-sm">
          {group.avatar || group.name.slice(0, 2).toUpperCase()}
        </div>

        {/* Title, Status Line & Open group */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight truncate">
              {group.name}
            </h3>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenGroup(group);
              }}
              className="text-[#eab308] hover:text-[#facc15] text-xs sm:text-sm font-medium hover:underline flex-shrink-0 cursor-pointer"
            >
              Open group
            </button>
          </div>

          <p className="text-xs sm:text-sm text-[#6c8e7e] mt-0.5">
            {group.membersCount} members | {group.status} | {group.visibility}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#122e20] rounded-full h-1.5 sm:h-2 mt-3.5 mb-3 overflow-hidden">
        <div
          className="h-full rounded-full bg-[#eab308] transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Metric Boxes: POOL and GOAL */}
      <div className="grid grid-cols-2 gap-3 mb-2.5">
        <div className="bg-[#05150e]/95 border border-[#143224] rounded-xl p-2.5 sm:p-3">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-[#6c8e7e]">
            POOL
          </span>
          <span className="block text-sm sm:text-base font-bold text-white mt-1 font-sans tracking-tight">
            {formatUGX(group.poolAmount)}
          </span>
        </div>

        <div className="bg-[#05150e]/95 border border-[#143224] rounded-xl p-2.5 sm:p-3">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-[#6c8e7e]">
            GOAL
          </span>
          <span className="block text-sm sm:text-base font-bold text-white mt-1 font-sans tracking-tight">
            {formatUGX(group.goalAmount)}
          </span>
        </div>
      </div>

      {/* Footer: Payout and Funded Percentage */}
      <div className="flex items-center justify-between text-xs sm:text-sm pt-0.5">
        <span className="text-[#6c8e7e]">
          Payout: {group.payoutDate}
        </span>
        <span className="text-[#eab308] font-bold">
          {percentage}% funded
        </span>
      </div>
    </div>
  );
};

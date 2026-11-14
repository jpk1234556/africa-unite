import { ArrowUpRight, Shield, Wallet, TrendingUp, Sparkles } from 'lucide-react';
import type { Group } from '../../types';
import { formatUGX } from '../../utils/formatters';

interface HomeTabProps {
  groups: Group[];
  onNavigateToGroups: () => void;
  onOpenCreate: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ groups, onNavigateToGroups, onOpenCreate }) => {
  const totalPoolSum = groups.reduce((acc, curr) => acc + curr.poolAmount, 0);

  return (
    <div className="px-5 py-4 space-y-5">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-[#102d1f] to-[#0a1e15] border border-[#1d4633] rounded-2xl p-4 sm:p-5 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#eab308]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#86efac] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
            Decentralized Cooperative Pot
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#eab308]/15 border border-[#eab308]/40 text-[#facc15] text-[10px] font-bold">
            UGANDA SHILLINGS
          </span>
        </div>

        <p className="text-xs text-[#8da99c]">Total Pooled Across Groups</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
          {formatUGX(totalPoolSum)}
        </h2>

        {/* Quick action pill buttons */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            onClick={onNavigateToGroups}
            className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-[#eab308] text-[#06140e] font-bold text-xs hover:bg-[#facc15] transition-colors"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>View All Groups</span>
          </button>
          <button
            onClick={onOpenCreate}
            className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-[#112d20] border border-[#23533c] text-white font-semibold text-xs hover:bg-[#183d2c] transition-colors"
          >
            <span>+ Create Group</span>
          </button>
        </div>
      </div>

      {/* Trust & Network Vitality */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-[#0b2118]/80 border border-[#163828] rounded-xl p-3 text-center">
          <Shield className="w-4 h-4 text-[#10b981] mx-auto mb-1" />
          <span className="text-[10px] text-[#6c8e7e] uppercase font-bold block">Trust Score</span>
          <span className="text-base font-extrabold text-white">88%</span>
        </div>
        <div className="bg-[#0b2118]/80 border border-[#163828] rounded-xl p-3 text-center">
          <Wallet className="w-4 h-4 text-[#eab308] mx-auto mb-1" />
          <span className="text-[10px] text-[#6c8e7e] uppercase font-bold block">Active Pots</span>
          <span className="text-base font-extrabold text-white">{groups.length}</span>
        </div>
        <div className="bg-[#0b2118]/80 border border-[#163828] rounded-xl p-3 text-center">
          <TrendingUp className="w-4 h-4 text-[#60a5fa] mx-auto mb-1" />
          <span className="text-[10px] text-[#6c8e7e] uppercase font-bold block">Discipline</span>
          <span className="text-base font-extrabold text-white">99.4%</span>
        </div>
      </div>

      {/* Active Groups Preview */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8da99c]">
            Featured Cooperatives
          </h3>
          <button
            onClick={onNavigateToGroups}
            className="text-xs font-semibold text-[#facc15] hover:text-white"
          >
            See all
          </button>
        </div>

        <div className="space-y-2.5">
          {groups.slice(0, 2).map((g) => (
            <div
              key={g.id}
              onClick={onNavigateToGroups}
              className="p-3.5 rounded-xl bg-[#0b2118]/70 border border-[#163828] flex items-center justify-between cursor-pointer hover:border-[#22503a]"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-[#eab308] text-[#06140e] font-extrabold text-xs flex items-center justify-center">
                  {g.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{g.name}</h4>
                  <p className="text-[11px] text-[#8da99c]">{g.membersCount} members &bull; {g.status}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-white block">{formatUGX(g.poolAmount)}</span>
                <span className="text-[10px] text-[#facc15]">Goal: {formatUGX(g.goalAmount)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Ledger Feed */}
      <div className="bg-[#0b2118]/60 border border-[#163828] rounded-2xl p-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#6c8e7e] mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#eab308]" />
          <span>Real-Time Group Savings Ledger</span>
        </h3>
        <div className="space-y-2.5 text-xs">
          <div className="flex items-center justify-between text-gray-300 border-b border-[#143224]/50 pb-2">
            <div>
              <span className="text-white font-semibold">bWAIMA</span>
              <span className="text-[#8da99c] ml-1.5">Contribution recorded</span>
            </div>
            <span className="text-[#86efac] font-bold">+UGX 250,000</span>
          </div>
          <div className="flex items-center justify-between text-gray-300 border-b border-[#143224]/50 pb-2">
            <div>
              <span className="text-white font-semibold">Wadawida Fund</span>
              <span className="text-[#8da99c] ml-1.5">Quota deposited</span>
            </div>
            <span className="text-[#86efac] font-bold">+UGX 130,000</span>
          </div>
          <div className="flex items-center justify-between text-gray-300">
            <div>
              <span className="text-white font-semibold">Kalbu</span>
              <span className="text-[#8da99c] ml-1.5">Payout cycle completed</span>
            </div>
            <span className="text-[#facc15] font-bold">Disbursed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState } from 'react';
import {
  X,
  ShieldCheck,
  Users,
  Calendar,
  Share2,
  Sparkles,
  TrendingUp,
  Check
} from 'lucide-react';
import type { Group } from '../../types';
import { formatUGX, formatShortUGX, calculateFundedPercentage } from '../../utils/formatters';

interface GroupDetailModalProps {
  group: Group | null;
  onClose: () => void;
  onContribute: (groupId: string, amount: number) => void;
}

export const GroupDetailModal: React.FC<GroupDetailModalProps> = ({
  group,
  onClose,
  onContribute,
}) => {
  const [contributionAmount, setContributionAmount] = useState('');
  const [successNotice, setSuccessNotice] = useState(false);
  const [lastDepositedAmt, setLastDepositedAmt] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [copiedInvite, setCopiedInvite] = useState(false);

  if (!group) return null;

  const percentage = calculateFundedPercentage(group.poolAmount, group.goalAmount);

  const handleMakeContribution = (amountToAdd: number) => {
    if (amountToAdd <= 0) return;
    onContribute(group.id, amountToAdd);
    setLastDepositedAmt(amountToAdd);
    setSuccessNotice(true);
    setShowConfetti(true);
    setContributionAmount('');

    setTimeout(() => {
      setShowConfetti(false);
    }, 2800);

    setTimeout(() => {
      setSuccessNotice(false);
    }, 3500);
  };

  const handleShareInvite = () => {
    const text = `Join our savings cooperative on aFRICA Unite: *${group.name}* (Target: ${formatUGX(group.goalAmount)}). Transparent ledger verified: https://africaunite.app/pool/${group.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedInvite(true);
    setTimeout(() => setCopiedInvite(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-md p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#081812] border border-[#163828] rounded-t-3xl sm:rounded-2xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col relative overflow-hidden">
        {/* Floating Confetti / Coin Particles on Deposit */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden flex items-center justify-center">
            {/* Particles */}
            <div className="absolute top-1/4 animate-bounce text-2xl">🪙</div>
            <div className="absolute top-1/3 left-1/4 animate-pulse text-xl">✨</div>
            <div className="absolute top-1/2 right-1/4 animate-bounce text-2xl">💰</div>
            <div className="absolute top-2/3 left-1/3 animate-pulse text-xl">🌟</div>
            <div className="absolute top-1/3 right-1/3 animate-bounce text-lg">🪙</div>
          </div>
        )}

        {/* Header */}
        <div className="sticky top-0 bg-[#081812]/95 backdrop-blur-md px-5 py-4 border-b border-[#143224] flex items-center justify-between z-10">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center text-[#06140e] font-black text-base shadow-md">
              {group.avatar}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight leading-none">
                {group.name}
              </h3>
              <p className="text-[11px] text-[#8ca89b] font-medium mt-1 flex items-center gap-1.5">
                <span className="capitalize">{group.visibility}</span> &bull;
                <span className="capitalize">{group.status}</span> &bull;
                <span>{group.membersCount} members</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShareInvite}
              className="p-2 rounded-xl bg-[#0d261c] border border-[#1a4230] text-gray-300 hover:text-[#25D366] transition-colors"
              title="Share on WhatsApp"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#0d261c] text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Copied Invite Banner */}
        {copiedInvite && (
          <div className="bg-[#10b981] text-[#05130b] text-xs font-bold px-4 py-2 text-center flex items-center justify-center gap-1.5">
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Cooperative invite copied to clipboard for WhatsApp!</span>
          </div>
        )}

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Goal & Pool Progress */}
          <div className="bg-[#0b2118] border border-[#163828] rounded-2xl p-4 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-[#8ca89b] font-semibold flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#facc15]" />
                Pool Funding Progress
              </span>
              <span className="text-[#facc15] font-extrabold text-sm">{percentage}%</span>
            </div>

            {/* Glowing Progress bar */}
            <div className="w-full bg-[#153424] rounded-full h-3 overflow-hidden mb-3 relative">
              <div
                className="bg-gradient-to-r from-[#d97706] via-[#eab308] to-[#facc15] h-full rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(234,179,8,0.7)]"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#6c8e7e]">
                  CURRENT POOL
                </span>
                <span className={`text-lg font-black tracking-tight mt-0.5 block transition-colors ${
                  successNotice ? 'text-[#86efac] scale-105 transition-transform' : 'text-white'
                }`}>
                  {formatUGX(group.poolAmount)}
                </span>
                <span className="text-[11px] text-[#facc15] font-semibold">
                  {formatShortUGX(group.poolAmount)} UGX
                </span>
              </div>
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#6c8e7e]">
                  TARGET GOAL
                </span>
                <span className="text-lg font-black text-white tracking-tight mt-0.5 block">
                  {formatUGX(group.goalAmount)}
                </span>
                <span className="text-[11px] text-[#86efac] font-semibold">
                  {formatShortUGX(group.goalAmount)} UGX
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[#143224]/50 flex items-center justify-between text-xs text-[#8ca89b]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#eab308]" />
                Payout: <strong className="text-gray-200">{group.payoutDate}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                Min Trust: <strong className="text-[#86efac]">{group.minTrustScore}%</strong>
              </span>
            </div>
          </div>

          {/* Quick Contribute Action with Celebration */}
          <div className="bg-[#0b2118] border border-[#163828] rounded-2xl p-4 space-y-3.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#facc15] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulate Group Contribution</span>
              </h4>
              {successNotice && (
                <span className="text-[11px] text-[#86efac] font-bold bg-[#10b981]/20 px-2.5 py-0.5 rounded-full border border-[#10b981]/40 animate-pulse">
                  +UGX {lastDepositedAmt.toLocaleString()} Added!
                </span>
              )}
            </div>

            {/* Quick amount chips */}
            <div className="grid grid-cols-3 gap-2">
              {[50000, 100000, 250000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleMakeContribution(amt)}
                  className="py-2.5 px-2 rounded-xl bg-[#091a13] border border-[#163828] text-xs font-bold text-gray-200 hover:border-[#eab308] hover:text-[#facc15] active:scale-95 transition-all shadow-sm"
                >
                  +{amt.toLocaleString()} UGX
                </button>
              ))}
            </div>

            {/* Custom deposit input */}
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Custom UGX amount"
                value={contributionAmount}
                onChange={(e) => setContributionAmount(e.target.value)}
                className="flex-1 bg-[#091a13] border border-[#163828] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#5a7b6c] focus:outline-none focus:border-[#eab308]"
              />
              <button
                type="button"
                onClick={() => handleMakeContribution(Number(contributionAmount))}
                className="px-5 py-2.5 bg-[#eab308] text-[#06140e] text-xs font-extrabold rounded-xl hover:bg-[#facc15] active:scale-95 transition-all shadow-md shadow-[#eab308]/20"
              >
                Deposit
              </button>
            </div>
          </div>

          {/* Member List & Trust Scores */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6c8e7e] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Verified Members ({group.members?.length || group.membersCount})</span>
              </h4>
              <span className="text-[11px] text-[#facc15] font-semibold">
                Ledger Score
              </span>
            </div>

            <div className="space-y-2">
              {group.members && group.members.length > 0 ? (
                group.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#0b2118]/70 border border-[#143224] hover:border-[#1d4632] transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-[#143527] text-[#facc15] font-extrabold text-xs flex items-center justify-center">
                        {member.avatar}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white leading-tight">
                          {member.name}
                        </div>
                        <div className="text-[10px] text-[#789a8a] capitalize mt-0.5">
                          {member.role} &bull; Trust: <span className="text-[#86efac] font-bold">{member.trustScore}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-white block">
                        {formatUGX(member.contributedAmount)}
                      </span>
                      <span className="text-[10px] text-[#789a8a]">Contributed</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-gray-400 py-3 text-center">
                  {group.membersCount} verified members in pool.
                </div>
              )}
            </div>
          </div>

          {/* Transparent Ledger Activity Feed */}
          <div className="space-y-2 pt-1 pb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6c8e7e]">
              Immutable Ledger Activity
            </h4>
            <div className="space-y-2">
              {group.activities && group.activities.length > 0 ? (
                group.activities.map((act) => (
                  <div
                    key={act.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#0a1c14] border border-[#143224]/70 text-xs"
                  >
                    <div>
                      <span className="text-white font-semibold">{act.user}</span>
                      <span className="text-[#8ba79a] ml-1.5">{act.action}</span>
                    </div>
                    <div className="text-right">
                      {act.amount && (
                        <span className="text-[#86efac] font-extrabold block">
                          +{formatUGX(act.amount)}
                        </span>
                      )}
                      <span className="text-[10px] text-[#6c8e7e]">{act.timestamp}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-[#8ba79a] p-3 text-center bg-[#0a1c14] rounded-lg">
                  No recent ledger actions.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState } from 'react';
import { ArrowRight, Lock, Globe, CheckCircle2, Share2, Clock, ShieldCheck, Check } from 'lucide-react';
import type { Group } from '../../types';
import { formatUGX, formatShortUGX, calculateFundedPercentage } from '../../utils/formatters';

interface GroupCardProps {
  group: Group;
  onOpenGroup: (group: Group) => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({ group, onOpenGroup }) => {
  const [copiedToast, setCopiedToast] = useState(false);
  const percentage = calculateFundedPercentage(group.poolAmount, group.goalAmount);

  // Generate or extract member avatar stack
  const memberInitials = group.members && group.members.length > 0
    ? group.members.map((m) => m.avatar)
    : [group.avatar || 'M1', 'M2'];

  const displayedAvatars = memberInitials.slice(0, 3);
  const remainingCount = Math.max(0, group.membersCount - displayedAvatars.length);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const inviteText = `Join our cooperative pool on aFRICA Unite: *${group.name}* (Target: ${formatUGX(group.goalAmount)}). Transparent ledger verified: https://africaunite.app/pool/${group.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(inviteText);
    }
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2200);
  };

  return (
    <div className="bg-[#0b2118]/90 border border-[#163828] rounded-2xl p-3 sm:p-4 transition-all duration-200 hover:border-[#22503a] hover:shadow-xl hover:shadow-black/50 group relative">
      {/* Toast Notification for Share */}
      {copiedToast && (
        <div className="absolute top-2 right-2 z-20 bg-[#10b981] text-[#04130b] text-[11px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 animate-in fade-in duration-200">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
          <span>Invite link copied for WhatsApp!</span>
        </div>
      )}

      {/* Top row: Avatar + Title/Badges + Actions */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center space-x-3">
          {/* Avatar Monogram */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center text-[#06140e] font-extrabold text-sm shadow-md shadow-[#f59e0b]/20 flex-shrink-0">
            {group.avatar || group.name.slice(0, 2).toUpperCase()}
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-[16px] font-bold text-white tracking-tight leading-tight">
                {group.name}
              </h3>
              {group.visibility === 'private' ? (
                <span className="p-0.5 text-gray-400" title="Private Group">
                  <Lock className="w-3 h-3" />
                </span>
              ) : (
                <span className="p-0.5 text-[#6c8e7e]" title="Public Group">
                  <Globe className="w-3 h-3" />
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2 mt-1">
              {/* Status pill */}
              {group.status === 'active' ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#86efac] bg-[#10b981]/15 px-2 py-0.5 rounded-full border border-[#10b981]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-300 bg-blue-900/30 px-2 py-0.5 rounded-full border border-blue-700/40">
                  <CheckCircle2 className="w-3 h-3 text-blue-400" />
                  Completed
                </span>
              )}

              {/* Type tag */}
              <span className="text-[11px] text-[#8ca89b] font-medium truncate max-w-[120px]">
                {group.groupType.split('(')[0].trim()}
              </span>

              {/* Trust Score Tier */}
              <span className="inline-flex items-center gap-1 text-[10px] text-[#facc15] bg-[#eab308]/10 px-1.5 py-0.5 rounded border border-[#eab308]/25 font-semibold">
                <ShieldCheck className="w-3 h-3 text-[#eab308]" />
                {group.minTrustScore > 0 ? `${group.minTrustScore}% Min` : 'Open'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: WhatsApp Share & Open */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={handleShare}
            className="p-1.5 rounded-lg bg-[#0e271d] border border-[#1a4230] text-gray-300 hover:text-[#25D366] hover:border-[#25D366]/40 transition-colors"
            title="Share invite link via WhatsApp"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onOpenGroup(group)}
            className="flex items-center space-x-1 text-xs font-bold text-[#facc15] hover:text-white transition-colors cursor-pointer py-1.5 px-2.5 rounded-lg bg-[#0e271d] border border-[#1a4230] hover:border-[#facc15]/50 group-hover:bg-[#133827]"
          >
            <span>Open</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Member Avatar Stack & Community Count */}
      <div className="flex items-center justify-between mt-2.5 mb-2 text-xs">
        <div className="flex items-center space-x-2">
          {/* Overlapping member circles */}
          <div className="flex -space-x-1.5 overflow-hidden">
            {displayedAvatars.map((av, idx) => (
              <div
                key={idx}
                className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#163828] border-2 border-[#0b2118] text-[9px] font-bold text-[#facc15]"
              >
                {av}
              </div>
            ))}
            {remainingCount > 0 && (
              <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#112d20] border-2 border-[#0b2118] text-[9px] font-bold text-gray-300">
                +{remainingCount}
              </div>
            )}
          </div>
          <span className="text-[11px] text-[#8ca89b] font-medium">
            {group.membersCount} verified members
          </span>
        </div>

        {/* Shorthand progress indicator */}
        <span className="text-[11px] font-semibold text-[#8ca89b]">
          {formatShortUGX(group.poolAmount)} / {formatShortUGX(group.goalAmount)} UGX
        </span>
      </div>

      {/* Progress Bar with Milestone Ticks */}
      <div className="mt-1.5 mb-3">
        <div className="relative w-full bg-[#122e20] rounded-full h-2.5 overflow-hidden">
          {/* Milestone markers at 25%, 50%, 75% */}
          <div className="absolute inset-0 flex justify-between px-1 pointer-events-none opacity-20">
            <span className="w-0.5 h-full bg-white/40 ml-[25%]"></span>
            <span className="w-0.5 h-full bg-white/40 ml-[25%]"></span>
            <span className="w-0.5 h-full bg-white/40 ml-[25%]"></span>
          </div>

          {/* Active Gradient Bar with Radiant Glow */}
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#d97706] via-[#eab308] to-[#facc15] transition-all duration-700 relative shadow-[0_0_12px_rgba(234,179,8,0.7)]"
            style={{ width: `${percentage}%` }}
          >
            {percentage > 3 && (
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_4px_#fff]"></span>
            )}
          </div>
        </div>
      </div>

      {/* Stats Row with Formatted UGX & Shorthand Badges */}
      <div className="grid grid-cols-2 gap-3 pb-2 border-b border-[#143224]/50">
        <div>
          <div className="flex items-center space-x-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
              POOL
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#eab308]/15 text-[#facc15]">
              {formatShortUGX(group.poolAmount)}
            </span>
          </div>
          <span className="text-[15px] font-bold text-white tracking-tight mt-0.5 block font-sans">
            {formatUGX(group.poolAmount)}
          </span>
        </div>

        <div>
          <div className="flex items-center space-x-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
              GOAL
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#102d1f] text-[#86efac]">
              {formatShortUGX(group.goalAmount)}
            </span>
          </div>
          <span className="text-[15px] font-bold text-white tracking-tight mt-0.5 block font-sans">
            {formatUGX(group.goalAmount)}
          </span>
        </div>
      </div>

      {/* Footer Row: Next Due Countdown & Funded Percentage */}
      <div className="flex items-center justify-between pt-2 text-xs">
        <div className="flex items-center space-x-2 text-[11px]">
          <span className="text-[#8ba79a] font-medium">
            Payout: <strong className="text-gray-200 font-semibold">{group.payoutDate}</strong>
          </span>

          {group.status === 'active' ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#facc15] bg-[#eab308]/15 px-2 py-0.5 rounded-full border border-[#eab308]/30">
              <Clock className="w-3 h-3 text-[#eab308]" />
              Due in 4 days
            </span>
          ) : (
            <span className="text-[10px] text-gray-400 font-medium">
              Cycle Concluded
            </span>
          )}
        </div>

        <span className={`font-bold px-2 py-0.5 rounded-full text-xs ${
          percentage >= 100
            ? 'bg-[#10b981]/20 text-[#86efac] border border-[#10b981]/40'
            : percentage > 0
            ? 'bg-[#eab308]/15 text-[#facc15] border border-[#eab308]/30'
            : 'bg-[#143224] text-gray-400'
        }`}>
          {percentage}% funded
        </span>
      </div>
    </div>
  );
};

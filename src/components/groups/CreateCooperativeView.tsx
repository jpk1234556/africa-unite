import { useState } from 'react';
import { Calendar, ChevronDown, RefreshCw, ArrowLeft } from 'lucide-react';
import type { ApiGroupInput } from '../../services/api';

interface CreateCooperativeViewProps {
  onGroupCreated: (input: ApiGroupInput) => void;
  onCancel?: () => void;
}

export const CreateCooperativeView: React.FC<CreateCooperativeViewProps> = ({
  onGroupCreated,
  onCancel,
}) => {
  const [groupName, setGroupName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [minTrustScore, setMinTrustScore] = useState('0');
  const [groupType, setGroupType] = useState('Fixed-Pot (Equal savings)');
  const [groupMode, setGroupMode] = useState<'Public group' | 'Private group'>('Public group');
  const [payoutDate, setPayoutDate] = useState('Dec 31, 2026');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) {
      setErrorMsg('Please enter a group name');
      return;
    }

    const cleanAmount = parseInt(targetAmount.replace(/[^0-9]/g, ''), 10) || 5000000;
    const cleanTrust = parseInt(minTrustScore, 10) || 0;

    const input: ApiGroupInput = {
      name: groupName.trim(),
      targetAmount: cleanAmount,
      minTrustScore: cleanTrust,
      groupType: groupType,
      visibility: groupMode === 'Public group' ? 'public' : 'private',
      payoutDate: payoutDate,
    };

    onGroupCreated(input);
  };

  return (
    <div className="w-full sm:w-[480px] max-h-[90vh] overflow-y-auto px-4 sm:px-5 py-4 sm:py-6 space-y-4 bg-[#081812]/95 backdrop-blur-md border-t sm:border-t-0 border-[#163828] rounded-t-3xl sm:rounded-2xl shadow-2xl">
      {/* Top Header section matching screenshot */}
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#6c8e7e] block">
            GROUP SAVINGS
          </span>
          <div className="flex items-center space-x-2 mt-0.5">
            {onCancel && (
              <button
                onClick={onCancel}
                className="p-1 -ml-1 text-gray-300 hover:text-white"
                title="Back to groups"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Groups
            </h2>
          </div>
          <p className="text-xs text-[#8ca89b] mt-1 leading-relaxed">
            Cooperative pools, contribution discipline, and group trust stay visible.
          </p>
        </div>

        <button
          type="button"
          className="p-2 text-[#eab308] hover:text-white transition-colors"
          title="Refresh ledger status"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Main "Create cooperative" Card */}
      <div className="bg-[#0b2118]/90 border border-[#163828] rounded-2xl p-4 sm:p-5 shadow-xl">
        <h3 className="text-lg font-bold text-white tracking-tight">
          Create cooperative
        </h3>
        <p className="text-xs text-[#8da99c] mt-1 leading-relaxed">
          Creates a backend group using the same fields as the web terminal.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
            {errorMsg && (
              <div className="text-xs text-red-400 bg-red-950/40 p-2 rounded-lg border border-red-800">
                {errorMsg}
              </div>
            )}

            {/* Group name input */}
            <div>
              <input
                type="text"
                value={groupName}
                onChange={(e) => {
                  setGroupName(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="Group name"
                className="w-full bg-[#081812] border border-[#163828] rounded-xl px-4 py-3 text-sm text-white placeholder-[#6c8e7e] focus:outline-none focus:border-[#eab308]/70 focus:ring-1 focus:ring-[#eab308]/70 transition-colors"
              />
            </div>

            {/* Target amount UGX input */}
            <div>
              <input
                type="text"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="Target amount UGX"
                className="w-full bg-[#081812] border border-[#163828] rounded-xl px-4 py-3 text-sm text-white placeholder-[#6c8e7e] focus:outline-none focus:border-[#eab308]/70 focus:ring-1 focus:ring-[#eab308]/70 transition-colors"
              />
            </div>

            {/* Minimum trust score */}
            <div className="bg-[#081812] border border-[#163828] rounded-xl px-4 py-2.5">
              <label className="block text-[11px] font-medium text-[#6c8e7e]">
                Minimum trust score
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={minTrustScore}
                onChange={(e) => setMinTrustScore(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none mt-0.5"
              />
            </div>

            {/* Group Type Dropdown */}
            <div className="bg-[#081812] border border-[#163828] rounded-xl px-4 py-2.5 relative">
              <label className="block text-[11px] font-medium text-[#6c8e7e]">
                Group Type
              </label>
              <div className="flex items-center justify-between mt-0.5">
                <select
                  value={groupType}
                  onChange={(e) => setGroupType(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none appearance-none cursor-pointer pr-6"
                >
                  <option value="Fixed-Pot (Equal savings)" className="bg-[#081812] text-white">
                    Fixed-Pot (Equal savings)
                  </option>
                  <option value="Rotating Savings (Chama / ROSCA)" className="bg-[#081812] text-white">
                    Rotating Savings (Chama / ROSCA)
                  </option>
                  <option value="Target Goal Savings" className="bg-[#081812] text-white">
                    Target Goal Savings
                  </option>
                  <option value="Emergency Mutual Fund" className="bg-[#081812] text-white">
                    Emergency Mutual Fund
                  </option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 pointer-events-none" />
              </div>
            </div>

            {/* Group mode Dropdown */}
            <div className="bg-[#081812] border border-[#163828] rounded-xl px-4 py-2.5 relative">
              <label className="block text-[11px] font-medium text-[#6c8e7e]">
                Group mode
              </label>
              <div className="flex items-center justify-between mt-0.5">
                <select
                  value={groupMode}
                  onChange={(e) => setGroupMode(e.target.value as any)}
                  className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none appearance-none cursor-pointer pr-6"
                >
                  <option value="Public group" className="bg-[#081812] text-white">
                    Public group
                  </option>
                  <option value="Private group" className="bg-[#081812] text-white">
                    Private group
                  </option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 pointer-events-none" />
              </div>
            </div>

            {/* Choose group payout date button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border border-[#eab308]/40 bg-[#091b13]/60 text-[#facc15] font-semibold text-xs hover:bg-[#0c2419] transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#eab308]" />
                <span>{payoutDate ? `Payout: ${payoutDate}` : 'Choose group payout date'}</span>
              </button>

              {showDatePicker && (
                <div className="mt-2 p-3 bg-[#0a2016] border border-[#1b4330] rounded-xl space-y-2">
                  <label className="text-[11px] text-[#8ea99c]">Select target payout date:</label>
                  <input
                    type="date"
                    onChange={(e) => {
                      if (e.target.value) {
                        const dateObj = new Date(e.target.value);
                        const formatted = dateObj.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        });
                        setPayoutDate(formatted);
                        setShowDatePicker(false);
                      }
                    }}
                    className="w-full bg-[#081711] border border-[#1b4330] rounded-lg px-3 py-2 text-xs text-white"
                  />
                  <div className="flex gap-1.5 pt-1">
                    {['Nov 30, 2026', 'Dec 31, 2026', 'Mar 31, 2027'].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          setPayoutDate(d);
                          setShowDatePicker(false);
                        }}
                        className="text-[10px] px-2 py-1 rounded bg-[#112d20] text-[#facc15] hover:bg-[#183d2c]"
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex items-center gap-3">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 py-3 px-4 rounded-xl border border-[#163828] text-gray-300 font-semibold text-xs hover:bg-[#10271d] transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-xl bg-[#eab308] text-[#06140e] font-extrabold text-xs hover:bg-[#facc15] shadow-lg shadow-[#eab308]/20 transition-all active:scale-[0.98]"
              >
                Create Cooperative Pool
              </button>
            </div>
          </form>
        </div>
    </div>
  );
};

import type React from 'react';
import { useState } from 'react';
import {
  RefreshCw,
  Search,
  Check,
  Globe,
  SlidersHorizontal,
  Plus,
  ShieldCheck,
  X,
  Award
} from 'lucide-react';
import type { Group, GroupTab } from '../../types';
import { GroupCard } from './GroupCard';

interface GroupsScreenProps {
  groups: Group[];
  discoverGroups: Group[];
  onOpenGroup: (group: Group) => void;
  onOpenCreate: () => void;
}

export const GroupsScreen: React.FC<GroupsScreenProps> = ({
  groups,
  discoverGroups,
  onOpenGroup,
  onOpenCreate,
}) => {
  // Groups list state & filter chips (Screenshots 2 & 3)
  const [activeTab, setActiveTab] = useState<GroupTab>('my-groups');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed' | 'fixed-pot'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showTrustModal, setShowTrustModal] = useState(false);

  const displayList = activeTab === 'my-groups' ? groups : discoverGroups;

  // Filter by both search term and chip category
  const filteredGroups = displayList.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.groupType.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter === 'all') return true;
    if (statusFilter === 'active') return g.status === 'active';
    if (statusFilter === 'completed') return g.status === 'completed';
    if (statusFilter === 'fixed-pot') return g.groupType.toLowerCase().includes('fixed');
    return true;
  });

  const activeCount = groups.filter((g) => g.status === 'active').length;
  const completedCount = groups.filter((g) => g.status === 'completed').length;
  const fixedPotCount = groups.filter((g) => g.groupType.toLowerCase().includes('fixed')).length;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="px-4 sm:px-5 py-4 sm:py-6 space-y-6">
      {/* =========================================================================
          SCREENSHOT 1: TOP SECTION (GROUP SAVINGS -> Groups -> Collapsible Create)
          ========================================================================= */}
      <section className="space-y-3.5">
        {/* Title Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            Groups
          </h2>

          <button
            onClick={handleRefresh}
            className="p-1.5 text-[#eab308] hover:text-white transition-colors cursor-pointer"
            title="Refresh groups ledger"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Create cooperative Button */}
        <button
          type="button"
          onClick={onOpenCreate}
          className="w-full py-3.5 px-4 rounded-xl bg-[#eab308] text-[#06140e] font-extrabold text-sm hover:bg-[#facc15] shadow-lg shadow-[#eab308]/20 transition-all flex items-center justify-center space-x-2 active:scale-[0.99] cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Create cooperative</span>
        </button>
      </section>

      {/* =========================================================================
          SCREENSHOT 2 & 3: MIDDLE & BOTTOM SECTION (Tabs -> Stats -> List)
          ========================================================================= */}
      <section className="space-y-4 pt-1">

        {/* Tab Switcher: [✓ My groups] [🌐 Discover] */}
        <div className="flex items-center space-x-2 bg-[#081812] p-1 rounded-full border border-[#143526] w-fit">
          <button
            onClick={() => setActiveTab('my-groups')}
            className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'my-groups'
                ? 'bg-[#eab308] text-[#06140e] shadow-sm'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>My groups</span>
          </button>

          <button
            onClick={() => setActiveTab('discover')}
            className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'discover'
                ? 'bg-[#eab308] text-[#06140e] shadow-sm'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Discover</span>
          </button>
        </div>

        {/* Summary Stats Cards: [ACTIVE: 3] [AVG TRUST: 62%] */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-[#0b2118]/80 border border-[#163828] rounded-xl py-2 px-3">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
              ACTIVE
            </span>
            <span className="text-base sm:text-lg font-bold text-white mt-0.5 block leading-none">
              {activeCount}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowTrustModal(true)}
            className="bg-[#0b2118]/80 border border-[#163828] hover:border-[#eab308]/60 rounded-xl py-2 px-3 text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
                AVG TRUST
              </span>
              <ShieldCheck className="w-3 h-3 text-[#eab308]/80 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-baseline space-x-1 mt-0.5 leading-none">
              <span className="text-base sm:text-lg font-bold text-white leading-none">62%</span>
              <span className="text-[9px] text-[#86efac] font-semibold bg-[#10b981]/15 px-1 rounded">
                Tier 2
              </span>
            </div>
          </button>
        </div>

        {/* Search Bar & Quick Filter Chips */}
        <div className="space-y-2.5">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#eab308] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cooperative groups"
              className="w-full bg-[#0a1e16] border border-[#163828] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#5a7b6c] focus:outline-none focus:border-[#eab308]/60 focus:ring-1 focus:ring-[#eab308]/60 transition-colors"
            />
          </div>

          {/* Quick Filter Chips (All, Active, Completed, Fixed-Pot) */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs select-none">
            <div className="flex items-center text-[#6c8e7e] pr-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </div>

            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === 'all'
                  ? 'bg-[#eab308] text-[#06140e] shadow-sm'
                  : 'bg-[#0b2118]/80 border border-[#163828] text-gray-300 hover:text-white hover:border-[#225039]'
              }`}
            >
              All ({displayList.length})
            </button>

            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === 'active'
                  ? 'bg-[#eab308] text-[#06140e] shadow-sm'
                  : 'bg-[#0b2118]/80 border border-[#163828] text-gray-300 hover:text-white hover:border-[#225039]'
              }`}
            >
              Active ({activeCount})
            </button>

            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === 'completed'
                  ? 'bg-[#eab308] text-[#06140e] shadow-sm'
                  : 'bg-[#0b2118]/80 border border-[#163828] text-gray-300 hover:text-white hover:border-[#225039]'
              }`}
            >
              Completed ({completedCount})
            </button>

            <button
              onClick={() => setStatusFilter('fixed-pot')}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === 'fixed-pot'
                  ? 'bg-[#eab308] text-[#06140e] shadow-sm'
                  : 'bg-[#0b2118]/80 border border-[#163828] text-gray-300 hover:text-white hover:border-[#225039]'
              }`}
            >
              Fixed-Pot ({fixedPotCount})
            </button>
          </div>
        </div>

        {/* Cards List: bWAIMA -> Kalbu -> Wadawida Trust Fund... */}
        <div className="space-y-4 pt-1 pb-8">
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                onOpenGroup={onOpenGroup}
              />
            ))
          ) : (
            <div className="text-center py-8 px-4 rounded-xl border border-dashed border-[#183b2c] bg-[#081711]/50">
              <p className="text-sm text-gray-400">No cooperative groups match this filter.</p>
              <button
                onClick={() => {
                  setStatusFilter('all');
                  setSearchQuery('');
                }}
                className="text-xs text-[#facc15] font-semibold mt-2 hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          TRUST ALGORITHM BREAKDOWN MODAL
          ========================================================================= */}
      {showTrustModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#081812] border border-[#163828] rounded-2xl p-5 shadow-2xl relative space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#143224]">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-[#eab308]/15 border border-[#eab308]/30 text-[#facc15]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight leading-tight">
                    Ledger Trust Score
                  </h3>
                  <span className="text-[11px] text-[#8ca89b]">Consensus Algorithm v2.4</span>
                </div>
              </div>
              <button
                onClick={() => setShowTrustModal(false)}
                className="p-1.5 rounded-full bg-[#0d261c] text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Overall Score Badge */}
            <div className="bg-[#0b2118] border border-[#163828] rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e] block">
                  NETWORK AVG TRUST
                </span>
                <span className="text-3xl font-black text-white mt-0.5 block">62%</span>
                <span className="text-xs text-[#86efac] font-bold flex items-center gap-1 mt-0.5">
                  <Award className="w-3.5 h-3.5" /> Tier 2: Good Standing
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-gray-400 block">Credit Unlocked</span>
                <span className="text-sm font-extrabold text-[#facc15] block">UGX 3,500,000</span>
                <span className="text-[10px] text-[#6c8e7e]">Zero Collateral</span>
              </div>
            </div>

            {/* Algorithmic Scoring Factors */}
            <div className="space-y-2.5 text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6c8e7e] block">
                How Your Trust Score is Calculated:
              </span>

              <div className="p-2.5 rounded-lg bg-[#0a1c14] border border-[#143224] flex items-center justify-between">
                <div>
                  <span className="text-white font-semibold block">Contribution Discipline</span>
                  <span className="text-[10px] text-[#8ca89b]">98.4% timely deposits across 3 cycles</span>
                </div>
                <span className="text-xs font-bold text-[#86efac]">+35 pts</span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0a1c14] border border-[#143224] flex items-center justify-between">
                <div>
                  <span className="text-white font-semibold block">Zero-Default Ledger History</span>
                  <span className="text-[10px] text-[#8ca89b]">0 defaults recorded on live blocks</span>
                </div>
                <span className="text-xs font-bold text-[#86efac]">+20 pts</span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0a1c14] border border-[#143224] flex items-center justify-between">
                <div>
                  <span className="text-white font-semibold block">Cooperative Longevity</span>
                  <span className="text-[10px] text-[#8ca89b]">9 months active membership</span>
                </div>
                <span className="text-xs font-bold text-[#facc15]">+7 pts</span>
              </div>
            </div>

            <button
              onClick={() => setShowTrustModal(false)}
              className="w-full py-2.5 bg-[#eab308] text-[#06140e] text-xs font-bold rounded-xl hover:bg-[#facc15] transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

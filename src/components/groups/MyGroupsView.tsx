import { useState } from 'react';
import { Search, Check, Globe, Plus, RefreshCw } from 'lucide-react';
import type { Group, GroupTab } from '../../types';
import { GroupCard } from './GroupCard';

interface MyGroupsViewProps {
  groups: Group[];
  discoverGroups: Group[];
  onOpenGroup: (group: Group) => void;
  onOpenCreateModal: () => void;
}

export const MyGroupsView: React.FC<MyGroupsViewProps> = ({
  groups,
  discoverGroups,
  onOpenGroup,
  onOpenCreateModal,
}) => {
  const [activeTab, setActiveTab] = useState<GroupTab>('my-groups');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const displayList = activeTab === 'my-groups' ? groups : discoverGroups;
  const filteredGroups = displayList.filter((g) =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.groupType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCount = groups.filter((g) => g.status === 'active').length;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="px-4 sm:px-5 py-4 sm:py-6 space-y-5">
      {/* Header section */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            My groups
          </h2>
          <p className="text-xs text-[#8da99c] mt-1 leading-relaxed">
            Track pool health before requesting or contributing funds.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="p-2 text-[#eab308] hover:text-white transition-colors"
          title="Refresh ledger state"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Segmented Controls + Action */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2 bg-[#091a13] p-1 rounded-full border border-[#143526]">
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

        <button
          onClick={onOpenCreateModal}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-[#112d20] border border-[#23533c] text-xs font-semibold text-[#facc15] hover:bg-[#183d2c] transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New</span>
        </button>
      </div>

      {/* Quick Summary Stats (Matching screenshot) */}
      <div className="grid grid-cols-2 gap-3.5">
        <div className="bg-[#0b2118]/80 border border-[#163828] rounded-xl p-3.5">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-[#6c8e7e]">
            ACTIVE
          </span>
          <span className="text-xl font-bold text-white mt-1 block">
            {activeCount}
          </span>
        </div>

        <div className="bg-[#0b2118]/80 border border-[#163828] rounded-xl p-3.5">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-[#6c8e7e]">
            AVG TRUST
          </span>
          <span className="text-xl font-bold text-white mt-1 block">
            62%
          </span>
        </div>
      </div>

      {/* Search Input (Matching screenshot) */}
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

      {/* Group List */}
      <div className="space-y-4 pt-1 pb-6">
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onOpenGroup={onOpenGroup}
            />
          ))
        ) : (
          <div className="text-center py-10 px-4 rounded-xl border border-dashed border-[#183b2c] bg-[#081711]/50">
            <p className="text-sm text-gray-400">No cooperative groups found.</p>
            <p className="text-xs text-[#6c8e7e] mt-1">Try another search or create a new cooperative pool.</p>
            <button
              onClick={onOpenCreateModal}
              className="mt-4 px-4 py-2 rounded-lg bg-[#eab308] text-[#06140e] text-xs font-bold hover:bg-[#facc15] transition-colors"
            >
              Create Cooperative
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import type { Group } from './types';
import { INITIAL_GROUPS, DISCOVER_GROUPS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeTab } from './components/tabs/HomeTab';
import { LoansTab } from './components/tabs/LoansTab';
import { AssetsTab } from './components/tabs/AssetsTab';
import { GroupsScreen } from './components/groups/GroupsScreen';
import { GroupDetailModal } from './components/groups/GroupDetailModal';
import { CreateCooperativeView } from './components/groups/CreateCooperativeView';
import { api, type ApiGroupInput } from './services/api';

export function App() {
  const [groups, setGroups] = useState<Group[]>(() => {
    const saved = localStorage.getItem('africa_unite_groups');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved groups', e);
      }
    }
    return INITIAL_GROUPS;
  });

  const [discoverGroups] = useState<Group[]>(DISCOVER_GROUPS);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentTab, setCurrentTab] = useState<'home' | 'groups' | 'loans' | 'assets' | 'inbox'>('home');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [tabNotice, setTabNotice] = useState<string | null>(null);

  // Sync groups to localStorage
  useEffect(() => {
    localStorage.setItem('africa_unite_groups', JSON.stringify(groups));
  }, [groups]);

  const handleGroupCreated = async (input: ApiGroupInput) => {
    try {
      const newGroup = await api.createGroup(input);
      setGroups((prev) => [newGroup, ...prev]);
      setIsCreateOpen(false);
    } catch (e) {
      console.error('Failed to create group', e);
    }
  };

  const handleContribute = async (groupId: string, amount: number) => {
    try {
      const updatedGroup = await api.contributeToGroup(groupId, amount);
      if (!updatedGroup) return;

      setGroups((prev) =>
        prev.map((g) => (g.id === groupId ? updatedGroup : g))
      );

      setSelectedGroup((prev) => (prev && prev.id === groupId ? updatedGroup : prev));
    } catch (e) {
      console.error('Failed to contribute', e);
    }
  };

  const handleTabSelect = (tab: 'home' | 'groups' | 'loans' | 'assets' | 'inbox') => {
    setCurrentTab(tab);
    if (tab === 'inbox') {
      const tabName = tab.charAt(0).toUpperCase() + tab.slice(1);
      setTabNotice(`${tabName} module in progress • Live ledger connected`);
      setTimeout(() => {
        setTabNotice(null);
      }, 2500);
    } else {
      setTabNotice(null);
    }
  };

  return (
    <div className="h-screen min-h-[100dvh] bg-[#040d09] flex flex-col justify-between text-gray-100 font-sans selection:bg-[#eab308] selection:text-black overflow-hidden">
      {/* Central Clean App UI Container */}
      <div className="w-full max-w-[500px] mx-auto flex-1 flex flex-col bg-[#06140e] border-x border-[#143224]/50 shadow-2xl min-h-[100dvh] overflow-hidden relative safe-container">
        {/* App Header (Static at top) */}
        <Header
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        />

        {/* Floating Toast Notice for Other Nav Tabs */}
        {tabNotice && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 bg-[#0c2419] border border-[#eab308]/50 text-[#facc15] text-xs font-semibold px-4 py-2 rounded-full shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <span className="w-2 h-2 rounded-full bg-[#eab308] animate-pulse"></span>
            <span>{tabNotice}</span>
          </div>
        )}

        {/* Active Screen View (Only this section scrolls) */}
        <main className="flex-1 overflow-y-auto overscroll-contain scroll-smooth">
          {currentTab === 'home' && (
            <HomeTab
              groups={groups}
              onNavigateToGroups={() => setCurrentTab('groups')}
              onRequestLoan={() => setCurrentTab('loans')}
              onViewAssets={() => setCurrentTab('assets')}
            />
          )}

          {currentTab === 'groups' && (
            <GroupsScreen
              groups={groups}
              discoverGroups={discoverGroups}
              onOpenGroup={(group) => setSelectedGroup(group)}
              onOpenCreate={() => setIsCreateOpen(true)}
            />
          )}

          {currentTab === 'loans' && (
            <LoansTab />
          )}

          {currentTab === 'assets' && (
            <AssetsTab />
          )}

          {currentTab !== 'home' && currentTab !== 'groups' && currentTab !== 'loans' && currentTab !== 'assets' && (
            <div className="p-8 text-center text-gray-400 mt-12 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#102b1e] border border-[#1e4e37] mx-auto flex items-center justify-center text-[#eab308]">
                <span className="text-xl font-bold font-mono">!</span>
              </div>
              <h3 className="text-lg font-bold text-white capitalize">{currentTab} Module</h3>
              <p className="text-xs text-[#8ca89b] max-w-xs mx-auto">
                This institutional terminal view is connected to the live ledger. Use Home, Groups, Loans, or Assets to view current accounts.
              </p>
              <button
                type="button"
                onClick={() => setCurrentTab('home')}
                className="px-4 py-2 bg-[#eab308] text-[#06140e] font-bold rounded-xl text-xs hover:bg-[#facc15] transition-colors cursor-pointer"
              >
                Go to Home
              </button>
            </div>
          )}
        </main>

        {/* Floating Action Button (FAB) */}
        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          aria-label="Create Cooperative"
          className="absolute right-5 bottom-24 z-30 w-12 h-12 rounded-2xl bg-[#eab308] hover:bg-[#facc15] text-[#06140e] flex items-center justify-center shadow-xl shadow-black/60 transition-transform active:scale-95 cursor-pointer border border-[#facc15]/40"
        >
          <Plus className="w-6 h-6 stroke-[3]" />
        </button>

        {/* Static Bottom Navigation (Active links with feedback) */}
        <BottomNav
          currentTab={currentTab}
          onSelectTab={handleTabSelect}
        />
      </div>

      {/* Group Detail Modal */}
      <GroupDetailModal
        group={selectedGroup}
        onClose={() => setSelectedGroup(null)}
        onContribute={handleContribute}
      />

      {/* New Pool / Create Cooperative Modal (bottom sheet on mobile) */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200 overflow-hidden">
          <CreateCooperativeView
            onGroupCreated={handleGroupCreated}
            onCancel={() => setIsCreateOpen(false)}
          />
        </div>
      )}
    </div>
  );
}

export default App;

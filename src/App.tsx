import { useState, useEffect } from 'react';
import type { Group } from './types';
import { INITIAL_GROUPS, DISCOVER_GROUPS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
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
  const [currentTab, setCurrentTab] = useState<'home' | 'groups' | 'loans' | 'assets' | 'inbox'>('groups');
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
    if (tab !== 'groups') {
      const tabName = tab.charAt(0).toUpperCase() + tab.slice(1);
      setTabNotice(`${tabName} module in progress • App currently focused on Groups`);
      setTimeout(() => {
        setTabNotice(null);
      }, 2500);
    } else {
      setTabNotice(null);
    }
  };

  return (
    <div className="h-screen bg-[#040d09] flex flex-col justify-between text-gray-100 font-sans selection:bg-[#eab308] selection:text-black overflow-hidden">
      {/* Central Clean App UI Container */}
      <div className="w-full max-w-xl mx-auto flex-1 flex flex-col bg-[#06140e] border-x border-[#143224]/50 shadow-2xl h-full overflow-hidden relative">
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

        {/* Active Screen View (Only this section scrolls - Dedicated to Groups) */}
        <main className="flex-1 overflow-y-auto overscroll-contain scroll-smooth">
          <GroupsScreen
            groups={groups}
            discoverGroups={discoverGroups}
            onOpenGroup={(group) => setSelectedGroup(group)}
            onOpenCreate={() => setIsCreateOpen(true)}
          />
        </main>

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

      {/* New Pool / Create Cooperative Modal */}
      {isCreateOpen && (
        <CreateCooperativeView
          onGroupCreated={handleGroupCreated}
          onCancel={() => setIsCreateOpen(false)}
        />
      )}
    </div>
  );
}

export default App;

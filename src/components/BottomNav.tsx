import { Home, Users, CreditCard, Briefcase, Mail } from "lucide-react";
import type { MainTab } from "../types";

interface BottomNavProps {
  currentTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const tabs: {
    id: MainTab;
    label: string;
    icon: React.FC<{ className?: string }>;
  }[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "groups", label: "Groups", icon: Users },
    { id: "loans", label: "Loans", icon: CreditCard },
    { id: "assets", label: "Assets", icon: Briefcase },
    { id: "inbox", label: "Inbox", icon: Mail },
  ];

  return (
    <nav className="mx-4 mb-6 safe-bottom rounded-full bg-[#05110b]/90 backdrop-blur-md border border-[#183b2c]/80 select-none z-30 shadow-[0_-12px_30px_rgba(0,0,0,0.9)] shadow-[#eab308]/10">
      <div className="flex items-center justify-around px-2 py-1.5">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;

          if (isActive) {
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className="flex flex-col items-center justify-center py-2 px-4 rounded-full bg-[#eab308] text-[#06140e] transition-all transform active:scale-95 shadow-md shadow-[#eab308]/20"
              >
                <Icon className="w-5 h-5 stroke-[2.4]" />
                <span className="text-[11px] font-bold mt-0.5 tracking-tight">
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
                className="flex flex-col items-center justify-center py-2 px-3 rounded-full text-gray-400 hover:text-gray-200 transition-colors"
            >
              <Icon className="w-5 h-5 stroke-[1.8]" />
              <span className="text-[11px] font-medium mt-1 tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

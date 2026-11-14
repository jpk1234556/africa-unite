import type { Group, GroupActivity } from '../types';

type ApiGroupInput = {
  name: string;
  targetAmount: number;
  minTrustScore: number;
  groupType: string;
  visibility: 'public' | 'private';
  payoutDate: string;
};

const DELAY_MS = 600;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let seedGroups: Group[] = [
  {
    id: 'bwaima-01',
    name: 'bWAIMA',
    avatar: 'BW',
    membersCount: 11,
    status: 'active',
    visibility: 'public',
    poolAmount: 4071694,
    goalAmount: 15000000,
    payoutDate: 'Dec 31, 2026',
    groupType: 'Fixed-Pot (Equal savings)',
    minTrustScore: 50,
    description: 'Community pool for local agri-trade and marketplace bulk purchases.',
    members: [
      { id: 'm1', name: 'Kato Denis (Lead)', avatar: 'KD', role: 'admin', trustScore: 88, contributedAmount: 1200000, joinedDate: 'Jan 2026' },
      { id: 'm2', name: 'Nakato Sarah', avatar: 'NS', role: 'treasurer', trustScore: 79, contributedAmount: 950000, joinedDate: 'Feb 2026' },
      { id: 'm3', name: 'Mugisha Brian', avatar: 'MB', role: 'member', trustScore: 71, contributedAmount: 720000, joinedDate: 'Mar 2026' },
      { id: 'm4', name: 'Namubiru Grace', avatar: 'NG', role: 'member', trustScore: 65, contributedAmount: 601694, joinedDate: 'Apr 2026' },
      { id: 'm5', name: 'Opio Samuel', avatar: 'OS', role: 'member', trustScore: 62, contributedAmount: 600000, joinedDate: 'May 2026' },
    ],
    activities: [
      { id: 'act-1', user: 'Nakato Sarah', action: 'Contributed to pool', amount: 250000, timestamp: '2 hours ago' },
      { id: 'act-2', user: 'Opio Samuel', action: 'Contributed to pool', amount: 150000, timestamp: 'Yesterday' },
      { id: 'act-3', user: 'Kato Denis', action: 'Verified ledger checkpoint', timestamp: '3 days ago' },
    ],
  },
  {
    id: 'kalbu-02',
    name: 'Kalbu',
    avatar: 'KA',
    membersCount: 5,
    status: 'completed',
    visibility: 'public',
    poolAmount: 0,
    goalAmount: 550000,
    payoutDate: 'Nov 6, 2026',
    groupType: 'Fixed-Pot (Equal savings)',
    minTrustScore: 0,
    description: 'Short-term savings round completed successfully with all payouts disbursed.',
    members: [
      { id: 'k1', name: 'Kamau Peter', avatar: 'KP', role: 'admin', trustScore: 92, contributedAmount: 110000, joinedDate: 'Sep 2026' },
      { id: 'k2', name: 'Amina Zainab', avatar: 'AZ', role: 'member', trustScore: 84, contributedAmount: 110000, joinedDate: 'Sep 2026' },
    ],
    activities: [
      { id: 'act-k1', user: 'Ledger Contract', action: 'Full payout disbursed to members', amount: 550000, timestamp: 'Nov 6, 2026' },
    ],
  },
  {
    id: 'wadawida-03',
    name: 'Wadawida Trust F...',
    avatar: 'WA',
    membersCount: 4,
    status: 'active',
    visibility: 'private',
    poolAmount: 760000,
    goalAmount: 5500000,
    payoutDate: 'Mar 31, 2027',
    groupType: 'Fixed-Pot (Equal savings)',
    minTrustScore: 65,
    description: 'Private family trust fund and emergency cooperative savings pool.',
    members: [
      { id: 'w1', name: 'Wanjala Eric', avatar: 'WE', role: 'admin', trustScore: 74, contributedAmount: 300000, joinedDate: 'Oct 2026' },
      { id: 'w2', name: 'Wambui Faith', avatar: 'WF', role: 'treasurer', trustScore: 80, contributedAmount: 260000, joinedDate: 'Oct 2026' },
      { id: 'w3', name: 'Kiprono David', avatar: 'KD', role: 'member', trustScore: 68, contributedAmount: 200000, joinedDate: 'Nov 2026' },
    ],
    activities: [
      { id: 'act-w1', user: 'Wambui Faith', action: 'Deposited monthly quota', amount: 130000, timestamp: '5 hours ago' },
    ],
  },
];

let groups = [...seedGroups];

export const api = {
  async getGroups(): Promise<Group[]> {
    await sleep(DELAY_MS);
    return [...groups];
  },

  async getGroup(id: string): Promise<Group | null> {
    await sleep(DELAY_MS / 2);
    const group = groups.find((g) => g.id === id);
    return group ? { ...group } : null;
  },

  async createGroup(input: ApiGroupInput, creatorName = 'You (Creator)'): Promise<Group> {
    await sleep(DELAY_MS);

    const newGroup: Group = {
      id: `group-${Date.now()}`,
      name: input.name.trim(),
      avatar: input.name.trim().slice(0, 2).toUpperCase(),
      membersCount: 1,
      status: 'active',
      visibility: input.visibility,
      poolAmount: 0,
      goalAmount: input.targetAmount,
      payoutDate: input.payoutDate,
      groupType: input.groupType,
      minTrustScore: input.minTrustScore,
      description: `Newly formed ${input.groupType.toLowerCase()} cooperative.`,
      members: [
        {
          id: `mem-${Date.now()}`,
          name: creatorName,
          avatar: 'ME',
          role: 'admin',
          trustScore: 80,
          contributedAmount: 0,
          joinedDate: 'Today',
        },
      ],
      activities: [
        {
          id: `act-${Date.now()}`,
          user: creatorName,
          action: 'Created cooperative pool',
          timestamp: 'Just now',
        },
      ],
    };

    groups = [newGroup, ...groups];
    return { ...newGroup };
  },

  async contributeToGroup(groupId: string, amount: number, user = 'You'): Promise<Group | null> {
    await sleep(DELAY_MS / 2);

    const idx = groups.findIndex((g) => g.id === groupId);
    if (idx === -1) return null;

    const group = groups[idx];
    const updatedPool = group.poolAmount + amount;
    const updatedActivities: GroupActivity[] = [
      {
        id: `act-${Date.now()}`,
        user,
        action: 'Contributed to pool',
        amount,
        timestamp: 'Just now',
      },
      ...(group.activities || []),
    ];

    const updatedGroup: Group = {
      ...group,
      poolAmount: updatedPool,
      activities: updatedActivities,
    };

    groups[idx] = updatedGroup;
    return { ...updatedGroup };
  },
};

export type { ApiGroupInput };

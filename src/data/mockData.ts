import type { Group } from '../types';

export const INITIAL_GROUPS: Group[] = [
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
    ]
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
      { id: 'act-k1', user: 'Ledger Contract', action: 'Full payout disbursed to members', amount: 550000, timestamp: 'Nov 6, 2026' }
    ]
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
      { id: 'act-w1', user: 'Wambui Faith', action: 'Deposited monthly quota', amount: 130000, timestamp: '5 hours ago' }
    ]
  }
];

export const DISCOVER_GROUPS: Group[] = [
  {
    id: 'kampala-04',
    name: 'Kampala Merchants Guild',
    avatar: 'KM',
    membersCount: 24,
    status: 'active',
    visibility: 'public',
    poolAmount: 12500000,
    goalAmount: 20000000,
    payoutDate: 'Jan 15, 2027',
    groupType: 'Fixed-Pot (Equal savings)',
    minTrustScore: 70,
    description: 'Wholesale cooperative collective for downtown electronics and solar distributors.'
  },
  {
    id: 'nile-agri-05',
    name: 'Nile Agri-Coop Initiative',
    avatar: 'NA',
    membersCount: 18,
    status: 'active',
    visibility: 'public',
    poolAmount: 8900000,
    goalAmount: 10000000,
    payoutDate: 'Feb 28, 2027',
    groupType: 'Target Goal Savings',
    minTrustScore: 40,
    description: 'Seed purchase and grain silo storage collective fund.'
  },
  {
    id: 'jinja-solar-06',
    name: 'Jinja Clean Power Circle',
    avatar: 'JC',
    membersCount: 14,
    status: 'active',
    visibility: 'public',
    poolAmount: 3200000,
    goalAmount: 6000000,
    payoutDate: 'Apr 15, 2027',
    groupType: 'Fixed-Pot (Equal savings)',
    minTrustScore: 55,
    description: 'Shared green energy equipment micro-pool.'
  }
];

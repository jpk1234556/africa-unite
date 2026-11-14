export type GroupStatus = 'active' | 'completed' | 'pending';
export type GroupVisibility = 'public' | 'private';

export interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  role: 'admin' | 'treasurer' | 'member';
  trustScore: number;
  contributedAmount: number;
  joinedDate: string;
}

export interface GroupActivity {
  id: string;
  user: string;
  action: string;
  amount?: number;
  timestamp: string;
}

export interface Group {
  id: string;
  name: string;
  avatar: string;
  membersCount: number;
  status: GroupStatus;
  visibility: GroupVisibility;
  poolAmount: number; // in UGX
  goalAmount: number; // in UGX
  payoutDate: string;
  groupType: string;
  minTrustScore: number;
  description?: string;
  members?: GroupMember[];
  activities?: GroupActivity[];
}

export type MainTab = 'home' | 'groups' | 'loans' | 'assets' | 'inbox';
export type GroupTab = 'my-groups' | 'discover';

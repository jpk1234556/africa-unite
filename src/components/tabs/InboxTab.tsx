import { Bell, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const InboxTab: React.FC = () => {
  const notifications = [
    {
      id: 'n1',
      title: 'Contribution Confirmed',
      desc: 'Nakato Sarah deposited UGX 250,000 into bWAIMA pool.',
      time: '2 hours ago',
      type: 'success',
      icon: CheckCircle2,
      unread: true,
    },
    {
      id: 'n2',
      title: 'Upcoming Payout Milestone',
      desc: 'Kalbu cycle payout was audited and completed on schedule.',
      time: '1 day ago',
      type: 'info',
      icon: Clock,
      unread: false,
    },
    {
      id: 'n3',
      title: 'Trust Score Increase',
      desc: 'Your cooperative discipline score increased by +4% to 88%.',
      time: '3 days ago',
      type: 'score',
      icon: Bell,
      unread: false,
    },
    {
      id: 'n4',
      title: 'Ledger Audit Checkpoint',
      desc: 'Block #849,201 validated with consensus among 8 nodes.',
      time: '5 days ago',
      type: 'ledger',
      icon: AlertCircle,
      unread: false,
    }
  ];

  return (
    <div className="px-4 sm:px-5 py-4 sm:py-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Inbox & Alerts</h2>
          <p className="text-xs text-[#8ca89b] mt-1 leading-relaxed">
            Ledger notices, pool requests, and member contribution alerts.
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#eab308]/20 border border-[#eab308]/40 text-[#facc15] text-[11px] font-bold">
          1 New
        </span>
      </div>

      <div className="space-y-2.5 pt-2">
        {notifications.map((n) => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              className={`p-3.5 rounded-xl border transition-all ${
                n.unread
                  ? 'bg-[#0e271d] border-[#225039]'
                  : 'bg-[#0b2118]/60 border-[#143224]'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg mt-0.5 ${
                  n.unread ? 'bg-[#eab308] text-[#06140e]' : 'bg-[#143224] text-gray-300'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">{n.title}</h4>
                    <span className="text-[10px] text-[#6c8e7e]">{n.time}</span>
                  </div>
                  <p className="text-xs text-[#8da99c] mt-1 leading-relaxed">{n.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

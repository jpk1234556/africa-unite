import { Wifi, Signal, Battery, Download } from 'lucide-react';

export const MobileStatusBar: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-6 safe-top pt-3 pb-2 text-[13px] font-semibold tracking-tight text-gray-200 select-none">
      <div className="flex items-center space-x-2">
        <span>16:35</span>
        <Download className="w-3.5 h-3.5 text-gray-400 stroke-[2.5]" />
      </div>
      <div className="flex items-center space-x-1.5 text-gray-300">
        <span className="text-[10px] tracking-tighter opacity-80">📳</span>
        <Wifi className="w-3.5 h-3.5" />
        <Signal className="w-3.5 h-3.5" />
        <span className="text-[12px] font-medium ml-1">41%</span>
        <div className="relative flex items-center">
          <Battery className="w-4 h-4 fill-gray-200" />
        </div>
      </div>
    </div>
  );
};

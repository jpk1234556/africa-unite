import { Landmark, Layers } from 'lucide-react';

export const AssetsTab: React.FC = () => {
  return (
    <div className="px-5 py-4 space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Cooperative Assets</h2>
        <p className="text-xs text-[#8ca89b] mt-1 leading-relaxed">
          Tangible community reserves, equipment registers, and proof-of-ownership on the ledger.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#0b2118] border border-[#163828] rounded-xl p-3.5">
          <span className="text-[11px] font-bold uppercase text-[#6c8e7e]">TOTAL ASSETS</span>
          <span className="text-lg font-bold text-white block mt-1">UGX 42,000,000</span>
          <span className="text-[10px] text-[#10b981] font-medium">+12% vs last quarter</span>
        </div>
        <div className="bg-[#0b2118] border border-[#163828] rounded-xl p-3.5">
          <span className="text-[11px] font-bold uppercase text-[#6c8e7e]">RESERVE RATIO</span>
          <span className="text-lg font-bold text-[#facc15] block mt-1">142%</span>
          <span className="text-[10px] text-[#8da99c] font-medium">Fully Collateralized</span>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#6c8e7e]">
          Verified Registry Items
        </h3>

        <div className="bg-[#0b2118]/70 border border-[#163828] rounded-xl p-3.5 flex items-start space-x-3">
          <div className="p-2.5 rounded-lg bg-[#143224] text-[#facc15]">
            <Landmark className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">Mukono Cooperative Silo #4</span>
              <span className="text-xs font-bold text-[#facc15]">UGX 28,000,000</span>
            </div>
            <p className="text-xs text-[#8da99c] mt-0.5">Title Deed #UG-MK-9021 verified by District Registrar</p>
            <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded bg-[#10b981]/15 text-[#86efac] font-semibold border border-[#10b981]/30">
              Co-owned by 11 members
            </span>
          </div>
        </div>

        <div className="bg-[#0b2118]/70 border border-[#163828] rounded-xl p-3.5 flex items-start space-x-3">
          <div className="p-2.5 rounded-lg bg-[#143224] text-[#facc15]">
            <Layers className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">Solar Milling Processing Unit</span>
              <span className="text-xs font-bold text-[#facc15]">UGX 14,000,000</span>
            </div>
            <p className="text-xs text-[#8da99c] mt-0.5">Inspected & operational in Jinja branch</p>
            <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded bg-[#10b981]/15 text-[#86efac] font-semibold border border-[#10b981]/30">
              Shared Equipment Pool
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LoansTab: React.FC = () => {
  return (
    <div className="px-5 py-4 space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Cooperative Loans</h2>
        <p className="text-xs text-[#8ca89b] mt-1 leading-relaxed">
          Access low-interest credit backed by your cooperative trust score and peer guarantees.
        </p>
      </div>

      {/* Credit Limit Banner */}
      <div className="bg-[#0b2118] border border-[#163828] rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between text-xs text-[#8da99c]">
          <span>Available Borrowing Capacity</span>
          <span className="text-[#10b981] font-bold">Good Standing</span>
        </div>
        <div className="text-2xl font-black text-white">UGX 3,500,000</div>
        <div className="text-[11px] text-[#6c8e7e]">
          Based on average trust score of 62% across 3 cooperative pools.
        </div>
        <button className="w-full py-2.5 rounded-xl bg-[#eab308] text-[#06140e] text-xs font-bold hover:bg-[#facc15] transition-colors shadow-md">
          Request Micro-Loan
        </button>
      </div>

      {/* Loan Opportunities */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#6c8e7e]">
          Active & Offered Loan Programs
        </h3>

        <div className="bg-[#0b2118]/70 border border-[#163828] rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">Agri-Input Working Capital</span>
            <span className="text-xs font-semibold text-[#86efac]">2.5% Flat / Month</span>
          </div>
          <p className="text-xs text-[#8da99c]">
            Zero-collateral fertilizer and seed financing for verified farm cooperative members.
          </p>
          <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
            <span>Repayment: 90 Days</span>
            <span className="text-[#facc15]">Instant Disbursal</span>
          </div>
        </div>

        <div className="bg-[#0b2118]/70 border border-[#163828] rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">Market Stall Emergency Advance</span>
            <span className="text-xs font-semibold text-[#86efac]">1.8% Flat</span>
          </div>
          <p className="text-xs text-[#8da99c]">
            Guaranteed by 3 peers within bWAIMA cooperative pool.
          </p>
          <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
            <span>Repayment: 30 Days</span>
            <span className="text-[#facc15]">Pre-Approved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

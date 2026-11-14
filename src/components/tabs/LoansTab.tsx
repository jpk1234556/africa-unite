import { useState } from 'react';
import {
  Calendar,
  Hourglass,
  Users,
  Check,
  ChevronDown,
  CreditCard,
  Store,
  Landmark,
  Send,
} from 'lucide-react';

export const LoansTab: React.FC = () => {
  // Loan Request Form State
  const [requestType, setRequestType] = useState<'direct' | 'fundraised'>('direct');
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [loanPurpose, setLoanPurpose] = useState<string>('Agricultural Input');
  const [dueDate, setDueDate] = useState<string>('');
  const [cutoffDate, setCutoffDate] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showCutoffPicker, setShowCutoffPicker] = useState<boolean>(false);
  const [submittedNotice, setSubmittedNotice] = useState<string | null>(null);

  // Main Section Toggle: Marketplace vs My loans
  const [mainView, setMainView] = useState<'marketplace' | 'my-loans'>('marketplace');

  // Sub-toggle inside Marketplace: Normal vs Fundraise
  const [marketplaceSubTab, setMarketplaceSubTab] = useState<'normal' | 'fundraise'>('normal');

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const amountVal = parseFloat(loanAmount.replace(/,/g, ''));
    if (!amountVal || amountVal <= 0) {
      setSubmittedNotice('Please enter a valid loan amount');
      setTimeout(() => setSubmittedNotice(null), 2500);
      return;
    }

    setSubmittedNotice(`Loan request for UGX ${amountVal.toLocaleString()} submitted to ledger`);
    setLoanAmount('');
    setTimeout(() => setSubmittedNotice(null), 3000);
  };

  return (
    <div className="px-4 sm:px-5 py-4 space-y-4 pb-28">
      {/* Toast Notification */}
      {submittedNotice && (
        <div className="sticky top-2 z-40 bg-[#0c2419] border border-[#eab308]/60 text-[#facc15] text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in duration-200">
          <Check className="w-4 h-4 text-[#10b981] flex-shrink-0" />
          <span>{submittedNotice}</span>
        </div>
      )}

      {/* 1. Header: LOAN EXCHANGE / Loans */}
      <div className="pt-1">
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#6c8e7e] block">
          LOAN EXCHANGE
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none mt-1 font-sans">
          Loans
        </h2>
        <p className="text-xs text-[#8ca89b] mt-1.5 leading-relaxed">
          Direct lending, fundraised loans, trust pricing, and repayment discipline. Group emergency funds are requested separately from a group.
        </p>
      </div>

      {/* 2. Trust State Card */}
      <div className="bg-[#081d14]/90 border border-[#143224] rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20">
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
          Trust state
        </h3>
        <p className="text-xs text-[#8ca89b] mt-0.5 mb-3">
          Rates and limits are shown only after the ledger responds.
        </p>

        <div className="grid grid-cols-2 gap-2.5">
          {/* SESSION */}
          <div className="bg-[#05150e]/95 border border-[#143224] rounded-xl p-3">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
              SESSION
            </span>
            <span className="block text-sm sm:text-base font-bold text-[#10b981] mt-1 font-sans">
              Secure
            </span>
          </div>

          {/* SYNC */}
          <div className="bg-[#05150e]/95 border border-[#143224] rounded-xl p-3">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
              SYNC
            </span>
            <span className="block text-sm sm:text-base font-bold text-white mt-1 font-sans">
              Synced 11:20
            </span>
          </div>
        </div>
      </div>

      {/* 3. Request Loan Card */}
      <div className="bg-[#081d14]/90 border border-[#143224] rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20 space-y-3.5">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Request loan
          </h3>
          <p className="text-xs text-[#8ca89b] mt-0.5">
            Use one repayment due date. Funding cutoff is included for all loan requests.
          </p>
        </div>

        {/* Toggle Pill: Direct vs Fundraised */}
        <div className="border border-[#143224] rounded-full p-1 bg-[#05150e] flex items-center select-none">
          <button
            type="button"
            onClick={() => setRequestType('direct')}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              requestType === 'direct'
                ? 'bg-[#eab308] text-[#06140e] shadow-sm'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {requestType === 'direct' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            <span>Direct</span>
          </button>

          <button
            type="button"
            onClick={() => setRequestType('fundraised')}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              requestType === 'fundraised'
                ? 'bg-[#eab308] text-[#06140e] shadow-sm'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {requestType === 'fundraised' ? (
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            ) : (
              <Users className="w-3.5 h-3.5" />
            )}
            <span>Fundraised</span>
          </button>
        </div>

        {/* Contextual Description */}
        <p className="text-xs text-[#8ca89b] leading-relaxed">
          {requestType === 'direct'
            ? 'Direct loans are funded in full by one lender or group pool.'
            : 'Fundraised loans aggregate contributions from multiple lenders or group members.'}
        </p>

        {/* Input: Amount (UGX) */}
        <div>
          <input
            type="text"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Amount (UGX)"
            className="w-full bg-[#05150e] border border-[#143224] focus:border-[#eab308] text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors font-sans"
          />
        </div>

        {/* Dropdown: Purpose */}
        <div>
          <span className="block text-xs text-[#6c8e7e] font-semibold mb-1">
            Purpose
          </span>
          <div className="relative">
            <select
              value={loanPurpose}
              onChange={(e) => setLoanPurpose(e.target.value)}
              className="w-full bg-[#05150e] border border-[#143224] focus:border-[#eab308] text-white rounded-xl px-4 py-3 text-sm outline-none appearance-none cursor-pointer pr-10 font-sans"
            >
              <option value="Agricultural Input">Agricultural Input</option>
              <option value="Trade & Working Capital">Trade &amp; Working Capital</option>
              <option value="Equipment & Machinery">Equipment &amp; Machinery</option>
              <option value="School & Education Fees">School &amp; Education Fees</option>
              <option value="Emergency Healthcare">Emergency Healthcare</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Choose Repayment Due Date */}
        <div>
          <button
            type="button"
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="w-full bg-[#05150e] border border-[#143224] hover:border-[#eab308]/60 text-[#eab308] font-bold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Calendar className="w-4 h-4 text-[#eab308]" />
            <span>{dueDate ? `Due: ${dueDate}` : 'Choose repayment due date'}</span>
          </button>
          {showDatePicker && (
            <div className="mt-2 p-3 bg-[#05150e] border border-[#143224] rounded-xl flex items-center gap-2">
              <input
                type="date"
                onChange={(e) => {
                  setDueDate(e.target.value);
                  setShowDatePicker(false);
                }}
                className="bg-[#0a2318] border border-[#1d4634] text-white text-xs p-2 rounded-lg flex-1 outline-none"
              />
            </div>
          )}
        </div>

        {/* Choose Funding Cutoff */}
        <div>
          <button
            type="button"
            onClick={() => setShowCutoffPicker(!showCutoffPicker)}
            className="w-full bg-[#05150e] border border-[#143224] hover:border-[#eab308]/60 text-[#eab308] font-bold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Hourglass className="w-4 h-4 text-[#eab308]" />
            <span>{cutoffDate ? `Cutoff: ${cutoffDate}` : 'Choose funding cutoff'}</span>
          </button>
          {showCutoffPicker && (
            <div className="mt-2 p-3 bg-[#05150e] border border-[#143224] rounded-xl flex items-center gap-2">
              <input
                type="date"
                onChange={(e) => {
                  setCutoffDate(e.target.value);
                  setShowCutoffPicker(false);
                }}
                className="bg-[#0a2318] border border-[#1d4634] text-white text-xs p-2 rounded-lg flex-1 outline-none"
              />
            </div>
          )}
        </div>

        {/* Submit Request Button */}
        <button
          type="button"
          onClick={handleSubmitRequest}
          className="w-full bg-[#eab308] hover:bg-[#facc15] text-[#06140e] font-extrabold text-sm sm:text-base py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors uppercase tracking-wider shadow-md shadow-[#eab308]/20 cursor-pointer"
        >
          <Send className="w-4 h-4 fill-current rotate-45 -mt-0.5" />
          <span>Submit request</span>
        </button>
      </div>

      {/* 4. Personalized Rate Card */}
      <div className="bg-[#081d14]/90 border border-[#143224] rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20">
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
          Personalized rate
        </h3>
        <p className="text-xs text-[#8ca89b] mt-0.5 mb-3">
          Trust score and purpose shape borrowing cost.
        </p>

        <div className="grid grid-cols-2 gap-2.5">
          {/* TRUST */}
          <div className="bg-[#05150e]/95 border border-[#143224] rounded-xl p-3">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
              TRUST
            </span>
            <span className="block text-base sm:text-lg font-bold text-white mt-1 font-sans">
              72
            </span>
          </div>

          {/* APR */}
          <div className="bg-[#05150e]/95 border border-[#143224] rounded-xl p-3">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
              APR
            </span>
            <span className="block text-base sm:text-lg font-bold text-[#eab308] mt-1 font-sans">
              9.1%
            </span>
          </div>
        </div>

        <p className="text-xs text-[#6c8e7e] mt-3">
          Your personalized rate for a 100,000 loan.
        </p>
      </div>

      {/* 5. Main Toggle: Marketplace vs My loans */}
      <div className="border border-[#143224] rounded-full p-1 bg-[#05150e] flex items-center select-none shadow-sm">
        <button
          type="button"
          onClick={() => setMainView('marketplace')}
          className={`flex-1 py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            mainView === 'marketplace'
              ? 'bg-[#eab308] text-[#06140e] shadow-sm'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          {mainView === 'marketplace' ? (
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          ) : (
            <Store className="w-3.5 h-3.5" />
          )}
          <span>Marketplace</span>
        </button>

        <button
          type="button"
          onClick={() => setMainView('my-loans')}
          className={`flex-1 py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            mainView === 'my-loans'
              ? 'bg-[#eab308] text-[#06140e] shadow-sm'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          {mainView === 'my-loans' ? (
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          ) : (
            <CreditCard className="w-3.5 h-3.5" />
          )}
          <span>My loans</span>
        </button>
      </div>

      {/* 6. View: Loan Marketplace */}
      {mainView === 'marketplace' && (
        <div className="bg-[#081d14]/90 border border-[#143224] rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20 space-y-3.5">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Loan marketplace
            </h3>
            <p className="text-xs text-[#8ca89b] mt-0.5">
              Open productive credit contracts from the backend. Informed intelligence for peer lending.
            </p>
          </div>

          {/* Sub-toggle: Normal Loans vs Fundraise Loans */}
          <div className="border border-[#143224] rounded-full p-1 bg-[#05150e] flex items-center select-none">
            <button
              type="button"
              onClick={() => setMarketplaceSubTab('normal')}
              className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                marketplaceSubTab === 'normal'
                  ? 'bg-[#eab308] text-[#06140e] shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {marketplaceSubTab === 'normal' ? (
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              ) : (
                <Landmark className="w-3.5 h-3.5" />
              )}
              <span>Normal Loans</span>
            </button>

            <button
              type="button"
              onClick={() => setMarketplaceSubTab('fundraise')}
              className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                marketplaceSubTab === 'fundraise'
                  ? 'bg-[#eab308] text-[#06140e] shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {marketplaceSubTab === 'fundraise' ? (
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              ) : (
                <Users className="w-3.5 h-3.5" />
              )}
              <span>Fundraise Loans</span>
            </button>
          </div>

          {/* Sub-tab 1: Normal Loans Table */}
          {marketplaceSubTab === 'normal' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-[#143224] text-[#6c8e7e] uppercase text-[10px] tracking-wider">
                    <th className="py-2 pr-2 font-bold">ID</th>
                    <th className="py-2 px-2 font-bold">Trust</th>
                    <th className="py-2 px-2 font-bold">Amount</th>
                    <th className="py-2 px-2 font-bold text-right">Rate</th>
                    <th className="py-2 pl-2 font-bold text-right">Return</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#143224]/50">
                  <tr className="hover:bg-[#0b271b]/50 transition-colors cursor-pointer">
                    <td className="py-3 pr-2 text-white font-bold">#24</td>
                    <td className="py-3 px-2 text-gray-300">0</td>
                    <td className="py-3 px-2 text-white font-semibold whitespace-nowrap">
                      UGX 4,500,000.00
                    </td>
                    <td className="py-3 px-2 text-[#eab308] font-bold text-right">
                      10.3%
                    </td>
                    <td className="py-3 pl-2 text-[#22c55e] font-bold text-right whitespace-nowrap">
                      UGX 463,500.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Sub-tab 2: Fundraise Loans Empty State */}
          {marketplaceSubTab === 'fundraise' && (
            <div className="py-8 text-center text-[#6c8e7e] text-xs">
              <p>No open loans are currently returned by the backend.</p>
            </div>
          )}
        </div>
      )}

      {/* 7. View: My Loans Active Obligations */}
      {mainView === 'my-loans' && (
        <div className="bg-[#081d14]/90 border border-[#143224] rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20 space-y-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              My active obligations
            </h3>
            <p className="text-xs text-[#8ca89b] mt-0.5">
              Repayments are approved with your account password.
            </p>
          </div>

          <div className="py-8 text-center text-[#6c8e7e] text-xs">
            <p>You have no active loans returned by the backend.</p>
          </div>
        </div>
      )}
    </div>
  );
};

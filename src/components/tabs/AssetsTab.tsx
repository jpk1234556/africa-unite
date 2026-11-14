import { useState } from 'react';
import {
  RotateCw,
  Check,
  Package,
  ShoppingBag,
  FileText,
  Store,
  Laptop,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  declaredValue: number;
  source: 'manual' | 'verified';
  quality: string;
  qualityLevel: string;
  estCollateral: number;
  status: string;
  resaleDemand: string;
  isOwned?: boolean;
}

const INITIAL_ASSETS: Asset[] = [
  {
    id: 'asset-01',
    name: 'Laptop',
    declaredValue: 580000,
    source: 'manual',
    quality: '46/100',
    qualityLevel: 'Low',
    estCollateral: 580000,
    status: 'available',
    resaleDemand: 'active',
    isOwned: false,
  },
];

export const AssetsTab: React.FC = () => {
  // Registration Form State
  const [assetName, setAssetName] = useState('');
  const [productivityValue, setProductivityValue] = useState('');
  const [declaredValue, setDeclaredValue] = useState('');
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [ownedCount, setOwnedCount] = useState<number>(1);
  const [notice, setNotice] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [expandedAssetId, setExpandedAssetId] = useState<string | null>(null);

  // Toggles
  const [ownershipFilter, setOwnershipFilter] = useState<'market' | 'mine'>('market');
  const [exchangeTab, setExchangeTab] = useState<'marketplace' | 'debt'>('marketplace');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setNotice('Assets state synced with live ledger');
      setTimeout(() => setNotice(null), 2500);
    }, 600);
  };

  const handleRegisterAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetName.trim()) {
      setNotice('Please enter an asset name');
      setTimeout(() => setNotice(null), 2500);
      return;
    }

    const valueNum = parseFloat(declaredValue.replace(/,/g, '')) || 0;

    const newAsset: Asset = {
      id: `asset-${Date.now()}`,
      name: assetName.toUpperCase(),
      declaredValue: valueNum,
      source: 'manual',
      quality: productivityValue ? `${productivityValue}/100` : '60/100',
      qualityLevel: 'Medium',
      estCollateral: valueNum,
      status: 'available',
      resaleDemand: 'active',
      isOwned: true,
    };

    setAssets((prev) => [newAsset, ...prev]);
    setOwnedCount((prev) => prev + 1);
    setAssetName('');
    setProductivityValue('');
    setDeclaredValue('');

    setNotice(`Asset ${newAsset.name} registered successfully`);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleBuyAsset = (asset: Asset) => {
    setNotice(`Purchase order for ${asset.name} initiated on ledger`);
    setTimeout(() => setNotice(null), 3000);
  };

  const displayedAssets =
    ownershipFilter === 'mine' ? assets.filter((a) => a.isOwned) : assets;

  return (
    <div className="px-4 sm:px-5 py-4 space-y-4 pb-28">
      {/* Toast Notice */}
      {notice && (
        <div className="sticky top-2 z-40 bg-[#0c2419] border border-[#eab308]/60 text-[#facc15] text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in duration-200">
          <Check className="w-4 h-4 text-[#10b981] flex-shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* 1. Header: Assets */}
      <div className="flex items-center justify-between pt-1">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
          Assets
        </h2>

        <button
          type="button"
          onClick={handleRefresh}
          aria-label="Refresh Assets"
          className="p-2 rounded-full hover:bg-[#122e20] text-[#eab308] transition-colors cursor-pointer"
        >
          <RotateCw
            className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`}
          />
        </button>
      </div>

      {/* 2. Register Asset Button & Expandable Content */}
      <div>
        <button
          type="button"
          onClick={() => setShowRegisterForm(!showRegisterForm)}
          className="w-full py-3.5 px-4 rounded-xl bg-[#eab308] hover:bg-[#facc15] text-[#06140e] font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 uppercase tracking-wider transition-colors shadow-md shadow-[#eab308]/20 cursor-pointer"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span>REGISTER ASSET</span>
        </button>

        {showRegisterForm && (
          <div className="mt-3 bg-[#081d14]/90 border border-[#143224] rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Register assets
                </h3>
                <p className="text-xs text-[#8ca89b] mt-0.5">
                  Add productive collateral to the backend ledger.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowRegisterForm(false)}
                className="text-gray-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                handleRegisterAsset(e);
                setShowRegisterForm(false);
              }}
              className="space-y-2.5 pt-1"
            >
              <input
                type="text"
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                placeholder="Asset name"
                className="w-full bg-[#05150e] border border-[#143224] focus:border-[#eab308] text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors font-sans"
              />

              <input
                type="text"
                value={productivityValue}
                onChange={(e) => setProductivityValue(e.target.value)}
                placeholder="Productivity value"
                className="w-full bg-[#05150e] border border-[#143224] focus:border-[#eab308] text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors font-sans"
              />

              <input
                type="text"
                value={declaredValue}
                onChange={(e) => setDeclaredValue(e.target.value)}
                placeholder="Declared value UGX"
                className="w-full bg-[#05150e] border border-[#143224] focus:border-[#eab308] text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors font-sans"
              />

              <button
                type="submit"
                className="w-full bg-[#eab308] hover:bg-[#facc15] text-[#06140e] font-extrabold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors uppercase tracking-wider shadow-md shadow-[#eab308]/20 cursor-pointer"
              >
                <Store className="w-4 h-4" />
                <span>Submit registration</span>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* 3. Productive Asset Marketplace Card */}
      <div className="bg-[#081d14]/90 border border-[#143224] rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20 space-y-3.5">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Productive asset marketplace
          </h3>
          <p className="text-xs text-[#8ca89b] mt-0.5">
            Physical assets and loan notes live in one capital surface.
          </p>
        </div>

        {/* Ownership Toggle: Market vs Mine */}
        <div className="border border-[#143224] rounded-full p-1 bg-[#05150e] flex items-center select-none">
          <button
            type="button"
            onClick={() => setOwnershipFilter('market')}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              ownershipFilter === 'market'
                ? 'bg-[#eab308] text-[#06140e] shadow-sm'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {ownershipFilter === 'market' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            <span>Market</span>
          </button>

          <button
            type="button"
            onClick={() => setOwnershipFilter('mine')}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              ownershipFilter === 'mine'
                ? 'bg-[#eab308] text-[#06140e] shadow-sm'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {ownershipFilter === 'mine' ? (
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            ) : (
              <Package className="w-3.5 h-3.5" />
            )}
            <span>Mine</span>
          </button>
        </div>

        {/* Owned & Collateral Stats */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-[#05150e]/95 border border-[#143224] rounded-xl p-3">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
              OWNED
            </span>
            <span className="block text-base sm:text-lg font-bold text-white mt-1 font-sans">
              {ownedCount}
            </span>
          </div>

          <div className="bg-[#05150e]/95 border border-[#143224] rounded-xl p-3">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
              COLLATERAL
            </span>
            <span className="block text-base sm:text-lg font-bold text-white mt-1 font-sans">
              UGX 0.00
            </span>
          </div>
        </div>

        {/* Exchange Toggle: Asset Marketplace vs Secondary Debt Exchange */}
        <div className="border border-[#143224] rounded-full p-1 bg-[#05150e] flex items-center select-none">
          <button
            type="button"
            onClick={() => setExchangeTab('marketplace')}
            className={`flex-1 py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              exchangeTab === 'marketplace'
                ? 'bg-[#eab308] text-[#06140e] shadow-sm'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {exchangeTab === 'marketplace' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            <span>Asset Marketplace</span>
          </button>

          <button
            type="button"
            onClick={() => setExchangeTab('debt')}
            className={`flex-1 py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              exchangeTab === 'debt'
                ? 'bg-[#eab308] text-[#06140e] shadow-sm'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {exchangeTab === 'debt' ? (
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            ) : (
              <FileText className="w-3.5 h-3.5" />
            )}
            <span>Secondary Debt Exchange</span>
          </button>
        </div>

        {/* 4. Sub-view A: Asset Marketplace Items */}
        {exchangeTab === 'marketplace' && (
          <div className="space-y-3 pt-1">
            {displayedAssets.length > 0 ? (
              displayedAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="bg-[#05150e]/95 border border-[#143224] rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm"
                >
                  {/* Top: Avatar Icon + Category + Name + Value */}
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-[#112d20] border border-[#1f4e38] flex items-center justify-center text-[#eab308] flex-shrink-0">
                      <Laptop className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
                        PRODUCTIVE ASSET
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
                        {asset.name}
                      </h4>
                      <p className="text-xs text-[#8ca89b] mt-0.5">
                        UGX {asset.declaredValue.toLocaleString('en-US', { minimumFractionDigits: 2 })} | {asset.source}
                      </p>
                    </div>
                  </div>

                  {/* 2x2 Grid: Quality, Est. Collateral, Status, Resale Demand */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {/* ASSET QUALITY */}
                    <div className="bg-[#030d08] border border-[#122e20] rounded-xl p-3">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
                        ASSET QUALITY
                      </span>
                      <div className="flex items-baseline space-x-1 mt-1">
                        <span className="text-sm sm:text-base font-bold text-white">
                          {asset.quality}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#facc15] font-semibold block mt-0.5">
                        {asset.qualityLevel}
                      </span>
                    </div>

                    {/* EST. COLLATERAL */}
                    <div className="bg-[#030d08] border border-[#122e20] rounded-xl p-3">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
                        EST. COLLATERAL
                      </span>
                      <span className="block text-sm sm:text-base font-bold text-white mt-1 font-sans">
                        UGX {asset.estCollateral.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    {/* STATUS */}
                    <div className="bg-[#030d08] border border-[#122e20] rounded-xl p-3">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
                        STATUS
                      </span>
                      <span className="block text-sm sm:text-base font-bold text-white mt-1 font-sans capitalize">
                        {asset.status}
                      </span>
                    </div>

                    {/* RESALE DEMAND */}
                    <div className="bg-[#030d08] border border-[#122e20] rounded-xl p-3">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
                        RESALE DEMAND
                      </span>
                      <span className="block text-sm sm:text-base font-bold text-white mt-1 font-sans capitalize">
                        {asset.resaleDemand}
                      </span>
                    </div>
                  </div>

                  {/* Buy Asset Button */}
                  <button
                    type="button"
                    onClick={() => handleBuyAsset(asset)}
                    className="w-full bg-[#eab308] hover:bg-[#facc15] text-[#06140e] font-extrabold text-sm sm:text-base py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors uppercase tracking-wider shadow-md shadow-[#eab308]/20 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Buy asset</span>
                  </button>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-[#6c8e7e] text-xs">
                <p>No assets found in this view.</p>
              </div>
            )}
          </div>
        )}

        {/* 5. Sub-view B: Secondary Debt Exchange */}
        {exchangeTab === 'debt' && (
          <div className="bg-[#05150e]/95 border border-[#143224] rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-sm">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Secondary debt exchange
              </h4>
              <p className="text-xs text-[#8ca89b] mt-0.5 leading-relaxed">
                Loan market should protect liquidity before expanding
              </p>
            </div>

            {/* 6 Metric Boxes in 2 Columns */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* ACTIVE NOTES */}
              <div className="bg-[#030d08] border border-[#122e20] rounded-xl p-3">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
                  ACTIVE NOTES
                </span>
                <span className="block text-base sm:text-lg font-bold text-white mt-1 font-sans">
                  2
                </span>
              </div>

              {/* EXPOSURE */}
              <div className="bg-[#030d08] border border-[#122e20] rounded-xl p-3">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
                  EXPOSURE
                </span>
                <span className="block text-sm sm:text-base font-bold text-white mt-1 font-sans">
                  UGX 593,109
                </span>
              </div>

              {/* INTEREST PRESSURE */}
              <div className="bg-[#030d08] border border-[#122e20] rounded-xl p-3">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
                  INTEREST PRESSURE
                </span>
                <span className="block text-sm sm:text-base font-bold text-white mt-1 font-sans capitalize">
                  medium
                </span>
              </div>

              {/* REPAYMENT TREND */}
              <div className="bg-[#030d08] border border-[#122e20] rounded-xl p-3">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
                  REPAYMENT TREND
                </span>
                <span className="block text-xs sm:text-sm font-bold text-white mt-1 leading-snug">
                  73.6% repaid across tracked loans
                </span>
              </div>

              {/* LIQUIDITY PRESSURE */}
              <div className="bg-[#030d08] border border-[#122e20] rounded-xl p-3">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
                  LIQUIDITY PRESSURE
                </span>
                <span className="block text-xs sm:text-sm font-bold text-white mt-1 leading-snug">
                  100% pool-to-active-exposure coverage
                </span>
              </div>

              {/* GROUP ACTIVITY */}
              <div className="bg-[#030d08] border border-[#122e20] rounded-xl p-3">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c8e7e]">
                  GROUP ACTIVITY
                </span>
                <span className="block text-xs sm:text-sm font-bold text-white mt-1 leading-snug">
                  1 new loan requests in the last 7 days
                </span>
              </div>
            </div>

            {/* Note box at bottom */}
            <div className="bg-[#030d08] border border-[#122e20] rounded-xl p-4 text-center text-xs text-[#6c8e7e] mt-2">
              <p>No loan notes are currently available for purchase from the exchange.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

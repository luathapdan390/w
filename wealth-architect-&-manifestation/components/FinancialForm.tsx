import React, { useCallback } from 'react';

interface FinancialFormProps {
  amount: string;
  setAmount: (val: string) => void;
  years: number;
  setYears: (val: number) => void;
  rate: number;
  setRate: (val: number) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const FinancialForm: React.FC<FinancialFormProps> = ({
  amount,
  setAmount,
  years,
  setYears,
  rate,
  setRate,
  onGenerate,
  isGenerating,
}) => {
  // Format display with commas
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-digits
    const rawValue = e.target.value.replace(/\D/g, '');
    if (!rawValue) {
      setAmount('');
      return;
    }
    // Format with commas
    const formatted = parseInt(rawValue, 10).toLocaleString('en-US');
    setAmount(formatted);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
      <h2 className="text-2xl font-semibold text-amber-400 mb-6 serif">Thiết Lập Mục Tiêu</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Amount Input */}
        <div className="flex flex-col space-y-2">
          <label className="text-slate-300 text-sm font-medium">Số tiền mục tiêu (VND)</label>
          <div className="relative">
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="16,800,000,000"
              className="w-full bg-slate-900 border border-slate-600 rounded-lg py-3 px-4 text-white text-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all placeholder-slate-600 font-mono"
            />
            <span className="absolute right-4 top-3.5 text-slate-500 text-sm font-bold">VND</span>
          </div>
        </div>

        {/* Years Input */}
        <div className="flex flex-col space-y-2">
          <label className="text-slate-300 text-sm font-medium">Thời gian (Năm)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            min={1}
            max={100}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg py-3 px-4 text-white text-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all font-mono"
          />
        </div>

        {/* Rate Input */}
        <div className="flex flex-col space-y-2">
          <label className="text-slate-300 text-sm font-medium">Lãi suất kép (%/năm)</label>
          <div className="relative">
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              min={0}
              step={0.1}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg py-3 px-4 text-white text-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all font-mono"
            />
            <span className="absolute right-4 top-3.5 text-slate-500 text-sm font-bold">%</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={onGenerate}
          disabled={isGenerating || !amount}
          className={`
            relative overflow-hidden group px-8 py-4 rounded-full font-bold text-lg tracking-wide shadow-lg transition-all duration-300
            ${isGenerating || !amount 
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 hover:scale-105 hover:shadow-amber-500/20'}
          `}
        >
          <span className="relative z-10 flex items-center gap-2">
            {isGenerating ? (
              <>
                <svg className="animate-spin h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang Kiến Tạo...
              </>
            ) : (
              "Kích Hoạt Nguồn Lực & Tính Toán"
            )}
          </span>
          <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 -skew-x-12 origin-left"></div>
        </button>
      </div>
    </div>
  );
};

export default FinancialForm;
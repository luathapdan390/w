import React, { useState, useMemo } from 'react';
import FinancialForm from './components/FinancialForm';
import CompoundChart from './components/CompoundChart';
import ManifestationList from './components/ManifestationList';
import { generateWealthReasons } from './services/geminiService';
import { CalculationResult, Affirmation, LoadingState } from './types';

const App: React.FC = () => {
  // Financial State
  const [amountStr, setAmountStr] = useState<string>('');
  const [years, setYears] = useState<number>(10);
  const [rate, setRate] = useState<number>(10); // 10% default
  
  // App State
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [affirmations, setAffirmations] = useState<Affirmation[]>([]);
  const [calculatedData, setCalculatedData] = useState<CalculationResult[]>([]);
  const [finalAmount, setFinalAmount] = useState<number>(0);

  // Clean amount string to number
  const principal = useMemo(() => {
    return parseInt(amountStr.replace(/,/g, ''), 10) || 0;
  }, [amountStr]);

  const handleGenerate = async () => {
    if (!principal) return;

    setLoadingState(LoadingState.LOADING);
    setAffirmations([]);
    
    // 1. Calculate Compound Interest Data
    // A = P(1 + r/n)^(nt) . Assume n=1 for yearly compounding visual simplicity
    const data: CalculationResult[] = [];
    let currentTotal = principal;
    const r = rate / 100;
    
    // Initial point
    data.push({
      year: 0,
      principal: principal,
      interest: 0,
      total: principal
    });

    for (let i = 1; i <= years; i++) {
      const nextTotal = principal * Math.pow((1 + r), i);
      data.push({
        year: i,
        principal: principal,
        interest: nextTotal - principal,
        total: nextTotal
      });
    }

    setCalculatedData(data);
    setFinalAmount(data[data.length - 1].total);

    // 2. Call Gemini API
    try {
      const result = await generateWealthReasons(amountStr);
      if (result && result.affirmations) {
        setAffirmations(result.affirmations);
        setLoadingState(LoadingState.SUCCESS);
      } else {
        setLoadingState(LoadingState.ERROR);
      }
    } catch (e) {
      console.error(e);
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-amber-500/5 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]"></div>
      </div>

      <main className="relative z-10 container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-16 space-y-4">
          <p className="text-amber-500/90 italic font-serif text-xl md:text-2xl mb-6 tracking-wide">
            "Cái gì mà tôi không làm bù được chính là tài sản của tôi"
          </p>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 bg-clip-text text-transparent serif drop-shadow-sm">
            Wealth Architect
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Kiến tạo tư duy thịnh vượng, khẳng định quyền sở hữu và kích hoạt sức mạnh lãi kép cho di sản của bạn.
          </p>
        </header>

        {/* Input Section */}
        <section className="mb-12">
          <FinancialForm
            amount={amountStr}
            setAmount={setAmountStr}
            years={years}
            setYears={setYears}
            rate={rate}
            setRate={setRate}
            onGenerate={handleGenerate}
            isGenerating={loadingState === LoadingState.LOADING}
          />
        </section>

        {/* Results Section */}
        {calculatedData.length > 0 && (
          <section className="space-y-12 animate-fade-in-up">
            
            {/* Big Numbers */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-500/30 rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
              <h3 className="text-slate-400 uppercase tracking-widest text-sm font-semibold mb-2">Tài sản dự kiến sau {years} năm</h3>
              <div className="text-4xl md:text-6xl font-bold text-white serif tracking-tight">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(finalAmount)}
              </div>
              <div className="mt-4 text-emerald-400 text-sm font-medium bg-emerald-900/20 inline-block px-3 py-1 rounded-full border border-emerald-500/20">
                Gấp {finalAmount > 0 && principal > 0 ? (finalAmount / principal).toFixed(2) : 0} lần vốn gốc
              </div>
            </div>

            {/* Chart */}
            <CompoundChart data={calculatedData} />

            {/* Affirmations */}
            {loadingState === LoadingState.SUCCESS && (
               <ManifestationList affirmations={affirmations} isVisible={true} />
            )}
            
            {loadingState === LoadingState.ERROR && (
              <div className="text-center p-8 text-red-400 bg-red-900/20 border border-red-800 rounded-xl">
                Có lỗi xảy ra khi kết nối với vũ trụ AI. Vui lòng thử lại.
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default App;
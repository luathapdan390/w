import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CalculationResult } from '../types';

interface CompoundChartProps {
  data: CalculationResult[];
}

const formatCurrencyShort = (value: number) => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  return value.toLocaleString();
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded shadow-xl">
        <p className="text-slate-300 text-sm mb-1">Năm thứ {label}</p>
        <p className="text-amber-400 font-bold text-lg">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

const CompoundChart: React.FC<CompoundChartProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700 mt-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-amber-400 mb-2 serif">Sức Mạnh Lãi Kép</h2>
      <p className="text-slate-400 mb-6 text-sm">Biểu đồ tăng trưởng tài sản theo thời gian (Công thức A = P(1 + r/n)^nt)</p>
      
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="year" 
              stroke="#64748b" 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <YAxis 
              stroke="#64748b" 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
              tickFormatter={formatCurrencyShort}
              width={80}
            />
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="total" 
              stroke="#f59e0b" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorTotal)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CompoundChart;
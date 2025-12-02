import React from 'react';
import { Affirmation } from '../types';

interface ManifestationListProps {
  affirmations: Affirmation[];
  isVisible: boolean;
}

const ManifestationList: React.FC<ManifestationListProps> = ({ affirmations, isVisible }) => {
  if (!isVisible || affirmations.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold text-center text-amber-400 mb-8 serif">
        100 Lý Do Bạn Xứng Đáng & Sở Hữu Số Tiền Này
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {affirmations.map((item, index) => (
          <div 
            key={item.id} 
            className="group relative bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 p-5 rounded-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-100 transition-opacity">
              <span className="text-4xl text-amber-500/10 font-black serif select-none">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            
            <div className="mb-2">
              <span className="inline-block px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase bg-slate-700 text-amber-400">
                {item.category}
              </span>
            </div>
            
            <p className="text-slate-200 leading-relaxed font-light italic">
              "{item.content}"
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center text-slate-500 italic text-sm pb-10">
        "Thành công là nơi sự chuẩn bị và cơ hội gặp gỡ." - Tony Robbins
      </div>
    </div>
  );
};

export default ManifestationList;
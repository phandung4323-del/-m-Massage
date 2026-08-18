import React, { useState } from 'react';
import { CheckCircle2, Info } from 'lucide-react';
import { PRODUCT_IMAGES, BODY_ZONES } from '../data/productData';

export const ProblemDeepDiveSection: React.FC = () => {
  const [activeZone, setActiveZone] = useState<number | null>(null);

  return (
    <section className="py-14 sm:py-20 px-4 max-w-4xl mx-auto" id="deep-dive">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002045]">
          5 VÙNG CƠ THỂ THƯỜNG ĐƯỢC QUAN TÂM
        </h2>
        <p className="text-[#43474e] text-sm sm:text-base mt-2 max-w-lg mx-auto">
          Đệm massage S-Mall được thiết kế khoa học để tác động chính xác vào 5 trọng điểm huyệt đạo trên cơ thể.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-5 sm:p-8 soft-shadow border border-[#c4c6cf]/40 flex flex-col md:flex-row items-center gap-8">
        {/* Diagram with hot spot interactive feel */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="relative rounded-2xl overflow-hidden bg-[#f1f4f6] p-2 border border-[#e0e3e5]">
            <img
              alt="Sơ đồ 5 vùng cơ thể quan trọng cần massage"
              className="w-full max-w-xs object-contain mx-auto rounded-xl"
              src={PRODUCT_IMAGES.bodyDiagram}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="mt-2 text-center text-xs text-[#74777f] flex items-center justify-center gap-1">
              <Info className="w-3.5 h-3.5" />
              <span>Chạm vào từng vùng để xem giải pháp chuyên sâu</span>
            </div>
          </div>
        </div>

        {/* 5 Zones List */}
        <div className="w-full md:w-1/2 space-y-3">
          {BODY_ZONES.map((zone, idx) => {
            const isSelected = activeZone === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveZone(isSelected ? null : idx)}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#aa3000] bg-[#ffdbd0]/20 shadow-sm'
                    : 'border-[#e0e3e5] bg-[#f7fafc] hover:border-[#aa3000]/50 hover:bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#aa3000] mt-0.5 shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-[#1a365d] text-base font-bold">
                        {zone.name}:
                      </strong>
                      <span className="text-[11px] font-semibold text-[#aa3000] bg-[#ffdbd0] px-2 py-0.5 rounded-full">
                        Vùng 0{idx + 1}
                      </span>
                    </div>
                    <p className="text-xs text-[#43474e] mt-1 leading-snug">
                      {zone.benefit}
                    </p>
                    {isSelected && (
                      <div className="mt-2 pt-2 border-t border-[#aa3000]/20 text-xs text-[#aa3000] font-medium animate-fadeIn">
                        ✨ <span className="font-semibold">Giải pháp S-Mall:</span> {zone.action}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

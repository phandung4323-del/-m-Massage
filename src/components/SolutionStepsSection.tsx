import React from 'react';
import { SOLUTION_STEPS } from '../data/productData';

export const SolutionStepsSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 px-4 bg-[#f1f4f6] border-y border-[#e0e3e5]" id="solution">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-[#aa3000] font-bold text-xs uppercase tracking-wider mb-2 block">
          Dễ dàng sử dụng chỉ trong 30 giây
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002045] mb-12">
          BIẾN CHIẾC GHẾ BẠN ĐANG CÓ THÀNH GÓC THƯ GIÃN
        </h2>

        {/* 4 Steps Flow */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
          {SOLUTION_STEPS.map((item, index) => {
            const isLast = index === SOLUTION_STEPS.length - 1;
            return (
              <div key={index} className="flex flex-col items-center relative group">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-extrabold mb-4 shadow-md transition-transform group-hover:scale-110 duration-300 ${
                    isLast
                      ? 'bg-[#aa3000] text-white ring-4 ring-[#ffdbd0]'
                      : 'bg-[#1a365d] text-white'
                  }`}
                >
                  {item.step}
                </div>
                <h3
                  className={`text-base font-extrabold mb-1.5 ${
                    isLast ? 'text-[#aa3000]' : 'text-[#002045]'
                  }`}
                >
                  {item.title}
                </h3>
                <p className="text-xs text-[#43474e] max-w-[170px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quick highlight banner */}
        <div className="mt-12 bg-white rounded-2xl p-4 sm:p-6 border border-[#c4c6cf]/40 soft-shadow flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 text-left">
            <span className="material-symbols-outlined text-3xl text-[#aa3000]">chair</span>
            <div>
              <h4 className="text-sm font-bold text-[#002045]">Tương thích 99% mọi loại ghế</h4>
              <p className="text-xs text-[#43474e]">Ghế xoay văn phòng, ghế sofa gia đình, ghế lái ô tô, ghế gaming</p>
            </div>
          </div>
          <a
            href="#order"
            className="px-4 py-2 bg-[#002045] hover:bg-[#1a365d] text-white text-xs font-bold rounded-xl shrink-0 transition-colors"
          >
            Mua Ngay
          </a>
        </div>
      </div>
    </section>
  );
};

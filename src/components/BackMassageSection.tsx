import React from 'react';
import { PRODUCT_IMAGES } from '../data/productData';

export const BackMassageSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 px-4 max-w-4xl mx-auto" id="back-massage">
      <div className="text-center mb-8">
        <span className="text-[#aa3000] font-bold text-xs uppercase tracking-wider mb-2 block">
          Định hình công thái học lưng ghế
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002045]">
          DỌC THEO VÙNG LƯNG
        </h2>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 soft-shadow border border-[#c4c6cf]/40 flex flex-col items-center">
        <div className="relative rounded-2xl overflow-hidden bg-[#f7fafc] p-2 border border-[#e0e3e5] mb-6 max-w-md w-full">
          <img
            alt="Đường cong ôm sát cột sống của đệm massage S-Mall"
            className="w-full h-auto object-contain rounded-xl mx-auto"
            src={PRODUCT_IMAGES.backTrack}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-2xl text-center">
          <p className="text-base sm:text-lg font-bold text-[#1a365d] mb-3">
            Hệ thống ray trượt ôm sát đường cong cột sống sinh học, tác động liên tục từ vai xuống tận thắt lưng.
          </p>
          <p className="text-xs sm:text-sm text-[#43474e] leading-relaxed">
            Giúp nâng đỡ đường cong sinh lý tự nhiên của cột sống chữ S, giảm đáng kể áp lực trọng lực cơ thể đè nặng lên các đĩa đệm thắt lưng L1-L5 khi ngồi làm việc lâu.
          </p>
        </div>
      </div>
    </section>
  );
};

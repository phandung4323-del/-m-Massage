import React from 'react';
import { PRODUCT_IMAGES } from '../data/productData';

export const MassageZonesSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 px-4 max-w-4xl mx-auto" id="features">
      <div className="text-center mb-8">
        <span className="text-[#aa3000] font-bold text-xs uppercase tracking-wider mb-2 block">
          Bao phủ toàn diện từ đầu đến hông
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002045]">
          MỘT CHIẾC ĐỆM – NHIỀU VÙNG MASSAGE
        </h2>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden soft-shadow border border-[#c4c6cf]/40">
        <div className="relative group">
          <img
            alt="Sơ đồ đường đi massage toàn diện trên cơ thể"
            className="w-full h-auto object-cover max-h-[480px] mx-auto"
            src={PRODUCT_IMAGES.massageZones}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="p-6 text-center bg-[#f7fafc] border-t border-[#e0e3e5]">
          <p className="text-sm sm:text-base font-semibold text-[#1a365d]">
            Tác động sâu vào các huyệt đạo trọng yếu, kích thích tuần hoàn máu và mang lại cảm giác thư thái toàn diện.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs font-semibold text-[#43474e]">
            <div className="bg-white p-2 rounded-xl border border-[#e0e3e5]">✨ Nhào nặn cơ gáy</div>
            <div className="bg-white p-2 rounded-xl border border-[#e0e3e5]">🔥 Sưởi ấm cột sống</div>
            <div className="bg-white p-2 rounded-xl border border-[#e0e3e5]">⚡ Ray trượt dọc thắt lưng</div>
            <div className="bg-white p-2 rounded-xl border border-[#e0e3e5]">💆 Rung sóng vi mô đùi & mông</div>
          </div>
        </div>
      </div>
    </section>
  );
};

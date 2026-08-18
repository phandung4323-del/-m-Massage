import React from 'react';
import { RotateCw, CheckCircle } from 'lucide-react';
import { PRODUCT_IMAGES } from '../data/productData';

export const Roller3DSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 px-4 bg-[#f1f4f6] border-y border-[#e0e3e5]" id="roller-3d">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-[#aa3000] font-bold text-xs uppercase tracking-wider mb-2 block">
          Công nghệ động cơ thế hệ mới
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002045] mb-8">
          CON LĂN MASSAGE 3D
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-6 sm:p-8 rounded-3xl soft-shadow border border-[#c4c6cf]/40">
          <div className="relative rounded-2xl overflow-hidden group">
            <img
              alt="Cụm con lăn massage 3D đa chiều"
              className="w-full h-auto object-cover rounded-2xl group-hover:scale-103 transition-transform duration-500"
              src={PRODUCT_IMAGES.roller3D}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 left-3 bg-[#002045]/90 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
              <RotateCw className="w-3.5 h-3.5 text-[#ffb59e] animate-spin" style={{ animationDuration: '4s' }} />
              <span>Bi lăn kép xoay đảo chiều</span>
            </div>
          </div>

          <div className="text-left space-y-5">
            <div className="p-4 rounded-2xl bg-[#f7fafc] border border-[#e0e3e5]">
              <h3 className="font-extrabold text-[#1a365d] text-base sm:text-lg mb-1 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#aa3000]" />
                Xoay, Xoa, Đẩy Chuyên Sâu
              </h3>
              <p className="text-xs sm:text-sm text-[#43474e] leading-relaxed">
                Mô phỏng chính xác kỹ thuật của bàn tay kỹ thuật viên chuyên nghiệp, tác động sâu vào các mô cơ bị căng cứng lâu ngày.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f7fafc] border border-[#e0e3e5]">
              <h3 className="font-extrabold text-[#1a365d] text-base sm:text-lg mb-1 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#aa3000]" />
                Massage Cổ 2 Chiều Linh Hoạt
              </h3>
              <p className="text-xs sm:text-sm text-[#43474e] leading-relaxed">
                Khả năng đảo chiều thuận/nghịch theo chu kỳ, giải phóng nhanh chóng các cơn co rút ở cơ thang và đốt sống cổ C1-C7.
              </p>
            </div>

            <div className="text-xs text-[#74777f] italic pl-2 border-l-2 border-[#aa3000]">
              * Cơ chế nhào nặn êm ái, bọc silicone y tế đàn hồi cao không gây đau rát hay bầm tím da.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

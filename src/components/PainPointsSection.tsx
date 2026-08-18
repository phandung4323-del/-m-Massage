import React from 'react';
import { AlertCircle } from 'lucide-react';
import { PAIN_POINTS } from '../data/productData';

export const PainPointsSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 px-4 bg-[#f1f4f6] border-y border-[#e0e3e5]" id="pain-points">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1 text-[#aa3000] text-xs font-bold uppercase tracking-wider mb-2">
            <AlertCircle className="w-4 h-4" />
            <span>Thực trạng sức khỏe đáng báo động</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002045]">
            BẠN CÓ ĐANG NGỒI QUÁ NHIỀU MỖI NGÀY?
          </h2>
          <p className="text-[#43474e] text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Hơn 85% người trưởng thành gặp các vấn đề thoái hóa cột sống, đau mỏi vai gáy do tính chất công việc ngồi liên tục.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {PAIN_POINTS.map((point, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden soft-shadow border border-[#c4c6cf]/40 flex flex-col hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="overflow-hidden relative">
                <img
                  className="w-full h-36 sm:h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={point.title}
                  src={point.image}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <span className="absolute bottom-2 left-2 text-[10px] sm:text-xs font-bold text-white bg-[#002045]/80 px-2 py-0.5 rounded backdrop-blur-xs">
                  Nhóm {index + 1}
                </span>
              </div>
              <div className="p-3.5 sm:p-4 text-center flex-1 flex flex-col justify-between">
                <h3 className="font-extrabold text-sm sm:text-base text-[#1a365d] mb-1.5 uppercase">
                  {point.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#43474e] leading-snug">
                  {point.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Warning Callout Box */}
        <div className="mt-8 bg-[#ffdad6]/40 border border-[#ffdad6] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-full bg-[#ba1a1a]/10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#ba1a1a]">warning</span>
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#93000a]">Hậu quả của việc ngồi sai tư thế kéo dài:</h4>
            <p className="text-xs text-[#43474e] mt-0.5">
              Gây chèn ép dây thần kinh tọa, thiếu máu lên não gây chóng mặt, đau thắt lưng mãn tính và giảm năng suất làm việc.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

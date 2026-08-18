import React from 'react';
import { Sparkles, Package, Check, ShieldCheck } from 'lucide-react';
import { SPECIFICATIONS } from '../data/productData';

export const DesignFeaturesSection: React.FC = () => {
  const features = [
    {
      title: 'Dáng chữ L ôm sát',
      desc: 'Thiết kế chuẩn công thái học ôm trọn từ gáy đến đùi, phân tán đều trọng lực cơ thể.',
      icon: 'chair',
    },
    {
      title: 'Da PU cao cấp',
      desc: 'Chống thấm nước, chống bám mồ hôi, dễ dàng lau chùi vệ sinh chỉ bằng khăn mềm.',
      icon: 'texture',
    },
    {
      title: 'Lưới 3D thoáng khí',
      desc: 'Cấu trúc sợi tổ ong vi mô tản nhiệt nhanh, ngồi êm mát không bị bí bách mùa hè.',
      icon: 'air',
    },
    {
      title: 'Gấp gọn di động',
      desc: 'Trọng lượng chỉ 3.8kg, dễ dàng cuộn gập mang theo đi xe hơi, văn phòng hoặc du lịch.',
      icon: 'compress',
    },
  ];

  const boxContents = [
    '01 x Đệm massage toàn thân S-Mall chính hãng',
    '01 x Củ sạc nguồn Adapter cắm điện 220V gia đình',
    '01 x Đầu cắm tẩu sạc 12V chuyên dụng trên ô tô',
    '01 x Remote điều khiển tích hợp dây nối',
    '01 x Sách hướng dẫn sử dụng tiếng Việt',
    '01 x Thẻ bảo hành điện tử chính hãng 12 tháng',
  ];

  return (
    <section className="py-14 sm:py-20 px-4 bg-[#f1f4f6] border-y border-[#e0e3e5]" id="specs">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[#aa3000] font-bold text-xs uppercase tracking-wider mb-2 block">
            Chất lượng hoàn thiện vượt trội
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002045]">
            THIẾT KẾ THÔNG MINH & TINH TẾ
          </h2>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-5 rounded-2xl soft-shadow border border-[#c4c6cf]/40 flex flex-col items-center text-center hover:border-[#aa3000] transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[#ffdbd0]/60 flex items-center justify-center mb-3 text-[#aa3000]">
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              </div>
              <h3 className="font-extrabold text-xs sm:text-sm text-[#1a365d] mb-1.5">
                {item.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#43474e] leading-snug">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Technical Specs & Unboxing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Specs Table */}
          <div className="md:col-span-7 bg-white rounded-3xl p-5 sm:p-6 soft-shadow border border-[#c4c6cf]/40">
            <h3 className="font-extrabold text-base sm:text-lg text-[#002045] mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#aa3000]" />
              <span>Bảng Thông Số Kỹ Thuật</span>
            </h3>

            <div className="divide-y divide-[#e0e3e5] text-xs sm:text-sm">
              {SPECIFICATIONS.map((spec, idx) => (
                <div key={idx} className="py-2.5 flex justify-between gap-4 items-center">
                  <span className="text-[#74777f] font-medium shrink-0">{spec.label}:</span>
                  <span className="text-[#1a365d] font-bold text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* In the box card */}
          <div className="md:col-span-5 bg-[#002045] text-white rounded-3xl p-5 sm:p-6 soft-shadow border border-[#1a365d]">
            <h3 className="font-extrabold text-base sm:text-lg text-white mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#ffb59e]" />
              <span>Bộ Sản Phẩm Đầy Đủ</span>
            </h3>

            <ul className="space-y-2.5 text-xs sm:text-sm text-[#eef1f3]">
              {boxContents.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#ffb59e] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#adc7f7]">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Sản phẩm có dán tem chống hàng giả S-Mall chính hãng</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

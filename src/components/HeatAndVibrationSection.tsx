import React, { useState } from 'react';
import { Flame, Activity, Zap, Sparkles } from 'lucide-react';
import { PRODUCT_IMAGES } from '../data/productData';

export const HeatAndVibrationSection: React.FC = () => {
  const [selectedIntensity, setSelectedIntensity] = useState<'mild' | 'medium' | 'strong'>('medium');

  const intensityDetails = {
    mild: {
      label: 'Nhẹ (Mức 1)',
      desc: 'Thích hợp cho người mới dùng lần đầu, phụ nữ và người cao tuổi cần thư giãn êm dịu trước khi ngủ.',
      width: '33%',
    },
    medium: {
      label: 'Vừa (Mức 2)',
      desc: 'Mức chuẩn cân bằng lý tưởng cho nhân viên văn phòng giải tỏa căng thẳng giữa giờ làm việc.',
      width: '66%',
    },
    strong: {
      label: 'Mạnh (Mức 3)',
      desc: 'Lực nhấn sâu mạnh mẽ cho người tập thể thao, tài xế lái xe đường dài bị co cơ, nhức mỏi nặng.',
      width: '100%',
    },
  };

  return (
    <div className="space-y-14 sm:space-y-20">
      {/* Section 08: HEAT */}
      <section className="py-14 sm:py-20 px-4 bg-[#f1f4f6] border-y border-[#e0e3e5]" id="heat">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#aa3000] font-bold text-xs uppercase tracking-wider mb-2 block">
            Công nghệ nhiệt hồng ngoại Carbon cao cấp
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002045] mb-8">
            THÊM NHIỆT – THÊM CẢM GIÁC ẤM ÁP
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white p-6 sm:p-7 rounded-3xl soft-shadow border border-[#c4c6cf]/40 flex flex-col items-center text-center hover:border-[#aa3000] transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-[#ffdbd0]/60 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[#aa3000] text-3xl">thermostat</span>
              </div>
              <h3 className="font-extrabold text-lg text-[#1a365d] mb-2">
                Mức 1: Sưởi Ấm Nhẹ (~42°C)
              </h3>
              <p className="text-xs sm:text-sm text-[#43474e] leading-relaxed">
                Giúp làm ấm các thớ cơ một cách êm dịu, giảm căng thẳng bề mặt và đem lại cảm giác dễ chịu tức thì.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-3xl soft-shadow border border-[#c4c6cf]/40 flex flex-col items-center text-center hover:border-[#ba1a1a] transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-[#ffdad6] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[#ba1a1a] text-3xl">local_fire_department</span>
              </div>
              <h3 className="font-extrabold text-lg text-[#1a365d] mb-2">
                Mức 2: Nhiệt Sâu (~48°C)
              </h3>
              <p className="text-xs sm:text-sm text-[#43474e] leading-relaxed">
                Thẩm thấu sâu vào mạch máu và huyệt đạo, giãn cơ tối đa, thúc đẩy tuần hoàn máu và thải trừ độc tố cơ bắp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 09: VIBRATION */}
      <section className="py-8 sm:py-12 px-4 max-w-4xl mx-auto text-center" id="vibration">
        <span className="text-[#aa3000] font-bold text-xs uppercase tracking-wider mb-2 block">
          Động cơ rung vi mô tần số cao
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002045] mb-8">
          RUNG VÙNG HÔNG & ĐÙI
        </h2>

        <div className="relative bg-white rounded-3xl overflow-hidden soft-shadow border border-[#c4c6cf]/40 max-w-2xl mx-auto">
          <img
            alt="Vùng rung đệm ngồi massage mông và đùi"
            className="w-full h-auto object-cover"
            src={PRODUCT_IMAGES.vibrationSeat}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="p-4 sm:p-5 bg-[#002045] text-white">
            <p className="text-sm font-semibold flex items-center justify-center gap-2">
              <Activity className="w-4 h-4 text-[#ffb59e]" />
              <span>Đánh bay nhức mỏi phần mông và đùi sau thời gian dài ngồi làm việc hoặc lái xe.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Section 10: 3 INTENSITIES */}
      <section className="py-14 sm:py-20 px-4 bg-[#f1f4f6] border-y border-[#e0e3e5]" id="intensities">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[#aa3000] font-bold text-xs uppercase tracking-wider mb-2 block">
            Linh hoạt phù hợp mọi lứa tuổi
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002045] mb-3">
            3 MỨC CƯỜNG ĐỘ: NHẸ – VỪA – MẠNH
          </h2>
          <p className="text-[#43474e] text-sm sm:text-base mb-8">
            Dễ dàng tùy chỉnh cường độ lực bóp theo thể trạng và sở thích của từng thành viên trong gia đình.
          </p>

          {/* Interactive Toggle Pills */}
          <div className="flex justify-center gap-2 sm:gap-4 mb-6">
            {(['mild', 'medium', 'strong'] as const).map((level) => {
              const isActive = selectedIntensity === level;
              const names = { mild: '1. Nhẹ', medium: '2. Vừa', strong: '3. Mạnh' };
              return (
                <button
                  key={level}
                  onClick={() => setSelectedIntensity(level)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#aa3000] text-white shadow-md scale-105'
                      : 'bg-white text-[#1a365d] border border-[#c4c6cf]/60 hover:bg-[#ffdbd0]/30'
                  }`}
                >
                  <Zap className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#aa3000]'}`} />
                  <span>{names[level]}</span>
                </button>
              );
            })}
          </div>

          {/* Visual Progress Intensity Bar */}
          <div className="w-full bg-[#c4c6cf]/40 h-3.5 rounded-full overflow-hidden relative max-w-md mx-auto shadow-inner">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#adc7f7] via-[#aa3000] to-[#ba1a1a] transition-all duration-300 rounded-full"
              style={{ width: intensityDetails[selectedIntensity].width }}
            />
          </div>

          <div className="flex justify-between max-w-md mx-auto mt-2 text-xs font-bold text-[#1a365d] px-1">
            <span>Nhẹ (Mức 1)</span>
            <span>Vừa (Mức 2)</span>
            <span>Mạnh (Mức 3)</span>
          </div>

          {/* Active Level Description Card */}
          <div className="mt-6 bg-white p-4 sm:p-5 rounded-2xl border border-[#c4c6cf]/50 max-w-md mx-auto soft-shadow text-left">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#aa3000]" />
              <span className="font-bold text-sm text-[#002045]">
                {intensityDetails[selectedIntensity].label}
              </span>
            </div>
            <p className="text-xs text-[#43474e] leading-relaxed">
              {intensityDetails[selectedIntensity].desc}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

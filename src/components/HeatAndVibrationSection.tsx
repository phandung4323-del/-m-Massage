import React, { useState, useEffect } from 'react';
import { Flame, Activity, Zap, Sparkles, ShieldCheck, HeartPulse, CheckCircle2 } from 'lucide-react';
import { PRODUCT_IMAGES } from '../data/productData';
import videoPoster from '../assets/images/video_showcase_poster_1787040441038.jpg';
import { getServerVideoUrl } from '../services/videoStorage';

export const HeatAndVibrationSection: React.FC = () => {
  const [selectedIntensity, setSelectedIntensity] = useState<'mild' | 'medium' | 'strong'>('medium');
  const [serverVideoUrl, setServerVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    async function loadSaved() {
      const saved = await getServerVideoUrl();
      if (saved) {
        setServerVideoUrl(saved);
      }
    }
    loadSaved();

    const handleVideoUpdate = () => {
      loadSaved();
    };
    window.addEventListener('product_video_updated', handleVideoUpdate);
    return () => window.removeEventListener('product_video_updated', handleVideoUpdate);
  }, []);

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

      {/* Section 09: VIBRATION & VIDEO SHOWCASE */}
      <section className="py-8 sm:py-14 px-4 max-w-4xl mx-auto text-center" id="vibration">
        <span className="text-[#aa3000] font-bold text-xs uppercase tracking-wider mb-2 block">
          Trải Nghiệm Thực Tế & Động Cơ Rung Kép
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002045] mb-3">
          THƯ GIÃN TOÀN THÂN NGAY TẠI NHÀ
        </h2>
        <p className="text-xs sm:text-sm text-[#43474e] max-w-xl mx-auto mb-6">
          Xem video thực tế hướng dẫn sử dụng đệm massage S-MALL: Con lăn xoay 3D mô phỏng bàn tay người thật, sưởi ấm hồng ngoại và rung thư giãn toàn thân.
        </p>

        {/* Video Player Box - Protected against downloading or public altering */}
        <div className="relative bg-[#001026] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#002045] max-w-3xl mx-auto aspect-video flex items-center justify-center">
          {serverVideoUrl ? (
            <video
              src={serverVideoUrl}
              controls
              playsInline
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
              poster={videoPoster}
              className="w-full h-full object-contain bg-black"
            />
          ) : (
            <iframe
              src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
              title="Video trải nghiệm đệm massage S-MALL"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          )}
        </div>

        {/* 6 Core Product Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mt-6 max-w-3xl mx-auto">
          {[
            { title: 'Tự Ngắt 15 Phút', desc: 'An toàn khi ngủ quên', icon: 'timer' },
            { title: 'Con Lăn 3D', desc: 'Xoay nhào nặn đảo chiều', icon: 'autorenew' },
            { title: 'Nhiệt Hồng Ngoại', desc: 'Sưởi ấm sâu giảm đau', icon: 'local_fire_department' },
            { title: 'Rung Đệm Ngồi', desc: 'Thư giãn mông & đùi', icon: 'vibration' },
            { title: 'Nhà & Xe Hơi 12V', desc: 'Kèm tẩu sạc ô tô', icon: 'directions_car' },
            { title: 'Quà Ý Nghĩa', desc: 'Tặng người thân yêu', icon: 'featured_seasonal_and_gifts' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-2.5 sm:p-3 rounded-2xl border border-[#c4c6cf]/40 text-center shadow-xs flex flex-col items-center justify-center hover:border-[#aa3000]/50 transition-colors">
              <span className="material-symbols-outlined text-[#aa3000] text-xl mb-1">{item.icon}</span>
              <h5 className="font-extrabold text-[11px] sm:text-xs text-[#002045]">{item.title}</h5>
              <p className="text-[9px] sm:text-[10px] text-[#74777f]">{item.desc}</p>
            </div>
          ))}
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
                      ? 'bg-[#aa3000] text-white shadow-md'
                      : 'bg-white text-[#43474e] border border-[#c4c6cf]/60 hover:bg-[#f7fafc]'
                  }`}
                >
                  {level === 'mild' && <Zap className="w-4 h-4 text-emerald-400" />}
                  {level === 'medium' && <Activity className="w-4 h-4 text-amber-400" />}
                  {level === 'strong' && <Flame className="w-4 h-4 text-rose-400" />}
                  <span>{names[level]}</span>
                </button>
              );
            })}
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

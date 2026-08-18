import React from 'react';
import { Timer, Flame, Sparkles, CheckCheck } from 'lucide-react';

export const ExperienceTimelineSection: React.FC = () => {
  const phases = [
    {
      time: 'Phút 1-3',
      title: 'Khởi động & Thư giãn nhẹ',
      desc: 'Con lăn bắt đầu xoay nhẹ nhàng, các thớ cơ thích ứng dần với lực nén.',
      icon: Timer,
      color: 'text-sky-600 bg-sky-50 border-sky-200',
    },
    {
      time: 'Phút 4-8',
      title: 'Sưởi ấm & Giãn cơ',
      desc: 'Nhiệt hồng ngoại tỏa nhiệt ấm dần, khai thông kinh lạc và làm mềm các bó cơ căng cứng.',
      icon: Flame,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      time: 'Phút 9-12',
      title: 'Tác động sâu điểm nghẽn',
      desc: 'Ray trượt và cụm bi 3D ấn mạnh vào các huyệt vị đốt sống, giải tỏa cơn đau tích tụ lâu ngày.',
      icon: Sparkles,
      color: 'text-[#aa3000] bg-[#ffdbd0]/50 border-[#ffb59e]',
    },
    {
      time: 'Phút 13-15',
      title: 'Phục hồi & Sảng khoái',
      desc: 'Giảm dần nhịp độ, chuyển sang chế độ xoa bóp êm ái, cơ thể tràn đầy năng lượng tươi mới.',
      icon: CheckCheck,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
  ];

  return (
    <section className="py-14 sm:py-20 px-4 bg-[#f1f4f6] border-y border-[#e0e3e5]" id="timeline">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-[#aa3000] font-bold text-xs uppercase tracking-wider mb-2 block">
          Liệu trình chuẩn khoa học
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002045] mb-12">
          TRẢI NGHIỆM 15 PHÚT TÁI TẠO NĂNG LƯỢNG
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            return (
              <div
                key={index}
                className="bg-white p-5 rounded-2xl soft-shadow border border-[#c4c6cf]/40 flex flex-col items-center text-center hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 border ${phase.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-extrabold text-[#aa3000] bg-[#ffdbd0] px-2.5 py-0.5 rounded-full mb-2">
                  {phase.time}
                </span>
                <h3 className="font-extrabold text-sm text-[#1a365d] mb-1">
                  {phase.title}
                </h3>
                <p className="text-xs text-[#43474e] leading-relaxed">
                  {phase.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

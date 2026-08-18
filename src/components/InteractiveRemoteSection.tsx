import React, { useState } from 'react';
import { Power, Flame, Activity, RotateCw, Gauge, Cpu, Check } from 'lucide-react';
import { PRODUCT_IMAGES } from '../data/productData';
import { RemoteState } from '../types';

export const InteractiveRemoteSection: React.FC = () => {
  const [remote, setRemote] = useState<RemoteState>({
    power: true,
    mode: 'auto',
    intensity: 2,
    heatLevel: 1,
    vibration: true,
    direction: 'clockwise',
    timerMinutes: 15,
  });

  const togglePower = () => {
    setRemote((prev) => ({ ...prev, power: !prev.power }));
  };

  const cycleMode = () => {
    if (!remote.power) return;
    setRemote((prev) => ({
      ...prev,
      mode: prev.mode === 'auto' ? 'custom' : prev.mode === 'custom' ? 'deep' : 'auto',
    }));
  };

  const cycleIntensity = () => {
    if (!remote.power) return;
    setRemote((prev) => ({
      ...prev,
      intensity: (prev.intensity === 3 ? 1 : prev.intensity + 1) as 1 | 2 | 3,
    }));
  };

  const toggleHeat = () => {
    if (!remote.power) return;
    setRemote((prev) => ({
      ...prev,
      heatLevel: (prev.heatLevel === 2 ? 0 : prev.heatLevel + 1) as 0 | 1 | 2,
    }));
  };

  const toggleVibration = () => {
    if (!remote.power) return;
    setRemote((prev) => ({
      ...prev,
      vibration: !prev.vibration,
    }));
  };

  const toggleDirection = () => {
    if (!remote.power) return;
    setRemote((prev) => ({
      ...prev,
      direction: prev.direction === 'clockwise' ? 'counterclockwise' : 'clockwise',
    }));
  };

  const remoteButtons = [
    {
      title: 'Bật/Tắt (Power)',
      desc: 'Khởi động nhanh chóng chỉ bằng một chạm duy nhất.',
      action: togglePower,
      active: remote.power,
      icon: Power,
    },
    {
      title: 'Chế độ (Mode)',
      desc: `Chế độ hiện tại: ${remote.mode === 'auto' ? 'Tự Động Toàn Thân' : remote.mode === 'custom' ? 'Thủ Công Tập Trung' : 'Chuyên Sâu (Deep Tissue)'}.`,
      action: cycleMode,
      active: remote.power,
      icon: Cpu,
    },
    {
      title: 'Cường độ (Speed)',
      desc: `3 mức điều chỉnh (Đang ở Mức ${remote.intensity}/3).`,
      action: cycleIntensity,
      active: remote.power,
      icon: Gauge,
    },
    {
      title: 'Đảo chiều (Direction)',
      desc: `Thay đổi hướng xoay của bi lăn (${remote.direction === 'clockwise' ? 'Thuận chiều' : 'Nghịch chiều'}).`,
      action: toggleDirection,
      active: remote.power,
      icon: RotateCw,
    },
    {
      title: 'Rung (Vibration)',
      desc: `Bật/Tắt rung vùng hông & đùi (${remote.vibration ? 'Đang BẬT' : 'Đang TẮT'}).`,
      action: toggleVibration,
      active: remote.power && remote.vibration,
      icon: Activity,
    },
    {
      title: 'Nhiệt (Heating)',
      desc: `Sưởi ấm hồng ngoại (${remote.heatLevel === 0 ? 'TẮT' : remote.heatLevel === 1 ? 'Mức 1: Ấm Nhẹ' : 'Mức 2: Nhiệt Sâu'}).`,
      action: toggleHeat,
      active: remote.power && remote.heatLevel > 0,
      icon: Flame,
    },
  ];

  return (
    <section className="py-14 sm:py-20 px-4 max-w-4xl mx-auto" id="simulator">
      <div className="text-center mb-10">
        <span className="text-[#aa3000] font-bold text-xs uppercase tracking-wider mb-2 block">
          Trực quan & Dễ sử dụng
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002045]">
          MỌI CHỨC NĂNG TRONG TẦM TAY
        </h2>
        <p className="text-xs sm:text-sm text-[#43474e] mt-2">
          Bấm trực tiếp vào các nút trên điều khiển bên dưới để thử nghiệm tính năng ảo!
        </p>
      </div>

      <div className="bg-white rounded-3xl p-5 sm:p-8 soft-shadow border border-[#c4c6cf]/40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Remote Widget & Real Photo */}
          <div className="md:col-span-5 flex flex-col items-center">
            {/* Visual Remote Simulator Box */}
            <div className="w-full max-w-[260px] bg-gradient-to-b from-[#1a365d] to-[#002045] rounded-3xl p-4 text-white shadow-xl border-2 border-[#86a0cd]/30 relative">
              {/* Remote Screen Display */}
              <div className="bg-[#001428] rounded-2xl p-3 mb-4 border border-[#86a0cd]/20">
                <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                  <span className={`flex items-center gap-1 font-bold ${remote.power ? 'text-emerald-400' : 'text-rose-400'}`}>
                    <span className={`w-2 h-2 rounded-full ${remote.power ? 'bg-emerald-400 animate-ping' : 'bg-rose-400'}`} />
                    {remote.power ? 'HOẠT ĐỘNG' : 'TẮT'}
                  </span>
                  <span className="text-[#86a0cd] font-bold">15:00 MIN</span>
                </div>

                {remote.power ? (
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between items-center text-[#adc7f7]">
                      <span>Chế độ:</span>
                      <span className="font-bold text-white uppercase text-[10px] bg-[#aa3000] px-1.5 py-0.5 rounded">
                        {remote.mode}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[#adc7f7]">
                      <span>Lực nhấn:</span>
                      <span className="font-bold text-amber-300">Mức {remote.intensity} / 3</span>
                    </div>
                    <div className="flex justify-between items-center text-[#adc7f7]">
                      <span>Nhiệt độ:</span>
                      <span className="font-bold text-[#ffb59e]">
                        {remote.heatLevel === 0 ? 'TẮT' : remote.heatLevel === 1 ? 'Ấm Nhẹ' : 'Nhiệt Sâu'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[#adc7f7]">
                      <span>Rung mông:</span>
                      <span className={`font-bold ${remote.vibration ? 'text-emerald-400' : 'text-slate-400'}`}>
                        {remote.vibration ? 'BẬT' : 'TẮT'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="py-4 text-center text-xs text-[#86a0cd]/70 italic">
                    Bấm nút NGUỒN để khởi động máy
                  </div>
                )}
              </div>

              {/* Physical-style buttons */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={togglePower}
                  className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    remote.power
                      ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-md'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md animate-bounce'
                  }`}
                >
                  <Power className="w-4 h-4" />
                  <span>{remote.power ? 'TẮT' : 'BẬT'}</span>
                </button>

                <button
                  onClick={cycleMode}
                  disabled={!remote.power}
                  className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-white/10"
                >
                  <Cpu className="w-4 h-4 text-sky-400" />
                  <span>Chế độ</span>
                </button>

                <button
                  onClick={cycleIntensity}
                  disabled={!remote.power}
                  className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-white/10"
                >
                  <Gauge className="w-4 h-4 text-amber-400" />
                  <span>Cường độ</span>
                </button>

                <button
                  onClick={toggleDirection}
                  disabled={!remote.power}
                  className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-white/10"
                >
                  <RotateCw className="w-4 h-4 text-emerald-400" />
                  <span>Đảo chiều</span>
                </button>

                <button
                  onClick={toggleVibration}
                  disabled={!remote.power}
                  className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-white/10 ${
                    remote.power && remote.vibration
                      ? 'bg-[#aa3000] text-white shadow-sm'
                      : 'bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white'
                  }`}
                >
                  <Activity className="w-4 h-4 text-orange-300" />
                  <span>Rung</span>
                </button>

                <button
                  onClick={toggleHeat}
                  disabled={!remote.power}
                  className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-white/10 ${
                    remote.power && remote.heatLevel > 0
                      ? 'bg-rose-700 text-white shadow-sm'
                      : 'bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white'
                  }`}
                >
                  <Flame className="w-4 h-4 text-rose-300" />
                  <span>Nhiệt</span>
                </button>
              </div>

              {/* Product Reference Photo */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
                <img
                  src={PRODUCT_IMAGES.remoteControl}
                  alt="Ảnh remote thực tế"
                  className="w-10 h-10 object-cover rounded-lg border border-white/20"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[10px] text-[#adc7f7]">Điều khiển bấm tay bọc dây nối tiện lợi</span>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Explanation List */}
          <div className="md:col-span-7 space-y-2.5">
            {remoteButtons.map((btn, index) => {
              const Icon = btn.icon;
              return (
                <div
                  key={index}
                  onClick={btn.action}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    btn.active
                      ? 'bg-[#f7fafc] border-[#aa3000]/40 hover:bg-[#ffdbd0]/20'
                      : 'bg-[#f1f4f6]/60 border-[#e0e3e5] opacity-80'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-[#002045] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-[#ffb59e]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-sm font-bold text-[#1a365d]">
                        {btn.title}
                      </strong>
                      <span className="text-[10px] text-[#aa3000] font-bold bg-[#ffdbd0] px-2 py-0.5 rounded-full">
                        Chạm để thử
                      </span>
                    </div>
                    <p className="text-xs text-[#43474e] mt-0.5">
                      {btn.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { ShoppingCart, ShieldCheck, Truck, RotateCcw, Clock, Sparkles } from 'lucide-react';
import { PRODUCT_IMAGES } from '../data/productData';

export const HeroSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 5, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <section className="pt-24 pb-12 sm:pb-16 px-4 max-w-4xl mx-auto text-center flex flex-col items-center" id="hero">
      {/* Flash Sale Bar */}
      <div className="w-full max-w-md bg-[#ffdbd0] text-[#aa3000] px-4 py-2 rounded-full mb-6 flex items-center justify-between text-xs sm:text-sm font-bold border border-[#ffb59e]/60">
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-[#aa3000] animate-spin" style={{ animationDuration: '6s' }} />
          <span>ƯU ĐÃI FLASH SALE KẾT THÚC TRONG:</span>
        </span>
        <span className="bg-[#aa3000] text-white px-2 py-0.5 rounded font-mono font-extrabold tracking-wider">
          {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
        </span>
      </div>

      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#ffdbd0]/60 text-[#aa3000] font-bold text-xs tracking-wider uppercase mb-3">
        <Sparkles className="w-3.5 h-3.5" />
        <span>MỚI RA MẮT 2026</span>
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#002045] leading-tight sm:leading-snug mb-3">
        NGỒI LÂU CẢ NGÀY?<br />
        <span className="text-[#aa3000]">HÃY DÀNH 15 PHÚT ĐỂ THƯ GIÃN</span>
      </h1>

      <p className="text-base sm:text-lg text-[#43474e] mb-6 max-w-xl mx-auto leading-relaxed">
        Giải pháp thư giãn tại nhà, văn phòng và trên xe hơi dành cho người bận rộn. Xua tan đau mỏi cổ vai gáy và thắt lưng tức thì.
      </p>

      {/* Product Image Frame */}
      <div className="w-full relative rounded-2xl overflow-hidden soft-shadow mb-6 group border border-[#c4c6cf]/30 bg-white">
        <img
          className="w-full h-auto object-cover aspect-4/3 max-h-[460px] mx-auto transform group-hover:scale-102 transition-transform duration-500"
          alt="Đệm massage toàn thân đa năng S-Mall cao cấp"
          src={PRODUCT_IMAGES.hero}
          loading="eager"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#002045]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <a
            href="#simulator"
            className="text-white bg-[#aa3000] hover:bg-[#d43f00] px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg"
          >
            <span>Trải nghiệm Remote Ảo</span>
            <span className="material-symbols-outlined text-sm">tune</span>
          </a>
        </div>

        {/* Hot Feature Pill */}
        <div className="absolute top-4 left-4 bg-[#002045]/90 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Công nghệ Bi Lăn 3D & Sưởi Hồng Ngoại</span>
        </div>
      </div>

      {/* Pricing Module */}
      <div className="flex flex-col items-center gap-1 mb-6 bg-white border border-[#e5e9eb] py-4 px-6 rounded-2xl w-full max-w-md soft-shadow">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full mb-1">
          <span>Tiết kiệm 300.000đ hôm nay</span>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl sm:text-4xl font-extrabold text-[#aa3000]">1.685.000đ</span>
          <span className="text-base sm:text-lg text-[#74777f] line-through font-medium">1.985.000đ</span>
        </div>
        <p className="text-xs text-[#43474e] mt-1">
          + Phí giao hàng: <span className="font-semibold">20.000đ</span> (Toàn quốc) | <span className="text-emerald-700 font-bold">FREESHIP từ 2 đệm</span>
        </p>
      </div>

      {/* Big Action CTA */}
      <a
        id="hero-order-btn"
        className="w-full max-w-sm py-4 px-6 bg-[#aa3000] hover:bg-[#d43f00] text-white rounded-xl font-extrabold text-lg flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg animate-pulse-subtle"
        href="#order"
      >
        <span>ĐẶT HÀNG NGAY HÔM NAY</span>
        <ShoppingCart className="w-5 h-5" />
      </a>

      {/* Trust guarantees badges */}
      <div className="flex justify-center gap-3 sm:gap-4 mt-6 flex-wrap">
        <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#c4c6cf]/60 bg-white soft-shadow text-xs font-semibold text-[#181c1e]">
          <ShieldCheck className="w-4 h-4 text-[#aa3000]" />
          <span>Bảo hành chính hãng 12 tháng</span>
        </div>
        <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#c4c6cf]/60 bg-white soft-shadow text-xs font-semibold text-[#181c1e]">
          <Truck className="w-4 h-4 text-[#aa3000]" />
          <span>Giao hàng toàn quốc 2-3 ngày</span>
        </div>
        <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#c4c6cf]/60 bg-white soft-shadow text-xs font-semibold text-[#181c1e]">
          <RotateCcw className="w-4 h-4 text-[#aa3000]" />
          <span>Kiểm tra hàng trước khi nhận</span>
        </div>
      </div>
    </section>
  );
};

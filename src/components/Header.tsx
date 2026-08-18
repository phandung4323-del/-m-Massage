import React, { useState, useEffect } from 'react';
import { Sparkles, PhoneCall, ShoppingCart } from 'lucide-react';

export const Header: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top scroll progress indicator bar */}
      <div 
        id="scroll-progress-bar"
        className="fixed top-0 left-0 h-1 bg-[#aa3000] z-60 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <header className="bg-[#f7fafc]/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-[#c4c6cf]/40 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <a href="#hero" className="flex items-center gap-2 group">
            <span className="material-symbols-outlined text-[#002045] group-hover:text-[#aa3000] transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>
              spa
            </span>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#002045]">
                S-MALL <span className="text-[#aa3000]">MASSAGE</span>
              </span>
              <span className="text-[10px] uppercase font-semibold text-[#74777f] -mt-1 tracking-wider hidden sm:block">
                Chăm sóc sức khỏe gia đình
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-7">
            <a className="text-[#002045] font-semibold hover:text-[#aa3000] transition-colors duration-200" href="#hero">
              Trang chủ
            </a>
            <a className="text-[#43474e] font-medium hover:text-[#aa3000] transition-colors duration-200" href="#features">
              Tính năng
            </a>
            <a className="text-[#43474e] font-medium hover:text-[#aa3000] transition-colors duration-200" href="#simulator">
              Thử Remote
            </a>
            <a className="text-[#43474e] font-medium hover:text-[#aa3000] transition-colors duration-200" href="#specs">
              Thông số
            </a>
            <a className="text-[#43474e] font-medium hover:text-[#aa3000] transition-colors duration-200" href="#reviews">
              Đánh giá
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:0398636869"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#002045]/20 text-[#002045] text-xs font-bold hover:bg-[#002045]/5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#aa3000]" />
              <span>Hotline: 0398.636.869</span>
            </a>

            <a
              id="header-cta-btn"
              href="#order"
              className="px-4 py-2 bg-[#aa3000] text-white rounded-lg text-sm font-bold flex items-center gap-1.5 hover:bg-[#d43f00] transition-all shadow-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>ĐẶT HÀNG</span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

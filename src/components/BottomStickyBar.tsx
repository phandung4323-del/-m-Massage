import React, { useState, useEffect } from 'react';
import { ShoppingCart, PhoneCall, ArrowUp } from 'lucide-react';

export const BottomStickyBar: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Action Buttons: Hotline and Scroll to Top */}
      <div className="fixed bottom-24 right-4 z-40 flex flex-col gap-2.5">
        <a
          href="tel:0398636869"
          className="w-11 h-11 rounded-full bg-[#002045] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="Gọi Hotline 0398.636.869"
        >
          <PhoneCall className="w-5 h-5 text-[#ffb59e]" />
        </a>

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-white text-[#002045] border border-[#c4c6cf]/50 flex items-center justify-center shadow-lg hover:bg-[#f1f4f6] transition-transform cursor-pointer"
            title="Lên đầu trang"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Mobile Sticky Bar - Exactly as designed in the prompt */}
      <nav className="md:hidden bg-white fixed bottom-0 w-full z-50 rounded-t-2xl shadow-[0_-4px_20px_rgba(26,54,93,0.15)] flex items-center h-20 overflow-hidden border-t border-[#c4c6cf]/30">
        <div className="flex flex-1 items-center justify-center text-[#002045] font-bold flex-col h-full bg-[#f7fafc] border-r border-[#c4c6cf]/40">
          <span className="text-[11px] font-semibold text-[#74777f]">Tổng tiền</span>
          <span className="text-xl font-extrabold text-[#aa3000]">1.685.000đ</span>
        </div>
        <a
          id="mobile-bottom-order-btn"
          className="flex flex-1 items-center justify-center bg-[#aa3000] text-white h-full hover:bg-[#d43f00] transition-colors"
          href="#order"
        >
          <span className="text-base font-extrabold mr-2">ĐẶT HÀNG</span>
          <ShoppingCart className="w-5 h-5" />
        </a>
      </nav>
    </>
  );
};

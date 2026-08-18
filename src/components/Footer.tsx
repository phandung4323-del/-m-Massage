import React, { useState } from 'react';
import { ShieldCheck, Phone, MapPin, Lock } from 'lucide-react';
import { AdminOrderModal } from './AdminOrderModal';

export const Footer: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#e5e9eb] w-full border-t border-[#c4c6cf] flex flex-col items-center py-12 px-4 text-center pb-28 md:pb-12 text-[#43474e]">
        <div className="max-w-4xl mx-auto w-full">
          {/* Brand */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="material-symbols-outlined text-[#002045] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              spa
            </span>
            <h4 className="font-extrabold text-2xl text-[#002045] tracking-tight">
              S-MALL <span className="text-[#aa3000]">MASSAGE</span>
            </h4>
          </div>
          <p className="text-xs text-[#74777f] max-w-md mx-auto mb-6">
            Thương hiệu chuyên cung cấp các thiết bị chăm sóc sức khỏe, massage trị liệu hàng đầu cho gia đình, giới văn phòng và tài xế.
          </p>

          {/* Company Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-xs text-left bg-white p-5 rounded-2xl border border-[#c4c6cf]/40 soft-shadow">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#aa3000] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#1a365d]">Địa chỉ trụ sở:</p>
                <p className="text-[#43474e]">Tòa nhà S-Mall Center, Cầu Giấy, Hà Nội & Quận 1, TP. Hồ Chí Minh</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-[#aa3000] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#1a365d]">Hotline CSKH (24/7):</p>
                <p className="text-[#43474e] font-bold text-[#aa3000]">
                  <a href="tel:0398636869" className="hover:underline">0398.636.869</a>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#aa3000] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#1a365d]">Cam kết chất lượng:</p>
                <p className="text-[#43474e]">Bảo hành 12 tháng chính hãng. Đổi mới 30 ngày nếu phát sinh lỗi kỹ thuật.</p>
              </div>
            </div>
          </div>

          {/* Policies Links */}
          <div className="flex justify-center flex-wrap items-center gap-4 sm:gap-6 mb-6 text-xs font-medium text-[#74777f]">
            <a className="hover:text-[#aa3000] transition-colors" href="#hero">
              Chính sách bảo mật
            </a>
            <a className="hover:text-[#aa3000] transition-colors" href="#hero">
              Điều khoản dịch vụ
            </a>
            <a className="hover:text-[#aa3000] transition-colors" href="#hero">
              Chính sách đổi trả & hoàn tiền
            </a>
          </div>

          <p className="text-xs text-[#74777f]">
            © 2026 S-MALL. Bản quyền thuộc về Công ty TNHH Thiết Bị Sức Khỏe S-Mall Việt Nam.
          </p>
        </div>
      </footer>

      <AdminOrderModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </>
  );
};

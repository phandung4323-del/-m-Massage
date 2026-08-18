import React from 'react';
import { CheckCircle, PhoneCall, Package, Home, X } from 'lucide-react';
import { OrderFormData } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  orderData: OrderFormData | null;
  totalPrice: number;
  orderCode: string;
}

export const OrderSuccessModal: React.FC<Props> = ({
  isOpen,
  onClose,
  orderData,
  totalPrice,
  orderCode,
}) => {
  if (!isOpen || !orderData) return null;

  return (
    <div className="fixed inset-0 z-70 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-[#c4c6cf]/40 animate-fadeIn">
        {/* Header with success icon */}
        <div className="bg-gradient-to-r from-[#002045] to-[#1a365d] p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-3 shadow-lg">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-extrabold">ĐẶT HÀNG THÀNH CÔNG!</h3>
          <p className="text-xs text-[#adc7f7] mt-1">
            Cảm ơn quý khách đã tin tưởng lựa chọn Đệm Massage S-MALL
          </p>
        </div>

        {/* Order Details Receipt */}
        <div className="p-6 space-y-4 text-xs sm:text-sm">
          <div className="bg-[#f1f4f6] p-4 rounded-2xl border border-[#e0e3e5] space-y-2">
            <div className="flex justify-between">
              <span className="text-[#74777f]">Mã đơn hàng:</span>
              <span className="font-mono font-bold text-[#aa3000]">{orderCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#74777f]">Người nhận:</span>
              <span className="font-bold text-[#181c1e]">{orderData.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#74777f]">Số điện thoại:</span>
              <span className="font-bold text-[#181c1e]">{orderData.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#74777f]">Địa chỉ nhận hàng:</span>
              <span className="font-bold text-[#181c1e] text-right max-w-[220px]">
                {orderData.address}, {orderData.city}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#74777f]">Thanh toán:</span>
              <span className="font-bold text-emerald-700">
                {orderData.paymentMethod === 'cod' ? 'Thanh toán khi nhận (COD)' : 'Chuyển khoản ngân hàng'}
              </span>
            </div>
            <div className="pt-2 border-t border-[#c4c6cf]/40 flex justify-between items-baseline">
              <span className="font-bold text-[#181c1e]">Tổng thanh toán:</span>
              <span className="text-lg font-extrabold text-[#aa3000]">
                {totalPrice.toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-amber-900 text-xs flex items-start gap-2.5">
            <Package className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Nhân viên S-Mall sẽ liên hệ xác nhận trong 15 phút:</p>
              <p className="mt-0.5">Thời gian nhận hàng dự kiến từ 2-3 ngày. Quý khách được mở hộp cắm điện thử máy trước khi thanh toán.</p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-[#002045] hover:bg-[#1a365d] text-white rounded-xl font-bold text-xs transition-colors text-center cursor-pointer"
            >
              Tiếp tục xem trang
            </button>
            <a
              href="tel:0398636869"
              className="px-4 py-3 bg-[#f1f4f6] hover:bg-[#e0e3e5] text-[#002045] rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#aa3000]" />
              <span>0398.636.869</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

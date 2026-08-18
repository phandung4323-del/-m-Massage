import React, { useState } from 'react';
import {
  ShoppingCart,
  ShieldCheck,
  Truck,
  Check,
  QrCode,
  Banknote,
} from 'lucide-react';
import { PRICING_PACKAGES } from '../data/productData';
import { OrderFormData } from '../types';
import { OrderSuccessModal } from './OrderSuccessModal';
import { saveNewOrder } from '../services/orderStorage';
import { trackInitiateCheckout, trackPurchase } from '../services/pixelTracking';

export const OrderSection: React.FC = () => {
  const [selectedComboId, setSelectedComboId] = useState('single');
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    phone: '',
    address: '',
    city: 'Hà Nội',
    district: '',
    quantity: 1,
    comboId: 'single',
    note: '',
    paymentMethod: 'cod',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<OrderFormData | null>(null);
  const [orderCode, setOrderCode] = useState('');

  const currentCombo = PRICING_PACKAGES.find((p) => p.id === selectedComboId) || PRICING_PACKAGES[0];
  const finalPrice = currentCombo.price + currentCombo.shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ nhận hàng!');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedCode = `SM-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderCode(generatedCode);
      const currentOrderData = { ...formData, comboId: selectedComboId };
      setSubmittedOrder(currentOrderData);
      // Save order to persistent storage
      saveNewOrder(currentOrderData, generatedCode, currentCombo.title, finalPrice);
      // Track conversion in Facebook Pixel & TikTok Pixel
      trackPurchase(generatedCode, currentCombo.title, finalPrice, formData.quantity || 1);
      setIsSubmitting(false);
      setOrderSuccess(true);
    }, 500);
  };

  return (
    <section className="py-14 sm:py-20 px-4 bg-[#f1f4f6] border-t border-[#e0e3e5]" id="order">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[#aa3000] font-bold text-xs uppercase tracking-wider mb-2 block">
            Đặt mua trực tiếp từ nhà phân phối chính hãng
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002045]">
            ĐẶT HÀNG NHẬN ƯU ĐÃI NGAY HÔM NAY
          </h2>
          <p className="text-xs sm:text-sm text-[#43474e] mt-2 max-w-lg mx-auto">
            Cam kết 100% hàng chính hãng S-Mall. Kiểm tra hàng và thử máy trước khi thanh toán.
          </p>
        </div>

        {/* Combos Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {PRICING_PACKAGES.map((pkg) => {
            const isSelected = selectedComboId === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => {
                  setSelectedComboId(pkg.id);
                  trackInitiateCheckout(pkg.title, pkg.price + pkg.shippingFee);
                }}
                className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                  isSelected
                    ? 'border-[#aa3000] bg-white soft-shadow-lg scale-102'
                    : 'border-[#e0e3e5] bg-white/70 hover:border-[#aa3000]/40'
                }`}
              >
                {pkg.tag && (
                  <span
                    className={`absolute -top-3 right-4 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                      isSelected ? 'bg-[#aa3000] text-white shadow-sm' : 'bg-[#002045] text-white'
                    }`}
                  >
                    {pkg.tag}
                  </span>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-[#aa3000] bg-[#aa3000]' : 'border-[#c4c6cf]'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                    </div>
                    <h3 className="font-extrabold text-sm text-[#1a365d]">{pkg.title}</h3>
                  </div>

                  <div className="my-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-[#aa3000]">
                        {pkg.price.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-[#74777f] line-through font-medium">
                        {pkg.originalPrice.toLocaleString('vi-VN')}đ
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        Giảm {pkg.discountPercent}%
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#43474e] leading-snug mb-3">{pkg.description}</p>
                </div>

                <div className="pt-3 border-t border-[#e0e3e5] flex items-center justify-between text-[11px]">
                  <span className="text-[#74777f]">Phí ship:</span>
                  <span className="font-bold text-[#181c1e]">
                    {pkg.shippingFee === 0 ? 'MIỄN PHÍ SHIP' : `${pkg.shippingFee.toLocaleString('vi-VN')}đ`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 soft-shadow-lg border border-[#c4c6cf]/40">
          <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="text-lg font-extrabold text-[#002045] flex items-center gap-2 pb-3 border-b border-[#e0e3e5]">
              <ShoppingCart className="w-5 h-5 text-[#aa3000]" />
              <span>Thông Tin Người Nhận Hàng</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1a365d] mb-1">
                  Họ và tên của bạn <span className="text-[#ba1a1a]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full p-3 text-sm rounded-xl border border-[#c4c6cf] focus:outline-[#aa3000] focus:ring-2 focus:ring-[#ffdbd0] bg-[#f7fafc]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1a365d] mb-1">
                  Số điện thoại nhận hàng <span className="text-[#ba1a1a]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0912 345 678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 text-sm rounded-xl border border-[#c4c6cf] focus:outline-[#aa3000] focus:ring-2 focus:ring-[#ffdbd0] bg-[#f7fafc]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1a365d] mb-1">
                  Tỉnh / Thành phố <span className="text-[#ba1a1a]">*</span>
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full p-3 text-sm rounded-xl border border-[#c4c6cf] focus:outline-[#aa3000] focus:ring-2 focus:ring-[#ffdbd0] bg-[#f7fafc]"
                >
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Hải Phòng">Hải Phòng</option>
                  <option value="Cần Thơ">Cần Thơ</option>
                  <option value="Bình Dương">Bình Dương</option>
                  <option value="Đồng Nai">Đồng Nai</option>
                  <option value="Quảng Ninh">Quảng Ninh</option>
                  <option value="Tỉnh thành khác">Tỉnh thành khác...</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1a365d] mb-1">
                  Địa chỉ chi tiết (Số nhà, Tên đường, Phường/Xã) <span className="text-[#ba1a1a]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: 123 Đường Nguyễn Trãi, Phường 2"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-3 text-sm rounded-xl border border-[#c4c6cf] focus:outline-[#aa3000] focus:ring-2 focus:ring-[#ffdbd0] bg-[#f7fafc]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1a365d] mb-1">
                Ghi chú thêm cho người giao hàng (Tùy chọn)
              </label>
              <input
                type="text"
                placeholder="Ví dụ: Giao vào giờ hành chính, gọi trước 15 phút..."
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                className="w-full p-3 text-sm rounded-xl border border-[#c4c6cf] focus:outline-[#aa3000] focus:ring-2 focus:ring-[#ffdbd0] bg-[#f7fafc]"
              />
            </div>

            {/* Payment Method Selector */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-[#1a365d] mb-2">
                Hình thức thanh toán:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer flex items-center gap-3 transition-colors ${
                    formData.paymentMethod === 'cod'
                      ? 'border-[#aa3000] bg-[#ffdbd0]/20'
                      : 'border-[#e0e3e5] bg-[#f7fafc]'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-[#aa3000]" />
                  <div>
                    <p className="font-bold text-xs text-[#1a365d]">Thanh toán khi nhận hàng (COD)</p>
                    <p className="text-[10px] text-[#74777f]">Kiểm tra hàng cắm điện thử ưng ý mới trả tiền</p>
                  </div>
                </label>

                <label
                  onClick={() => setFormData({ ...formData, paymentMethod: 'banking' })}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer flex items-center gap-3 transition-colors ${
                    formData.paymentMethod === 'banking'
                      ? 'border-[#aa3000] bg-[#ffdbd0]/20'
                      : 'border-[#e0e3e5] bg-[#f7fafc]'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-[#002045]" />
                  <div>
                    <p className="font-bold text-xs text-[#1a365d]">Chuyển khoản Ngân hàng / Quét QR</p>
                    <p className="text-[10px] text-[#74777f]">Hỗ trợ quét mã VietQR tự động</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Order Summary Receipt Box */}
            <div className="p-4 rounded-2xl bg-[#f7fafc] border border-[#e0e3e5] space-y-1.5 text-xs sm:text-sm">
              <div className="flex justify-between text-[#43474e]">
                <span>Gói đã chọn:</span>
                <span className="font-bold text-[#1a365d]">{currentCombo.title}</span>
              </div>
              <div className="flex justify-between text-[#43474e]">
                <span>Giá sản phẩm:</span>
                <span>{currentCombo.price.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="flex justify-between text-[#43474e]">
                <span>Phí vận chuyển:</span>
                <span className={currentCombo.shippingFee === 0 ? 'text-emerald-700 font-bold' : ''}>
                  {currentCombo.shippingFee === 0 ? 'MIỄN PHÍ' : `${currentCombo.shippingFee.toLocaleString('vi-VN')}đ`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#c4c6cf]/40 flex justify-between items-baseline">
                <span className="font-extrabold text-[#002045] text-sm sm:text-base">TỔNG CỘNG THANH TOÁN:</span>
                <span className="text-xl sm:text-2xl font-extrabold text-[#aa3000]">
                  {finalPrice.toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              id="confirm-order-button"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-[#aa3000] hover:bg-[#d43f00] disabled:opacity-50 text-white rounded-2xl font-extrabold text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Đang ghi nhận đơn hàng...</span>
                </div>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>XÁC NHẬN ĐẶT HÀNG NGAY</span>
                </>
              )}
            </button>

            {/* Trust commitments */}
            <div className="flex justify-center items-center gap-4 text-xs text-[#74777f] pt-1 flex-wrap">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Bảo hành 12 tháng chính hãng
              </span>
              <span className="flex items-center gap-1">
                <Truck className="w-4 h-4 text-emerald-600" />
                Giao hàng toàn quốc 2-3 ngày
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <OrderSuccessModal
        isOpen={orderSuccess}
        onClose={() => setOrderSuccess(false)}
        orderData={submittedOrder}
        totalPrice={finalPrice}
        orderCode={orderCode}
      />
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import {
  X,
  ShoppingBag,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Banknote,
  Download,
  Trash2,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  PlusCircle,
  Search,
  DollarSign,
} from 'lucide-react';
import { SavedOrder, OrderStatus } from '../types';
import {
  getStoredOrders,
  updateOrderStatus,
  deleteStoredOrder,
  exportOrdersToCsv,
  saveNewOrder,
} from '../services/orderStorage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminOrderModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const loadOrders = () => {
    setOrders(getStoredOrders());
  };

  useEffect(() => {
    if (isOpen) {
      loadOrders();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdate = () => loadOrders();
    window.addEventListener('orders_updated', handleUpdate);
    return () => window.removeEventListener('orders_updated', handleUpdate);
  }, []);

  if (!isOpen) return null;

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    loadOrders();
  };

  const handleDelete = (orderId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      deleteStoredOrder(orderId);
      loadOrders();
    }
  };

  const handleCreateSampleOrder = () => {
    const sampleNames = ['Nguyễn Văn Nam', 'Trần Thị Mai', 'Lê Hoàng Long', 'Phạm Minh Tuấn'];
    const samplePhones = ['0988123456', '0912345678', '0398636869', '0909876543'];
    const sampleCities = ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng'];
    const randomIdx = Math.floor(Math.random() * sampleNames.length);

    saveNewOrder(
      {
        fullName: sampleNames[randomIdx],
        phone: samplePhones[randomIdx],
        address: `${12 + Math.floor(Math.random() * 80)} Đường Nguyễn Trãi, Phường 4`,
        city: sampleCities[randomIdx],
        district: '',
        quantity: 1,
        comboId: 'single',
        note: 'Gọi điện trước khi giao hàng',
        paymentMethod: Math.random() > 0.5 ? 'cod' : 'banking',
      },
      `SM-${Math.floor(100000 + Math.random() * 900000)}`,
      'COMBO 1: 1 Đệm Massage Toàn Thân S-MALL',
      1490000
    );
    loadOrders();
  };

  const filteredOrders = orders.filter((ord) => {
    const matchesKeyword =
      ord.fullName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      ord.phone.includes(searchKeyword) ||
      ord.orderCode.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      ord.address.toLowerCase().includes(searchKeyword.toLowerCase());

    const matchesStatus = statusFilter === 'all' || ord.status === statusFilter;
    return matchesKeyword && matchesStatus;
  });

  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Đã hủy' ? o.totalPrice : 0), 0);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Chờ xác nhận':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
            <Clock className="w-3 h-3" />
            Chờ xác nhận
          </span>
        );
      case 'Đã xác nhận':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
            <CheckCircle2 className="w-3 h-3" />
            Đã xác nhận
          </span>
        );
      case 'Đang giao hàng':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800">
            <Truck className="w-3 h-3" />
            Đang giao
          </span>
        );
      case 'Đã hoàn thành':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3 h-3" />
            Thành công
          </span>
        );
      case 'Đã hủy':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800">
            <XCircle className="w-3 h-3" />
            Đã hủy
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-90 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-[#c4c6cf]/40 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#002045] p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#ffdbd0] text-[#aa3000] flex items-center justify-center font-extrabold shadow-sm">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">Danh Sách Đơn Hàng Khách Đặt</h3>
              <p className="text-[11px] text-[#adc7f7]">
                Tổng cộng: <strong className="text-white font-bold">{orders.length} đơn hàng</strong> | Doanh số dự tính: <strong className="text-[#ffdbd0] font-bold">{totalRevenue.toLocaleString('vi-VN')} đ</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Search, Filter, Export, Sample */}
        <div className="p-4 bg-[#f7fafc] border-b border-[#e0e3e5] flex flex-wrap gap-2.5 items-center justify-between shrink-0">
          <div className="flex items-center gap-2 flex-1 min-w-[240px]">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#74777f] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm tên, SĐT, mã đơn, địa chỉ..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white text-xs rounded-xl border border-[#c4c6cf] focus:outline-[#aa3000]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-2 px-3 bg-white text-xs rounded-xl border border-[#c4c6cf] focus:outline-[#aa3000]"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="Chờ xác nhận">Chờ xác nhận</option>
              <option value="Đã xác nhận">Đã xác nhận</option>
              <option value="Đang giao hàng">Đang giao hàng</option>
              <option value="Đã hoàn thành">Đã hoàn thành</option>
              <option value="Đã hủy">Đã hủy</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={exportOrdersToCsv}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              title="Xuất file Excel / CSV để lưu trữ trên máy tính"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải file Excel / CSV</span>
            </button>

            <button
              type="button"
              onClick={handleCreateSampleOrder}
              className="px-3 py-2 bg-[#f1f4f6] hover:bg-[#e0e3e5] text-[#002045] rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
              title="Tạo thử một đơn hàng mẫu để kiểm tra giao diện"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#aa3000]" />
              <span>Tạo đơn mẫu</span>
            </button>
          </div>
        </div>

        {/* Order List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1 bg-[#f1f4f6]/50">
          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-[#e0e3e5] soft-shadow-sm">
              <ShoppingBag className="w-12 h-12 text-[#c4c6cf] mx-auto mb-3" />
              <h4 className="font-extrabold text-sm text-[#002045]">Chưa có đơn hàng nào phù hợp</h4>
              <p className="text-xs text-[#74777f] mt-1 max-w-sm mx-auto">
                Khi có khách điền thông tin và bấm "Xác Nhận Đặt Hàng" ở trang chủ, đơn hàng sẽ ngay lập tức xuất hiện tại bảng này.
              </p>
              <button
                type="button"
                onClick={handleCreateSampleOrder}
                className="mt-4 px-4 py-2 bg-[#aa3000] hover:bg-[#d43f00] text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Bấm để tạo đơn mẫu thử</span>
              </button>
            </div>
          ) : (
            filteredOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 sm:p-5 bg-white rounded-2xl border border-[#e0e3e5] soft-shadow-sm hover:border-[#aa3000]/30 transition-all space-y-3"
              >
                {/* Header row of order item */}
                <div className="flex items-start justify-between flex-wrap gap-2 pb-2 border-b border-[#e0e3e5]/70">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-extrabold text-xs sm:text-sm text-[#aa3000] bg-[#ffdbd0]/50 px-2.5 py-1 rounded-lg">
                      {ord.orderCode}
                    </span>
                    <span className="text-xs text-[#74777f] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {ord.createdAt}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {getStatusBadge(ord.status)}
                    <select
                      value={ord.status}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                      className="text-[11px] font-bold py-1 px-2 rounded-lg border border-[#c4c6cf] bg-white text-[#1a365d]"
                    >
                      <option value="Chờ xác nhận">Chờ xác nhận</option>
                      <option value="Đã xác nhận">Đã xác nhận</option>
                      <option value="Đang giao hàng">Đang giao hàng</option>
                      <option value="Đã hoàn thành">Đã hoàn thành</option>
                      <option value="Đã hủy">Đã hủy</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => handleDelete(ord.id)}
                      className="text-[#74777f] hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Xóa đơn hàng"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Customer Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  {/* Customer Info & Phone Call */}
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold text-[#74777f] uppercase tracking-wider">Khách hàng:</p>
                    <p className="font-extrabold text-[#002045] text-sm">{ord.fullName}</p>
                    <a
                      href={`tel:${ord.phone}`}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors"
                      title="Bấm để gọi trực tiếp"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{ord.phone} (Gọi ngay)</span>
                    </a>
                  </div>

                  {/* Delivery Address */}
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold text-[#74777f] uppercase tracking-wider">Địa chỉ giao hàng:</p>
                    <p className="text-[#181c1e] font-medium flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#aa3000] shrink-0 mt-0.5" />
                      <span>{ord.address}, {ord.city}</span>
                    </p>
                    {ord.note && ord.note !== 'Không có' && (
                      <p className="text-[11px] text-[#74777f] italic">Ghi chú: "{ord.note}"</p>
                    )}
                  </div>

                  {/* Product & Payment */}
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold text-[#74777f] uppercase tracking-wider">Sản phẩm đặt mua:</p>
                    <p className="font-bold text-[#1a365d]">{ord.comboTitle} (SL: {ord.quantity})</p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="flex items-center gap-1 text-[11px] text-[#74777f]">
                        {ord.paymentMethod === 'cod' ? (
                          <>
                            <Banknote className="w-3.5 h-3.5 text-[#aa3000]" />
                            <span>COD</span>
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-3.5 h-3.5 text-[#002045]" />
                            <span>Chuyển khoản QR</span>
                          </>
                        )}
                      </span>
                      <span className="font-extrabold text-sm text-[#aa3000]">
                        {ord.totalPrice.toLocaleString('vi-VN')} đ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f7fafc] border-t border-[#e0e3e5] flex justify-between items-center shrink-0">
          <p className="text-xs text-[#74777f]">
            Mọi dữ liệu được lưu an toàn trong trình duyệt của bạn. Bạn có thể xuất file Excel để lưu trữ định kỳ.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#002045] hover:bg-[#1a365d] text-white rounded-xl font-bold text-xs transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

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
  Lock,
  KeyRound,
  Send,
  ListOrdered,
  ShieldAlert,
  Target,
  Sparkles,
  Check,
  HelpCircle,
  Copy,
  Table,
  ExternalLink,
} from 'lucide-react';
import { SavedOrder, OrderStatus } from '../types';
import {
  getStoredOrders,
  updateOrderStatus,
  deleteStoredOrder,
  exportOrdersToCsv,
  saveNewOrder,
  getAdminPin,
  setAdminPin,
  getTelegramConfig,
  saveTelegramConfig,
  TelegramConfig,
  getGoogleSheetConfig,
  saveGoogleSheetConfig,
  sendGoogleSheetNotification,
  GoogleSheetConfig,
  resetAllToFactoryDefaults,
} from '../services/orderStorage';
import {
  getPixelConfig,
  savePixelConfig,
  PixelConfig,
  trackPurchase,
} from '../services/pixelTracking';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminOrderModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'orders' | 'googlesheet' | 'telegram' | 'pixel' | 'security'>('orders');

  // Google Sheets state
  const [googleSheetConfig, setGoogleSheetConfigState] = useState<GoogleSheetConfig>({
    webhookUrl: '',
    enabled: true,
  });
  const [sheetSavedNotice, setSheetSavedNotice] = useState<string | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);

  // Pixel Config State
  const [pixelConfig, setPixelConfigState] = useState<PixelConfig>({
    facebookPixelId: '',
    tiktokPixelId: '',
    googleTagId: '',
    enabled: true,
  });
  const [pixelSavedNotice, setPixelSavedNotice] = useState<string | null>(null);

  // Telegram state
  const [telegramConfig, setTelegramConfigState] = useState<TelegramConfig>({
    botToken: '',
    chatId: '',
    enabled: false,
  });
  const [telegramSavedNotice, setTelegramSavedNotice] = useState<string | null>(null);

  // Change PIN state
  const [newPin, setNewPin] = useState('');
  const [pinChangeNotice, setPinChangeNotice] = useState<string | null>(null);

  const loadOrders = () => {
    setOrders(getStoredOrders());
  };

  useEffect(() => {
    if (isOpen) {
      setGoogleSheetConfigState(getGoogleSheetConfig());
      setTelegramConfigState(getTelegramConfig());
      setPixelConfigState(getPixelConfig());
      if (isAuthenticated) {
        loadOrders();
      }
    } else {
      setPinError(false);
      setPinInput('');
    }
  }, [isOpen, isAuthenticated]);

  useEffect(() => {
    const handleUpdate = () => {
      if (isAuthenticated) loadOrders();
    };
    window.addEventListener('orders_updated', handleUpdate);
    return () => window.removeEventListener('orders_updated', handleUpdate);
  }, [isAuthenticated]);

  if (!isOpen) return null;

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = getAdminPin();
    if (pinInput.trim() === correctPin) {
      setIsAuthenticated(true);
      setPinError(false);
      loadOrders();
    } else {
      setPinError(true);
    }
  };

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

  const handleSaveGoogleSheet = (e: React.FormEvent) => {
    e.preventDefault();
    saveGoogleSheetConfig(googleSheetConfig);
    setSheetSavedNotice('Đã lưu cấu hình Google Sheets thành công!');
    setTimeout(() => setSheetSavedNotice(null), 4000);
  };

  const handleTestGoogleSheet = async () => {
    if (!googleSheetConfig.webhookUrl.trim()) {
      alert('Vui lòng dán đường link Web App URL của Google Apps Script trước khi test!');
      return;
    }
    const sampleTestOrder: SavedOrder = {
      id: 'test_sheet_' + Date.now(),
      orderCode: 'TEST-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
      fullName: 'Khách Thử Nghiệm Google Sheets',
      phone: '0988888888',
      address: '123 Đường Số 1, Phường 2',
      city: 'Hà Nội',
      comboTitle: 'COMBO 1: 1 Đệm Massage Toàn Thân S-MALL',
      quantity: 1,
      totalPrice: 1490000,
      paymentMethod: 'cod',
      note: 'Đơn thử nghiệm kiểm tra đồng bộ Google Sheet',
      status: 'Chờ xác nhận',
    };

    saveGoogleSheetConfig(googleSheetConfig);
    await sendGoogleSheetNotification(sampleTestOrder);
    alert('Đã gửi 1 dòng đơn hàng thử nghiệm sang Google Sheets! Hãy mở file Google Sheet của bạn để xem kết quả xuất hiện ngay.');
  };

  const googleAppsScriptCode = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Tự động tạo tiêu đề các cột nếu trang tính mới tinh
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Thời Gian",
        "Mã Đơn",
        "Họ Tên Khách",
        "Số Điện Thoại",
        "Địa Chỉ",
        "Tỉnh / TP",
        "Sản Phẩm Đặt",
        "Số Lượng",
        "Tổng Tiền",
        "Thanh Toán",
        "Ghi Chú",
        "Trạng Thái"
      ]);
      sheet.getRange(1, 1, 1, 12).setFontWeight("bold").setBackground("#002045").setFontColor("#ffffff");
    }
    
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.createdAt || new Date().toLocaleString("vi-VN"),
      data.orderCode || "",
      data.fullName || "",
      "'" + (data.phone || ""),
      data.address || "",
      data.city || "",
      data.comboTitle || "",
      data.quantity || 1,
      Number(data.totalPrice || 0).toLocaleString("vi-VN") + " đ",
      data.paymentMethod || "",
      data.note || "",
      data.status || "Chờ xác nhận"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const copyScriptToClipboard = () => {
    navigator.clipboard.writeText(googleAppsScriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleSavePixel = (e: React.FormEvent) => {
    e.preventDefault();
    savePixelConfig(pixelConfig);
    setPixelSavedNotice('Đã lưu và kích hoạt mã Pixel thành công! Hệ thống đang tự động theo dõi.');
    setTimeout(() => setPixelSavedNotice(null), 4000);
  };

  const handleTestPixelPurchase = () => {
    if (!pixelConfig.facebookPixelId && !pixelConfig.tiktokPixelId) {
      alert('Vui lòng nhập Facebook Pixel ID trước khi test sự kiện!');
      return;
    }
    trackPurchase('TEST-ORDER-123', 'COMBO 1: 1 Đệm Massage Toàn Thân S-MALL', 1490000, 1);
    alert('Đã gửi sự kiện Test Purchase (Mua hàng - 1.490.000đ) sang Facebook / TikTok Pixel! Hãy kiểm tra công cụ Meta Pixel Helper hoặc Trình quản lý sự kiện Facebook.');
  };

  const handleSaveTelegram = (e: React.FormEvent) => {
    e.preventDefault();
    saveTelegramConfig(telegramConfig);
    setTelegramSavedNotice('Đã lưu cấu hình Telegram thành công!');
    setTimeout(() => setTelegramSavedNotice(null), 3000);
  };

  const handleTestTelegram = async () => {
    if (!telegramConfig.botToken || !telegramConfig.chatId) {
      alert('Vui lòng nhập Bot Token và Chat ID trước khi test!');
      return;
    }
    try {
      const url = `https://api.telegram.org/bot${telegramConfig.botToken.trim()}/sendMessage`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramConfig.chatId.trim(),
          text: '🔔 <b>TEST THÀNH CÔNG!</b>\nHệ thống thông báo đơn hàng S-Mall đã kết nối với Telegram của bạn.',
          parse_mode: 'HTML',
        }),
      });
      if (res.ok) {
        alert('Đã gửi tin nhắn test thành công vào Telegram của bạn!');
      } else {
        alert('Lỗi: Không gửi được tin nhắn. Vui lòng kiểm tra lại Bot Token hoặc Chat ID.');
      }
    } catch (e: any) {
      alert(`Lỗi kết nối Telegram: ${e.message}`);
    }
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPin.trim() || newPin.length < 4) {
      alert('Mật mã PIN phải có ít nhất 4 ký tự!');
      return;
    }
    setAdminPin(newPin.trim());
    setPinChangeNotice('Đã cập nhật mật mã PIN mới!');
    setNewPin('');
    setTimeout(() => setPinChangeNotice(null), 3000);
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

  const directPixelHtmlCode = `<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixelConfig.facebookPixelId || 'YOUR_PIXEL_ID'}');
fbq('track', 'PageView');
</script>
<!-- End Meta Pixel Code -->`;

  return (
    <div className="fixed inset-0 z-90 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-[#c4c6cf]/40 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#002045] p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#ffdbd0] text-[#aa3000] flex items-center justify-center font-extrabold shadow-sm">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">Khu Vực Quản Trị Đơn Hàng & Chạy Quảng Cáo</h3>
              <p className="text-[11px] text-[#adc7f7]">Chỉ chủ cửa hàng có mật mã mới truy cập được</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Verification Screen if not authenticated */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center bg-[#f7fafc] space-y-6 flex-1 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-3xl bg-[#002045] text-[#ffdbd0] flex items-center justify-center shadow-lg">
              <KeyRound className="w-8 h-8" />
            </div>

            <div className="max-w-md space-y-2">
              <h4 className="text-lg font-extrabold text-[#002045]">Nhập Mật Mã Quản Trị (PIN)</h4>
              <p className="text-xs text-[#74777f]">
                Để bảo mật thông tin khách hàng và cấu hình chạy quảng cáo, vui lòng nhập mã PIN quản trị viên.
                <br />
                <span className="text-[#aa3000] font-bold">(Mật mã mặc định ban đầu: 8888)</span>
              </p>
            </div>

            <form onSubmit={handleVerifyPin} className="w-full max-w-xs space-y-3">
              <div>
                <input
                  type="password"
                  autoFocus
                  placeholder="Nhập mã PIN (VD: 8888)"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  className={`w-full py-3 px-4 text-center text-lg font-mono tracking-widest rounded-2xl border-2 focus:outline-none transition-all ${
                    pinError
                      ? 'border-rose-500 bg-rose-50 text-rose-800'
                      : 'border-[#c4c6cf] focus:border-[#aa3000] bg-white'
                  }`}
                />
                {pinError && (
                  <p className="text-xs font-bold text-rose-600 mt-1.5 flex items-center justify-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Mã PIN không chính xác! Vui lòng thử lại.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#aa3000] hover:bg-[#d43f00] text-white rounded-2xl font-extrabold text-sm shadow-md transition-colors cursor-pointer"
              >
                MỞ KHÓA QUẢN TRỊ
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <>
            {/* Tab Navigation */}
            <div className="flex border-b border-[#e0e3e5] bg-[#f7fafc] px-4 pt-3 gap-1 sm:gap-2 shrink-0 overflow-x-auto">
              <button
                onClick={() => setActiveTab('orders')}
                className={`pb-2.5 px-3 text-xs font-extrabold flex items-center gap-1.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'orders'
                    ? 'border-[#aa3000] text-[#aa3000]'
                    : 'border-transparent text-[#74777f] hover:text-[#002045]'
                }`}
              >
                <ListOrdered className="w-4 h-4" />
                <span>Danh Sách Đơn ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('googlesheet')}
                className={`pb-2.5 px-3 text-xs font-extrabold flex items-center gap-1.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'googlesheet'
                    ? 'border-[#aa3000] text-[#aa3000]'
                    : 'border-transparent text-[#74777f] hover:text-[#002045]'
                }`}
              >
                <Table className="w-4 h-4 text-emerald-600" />
                <span>Đồng Bộ Google Sheets</span>
              </button>

              <button
                onClick={() => setActiveTab('telegram')}
                className={`pb-2.5 px-3 text-xs font-extrabold flex items-center gap-1.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'telegram'
                    ? 'border-[#aa3000] text-[#aa3000]'
                    : 'border-transparent text-[#74777f] hover:text-[#002045]'
                }`}
              >
                <Send className="w-4 h-4 text-blue-500" />
                <span>Bắn Đơn Telegram</span>
              </button>

              <button
                onClick={() => setActiveTab('pixel')}
                className={`pb-2.5 px-3 text-xs font-extrabold flex items-center gap-1.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'pixel'
                    ? 'border-[#aa3000] text-[#aa3000]'
                    : 'border-transparent text-[#74777f] hover:text-[#002045]'
                }`}
              >
                <Target className="w-4 h-4 text-indigo-600" />
                <span>Cài Facebook / TikTok Pixel</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`pb-2.5 px-3 text-xs font-extrabold flex items-center gap-1.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'security'
                    ? 'border-[#aa3000] text-[#aa3000]'
                    : 'border-transparent text-[#74777f] hover:text-[#002045]'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                <span>Đổi Mã PIN</span>
              </button>
            </div>

            {/* TAB 1: ORDER MANAGEMENT */}
            {activeTab === 'orders' && (
              <>
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
                      <span>Tải file Excel</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCreateSampleOrder}
                      className="px-3 py-2 bg-[#f1f4f6] hover:bg-[#e0e3e5] text-[#002045] rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      title="Tạo thử một đơn hàng mẫu"
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
                      <h4 className="font-extrabold text-sm text-[#002045]">Chưa có đơn hàng nào</h4>
                      <p className="text-xs text-[#74777f] mt-1 max-w-sm mx-auto">
                        Khi có khách điền thông tin và bấm "Xác Nhận Đặt Hàng" ở trang chủ, đơn hàng sẽ ngay lập tức xuất hiện tại bảng này.
                      </p>
                    </div>
                  ) : (
                    filteredOrders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-4 sm:p-5 bg-white rounded-2xl border border-[#e0e3e5] soft-shadow-sm hover:border-[#aa3000]/30 transition-all space-y-3"
                      >
                        {/* Header row */}
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
              </>
            )}

            {/* TAB: GOOGLE SHEETS SYNC */}
            {activeTab === 'googlesheet' && (
              <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-[#43474e]">
                {/* Banner */}
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-emerald-950 font-extrabold text-sm">
                    <Table className="w-5 h-5 text-emerald-700" />
                    <span>Đồng Bộ Đơn Hàng Tự Động Về Google Sheets (Bảng Tính Google)</span>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    Mỗi khi có khách hàng đặt hàng ở bất kỳ đâu, hệ thống sẽ <strong>tự động ghi thêm 1 dòng mới vào file Google Sheet của bạn</strong> với đầy đủ: Thời gian, Mã đơn, Tên khách, Số điện thoại, Địa chỉ, Sản phẩm, Tổng tiền, Hình thức thanh toán và Ghi chú.
                  </p>
                </div>

                {/* Form URL */}
                <form onSubmit={handleSaveGoogleSheet} className="space-y-4 max-w-2xl">
                  <div className="flex items-center gap-2 pb-1">
                    <input
                      type="checkbox"
                      id="sheet-enabled"
                      checked={googleSheetConfig.enabled}
                      onChange={(e) => setGoogleSheetConfigState({ ...googleSheetConfig, enabled: e.target.checked })}
                      className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                    />
                    <label htmlFor="sheet-enabled" className="font-bold text-xs text-[#002045] cursor-pointer">
                      Bật tính năng tự động ghi đơn hàng vào Google Sheets
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1a365d] mb-1">
                      Đường dẫn Google Apps Script Web App URL (Webhook URL):
                    </label>
                    <input
                      type="url"
                      required={googleSheetConfig.enabled}
                      placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                      value={googleSheetConfig.webhookUrl}
                      onChange={(e) => setGoogleSheetConfigState({ ...googleSheetConfig, webhookUrl: e.target.value })}
                      className="w-full p-2.5 text-xs rounded-xl border border-[#c4c6cf] font-mono bg-[#f7fafc] focus:outline-emerald-600"
                    />
                    <p className="text-[11px] text-[#74777f] mt-1">
                      Dán đường link Web App bạn nhận được sau khi Triển khai Apps Script ở bên dưới.
                    </p>
                  </div>

                  <div className="flex items-center flex-wrap gap-3 pt-1">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <Check className="w-4 h-4" />
                      <span>Lưu Cấu Hình Google Sheets</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleTestGoogleSheet}
                      className="px-4 py-2.5 bg-[#002045] hover:bg-[#1a365d] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Gửi Thử 1 Đơn Mẫu Vào Sheet</span>
                    </button>
                  </div>

                  {sheetSavedNotice && (
                    <p className="text-xs font-bold text-emerald-900 bg-emerald-100 border border-emerald-300 p-3 rounded-xl">
                      ✓ {sheetSavedNotice}
                    </p>
                  )}
                </form>

                {/* Step-by-step instructions */}
                <div className="border-t border-[#e0e3e5] pt-5 space-y-4">
                  <h4 className="font-extrabold text-sm text-[#002045] flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-600" />
                    <span>Hướng Dẫn 3 Phút Để Tạo & Kết Nối Google Sheet</span>
                  </h4>

                  <div className="space-y-3 text-xs leading-relaxed text-[#43474e]">
                    <div className="p-3.5 bg-[#f7fafc] rounded-xl border border-[#e0e3e5] space-y-1">
                      <p className="font-bold text-[#002045]">
                        Bước 1: Tạo Google Sheet & Mở Apps Script
                      </p>
                      <p className="text-[#74777f]">
                        Vào <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold underline inline-flex items-center gap-0.5">Google Sheets mới <ExternalLink className="w-3 h-3 inline" /></a> → Trên thanh menu chọn <strong>Tiện ích mở rộng (Extensions)</strong> → Chọn <strong>Apps Script</strong>.
                      </p>
                    </div>

                    <div className="p-3.5 bg-[#f7fafc] rounded-xl border border-[#e0e3e5] space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-[#002045]">
                          Bước 2: Dán Đoạn Mã Google Apps Script Này
                        </p>
                        <button
                          type="button"
                          onClick={copyScriptToClipboard}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedScript ? 'Đã sao chép!' : 'Sao chép mã'}</span>
                        </button>
                      </div>
                      <p className="text-[#74777f]">Xóa sạch mã có sẵn trong file <code>Code.gs</code> và dán mã bên dưới vào:</p>
                      <pre className="p-3 bg-[#181c1e] text-emerald-300 rounded-xl text-[11px] font-mono overflow-x-auto max-h-48 border border-[#2d3133]">
                        {googleAppsScriptCode}
                      </pre>
                    </div>

                    <div className="p-3.5 bg-[#f7fafc] rounded-xl border border-[#e0e3e5] space-y-1.5">
                      <p className="font-bold text-[#002045]">
                        Bước 3: Triển khai (Deploy) Web App & Lấy Link
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-[#52575c]">
                        <li>Bấm nút <strong>Triển khai (Deploy)</strong> ở góc trên bên phải → Chọn <strong>Tùy chọn triển khai mới (New deployment)</strong>.</li>
                        <li>Bấm vào biểu tượng bánh răng bên cạnh "Chọn loại" → Chọn <strong>Ứng dụng web (Web app)</strong>.</li>
                        <li>Tại mục <strong>Thực thi dưới dạng (Execute as)</strong>: Chọn <strong>Tôi (Email của bạn)</strong>.</li>
                        <li>Tại mục <strong>Ai có quyền truy cập (Who has access)</strong>: Chọn <strong>Bất kỳ ai (Anyone)</strong>.</li>
                        <li>Bấm <strong>Triển khai (Deploy)</strong> → Chọn <em>Trao quyền truy cập (Authorize access)</em> → Sao chép đường link <strong>URL ứng dụng web (Web app URL)</strong> và dán vào ô nhập bên trên.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: FACEBOOK / TIKTOK PIXEL TRACKING CONFIG */}
            {activeTab === 'pixel' && (
              <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-[#43474e]">
                {/* Banner */}
                <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-indigo-950 font-extrabold text-sm">
                    <Target className="w-5 h-5 text-indigo-600" />
                    <span>Cài Đặt Mã Theo Dõi Facebook Pixel / TikTok Pixel Chạy Quảng Cáo</span>
                  </div>
                  <p className="text-xs text-indigo-900 leading-relaxed">
                    Hệ thống đã được lập trình sẵn để <strong>tự động bắn các sự kiện chuẩn của Facebook & TikTok</strong>:
                    <br />
                    • <code>PageView</code> (Xem trang web)
                    <br />
                    • <code>InitiateCheckout</code> (Bấm chọn Combo / Bắt đầu đặt hàng)
                    <br />
                    • <code>Purchase</code> (Khách hoàn tất đơn hàng + Giá trị đơn hàng thực tế theo VNĐ để tối ưu chi phí Ads)
                  </p>
                </div>

                {/* Pixel Form */}
                <form onSubmit={handleSavePixel} className="space-y-4 max-w-xl">
                  <div className="flex items-center gap-2 pb-2">
                    <input
                      type="checkbox"
                      id="pixel-enabled"
                      checked={pixelConfig.enabled}
                      onChange={(e) => setPixelConfigState({ ...pixelConfig, enabled: e.target.checked })}
                      className="w-4 h-4 accent-[#aa3000] rounded cursor-pointer"
                    />
                    <label htmlFor="pixel-enabled" className="font-bold text-xs text-[#002045] cursor-pointer">
                      Bật hệ thống theo dõi chuyển đổi Pixel tự động
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1a365d] mb-1">
                      1. Facebook Pixel ID (Meta Pixel ID):
                    </label>
                    <input
                      type="text"
                      placeholder="VD: 123456789012345 (Dãy 15-16 chữ số)"
                      value={pixelConfig.facebookPixelId}
                      onChange={(e) => setPixelConfigState({ ...pixelConfig, facebookPixelId: e.target.value })}
                      className="w-full p-2.5 text-xs rounded-xl border border-[#c4c6cf] font-mono bg-[#f7fafc]"
                    />
                    <p className="text-[11px] text-[#74777f] mt-1">
                      Lấy mã Pixel ID tại: <strong>Trình quản lý sự kiện Facebook (Meta Events Manager)</strong> → Chọn Nguồn dữ liệu (Pixel).
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1a365d] mb-1">
                      2. TikTok Pixel ID (Tùy chọn nếu chạy TikTok Ads):
                    </label>
                    <input
                      type="text"
                      placeholder="VD: C9XXXXXXXXXXXXXXX"
                      value={pixelConfig.tiktokPixelId}
                      onChange={(e) => setPixelConfigState({ ...pixelConfig, tiktokPixelId: e.target.value })}
                      className="w-full p-2.5 text-xs rounded-xl border border-[#c4c6cf] font-mono bg-[#f7fafc]"
                    />
                  </div>

                  <div className="flex items-center flex-wrap gap-3 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#aa3000] hover:bg-[#d43f00] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <Check className="w-4 h-4" />
                      <span>Lưu & Kích Hoạt Pixel</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleTestPixelPurchase}
                      className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Gửi Sự Kiện Test (Purchase)</span>
                    </button>
                  </div>

                  {pixelSavedNotice && (
                    <p className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
                      ✓ {pixelSavedNotice}
                    </p>
                  )}
                </form>

                {/* Guide on how to verify pixel */}
                <div className="border-t border-[#e0e3e5] pt-5 space-y-3">
                  <h4 className="font-extrabold text-sm text-[#002045] flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#aa3000]" />
                    <span>Hướng Dẫn Kiểm Tra Pixel Đã Hoạt Động Chưa</span>
                  </h4>
                  <ol className="list-decimal pl-5 space-y-1.5 text-xs text-[#43474e] leading-relaxed">
                    <li>
                      Cài đặt tiện ích mở rộng <strong>Meta Pixel Helper</strong> trên trình duyệt Google Chrome.
                    </li>
                    <li>
                      Điền mã <strong>Facebook Pixel ID</strong> ở trên và bấm <strong>"Lưu & Kích Hoạt Pixel"</strong>.
                    </li>
                    <li>
                      F5 tải lại trang web hoặc bấm nút <strong>"Gửi Sự Kiện Test (Purchase)"</strong>, icon của Meta Pixel Helper trên Chrome sẽ sáng màu xanh lá cây và hiển thị sự kiện <code>PageView</code>, <code>InitiateCheckout</code> và <code>Purchase</code>.
                    </li>
                  </ol>
                </div>
              </div>
            )}

            {/* TAB 3: TELEGRAM NOTIFICATION */}
            {activeTab === 'telegram' && (
              <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-[#43474e]">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-blue-900 font-extrabold text-sm">
                    <Send className="w-4 h-4 text-blue-600" />
                    <span>Giải pháp chống cướp đơn 100%: Bắn tin nhắn về Telegram riêng</span>
                  </div>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    Khi khách vừa bấm đặt hàng, thông tin (Họ tên, SĐT, Địa chỉ, Giá tiền) sẽ <strong>ngay lập tức gửi vào ứng dụng Telegram trên điện thoại của bạn</strong>. Khách hàng hoặc đối thủ trên trang web hoàn toàn không thể xem được.
                  </p>
                </div>

                <form onSubmit={handleSaveTelegram} className="space-y-4 max-w-lg">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="telegram-enabled"
                      checked={telegramConfig.enabled}
                      onChange={(e) => setTelegramConfigState({ ...telegramConfig, enabled: e.target.checked })}
                      className="w-4 h-4 accent-[#aa3000] rounded cursor-pointer"
                    />
                    <label htmlFor="telegram-enabled" className="font-bold text-xs text-[#002045] cursor-pointer">
                      Bật tính năng tự động gửi đơn hàng về Telegram
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1a365d] mb-1">
                      Telegram Bot Token:
                    </label>
                    <input
                      type="text"
                      placeholder="VD: 7123456789:AAH..."
                      value={telegramConfig.botToken}
                      onChange={(e) => setTelegramConfigState({ ...telegramConfig, botToken: e.target.value })}
                      className="w-full p-2.5 text-xs rounded-xl border border-[#c4c6cf] font-mono bg-[#f7fafc]"
                    />
                    <p className="text-[11px] text-[#74777f] mt-0.5">Tạo bot miễn phí bằng cách chat với <strong>@BotFather</strong> trên Telegram.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1a365d] mb-1">
                      Telegram Chat ID của bạn:
                    </label>
                    <input
                      type="text"
                      placeholder="VD: 123456789"
                      value={telegramConfig.chatId}
                      onChange={(e) => setTelegramConfigState({ ...telegramConfig, chatId: e.target.value })}
                      className="w-full p-2.5 text-xs rounded-xl border border-[#c4c6cf] font-mono bg-[#f7fafc]"
                    />
                    <p className="text-[11px] text-[#74777f] mt-0.5">Lấy Chat ID nhanh bằng cách chat với bot <strong>@userinfobot</strong> trên Telegram.</p>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#002045] hover:bg-[#1a365d] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Lưu Cấu Hình Telegram
                    </button>

                    <button
                      type="button"
                      onClick={handleTestTelegram}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Gửi tin nhắn thử</span>
                    </button>
                  </div>

                  {telegramSavedNotice && (
                    <p className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-xl">
                      ✓ {telegramSavedNotice}
                    </p>
                  )}
                </form>
              </div>
            )}

            {/* TAB 4: CHANGE PIN */}
            {activeTab === 'security' && (
              <div className="p-6 overflow-y-auto space-y-4 max-w-md text-xs sm:text-sm text-[#43474e]">
                <h4 className="font-extrabold text-sm text-[#002045] flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-[#aa3000]" />
                  <span>Thay Đổi Mật Mã PIN Quản Trị</span>
                </h4>
                <p className="text-xs text-[#74777f]">
                  Đặt một mật mã PIN bí mật của riêng bạn (ít nhất 4 ký tự) để chỉ bạn mới mở được danh sách đơn hàng.
                </p>

                <form onSubmit={handleChangePin} className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-[#1a365d] mb-1">
                      Mã PIN mới:
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Nhập mã PIN mới (VD: 9999)"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      className="w-full p-3 text-sm rounded-xl border border-[#c4c6cf] font-mono bg-[#f7fafc]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#aa3000] hover:bg-[#d43f00] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Lưu Mã PIN Mới
                  </button>

                  {pinChangeNotice && (
                    <p className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-xl">
                      ✓ {pinChangeNotice}
                    </p>
                  )}
                </form>

                {/* Factory Reset Section */}
                <div className="border-t border-[#e0e3e5] pt-4 mt-6 space-y-2">
                  <h5 className="font-extrabold text-xs text-red-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Khôi Phục Cài Đặt Gốc (Xóa Sạch Dữ Liệu)</span>
                  </h5>
                  <p className="text-[11px] text-[#74777f]">
                    Xóa sạch toàn bộ đơn hàng lưu tạm, cấu hình Google Sheet, Telegram và khôi phục mã PIN về mặc định (8888).
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Bạn có chắc chắn muốn xóa sạch toàn bộ dữ liệu và khôi phục về cài đặt gốc ban đầu?')) {
                        resetAllToFactoryDefaults();
                        setOrders([]);
                        setGoogleSheetConfigState({ webhookUrl: '', enabled: false });
                        setTelegramConfigState({ botToken: '', chatId: '', enabled: false });
                        alert('Đã khôi phục toàn bộ cài đặt gốc thành công! Mã PIN mặc định là: 8888');
                        onClose();
                      }
                    }}
                    className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Khôi Phục Cài Đặt Gốc Ban Đầu
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <div className="p-4 bg-[#f7fafc] border-t border-[#e0e3e5] flex justify-between items-center shrink-0">
          <p className="text-[11px] text-[#74777f]">
            Mẹo: Nhấn tổ hợp phím <kbd className="px-1.5 py-0.5 bg-white border border-[#c4c6cf] rounded font-mono text-[10px]">Ctrl + Shift + A</kbd> ở bất kỳ đâu để mở nhanh khu vực quản trị.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#002045] hover:bg-[#1a365d] text-white rounded-xl font-bold text-xs transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

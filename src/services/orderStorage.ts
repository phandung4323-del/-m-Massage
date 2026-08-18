import { OrderFormData, SavedOrder, OrderStatus } from '../types';

const STORAGE_KEY = 'small_customer_orders_v1';

export function getStoredOrders(): SavedOrder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading stored orders:', error);
    return [];
  }
}

export function saveNewOrder(
  formData: OrderFormData,
  orderCode: string,
  comboTitle: string,
  totalPrice: number
): SavedOrder {
  const currentOrders = getStoredOrders();
  const newOrder: SavedOrder = {
    id: `ord_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    orderCode,
    createdAt: new Date().toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour12: false,
    }),
    fullName: formData.fullName.trim(),
    phone: formData.phone.trim(),
    address: formData.address.trim(),
    city: formData.city,
    comboTitle,
    quantity: formData.quantity || 1,
    totalPrice,
    paymentMethod: formData.paymentMethod,
    note: formData.note.trim() || 'Không có',
    status: 'Chờ xác nhận',
  };

  const updated = [newOrder, ...currentOrders];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  // Dispatch custom event for real-time reactivity in UI
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('orders_updated'));
  }

  return newOrder;
}

export function updateOrderStatus(orderId: string, newStatus: OrderStatus) {
  const orders = getStoredOrders();
  const updated = orders.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('orders_updated'));
  }
}

export function deleteStoredOrder(orderId: string) {
  const orders = getStoredOrders();
  const updated = orders.filter((ord) => ord.id !== orderId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('orders_updated'));
  }
}

export function exportOrdersToCsv() {
  const orders = getStoredOrders();
  if (orders.length === 0) {
    alert('Chưa có đơn hàng nào để xuất file!');
    return;
  }

  const headers = [
    'Mã Đơn Hàng',
    'Thời Gian Đặt',
    'Họ và Tên Khách',
    'Số Điện Thoại',
    'Địa Chỉ Nhận Hàng',
    'Tỉnh / Thành Phố',
    'Gói Sản Phẩm',
    'Số Lượng',
    'Tổng Tiền (VNĐ)',
    'Hình Thức Thanh Toán',
    'Ghi Chú',
    'Trạng Thái',
  ];

  const csvRows = [
    headers.join(','),
    ...orders.map((o) =>
      [
        `"${o.orderCode}"`,
        `"${o.createdAt}"`,
        `"${o.fullName}"`,
        `"${o.phone}"`,
        `"${o.address.replace(/"/g, '""')}"`,
        `"${o.city}"`,
        `"${o.comboTitle}"`,
        o.quantity,
        `"${o.totalPrice.toLocaleString('vi-VN')} đ"`,
        `"${o.paymentMethod === 'cod' ? 'Thanh toán COD' : 'Chuyển khoản QR'}"`,
        `"${(o.note || '').replace(/"/g, '""')}"`,
        `"${o.status}"`,
      ].join(',')
    ),
  ];

  const blob = new Blob(['\uFEFF' + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Danh_Sach_Don_Hang_SMall_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

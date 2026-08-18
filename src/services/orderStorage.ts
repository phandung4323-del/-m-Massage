import { OrderFormData, SavedOrder, OrderStatus } from '../types';

const STORAGE_KEY = 'small_customer_orders_v1';
const ADMIN_PIN_KEY = 'small_admin_pin_code';
const TELEGRAM_CONFIG_KEY = 'small_telegram_config';
const GOOGLE_SHEET_CONFIG_KEY = 'small_googlesheet_config';

export interface TelegramConfig {
  botToken: string;
  chatId: string;
  enabled: boolean;
}

export interface GoogleSheetConfig {
  webhookUrl: string;
  enabled: boolean;
}

export function getAdminPin(): string {
  return localStorage.getItem(ADMIN_PIN_KEY) || '8888';
}

export function setAdminPin(newPin: string) {
  localStorage.setItem(ADMIN_PIN_KEY, newPin.trim());
}

export function getTelegramConfig(): TelegramConfig {
  try {
    const raw = localStorage.getItem(TELEGRAM_CONFIG_KEY);
    if (!raw) return { botToken: '', chatId: '', enabled: false };
    return JSON.parse(raw);
  } catch {
    return { botToken: '', chatId: '', enabled: false };
  }
}

export function saveTelegramConfig(config: TelegramConfig) {
  localStorage.setItem(TELEGRAM_CONFIG_KEY, JSON.stringify(config));
}

export const DEFAULT_GOOGLE_SHEET_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbzdqAzBDPzBVNZNcWfoFJTdDgUovv8lefwzEadBZtUwFmZNxUPpcOMVsodP-nrT7dL2/exec';

export function getGoogleSheetConfig(): GoogleSheetConfig {
  try {
    const raw = localStorage.getItem(GOOGLE_SHEET_CONFIG_KEY);
    if (!raw) return { webhookUrl: DEFAULT_GOOGLE_SHEET_WEBHOOK_URL, enabled: true };
    const parsed = JSON.parse(raw);
    return {
      webhookUrl: parsed.webhookUrl || DEFAULT_GOOGLE_SHEET_WEBHOOK_URL,
      enabled: parsed.enabled !== undefined ? parsed.enabled : true,
    };
  } catch {
    return { webhookUrl: DEFAULT_GOOGLE_SHEET_WEBHOOK_URL, enabled: true };
  }
}

export function saveGoogleSheetConfig(config: GoogleSheetConfig) {
  localStorage.setItem(GOOGLE_SHEET_CONFIG_KEY, JSON.stringify(config));
}

export function resetAllToFactoryDefaults() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(ADMIN_PIN_KEY);
  localStorage.removeItem(TELEGRAM_CONFIG_KEY);
  localStorage.removeItem(GOOGLE_SHEET_CONFIG_KEY);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('orders_updated'));
  }
}

/**
 * Send order directly to Google Sheets in Real-Time
 */
export async function sendGoogleSheetNotification(order: SavedOrder): Promise<boolean> {
  const config = getGoogleSheetConfig();
  const webhookUrl = config.webhookUrl.trim();
  if (!config.enabled || !webhookUrl) {
    return false;
  }

  try {
    const payload = {
      orderCode: order.orderCode,
      createdAt: order.createdAt,
      fullName: order.fullName,
      phone: order.phone,
      address: order.address,
      city: order.city,
      comboTitle: order.comboTitle,
      quantity: order.quantity,
      totalPrice: order.totalPrice,
      paymentMethod: order.paymentMethod === 'cod' ? 'Thanh toán COD khi nhận hàng' : 'Chuyển khoản QR ngân hàng',
      note: order.note || 'Không có',
      status: order.status,
    };

    // Use text/plain with mode: 'no-cors' to avoid browser CORS preflight blocks with Google Apps Script
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return true;
  } catch (error) {
    console.error('Error sending order to Google Sheets:', error);
    return false;
  }
}

/**
 * Send order notification directly to Telegram (Private & Instant)
 */
export async function sendTelegramNotification(order: SavedOrder): Promise<boolean> {
  const config = getTelegramConfig();
  if (!config.enabled || !config.botToken.trim() || !config.chatId.trim()) {
    return false;
  }

  try {
    const message = `🔥 <b>ĐƠN HÀNG MỚI - S-MALL MASSAGE</b> 🔥
━━━━━━━━━━━━━━━━━━
📦 <b>Mã đơn:</b> <code>${order.orderCode}</code>
⏰ <b>Thời gian:</b> ${order.createdAt}
👤 <b>Khách hàng:</b> <b>${order.fullName}</b>
📞 <b>Số điện thoại:</b> <code>${order.phone}</code>
📍 <b>Địa chỉ:</b> ${order.address}, ${order.city}
🎁 <b>Sản phẩm:</b> ${order.comboTitle} (SL: ${order.quantity})
💰 <b>Tổng tiền:</b> <b>${order.totalPrice.toLocaleString('vi-VN')} đ</b>
💳 <b>Thanh toán:</b> ${order.paymentMethod === 'cod' ? 'COD (Nhận hàng thanh toán)' : 'Chuyển khoản / Quét QR'}
📝 <b>Ghi chú:</b> ${order.note || 'Không có'}
━━━━━━━━━━━━━━━━━━
<i>⚡ Vui lòng gọi điện xác nhận trong 15 phút!</i>`;

    const url = `https://api.telegram.org/bot${config.botToken.trim()}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: config.chatId.trim(),
        text: message,
        parse_mode: 'HTML',
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return false;
  }
}

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

  // Send instant Google Sheets notification
  sendGoogleSheetNotification(newOrder);

  // Send instant private Telegram alert
  sendTelegramNotification(newOrder);

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

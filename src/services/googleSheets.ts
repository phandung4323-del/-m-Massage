import { OrderFormData } from '../types';

export const TARGET_SPREADSHEET_ID = '1fMOwGELlzRKmk1TaLdpyb4jBPwomCXxQEoSL95pO6Uo';
export const SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${TARGET_SPREADSHEET_ID}/edit?gid=0#gid=0`;

const GOOGLE_ACCESS_TOKEN_KEY = 'small_google_sheets_token';
const GOOGLE_TOKEN_EXPIRY_KEY = 'small_google_sheets_token_expiry';

export interface SheetSyncResult {
  success: boolean;
  message: string;
  updatedRange?: string;
  error?: any;
}

/**
 * Get stored valid Google access token from localStorage
 */
export function getStoredAccessToken(): string | null {
  const token = localStorage.getItem(GOOGLE_ACCESS_TOKEN_KEY);
  const expiry = localStorage.getItem(GOOGLE_TOKEN_EXPIRY_KEY);
  if (!token) return null;
  if (expiry && Date.now() > Number(expiry)) {
    localStorage.removeItem(GOOGLE_ACCESS_TOKEN_KEY);
    localStorage.removeItem(GOOGLE_TOKEN_EXPIRY_KEY);
    return null;
  }
  return token;
}

/**
 * Store Google access token with expiration time (default 1 hour)
 */
export function setStoredAccessToken(token: string, expiresInSeconds: number = 3500) {
  localStorage.setItem(GOOGLE_ACCESS_TOKEN_KEY, token);
  localStorage.setItem(GOOGLE_TOKEN_EXPIRY_KEY, String(Date.now() + expiresInSeconds * 1000));
}

/**
 * Remove stored access token
 */
export function clearStoredAccessToken() {
  localStorage.removeItem(GOOGLE_ACCESS_TOKEN_KEY);
  localStorage.removeItem(GOOGLE_TOKEN_EXPIRY_KEY);
}

/**
 * Initialize Google Identity Services token client
 */
export function requestGoogleAccessToken(onSuccess: (token: string) => void, onError?: (err: any) => void) {
  if (typeof window === 'undefined' || !(window as any).google?.accounts?.oauth2) {
    if (onError) onError(new Error('Google Identity Services script chưa được tải. Vui lòng thử lại sau vài giây.'));
    return;
  }

  try {
    const client = (window as any).google.accounts.oauth2.initTokenClient({
      client_id: '686025287624-google.apps.googleusercontent.com', // Will use ambient or prompt
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      callback: (response: any) => {
        if (response.error) {
          if (onError) onError(response);
          return;
        }
        if (response.access_token) {
          setStoredAccessToken(response.access_token, response.expires_in || 3500);
          onSuccess(response.access_token);
        }
      },
    });

    client.requestAccessToken({ prompt: 'consent' });
  } catch (err) {
    console.error('Error requesting Google token:', err);
    if (onError) onError(err);
  }
}

/**
 * Format order details into row array
 */
export function formatOrderRow(order: OrderFormData, orderCode: string, comboTitle: string, totalPrice: number): (string | number)[] {
  const now = new Date();
  const dateFormatted = now.toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour12: false,
  });

  return [
    orderCode,
    dateFormatted,
    order.fullName,
    order.phone,
    order.address,
    order.city,
    comboTitle,
    order.quantity || 1,
    `${totalPrice.toLocaleString('vi-VN')} đ`,
    order.paymentMethod === 'cod' ? 'COD (Nhận hàng thanh toán)' : 'Chuyển khoản / VietQR',
    order.note || 'Không có',
    'Chờ xác nhận',
  ];
}

/**
 * Append order row directly to Google Sheets via REST API
 */
export async function appendOrderToGoogleSheet(
  order: OrderFormData,
  orderCode: string,
  comboTitle: string,
  totalPrice: number,
  customAccessToken?: string
): Promise<SheetSyncResult> {
  const token = customAccessToken || getStoredAccessToken();

  if (!token) {
    return {
      success: false,
      message: 'Chưa có quyền truy cập Google Sheets. Vui lòng kết nối tài khoản Google.',
    };
  }

  const rowValues = formatOrderRow(order, orderCode, comboTitle, totalPrice);

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${TARGET_SPREADSHEET_ID}/values/A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [rowValues],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      console.error('Google Sheets API error:', errorBody);
      
      if (response.status === 401) {
        clearStoredAccessToken();
        return {
          success: false,
          message: 'Phiên đăng nhập Google đã hết hạn. Vui lòng xác thực lại.',
          error: errorBody,
        };
      }

      return {
        success: false,
        message: `Lỗi kết nối Google Sheets (${response.status}): ${errorBody.error?.message || response.statusText}`,
        error: errorBody,
      };
    }

    const data = await response.json();
    return {
      success: true,
      message: 'Đã lưu đơn hàng vào Google Sheet thành công!',
      updatedRange: data.updates?.updatedRange,
    };
  } catch (err: any) {
    console.error('Network error writing to Google Sheets:', err);
    return {
      success: false,
      message: 'Không thể kết nối tới máy chủ Google Sheets. Kiểm tra kết nối mạng.',
      error: err,
    };
  }
}

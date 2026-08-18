export interface OrderFormData {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  quantity: number;
  comboId: string;
  note: string;
  paymentMethod: 'cod' | 'banking';
}

export type OrderStatus = 'Chờ xác nhận' | 'Đã xác nhận' | 'Đang giao hàng' | 'Đã hoàn thành' | 'Đã hủy';

export interface SavedOrder {
  id: string;
  orderCode: string;
  createdAt: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  comboTitle: string;
  quantity: number;
  totalPrice: number;
  paymentMethod: 'cod' | 'banking';
  note: string;
  status: OrderStatus;
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  userType: 'Văn phòng' | 'Tài xế' | 'Gia đình' | 'Người cao tuổi';
}

export interface RemoteState {
  power: boolean;
  mode: 'auto' | 'custom' | 'deep';
  intensity: 1 | 2 | 3;
  heatLevel: 0 | 1 | 2;
  vibration: boolean;
  direction: 'clockwise' | 'counterclockwise';
  timerMinutes: number;
}

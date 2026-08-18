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

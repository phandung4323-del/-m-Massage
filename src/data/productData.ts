import { ReviewItem } from '../types';
import heroImage from '../assets/images/hero_massage_cushion_1787023622792.jpg';
import asianOfficeWorker from '../assets/images/asian_office_worker_1787039519299.jpg';
import asianDriver from '../assets/images/asian_driver_1787039532984.jpg';
import asianRemoteWorker from '../assets/images/asian_remote_worker_1787039546481.jpg';
import asianWatchingTv from '../assets/images/asian_watching_tv_1787039560917.jpg';
import realistic3DRoller from '../assets/images/realistic_3d_roller_1787039683135.jpg';
import vietnameseHomeRelax from '../assets/images/vietnamese_home_relax_1787039895989.jpg';
import vietnameseOfficeRelax from '../assets/images/vietnamese_office_relax_1787039915478.jpg';
import vietnameseCarRelax from '../assets/images/vietnamese_car_relax_1787039936402.jpg';
import vietnameseAvatarMale1 from '../assets/images/vietnamese_avatar_male1_1787040111739.jpg';
import vietnameseAvatarMale2 from '../assets/images/vietnamese_avatar_male2_1787040134381.jpg';
import vietnameseAvatarFemale from '../assets/images/vietnamese_avatar_female_1787040150686.jpg';

export const PRODUCT_IMAGES = {
  hero: heroImage,
  officeWorker: asianOfficeWorker,
  driver: asianDriver,
  remoteWork: asianRemoteWorker,
  watchingTv: asianWatchingTv,
  bodyDiagram: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGZgiaxcNJYkgkG0jIiUhwmjKVPu-zo2uULs7lYd1iBu-L3mvgXXmey0_vPB2QmUjnzxZ4O_98ijHn2xe1B9Dz_e6llgMt4c29_2mvKzZE3W5DhCpjfMRPvZHpiJkG_WlblSbyYEAuFixhp5ooSVo9Femoa13N1qB2UYmkZJS8FI_Q7UVIzvx6k-7heN5JrQzWZaV4qfyDEI8P-zQTEmaTA4C-VNEfU02ZUYx2wmqARI6pes611iT9fQ',
  massageZones: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ4-lUayraUn00GLlRKfGxWoQ1SXv1HLR9_rDB1DSJEnrEtkDih_rSpWjMn5kkFpJRa0JP24V-K5VKs5C9rb7_DCvQILJEyf2-YjL6DyhTod1uphgAjrcHeLQvpLnCXU_DE-f5VZpLHDb8zMNQjEL_Fs-JH4hiXrTDNEaBkqdbxE9a6tUUcgrErspE10cUgImMq-V_qR6aoeVJNDlyBnvRnU8ZeBe00LzrFsbPOIkIzBdsTLtbenKz5A',
  roller3D: realistic3DRoller,
  backTrack: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4UhpufUgRTOV0woW6geMk4Az-a4prkZ94ovtx7fMm4JjNmB5sLqW9rp1IkzQKgWes7v46DitwVdhfL9hp0PxydohzMGDrfOG6w3dQmf--63npqO_JbjwmkxlBcz_kAYbKnyM3dhx-erLokuN9-XOweY0PiDwZW1bfsBup2wNmgkKTOOzp80zNIJzgIqQypzAQafN50EPDjsviOnoF95snStKY2kokxRpoVOJQdu7PsIa-tN1nRuB9nw',
  vibrationSeat: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCObx9ZzrrfUmSB_TP0DbIpjkS_7-3H_nEa5Q-_h2OvapMBHRRfhGqnqZKORtvbB213YPw5fXGq1Kgm7b-hof4O1TIA5Nd60lGuE3oYRFiFeuLbF4NlTBrrKp81xn1wvUgaXTiQQ5wYbxVWZVjflJBMfWpopu25ZFjWtL8fmBznIbu826m4MT55s2nCqjpQTnl2yO_rT9e0bZIYB7P8nks6keifl6YHbIpTZh390eSbeG8cFinqr3fsRw',
  remoteControl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCETwU4tC-8R2JQQ0TAQD2scaUEK_SR9Y8a264DB7C5H9P3Rg8t4cntaXCDDanqdrnM9hMswisxJOUkGtaz3GtLQ6BoXIzOdTqHCeyJN01V_CRaPimPPcuIXc_7het3o_YsqG0mZ31q-EeVvvFq6dF4mf2XmP_-SJzWb6VcOx732IgxlouVMtkBj-WXENnykshFNEHO6RU14WlA3AAZkEF_KeY8By0FYVSuLcO6UdTgUVweNlmkquZVkA',
  lifestyleHome: vietnameseHomeRelax,
  lifestyleOffice: vietnameseOfficeRelax,
  lifestyleCar: vietnameseCarRelax,
};

export const PRICING_PACKAGES = [
  {
    id: 'single',
    title: '1 ĐỆM MASSAGE CAO CẤP',
    tag: 'Bán chạy nhất',
    price: 1685000,
    originalPrice: 1985000,
    discountPercent: 15,
    shippingFee: 20000,
    description: 'Bao gồm 1 đệm massage toàn thân S-Mall + Củ nguồn 220V + Tẩu sạc ô tô 12V + Phiếu bảo hành 12 tháng.',
    popular: true,
  },
  {
    id: 'double',
    title: 'COMBO 2 ĐỆM (GIA ĐÌNH)',
    tag: 'Tiết kiệm 770.000đ',
    price: 3200000,
    originalPrice: 3970000,
    discountPercent: 20,
    shippingFee: 0,
    description: 'Bộ đôi đệm cho vợ chồng hoặc tặng bố mẹ. FREESHIP toàn quốc + Tặng kèm 1 gối chườm nóng ngải cứu.',
    popular: false,
  },
  {
    id: 'car-home',
    title: 'COMBO 3 ĐỆM (TRI ÂN)',
    tag: 'Ưu đãi lớn nhất',
    price: 4650000,
    originalPrice: 5955000,
    discountPercent: 22,
    shippingFee: 0,
    description: 'Trọn bộ 3 đệm cao cấp S-Mall. Miễn phí vận chuyển toàn quốc + Tặng 2 gối thảo dược tự nhiên.',
    popular: false,
  },
];

export const PAIN_POINTS = [
  {
    title: 'DÂN VĂN PHÒNG',
    image: PRODUCT_IMAGES.officeWorker,
    desc: 'Ngồi máy tính liên tục 8-10 tiếng/ngày, cổ vai gáy căng cứng và đau mỏi đốt sống lưng.',
  },
  {
    title: 'TÀI XẾ',
    image: PRODUCT_IMAGES.driver,
    desc: 'Lái xe đường dài liên tục, ê ẩm vùng hông mông và căng thẳng thần kinh do tập trung cao độ.',
  },
  {
    title: 'LÀM VIỆC TẠI NHÀ',
    image: PRODUCT_IMAGES.remoteWork,
    desc: 'Bàn ghế không chuẩn công thái học, thường xuyên ngồi sai tư thế gây đau nhức thắt lưng.',
  },
  {
    title: 'NGỒI XEM TV',
    image: PRODUCT_IMAGES.watchingTv,
    desc: 'Nằm hoặc ngồi ghế sofa quá lâu, máu huyết lưu thông kém, người uể oải khi đứng dậy.',
  },
];

export const BODY_ZONES = [
  {
    name: 'Cổ & Gáy',
    benefit: 'Căng cứng do nhìn màn hình lâu, cúi điện thoại',
    action: 'Cụm bi xoay 3D đảo chiều nhào nặn sâu giảm co thắt cơ cổ',
  },
  {
    name: 'Vai',
    benefit: 'Mỏi mệt, căng nhức liên tục do mang vác hoặc tì đè',
    action: 'Con lăn mở rộng giải tỏa áp lực đè nặng vùng cầu vai',
  },
  {
    name: 'Lưng & Cột sống',
    benefit: 'Đau âm ỉ do ngồi sai tư thế, thoái hóa nhẹ',
    action: 'Ray trượt chuyển động dọc theo đốt sống lưng thư giãn cốt lõi',
  },
  {
    name: 'Eo & Thắt lưng',
    benefit: 'Áp lực đè nặng toàn bộ thân trên khi ngồi lâu',
    action: 'Túi khí & bi ấn huyệt sưởi nhiệt hồng ngoại ấm sâu',
  },
  {
    name: 'Hông & Đùi',
    benefit: 'Tê buốt, ứ trệ tuần hoàn máu sau thời gian ngồi dài',
    action: 'Động cơ rung vi mô tần số cao đánh bay cảm giác tê mỏi',
  },
];

export const SOLUTION_STEPS = [
  {
    step: '1',
    title: 'Đặt đệm',
    desc: 'Đặt lên ghế làm việc, sofa hoặc ghế lái ô tô chỉ trong 5 giây.',
  },
  {
    step: '2',
    title: 'Ngồi xuống',
    desc: 'Ngả lưng thư thái, tựa sát vào các điểm cong công thái học chữ L.',
  },
  {
    step: '3',
    title: 'Bật máy',
    desc: 'Bấm remote điều khiển chọn chế độ và mức nhiệt yêu thích.',
  },
  {
    step: '4',
    title: 'Thư giãn',
    desc: 'Tận hưởng 15 phút massage xoa bóp trọn vẹn toàn thân.',
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'r1',
    name: 'Nguyễn Văn Hùng',
    role: 'Lập trình viên (Hà Nội)',
    avatar: vietnameseAvatarMale1,
    rating: 5,
    comment: 'Mình ngồi code cả ngày cổ gáy cứng đờ. Mua đệm này để ở ghế văn phòng, giờ trưa cắm vào 15 phút là nhẹ cả người, đầu óc tỉnh táo hẳn. Bi lăn êm và có nhiệt ấm rất dễ chịu!',
    date: '2 ngày trước',
    verified: true,
    userType: 'Văn phòng',
  },
  {
    id: 'r2',
    name: 'Trần Minh Quang',
    role: 'Tài xế công nghệ (TP.HCM)',
    avatar: vietnameseAvatarMale2,
    rating: 5,
    comment: 'Chạy xe 10 tiếng mỗi ngày lưng với hông đau buốt. May có tẩu cắm 12V trên ô tô, những lúc chờ khách mình bật chế độ rung với nhiệt lên, lưng đỡ mỏi hẳn. Đáng đồng tiền!',
    date: '5 ngày trước',
    verified: true,
    userType: 'Tài xế',
  },
  {
    id: 'r3',
    name: 'Lê Thị Thu Hà',
    role: 'Kế toán trưởng (Đà Nẵng)',
    avatar: vietnameseAvatarFemale,
    rating: 5,
    comment: 'Đệm bọc da PU rất sang, đường may tỉ mỉ. Mình mua cho cả ba mẹ ở quê dùng nữa, ông bà khen nức nở vì buổi tối nằm massage có sưởi ấm ngủ rất ngon giấc.',
    date: '1 tuần trước',
    verified: true,
    userType: 'Gia đình',
  },
];

export const SPECIFICATIONS = [
  { label: 'Thương hiệu', value: 'S-MALL CHÍNH HÃNG' },
  { label: 'Model', value: 'SM-889 Pro Series (Phiên bản 2026)' },
  { label: 'Điện áp sử dụng', value: 'DC 12V (Kèm Adapter 220V & Tẩu ô tô 12V)' },
  { label: 'Công suất', value: '24W - Tiết kiệm điện năng tối đa' },
  { label: 'Thời gian hoạt động', value: '15 phút/chu kỳ (Tự động ngắt thông minh)' },
  { label: 'Chất liệu da', value: 'Da PU cao cấp chống thấm nước + Lưới 3D thoáng khí' },
  { label: 'Trọng lượng', value: '3.8 kg (Gấp gọn mang đi du lịch/công tác)' },
  { label: 'Chính sách bảo hành', value: '12 tháng chính hãng - Lỗi 1 đổi 1 trong 30 ngày' },
];

export const FAQS = [
  {
    q: 'Đệm có sử dụng được trên xe ô tô không?',
    a: 'Hoàn toàn được! Bộ sản phẩm đã đi kèm sẵn cả 2 loại nguồn: Củ sạc 220V cắm điện nhà/văn phòng và Đầu tẩu 12V chuyên dụng cắm trực tiếp trên mọi dòng ô tô từ 4 đến 7 chỗ, xe tải.',
  },
  {
    q: 'Người lớn tuổi có dùng được sản phẩm này không?',
    a: 'Rất thích hợp! Đệm có 3 mức cường độ từ nhẹ nhàng đến chuyên sâu và tích hợp nhiệt hồng ngoại giúp lưu thông khí huyết, rất tốt cho người lớn tuổi hay bị đau lưng, nhức mỏi xương khớp khi thay đổi thời tiết.',
  },
  {
    q: 'Máy hoạt động liên tục được bao lâu?',
    a: 'Để đảm bảo an toàn cho cơ thể và độ bền động cơ, máy được lập trình ngắt tự động sau 15 phút (thời gian chuẩn y khoa cho 1 liệu trình massage). Nếu muốn dùng tiếp, bạn chỉ cần bấm nút nguồn một lần nữa.',
  },
  {
    q: 'Chính sách bảo hành và đổi trả thế nào?',
    a: 'S-Mall cam kết bảo hành chính hãng 12 tháng trên toàn quốc. Khi nhận hàng quý khách được mở hộp kiểm tra, cắm thử điện hoạt động ưng ý mới thanh toán tiền cho shipper. Nếu phát hiện lỗi từ nhà sản xuất trong 30 ngày đầu, công ty hỗ trợ đổi mới 1-1 miễn phí tận nhà.',
  },
];

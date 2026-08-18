import React from 'react';
import { PRODUCT_IMAGES } from '../data/productData';

export const LifestyleSection: React.FC = () => {
  const lifestyles = [
    {
      title: 'TẠI NHÀ',
      desc: 'Đặt trên sofa phòng khách hoặc giường ngủ để thư giãn đọc sách, xem tivi hoặc nghỉ ngơi buổi tối.',
      image: PRODUCT_IMAGES.lifestyleHome,
    },
    {
      title: 'VĂN PHÒNG',
      desc: 'Gắn trực tiếp vào ghế xoay làm việc, giúp xua tan áp lực và duy trì sự tỉnh táo suốt 8 tiếng công sở.',
      image: PRODUCT_IMAGES.lifestyleOffice,
    },
    {
      title: 'TRÊN XE HƠI',
      desc: 'Cắm tẩu sạc 12V trên ô tô, xóa tan cơn đau mỏi lưng và hông khi lái xe đường dài hay kẹt xe giờ cao điểm.',
      image: PRODUCT_IMAGES.lifestyleCar,
    },
  ];

  return (
    <section className="py-14 sm:py-20 px-4 max-w-4xl mx-auto" id="lifestyle">
      <div className="text-center mb-10">
        <span className="text-[#aa3000] font-bold text-xs uppercase tracking-wider mb-2 block">
          Linh hoạt & Tiện dụng
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002045]">
          DÙNG MỌI LÚC – MỌI NƠI
        </h2>
        <p className="text-xs sm:text-sm text-[#43474e] mt-2 max-w-md mx-auto">
          Chỉ một chiếc đệm gọn nhẹ đáp ứng trọn vẹn nhu cầu thư giãn của bạn ở bất kỳ không gian nào.
        </p>
      </div>

      <div className="space-y-6">
        {lifestyles.map((item, index) => (
          <div
            key={index}
            className="relative rounded-3xl overflow-hidden soft-shadow border border-[#c4c6cf]/40 group"
          >
            <img
              alt={item.title}
              className="w-full h-56 sm:h-72 object-cover group-hover:scale-103 transition-transform duration-500"
              src={item.image}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#002045]/90 via-[#002045]/40 to-transparent flex flex-col justify-end p-5 sm:p-7 text-white">
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-wide mb-1 text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffb59e]" />
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#eef1f3] max-w-xl leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

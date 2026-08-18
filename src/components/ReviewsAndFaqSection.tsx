import React, { useState } from 'react';
import { Star, CheckCircle, ChevronDown, MessageSquare, ThumbsUp } from 'lucide-react';
import { REVIEWS, FAQS } from '../data/productData';
import { ReviewItem } from '../types';

export const ReviewsAndFaqSection: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Văn phòng' | 'Tài xế' | 'Gia đình'>('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    role: '',
    rating: 5,
    comment: '',
    userType: 'Văn phòng' as const,
  });

  const filteredReviews = filter === 'All'
    ? reviewsList
    : reviewsList.filter((r) => r.userType === filter);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    const review: ReviewItem = {
      id: `r_${Date.now()}`,
      name: newReview.name,
      role: newReview.role || 'Khách hàng S-Mall',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      rating: newReview.rating,
      comment: newReview.comment,
      date: 'Vừa xong',
      verified: true,
      userType: newReview.userType,
    };
    setReviewsList([review, ...reviewsList]);
    setNewReview({ name: '', role: '', rating: 5, comment: '', userType: 'Văn phòng' });
    setShowAddReview(false);
  };

  return (
    <section className="py-14 sm:py-20 px-4 max-w-4xl mx-auto" id="reviews">
      {/* Reviews Heading */}
      <div className="text-center mb-10">
        <span className="text-[#aa3000] font-bold text-xs uppercase tracking-wider mb-2 block">
          Hơn 12.000+ Khách hàng tin dùng
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002045]">
          ĐÁNH GIÁ TỪ NGƯỜI SỬ DỤNG
        </h2>

        {/* Aggregate Rating Score */}
        <div className="mt-4 inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-full border border-[#c4c6cf]/40 soft-shadow">
          <div className="flex items-center text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="font-extrabold text-sm text-[#002045]">4.9 / 5.0</span>
          <span className="text-xs text-[#74777f]">(842 đánh giá xác thực)</span>
        </div>
      </div>

      {/* Filter Tabs & Add Review Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-2">
          {(['All', 'Văn phòng', 'Tài xế', 'Gia đình'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                filter === tab
                  ? 'bg-[#002045] text-white'
                  : 'bg-white text-[#43474e] border border-[#c4c6cf]/50 hover:bg-[#e0e3e5]'
              }`}
            >
              {tab === 'All' ? 'Tất cả đánh giá' : tab}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowAddReview(!showAddReview)}
          className="text-xs font-bold text-[#aa3000] bg-[#ffdbd0]/60 hover:bg-[#ffdbd0] px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{showAddReview ? 'Đóng form' : 'Viết đánh giá'}</span>
        </button>
      </div>

      {/* New Review Form Drawer */}
      {showAddReview && (
        <form onSubmit={handleAddReview} className="bg-white p-5 rounded-2xl border border-[#aa3000]/40 mb-6 soft-shadow animate-fadeIn">
          <h4 className="font-bold text-sm text-[#002045] mb-3">Gửi cảm nhận của bạn về đệm S-Mall:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              placeholder="Họ và tên của bạn *"
              required
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              className="p-2.5 text-xs rounded-xl border border-[#c4c6cf] focus:outline-[#aa3000] bg-[#f7fafc]"
            />
            <input
              type="text"
              placeholder="Nghề nghiệp / Khu vực (VD: Kế toán - Hà Nội)"
              value={newReview.role}
              onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
              className="p-2.5 text-xs rounded-xl border border-[#c4c6cf] focus:outline-[#aa3000] bg-[#f7fafc]"
            />
          </div>
          <textarea
            placeholder="Chia sẻ trải nghiệm sử dụng thực tế của bạn... *"
            required
            rows={3}
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="w-full p-2.5 text-xs rounded-xl border border-[#c4c6cf] focus:outline-[#aa3000] bg-[#f7fafc] mb-3"
          />
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <span className="text-xs text-[#74777f] mr-1">Đánh giá:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className="cursor-pointer"
                >
                  <Star
                    className={`w-4 h-4 ${
                      star <= newReview.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-[#c4c6cf]'
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#aa3000] hover:bg-[#d43f00] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Gửi Đánh Giá
            </button>
          </div>
        </form>
      )}

      {/* Reviews Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
        {filteredReviews.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-2xl soft-shadow border border-[#c4c6cf]/40 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#c4c6cf]/40"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-[#1a365d]">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-[#74777f]">{item.role}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-2">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-xs text-[#43474e] leading-relaxed italic mb-4">
                "{item.comment}"
              </p>
            </div>

            <div className="pt-3 border-t border-[#e0e3e5] flex items-center justify-between text-[11px] text-[#74777f]">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                Đã mua hàng
              </span>
              <span>{item.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-[#f1f4f6] rounded-3xl p-6 sm:p-8 border border-[#e0e3e5]">
        <div className="text-center mb-6">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#002045]">
            CÂU HỎI THƯỜNG GẶP (FAQ)
          </h3>
          <p className="text-xs text-[#74777f] mt-1">Giải đáp các thắc mắc phổ biến của khách hàng</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#c4c6cf]/40 overflow-hidden soft-shadow"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex justify-between items-center gap-4 cursor-pointer hover:bg-[#f7fafc] transition-colors"
                >
                  <span className="font-extrabold text-xs sm:text-sm text-[#1a365d]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#aa3000] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#43474e] leading-relaxed border-t border-[#e0e3e5]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

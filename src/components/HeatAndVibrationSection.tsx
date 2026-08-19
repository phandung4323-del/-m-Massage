import React, { useState, useRef, useEffect } from 'react';
import { Flame, Activity, Zap, Sparkles, Play, Pause, Volume2, VolumeX, RotateCcw, ShieldCheck, CheckCircle2, Video, Upload, Link2, X } from 'lucide-react';
import { PRODUCT_IMAGES } from '../data/productData';
import videoPoster from '../assets/images/video_showcase_poster_1787040441038.jpg';
import { saveVideoBlob, loadSavedVideoBlob, saveVideoUrl, loadSavedVideoUrl } from '../services/videoStorage';

export const HeatAndVibrationSection: React.FC = () => {
  const [selectedIntensity, setSelectedIntensity] = useState<'mild' | 'medium' | 'strong'>('medium');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [inputUrl, setInputUrl] = useState('');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load saved video blob or URL on mount
  useEffect(() => {
    async function initVideo() {
      const savedBlob = await loadSavedVideoBlob();
      if (savedBlob) {
        setVideoUrl(savedBlob);
        return;
      }
      const savedUrl = loadSavedVideoUrl();
      if (savedUrl) {
        setVideoUrl(savedUrl);
      }
    }
    initVideo();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const blobUrl = await saveVideoBlob(file);
        setVideoUrl(blobUrl);
        setIsPlaying(true);
        setUploadSuccess(true);
        setShowConfigModal(false);
        setTimeout(() => setUploadSuccess(false), 5000);
      } catch (err) {
        console.error('Lỗi khi lưu video:', err);
        const url = URL.createObjectURL(file);
        setVideoUrl(url);
        setIsPlaying(true);
      }
    }
  };

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      saveVideoUrl(inputUrl.trim());
      setVideoUrl(inputUrl.trim());
      setIsPlaying(true);
      setShowConfigModal(false);
      setInputUrl('');
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 5000);
    }
  };

  const isYouTubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return '';
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0] || '';
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
    } else if (url.includes('youtube.com/shorts/')) {
      videoId = url.split('youtube.com/shorts/')[1]?.split('?')[0] || '';
    } else if (url.includes('youtube.com/embed/')) {
      return url;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : url;
  };

  const handlePlayClick = () => {
    if (videoUrl) {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        } else {
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(true));
        }
      } else {
        setIsPlaying(!isPlaying);
      }
    } else {
      setShowConfigModal(true);
    }
  };

  const intensityDetails = {
    mild: {
      label: 'Nhẹ (Mức 1)',
      desc: 'Thích hợp cho người mới dùng lần đầu, phụ nữ và người cao tuổi cần thư giãn êm dịu trước khi ngủ.',
      width: '33%',
    },
    medium: {
      label: 'Vừa (Mức 2)',
      desc: 'Mức chuẩn cân bằng lý tưởng cho nhân viên văn phòng giải tỏa căng thẳng giữa giờ làm việc.',
      width: '66%',
    },
    strong: {
      label: 'Mạnh (Mức 3)',
      desc: 'Lực nhấn sâu mạnh mẽ cho người tập thể thao, tài xế lái xe đường dài bị co cơ, nhức mỏi nặng.',
      width: '100%',
    },
  };

  return (
    <div className="space-y-14 sm:space-y-20">
      {/* Section 08: HEAT */}
      <section className="py-14 sm:py-20 px-4 bg-[#f1f4f6] border-y border-[#e0e3e5]" id="heat">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#aa3000] font-bold text-xs uppercase tracking-wider mb-2 block">
            Công nghệ nhiệt hồng ngoại Carbon cao cấp
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002045] mb-8">
            THÊM NHIỆT – THÊM CẢM GIÁC ẤM ÁP
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white p-6 sm:p-7 rounded-3xl soft-shadow border border-[#c4c6cf]/40 flex flex-col items-center text-center hover:border-[#aa3000] transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-[#ffdbd0]/60 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[#aa3000] text-3xl">thermostat</span>
              </div>
              <h3 className="font-extrabold text-lg text-[#1a365d] mb-2">
                Mức 1: Sưởi Ấm Nhẹ (~42°C)
              </h3>
              <p className="text-xs sm:text-sm text-[#43474e] leading-relaxed">
                Giúp làm ấm các thớ cơ một cách êm dịu, giảm căng thẳng bề mặt và đem lại cảm giác dễ chịu tức thì.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-3xl soft-shadow border border-[#c4c6cf]/40 flex flex-col items-center text-center hover:border-[#ba1a1a] transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-[#ffdad6] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[#ba1a1a] text-3xl">local_fire_department</span>
              </div>
              <h3 className="font-extrabold text-lg text-[#1a365d] mb-2">
                Mức 2: Nhiệt Sâu (~48°C)
              </h3>
              <p className="text-xs sm:text-sm text-[#43474e] leading-relaxed">
                Thẩm thấu sâu vào mạch máu và huyệt đạo, giãn cơ tối đa, thúc đẩy tuần hoàn máu và thải trừ độc tố cơ bắp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 09: VIDEO SHOWCASE SECTION (Replaced Vibration Image) */}
      <section className="py-8 sm:py-14 px-4 max-w-4xl mx-auto text-center" id="vibration">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ffdbd0]/60 text-[#aa3000] rounded-full text-xs font-extrabold uppercase tracking-wider mb-2">
          <Video className="w-4 h-4" />
          <span>Video Trải Nghiệm Thực Tế</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002045] mb-2">
          THƯ GIÃN TOÀN THÂN NGAY TẠI NHÀ
        </h2>
        <p className="text-xs sm:text-sm text-[#43474e] max-w-xl mx-auto mb-4">
          Xem video thực tế hướng dẫn sử dụng đệm massage S-MALL: Con lăn xoay 3D mô phỏng bàn tay người thật, sưởi ấm hồng ngoại và rung thư giãn toàn thân.
        </p>

        {uploadSuccess && (
          <div className="mb-4 inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-300 px-4 py-2 rounded-2xl text-xs font-bold shadow-sm animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Đã tải video vào website thành công! Bấm phát để thưởng thức.</span>
          </div>
        )}

        {/* Video Player Container */}
        <div className="relative bg-[#001026] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#002045] max-w-3xl mx-auto aspect-video flex items-center justify-center group">
          {videoUrl && isYouTubeUrl(videoUrl) ? (
            /* YouTube Iframe Player */
            <iframe
              src={getYouTubeEmbedUrl(videoUrl)}
              title="Video đệm massage S-MALL"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : videoUrl && isPlaying ? (
            /* HTML5 Native Video Player */
            <div className="relative w-full h-full bg-black flex items-center justify-center">
              <video
                ref={videoRef}
                src={videoUrl}
                poster={videoPoster}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            </div>
          ) : (
            /* Video Cover with High-Contrast Play Button */
            <div className="relative w-full h-full">
              <img
                src={videoPoster}
                alt="Video giới thiệu đệm massage S-MALL"
                className="w-full h-full object-cover opacity-90 group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/40 flex flex-col justify-between p-4 sm:p-6 text-left">
                {/* Top Badge & Config Button */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 bg-[#ba1a1a] text-white px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wide uppercase shadow-md animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span>Video Trực Tiếp</span>
                  </div>
                  
                  <button
                    onClick={() => setShowConfigModal(true)}
                    className="text-[11px] font-bold text-white bg-white/20 hover:bg-white/30 backdrop-blur-md px-3 py-1 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                    title="Thay đổi hoặc tải video lên"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{videoUrl ? 'Đổi Video' : 'Tải Video Lên'}</span>
                  </button>
                </div>

                {/* Big Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={handlePlayClick}
                    className="w-16 h-16 sm:w-22 sm:h-22 rounded-full bg-[#aa3000] hover:bg-[#d43f00] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border-4 border-white/40 group-hover:border-white/70"
                    title="Bấm để phát video"
                  >
                    <Play className="w-8 h-8 sm:w-11 sm:h-11 ml-1 fill-white" />
                  </button>
                </div>

                {/* Bottom Video Features Bar */}
                <div className="bg-black/60 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/10 text-white">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base text-white flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#ffb59e]" />
                        Đệm Massage Cổ Vai Lưng 3D S-MALL
                      </h4>
                      <p className="text-[11px] sm:text-xs text-white/80 mt-0.5">
                        Mô phỏng thao tác bàn tay chuyên gia • Tự ngắt sau 15 phút • Cắm điện 220V & Ô tô 12V
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePlayClick}
                        className="px-4 py-2 bg-white text-[#002045] hover:bg-white/90 rounded-xl text-xs font-extrabold transition-all shadow-md shrink-0 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>XEM VIDEO</span>
                      </button>
                      <a
                        href="#order"
                        className="px-4 py-2 bg-[#aa3000] hover:bg-[#d43f00] text-white rounded-xl text-xs font-extrabold transition-all shadow-md shrink-0 inline-flex items-center gap-1"
                      >
                        <span>ĐẶT MUA</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hidden Native File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="video/mp4,video/webm,video/ogg,video/quicktime,video/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Action Controls Bar below video */}
        <div className="mt-3.5 flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-[#ffdbd0]/40 hover:bg-[#ffdbd0] text-[#aa3000] border border-[#ffb59e] rounded-xl text-xs font-extrabold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Upload className="w-4 h-4" />
            <span>Tải video từ máy tính / điện thoại</span>
          </button>

          <button
            onClick={() => setShowConfigModal(true)}
            className="px-4 py-2 bg-white hover:bg-gray-50 text-[#43474e] border border-[#c4c6cf] rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Link2 className="w-4 h-4" />
            <span>Dán link YouTube / MP4</span>
          </button>
        </div>

        {/* 6 Core Product Highlights as featured in Video */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mt-6 max-w-3xl mx-auto">
          {[
            { title: 'Tự Ngắt 15 Phút', desc: 'An toàn khi ngủ quên', icon: 'timer' },
            { title: 'Con Lăn 3D', desc: 'Xoay nhào nặn đảo chiều', icon: 'autorenew' },
            { title: 'Nhiệt Hồng Ngoại', desc: 'Sưởi ấm sâu giảm đau', icon: 'local_fire_department' },
            { title: 'Rung Đệm Ngồi', desc: 'Thư giãn mông & đùi', icon: 'vibration' },
            { title: 'Nhà & Xe Hơi 12V', desc: 'Kèm tẩu sạc ô tô', icon: 'directions_car' },
            { title: 'Quà Ý Nghĩa', desc: 'Tặng người thân yêu', icon: 'featured_seasonal_and_gifts' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-2.5 sm:p-3 rounded-2xl border border-[#c4c6cf]/40 text-center shadow-xs flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-[#aa3000] text-xl mb-1">{item.icon}</span>
              <h5 className="font-extrabold text-[11px] sm:text-xs text-[#002045]">{item.title}</h5>
              <p className="text-[9px] sm:text-[10px] text-[#74777f]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Video Config Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-90 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-[#c4c6cf]/50 text-left space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#ffdbd0] text-[#aa3000] flex items-center justify-center">
                  <Video className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-base text-[#002045]">Cài Đặt Video Trải Nghiệm</h3>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#43474e]">
              Bạn có thể chọn file video của bạn trực tiếp từ điện thoại / máy tính hoặc dán link video YouTube/MP4.
            </p>

            {/* Option 1: File Upload */}
            <div className="p-4 rounded-2xl bg-[#f7fafc] border-2 border-dashed border-[#adc7f7] text-center space-y-2">
              <Upload className="w-8 h-8 mx-auto text-[#aa3000]" />
              <h4 className="font-bold text-xs text-[#002045]">Tải file video từ thiết bị</h4>
              <p className="text-[11px] text-[#74777f]">Hỗ trợ file .mp4, .mov, .webm (Tự động lưu và phát mượt mà)</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-[#aa3000] hover:bg-[#d43f00] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Chọn File Video Từ Máy</span>
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <span className="bg-white px-2 text-[11px] text-[#74777f] uppercase font-bold">Hoặc dán link</span>
              <div className="absolute inset-0 -z-10 flex items-center">
                <div className="w-full border-t border-[#e0e3e5]" />
              </div>
            </div>

            {/* Option 2: URL Form */}
            <form onSubmit={handleSaveUrl} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#1a365d] mb-1">
                  Đường dẫn link Video:
                </label>
                <input
                  type="url"
                  placeholder="https://youtube.com/watch?v=... hoặc link video .mp4"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-[#c4c6cf] focus:border-[#aa3000] focus:outline-none bg-[#f7fafc]"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#002045] hover:bg-[#1a365d] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Lưu Link Video
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Section 10: 3 INTENSITIES */}
      <section className="py-14 sm:py-20 px-4 bg-[#f1f4f6] border-y border-[#e0e3e5]" id="intensities">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[#aa3000] font-bold text-xs uppercase tracking-wider mb-2 block">
            Linh hoạt phù hợp mọi lứa tuổi
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002045] mb-3">
            3 MỨC CƯỜNG ĐỘ: NHẸ – VỪA – MẠNH
          </h2>
          <p className="text-[#43474e] text-sm sm:text-base mb-8">
            Dễ dàng tùy chỉnh cường độ lực bóp theo thể trạng và sở thích của từng thành viên trong gia đình.
          </p>

          {/* Interactive Toggle Pills */}
          <div className="flex justify-center gap-2 sm:gap-4 mb-6">
            {(['mild', 'medium', 'strong'] as const).map((level) => {
              const isActive = selectedIntensity === level;
              const names = { mild: '1. Nhẹ', medium: '2. Vừa', strong: '3. Mạnh' };
              return (
                <button
                  key={level}
                  onClick={() => setSelectedIntensity(level)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#aa3000] text-white shadow-md'
                      : 'bg-white text-[#43474e] border border-[#c4c6cf]/60 hover:bg-[#f7fafc]'
                  }`}
                >
                  {level === 'mild' && <Zap className="w-4 h-4 text-emerald-400" />}
                  {level === 'medium' && <Activity className="w-4 h-4 text-amber-400" />}
                  {level === 'strong' && <Flame className="w-4 h-4 text-rose-400" />}
                  <span>{names[level]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Level Description Card */}
          <div className="mt-6 bg-white p-4 sm:p-5 rounded-2xl border border-[#c4c6cf]/50 max-w-md mx-auto soft-shadow text-left">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#aa3000]" />
              <span className="font-bold text-sm text-[#002045]">
                {intensityDetails[selectedIntensity].label}
              </span>
            </div>
            <p className="text-xs text-[#43474e] leading-relaxed">
              {intensityDetails[selectedIntensity].desc}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

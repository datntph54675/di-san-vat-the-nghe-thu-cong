import React from 'react';
import { Craft, ArtisanStory, ReferenceSource, MediaItem } from '../types/heritage';
import {
  Compass,
  MapPin,
  ArrowRight,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Clock,
  Layers,
  Flame,
  Award
} from 'lucide-react';
import { ASSET_HERO } from '../data/mockHeritageData';
import { HeritageImage } from '../components/HeritageImage';

interface HomeViewProps {
  crafts: Craft[];
  stories: ArtisanStory[];
  references: ReferenceSource[];
  media: MediaItem[];
  onSelectCraft: (craft: Craft) => void;
  onSelectStory: (story: ArtisanStory) => void;
  onNavigate: (tab: string) => void;
  onOpenMediaModal: (item: MediaItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  crafts,
  stories,
  references,
  media,
  onSelectCraft,
  onSelectStory,
  onNavigate,
  onOpenMediaModal
}) => {
  const featuredCrafts = crafts.filter((c) => c.featured);
  const officiallyRecognizedCount = crafts.filter((c) => c.heritageStatus === 'officially_recognized').length;

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO BANNER */}
      <section className="relative min-h-[640px] flex items-center justify-center bg-[#211E1B] text-[#F5F0E6] overflow-hidden">
        {/* Background Image with Contrast Scrim (§1.F: measured contrast scrim) */}
        <div className="absolute inset-0 z-0">
          <HeritageImage
            src={ASSET_HERO}
            alt="Nghệ nhân làm gốm thủ công Đông Nam Bộ"
            className="w-full h-full object-cover object-center filter brightness-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#211E1B] via-[#211E1B]/60 to-black/30" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B58A4A]/25 border border-[#B58A4A]/50 rounded text-xs tracking-widest uppercase font-semibold text-[#F5F0E6]">
            <Compass className="w-3.5 h-3.5 text-[#B58A4A]" />
            Thư viện Bảo tàng Số Di sản Văn hóa
          </div>

          <h1 className="font-heritage-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F0E6] leading-tight text-balance">
            DI SẢN PHI VẬT THỂ THEO VÙNG MIỀN
          </h1>

          <p className="font-heritage-serif text-lg sm:text-2xl text-[#B58A4A] italic max-w-3xl mx-auto">
            Khám phá tinh hoa nghề thủ công truyền thống Đông Nam Bộ
          </p>

          <p className="text-xs sm:text-sm text-[#F5F0E6]/85 max-w-2xl mx-auto leading-relaxed">
            Nơi lưu giữ, nghiên cứu và tôn vinh tri thức dân gian, kỹ thuật chế tác độc bản cùng ký ức làng nghề của các cộng đồng Kinh, Hoa, S'tiêng, Chơ Ro và Mạ ven lưu vực sông Đồng Nai.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('crafts')}
              className="w-full sm:w-auto px-6 py-3 bg-[#9F3035] hover:bg-[#5E2027] text-white text-xs font-semibold rounded shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Khám phá di sản nghề</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('map')}
              className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-[#F5F0E6] border border-white/30 text-xs font-semibold rounded backdrop-blur-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#B58A4A]" />
              <span>Bản đồ không gian văn hoá</span>
            </button>
          </div>
        </div>
      </section>

      {/* Operational Utility Ribbon (Pattern A from museum reference) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-[#F5F0E6] border border-[#B58A4A]/40 rounded-lg p-4 sm:p-6 shadow-md grid grid-cols-2 md:grid-cols-4 gap-6 text-[#211E1B]">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-[#986C4C] font-semibold">
              Quy mô khảo cứu
            </span>
            <p className="font-heritage-serif text-2xl font-bold text-[#5E2027] tabular-data">
              {crafts.length} Nghề & Nhóm nghề
            </p>
            <p className="text-[11px] text-[#211E1B]/60">5 nhóm ngành nghề truyền thống</p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-[#986C4C] font-semibold">
              Ghi danh cấp quốc gia
            </span>
            <p className="font-heritage-serif text-2xl font-bold text-[#9F3035] tabular-data">
              {officiallyRecognizedCount} Di sản Quốc gia
            </p>
            <p className="text-[11px] text-[#211E1B]/60">Đã công bố bởi Bộ VHTTDL</p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-[#986C4C] font-semibold">
              Địa bàn Đông Nam Bộ
            </span>
            <p className="font-heritage-serif text-2xl font-bold text-[#293D4B] tabular-data">
              6 Tỉnh & Thành phố
            </p>
            <p className="text-[11px] text-[#211E1B]/60">Đồng Nai, Bình Dương, Bình Phước...</p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-[#986C4C] font-semibold">
              Hồ sơ tư liệu đối chiếu
            </span>
            <p className="font-heritage-serif text-2xl font-bold text-[#B58A4A] tabular-data">
              {references.length}+ Nguồn chính thống
            </p>
            <p className="text-[11px] text-[#211E1B]/60">Cục DSVH, Bảo tàng & UNESCO</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* 2. GIỚI THIỆU VÙNG VĂN HOÁ ĐÔNG NAM BỘ */}
        <section className="bg-white p-6 sm:p-10 rounded-lg border border-[#211E1B]/15 shadow-xs">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#9F3035] font-semibold flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              Tổng quan địa lý & Không gian nhân văn
            </div>
            <h2 className="font-heritage-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#5E2027]">
              Vùng Văn hoá Đông Nam Bộ & Dấu ấn Bàn tay Thợ Thủ công
            </h2>
            <div className="w-16 h-0.5 bg-[#B58A4A]" />
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 text-xs sm:text-sm text-[#211E1B]/85 leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-heritage-serif text-base font-bold text-[#211E1B] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#9F3035]/15 text-[#9F3035] flex items-center justify-center text-xs font-bold">1</span>
                Thiên nhiên & Đất trời phương Nam
              </h3>
              <p>
                Đông Nam Bộ sở hữu địa hình bán sơn địa chuyển tiếp độc đáo giữa cao nguyên Nam Trung Bộ và đồng bằng sông Cửu Long. Mạng lưới sông Đồng Nai và sông Sài Gòn bồi đắp nguồn đất sét dẻo quánh, cung cấp nguồn nước dồi dào, trong khi những cánh rừng đại ngàn mang lại tre, nứa, mây và cây sơn ta tự nhiên cho nghề thủ công.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-heritage-serif text-base font-bold text-[#211E1B] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#9F3035]/15 text-[#9F3035] flex items-center justify-center text-xs font-bold">2</span>
                Đa dạng cộng đồng dân cư
              </h3>
              <p>
                Đây là nơi cộng cư của nhiều tộc người: người Việt (Kinh), người Hoa, người Chăm cùng các cư dân bản địa lâu đời như S'tiêng, Chơ Ro, Mạ. Mỗi cộng đồng mang đến những tri thức thích ứng riêng: người S'tiêng dệt thổ cẩm trên nương rẫy, người Chơ Ro đan gùi tre ngâm bùn suối, thợ Việt và Hoa cùng dựng lò gốm men màu và xưởng sơn mài.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-heritage-serif text-base font-bold text-[#211E1B] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#9F3035]/15 text-[#9F3035] flex items-center justify-center text-xs font-bold">3</span>
                Nghề thủ công trong đời sống
              </h3>
              <p>
                Nghề thủ công không đơn thuần là sinh kế mưu sinh mà là tấm gương phản chiếu tâm hồn, nghi lễ tâm linh (lễ cúng Yang, lễ cầu mùa) và mỹ cảm phóng khoáng, thích ứng năng động của con người miền Đông trên bước đường khẩn hoang và hội nhập quốc tế.
              </p>
            </div>
          </div>
        </section>

        {/* 3. DANH MỤC NGHỀ THỦ CÔNG NỔI BẬT */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#9F3035] font-semibold">
                Tuyển chọn di sản tiêu biểu
              </span>
              <h2 className="font-heritage-serif text-2xl sm:text-3xl font-bold text-[#5E2027] mt-1">
                Các Nghề Thủ Công Nổi Bật
              </h2>
            </div>
            <button
              onClick={() => onNavigate('crafts')}
              className="text-xs font-semibold text-[#9F3035] hover:text-[#5E2027] flex items-center gap-1 cursor-pointer"
            >
              <span>Xem toàn bộ thư viện</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCrafts.map((craft) => (
              <div
                key={craft.id}
                onClick={() => onSelectCraft(craft)}
                className="bg-white rounded-lg border border-[#211E1B]/15 overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col"
              >
                {/* Visual */}
                <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                  <HeritageImage
                    src={craft.mainImage}
                    alt={craft.name}
                    category={craft.category}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    {craft.heritageStatus === 'officially_recognized' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-900/90 text-white px-2.5 py-0.5 rounded backdrop-blur-xs">
                        <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                        Di sản Quốc gia
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-amber-900/90 text-white px-2.5 py-0.5 rounded backdrop-blur-xs">
                        <Clock className="w-3 h-3 text-amber-300" />
                        Khảo cứu đề xuất
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Quiet metadata separator (§1.A: zero-pill) */}
                    <div className="text-[11px] text-[#986C4C] font-semibold uppercase flex items-center gap-1.5">
                      <span>{craft.categoryName}</span>
                      <span aria-hidden="true">·</span>
                      <span>{craft.province}</span>
                    </div>

                    <h3 className="font-heritage-serif text-lg font-bold text-[#5E2027] group-hover:text-[#9F3035] transition-colors mt-1">
                      {craft.name}
                    </h3>

                    <p className="text-xs text-[#211E1B]/75 line-clamp-2 mt-2 leading-relaxed">
                      {craft.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#211E1B]/10 flex items-center justify-between text-xs">
                    <span className="text-[#211E1B]/60 truncate max-w-[180px]">
                      {craft.ethnicCommunity}
                    </span>
                    <span className="font-semibold text-[#9F3035] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Hồ sơ di sản →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. HÀNH TRÌNH KHÁM PHÁ (4-STEP WORKFLOW) */}
        <section className="bg-[#293D4B] text-[#F5F0E6] p-8 sm:p-12 rounded-lg relative overflow-hidden">
          <div className="max-w-2xl space-y-2 mb-10">
            <span className="text-xs uppercase tracking-widest text-[#B58A4A] font-semibold">
              Quy trình chế tác thủ công
            </span>
            <h2 className="font-heritage-serif text-2xl sm:text-3xl font-bold text-[#F5F0E6]">
              Hành Trình Khám Phá: Từ Tự Nhiên Đến Nghệ Thuật
            </h2>
            <p className="text-xs sm:text-sm text-[#F5F0E6]/80 leading-relaxed">
              Mỗi sản phẩm di sản là kết tinh của một chuỗi liên kết khép kín giữa sự hiểu biết về tự nhiên và kỹ năng điêu luyện của bàn tay người thợ.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-white/5 rounded border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded bg-[#9F3035] flex items-center justify-center text-white font-bold text-sm">
                01
              </div>
              <h3 className="font-heritage-serif text-base font-bold text-[#F5F0E6]">
                Nguyên liệu tự nhiên
              </h3>
              <p className="text-xs text-[#F5F0E6]/70 leading-relaxed">
                Khai thác đất sét Tân Uyên, tre nứa già ngâm bùn suối, nhựa cây sơn ta và vỏ cây rừng nhuộm sợi tự nhiên.
              </p>
            </div>

            <div className="p-5 bg-white/5 rounded border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded bg-[#B58A4A] flex items-center justify-center text-white font-bold text-sm">
                02
              </div>
              <h3 className="font-heritage-serif text-base font-bold text-[#F5F0E6]">
                Công cụ & Tạo tác
              </h3>
              <p className="text-xs text-[#F5F0E6]/70 leading-relaxed">
                Chuốt dáng trên bàn xoay chân, cạp cửi thắt lưng duỗi chân, vót nan tre bằng dao rựa và bó cốt vóc sơn ta.
              </p>
            </div>

            <div className="p-5 bg-white/5 rounded border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded bg-[#986C4C] flex items-center justify-center text-white font-bold text-sm">
                03
              </div>
              <h3 className="font-heritage-serif text-base font-bold text-[#F5F0E6]">
                Trang trí & Hỏa biến
              </h3>
              <p className="text-xs text-[#F5F0E6]/70 leading-relaxed">
                Khắc vạch chìm chấm men xanh đồng, cẩn vỏ trứng nung, thếp vàng quỳ và điều khiển ngọn lửa lò bầu nhiều ngày đêm.
              </p>
            </div>

            <div className="p-5 bg-white/5 rounded border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded bg-[#5E2027] flex items-center justify-center text-white font-bold text-sm">
                04
              </div>
              <h3 className="font-heritage-serif text-base font-bold text-[#F5F0E6]">
                Sản phẩm & Ý nghĩa
              </h3>
              <p className="text-xs text-[#F5F0E6]/70 leading-relaxed">
                Những chiếc bình gốm mỹ nghệ, bức sơn mài sáng bóng, tấm thổ cẩm mùa hội mang đậm biểu tượng và hồn cốt phương Nam.
              </p>
            </div>
          </div>
        </section>

        {/* 5. NGHỆ NHÂN VÀ CÂU CHUYỆN DI SẢN */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#9F3035] font-semibold">
                Ký sự làng nghề
              </span>
              <h2 className="font-heritage-serif text-2xl sm:text-3xl font-bold text-[#5E2027] mt-1">
                Nghệ Nhân & Câu Chuyện Người Giữ Hồn Nghề
              </h2>
            </div>
            <button
              onClick={() => onNavigate('stories')}
              className="text-xs font-semibold text-[#9F3035] hover:text-[#5E2027] flex items-center gap-1 cursor-pointer"
            >
              <span>Xem tất cả câu chuyện</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div
                key={story.id}
                onClick={() => onSelectStory(story)}
                className="bg-white rounded-lg border border-[#211E1B]/15 overflow-hidden shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4 cursor-pointer group"
              >
                <div className="space-y-3">
                  <div className="aspect-16/10 rounded overflow-hidden bg-stone-100">
                    <HeritageImage
                      src={story.image}
                      alt={story.artisanName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-[#9F3035]">
                      {story.honorificTitle}
                    </span>
                    <h3 className="font-heritage-serif text-lg font-bold text-[#211E1B] group-hover:text-[#5E2027] transition-colors mt-0.5">
                      {story.artisanName}
                    </h3>
                    <p className="text-xs text-[#211E1B]/60 italic font-serif mt-1">
                      {story.title}
                    </p>
                  </div>
                  <p className="text-xs text-[#211E1B]/75 line-clamp-3 leading-relaxed">
                    "{story.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#211E1B]/10 flex items-center justify-between text-xs text-[#211E1B]/60">
                  <span>{story.village}</span>
                  <span className="font-semibold text-[#9F3035]">Đọc ký sự →</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. THƯ VIỆN HÌNH ẢNH TRƯNG BÀY */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#9F3035] font-semibold">
                Tư liệu đa phương tiện
              </span>
              <h2 className="font-heritage-serif text-2xl sm:text-3xl font-bold text-[#5E2027] mt-1">
                Thư Viện Ảnh Bảo Tàng Di Sản
              </h2>
            </div>
            <button
              onClick={() => onNavigate('media')}
              className="text-xs font-semibold text-[#9F3035] hover:text-[#5E2027] flex items-center gap-1 cursor-pointer"
            >
              <span>Mở thư viện ảnh đầy đủ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {media.slice(0, 4).map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenMediaModal(item)}
                className="group relative aspect-square rounded-lg overflow-hidden border border-[#211E1B]/15 bg-stone-100 cursor-pointer"
              >
                <HeritageImage
                  src={item.url}
                  alt={item.title}
                  category={item.category}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-white text-xs">
                  <p className="font-semibold line-clamp-2">{item.title}</p>
                  <p className="text-[10px] text-white/75 mt-0.5">{item.craftName}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. NGUỒN THAM KHẢO CHÍNH THỐNG */}
        <section className="bg-[#F5F0E6] p-6 sm:p-8 rounded-lg border border-[#B58A4A]/30 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5E2027]">
            <BookOpen className="w-4 h-4 text-[#B58A4A]" />
            Nguồn tham khảo khảo cứu được bảo chứng ({references.length} tài liệu)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {references.slice(0, 4).map((r) => (
              <div key={r.id} className="p-3 bg-white rounded border border-[#211E1B]/10 space-y-1">
                <p className="font-bold text-[#211E1B] line-clamp-1">{r.title}</p>
                <p className="text-[#211E1B]/70">{r.issuingOrganization || r.authorOrg} {r.year ? `(${r.year})` : ''}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 text-right">
            <button
              onClick={() => onNavigate('references')}
              className="text-xs font-semibold text-[#9F3035] hover:underline cursor-pointer"
            >
              Tra cứu toàn bộ hồ sơ nguồn tài liệu đối chiếu →
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

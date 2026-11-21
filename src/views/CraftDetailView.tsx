import React, { useState } from 'react';
import { Craft, ReferenceSource } from '../types/heritage';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertTriangle,
  BookOpen,
  MapPin,
  Users,
  Compass,
  Hammer,
  Shield,
  Layers,
  Sparkles,
  ExternalLink,
  ZoomIn
} from 'lucide-react';
import { HeritageImage } from '../components/HeritageImage';

interface CraftDetailViewProps {
  craft: Craft;
  references: ReferenceSource[];
  onBack: () => void;
  onSelectReference: (ref: ReferenceSource) => void;
}

export const CraftDetailView: React.FC<CraftDetailViewProps> = ({
  craft,
  references,
  onBack,
  onSelectReference
}) => {
  const [activeImageZoom, setActiveImageZoom] = useState<string | null>(null);

  // Find references linked to this craft
  const linkedRefs = references.filter((r) =>
    craft.referenceIds.includes(r.id) || r.associatedCraftIds.includes(craft.id)
  );

  const renderHeritageStatus = () => {
    switch (craft.heritageStatus) {
      case 'officially_recognized':
        return (
          <div className="p-4 bg-emerald-50/80 border border-emerald-300 rounded-md">
            <div className="flex items-center gap-2 text-emerald-900 font-semibold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>ĐÃ ĐƯỢC GHI DANH DI SẢN VĂN HOÁ PHI VẬT THỂ QUỐC GIA</span>
            </div>
            {craft.heritageRecognitionDetails && (
              <p className="text-xs text-emerald-800 mt-1 pl-7 leading-relaxed">
                {craft.heritageRecognitionDetails.title} · {craft.heritageRecognitionDetails.decisionNumber} ({craft.heritageRecognitionDetails.recognizedYear}) bởi {craft.heritageRecognitionDetails.recognizedBy}.
              </p>
            )}
          </div>
        );
      case 'under_research':
        return (
          <div className="p-4 bg-amber-50/80 border border-amber-300 rounded-md">
            <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm">
              <Clock className="w-5 h-5 text-amber-700 shrink-0" />
              <span>ĐANG TRONG QUÁ TRÌNH NGHIÊN CỨU & KHẢO SÁT LẬP HỒ SƠ ĐỀ XUẤT</span>
            </div>
            <p className="text-xs text-amber-800 mt-1 pl-7 leading-relaxed">
              {craft.heritageRecognitionDetails?.title || 'Di sản đang được các cơ quan văn hóa địa phương kiểm kê, nghiên cứu điền dã và bảo tồn khẩn cấp.'}
            </p>
          </div>
        );
      default:
        return (
          <div className="p-4 bg-stone-100 border border-stone-300 rounded-md">
            <div className="flex items-center gap-2 text-stone-800 font-semibold text-sm">
              <AlertTriangle className="w-5 h-5 text-stone-600 shrink-0" />
              <span>NGHỀ TRUYỀN THỐNG GIỚI THIỆU – DỮ LIỆU MINH HOẠ – CẦN XÁC MINH</span>
            </div>
            <p className="text-xs text-stone-600 mt-1 pl-7 leading-relaxed">
              Thông tin ban đầu phục vụ nghiên cứu và trao đổi học thuật. Chưa xác minh tình trạng ghi danh di sản cấp tỉnh hoặc quốc gia.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#211E1B] pb-20">
      {/* Top back navigation */}
      <div className="border-b border-[#211E1B]/10 bg-white/70 sticky top-20 z-30 backdrop-blur-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold text-[#5E2027] hover:text-[#9F3035] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại thư viện di sản</span>
          </button>

          <div className="text-xs text-[#211E1B]/60 font-heritage-mono hidden sm:block">
            MÃ HỒ SƠ: {craft.id.toUpperCase()} · CẬP NHẬT: {craft.updatedAt}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Curatorial Header */}
        <div className="space-y-3 pb-8 border-b border-[#211E1B]/15">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#986C4C] font-semibold tracking-wide uppercase">
            <span>{craft.categoryName}</span>
            <span aria-hidden="true">·</span>
            <span>{craft.province}</span>
            <span aria-hidden="true">·</span>
            <span>{craft.ethnicCommunity}</span>
          </div>

          <h1 className="font-heritage-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5E2027] tracking-tight text-balance">
            {craft.name}
          </h1>

          <p className="text-sm sm:text-base font-serif italic text-[#211E1B]/70">
            {craft.englishName}
          </p>

          {craft.otherNames.length > 0 && (
            <p className="text-xs text-[#211E1B]/60">
              <strong className="text-[#211E1B]/80">Tên gọi khác:</strong> {craft.otherNames.join(', ')}
            </p>
          )}

          {/* Heritage status callout */}
          <div className="pt-2">{renderHeritageStatus()}</div>
        </div>

        {/* Hero Image Showcase with Museum Metadata */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="relative rounded-lg overflow-hidden border border-[#211E1B]/15 bg-stone-100 group">
              <HeritageImage
                src={craft.mainImage}
                alt={craft.name}
                category={craft.category}
                className="w-full aspect-16/10 object-cover"
              />
              <button
                onClick={() => setActiveImageZoom(craft.mainImage)}
                className="absolute bottom-3 right-3 p-2 bg-black/60 hover:bg-black/80 text-white rounded cursor-pointer transition-opacity"
                title="Xem ảnh phóng to"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#211E1B]/60 italic font-serif text-center">
              Hình 1: {craft.galleryImages[0]?.caption || craft.name} (Tư liệu dự án Di sản số Đông Nam Bộ)
            </p>
          </div>

          {/* Accession Fact Sheet (4 cols) */}
          <div className="lg:col-span-4 bg-white p-5 rounded-lg border border-[#211E1B]/15 shadow-xs space-y-4">
            <h3 className="font-heritage-serif text-base font-bold text-[#5E2027] pb-2 border-b border-[#211E1B]/10">
              Hồ sơ Kiểm kê Di sản
            </h3>

            <dl className="space-y-3 text-xs">
              <div>
                <dt className="text-[#211E1B]/50 font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B58A4A]" />
                  Địa bàn phân bố:
                </dt>
                <dd className="text-[#211E1B] font-medium mt-0.5">{craft.specificLocation}</dd>
              </div>

              <div>
                <dt className="text-[#211E1B]/50 font-medium flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#B58A4A]" />
                  Chủ thể văn hoá / Cộng đồng:
                </dt>
                <dd className="text-[#211E1B] font-medium mt-0.5">{craft.ethnicCommunity}</dd>
              </div>

              <div>
                <dt className="text-[#211E1B]/50 font-medium flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#B58A4A]" />
                  Nhóm ngành nghề:
                </dt>
                <dd className="text-[#211E1B] font-medium mt-0.5">{craft.categoryName}</dd>
              </div>

              <div>
                <dt className="text-[#211E1B]/50 font-medium flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#B58A4A]" />
                  Tài liệu kiểm chứng:
                </dt>
                <dd className="text-[#9F3035] font-semibold mt-0.5">
                  {linkedRefs.length} tài liệu chính thống
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Asymmetric Reading Canvas (2-column layout: 70% editorial prose, 30% margin notes & citations) */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Editorial Text (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Section 1: Lịch sử và Cội nguồn */}
            <section className="space-y-3">
              <h2 className="font-heritage-serif text-2xl font-bold text-[#5E2027] pb-2 border-b border-[#211E1B]/10">
                1. Lịch sử hình thành và Cội nguồn tri thức
              </h2>
              <p className="text-sm text-[#211E1B]/85 leading-relaxed drop-cap">
                {craft.historicalOrigin}
              </p>
              <p className="text-sm text-[#211E1B]/85 leading-relaxed pt-2">
                {craft.formationDevelopment}
              </p>
            </section>

            {/* Section 2: Nguyên liệu và Công cụ */}
            <section className="space-y-4">
              <h2 className="font-heritage-serif text-2xl font-bold text-[#5E2027] pb-2 border-b border-[#211E1B]/10">
                2. Nguyên liệu tự nhiên & Công cụ truyền thống
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded border border-[#211E1B]/15 space-y-2">
                  <h4 className="text-xs font-bold text-[#9F3035] uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    Nguyên liệu chính
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#211E1B]/80 list-disc list-inside">
                    {craft.primaryMaterials.map((mat, i) => (
                      <li key={i}>{mat}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-white rounded border border-[#211E1B]/15 space-y-2">
                  <h4 className="text-xs font-bold text-[#986C4C] uppercase tracking-wider flex items-center gap-1.5">
                    <Hammer className="w-3.5 h-3.5" />
                    Công cụ chế tác
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#211E1B]/80 list-disc list-inside">
                    {craft.traditionalTools.map((tool, i) => (
                      <li key={i}>{tool}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3: Quy trình chế tác từng bước */}
            <section className="space-y-4">
              <h2 className="font-heritage-serif text-2xl font-bold text-[#5E2027] pb-2 border-b border-[#211E1B]/10">
                3. Quy trình thực hiện nghề qua từng công đoạn
              </h2>
              
              <div className="space-y-3">
                {craft.productionSteps.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="p-4 bg-white rounded border border-[#211E1B]/15 flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#5E2027] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {step.stepNumber}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-heritage-serif text-base font-bold text-[#211E1B]">
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#211E1B]/80 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: Kỹ thuật đặc trưng & Sản phẩm tiêu biểu */}
            <section className="space-y-4">
              <h2 className="font-heritage-serif text-2xl font-bold text-[#5E2027] pb-2 border-b border-[#211E1B]/10">
                4. Kỹ thuật độc bản & Sản phẩm tiêu biểu
              </h2>

              <div className="p-4 bg-[#F5F0E6] rounded border border-[#B58A4A]/30 space-y-2">
                <h4 className="text-xs font-bold text-[#9F3035] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Kỹ thuật đặc trưng độc đáo:
                </h4>
                <ul className="space-y-1.5 text-xs text-[#211E1B]/80 list-disc list-inside">
                  {craft.distinctiveTechniques.map((tech, i) => (
                    <li key={i}><strong>{tech}</strong></li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#211E1B] uppercase tracking-wider mb-2">
                  Các sản phẩm đại diện tiêu biểu:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {craft.representativeProducts.map((prod, i) => (
                    <div key={i} className="p-2.5 bg-white rounded border border-[#211E1B]/10 text-xs text-[#211E1B]">
                      • {prod}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 5: Hoa văn và Ý nghĩa biểu tượng */}
            <section className="space-y-3">
              <h2 className="font-heritage-serif text-2xl font-bold text-[#5E2027] pb-2 border-b border-[#211E1B]/10">
                5. Hoa văn & Ý nghĩa biểu tượng thẩm mỹ
              </h2>
              <blockquote className="p-4 bg-white rounded border-y border-[#B58A4A]/40 text-xs sm:text-sm italic font-serif text-[#211E1B]/85 leading-relaxed">
                "{craft.motifsAndSymbolism}"
              </blockquote>
            </section>

            {/* Section 6: Giá trị văn hoá, xã hội & Vai trò nghệ nhân */}
            <section className="space-y-4">
              <h2 className="font-heritage-serif text-2xl font-bold text-[#5E2027] pb-2 border-b border-[#211E1B]/10">
                6. Giá trị văn hoá - xã hội & Vai trò người giữ nghề
              </h2>
              <p className="text-xs sm:text-sm text-[#211E1B]/85 leading-relaxed">
                {craft.culturalSocioEconomicValues}
              </p>
              <div className="p-4 bg-white rounded border border-[#211E1B]/15 space-y-1 text-xs">
                <span className="font-semibold text-[#5E2027]">Vai trò của nghệ nhân:</span>
                <p className="text-[#211E1B]/80 leading-relaxed">{craft.artisanRole}</p>
              </div>
            </section>

            {/* Section 7: Thực trạng bảo tồn, Khó khăn & Giải pháp */}
            <section className="space-y-4">
              <h2 className="font-heritage-serif text-2xl font-bold text-[#5E2027] pb-2 border-b border-[#211E1B]/10">
                7. Thực trạng bảo tồn & Khuyến nghị tương lai
              </h2>
              <p className="text-xs sm:text-sm text-[#211E1B]/85 leading-relaxed">
                {craft.conservationStatus}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50/70 border border-red-200 rounded space-y-2">
                  <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Khó khăn & Thách thức
                  </h4>
                  <ul className="space-y-1 text-xs text-red-950/80 list-disc list-inside">
                    {craft.challenges.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded space-y-2">
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    Giải pháp phát huy giá trị
                  </h4>
                  <ul className="space-y-1 text-xs text-emerald-950/80 list-disc list-inside">
                    {craft.conservationSolutions.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Gallery Images */}
            {craft.galleryImages.length > 1 && (
              <section className="space-y-4 pt-4 border-t border-[#211E1B]/10">
                <h3 className="font-heritage-serif text-xl font-bold text-[#5E2027]">
                  Tư liệu hình ảnh khảo cứu bổ sung
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {craft.galleryImages.slice(1).map((img, i) => (
                    <div key={i} className="bg-white rounded border border-[#211E1B]/15 p-2 space-y-2">
                      <div className="relative aspect-4/3 rounded overflow-hidden bg-stone-100">
                        <HeritageImage
                          src={img.url}
                          alt={img.caption}
                          category={craft.category}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => setActiveImageZoom(img.url)}
                          className="absolute bottom-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded cursor-pointer"
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#211E1B]/80 font-medium">{img.caption}</p>
                      <p className="text-[10px] text-[#211E1B]/50">{img.author} · {img.license}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Margin Notes & References Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* References Card */}
            <div className="bg-white p-5 rounded-lg border border-[#211E1B]/15 shadow-xs space-y-4 sticky top-36">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5E2027] pb-2 border-b border-[#211E1B]/10">
                <BookOpen className="w-4 h-4 text-[#B58A4A]" />
                Nguồn tham khảo đối chiếu ({linkedRefs.length})
              </div>

              {linkedRefs.length > 0 ? (
                <div className="space-y-3">
                  {linkedRefs.map((ref) => (
                    <div
                      key={ref.id}
                      className="p-3 rounded bg-[#FBF9F5] border border-[#211E1B]/10 hover:border-[#9F3035] transition-colors space-y-1.5"
                    >
                      <h5 className="text-xs font-bold text-[#5E2027] line-clamp-2">
                        {ref.title}
                      </h5>
                      <p className="text-[11px] text-[#211E1B]/70">
                        {ref.authorOrg} ({ref.year})
                      </p>
                      <p className="text-[11px] text-[#211E1B]/60 line-clamp-2">
                        {ref.summary}
                      </p>
                      <button
                        onClick={() => onSelectReference(ref)}
                        className="text-[11px] font-semibold text-[#9F3035] hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                      >
                        <span>Xem chi tiết hồ sơ tài liệu</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#211E1B]/60">
                  Đang cập nhật thêm văn bản tham khảo chính thống cho nghề này.
                </p>
              )}

              {/* Ethics reminder */}
              <div className="p-3 bg-[#F5F0E6] rounded text-[11px] text-[#211E1B]/70 leading-relaxed border border-[#B58A4A]/30">
                <strong>Nguyên tắc lưu trữ di sản:</strong> Mọi danh xưng và thông số kỹ thuật đều được viện dẫn từ các công trình nghiên cứu của Cục Di sản văn hoá hoặc Bảo tàng địa phương.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImageZoom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xs"
          onClick={() => setActiveImageZoom(null)}
        >
          <div className="max-w-4xl max-h-[90vh] relative p-2" onClick={(e) => e.stopPropagation()}>
            <HeritageImage
              src={activeImageZoom}
              alt="Ảnh phóng to"
              category={craft.category}
              className="max-h-[85vh] max-w-full rounded shadow-2xl object-contain mx-auto"
            />
            <button
              onClick={() => setActiveImageZoom(null)}
              className="absolute top-4 right-4 p-2 bg-black/70 hover:bg-black text-white rounded-full cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

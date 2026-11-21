import React, { useState } from 'react';
import { MediaItem } from '../types/heritage';
import { HeritageImage } from '../components/HeritageImage';
import {
  Image as ImageIcon,
  ZoomIn,
  Filter,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Shield,
  X
} from 'lucide-react';

interface MediaViewProps {
  media: MediaItem[];
  activeModalItem: MediaItem | null;
  onOpenModal: (item: MediaItem) => void;
  onCloseModal: () => void;
}

export const MediaView: React.FC<MediaViewProps> = ({
  media,
  activeModalItem,
  onOpenModal,
  onCloseModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tất cả tư liệu' },
    { id: 'process', label: 'Quy trình chế tác' },
    { id: 'product', label: 'Sản phẩm hoàn thiện' },
    { id: 'artisan', label: 'Nghệ nhân & Làng nghề' },
    { id: 'material', label: 'Nguyên liệu tự nhiên' },
    { id: 'tool', label: 'Công cụ truyền thống' },
    { id: 'motif', label: 'Hoa văn họa tiết' }
  ];

  const filteredMedia = media.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-[#9F3035] font-semibold">
          Kho lưu trữ đa phương tiện
        </span>
        <h1 className="font-heritage-serif text-3xl sm:text-4xl font-bold text-[#5E2027]">
          Thư Viện Hình Ảnh & Tư Liệu Khảo Cứu
        </h1>
        <p className="text-xs sm:text-sm text-[#211E1B]/75 max-w-3xl leading-relaxed">
          Tập hợp các hình ảnh tư liệu khảo sát thực địa, sản phẩm gốm, tranh sơn mài, khung cửi thổ cẩm và không gian xưởng thợ Đông Nam Bộ kèm thông tin bản quyền và nguồn gốc minh bạch.
        </p>
      </div>

      {/* Category Pills / Filter bar */}
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-[#211E1B]/10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#9F3035] text-white shadow-xs'
                : 'bg-white border border-[#211E1B]/15 text-[#211E1B]/80 hover:bg-[#F5F0E6]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenModal(item)}
            className="bg-white rounded-lg border border-[#211E1B]/15 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              {/* Image Frame */}
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <HeritageImage
                  src={item.url}
                  alt={item.title}
                  craftTitle={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  {item.isIllustration ? (
                    <span className="text-[10px] font-semibold bg-stone-900/80 text-stone-200 px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-400" />
                      Hình minh hoạ
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold bg-[#5E2027]/90 text-white px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Tư liệu lịch sử
                    </span>
                  )}
                </div>

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <div className="p-2 bg-black/60 rounded-full flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5">
                    <ZoomIn className="w-4 h-4" />
                    <span>Xem toàn màn hình</span>
                  </div>
                </div>
              </div>

              {/* Caption Content */}
              <div className="p-4 space-y-2">
                <div className="text-[11px] font-semibold text-[#986C4C] uppercase flex items-center gap-1">
                  <span>{item.craftName}</span>
                </div>
                <h3 className="font-heritage-serif text-base font-bold text-[#211E1B] group-hover:text-[#9F3035] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#211E1B]/70 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Meta info footer */}
            <div className="px-4 py-2.5 bg-[#FBF9F5] border-t border-[#211E1B]/10 text-[11px] text-[#211E1B]/60 flex items-center justify-between">
              <span className="truncate max-w-[160px] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#B58A4A]" />
                {item.location.split(',')[0]}
              </span>
              <span className="truncate max-w-[140px] text-right font-medium">
                {item.author}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Details Modal */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs overflow-y-auto"
          onClick={onCloseModal}
        >
          <div
            className="bg-[#FBF9F5] rounded-lg border border-[#B58A4A]/40 max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 shadow-2xl relative text-[#211E1B] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onCloseModal}
              className="absolute top-4 right-4 p-2 bg-white/80 rounded-full text-[#211E1B] hover:bg-white cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Large Image Frame */}
            <div className="relative rounded-lg overflow-hidden bg-black/90 max-h-[60vh] flex items-center justify-center">
              <HeritageImage
                src={activeModalItem.url}
                alt={activeModalItem.title}
                craftTitle={activeModalItem.title}
                className="max-h-[58vh] max-w-full object-contain mx-auto"
              />
            </div>

            {/* Metadata breakdown */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-semibold text-[#9F3035] uppercase tracking-wider">
                    {activeModalItem.craftName}
                  </span>
                  <h2 className="font-heritage-serif text-2xl font-bold text-[#5E2027]">
                    {activeModalItem.title}
                  </h2>
                </div>

                {activeModalItem.isIllustration ? (
                  <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1 rounded border border-amber-200 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Hình ảnh minh họa nghiên cứu
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Ảnh tư liệu hiện vật bảo tàng
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#211E1B]/85 leading-relaxed">
                {activeModalItem.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-white rounded border border-[#211E1B]/15 text-xs text-[#211E1B]/70">
                <div>
                  <strong>Địa điểm ghi nhận:</strong>
                  <p className="text-[#211E1B] mt-0.5">{activeModalItem.location}</p>
                </div>
                <div>
                  <strong>Nguồn ảnh / Tác giả:</strong>
                  <p className="text-[#211E1B] mt-0.5">{activeModalItem.author}</p>
                </div>
                <div>
                  <strong>Giấy phép sử dụng:</strong>
                  <p className="text-[#9F3035] font-medium mt-0.5">{activeModalItem.license}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={onCloseModal}
                className="px-5 py-2 bg-[#211E1B] text-white text-xs font-semibold rounded hover:bg-[#5E2027] transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

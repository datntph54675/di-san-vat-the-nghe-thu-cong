import React from 'react';
import { Craft } from '../types/heritage';
import { SoutheastMap } from '../components/SoutheastMap';
import { Compass, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface MapViewProps {
  crafts: Craft[];
  onSelectCraft: (craft: Craft) => void;
}

export const MapView: React.FC<MapViewProps> = ({ crafts, onSelectCraft }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* View Header */}
      <div className="space-y-2">
        <div className="text-xs uppercase tracking-widest text-[#9F3035] font-semibold flex items-center gap-1.5">
          <Compass className="w-4 h-4" />
          Địa lý văn hoá & Phân bố không gian
        </div>
        <h1 className="font-heritage-serif text-3xl sm:text-4xl font-bold text-[#5E2027]">
          Bản Đồ Di Sản Nghề Thủ Công Đông Nam Bộ
        </h1>
        <p className="text-xs sm:text-sm text-[#211E1B]/75 max-w-3xl leading-relaxed">
          Khám phá sự phân bố địa lý của các làng nghề và tri thức chế tác thủ công truyền thống qua 6 tỉnh thành vùng Đông Nam Bộ: Đồng Nai, Bình Dương, Bình Phước, Tây Ninh, TP. Hồ Chí Minh và Bà Rịa - Vũng Tàu.
        </p>
      </div>

      {/* Main Interactive Map Component */}
      <SoutheastMap crafts={crafts} onSelectCraft={onSelectCraft} />

      {/* Descriptive Section on Southeast Cultural Geography */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="bg-white p-5 rounded-lg border border-[#211E1B]/15 space-y-2">
          <h3 className="font-heritage-serif text-base font-bold text-[#5E2027] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Vùng sông Đồng Nai & Sài Gòn
          </h3>
          <p className="text-xs text-[#211E1B]/75 leading-relaxed">
            Trung tâm của các dòng gốm mỹ nghệ và sơn mài: Gốm Biên Hòa (Đồng Nai), Sơn mài Tương Bình Hiệp và Gốm Lái Thiêu (Bình Dương). Vùng sông nước thuận lợi giao thương và hình thành các phố thợ thủ công sầm uất từ thế kỷ 18-19.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-[#211E1B]/15 space-y-2">
          <h3 className="font-heritage-serif text-base font-bold text-[#211E1B] flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            Vùng rừng núi Chiến khu Đ & Cát Tiên
          </h3>
          <p className="text-xs text-[#211E1B]/75 leading-relaxed">
            Không gian văn hoá của các cư dân bản địa lâu đời: người Chơ Ro với nghề đan lát mây tre ngâm bùn, người Mạ với tri thức dệt hoa văn nổi ở Tà Lài, gắn liền với đạo lý tri ân mẹ thiên nhiên và thần rừng.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-[#211E1B]/15 space-y-2">
          <h3 className="font-heritage-serif text-base font-bold text-[#986C4C] flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-stone-500" />
            Vùng biên giới & Bán sơn địa
          </h3>
          <p className="text-xs text-[#211E1B]/75 leading-relaxed">
            Đại ngàn Bù Gia Mập (Bình Phước) nơi phụ nữ S'tiêng kiên trì ngồi cạp cửi lưng dệt thổ cẩm, và các vùng trảng cỏ bàng Tây Ninh với nghề đan đệm mây tre thích ứng khí hậu nắng gió.
          </p>
        </div>
      </div>
    </div>
  );
};

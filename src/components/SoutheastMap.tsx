import React, { useState } from 'react';
import { Craft, CraftCategory } from '../types/heritage';
import { MapPin, Info, ArrowUpRight, CheckCircle2, Clock, AlertTriangle, Layers } from 'lucide-react';
import { HeritageImage } from './HeritageImage';

interface SoutheastMapProps {
  crafts: Craft[];
  onSelectCraft: (craft: Craft) => void;
}

// 6 provinces of Southeast Region (Đông Nam Bộ)
interface ProvinceMeta {
  id: string;
  name: string;
  color: string;
  center: { x: number; y: number };
  svgPath: string;
  description: string;
}

const PROVINCES: ProvinceMeta[] = [
  {
    id: 'binh-phuoc',
    name: 'Bình Phước',
    color: '#8B5A2B',
    center: { x: 490, y: 130 },
    svgPath: 'M 360,50 L 590,60 L 640,150 L 550,210 L 410,210 L 370,140 Z',
    description: 'Địa bàn cư trú lâu đời của đồng bào S\'tiêng, M\'nông với rừng nguyên sinh Bù Gia Mập và di sản dệt cạp cửi lưng.'
  },
  {
    id: 'tay-ninh',
    name: 'Tây Ninh',
    color: '#986C4C',
    center: { x: 270, y: 220 },
    svgPath: 'M 220,110 L 360,110 L 370,220 L 330,310 L 210,280 L 190,180 Z',
    description: 'Vùng đất giáp biên giới với núi Bà Đen hùng vĩ, gắn liền với nghề đan đệm bàng, mây tre và ẩm thực truyền thống.'
  },
  {
    id: 'binh-duong',
    name: 'Bình Dương',
    color: '#5E2027',
    center: { x: 380, y: 290 },
    svgPath: 'M 370,210 L 440,210 L 450,280 L 410,360 L 330,330 L 370,250 Z',
    description: 'Thủ phủ nghề thủ công miền Đông: làng sơn mài Tương Bình Hiệp hơn 300 năm, gốm men màu Lái Thiêu ven sông Sài Gòn.'
  },
  {
    id: 'dong-nai',
    name: 'Đồng Nai',
    color: '#9F3035',
    center: { x: 570, y: 310 },
    svgPath: 'M 440,210 L 550,210 L 640,150 L 730,220 L 720,330 L 630,420 L 480,410 L 450,320 Z',
    description: 'Trung tâm gốm Biên Hòa men xanh đồng trổ bông, cùng tri thức đan lát mây tre của người Chơ Ro và dệt thổ cẩm của người Mạ tại Vườn QG Cát Tiên.'
  },
  {
    id: 'ho-chi-minh',
    name: 'TP. Hồ Chí Minh',
    color: '#293D4B',
    center: { x: 370, y: 440 },
    svgPath: 'M 330,330 L 410,360 L 450,400 L 420,510 L 300,500 L 290,410 Z',
    description: 'Đô thị di sản phương Nam với các phường thợ mộc Chợ Lớn, chạm khắc gỗ Hóc Môn và các làng nghề cổ truyền ven sông.'
  },
  {
    id: 'ba-ria-vung-tau',
    name: 'Bà Rịa - Vũng Tàu',
    color: '#B58A4A',
    center: { x: 550, y: 500 },
    svgPath: 'M 480,410 L 630,420 L 610,510 L 550,560 L 470,510 Z',
    description: 'Vùng duyên hải giao lưu thương mại, lưu giữ các nghề chế tác vỏ sò ốc mỹ nghệ và đan lưới truyền thống.'
  }
];

// Map craft pins to specific visual offsets on SVG canvas (width 900, height 620)
const CRAFT_PIN_POSITIONS: Record<string, { x: number; y: number }> = {
  'craft-gom-bien-hoa': { x: 470, y: 350 },
  'craft-son-mai-tuong-binh-hiep': { x: 375, y: 285 },
  'craft-det-tho-cam-stieng': { x: 505, y: 135 },
  'craft-dan-lat-cho-ro': { x: 590, y: 280 },
  'craft-gom-lai-thieu': { x: 395, y: 345 },
  'craft-det-hoa-van-ma': { x: 670, y: 220 },
  'craft-cham-khac-go-sai-gon': { x: 360, y: 430 },
  'craft-dan-lat-dem-bang-tay-ninh': { x: 260, y: 210 }
};

export const SoutheastMap: React.FC<SoutheastMapProps> = ({ crafts, onSelectCraft }) => {
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(null);
  const [selectedCraft, setSelectedCraft] = useState<Craft | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<CraftCategory | 'all'>('all');

  const filteredCrafts = crafts.filter((c) => {
    const matchCategory = categoryFilter === 'all' || c.category === categoryFilter;
    const matchProvince = !selectedProvinceId || c.province.toLowerCase().includes(
      selectedProvinceId === 'ho-chi-minh' ? 'hồ chí minh' :
      selectedProvinceId === 'ba-ria-vung-tau' ? 'vũng tàu' :
      selectedProvinceId.replace('-', ' ')
    );
    return matchCategory && matchProvince;
  });

  const selectedProvince = PROVINCES.find((p) => p.id === selectedProvinceId);

  const getStatusBadge = (status: Craft['heritageStatus']) => {
    switch (status) {
      case 'officially_recognized':
        return (
          <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            Đã ghi danh Quốc gia
          </span>
        );
      case 'under_research':
        return (
          <span className="flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            <Clock className="w-3 h-3" />
            Đang nghiên cứu đề xuất
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-[11px] font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
            <AlertTriangle className="w-3 h-3" />
            Minh hoạ – Chưa xác minh
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg border border-[#211E1B]/15 shadow-sm p-4 sm:p-6 lg:p-8">
      {/* Top Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#211E1B]/10">
        <div>
          <h3 className="font-heritage-serif text-xl sm:text-2xl font-bold text-[#5E2027]">
            Bản đồ Phân bố Di sản Thủ công Đông Nam Bộ
          </h3>
          <p className="text-xs text-[#211E1B]/70 mt-1">
            Không gian văn hoá 6 tỉnh thành Đông Nam Bộ · Nhấp vào tỉnh hoặc điểm di sản để tra cứu tư liệu
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F5F0E6] rounded border border-[#211E1B]/10">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
              categoryFilter === 'all'
                ? 'bg-[#9F3035] text-white shadow-xs'
                : 'text-[#211E1B]/70 hover:text-[#211E1B]'
            }`}
          >
            Tất cả nghề
          </button>
          <button
            onClick={() => setCategoryFilter('pottery')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
              categoryFilter === 'pottery'
                ? 'bg-[#9F3035] text-white shadow-xs'
                : 'text-[#211E1B]/70 hover:text-[#211E1B]'
            }`}
          >
            Gốm sứ
          </button>
          <button
            onClick={() => setCategoryFilter('lacquer')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
              categoryFilter === 'lacquer'
                ? 'bg-[#9F3035] text-white shadow-xs'
                : 'text-[#211E1B]/70 hover:text-[#211E1B]'
            }`}
          >
            Sơn mài
          </button>
          <button
            onClick={() => setCategoryFilter('weaving')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
              categoryFilter === 'weaving'
                ? 'bg-[#9F3035] text-white shadow-xs'
                : 'text-[#211E1B]/70 hover:text-[#211E1B]'
            }`}
          >
            Dệt vải
          </button>
          <button
            onClick={() => setCategoryFilter('basketry')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
              categoryFilter === 'basketry'
                ? 'bg-[#9F3035] text-white shadow-xs'
                : 'text-[#211E1B]/70 hover:text-[#211E1B]'
            }`}
          >
            Đan lát
          </button>
          <button
            onClick={() => setCategoryFilter('woodwork')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
              categoryFilter === 'woodwork'
                ? 'bg-[#9F3035] text-white shadow-xs'
                : 'text-[#211E1B]/70 hover:text-[#211E1B]'
            }`}
          >
            Mộc mỹ nghệ
          </button>
        </div>
      </div>

      {/* Main Map View & Inspection Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
        {/* SVG Map (8 cols) */}
        <div className="lg:col-span-8 bg-[#FBF9F5] rounded border border-[#211E1B]/10 p-2 sm:p-4 relative overflow-hidden">
          {/* Subtle Map Header Legend */}
          <div className="flex items-center justify-between text-xs text-[#211E1B]/60 mb-2 px-2">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#B58A4A]" />
              Bản đồ véc-tơ minh họa phân bố không gian di sản Đông Nam Bộ
            </span>
            {selectedProvinceId && (
              <button
                onClick={() => setSelectedProvinceId(null)}
                className="text-[#9F3035] hover:underline font-medium cursor-pointer"
              >
                Bỏ chọn tỉnh ({selectedProvince?.name})
              </button>
            )}
          </div>

          <div className="relative w-full aspect-4/3 max-h-[520px]">
            <svg
              viewBox="150 40 600 530"
              className="w-full h-full select-none"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.05))' }}
            >
              {/* Regional Provinces */}
              {PROVINCES.map((prov) => {
                const isSelected = selectedProvinceId === prov.id;
                return (
                  <g
                    key={prov.id}
                    onClick={() => setSelectedProvinceId(isSelected ? null : prov.id)}
                    className="cursor-pointer group transition-all"
                  >
                    <path
                      d={prov.svgPath}
                      fill={isSelected ? '#9F3035' : '#F5F0E6'}
                      stroke={isSelected ? '#5E2027' : '#B58A4A'}
                      strokeWidth={isSelected ? '2.5' : '1.5'}
                      className="transition-colors duration-200 group-hover:fill-[#B58A4A]/25"
                    />
                    <text
                      x={prov.center.x}
                      y={prov.center.y}
                      textAnchor="middle"
                      className={`text-[13px] font-heritage-serif font-semibold pointer-events-none transition-colors ${
                        isSelected ? 'fill-white' : 'fill-[#211E1B]'
                      }`}
                    >
                      {prov.name}
                    </text>
                  </g>
                );
              })}

              {/* Craft Markers */}
              {filteredCrafts.map((craft) => {
                const pos = CRAFT_PIN_POSITIONS[craft.id] || { x: 450, y: 300 };
                const isSelected = selectedCraft?.id === craft.id;
                const isRecognized = craft.heritageStatus === 'officially_recognized';

                return (
                  <g
                    key={craft.id}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCraft(craft);
                    }}
                    className="cursor-pointer group"
                  >
                    {/* Ripple halo for officially recognized heritage */}
                    {isRecognized && (
                      <circle
                        r="18"
                        fill="#9F3035"
                        fillOpacity="0.2"
                        className="animate-pulse"
                      />
                    )}

                    {/* Outer pin circle */}
                    <circle
                      r={isSelected ? '12' : '9'}
                      fill={isSelected ? '#5E2027' : isRecognized ? '#9F3035' : '#293D4B'}
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      className="transition-all duration-150 group-hover:scale-125"
                    />

                    {/* Inner core */}
                    <circle r="3" fill="#F5F0E6" />

                    {/* Tooltip on hover */}
                    <title>{craft.name} ({craft.province})</title>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Guide Strip */}
          <div className="flex flex-wrap items-center justify-between text-xs text-[#211E1B]/70 pt-3 border-t border-[#211E1B]/10 px-2 gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#9F3035] border border-white" />
                Di sản Quốc gia
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#293D4B] border border-white" />
                Nghề khảo cứu / Đề xuất
              </span>
            </div>
            <span>Hiển thị {filteredCrafts.length} địa điểm nghề thủ công</span>
          </div>
        </div>

        {/* Sidebar Info Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* If craft pin is selected, show spotlight card */}
          {selectedCraft ? (
            <div className="bg-[#F5F0E6] border border-[#B58A4A]/30 rounded-lg p-5 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#986C4C] font-semibold">
                    {selectedCraft.categoryName} · {selectedCraft.province}
                  </span>
                  <h4 className="font-heritage-serif text-lg font-bold text-[#5E2027] mt-0.5">
                    {selectedCraft.name}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedCraft(null)}
                  className="text-xs text-[#211E1B]/50 hover:text-[#211E1B] p-1"
                >
                  ✕
                </button>
              </div>

              {/* Status */}
              <div>{getStatusBadge(selectedCraft.heritageStatus)}</div>

              {/* Photo preview */}
              <div className="w-full h-36 rounded overflow-hidden bg-stone-200">
                <HeritageImage
                  src={selectedCraft.mainImage}
                  alt={selectedCraft.name}
                  category={selectedCraft.category}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Summary */}
              <p className="text-xs text-[#211E1B]/80 leading-relaxed line-clamp-3">
                {selectedCraft.shortDescription}
              </p>

              <div className="text-xs text-[#211E1B]/70 space-y-1 pt-2 border-t border-[#211E1B]/10">
                <p><strong>Cộng đồng:</strong> {selectedCraft.ethnicCommunity}</p>
                <p><strong>Địa bàn:</strong> {selectedCraft.specificLocation}</p>
              </div>

              <button
                onClick={() => onSelectCraft(selectedCraft)}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#9F3035] hover:bg-[#5E2027] text-white text-xs font-semibold rounded transition-colors cursor-pointer"
              >
                <span>Xem hồ sơ di sản chi tiết</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : selectedProvince ? (
            /* Selected Province details */
            <div className="bg-[#F5F0E6] border border-[#211E1B]/15 rounded-lg p-5 space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#9F3035] font-semibold">
                Khu vực địa lý văn hoá
              </span>
              <h4 className="font-heritage-serif text-xl font-bold text-[#5E2027]">
                Tỉnh / Thành: {selectedProvince.name}
              </h4>
              <p className="text-xs text-[#211E1B]/80 leading-relaxed">
                {selectedProvince.description}
              </p>
              <div className="pt-2 border-t border-[#211E1B]/10">
                <h5 className="text-xs font-bold text-[#211E1B] mb-2">
                  Các nghề thủ công ghi nhận ({filteredCrafts.length}):
                </h5>
                <div className="space-y-1.5">
                  {filteredCrafts.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCraft(c)}
                      className="w-full text-left p-2 rounded bg-white hover:bg-stone-50 border border-stone-200 text-xs transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span className="font-medium text-[#211E1B]">{c.name}</span>
                      <span className="text-[11px] text-[#9F3035]">{c.categoryName}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Default prompt card */
            <div className="bg-[#FBF9F5] border border-dashed border-[#211E1B]/20 rounded-lg p-6 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#B58A4A]/20 text-[#B58A4A] mx-auto flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-heritage-serif text-base font-bold text-[#211E1B]">
                Khám phá bản đồ di sản
              </h4>
              <p className="text-xs text-[#211E1B]/70 leading-relaxed">
                Nhấp vào bất kỳ vòng tròn màu nào trên bản đồ để tra cứu tên nghề, hiện vật đặc trưng và tình trạng ghi danh di sản.
              </p>
              <div className="pt-3 border-t border-[#211E1B]/10 text-left space-y-1 text-xs text-[#211E1B]/70">
                <p className="font-medium text-[#5E2027] mb-1">Gợi ý khám phá:</p>
                <p>• <strong>Gốm Biên Hòa:</strong> Đồng Nai</p>
                <p>• <strong>Sơn mài Tương Bình Hiệp:</strong> Bình Dương</p>
                <p>• <strong>Dệt cạp cửi S'tiêng:</strong> Bình Phước</p>
                <p>• <strong>Đan lát mây tre Chơ Ro:</strong> Đồng Nai</p>
              </div>
            </div>
          )}

          {/* Quick List of all crafts under current filter */}
          <div className="bg-white rounded border border-[#211E1B]/10 p-4">
            <h5 className="text-xs font-bold text-[#5E2027] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#B58A4A]" />
              Danh mục ({filteredCrafts.length} nghề phù hợp)
            </h5>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {filteredCrafts.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCraft(c)}
                  className={`p-2 rounded text-xs cursor-pointer transition-colors flex items-center justify-between ${
                    selectedCraft?.id === c.id
                      ? 'bg-[#9F3035]/10 text-[#9F3035] font-semibold'
                      : 'hover:bg-[#F5F0E6] text-[#211E1B]/80'
                  }`}
                >
                  <span className="truncate mr-2">{c.name}</span>
                  <span className="text-[10px] text-[#986C4C] shrink-0">{c.province}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

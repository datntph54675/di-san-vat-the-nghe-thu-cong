import React, { useState } from 'react';
import { Craft, CraftCategory, HeritageStatus } from '../types/heritage';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RotateCcw,
  SlidersHorizontal,
  ArrowUpRight
} from 'lucide-react';
import { HeritageImage } from '../components/HeritageImage';

interface CraftsViewProps {
  crafts: Craft[];
  onSelectCraft: (craft: Craft) => void;
}

export const CraftsView: React.FC<CraftsViewProps> = ({ crafts, onSelectCraft }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CraftCategory | 'all'>('all');
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [selectedCommunity, setSelectedCommunity] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<HeritageStatus | 'all'>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name_asc' | 'name_desc' | 'featured'>('featured');

  // Extract unique communities & materials
  const provinces = ['Đồng Nai', 'Bình Dương', 'Bình Phước', 'Tây Ninh', 'TP. Hồ Chí Minh', 'Bà Rịa - Vũng Tàu'];
  const communities = ['Kinh', 'Hoa', 'S\'tiêng', 'Chơ Ro', 'Mạ', 'Khmer'];
  const materials = ['Đất sét', 'Sơn ta', 'Tre', 'Mây', 'Bông', 'Gỗ', 'Vỏ trứng', 'Cỏ bàng'];

  // Filtering
  const filteredList = crafts.filter((c) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        c.name.toLowerCase().includes(q) ||
        c.englishName.toLowerCase().includes(q) ||
        c.shortDescription.toLowerCase().includes(q) ||
        c.province.toLowerCase().includes(q) ||
        c.ethnicCommunity.toLowerCase().includes(q) ||
        c.primaryMaterials.some((m) => m.toLowerCase().includes(q));
      if (!matchSearch) return false;
    }

    // Category
    if (selectedCategory !== 'all' && c.category !== selectedCategory) {
      return false;
    }

    // Province
    if (selectedProvince !== 'all' && !c.province.includes(selectedProvince)) {
      return false;
    }

    // Community
    if (selectedCommunity !== 'all' && !c.ethnicCommunity.includes(selectedCommunity)) {
      return false;
    }

    // Status
    if (selectedStatus !== 'all' && c.heritageStatus !== selectedStatus) {
      return false;
    }

    // Material
    if (
      selectedMaterial !== 'all' &&
      !c.primaryMaterials.some((m) => m.toLowerCase().includes(selectedMaterial.toLowerCase()))
    ) {
      return false;
    }

    return true;
  });

  // Sorting
  filteredList.sort((a, b) => {
    if (sortBy === 'name_asc') return a.name.localeCompare(b.name, 'vi');
    if (sortBy === 'name_desc') return b.name.localeCompare(a.name, 'vi');
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedProvince('all');
    setSelectedCommunity('all');
    setSelectedStatus('all');
    setSelectedMaterial('all');
    setSortBy('featured');
  };

  const getStatusBadge = (status: Craft['heritageStatus']) => {
    switch (status) {
      case 'officially_recognized':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Di sản Quốc gia
          </span>
        );
      case 'under_research':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            Đang khảo cứu
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
            <AlertTriangle className="w-3 h-3 text-stone-500" />
            Chưa xác minh
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-[#9F3035] font-semibold">
          Thư viện di sản số
        </span>
        <h1 className="font-heritage-serif text-3xl sm:text-4xl font-bold text-[#5E2027]">
          Kho Lưu Trữ Nghề Thủ Công Truyền Thống
        </h1>
        <p className="text-xs sm:text-sm text-[#211E1B]/75 max-w-3xl leading-relaxed">
          Tìm kiếm và tra cứu toàn diện các nghề thủ công vùng văn hoá Đông Nam Bộ theo nhóm ngành nghề, địa phương phân bố, chủ thể cộng đồng và hiện trạng hồ sơ di sản.
        </p>
      </div>

      {/* Search and Filters Toolbar */}
      <div className="bg-white p-5 rounded-lg border border-[#211E1B]/15 shadow-xs space-y-4">
        {/* Search Input Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#211E1B]/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo tên nghề, địa phương, vật liệu, hoặc kỹ thuật chế tác..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#FBF9F5] border border-[#211E1B]/15 rounded text-xs text-[#211E1B] focus:outline-none focus:border-[#9F3035] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#211E1B]/50 hover:text-[#211E1B]"
            >
              ✕
            </button>
          )}
        </div>

        {/* Multi-facet Filter Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {/* Category */}
          <div>
            <label className="block text-[11px] font-semibold text-[#211E1B]/70 mb-1">
              Nhóm ngành nghề
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="w-full p-2 bg-[#FBF9F5] border border-[#211E1B]/15 rounded text-xs text-[#211E1B] focus:outline-none focus:border-[#9F3035]"
            >
              <option value="all">Tất cả nhóm nghề</option>
              <option value="pottery">Gốm & chế tác đất</option>
              <option value="lacquer">Nghề sơn mài</option>
              <option value="weaving">Dệt & chế tác vải</option>
              <option value="basketry">Nghề đan lát</option>
              <option value="woodwork">Chạm khắc & mộc</option>
            </select>
          </div>

          {/* Province */}
          <div>
            <label className="block text-[11px] font-semibold text-[#211E1B]/70 mb-1">
              Địa phương
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full p-2 bg-[#FBF9F5] border border-[#211E1B]/15 rounded text-xs text-[#211E1B] focus:outline-none focus:border-[#9F3035]"
            >
              <option value="all">Tất cả tỉnh / thành</option>
              {provinces.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Community */}
          <div>
            <label className="block text-[11px] font-semibold text-[#211E1B]/70 mb-1">
              Cộng đồng dân tộc
            </label>
            <select
              value={selectedCommunity}
              onChange={(e) => setSelectedCommunity(e.target.value)}
              className="w-full p-2 bg-[#FBF9F5] border border-[#211E1B]/15 rounded text-xs text-[#211E1B] focus:outline-none focus:border-[#9F3035]"
            >
              <option value="all">Tất cả cộng đồng</option>
              {communities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Heritage Status */}
          <div>
            <label className="block text-[11px] font-semibold text-[#211E1B]/70 mb-1">
              Tình trạng ghi danh
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="w-full p-2 bg-[#FBF9F5] border border-[#211E1B]/15 rounded text-xs text-[#211E1B] focus:outline-none focus:border-[#9F3035]"
            >
              <option value="all">Tất cả tình trạng</option>
              <option value="officially_recognized">Đã ghi danh Quốc gia</option>
              <option value="under_research">Đang khảo cứu đề xuất</option>
              <option value="unverified_tradition">Chưa xác minh</option>
            </select>
          </div>

          {/* Material */}
          <div>
            <label className="block text-[11px] font-semibold text-[#211E1B]/70 mb-1">
              Nguyên liệu chính
            </label>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="w-full p-2 bg-[#FBF9F5] border border-[#211E1B]/15 rounded text-xs text-[#211E1B] focus:outline-none focus:border-[#9F3035]"
            >
              <option value="all">Tất cả nguyên liệu</option>
              {materials.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[11px] font-semibold text-[#211E1B]/70 mb-1">
              Sắp xếp
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full p-2 bg-[#FBF9F5] border border-[#211E1B]/15 rounded text-xs text-[#211E1B] focus:outline-none focus:border-[#9F3035]"
            >
              <option value="featured">Mức độ nổi bật</option>
              <option value="name_asc">Tên nghề (A - Z)</option>
              <option value="name_desc">Tên nghề (Z - A)</option>
            </select>
          </div>
        </div>

        {/* Status count & reset */}
        <div className="flex items-center justify-between pt-2 border-t border-[#211E1B]/10 text-xs text-[#211E1B]/70">
          <span>Tìm thấy <strong>{filteredList.length}</strong> nghề thủ công phù hợp</span>
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 text-[#9F3035] hover:underline font-medium cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Đặt lại bộ lọc</span>
          </button>
        </div>
      </div>

      {/* Craft Cards Grid */}
      {filteredList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.map((craft) => (
            <div
              key={craft.id}
              onClick={() => onSelectCraft(craft)}
              className="bg-white rounded-lg border border-[#211E1B]/15 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Visual */}
                <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                  <HeritageImage
                    src={craft.mainImage}
                    alt={craft.name}
                    category={craft.category}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    {getStatusBadge(craft.heritageStatus)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  {/* Clean unboxed metadata (§1.A: zero-pill discipline) */}
                  <div className="text-[11px] text-[#986C4C] font-semibold uppercase flex items-center gap-1.5">
                    <span>{craft.categoryName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{craft.province}</span>
                  </div>

                  <h3 className="font-heritage-serif text-lg font-bold text-[#5E2027] group-hover:text-[#9F3035] transition-colors">
                    {craft.name}
                  </h3>

                  <p className="text-xs text-[#211E1B]/75 line-clamp-3 leading-relaxed">
                    {craft.shortDescription}
                  </p>

                  <div className="text-[11px] text-[#211E1B]/60 space-y-1 pt-2 border-t border-[#211E1B]/10">
                    <p><strong>Cộng đồng:</strong> {craft.ethnicCommunity}</p>
                    <p><strong>Nguyên liệu:</strong> {craft.primaryMaterials.slice(0, 2).join(', ')}...</p>
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="px-5 py-3 bg-[#FBF9F5] border-t border-[#211E1B]/10 flex items-center justify-between text-xs">
                <span className="text-[#211E1B]/50 font-heritage-mono text-[11px]">
                  {craft.specificLocation.split(',')[0]}
                </span>
                <span className="font-semibold text-[#9F3035] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Hồ sơ chi tiết</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-lg border border-dashed border-[#211E1B]/20 text-center space-y-3">
          <Filter className="w-8 h-8 text-[#9F3035] mx-auto" />
          <h3 className="font-heritage-serif text-lg font-bold text-[#211E1B]">
            Không tìm thấy nghề thủ công phù hợp
          </h3>
          <p className="text-xs text-[#211E1B]/70 max-w-md mx-auto">
            Không có kết quả nào khớp với các tiêu chí tìm kiếm và bộ lọc hiện tại. Vui lòng thử tìm với từ khoá khác hoặc đặt lại bộ lọc.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-[#9F3035] text-white rounded text-xs font-semibold hover:bg-[#5E2027] transition-colors cursor-pointer"
          >
            Xem toàn bộ di sản
          </button>
        </div>
      )}
    </div>
  );
};

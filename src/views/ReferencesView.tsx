import React, { useState } from 'react';
import { ReferenceSource, Craft, TopicGroup, ReferenceType } from '../types/heritage';
import {
  BookOpen,
  ExternalLink,
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Filter,
  Calendar,
  Globe,
  Tag,
  X,
  Sparkles,
  AlertTriangle,
  Building2,
  Database,
  Compass,
  FileCheck2,
  Info
} from 'lucide-react';

interface ReferencesViewProps {
  references: ReferenceSource[];
  crafts: Craft[];
  onSelectCraft: (craft: Craft) => void;
  onUseInAIStudio?: (ref: ReferenceSource) => void;
}

export const ReferencesView: React.FC<ReferencesViewProps> = ({
  references,
  crafts,
  onSelectCraft,
  onUseInAIStudio
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedTopicGroup, setSelectedTopicGroup] = useState<string>('all');
  const [selectedLinkStatus, setSelectedLinkStatus] = useState<string>('all');
  const [detailRef, setDetailRef] = useState<ReferenceSource | null>(null);

  // Filter reference sources
  const filteredRefs = references.filter((r) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const org = (r.issuingOrganization || r.authorOrg || '').toLowerCase();
      const match =
        r.title.toLowerCase().includes(q) ||
        org.includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.topic.toLowerCase().includes(q) ||
        r.url.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (selectedType !== 'all') {
      if (r.type !== selectedType) return false;
    }

    if (selectedTopicGroup !== 'all') {
      const groups = r.topicGroups || [];
      if (!groups.includes(selectedTopicGroup as TopicGroup)) return false;
    }

    if (selectedLinkStatus !== 'all') {
      const status = r.linkStatus || 'active';
      if (status !== selectedLinkStatus) return false;
    }

    return true;
  });

  const getCraftNames = (craftIds: string[]) => {
    return craftIds
      .map((id) => crafts.find((c) => c.id === id))
      .filter(Boolean) as Craft[];
  };

  const getTypeLabel = (type: ReferenceType) => {
    switch (type) {
      case 'state_agency':
        return 'Cơ quan nhà nước';
      case 'unesco':
        return 'UNESCO';
      case 'database':
        return 'Cơ sở dữ liệu';
      case 'planning_doc':
        return 'Tài liệu quy hoạch';
      case 'official_decision':
        return 'Quyết định / Văn bản pháp lý';
      case 'museum_archive':
        return 'Lưu trữ bảo tàng';
      case 'research_paper':
        return 'Công trình nghiên cứu khoa học';
      case 'book':
        return 'Sách chuyên khảo / Công ước';
      case 'field_report':
        return 'Báo cáo khảo sát thực địa';
      default:
        return type;
    }
  };

  const getTopicGroupLabel = (group: TopicGroup) => {
    switch (group) {
      case 'legal_policy':
        return 'Nguồn pháp lý & chính sách';
      case 'ich_database':
        return 'Cơ sở dữ liệu phi vật thể';
      case 'pottery_craft':
        return 'Nghề gốm truyền thống';
      case 'lacquer_craft':
        return 'Nghề sơn mài truyền thống';
      case 'weaving_ethnic':
        return 'Nghề dệt & thủ công dân tộc';
      case 'conservation_planning':
        return 'Bảo tồn & phát huy di sản';
      case 'general_craft':
        return 'Thủ công ĐNB tổng hợp';
      default:
        return group;
    }
  };

  const activeCount = references.filter(r => (r.linkStatus || 'active') === 'active').length;
  const needsCheckCount = references.filter(r => r.linkStatus === 'needs_check').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Academic Seal */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#9F3035]/10 border border-[#9F3035]/20 rounded text-xs uppercase tracking-widest font-semibold text-[#9F3035]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#9F3035]" />
          Kho Tham Khảo Chính Thống & Thẩm Định Di Sản
        </div>
        <h1 className="font-heritage-serif text-3xl sm:text-4xl font-bold text-[#5E2027]">
          Kho Tài Liệu Tham Khảo – Nghề Thủ Công Đông Nam Bộ
        </h1>
        <p className="text-xs sm:text-sm text-[#211E1B]/75 max-w-3xl leading-relaxed">
          Tập hợp 10 nguồn thông tin chính thống từ Cục Di sản văn hóa, Cổng dữ liệu quốc gia, UNESCO và các cơ quan quản lý nhà nước tỉnh Đồng Nai, Bình Dương. Mỗi nguồn đóng vai trò là căn cứ học thuật để kiểm soát độ chính xác, không suy diễn thông tin và kết nối trực tiếp với AI Content Studio.
        </p>
      </div>

      {/* Accuracy & Integrity Principle Callout */}
      <div className="bg-[#5E2027]/5 border-l-4 border-[#9F3035] p-4 rounded-r-lg space-y-2 text-xs">
        <div className="flex items-center gap-2 font-bold text-[#5E2027]">
          <Info className="w-4 h-4 text-[#9F3035] shrink-0" />
          <span>Nguyên tắc Thẩm định & Kiểm soát Độ chính xác Học thuật:</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[#211E1B]/80 pt-1">
          <div className="bg-white/80 p-2.5 rounded border border-[#211E1B]/10">
            <strong className="text-[#9F3035] block mb-0.5">Phân cấp Danh hiệu:</strong>
            Phân biệt rõ di sản văn hóa phi vật thể <em>cấp quốc gia</em> (Bộ VHTTDL ghi danh) và di sản được <em>UNESCO</em> công nhận. Không tự kết luận khi chưa có hồ sơ.
          </div>
          <div className="bg-white/80 p-2.5 rounded border border-[#211E1B]/10">
            <strong className="text-[#986C4C] block mb-0.5">Thổ cẩm người S'tiêng:</strong>
            Tuyệt đối không sử dụng nguồn tổng quan để tự suy đoán chi tiết lịch sử, kỹ thuật dệt cạp cửi lưng hay tên nghệ nhân chưa được kiểm chứng điền dã.
          </div>
          <div className="bg-white/80 p-2.5 rounded border border-[#211E1B]/10">
            <strong className="text-[#293D4B] block mb-0.5">Minh bạch Trạng thái:</strong>
            Mỗi liên kết được rà soát trực tiếp. Nguồn kết nối thông suốt đánh dấu [200 OK], nguồn gặp gián đoạn DNS được đánh dấu "cần kiểm tra" rõ ràng.
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-5 rounded-lg border border-[#211E1B]/15 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#211E1B]/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên tài liệu, cơ quan phát hành, URL, chủ đề (gốm, sơn mài, thổ cẩm, UNESCO, Cục Di sản...)..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#FBF9F5] border border-[#211E1B]/15 rounded text-xs text-[#211E1B] focus:outline-none focus:border-[#9F3035]"
          />
        </div>

        {/* 3 Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Filter 1: Source Type */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-[#5E2027] uppercase tracking-wider block">
              Loại nguồn tài liệu
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2.5 bg-[#FBF9F5] border border-[#211E1B]/15 rounded text-xs text-[#211E1B] focus:outline-none focus:border-[#9F3035]"
            >
              <option value="all">Tất cả loại nguồn ({references.length})</option>
              <option value="state_agency">Cơ quan nhà nước</option>
              <option value="unesco">UNESCO</option>
              <option value="database">Cơ sở dữ liệu di sản</option>
              <option value="planning_doc">Tài liệu quy hoạch</option>
              <option value="official_decision">Quyết định / Văn bản pháp lý</option>
              <option value="museum_archive">Lưu trữ bảo tàng</option>
              <option value="research_paper">Bài báo / Nghiên cứu</option>
              <option value="book">Sách / Công ước quốc tế</option>
              <option value="field_report">Báo cáo điền dã</option>
            </select>
          </div>

          {/* Filter 2: Topic Group */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-[#5E2027] uppercase tracking-wider block">
              Nhóm chủ đề di sản
            </label>
            <select
              value={selectedTopicGroup}
              onChange={(e) => setSelectedTopicGroup(e.target.value)}
              className="w-full p-2.5 bg-[#FBF9F5] border border-[#211E1B]/15 rounded text-xs text-[#211E1B] focus:outline-none focus:border-[#9F3035]"
            >
              <option value="all">Tất cả nhóm chủ đề</option>
              <option value="legal_policy">Nguồn pháp lý và chính sách di sản</option>
              <option value="ich_database">Cơ sở dữ liệu di sản phi vật thể</option>
              <option value="pottery_craft">Nghề gốm truyền thống</option>
              <option value="lacquer_craft">Nghề sơn mài truyền thống</option>
              <option value="weaving_ethnic">Nghề dệt & thủ công cộng đồng dân tộc</option>
              <option value="conservation_planning">Tài liệu bảo tồn và phát huy giá trị</option>
            </select>
          </div>

          {/* Filter 3: Link Status */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-[#5E2027] uppercase tracking-wider block">
              Trạng thái xác minh liên kết
            </label>
            <select
              value={selectedLinkStatus}
              onChange={(e) => setSelectedLinkStatus(e.target.value)}
              className="w-full p-2.5 bg-[#FBF9F5] border border-[#211E1B]/15 rounded text-xs text-[#211E1B] focus:outline-none focus:border-[#9F3035]"
            >
              <option value="all">Tất cả trạng thái liên kết ({references.length})</option>
              <option value="active">Liên kết hoạt động [200 OK] ({activeCount})</option>
              <option value="needs_check">Cần kiểm tra lại ({needsCheckCount})</option>
            </select>
          </div>
        </div>

        {/* Counter Summary Bar */}
        <div className="flex flex-wrap items-center justify-between pt-3 border-t border-[#211E1B]/10 text-xs text-[#211E1B]/60 gap-2">
          <div className="flex items-center gap-3">
            <span>Hiển thị <strong>{filteredRefs.length}</strong> / {references.length} nguồn tài liệu</span>
            <span className="text-emerald-700 font-medium">● {activeCount} liên kết hoạt động tốt</span>
            {needsCheckCount > 0 && (
              <span className="text-amber-700 font-medium">● {needsCheckCount} liên kết cần kiểm tra DNS</span>
            )}
          </div>
          <span className="italic text-[#986C4C]">Dữ liệu được lưu trữ cố định & đồng bộ tự động</span>
        </div>
      </div>

      {/* Reference Cards List */}
      <div className="space-y-4">
        {filteredRefs.map((ref, idx) => {
          const linkedCrafts = getCraftNames(ref.associatedCraftIds);
          const isNeedsCheck = ref.linkStatus === 'needs_check';

          return (
            <div
              key={ref.id}
              className={`bg-white p-5 sm:p-6 rounded-lg border transition-all shadow-xs space-y-4 ${
                isNeedsCheck
                  ? 'border-amber-300 hover:border-amber-500 bg-gradient-to-r from-amber-50/20 to-white'
                  : 'border-[#211E1B]/15 hover:border-[#9F3035]'
              }`}
            >
              {/* Header line: Badges and Title */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Number index */}
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#5E2027] text-white">
                      #{idx + 1}
                    </span>

                    {/* Source Type Badge */}
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#5E2027] bg-[#F5F0E6] px-2.5 py-0.5 rounded border border-[#B58A4A]/30">
                      <Building2 className="w-3 h-3 text-[#B58A4A]" />
                      {getTypeLabel(ref.type)}
                    </span>

                    {/* Link Status Badge */}
                    {isNeedsCheck ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        Cần kiểm tra liên kết (Sự cố DNS)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Liên kết hoạt động [200 OK]
                      </span>
                    )}

                    {/* Topic Group Tags */}
                    {(ref.topicGroups || []).map((tg) => (
                      <span
                        key={tg}
                        className="text-[10px] text-[#986C4C] bg-stone-100 px-2 py-0.5 rounded border border-stone-200"
                      >
                        {getTopicGroupLabel(tg)}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="font-heritage-serif text-lg sm:text-xl font-bold text-[#5E2027]">
                    {ref.title}
                  </h3>

                  {/* Meta info: Organization, Date, Language */}
                  <p className="text-xs text-[#211E1B]/70 font-medium">
                    Cơ quan / Tổ chức phát hành: <strong className="text-[#211E1B]">{ref.issuingOrganization || ref.authorOrg}</strong>
                    {ref.year && (
                      <> · Năm: <span className="font-semibold text-[#211E1B]">{ref.year}</span></>
                    )}
                    {ref.updatedDate && (
                      <> · Ngày cập nhật: <span className="text-[#986C4C]">{ref.updatedDate}</span></>
                    )}
                    <> · Ngôn ngữ: <span>{ref.language}</span></>
                  </p>
                </div>

                {/* Action Buttons Top Right */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {/* AI Content Studio Button */}
                  {onUseInAIStudio && (
                    <button
                      onClick={() => onUseInAIStudio(ref)}
                      className="px-3 py-1.5 bg-[#9F3035] hover:bg-[#5E2027] text-white text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                      title="Phân tích tài liệu này bằng AI Content Studio"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Sử dụng trong AI Studio</span>
                    </button>
                  )}

                  {/* View Details Modal Button */}
                  <button
                    onClick={() => setDetailRef(ref)}
                    className="px-3 py-1.5 bg-[#F5F0E6] hover:bg-[#B58A4A]/20 text-[#5E2027] text-xs font-semibold rounded border border-[#B58A4A]/30 transition-colors cursor-pointer"
                  >
                    Xem chi tiết
                  </button>

                  {/* External Link */}
                  {ref.url && (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-stone-100 hover:bg-stone-200 text-[#9F3035] rounded border border-stone-200 transition-colors cursor-pointer"
                      title="Mở liên kết nguồn gốc bên ngoài"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Summary Description */}
              <div className="bg-[#FBF9F5] p-3.5 rounded border border-[#211E1B]/10 space-y-1.5 text-xs sm:text-sm text-[#211E1B]/85 leading-relaxed">
                <p>{ref.summary}</p>
                {ref.linkStatusNote && isNeedsCheck && (
                  <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded border border-amber-200 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span><strong>Ghi chú xác minh URL:</strong> {ref.linkStatusNote}</span>
                  </p>
                )}
              </div>

              {/* URL preview & License Footer */}
              <div className="flex flex-wrap items-center justify-between text-xs text-[#211E1B]/60 pt-2 border-t border-[#211E1B]/10 gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-semibold text-[#211E1B]">Đường dẫn:</span>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9F3035] hover:underline font-mono text-[11px] truncate max-w-xs sm:max-w-md"
                  >
                    {ref.url}
                  </a>
                </div>

                <div className="flex items-center gap-3 text-[11px]">
                  {linkedCrafts.length > 0 && (
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-[#5E2027]">Nghề đối chiếu:</span>
                      {linkedCrafts.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => onSelectCraft(c)}
                          className="text-[#9F3035] hover:underline cursor-pointer"
                        >
                          {c.name};
                        </button>
                      ))}
                    </div>
                  )}
                  <span className="italic text-[#986C4C]">
                    Quyền sử dụng: {ref.usageLicenseNotes || ref.license}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Reference Modal */}
      {detailRef && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto"
          onClick={() => setDetailRef(null)}
        >
          <div
            className="bg-[#FBF9F5] rounded-lg border border-[#B58A4A]/40 max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative text-[#211E1B] space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDetailRef(null)}
              className="absolute top-4 right-4 p-2 text-[#211E1B]/60 hover:text-[#211E1B] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-6 border-b border-[#211E1B]/15 pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-[#5E2027] text-white">
                  {getTypeLabel(detailRef.type)}
                </span>
                {detailRef.linkStatus === 'needs_check' ? (
                  <span className="text-xs font-semibold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Cần kiểm tra lại liên kết
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Liên kết hoạt động [200 OK]
                  </span>
                )}
              </div>

              <h2 className="font-heritage-serif text-xl sm:text-2xl font-bold text-[#5E2027]">
                {detailRef.title}
              </h2>
            </div>

            {/* Modal Content Grid */}
            <div className="space-y-4 text-xs leading-relaxed">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-white rounded border border-[#211E1B]/10">
                <div>
                  <strong className="text-[#5E2027] block">Cơ quan / Tổ chức phát hành:</strong>
                  <p className="text-[#211E1B] mt-0.5 font-medium">{detailRef.issuingOrganization || detailRef.authorOrg}</p>
                </div>
                <div>
                  <strong className="text-[#5E2027] block">Năm công bố / cập nhật:</strong>
                  <p className="text-[#211E1B] mt-0.5">{detailRef.year || 'Tài liệu cập nhật định kỳ'} ({detailRef.updatedDate || detailRef.accessDate})</p>
                </div>
                <div>
                  <strong className="text-[#5E2027] block">Loại hình văn bản:</strong>
                  <p className="text-[#211E1B] mt-0.5">{getTypeLabel(detailRef.type)}</p>
                </div>
                <div>
                  <strong className="text-[#5E2027] block">Ngôn ngữ tài liệu:</strong>
                  <p className="text-[#211E1B] mt-0.5">{detailRef.language}</p>
                </div>
              </div>

              <div>
                <strong className="text-[#5E2027] block mb-1">Nhóm chủ đề phân loại di sản:</strong>
                <div className="flex flex-wrap gap-1.5">
                  {(detailRef.topicGroups || []).map((g) => (
                    <span
                      key={g}
                      className="px-2.5 py-1 bg-[#F5F0E6] text-[#5E2027] rounded border border-[#B58A4A]/30 font-semibold"
                    >
                      {getTopicGroupLabel(g)}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <strong className="text-[#211E1B] block mb-1">Mô tả tóm tắt nội dung chính:</strong>
                <p className="text-[#211E1B]/85 p-3.5 bg-white rounded border border-[#211E1B]/10 leading-relaxed">
                  {detailRef.summary}
                </p>
              </div>

              <div>
                <strong className="text-[#211E1B] block mb-1">Quyền và phạm vi sử dụng nội dung:</strong>
                <p className="text-[#211E1B]/75 p-2.5 bg-stone-50 rounded border border-stone-200">
                  {detailRef.usageLicenseNotes || detailRef.license}
                </p>
              </div>

              <div>
                <strong className="text-[#211E1B] block mb-1">Đường dẫn liên kết URL:</strong>
                <a
                  href={detailRef.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9F3035] hover:underline flex items-center gap-1.5 p-2.5 bg-white rounded border border-[#211E1B]/10 break-all font-mono"
                >
                  <Globe className="w-4 h-4 shrink-0 text-[#986C4C]" />
                  <span>{detailRef.url}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-auto" />
                </a>
              </div>

              {detailRef.linkStatusNote && (
                <div className="p-3 bg-amber-50 rounded border border-amber-200 text-amber-900 text-[11px]">
                  <strong>Tình trạng kỹ thuật đường dẫn:</strong> {detailRef.linkStatusNote}
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="flex flex-wrap items-center justify-between pt-4 border-t border-[#211E1B]/10 gap-3">
              <span className="text-[11px] text-[#211E1B]/60 italic">
                Căn cứ khoa học phục vụ dự án Di sản phi vật thể Đông Nam Bộ
              </span>

              <div className="flex items-center gap-2">
                {onUseInAIStudio && (
                  <button
                    onClick={() => {
                      setDetailRef(null);
                      onUseInAIStudio(detailRef);
                    }}
                    className="px-4 py-2 bg-[#9F3035] hover:bg-[#5E2027] text-white text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Sử dụng trong AI Studio</span>
                  </button>
                )}

                <button
                  onClick={() => setDetailRef(null)}
                  className="px-4 py-2 bg-[#211E1B] text-white text-xs font-semibold rounded hover:bg-[#5E2027] transition-colors cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

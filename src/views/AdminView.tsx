import React, { useState } from 'react';
import {
  Craft,
  ArtisanStory,
  ReferenceSource,
  AIDraft,
  UserRole,
  CraftCategory,
  HeritageStatus
} from '../types/heritage';
import { HeritageService } from '../services/heritageService';
import {
  ShieldCheck,
  UserCheck,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RotateCcw,
  Download,
  BookOpen,
  Sparkles,
  Layers,
  FileText,
  Eye,
  Save,
  X
} from 'lucide-react';

interface AdminViewProps {
  userRole: UserRole;
  crafts: Craft[];
  references: ReferenceSource[];
  stories: ArtisanStory[];
  drafts: AIDraft[];
  onChangeRole: (role: UserRole) => void;
  onRefreshData: () => void;
  onSelectCraft: (craft: Craft) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  userRole,
  crafts,
  references,
  stories,
  drafts,
  onChangeRole,
  onRefreshData,
  onSelectCraft
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'crafts' | 'references' | 'drafts' | 'settings'>('overview');

  // Craft Edit / Create Modal state
  const [craftModalOpen, setCraftModalOpen] = useState(false);
  const [editingCraft, setEditingCraft] = useState<Partial<Craft> | null>(null);

  // Reference Edit / Create Modal state
  const [refModalOpen, setRefModalOpen] = useState(false);
  const [editingRef, setEditingRef] = useState<Partial<ReferenceSource> | null>(null);

  const [notification, setNotification] = useState<string>('');

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  const isReadOnly = userRole === 'visitor';
  const isAdmin = userRole === 'admin';

  // --- Handlers for Crafts ---
  const handleOpenCreateCraft = () => {
    setEditingCraft({
      id: 'craft-' + Date.now(),
      name: '',
      englishName: '',
      otherNames: [],
      category: 'pottery',
      categoryName: 'Gốm và chế tác đất',
      province: 'Đồng Nai',
      specificLocation: '',
      ethnicCommunity: 'Người Kinh',
      heritageStatus: 'under_research',
      shortDescription: '',
      historicalOrigin: '',
      formationDevelopment: '',
      primaryMaterials: ['Đất sét', 'Tro trấu'],
      traditionalTools: ['Bàn xoay', 'Dao chuốt'],
      productionSteps: [
        { stepNumber: 1, title: 'Khai thác nguyên liệu', description: 'Chọn đất và lọc sạch bùn cát.' },
        { stepNumber: 2, title: 'Tạo hình', description: 'Chuốt trên bàn xoay truyền thống.' }
      ],
      distinctiveTechniques: ['Kỹ thuật thủ công truyền thống'],
      representativeProducts: ['Bình hoa', 'Vật dụng gia đình'],
      motifsAndSymbolism: 'Họa tiết dân gian truyền thống Đông Nam Bộ.',
      culturalSocioEconomicValues: 'Giá trị gắn kết cộng đồng địa phương.',
      artisanRole: 'Nghệ nhân truyền nghề qua nhiều thế hệ gia đình.',
      conservationStatus: 'Đang duy trì sản xuất tại làng nghề.',
      challenges: ['Thiếu lao động trẻ kế cận'],
      conservationSolutions: ['Đào tạo nghề gắn với du lịch sinh thái'],
      mainImage: '/assets/images/craft_bienhoa_pottery_1793891481080.jpg',
      galleryImages: [],
      referenceIds: [],
      coordinates: { lat: 10.95, lng: 106.82 },
      featured: false,
      published: true
    });
    setCraftModalOpen(true);
  };

  const handleSaveCraft = () => {
    if (!editingCraft || !editingCraft.name) return;
    HeritageService.saveCraft(editingCraft as Craft);
    onRefreshData();
    setCraftModalOpen(false);
    showNotification(`Đã lưu thành công nghề: ${editingCraft.name}`);
  };

  const handleDeleteCraft = (id: string, name: string) => {
    if (confirm(`Bạn có chắc muốn xoá nghề "${name}" khỏi cơ sở dữ liệu?`)) {
      HeritageService.deleteCraft(id);
      onRefreshData();
      showNotification(`Đã xoá nghề: ${name}`);
    }
  };

  // --- Handlers for References ---
  const handleOpenCreateRef = () => {
    setEditingRef({
      id: 'ref-' + Date.now(),
      title: '',
      issuingOrganization: '',
      authorOrg: '',
      url: 'https://',
      year: new Date().getFullYear(),
      accessDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
      language: 'Tiếng Việt',
      topic: 'Nghề thủ công Đông Nam Bộ',
      topicGroups: ['general_craft'],
      type: 'state_agency',
      summary: '',
      license: 'Thông tin công khai',
      usageLicenseNotes: 'Thông tin công khai chính thức',
      verificationStatus: 'verified',
      linkStatus: 'active',
      linkStatusNote: 'Đã xác minh liên kết',
      associatedCraftIds: []
    });
    setRefModalOpen(true);
  };

  const handleSaveRef = () => {
    if (!editingRef || !editingRef.title) return;
    const finalRef: ReferenceSource = {
      ...(editingRef as ReferenceSource),
      issuingOrganization: editingRef.issuingOrganization || editingRef.authorOrg || 'Cơ quan phát hành',
      authorOrg: editingRef.authorOrg || editingRef.issuingOrganization || 'Cơ quan phát hành',
      topicGroups: editingRef.topicGroups && editingRef.topicGroups.length > 0 ? editingRef.topicGroups : ['general_craft'],
      linkStatus: editingRef.linkStatus || 'active'
    };
    HeritageService.saveReference(finalRef);
    onRefreshData();
    setRefModalOpen(false);
    showNotification(`Đã lưu tài liệu tham khảo: ${editingRef.title}`);
  };

  const handleDeleteRef = (id: string, title: string) => {
    if (confirm(`Xoá tài liệu "${title}"?`)) {
      HeritageService.deleteReference(id);
      onRefreshData();
      showNotification(`Đã xoá tài liệu tham khảo.`);
    }
  };

  // --- Publish Draft Handler ---
  const handlePublishDraft = (draft: AIDraft) => {
    const updated = { ...draft, status: 'published' as const };
    HeritageService.saveAIDraft(updated);
    onRefreshData();
    showNotification(`Đã phê duyệt và xuất bản bản nháp: "${draft.title}"`);
  };

  // --- Reset & Export ---
  const handleResetDefaults = () => {
    if (confirm('Khôi phục toàn bộ cơ sở dữ liệu về mặc định ban đầu của Bảo tàng Di sản số?')) {
      HeritageService.resetToDefaults();
      onRefreshData();
      showNotification('Đã khôi phục toàn bộ dữ liệu mẫu gốc.');
    }
  };

  const handleExportJSON = () => {
    const exportData = {
      crafts,
      references,
      stories,
      drafts,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `di-san-dong-nam-bo-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Đã xuất thành công tệp sao lưu JSON.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Toast Notification */}
      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded text-xs flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header and Role Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#211E1B]/15">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#9F3035] font-semibold">
            Bảng điều khiển hệ thống
          </span>
          <h1 className="font-heritage-serif text-3xl font-bold text-[#5E2027]">
            Trung Tâm Quản Trị Bảo Tàng Số
          </h1>
          <p className="text-xs text-[#211E1B]/70 mt-0.5">
            Quản lý hồ sơ nghề thủ công, kho tài liệu đối chiếu, duyệt bản nháp AI và phân quyền người dùng.
          </p>
        </div>

        {/* Current Role Indicator & Switcher */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white border border-[#211E1B]/15 rounded text-xs flex items-center gap-2">
            <span className="text-[#211E1B]/60">Vai trò hiện tại:</span>
            <span className="font-bold text-[#9F3035] capitalize">
              {userRole === 'admin' ? 'Quản trị viên (Admin)' : userRole === 'editor' ? 'Biên tập viên (Editor)' : 'Khách tham quan (Visitor)'}
            </span>
          </div>

          <button
            onClick={() => onChangeRole(userRole === 'admin' ? 'editor' : userRole === 'editor' ? 'visitor' : 'admin')}
            className="px-3 py-2 bg-[#5E2027] hover:bg-[#9F3035] text-white text-xs font-semibold rounded transition-colors cursor-pointer"
          >
            Đổi quyền
          </button>
        </div>
      </div>

      {/* Role Notice */}
      {isReadOnly && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            Bạn đang ở chế độ <strong>Khách tham quan (Chỉ xem)</strong>. Để thêm, sửa hoặc xóa dữ liệu, vui lòng chuyển đổi sang vai trò <strong>Biên tập viên</strong> hoặc <strong>Quản trị viên</strong>.
          </span>
        </div>
      )}

      {/* Admin Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#211E1B]/10 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-xs font-semibold rounded transition-colors cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-[#9F3035] text-white'
              : 'text-[#211E1B]/70 hover:bg-[#F5F0E6]'
          }`}
        >
          Tổng quan
        </button>
        <button
          onClick={() => setActiveTab('crafts')}
          className={`px-4 py-2 text-xs font-semibold rounded transition-colors cursor-pointer ${
            activeTab === 'crafts'
              ? 'bg-[#9F3035] text-white'
              : 'text-[#211E1B]/70 hover:bg-[#F5F0E6]'
          }`}
        >
          Quản lý Nghề ({crafts.length})
        </button>
        <button
          onClick={() => setActiveTab('references')}
          className={`px-4 py-2 text-xs font-semibold rounded transition-colors cursor-pointer ${
            activeTab === 'references'
              ? 'bg-[#9F3035] text-white'
              : 'text-[#211E1B]/70 hover:bg-[#F5F0E6]'
          }`}
        >
          Tài liệu tham khảo ({references.length})
        </button>
        <button
          onClick={() => setActiveTab('drafts')}
          className={`px-4 py-2 text-xs font-semibold rounded transition-colors cursor-pointer ${
            activeTab === 'drafts'
              ? 'bg-[#9F3035] text-white'
              : 'text-[#211E1B]/70 hover:bg-[#F5F0E6]'
          }`}
        >
          Bản nháp & Duyệt bài ({drafts.length})
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 text-xs font-semibold rounded transition-colors cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-[#9F3035] text-white'
              : 'text-[#211E1B]/70 hover:bg-[#F5F0E6]'
          }`}
        >
          Cài đặt hệ thống
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* KPI Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-lg border border-[#211E1B]/15 shadow-xs space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-[#986C4C] font-semibold">
                Nghề thủ công
              </span>
              <p className="font-heritage-serif text-3xl font-bold text-[#5E2027] tabular-data">
                {crafts.length}
              </p>
              <p className="text-[11px] text-[#211E1B]/60">5 nhóm ngành nghề</p>
            </div>

            <div className="p-5 bg-white rounded-lg border border-[#211E1B]/15 shadow-xs space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-[#986C4C] font-semibold">
                Di sản Quốc gia
              </span>
              <p className="font-heritage-serif text-3xl font-bold text-emerald-700 tabular-data">
                {crafts.filter((c) => c.heritageStatus === 'officially_recognized').length}
              </p>
              <p className="text-[11px] text-[#211E1B]/60">Quyết định Bộ VHTTDL</p>
            </div>

            <div className="p-5 bg-white rounded-lg border border-[#211E1B]/15 shadow-xs space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-[#986C4C] font-semibold">
                Tài liệu kiểm chứng
              </span>
              <p className="font-heritage-serif text-3xl font-bold text-[#293D4B] tabular-data">
                {references.length}
              </p>
              <p className="text-[11px] text-[#211E1B]/60">Nguồn bảo tàng & viện</p>
            </div>

            <div className="p-5 bg-white rounded-lg border border-[#211E1B]/15 shadow-xs space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-[#986C4C] font-semibold">
                Bản nháp chờ duyệt
              </span>
              <p className="font-heritage-serif text-3xl font-bold text-[#9F3035] tabular-data">
                {drafts.filter((d) => d.status === 'draft').length}
              </p>
              <p className="text-[11px] text-[#211E1B]/60">Từ AI Content Studio</p>
            </div>
          </div>

          {/* Recent Records list */}
          <div className="bg-white p-6 rounded-lg border border-[#211E1B]/15 shadow-xs space-y-4">
            <h3 className="font-heritage-serif text-lg font-bold text-[#5E2027]">
              Hồ sơ Nghề Thủ Công Gần Đây
            </h3>
            <div className="divide-y divide-[#211E1B]/10">
              {crafts.map((c) => (
                <div key={c.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <strong className="text-sm font-semibold text-[#211E1B]">{c.name}</strong>
                    <p className="text-[#211E1B]/60">{c.province} · {c.categoryName} · {c.ethnicCommunity}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-[#986C4C]">
                      {c.heritageStatus === 'officially_recognized' ? 'Đã ghi danh' : 'Đang khảo cứu'}
                    </span>
                    <button
                      onClick={() => onSelectCraft(c)}
                      className="p-1 text-[#9F3035] hover:underline font-semibold cursor-pointer"
                    >
                      Xem
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CRAFTS MANAGEMENT */}
      {activeTab === 'crafts' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heritage-serif text-xl font-bold text-[#5E2027]">
              Danh mục hồ sơ nghề thủ công ({crafts.length})
            </h3>
            {!isReadOnly && (
              <button
                onClick={handleOpenCreateCraft}
                className="flex items-center gap-1.5 px-3 py-2 bg-[#9F3035] hover:bg-[#5E2027] text-white text-xs font-semibold rounded transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm hồ sơ nghề mới</span>
              </button>
            )}
          </div>

          <div className="bg-white rounded-lg border border-[#211E1B]/15 overflow-x-auto shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FBF9F5] border-b border-[#211E1B]/10 text-[#211E1B]/70 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-3.5">Tên nghề thủ công</th>
                  <th className="p-3.5">Nhóm nghề</th>
                  <th className="p-3.5">Địa phương</th>
                  <th className="p-3.5">Tình trạng di sản</th>
                  <th className="p-3.5">Cập nhật</th>
                  <th className="p-3.5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#211E1B]/10">
                {crafts.map((c) => (
                  <tr key={c.id} className="hover:bg-stone-50 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-[#211E1B]">{c.name}</div>
                      <div className="text-[11px] text-[#211E1B]/50 italic">{c.englishName}</div>
                    </td>
                    <td className="p-3.5">{c.categoryName}</td>
                    <td className="p-3.5">{c.province}</td>
                    <td className="p-3.5">
                      {c.heritageStatus === 'officially_recognized' ? (
                        <span className="text-emerald-700 font-semibold">Đã ghi danh Quốc gia</span>
                      ) : c.heritageStatus === 'under_research' ? (
                        <span className="text-amber-700 font-semibold">Đang khảo cứu</span>
                      ) : (
                        <span className="text-stone-500 font-semibold">Chưa xác minh</span>
                      )}
                    </td>
                    <td className="p-3.5 tabular-data text-[#211E1B]/60">{c.updatedAt}</td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => onSelectCraft(c)}
                        className="text-[#5E2027] hover:underline font-semibold cursor-pointer"
                        title="Xem trang chi tiết"
                      >
                        Xem
                      </button>
                      {!isReadOnly && (
                        <button
                          onClick={() => {
                            setEditingCraft(c);
                            setCraftModalOpen(true);
                          }}
                          className="text-[#B58A4A] hover:underline font-semibold cursor-pointer"
                          title="Sửa thông tin"
                        >
                          Sửa
                        </button>
                      )}
                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteCraft(c.id, c.name)}
                          className="text-red-600 hover:underline font-semibold cursor-pointer"
                          title="Xoá hồ sơ"
                        >
                          Xoá
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: REFERENCES MANAGEMENT */}
      {activeTab === 'references' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heritage-serif text-xl font-bold text-[#5E2027]">
              Kho tài liệu tham khảo chính thống ({references.length})
            </h3>
            {!isReadOnly && (
              <button
                onClick={handleOpenCreateRef}
                className="flex items-center gap-1.5 px-3 py-2 bg-[#9F3035] hover:bg-[#5E2027] text-white text-xs font-semibold rounded transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm tài liệu tham khảo</span>
              </button>
            )}
          </div>

          <div className="bg-white rounded-lg border border-[#211E1B]/15 overflow-x-auto shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FBF9F5] border-b border-[#211E1B]/10 text-[#211E1B]/70 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-3.5">Tiêu đề tài liệu</th>
                  <th className="p-3.5">Cơ quan / Tác giả</th>
                  <th className="p-3.5">Năm</th>
                  <th className="p-3.5">Trạng thái xác thực</th>
                  <th className="p-3.5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#211E1B]/10">
                {references.map((r) => (
                  <tr key={r.id} className="hover:bg-stone-50 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-[#211E1B]">{r.title}</div>
                      <div className="text-[11px] text-[#211E1B]/50 truncate max-w-xs">{r.url}</div>
                    </td>
                    <td className="p-3.5">{r.authorOrg}</td>
                    <td className="p-3.5 tabular-data font-semibold">{r.year}</td>
                    <td className="p-3.5">
                      {r.verificationStatus === 'verified' ? (
                        <span className="text-emerald-700 font-semibold">Chính thức</span>
                      ) : (
                        <span className="text-amber-700 font-semibold">Đang thẩm định</span>
                      )}
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      {!isReadOnly && (
                        <button
                          onClick={() => {
                            setEditingRef(r);
                            setRefModalOpen(true);
                          }}
                          className="text-[#B58A4A] hover:underline font-semibold cursor-pointer"
                        >
                          Sửa
                        </button>
                      )}
                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteRef(r.id, r.title)}
                          className="text-red-600 hover:underline font-semibold cursor-pointer"
                        >
                          Xoá
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: DRAFTS MANAGEMENT */}
      {activeTab === 'drafts' && (
        <div className="space-y-4">
          <h3 className="font-heritage-serif text-xl font-bold text-[#5E2027]">
            Bản nháp do AI Studio tạo & Chờ biên tập duyệt ({drafts.length})
          </h3>

          <div className="space-y-3">
            {drafts.map((d) => (
              <div
                key={d.id}
                className="bg-white p-5 rounded-lg border border-[#211E1B]/15 shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#9F3035] tracking-wider">
                      {d.type === 'craft_intro' ? 'Giới thiệu nghề' : d.type === 'heritage_story' ? 'Ký sự nghệ nhân' : 'Câu hỏi trắc nghiệm'} · {d.createdAt}
                    </span>
                    <h4 className="font-heritage-serif text-lg font-bold text-[#211E1B]">
                      {d.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                        d.status === 'published'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {d.status === 'published' ? 'Đã xuất bản' : 'Bản nháp (Chờ duyệt)'}
                    </span>

                    {!isReadOnly && d.status !== 'published' && (
                      <button
                        onClick={() => handlePublishDraft(d)}
                        className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded cursor-pointer"
                      >
                        Phê duyệt & Xuất bản
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-[#FBF9F5] rounded text-xs text-[#211E1B]/80 max-h-36 overflow-y-auto leading-relaxed border border-[#211E1B]/10">
                  {d.generatedContent}
                </div>

                <p className="text-[11px] text-[#211E1B]/50 italic">
                  Căn cứ tài liệu: {d.sourceReferenceTitles?.join('; ') || 'Tổng hợp từ kho tham khảo'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SYSTEM SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#211E1B]/15 shadow-xs space-y-6 max-w-3xl">
          <h3 className="font-heritage-serif text-xl font-bold text-[#5E2027] pb-3 border-b border-[#211E1B]/10">
            Cài Đặt Hệ Thống & Lưu Trữ Dữ Liệu
          </h3>

          <div className="space-y-4 text-xs">
            <div className="p-4 bg-[#FBF9F5] rounded border border-[#211E1B]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <strong className="text-sm font-bold text-[#211E1B]">Sao lưu & Xuất dữ liệu (JSON)</strong>
                <p className="text-[#211E1B]/70 mt-0.5">
                  Tải toàn bộ cơ sở dữ liệu nghề thủ công, tài liệu tham khảo và bản nháp về máy tính cá nhân.
                </p>
              </div>
              <button
                onClick={handleExportJSON}
                className="px-4 py-2 bg-[#293D4B] hover:bg-[#1C1917] text-white text-xs font-semibold rounded flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Tải tệp JSON</span>
              </button>
            </div>

            <div className="p-4 bg-red-50/70 rounded border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <strong className="text-sm font-bold text-red-900">Khôi phục dữ liệu mẫu ban đầu</strong>
                <p className="text-red-950/70 mt-0.5">
                  Đặt lại toàn bộ danh mục 8 nghề thủ công, 7 nguồn tham khảo và câu chuyện nghệ nhân về trạng thái chuẩn bảo tàng.
                </p>
              </div>
              <button
                onClick={handleResetDefaults}
                className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-semibold rounded flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Khôi phục mặc định</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Craft Edit Modal */}
      {craftModalOpen && editingCraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#FBF9F5] rounded-lg border border-[#B58A4A]/40 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-[#211E1B] space-y-4">
            <button
              onClick={() => setCraftModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#211E1B]/60 hover:text-[#211E1B]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heritage-serif text-xl font-bold text-[#5E2027]">
              {editingCraft.name ? `Chỉnh sửa: ${editingCraft.name}` : 'Thêm hồ sơ nghề thủ công mới'}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Tên nghề thủ công (*):</label>
                <input
                  type="text"
                  value={editingCraft.name || ''}
                  onChange={(e) => setEditingCraft({ ...editingCraft, name: e.target.value })}
                  className="w-full p-2 bg-white border border-[#211E1B]/20 rounded"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Tên tiếng Anh:</label>
                <input
                  type="text"
                  value={editingCraft.englishName || ''}
                  onChange={(e) => setEditingCraft({ ...editingCraft, englishName: e.target.value })}
                  className="w-full p-2 bg-white border border-[#211E1B]/20 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Nhóm ngành nghề:</label>
                  <select
                    value={editingCraft.category || 'pottery'}
                    onChange={(e) =>
                      setEditingCraft({
                        ...editingCraft,
                        category: e.target.value as CraftCategory,
                        categoryName:
                          e.target.value === 'pottery' ? 'Gốm và chế tác đất' :
                          e.target.value === 'lacquer' ? 'Nghề sơn mài' :
                          e.target.value === 'weaving' ? 'Dệt và chế tác vải' :
                          e.target.value === 'basketry' ? 'Nghề đan lát' : 'Chạm khắc và mộc'
                      })
                    }
                    className="w-full p-2 bg-white border border-[#211E1B]/20 rounded"
                  >
                    <option value="pottery">Gốm và chế tác đất</option>
                    <option value="lacquer">Nghề sơn mài</option>
                    <option value="weaving">Dệt và chế tác vải</option>
                    <option value="basketry">Nghề đan lát</option>
                    <option value="woodwork">Chạm khắc và mộc</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Tỉnh / Thành:</label>
                  <select
                    value={editingCraft.province || 'Đồng Nai'}
                    onChange={(e) => setEditingCraft({ ...editingCraft, province: e.target.value })}
                    className="w-full p-2 bg-white border border-[#211E1B]/20 rounded"
                  >
                    <option value="Đồng Nai">Đồng Nai</option>
                    <option value="Bình Dương">Bình Dương</option>
                    <option value="Bình Phước">Bình Phước</option>
                    <option value="Tây Ninh">Tây Ninh</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Tình trạng ghi danh di sản:</label>
                <select
                  value={editingCraft.heritageStatus || 'under_research'}
                  onChange={(e) => setEditingCraft({ ...editingCraft, heritageStatus: e.target.value as HeritageStatus })}
                  className="w-full p-2 bg-white border border-[#211E1B]/20 rounded"
                >
                  <option value="officially_recognized">Đã ghi danh Quốc gia (Bộ VHTTDL)</option>
                  <option value="under_research">Đang nghiên cứu đề xuất</option>
                  <option value="unverified_tradition">Chưa xác minh tình trạng</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Mô tả ngắn gọn:</label>
                <textarea
                  value={editingCraft.shortDescription || ''}
                  onChange={(e) => setEditingCraft({ ...editingCraft, shortDescription: e.target.value })}
                  rows={2}
                  className="w-full p-2 bg-white border border-[#211E1B]/20 rounded"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Lịch sử & Cội nguồn:</label>
                <textarea
                  value={editingCraft.historicalOrigin || ''}
                  onChange={(e) => setEditingCraft({ ...editingCraft, historicalOrigin: e.target.value })}
                  rows={3}
                  className="w-full p-2 bg-white border border-[#211E1B]/20 rounded"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#211E1B]/15">
              <button
                onClick={() => setCraftModalOpen(false)}
                className="px-4 py-2 border border-[#211E1B]/20 rounded text-xs"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveCraft}
                className="px-4 py-2 bg-[#9F3035] text-white rounded text-xs font-semibold hover:bg-[#5E2027]"
              >
                Lưu hồ sơ nghề
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reference Edit Modal */}
      {refModalOpen && editingRef && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-[#FBF9F5] rounded-lg border border-[#B58A4A]/40 max-w-xl w-full p-6 shadow-2xl relative text-[#211E1B] space-y-4">
            <button
              onClick={() => setRefModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#211E1B]/60 hover:text-[#211E1B]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heritage-serif text-xl font-bold text-[#5E2027]">
              {editingRef.title ? 'Sửa tài liệu tham khảo' : 'Thêm tài liệu tham khảo mới'}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Tiêu đề tài liệu / Quyết định (*):</label>
                <input
                  type="text"
                  value={editingRef.title || ''}
                  onChange={(e) => setEditingRef({ ...editingRef, title: e.target.value })}
                  className="w-full p-2 bg-white border border-[#211E1B]/20 rounded"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Tác giả / Cơ quan xuất bản (*):</label>
                <input
                  type="text"
                  value={editingRef.authorOrg || ''}
                  onChange={(e) => setEditingRef({ ...editingRef, authorOrg: e.target.value })}
                  className="w-full p-2 bg-white border border-[#211E1B]/20 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Năm công bố:</label>
                  <input
                    type="number"
                    value={editingRef.year || 2026}
                    onChange={(e) => setEditingRef({ ...editingRef, year: Number(e.target.value) })}
                    className="w-full p-2 bg-white border border-[#211E1B]/20 rounded"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Loại tài liệu:</label>
                  <select
                    value={editingRef.type || 'state_agency'}
                    onChange={(e) => setEditingRef({ ...editingRef, type: e.target.value as any })}
                    className="w-full p-2 bg-white border border-[#211E1B]/20 rounded"
                  >
                    <option value="state_agency">Cơ quan nhà nước</option>
                    <option value="unesco">UNESCO</option>
                    <option value="database">Cơ sở dữ liệu di sản</option>
                    <option value="planning_doc">Tài liệu quy hoạch</option>
                    <option value="official_decision">Quyết định pháp lý</option>
                    <option value="museum_archive">Lưu trữ bảo tàng</option>
                    <option value="research_paper">Công trình nghiên cứu</option>
                    <option value="book">Sách chuyên khảo / Công ước</option>
                    <option value="field_report">Báo cáo điền dã</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Đường dẫn URL kiểm tra:</label>
                <input
                  type="text"
                  value={editingRef.url || ''}
                  onChange={(e) => setEditingRef({ ...editingRef, url: e.target.value })}
                  className="w-full p-2 bg-white border border-[#211E1B]/20 rounded"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Tóm tắt nội dung khoa học:</label>
                <textarea
                  value={editingRef.summary || ''}
                  onChange={(e) => setEditingRef({ ...editingRef, summary: e.target.value })}
                  rows={3}
                  className="w-full p-2 bg-white border border-[#211E1B]/20 rounded"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#211E1B]/15">
              <button
                onClick={() => setRefModalOpen(false)}
                className="px-4 py-2 border border-[#211E1B]/20 rounded text-xs"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveRef}
                className="px-4 py-2 bg-[#9F3035] text-white rounded text-xs font-semibold hover:bg-[#5E2027]"
              >
                Lưu tài liệu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

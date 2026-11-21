import React, { useState } from 'react';
import { Menu, X, Landmark, ShieldCheck, UserCheck, Eye } from 'lucide-react';
import { UserRole } from '../types/heritage';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  userRole: UserRole;
  onChangeRole: (role: UserRole) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  userRole,
  onChangeRole,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'crafts', label: 'Nghề thủ công' },
    { id: 'map', label: 'Bản đồ văn hoá' },
    { id: 'stories', label: 'Câu chuyện di sản' },
    { id: 'media', label: 'Thư viện tư liệu' },
    { id: 'references', label: 'Kho tham khảo' },
    { id: 'ai-studio', label: 'AI Studio' },
    { id: 'admin', label: 'Quản trị' },
  ];

  const roleLabels: Record<UserRole, { label: string; icon: typeof Eye }> = {
    visitor: { label: 'Khách tham quan', icon: Eye },
    editor: { label: 'Biên tập viên', icon: UserCheck },
    admin: { label: 'Quản trị viên', icon: ShieldCheck },
  };

  const CurrentRoleIcon = roleLabels[userRole].icon;

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F5F0E6]/95 backdrop-blur-md border-b border-[#211E1B]/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-20">
            {/* Zone 1: Single text wordmark in Playfair Display display face */}
            <button
              onClick={() => onSelectTab('home')}
              className="flex items-center gap-2.5 text-left text-lg font-heritage-serif font-bold tracking-tight text-[#211E1B] hover:text-[#9F3035] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <div className="w-8 h-8 rounded bg-[#9F3035] flex items-center justify-center text-[#F5F0E6] shrink-0">
                <Landmark className="w-4 h-4" />
              </div>
              <span className="text-base sm:text-lg">DI SẢN ĐÔNG NAM BỘ</span>
            </button>

            {/* Zone 2: Clean single-line text navigation links */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-[#211E1B]/75">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer relative ${
                      isActive
                        ? 'text-[#9F3035] font-semibold'
                        : 'hover:text-[#211E1B]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9F3035] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: 1 Primary Action (Role switcher modal trigger) */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setRoleModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#5E2027] bg-[#B58A4A]/15 hover:bg-[#B58A4A]/25 border border-[#B58A4A]/30 rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                title="Thay đổi quyền người dùng để trải nghiệm hệ thống"
              >
                <CurrentRoleIcon className="w-3.5 h-3.5 text-[#9F3035]" />
                <span className="hidden sm:inline">Vai trò:</span>
                <span className="font-semibold text-[#9F3035]">{roleLabels[userRole].label}</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#211E1B] hover:text-[#9F3035] transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#211E1B]/10 bg-[#F5F0E6] px-4 pt-3 pb-5 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                  currentTab === item.id
                    ? 'bg-[#9F3035] text-[#F5F0E6]'
                    : 'text-[#211E1B]/85 hover:bg-[#211E1B]/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Role Switcher Dialog */}
      {roleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#F5F0E6] border border-[#B58A4A]/40 rounded-lg max-w-md w-full p-6 shadow-2xl text-[#211E1B]">
            <div className="flex items-center justify-between pb-3 border-b border-[#211E1B]/10 mb-4">
              <h3 className="font-heritage-serif text-lg font-bold text-[#5E2027]">
                Chuyển đổi vai trò người dùng
              </h3>
              <button
                onClick={() => setRoleModalOpen(false)}
                className="text-[#211E1B]/60 hover:text-[#211E1B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-[#211E1B]/75 mb-4 leading-relaxed">
              Website tích hợp phân quyền thực tế:
              <br />• <strong>Quản trị viên (Admin):</strong> Toàn quyền thêm, sửa, xóa, duyệt và khôi phục dữ liệu.
              <br />• <strong>Biên tập viên (Editor):</strong> Thêm/chỉnh sửa nội dung, tạo dự thảo và duyệt bài.
              <br />• <strong>Khách tham quan (Visitor):</strong> Tra cứu, xem chi tiết và sử dụng AI Studio học tập.
            </p>
            <div className="space-y-2 mb-6">
              {(['visitor', 'editor', 'admin'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    onChangeRole(role);
                    setRoleModalOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded border text-sm transition-all cursor-pointer ${
                    userRole === role
                      ? 'border-[#9F3035] bg-[#9F3035]/10 font-semibold text-[#9F3035]'
                      : 'border-[#211E1B]/15 hover:border-[#B58A4A] bg-white/60 text-[#211E1B]'
                  }`}
                >
                  <span className="capitalize">{roleLabels[role].label}</span>
                  {userRole === role && (
                    <span className="text-xs font-normal text-[#9F3035]">Đang kích hoạt</span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setRoleModalOpen(false)}
                className="px-4 py-2 text-xs font-medium bg-[#211E1B] text-[#F5F0E6] rounded hover:bg-[#5E2027] transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

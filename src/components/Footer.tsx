import React from 'react';
import { Landmark, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-[#211E1B] text-[#F5F0E6] border-t border-[#B58A4A]/25 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#9F3035] flex items-center justify-center text-[#F5F0E6] shrink-0">
                <Landmark className="w-4 h-4" />
              </div>
              <span className="font-heritage-serif font-bold text-lg tracking-wide text-[#F5F0E6]">
                DI SẢN PHI VẬT THỂ ĐÔNG NAM BỘ
              </span>
            </div>
            <p className="text-xs text-[#F5F0E6]/75 max-w-md leading-relaxed">
              Dự án thư viện di sản số kết nối truyền thống và công nghệ hiện đại; lưu trữ, nghiên cứu và tôn vinh tinh hoa tri thức dân gian nghề thủ công truyền thống các tỉnh miền Đông Nam Bộ (Việt Nam).
            </p>
            <div className="flex items-center gap-2 text-xs text-[#B58A4A]">
              <ShieldCheck className="w-4 h-4" />
              <span>Dữ liệu được kiểm chứng định kỳ với các cơ quan quản lý văn hoá chuyên ngành.</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B58A4A]">
              Chuyên mục bảo tàng
            </h4>
            <ul className="space-y-2 text-xs text-[#F5F0E6]/70">
              <li>
                <button
                  onClick={() => onSelectTab('crafts')}
                  className="hover:text-[#F5F0E6] transition-colors cursor-pointer"
                >
                  Thư viện nghề thủ công
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('map')}
                  className="hover:text-[#F5F0E6] transition-colors cursor-pointer"
                >
                  Bản đồ văn hoá Đông Nam Bộ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('stories')}
                  className="hover:text-[#F5F0E6] transition-colors cursor-pointer"
                >
                  Ký sự nghệ nhân & Làng nghề
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('media')}
                  className="hover:text-[#F5F0E6] transition-colors cursor-pointer"
                >
                  Kho tư liệu hình ảnh
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('ai-studio')}
                  className="hover:text-[#F5F0E6] transition-colors cursor-pointer"
                >
                  AI Content Studio (Gemini)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Official References */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B58A4A]">
              Nguồn pháp lý & Khảo cứu
            </h4>
            <ul className="space-y-2 text-xs text-[#F5F0E6]/70">
              <li className="flex items-center gap-1.5">
                <ExternalLink className="w-3 h-3 text-[#B58A4A]" />
                <a
                  href="http://dsvh.gov.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F5F0E6] transition-colors"
                >
                  Cục Di sản văn hoá (Bộ VHTTDL)
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <ExternalLink className="w-3 h-3 text-[#B58A4A]" />
                <a
                  href="https://vietnamtourism.gov.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F5F0E6] transition-colors"
                >
                  Cục Du lịch Quốc gia Việt Nam
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <ExternalLink className="w-3 h-3 text-[#B58A4A]" />
                <a
                  href="https://ich.unesco.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F5F0E6] transition-colors"
                >
                  UNESCO Intangible Cultural Heritage
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <ExternalLink className="w-3 h-3 text-[#B58A4A]" />
                <button
                  onClick={() => onSelectTab('references')}
                  className="hover:text-[#F5F0E6] transition-colors text-left cursor-pointer"
                >
                  Xem danh mục 7+ tài liệu đối chiếu
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F5F0E6]/50 gap-4">
          <p>© 2026 Bảo tàng Số Di sản Văn hoá Đông Nam Bộ. Phục vụ mục đích học tập, nghiên cứu và bảo tồn văn hoá.</p>
          <div className="flex items-center gap-4">
            <span>Tiêu chuẩn công ước UNESCO 2003</span>
            <span aria-hidden="true">·</span>
            <span>Không thương mại hóa di sản</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

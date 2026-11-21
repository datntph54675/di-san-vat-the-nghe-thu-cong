import React, { useState } from 'react';
import { ArtisanStory, Craft } from '../types/heritage';
import { BookOpen, User, MapPin, Calendar, Quote, ArrowRight, X } from 'lucide-react';
import { HeritageImage } from '../components/HeritageImage';

interface StoriesViewProps {
  stories: ArtisanStory[];
  crafts: Craft[];
  onSelectCraft: (craft: Craft) => void;
}

export const StoriesView: React.FC<StoriesViewProps> = ({ stories, crafts, onSelectCraft }) => {
  const [selectedStory, setSelectedStory] = useState<ArtisanStory | null>(null);

  const getCraft = (craftId: string) => crafts.find((c) => c.id === craftId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Editorial Header */}
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-[#9F3035] font-semibold">
          Ký sự nhân vật & Ký ức làng nghề
        </span>
        <h1 className="font-heritage-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5E2027]">
          Nghệ Nhân & Những Câu Chuyện Di Sản
        </h1>
        <p className="text-xs sm:text-sm text-[#211E1B]/75 max-w-3xl leading-relaxed">
          Ghi chép điền dã về chân dung các bậc thầy nghề thủ công truyền thống vùng Đông Nam Bộ — những con người cả đời thầm lặng giữ lửa, vượt qua bao thăng trầm thời đại để truyền tiếp tinh hoa cho hậu thế.
        </p>
      </div>

      {/* Featured Lead Story (Tier 1 Salience) */}
      {stories.length > 0 && (
        <div
          onClick={() => setSelectedStory(stories[0])}
          className="bg-white rounded-lg border border-[#211E1B]/15 overflow-hidden shadow-xs hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12 cursor-pointer group"
        >
          {/* Photo (7 cols) */}
          <div className="lg:col-span-7 relative aspect-16/10 lg:aspect-auto overflow-hidden bg-stone-100">
            <HeritageImage
              src={stories[0].image}
              alt={stories[0].artisanName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 left-4 bg-[#9F3035] text-white text-[11px] font-semibold px-3 py-1 rounded shadow-xs">
              Ký sự tiêu biểu
            </div>
          </div>

          {/* Editorial Content (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="text-xs text-[#986C4C] font-semibold uppercase">
                {stories[0].honorificTitle} · {stories[0].village}
              </div>

              <h2 className="font-heritage-serif text-2xl sm:text-3xl font-bold text-[#5E2027] group-hover:text-[#9F3035] transition-colors leading-snug">
                {stories[0].title}
              </h2>

              <p className="font-serif italic text-sm text-[#211E1B]/80">
                {stories[0].subtitle}
              </p>

              <blockquote className="p-3 bg-[#F5F0E6] border-l-2 border-[#9F3035] rounded-r text-xs italic text-[#211E1B]/85">
                "{stories[0].quote}"
              </blockquote>

              <p className="text-xs text-[#211E1B]/75 line-clamp-3 leading-relaxed">
                {stories[0].excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-[#211E1B]/10 flex items-center justify-between text-xs text-[#211E1B]/60">
              <span>Nghệ nhân: {stories[0].artisanName} (Sinh {stories[0].birthYear})</span>
              <span className="font-semibold text-[#9F3035] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Đọc toàn văn →
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Secondary Stories Grid (Tier 2 Salience) */}
      <div className="space-y-6">
        <h3 className="font-heritage-serif text-xl font-bold text-[#5E2027] pb-2 border-b border-[#211E1B]/10">
          Các Chân Dung Nghệ Nhân Khác
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.slice(1).map((story) => {
            const craft = getCraft(story.craftId);
            return (
              <div
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className="bg-white rounded-lg border border-[#211E1B]/15 overflow-hidden shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-4 cursor-pointer group"
              >
                <div className="space-y-4">
                  <div className="aspect-16/9 rounded overflow-hidden bg-stone-100">
                    <HeritageImage
                      src={story.image}
                      alt={story.artisanName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-[#9F3035] uppercase">
                      {story.honorificTitle}
                    </span>
                    <h4 className="font-heritage-serif text-xl font-bold text-[#211E1B] group-hover:text-[#5E2027] transition-colors mt-1">
                      {story.title}
                    </h4>
                    <p className="text-xs font-serif italic text-[#211E1B]/70 mt-0.5">
                      {story.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-[#211E1B]/75 line-clamp-3 leading-relaxed">
                    "{story.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#211E1B]/10 flex items-center justify-between text-xs text-[#211E1B]/60">
                  <span className="truncate max-w-[200px]">{story.village}</span>
                  <span className="font-semibold text-[#9F3035]">Chi tiết ký sự →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Story Reading Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#FBF9F5] rounded-lg border border-[#B58A4A]/40 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative text-[#211E1B] space-y-6">
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-5 right-5 p-2 text-[#211E1B]/60 hover:text-[#211E1B] bg-white/80 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-8 border-b border-[#211E1B]/15 pb-4">
              <span className="text-xs font-semibold text-[#9F3035] uppercase tracking-wider">
                {selectedStory.honorificTitle} · Sinh năm {selectedStory.birthYear}
              </span>
              <h2 className="font-heritage-serif text-2xl sm:text-3xl font-bold text-[#5E2027]">
                {selectedStory.title}
              </h2>
              <p className="font-serif italic text-sm text-[#211E1B]/70">
                {selectedStory.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#211E1B]/60 pt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#B58A4A]" />
                  {selectedStory.village}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#B58A4A]" />
                  Đăng ngày: {selectedStory.publishedAt}
                </span>
              </div>
            </div>

            {/* Lead Image */}
            <div className="w-full aspect-16/9 rounded-lg overflow-hidden border border-[#211E1B]/15 bg-stone-100">
              <HeritageImage
                src={selectedStory.image}
                alt={selectedStory.artisanName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Pull Quote */}
            <blockquote className="p-4 bg-[#F5F0E6] rounded border-y border-[#B58A4A]/40 text-sm sm:text-base font-serif italic text-[#5E2027] text-center leading-relaxed">
              "{selectedStory.quote}"
            </blockquote>

            {/* Main Narrative with Drop Cap */}
            <div className="prose max-w-none text-xs sm:text-sm text-[#211E1B]/85 leading-relaxed space-y-4">
              {selectedStory.content.split('\n\n').map((para, idx) => (
                <p key={idx} className={idx === 0 ? 'drop-cap' : ''}>
                  {para}
                </p>
              ))}
            </div>

            {/* Learning & Transmission sections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#211E1B]/15 text-xs">
              <div className="p-4 bg-white rounded border border-[#211E1B]/10 space-y-1">
                <span className="font-bold text-[#5E2027]">Hành trình học nghề:</span>
                <p className="text-[#211E1B]/80 leading-relaxed">{selectedStory.learningJourney}</p>
              </div>

              <div className="p-4 bg-white rounded border border-[#211E1B]/10 space-y-1">
                <span className="font-bold text-[#9F3035]">Câu chuyện truyền nghề:</span>
                <p className="text-[#211E1B]/80 leading-relaxed">{selectedStory.transmissionStory}</p>
              </div>
            </div>

            {/* Source citation */}
            <div className="p-3 bg-[#F5F0E6] rounded text-[11px] text-[#211E1B]/60 italic border border-[#B58A4A]/25">
              Nguồn tư liệu: {selectedStory.source}
            </div>

            {/* Footer action */}
            <div className="flex justify-between items-center pt-2">
              {(() => {
                const craft = getCraft(selectedStory.craftId);
                return craft ? (
                  <button
                    onClick={() => {
                      setSelectedStory(null);
                      onSelectCraft(craft);
                    }}
                    className="text-xs font-semibold text-[#9F3035] hover:underline cursor-pointer"
                  >
                    Xem hồ sơ nghề: {craft.name} →
                  </button>
                ) : <div />;
              })()}

              <button
                onClick={() => setSelectedStory(null)}
                className="px-4 py-2 bg-[#211E1B] text-white text-xs font-semibold rounded hover:bg-[#5E2027] transition-colors cursor-pointer"
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

import React, { useState, useEffect } from 'react';
import { ReferenceSource, AIDraft, QuizQuestion, AIAnalysisResult } from '../types/heritage';
import { HeritageService } from '../services/heritageService';
import {
  Sparkles,
  BookOpen,
  BrainCircuit,
  FileText,
  HelpCircle,
  Shield,
  Save,
  CheckCircle2,
  Clock,
  History,
  AlertCircle,
  RotateCcw,
  Compass,
  GraduationCap,
  Scroll,
  MapPin,
  Flame,
  CheckSquare,
  AlertTriangle,
  Lightbulb,
  ExternalLink
} from 'lucide-react';

interface AIStudioViewProps {
  references: ReferenceSource[];
  drafts: AIDraft[];
  initialSelectedRefId?: string;
  onDraftSaved: (draft: AIDraft) => void;
  onNavigateToAdmin: () => void;
}

export const AIStudioView: React.FC<AIStudioViewProps> = ({
  references,
  drafts,
  initialSelectedRefId,
  onDraftSaved,
  onNavigateToAdmin
}) => {
  const [selectedRefIds, setSelectedRefIds] = useState<string[]>(() => {
    if (initialSelectedRefId && references.some(r => r.id === initialSelectedRefId)) {
      return [initialSelectedRefId];
    }
    return [references[0]?.id || 'ref-official-01'];
  });

  const [activeTask, setActiveTask] = useState<'analyze' | 'draft' | 'quiz' | 'conservation'>('analyze');
  const [customPrompt, setCustomPrompt] = useState('');
  const [draftTitle, setDraftTitle] = useState('Bản thảo nghiên cứu di sản mới');
  const [draftType, setDraftType] = useState<'craft_intro' | 'heritage_story' | 'conservation_plan'>('craft_intro');

  // Loading & Results
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [generatedDraftText, setGeneratedDraftText] = useState('');
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [savedSuccessMsg, setSavedSuccessMsg] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle auto-selection when navigated from ReferencesView
  useEffect(() => {
    if (initialSelectedRefId && references.some(r => r.id === initialSelectedRefId)) {
      setSelectedRefIds((prev) => {
        if (!prev.includes(initialSelectedRefId)) {
          return [initialSelectedRefId, ...prev];
        }
        return prev;
      });
    }
  }, [initialSelectedRefId, references]);

  const toggleRefSelection = (id: string) => {
    if (selectedRefIds.includes(id)) {
      if (selectedRefIds.length > 1) {
        setSelectedRefIds(selectedRefIds.filter((item) => item !== id));
      }
    } else {
      setSelectedRefIds([...selectedRefIds, id]);
    }
  };

  const selectAllOfficialRefs = () => {
    const officialIds = references
      .filter(r => r.id.startsWith('ref-official-'))
      .map(r => r.id);
    setSelectedRefIds(Array.from(new Set([...selectedRefIds, ...officialIds])));
  };

  const handleRunAI = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setSavedSuccessMsg('');

    try {
      if (activeTask === 'analyze') {
        const res = await HeritageService.analyzeReferencesWithAI(selectedRefIds, customPrompt);
        setAnalysisResult(res);
      } else if (activeTask === 'draft') {
        const text = await HeritageService.generateDraftContentWithAI({
          type: draftType,
          referenceIds: selectedRefIds,
          title: draftTitle,
          instructions: customPrompt
        });
        setGeneratedDraftText(text);
      } else if (activeTask === 'quiz') {
        const questions = await HeritageService.generateQuizWithAI(selectedRefIds);
        setQuizQuestions(questions);
        setUserAnswers({});
      } else if (activeTask === 'conservation') {
        const res = await HeritageService.analyzeReferencesWithAI(
          selectedRefIds,
          'Tập trung đề xuất các giải pháp bảo tồn, số hoá và đào tạo truyền nghề bền vững cho làng nghề thủ công.'
        );
        setAnalysisResult(res);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi khi gọi dịch vụ AI.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToDrafts = () => {
    const selectedRefs = references.filter((r) => selectedRefIds.includes(r.id));
    const newDraft: AIDraft = {
      id: 'draft-' + Date.now(),
      title: draftTitle || `Bản nháp AI: ${selectedRefs[0]?.title || 'Nghiên cứu di sản'}`,
      type: activeTask === 'analyze' ? 'comprehensive_analysis' : draftType,
      sourceReferenceIds: selectedRefIds,
      sourceReferenceTitles: selectedRefs.map((r) => r.title),
      generatedContent:
        activeTask === 'draft'
          ? generatedDraftText
          : activeTask === 'analyze' || activeTask === 'conservation'
          ? analysisResult?.summary || ''
          : JSON.stringify(quizQuestions, null, 2),
      structuredQuiz: activeTask === 'quiz' ? quizQuestions : analysisResult?.suggestedQuizzes,
      analysisData: analysisResult || undefined,
      extractedEntities: analysisResult?.entities,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0]
    };

    HeritageService.saveAIDraft(newDraft);
    onDraftSaved(newDraft);
    setSavedSuccessMsg('Đã lưu kết quả phân tích & bản nháp vào hệ thống. Đang chờ Biên tập viên/Quản trị viên kiểm duyệt.');
    setTimeout(() => setSavedSuccessMsg(''), 6000);
  };

  const loadPastDraft = (draft: AIDraft) => {
    setDraftTitle(draft.title);
    setSelectedRefIds(draft.sourceReferenceIds);
    if (draft.analysisData) {
      setActiveTask('analyze');
      setAnalysisResult(draft.analysisData);
    } else if (draft.structuredQuiz) {
      setActiveTask('quiz');
      setQuizQuestions(draft.structuredQuiz);
    } else {
      setActiveTask('draft');
      setGeneratedDraftText(draft.generatedContent);
    }
  };

  const selectedReferencesList = references.filter(r => selectedRefIds.includes(r.id));
  const hasStiengSelected = selectedReferencesList.some(r => r.associatedCraftIds.includes('craft-det-tho-cam-stieng'));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#9F3035]/10 border border-[#9F3035]/20 rounded text-xs uppercase tracking-widest font-semibold text-[#9F3035]">
          <BrainCircuit className="w-3.5 h-3.5" />
          Hệ thống Hỗ trợ Nghiên cứu & Sáng tác Nội dung Di sản
        </div>
        <h1 className="font-heritage-serif text-3xl sm:text-4xl font-bold text-[#5E2027]">
          AI Content Studio (Google Gemini)
        </h1>
        <p className="text-xs sm:text-sm text-[#211E1B]/75 max-w-3xl leading-relaxed">
          Tích hợp mô hình ngôn ngữ lớn để hỗ trợ nhà nghiên cứu và biên tập viên: phân tích tài liệu chính thống, bóc tách dữ kiện lịch sử, địa lý, kỹ thuật, cộng đồng thực hành và tự động đề xuất ý tưởng bài học, câu chuyện di sản, tình huống học tập và câu hỏi trắc nghiệm chuẩn xác.
        </p>
      </div>

      {/* Accuracy Warning Banner */}
      <div className="bg-[#5E2027]/5 border-l-4 border-[#9F3035] p-4 rounded-r-lg text-xs space-y-1">
        <div className="flex items-center gap-2 font-bold text-[#5E2027]">
          <Shield className="w-4 h-4 text-[#9F3035]" />
          <span>Nguyên tắc kiểm soát độ chính xác của AI Content Studio:</span>
        </div>
        <p className="text-[#211E1B]/80 leading-relaxed">
          • Phân biệt rõ Di sản phi vật thể cấp quốc gia (Bộ VHTTDL) và Di sản được UNESCO ghi danh.<br />
          • Nếu tài liệu không đề cập thông tin lịch sử hoặc nghệ nhân, hệ thống ghi rõ <strong>"Chưa có dữ liệu xác minh"</strong> thay vì phỏng đoán.<br />
          {hasStiengSelected && (
            <span className="text-[#9F3035] font-semibold block mt-1">
              ⚠️ Đang chọn tài liệu liên quan đến thổ cẩm người S'tiêng: Tuyệt đối không tự suy diễn tên nghệ nhân, niên đại hoặc kỹ thuật ngoài nguồn kiểm chứng.
            </span>
          )}
        </p>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Reference Selection & Prompt Settings (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Step 1: Select References */}
          <div className="bg-white p-5 rounded-lg border border-[#211E1B]/15 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#211E1B]/10">
              <h3 className="font-heritage-serif text-base font-bold text-[#5E2027] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#B58A4A]" />
                1. Chọn Tài liệu căn cứ ({selectedRefIds.length}/{references.length})
              </h3>
              <button
                onClick={selectAllOfficialRefs}
                className="text-[11px] text-[#9F3035] hover:underline font-semibold cursor-pointer"
              >
                + Chọn 10 nguồn chính thống
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {references.map((r) => {
                const isSelected = selectedRefIds.includes(r.id);
                const isOfficial = r.id.startsWith('ref-official-');
                return (
                  <div
                    key={r.id}
                    onClick={() => toggleRefSelection(r.id)}
                    className={`p-3 rounded border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${
                      isSelected
                        ? 'border-[#9F3035] bg-[#9F3035]/5 text-[#211E1B]'
                        : 'border-[#211E1B]/10 hover:border-[#B58A4A] bg-white text-[#211E1B]/70'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="mt-0.5 accent-[#9F3035]"
                    />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-semibold leading-snug line-clamp-2">{r.title}</span>
                        {isOfficial && (
                          <span className="text-[9px] bg-[#5E2027] text-white px-1.5 py-0.2 rounded shrink-0 font-bold">
                            Chính thống
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[#986C4C]">
                        {r.issuingOrganization || r.authorOrg}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Choose AI Task */}
          <div className="bg-white p-5 rounded-lg border border-[#211E1B]/15 shadow-xs space-y-4">
            <h3 className="font-heritage-serif text-base font-bold text-[#5E2027] pb-2 border-b border-[#211E1B]/10 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B58A4A]" />
              2. Chọn Nhiệm vụ Nghiên cứu
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setActiveTask('analyze')}
                className={`p-3 rounded border text-left transition-all cursor-pointer ${
                  activeTask === 'analyze'
                    ? 'border-[#9F3035] bg-[#9F3035]/10 font-bold text-[#9F3035]'
                    : 'border-[#211E1B]/15 hover:bg-[#F5F0E6] text-[#211E1B]'
                }`}
              >
                <div className="flex items-center gap-1.5 font-semibold">
                  <BrainCircuit className="w-3.5 h-3.5" />
                  <span>Phân tích toàn diện</span>
                </div>
                <p className="text-[10px] font-normal text-[#211E1B]/60 mt-1">
                  Lịch sử, kỹ thuật, bài học, câu chuyện & trắc nghiệm
                </p>
              </button>

              <button
                onClick={() => setActiveTask('draft')}
                className={`p-3 rounded border text-left transition-all cursor-pointer ${
                  activeTask === 'draft'
                    ? 'border-[#9F3035] bg-[#9F3035]/10 font-bold text-[#9F3035]'
                    : 'border-[#211E1B]/15 hover:bg-[#F5F0E6] text-[#211E1B]'
                }`}
              >
                <div className="flex items-center gap-1.5 font-semibold">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Soạn thảo Bản nháp</span>
                </div>
                <p className="text-[10px] font-normal text-[#211E1B]/60 mt-1">Viết bài giới thiệu hoặc ký sự</p>
              </button>

              <button
                onClick={() => setActiveTask('quiz')}
                className={`p-3 rounded border text-left transition-all cursor-pointer ${
                  activeTask === 'quiz'
                    ? 'border-[#9F3035] bg-[#9F3035]/10 font-bold text-[#9F3035]'
                    : 'border-[#211E1B]/15 hover:bg-[#F5F0E6] text-[#211E1B]'
                }`}
              >
                <div className="flex items-center gap-1.5 font-semibold">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Bộ Trắc nghiệm</span>
                </div>
                <p className="text-[10px] font-normal text-[#211E1B]/60 mt-1">Học tập và tự đánh giá</p>
              </button>

              <button
                onClick={() => setActiveTask('conservation')}
                className={`p-3 rounded border text-left transition-all cursor-pointer ${
                  activeTask === 'conservation'
                    ? 'border-[#9F3035] bg-[#9F3035]/10 font-bold text-[#9F3035]'
                    : 'border-[#211E1B]/15 hover:bg-[#F5F0E6] text-[#211E1B]'
                }`}
              >
                <div className="flex items-center gap-1.5 font-semibold">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Đề án Bảo tồn</span>
                </div>
                <p className="text-[10px] font-normal text-[#211E1B]/60 mt-1">Giải pháp quy hoạch di sản</p>
              </button>
            </div>

            {/* Custom Directives */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#211E1B]">
                Yêu cầu bổ sung cho AI (Tuỳ chọn):
              </label>
              <textarea
                rows={2}
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="VD: Tập trung phân tích kỹ thuật men xanh đồng Biên Hòa; hoặc nhấn mạnh ý tưởng giáo dục cho học sinh phổ thông..."
                className="w-full p-2.5 bg-[#FBF9F5] border border-[#211E1B]/15 rounded text-xs text-[#211E1B] focus:outline-none focus:border-[#9F3035]"
              />
            </div>

            {/* Execute Button */}
            <button
              onClick={handleRunAI}
              disabled={isLoading || selectedRefIds.length === 0}
              className="w-full py-3 bg-[#9F3035] hover:bg-[#5E2027] text-white font-semibold text-xs rounded shadow-xs transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Gemini 3.8 Flash đang xử lý {selectedRefIds.length} tài liệu...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Chạy phân tích AI Content Studio</span>
                </>
              )}
            </button>
          </div>

          {/* History of Past Saved Drafts & Analysis */}
          <div className="bg-white p-5 rounded-lg border border-[#211E1B]/15 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-[#5E2027] uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-[#211E1B]/10">
              <History className="w-3.5 h-3.5 text-[#B58A4A]" />
              Lịch sử phân tích & bản nháp đã lưu ({drafts.length})
            </h4>

            {drafts.length > 0 ? (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {drafts.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => loadPastDraft(d)}
                    className="p-2.5 rounded bg-[#FBF9F5] hover:bg-[#F5F0E6] border border-[#211E1B]/10 cursor-pointer text-xs space-y-1 transition-colors"
                  >
                    <p className="font-semibold text-[#211E1B] line-clamp-1">{d.title}</p>
                    <div className="flex items-center justify-between text-[10px] text-[#211E1B]/50">
                      <span>{d.createdAt}</span>
                      <span className="text-[#9F3035] font-medium">Tải lại kết quả</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#211E1B]/60">Chưa có kết quả phân tích nào được lưu trữ.</p>
            )}
          </div>
        </div>

        {/* Right Column: AI Analysis & Output Canvas (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {savedSuccessMsg && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{savedSuccessMsg}</span>
              </div>
              <button
                onClick={onNavigateToAdmin}
                className="font-semibold underline ml-2 cursor-pointer"
              >
                Mở Quản trị
              </button>
            </div>
          )}

          {/* Results Container */}
          <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#211E1B]/15 shadow-xs space-y-6 min-h-[500px]">
            {/* Header info bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#211E1B]/10">
              <div>
                <span className="text-xs font-semibold text-[#986C4C] uppercase tracking-wider">
                  Kết quả nghiên cứu di sản
                </span>
                <h3 className="font-heritage-serif text-xl font-bold text-[#5E2027]">
                  {activeTask === 'analyze' && 'Báo cáo Phân tích Toàn diện & Bóc tách Dữ liệu'}
                  {activeTask === 'draft' && 'Bản thảo Nội dung Biên tập'}
                  {activeTask === 'quiz' && 'Bộ Câu hỏi Trắc nghiệm Khảo sát'}
                  {activeTask === 'conservation' && 'Khuyến nghị Giải pháp Bảo tồn & Quy hoạch'}
                </h3>
              </div>

              {(analysisResult || generatedDraftText || quizQuestions.length > 0) && (
                <button
                  onClick={handleSaveToDrafts}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#5E2027] hover:bg-[#9F3035] text-white text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Lưu kết quả vào hệ thống</span>
                </button>
              )}
            </div>

            {/* Dynamic Results Content */}
            {isLoading ? (
              <div className="py-24 text-center space-y-3">
                <div className="w-10 h-10 border-3 border-[#9F3035] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="font-heritage-serif text-base font-bold text-[#5E2027]">
                  Đang đối chiếu tài liệu và trích xuất dữ kiện...
                </p>
                <p className="text-xs text-[#211E1B]/60 max-w-sm mx-auto">
                  Google Gemini 3.8 Flash đang phân tích ngữ liệu chính thống từ 10 nguồn di sản Đông Nam Bộ.
                </p>
              </div>
            ) : analysisResult && (activeTask === 'analyze' || activeTask === 'conservation') ? (
              /* Comprehensive Analysis Output covering all Section 3 & 4 user requirements */
              <div className="space-y-6">
                {/* 1. Synthesis Summary */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#9F3035] uppercase tracking-wider flex items-center gap-1.5">
                    <Scroll className="w-4 h-4 text-[#9F3035]" />
                    1. Tóm tắt nội dung phân tích tài liệu:
                  </h4>
                  <p className="text-xs sm:text-sm text-[#211E1B]/85 p-4 bg-[#FBF9F5] rounded border border-[#211E1B]/10 leading-relaxed">
                    {analysisResult.summary}
                  </p>
                </div>

                {/* 2. Historical & Geographical & Cultural Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Historical Info */}
                  <div className="p-3.5 bg-white rounded border border-[#211E1B]/15 space-y-1">
                    <strong className="text-[#5E2027] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#B58A4A]" />
                      Thông tin lịch sử hình thành:
                    </strong>
                    <p className="text-[#211E1B]/80 leading-relaxed">
                      {analysisResult.historicalInfo || 'Chưa có dữ liệu xác minh'}
                    </p>
                  </div>

                  {/* Geographical Info */}
                  <div className="p-3.5 bg-white rounded border border-[#211E1B]/15 space-y-1">
                    <strong className="text-[#5E2027] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#9F3035]" />
                      Không gian địa lý & văn hóa:
                    </strong>
                    <p className="text-[#211E1B]/80 leading-relaxed">
                      {analysisResult.geographicalInfo || 'Chưa có dữ liệu xác minh'}
                    </p>
                  </div>

                  {/* Craft Techniques */}
                  <div className="p-3.5 bg-white rounded border border-[#211E1B]/15 space-y-1">
                    <strong className="text-[#986C4C] flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-[#986C4C]" />
                      Kỹ thuật chế tác đặc trưng:
                    </strong>
                    <p className="text-[#211E1B]/80 leading-relaxed">
                      {analysisResult.craftTechniques || 'Chưa có dữ liệu xác minh'}
                    </p>
                  </div>

                  {/* Cultural Values */}
                  <div className="p-3.5 bg-white rounded border border-[#211E1B]/15 space-y-1">
                    <strong className="text-[#293D4B] flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-[#293D4B]" />
                      Giá trị văn hóa & xã hội:
                    </strong>
                    <p className="text-[#211E1B]/80 leading-relaxed">
                      {analysisResult.culturalValues || 'Chưa có dữ liệu xác minh'}
                    </p>
                  </div>
                </div>

                {/* 3. Practicing Community & Transmission Method */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-[#F5F0E6] rounded border border-[#B58A4A]/30 space-y-1">
                    <strong className="text-[#5E2027] block">Cộng đồng thực hành di sản:</strong>
                    <p className="text-[#211E1B]/85">
                      {analysisResult.practicingCommunity || 'Chưa có dữ liệu xác minh'}
                    </p>
                  </div>
                  <div className="p-3.5 bg-[#F5F0E6] rounded border border-[#B58A4A]/30 space-y-1">
                    <strong className="text-[#5E2027] block">Phương thức truyền dạy nghề:</strong>
                    <p className="text-[#211E1B]/85">
                      {analysisResult.transmissionMethod || 'Chưa có dữ liệu xác minh'}
                    </p>
                  </div>
                </div>

                {/* 4. Lesson Ideas */}
                {analysisResult.lessonIdeas && analysisResult.lessonIdeas.length > 0 && (
                  <div className="p-4 bg-white rounded-lg border border-[#211E1B]/15 space-y-2">
                    <h4 className="text-xs font-bold text-[#5E2027] uppercase tracking-wider flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-[#9F3035]" />
                      Đề xuất ý tưởng bài học giáo dục di sản:
                    </h4>
                    <ul className="space-y-1 text-xs text-[#211E1B]/85 list-disc list-inside">
                      {analysisResult.lessonIdeas.map((idea, i) => (
                        <li key={i}>{idea}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 5. Heritage Stories */}
                {analysisResult.heritageStories && analysisResult.heritageStories.length > 0 && (
                  <div className="p-4 bg-white rounded-lg border border-[#211E1B]/15 space-y-2">
                    <h4 className="text-xs font-bold text-[#986C4C] uppercase tracking-wider flex items-center gap-1.5">
                      <Scroll className="w-4 h-4 text-[#986C4C]" />
                      Đề xuất nội dung câu chuyện di sản & ký sự nghệ nhân:
                    </h4>
                    <ul className="space-y-1 text-xs text-[#211E1B]/85 list-disc list-inside">
                      {analysisResult.heritageStories.map((story, i) => (
                        <li key={i}>{story}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 6. Learning Scenarios */}
                {analysisResult.learningScenarios && analysisResult.learningScenarios.length > 0 && (
                  <div className="p-4 bg-white rounded-lg border border-[#211E1B]/15 space-y-2">
                    <h4 className="text-xs font-bold text-[#293D4B] uppercase tracking-wider flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-[#293D4B]" />
                      Đề xuất tình huống học tập & bài tập điền dã:
                    </h4>
                    <ul className="space-y-1 text-xs text-[#211E1B]/85 list-disc list-inside">
                      {analysisResult.learningScenarios.map((scen, i) => (
                        <li key={i}>{scen}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 7. Craft Intro Outline */}
                {analysisResult.craftIntroOutline && analysisResult.craftIntroOutline.length > 0 && (
                  <div className="p-4 bg-white rounded-lg border border-[#211E1B]/15 space-y-2">
                    <h4 className="text-xs font-bold text-[#5E2027] uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-[#5E2027]" />
                      Đề xuất đề cương giới thiệu nghề thủ công:
                    </h4>
                    <ul className="space-y-1 text-xs text-[#211E1B]/85 list-decimal list-inside">
                      {analysisResult.craftIntroOutline.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 8. Suggested Quizzes */}
                {analysisResult.suggestedQuizzes && analysisResult.suggestedQuizzes.length > 0 && (
                  <div className="p-4 bg-emerald-50/50 rounded-lg border border-emerald-200 space-y-3">
                    <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckSquare className="w-4 h-4 text-emerald-700" />
                      Gợi ý câu hỏi trắc nghiệm nhận thức ({analysisResult.suggestedQuizzes.length} câu):
                    </h4>
                    <div className="space-y-3">
                      {analysisResult.suggestedQuizzes.map((sq, i) => (
                        <div key={i} className="p-3 bg-white rounded border border-emerald-100 text-xs space-y-1.5">
                          <p className="font-bold text-[#5E2027]">Câu {i + 1}: {sq.question}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-[#211E1B]/75">
                            {sq.options.map((opt, oi) => (
                              <div
                                key={oi}
                                className={`p-1.5 rounded ${
                                  oi === sq.correctIndex ? 'bg-emerald-100 text-emerald-900 font-semibold' : 'bg-stone-50'
                                }`}
                              >
                                {String.fromCharCode(65 + oi)}. {opt} {oi === sq.correctIndex && '✓'}
                              </div>
                            ))}
                          </div>
                          <p className="text-[10px] text-[#986C4C] italic mt-1">Căn cứ: {sq.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 9. Verification Notes Callout */}
                {analysisResult.verificationNotes && analysisResult.verificationNotes.length > 0 && (
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-300 space-y-2">
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-700" />
                      Thẩm định & Kiểm soát độ chính xác thông tin:
                    </h4>
                    <ul className="space-y-1 text-xs text-amber-950 list-disc list-inside">
                      {analysisResult.verificationNotes.map((vnote, i) => (
                        <li key={i}>{vnote}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 10. Conservation Proposals */}
                {analysisResult.conservationProposals && analysisResult.conservationProposals.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-[#211E1B]/10">
                    <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Shield className="w-4 h-4" />
                      Khuyến nghị giải pháp bảo tồn di sản bền vững:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-[#211E1B]/85 list-disc list-inside">
                      {analysisResult.conservationProposals.map((prop: string, i: number) => (
                        <li key={i}>{prop}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : generatedDraftText && activeTask === 'draft' ? (
              /* Draft Output */
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#211E1B]/60 pb-2 border-b border-[#211E1B]/10">
                  <span>Trạng thái: <strong>Bản nháp dự thảo (Chờ duyệt)</strong></span>
                  <span>Độ dài: {generatedDraftText.split(/\s+/).length} từ</span>
                </div>

                <div className="prose max-w-none text-xs sm:text-sm text-[#211E1B]/85 leading-relaxed space-y-3 whitespace-pre-line p-4 bg-[#FBF9F5] rounded border border-[#211E1B]/10">
                  {generatedDraftText}
                </div>
              </div>
            ) : quizQuestions.length > 0 && activeTask === 'quiz' ? (
              /* Interactive Quiz Viewer */
              <div className="space-y-6">
                <p className="text-xs text-[#211E1B]/70">
                  Bộ câu hỏi trắc nghiệm dưới đây được tổng hợp trực tiếp từ tài liệu tham khảo đã chọn. Bạn có thể tự kiểm tra kiến thức ngay:
                </p>

                <div className="space-y-6">
                  {quizQuestions.map((q, qIndex) => {
                    const selectedOpt = userAnswers[qIndex];
                    const isAnswered = selectedOpt !== undefined;

                    return (
                      <div
                        key={qIndex}
                        className="p-4 bg-[#FBF9F5] rounded-lg border border-[#211E1B]/15 space-y-3"
                      >
                        <h4 className="text-xs sm:text-sm font-bold text-[#5E2027]">
                          Câu {qIndex + 1}: {q.question}
                        </h4>

                        <div className="space-y-2 text-xs">
                          {q.options.map((opt, optIndex) => {
                            let optionClass = 'bg-white border-[#211E1B]/15 text-[#211E1B]';
                            if (isAnswered) {
                              if (optIndex === q.correctIndex) {
                                optionClass = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-semibold';
                              } else if (selectedOpt === optIndex) {
                                optionClass = 'bg-red-100 border-red-500 text-red-950';
                              }
                            }

                            return (
                              <button
                                key={optIndex}
                                onClick={() => {
                                  if (!isAnswered) {
                                    setUserAnswers({ ...userAnswers, [qIndex]: optIndex });
                                  }
                                }}
                                className={`w-full text-left p-3 rounded border transition-all flex items-center justify-between cursor-pointer ${optionClass}`}
                              >
                                <span>{String.fromCharCode(65 + optIndex)}. {opt}</span>
                                {isAnswered && optIndex === q.correctIndex && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation */}
                        {isAnswered && (
                          <div className="p-3 bg-white rounded border border-[#211E1B]/10 text-xs text-[#211E1B]/80 space-y-1">
                            <strong className="text-[#5E2027]">Giải thích căn cứ di sản:</strong>
                            <p>{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Empty state before running */
              <div className="py-20 text-center space-y-3">
                <BrainCircuit className="w-10 h-10 text-[#B58A4A] mx-auto opacity-75" />
                <h4 className="font-heritage-serif text-base font-bold text-[#211E1B]">
                  Sẵn sàng phân tích tư liệu
                </h4>
                <p className="text-xs text-[#211E1B]/60 max-w-sm mx-auto">
                  Chọn ít nhất một tài liệu tham khảo bên trái, chọn loại nhiệm vụ cần thực hiện và bấm "Chạy phân tích AI Content Studio".
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

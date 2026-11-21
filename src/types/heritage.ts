export type CraftCategory = 'pottery' | 'lacquer' | 'weaving' | 'basketry' | 'woodwork';

export type HeritageStatus = 'officially_recognized' | 'under_research' | 'unverified_tradition';

export interface CraftProductionStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface CraftImageItem {
  url: string;
  caption: string;
  author: string;
  license: string;
  isIllustration: boolean;
}

export interface Craft {
  id: string;
  name: string;
  englishName: string;
  otherNames: string[];
  category: CraftCategory;
  categoryName: string;
  province: string; // Đồng Nai, Bình Dương, Bình Phước, Tây Ninh, TP. Hồ Chí Minh, Bà Rịa - Vũng Tàu
  specificLocation: string;
  ethnicCommunity: string;
  heritageStatus: HeritageStatus;
  heritageRecognitionDetails?: {
    title?: string;
    decisionNumber?: string;
    recognizedYear?: number;
    recognizedBy?: string;
  };
  shortDescription: string;
  historicalOrigin: string;
  formationDevelopment: string;
  primaryMaterials: string[];
  traditionalTools: string[];
  productionSteps: CraftProductionStep[];
  distinctiveTechniques: string[];
  representativeProducts: string[];
  motifsAndSymbolism: string;
  culturalSocioEconomicValues: string;
  artisanRole: string;
  conservationStatus: string;
  challenges: string[];
  conservationSolutions: string[];
  mainImage: string;
  galleryImages: CraftImageItem[];
  referenceIds: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  featured: boolean;
  published: boolean;
  updatedAt: string;
}

export interface ArtisanStory {
  id: string;
  title: string;
  subtitle: string;
  artisanName: string;
  honorificTitle: string;
  birthYear: number;
  craftId: string;
  village: string;
  image: string;
  quote: string;
  excerpt: string;
  content: string;
  learningJourney: string;
  transmissionStory: string;
  source: string;
  published: boolean;
  publishedAt: string;
}

export type ReferenceType =
  | 'state_agency'
  | 'unesco'
  | 'database'
  | 'planning_doc'
  | 'official_decision'
  | 'museum_archive'
  | 'research_paper'
  | 'book'
  | 'field_report';

export type VerificationStatus = 'verified' | 'pending' | 'secondary' | 'needs_check';
export type LinkStatus = 'active' | 'needs_check';

export type TopicGroup =
  | 'legal_policy'          // Nguồn pháp lý và chính sách di sản
  | 'ich_database'          // Cơ sở dữ liệu di sản phi vật thể
  | 'pottery_craft'         // Nghề gốm truyền thống
  | 'lacquer_craft'         // Nghề sơn mài truyền thống
  | 'weaving_ethnic'        // Nghề dệt và nghề thủ công của cộng đồng dân tộc
  | 'conservation_planning' // Tài liệu bảo tồn và phát huy giá trị di sản
  | 'general_craft';        // Nghề thủ công Đông Nam Bộ nói chung

export interface ReferenceSource {
  id: string;
  title: string;
  issuingOrganization: string; // Tên cơ quan / tổ chức phát hành
  authorOrg: string;           // Tương thích ngược
  url: string;
  year?: number;
  accessDate: string;
  updatedDate?: string;
  language: string;
  topic: string;
  topicGroups: TopicGroup[];   // Phân loại nguồn (một nguồn có thể thuộc nhiều nhóm)
  type: ReferenceType;
  summary: string;
  license: string;
  usageLicenseNotes?: string;  // Ghi chú về quyền sử dụng nội dung
  verificationStatus: VerificationStatus;
  linkStatus: LinkStatus;      // Trạng thái xác minh liên kết: hoạt động hoặc cần kiểm tra
  linkStatusNote?: string;     // Ghi chú trạng thái liên kết
  associatedCraftIds: string[];
}

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  location: string;
  craftId: string;
  craftName: string;
  category: 'material' | 'tool' | 'process' | 'product' | 'motif' | 'artisan';
  url: string;
  author: string;
  license: string;
  isIllustration: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface AIAnalysisResult {
  summary: string;
  historicalInfo: string;
  geographicalInfo: string;
  craftTechniques: string;
  culturalValues: string;
  practicingCommunity: string;
  transmissionMethod: string;
  lessonIdeas: string[];
  heritageStories: string[];
  learningScenarios: string[];
  craftIntroOutline: string[];
  suggestedQuizzes: QuizQuestion[];
  verificationNotes: string[];
  entities?: {
    crafts: string[];
    places: string[];
    materials: string[];
    tools: string[];
    techniques: string[];
    verificationNotes: string[];
  };
  conservationProposals?: string[];
}

export interface AIDraft {
  id: string;
  title: string;
  type: 'craft_intro' | 'heritage_story' | 'quiz' | 'conservation_plan' | 'comprehensive_analysis';
  sourceReferenceIds: string[];
  sourceReferenceTitles: string[];
  generatedContent: string;
  structuredQuiz?: QuizQuestion[];
  analysisData?: AIAnalysisResult;
  extractedEntities?: {
    crafts: string[];
    places: string[];
    materials: string[];
    tools: string[];
    techniques: string[];
    verificationNotes: string[];
  };
  status: 'draft' | 'reviewed' | 'published';
  createdAt: string;
}

export type UserRole = 'admin' | 'editor' | 'visitor';

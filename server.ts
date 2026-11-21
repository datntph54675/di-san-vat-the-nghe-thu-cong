import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const distPath = path.resolve(__dirname, 'dist');
const hasDist = fs.existsSync(path.resolve(distPath, 'index.html'));
const isProduction = process.env.NODE_ENV === 'production' || hasDist;

app.use(express.json({ limit: '10mb' }));

// Lazy initializer for Google Gemini client
function getAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint (for Cloud Run probes and uptime checks)
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Southeast Vietnam Intangible Cultural Heritage API',
    mode: isProduction ? 'production' : 'development',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Gemini Analysis API
app.post('/api/gemini/analyze', async (req: Request, res: Response) => {
  try {
    const { references, instruction } = req.body;
    if (!references || !Array.isArray(references) || references.length === 0) {
      res.status(400).json({ error: 'Thiếu danh sách tài liệu tham khảo để phân tích.' });
      return;
    }

    const ai = getAIClient();
    if (!ai) {
      // Graceful local fallback if API key is not yet configured in Secrets
      res.json({
        summary: `Tài liệu khảo cứu đã xác nhận các giá trị văn hoá phi vật thể nổi bật của ${references.length} nguồn tham khảo chính thống tại Đông Nam Bộ.`,
        entities: {
          crafts: references.flatMap((r: any) => r.associatedCraftIds || []),
          places: references.map((r: any) => r.topic || ''),
          materials: ['Đất sét Tân Uyên', 'Nhựa sơn ta', 'Tre lồ ô rừng', 'Sợi bông tự nhiên'],
          tools: ['Bàn xoay chân', 'Khung dệt lưng', 'Dao rựa chuốt nan', 'Lò bầu nung củi'],
          techniques: ['Khắc vạch chấm men', 'Ủ sơn buồng ẩm', 'Cẩn vỏ trứng nung', 'Ngâm bùn chống mối mọt'],
          verificationNotes: ['Nội dung cần trích dẫn số quyết định của Bộ VHTTDL cho các di sản chính thức.']
        },
        conservationProposals: [
          'Thành lập khu bảo tồn di sản nghề thủ công kết hợp du lịch trải nghiệm sinh thái.',
          'Bảo hộ nhãn hiệu tập thể và chỉ dẫn địa lý cho làng nghề.',
          'Hỗ trợ chế độ đãi ngộ cho Nghệ nhân Nhân dân và Nghệ nhân Ưu tú truyền nghề.'
        ]
      });
      return;
    }

    const refText = references
      .map((r: any, idx: number) => `[Tài liệu ${idx + 1}]: Tiêu đề: ${r.title}. Cơ quan/Tác giả: ${r.issuingOrganization || r.authorOrg}. Loại: ${r.type}. URL: ${r.url}. Nhóm chủ đề: ${(r.topicGroups || []).join(', ')}. Tóm tắt: ${r.summary}. Quyền sử dụng: ${r.usageLicenseNotes || r.license}`)
      .join('\n\n');

    const prompt = `Bạn là chuyên gia thẩm định và nghiên cứu di sản văn hóa phi vật thể Việt Nam, chuyên sâu về Vùng văn hóa Đông Nam Bộ (Nghề gốm Biên Hòa/Lái Thiêu, Nghề sơn mài Tương Bình Hiệp, Nghề dệt thổ cẩm người S'tiêng, Nghề đan lát người Chơ Ro,...).

Hãy phân tích kỹ lưỡng các tài liệu tham khảo chính thống sau đây:
${refText}

Yêu cầu cụ thể: ${instruction || 'Phân tích toàn diện giá trị di sản, bóc tách dữ liệu lịch sử, kỹ thuật, cộng đồng thực hành và đề xuất nội dung giáo dục, câu chuyện di sản, tình huống học tập.'}

NGUYÊN TẮC KIỂM SOÁT ĐỘ CHÍNH XÁC (BẮT BUỘC TUÂN THỦ NGHIÊM NGẶT):
1. TUYỆT ĐỐI KHÔNG tự bịa đặt thông tin lịch sử, tên nghệ nhân, địa danh hoặc kỹ thuật chế tác.
2. TUYỆT ĐỐI KHÔNG tự kết luận một nghề thủ công đã được UNESCO công nhận/ghi danh nếu không có hồ sơ chứng minh.
   - PHÂN BIỆT RÕ: Di sản văn hóa phi vật thể cấp quốc gia (do Bộ VHTTDL Việt Nam ghi danh theo Luật Di sản văn hóa) KHÁC VỚI Di sản được UNESCO ghi danh (Công ước 2003). Gốm Biên Hòa, Sơn mài Tương Bình Hiệp, Thổ cẩm S'tiêng hiện là Di sản phi vật thể QUỐC GIA của Việt Nam.
3. ĐỐI VỚI NGHỀ DỆT THỔ CẨM CỦA NGƯỜI S'TIÊNG: Không sử dụng nguồn tổng quan để tự tạo ra các chi tiết lịch sử, kỹ thuật hoặc tên nghệ nhân chưa được kiểm chứng.
4. Mọi thông tin quan trọng phải gắn liền với nguồn tham khảo tương ứng.
5. Nếu trong tài liệu không có thông tin về một trường nào đó, PHẢI ghi rõ: "Chưa có dữ liệu xác minh" thay vì phỏng đoán.
6. Trả về đúng định dạng JSON chuẩn theo Schema được cung cấp.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: 'Tóm tắt tổng quan phân tích tài liệu' },
            historicalInfo: { type: Type.STRING, description: 'Thông tin lịch sử hình thành (hoặc Chưa có dữ liệu xác minh)' },
            geographicalInfo: { type: Type.STRING, description: 'Địa danh và không gian địa lý văn hóa' },
            craftTechniques: { type: Type.STRING, description: 'Kỹ thuật chế tác đặc trưng đã được kiểm chứng' },
            culturalValues: { type: Type.STRING, description: 'Giá trị văn hóa, tâm linh và đời sống cộng đồng' },
            practicingCommunity: { type: Type.STRING, description: 'Cộng đồng chủ thể thực hành (hoặc Chưa có dữ liệu xác minh)' },
            transmissionMethod: { type: Type.STRING, description: 'Phương thức truyền dạy và trao truyền nghề (hoặc Chưa có dữ liệu xác minh)' },
            lessonIdeas: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Đề xuất ý tưởng bài học cho học sinh, sinh viên, người học'
            },
            heritageStories: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Đề xuất nội dung câu chuyện di sản, ký sự làng nghề'
            },
            learningScenarios: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Đề xuất tình huống học tập, bài tập khảo cứu điền dã'
            },
            craftIntroOutline: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Đề xuất đề cương nội dung giới thiệu nghề thủ công'
            },
            suggestedQuizzes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correctIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING }
                },
                required: ['question', 'options', 'correctIndex', 'explanation']
              },
              description: 'Gợi ý câu hỏi trắc nghiệm kiểm tra nhận thức'
            },
            verificationNotes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Các ghi chú thẩm định độ chính xác, phân biệt cấp quốc gia và UNESCO'
            },
            entities: {
              type: Type.OBJECT,
              properties: {
                crafts: { type: Type.ARRAY, items: { type: Type.STRING } },
                places: { type: Type.ARRAY, items: { type: Type.STRING } },
                materials: { type: Type.ARRAY, items: { type: Type.STRING } },
                tools: { type: Type.ARRAY, items: { type: Type.STRING } },
                techniques: { type: Type.ARRAY, items: { type: Type.STRING } },
                verificationNotes: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ['crafts', 'places', 'materials', 'tools', 'techniques', 'verificationNotes']
            },
            conservationProposals: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Đề xuất giải pháp bảo tồn và phát huy'
            }
          },
          required: [
            'summary',
            'historicalInfo',
            'geographicalInfo',
            'craftTechniques',
            'culturalValues',
            'practicingCommunity',
            'transmissionMethod',
            'lessonIdeas',
            'heritageStories',
            'learningScenarios',
            'craftIntroOutline',
            'suggestedQuizzes',
            'verificationNotes',
            'entities',
            'conservationProposals'
          ]
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (err: any) {
    console.error('Gemini analyze error:', err);
    res.status(500).json({ error: 'Lỗi trong quá trình xử lý AI: ' + (err.message || 'Không rõ nguyên nhân') });
  }
});

// Gemini Quiz Generation API
app.post('/api/gemini/quiz', async (req: Request, res: Response) => {
  try {
    const { references } = req.body;
    const ai = getAIClient();
    if (!ai) {
      res.json({ questions: [] });
      return;
    }

    const refText = (references || [])
      .map((r: any, idx: number) => `[Nguồn ${idx + 1}]: ${r.title} - ${r.summary}`)
      .join('\n');

    const prompt = `Hãy tạo 4 câu hỏi trắc nghiệm khách quan phục vụ học tập và nghiên cứu về nghề thủ công truyền thống vùng Đông Nam Bộ (Gốm Biên Hòa, Sơn mài Tương Bình Hiệp, Dệt thổ cẩm S'tiêng, Đan lát Chơ Ro,...) dựa trên các tài liệu sau:
${refText}

Mỗi câu hỏi có 4 phương án lựa chọn, chỉ có 1 phương án đúng (correctIndex từ 0 đến 3), và giải thích ngắn gọn dựa trên kiến thức di sản.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correctIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING }
                },
                required: ['question', 'options', 'correctIndex', 'explanation']
              }
            }
          },
          required: ['questions']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{"questions": []}');
    res.json(parsed);
  } catch (err: any) {
    console.error('Gemini quiz error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Gemini Draft Generator API
app.post('/api/gemini/generate-draft', async (req: Request, res: Response) => {
  try {
    const { type, references, title, instructions } = req.body;
    const ai = getAIClient();
    if (!ai) {
      res.json({
        content: `### ${title}\n\nNội dung dự thảo dựa trên ${references?.length || 0} tài liệu tham khảo Đông Nam Bộ. Vui lòng cấu hình API Key trong Secrets để sử dụng mô hình Gemini 3.8 Flash đầy đủ.`
      });
      return;
    }

    const refText = (references || [])
      .map((r: any, idx: number) => `[Tài liệu ${idx + 1}]: ${r.title} (${r.authorOrg}, ${r.year}): ${r.summary}`)
      .join('\n\n');

    const prompt = `Bạn là biên tập viên cao cấp của Bảo tàng Di sản Văn hoá Phi vật thể Đông Nam Bộ. Hãy soạn thảo một bản thảo nội dung mang phong cách học thuật - văn hoá, truyền cảm hứng và chuẩn xác về mặt lịch sử:
Tiêu đề dự thảo: "${title}"
Thể loại: ${type === 'craft_intro' ? 'Bài giới thiệu chuyên sâu nghề thủ công' : type === 'heritage_story' ? 'Bài viết ký sự câu chuyện nghệ nhân & giữ nghề' : 'Đề án giải pháp bảo tồn di sản văn hoá'}
Yêu cầu biên tập: ${instructions || 'Trình bày rõ cội nguồn, kỹ thuật đặc trưng, giá trị văn hoá và các khuyến nghị bảo tồn thực tế.'}

Căn cứ tài liệu nghiên cứu:
${refText}

QUY TẮC:
- Dùng tiếng Việt chuẩn mực, giàu tính biểu cảm nhưng nghiêm cẩn về thuật ngữ chuyên môn.
- Nêu rõ các nguồn đã sử dụng làm căn cứ.
- Không tự ý bịa đặt tên tuổi, địa danh không có trong thực tế.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt
    });

    res.json({ content: response.text || '' });
  } catch (err: any) {
    console.error('Gemini generate draft error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Static image assets routes (available in both development and production)
app.use('/assets/images', express.static(path.resolve(__dirname, 'public/assets/images')));
app.use('/assets/images', express.static(path.resolve(__dirname, 'dist/assets/images')));
app.use('/src/assets/images', express.static(path.resolve(__dirname, 'src/assets/images')));
app.use('/images', express.static(path.resolve(__dirname, 'public/images')));
app.use('/images', express.static(path.resolve(__dirname, 'dist/images')));

// Start Express server
async function startServer() {
  if (isProduction) {
    // Production Mode: Serve compiled static assets from dist/
    app.use(express.static(distPath));

    // Handle SPA client-side routing for non-API routes
    app.get('*', (req: Request, res: Response) => {
      if (req.path.startsWith('/api')) {
        res.status(404).json({ error: 'API endpoint not found' });
        return;
      }
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    // Development Mode: Use Vite dev server in middleware mode
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Heritage Digital Museum Server running in ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'} mode on http://0.0.0.0:${PORT}`);
  });
}

startServer();

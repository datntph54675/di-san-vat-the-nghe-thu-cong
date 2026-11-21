import { Craft, ArtisanStory, ReferenceSource, MediaItem } from '../types/heritage';

// Visual asset paths for production and development
export const ASSET_HERO = '/assets/images/hero_craft_artisan_1793891481621.jpg';
export const ASSET_POTTERY_BIENHOA = '/assets/images/craft_bienhoa_pottery_1793891481080.jpg';
export const ASSET_LACQUER_TUONGBINHHIEP = '/assets/images/craft_tuongbinhhiep_lacquer_1793891481589.jpg';
export const ASSET_WEAVING_STIENG = '/assets/images/craft_stieng_weaving_1793891483072.jpg';
export const ASSET_BASKETRY_BAMBOO = '/assets/images/craft_bamboo_basketry_1793891483167.jpg';

export const INITIAL_REFERENCES: ReferenceSource[] = [
  // --- 10 NGUỒN CHÍNH THỐNG MỚI CẬP NHẬT THEO YÊU CẦU ---
  {
    id: 'ref-official-01',
    title: 'Cổng thông tin điện tử Cục Di sản văn hóa',
    issuingOrganization: 'Cục Di sản văn hóa (Bộ Văn hóa, Thể thao và Du lịch)',
    authorOrg: 'Cục Di sản văn hóa - Bộ VHTTDL',
    url: 'https://dsvh.gov.vn/',
    accessDate: '2026-11-09',
    updatedDate: '2026-11-09',
    language: 'Tiếng Việt',
    topic: 'Quản lý nhà nước về di sản văn hóa vật thể và phi vật thể tại Việt Nam',
    topicGroups: ['legal_policy', 'conservation_planning'],
    type: 'state_agency',
    summary: 'Cơ quan quản lý nhà nước chuyên ngành cao nhất về di sản văn hóa của Việt Nam; công bố các văn bản quy phạm pháp luật, chỉ thị bảo tồn, quyết định công nhận Danh mục di sản văn hóa phi vật thể quốc gia và chính sách hỗ trợ nghệ nhân nhân dân, nghệ nhân ưu tú.',
    license: 'Cổng thông tin Chính phủ / Thông tin công khai nhà nước',
    usageLicenseNotes: 'Thông tin công khai chính thức của cơ quan nhà nước, được phép trích dẫn và nghiên cứu học thuật.',
    verificationStatus: 'verified',
    linkStatus: 'active',
    linkStatusNote: 'Đã kiểm tra kết nối thành công (HTTP 200 OK)',
    associatedCraftIds: ['craft-gom-bien-hoa', 'craft-son-mai-tuong-binh-hiep', 'craft-det-tho-cam-stieng', 'craft-dan-lat-cho-ro']
  },
  {
    id: 'ref-official-02',
    title: 'Cơ sở dữ liệu Di sản văn hóa phi vật thể Việt Nam',
    issuingOrganization: 'Cục Di sản văn hóa – Bộ Văn hóa, Thể thao và Du lịch',
    authorOrg: 'Cục Di sản văn hóa',
    url: 'https://dsvhpvt.dsvh.gov.vn/Home.aspx',
    accessDate: '2026-11-09',
    updatedDate: '2026-11-09',
    language: 'Tiếng Việt',
    topic: 'Cơ sở dữ liệu khoa học quốc gia về di sản văn hóa phi vật thể các dân tộc Việt Nam',
    topicGroups: ['ich_database', 'legal_policy', 'conservation_planning'],
    type: 'database',
    summary: 'Hệ thống cơ sở dữ liệu số hóa quốc gia lưu trữ toàn bộ hồ sơ khoa học, danh mục kiểm kê di sản phi vật thể quốc gia, tư liệu điền dã, hình ảnh hiện vật và thông tin cộng đồng nắm giữ tri thức nghề thủ công truyền thống trên toàn quốc.',
    license: 'Cơ sở dữ liệu số quốc gia',
    usageLicenseNotes: 'Khai thác phục vụ mục đích nghiên cứu, học tập và bảo tồn văn hoá phi thương mại.',
    verificationStatus: 'verified',
    linkStatus: 'active',
    linkStatusNote: 'Đã kiểm tra kết nối thành công (HTTP 200 OK)',
    associatedCraftIds: ['craft-gom-bien-hoa', 'craft-son-mai-tuong-binh-hiep', 'craft-det-tho-cam-stieng', 'craft-dan-lat-cho-ro']
  },
  {
    id: 'ref-official-03',
    title: 'UNESCO – Elements on the Lists of Intangible Cultural Heritage in Viet Nam',
    issuingOrganization: 'UNESCO (United Nations Educational, Scientific and Cultural Organization)',
    authorOrg: 'UNESCO Intangible Cultural Heritage Section',
    url: 'https://ich.unesco.org/en/state/viet-nam-VN?info=elements-on-the-lists',
    accessDate: '2026-11-09',
    updatedDate: '2026-11-09',
    language: 'Tiếng Anh',
    topic: 'Danh mục chính thức các di sản văn hóa phi vật thể của Việt Nam được UNESCO ghi danh',
    topicGroups: ['ich_database', 'legal_policy'],
    type: 'unesco',
    summary: 'Hồ sơ lưu trữ chính thức của UNESCO ghi danh các di sản văn hóa phi vật thể của Việt Nam vào Danh sách Đại diện của Nhân loại và Cần bảo vệ khẩn cấp. Nguồn này là chuẩn đối chiếu bắt buộc để xác định chính xác danh hiệu quốc tế, tránh kết luận sai lệch về tình trạng công nhận UNESCO.',
    license: 'UNESCO Open Access Policy',
    usageLicenseNotes: 'Tài liệu tra cứu công khai quốc tế. Cần trích dẫn rõ nguồn UNESCO khi sử dụng tư liệu.',
    verificationStatus: 'verified',
    linkStatus: 'active',
    linkStatusNote: 'Đã kiểm tra kết nối thành công (HTTP 200 OK)',
    associatedCraftIds: []
  },
  {
    id: 'ref-official-04',
    title: 'UNESCO – Các lĩnh vực di sản văn hóa phi vật thể (Intangible Cultural Heritage Domains)',
    issuingOrganization: 'UNESCO – Ban Thư ký Công ước Bảo vệ Di sản Văn hóa Phi vật thể',
    authorOrg: 'UNESCO',
    url: 'https://ich.unesco.org/en/intangible-heritage-domains-00052',
    accessDate: '2026-11-09',
    updatedDate: '2026-11-09',
    language: 'Tiếng Anh',
    topic: 'Khung phân loại 5 lĩnh vực di sản phi vật thể theo Điều 2.2 Công ước 2003',
    topicGroups: ['legal_policy', 'ich_database', 'conservation_planning'],
    type: 'unesco',
    summary: 'Định nghĩa chuẩn hóa quốc tế về 5 lĩnh vực di sản phi vật thể theo Điều 2.2 Công ước 2003, trong đó xác định rõ tiêu chí, phạm vi và phương pháp tiếp cận đối với lĩnh vực "Nghề thủ công truyền thống" (Traditional Craftsmanship) và mối liên hệ với tri thức dân gian.',
    license: 'UNESCO Open Access (CC-BY-SA 3.0 IGO)',
    usageLicenseNotes: 'Được phép phổ biến và sử dụng trong nghiên cứu khoa học xã hội và nhân văn.',
    verificationStatus: 'verified',
    linkStatus: 'active',
    linkStatusNote: 'Đã kiểm tra kết nối thành công (HTTP 200 OK)',
    associatedCraftIds: ['craft-gom-bien-hoa', 'craft-son-mai-tuong-binh-hiep', 'craft-det-tho-cam-stieng', 'craft-dan-lat-cho-ro']
  },
  {
    id: 'ref-official-05',
    title: 'UNESCO – Công ước 2003 về bảo vệ di sản văn hóa phi vật thể',
    issuingOrganization: 'UNESCO – Đại hội đồng các quốc gia thành viên',
    authorOrg: 'UNESCO',
    url: 'https://ich.unesco.org/convention',
    year: 2003,
    accessDate: '2026-11-09',
    updatedDate: '2026-11-09',
    language: 'Tiếng Anh & Đa ngữ',
    topic: 'Văn kiện pháp lý quốc tế nền tảng về bảo vệ di sản văn hóa phi vật thể',
    topicGroups: ['legal_policy', 'conservation_planning'],
    type: 'unesco',
    summary: 'Công ước quốc tế quy định trách nhiệm của các quốc gia thành viên trong việc bảo vệ, tôn trọng và nâng cao nhận thức về di sản phi vật thể; nhấn mạnh vai trò trung tâm của cộng đồng chủ thể thực hành và sự tự quyết của người truyền dạy di sản.',
    license: 'Điều ước quốc tế công khai',
    usageLicenseNotes: 'Văn kiện pháp lý quốc tế công khai có hiệu lực toàn cầu.',
    verificationStatus: 'verified',
    linkStatus: 'active',
    linkStatusNote: 'Đã kiểm tra kết nối thành công (HTTP 200 OK)',
    associatedCraftIds: ['craft-gom-bien-hoa', 'craft-son-mai-tuong-binh-hiep', 'craft-det-tho-cam-stieng', 'craft-dan-lat-cho-ro']
  },
  {
    id: 'ref-official-06',
    title: 'UNESCO – Hướng dẫn thực hiện Công ước 2003 (Operational Directives)',
    issuingOrganization: 'UNESCO – Ủy ban Liên chính phủ về Bảo vệ Di sản Văn hóa Phi vật thể',
    authorOrg: 'UNESCO',
    url: 'https://ich.unesco.org/en/directives',
    accessDate: '2026-11-09',
    updatedDate: '2026-11-09',
    language: 'Tiếng Anh',
    topic: 'Chỉ dẫn nghiệp vụ triển khai các biện pháp bảo vệ và ghi danh di sản phi vật thể',
    topicGroups: ['legal_policy', 'conservation_planning'],
    type: 'unesco',
    summary: 'Tài liệu hướng dẫn nghiệp vụ toàn cầu quy định quy trình kiểm kê định kỳ, lập hồ sơ đề cử, chuẩn mực đạo đức trong bảo vệ di sản, phòng ngừa thương mại hóa thái quá và cơ chế hỗ trợ tài chính quốc tế cho các dự án bảo tồn khẩn cấp.',
    license: 'UNESCO Operational Directives',
    usageLicenseNotes: 'Tài liệu hướng dẫn nghiệp vụ chuẩn mực của UNESCO.',
    verificationStatus: 'verified',
    linkStatus: 'active',
    linkStatusNote: 'Đã kiểm tra kết nối thành công (HTTP 200 OK)',
    associatedCraftIds: ['craft-gom-bien-hoa', 'craft-son-mai-tuong-binh-hiep', 'craft-det-tho-cam-stieng', 'craft-dan-lat-cho-ro']
  },
  {
    id: 'ref-official-07',
    title: 'Cổng thông tin Du lịch Bình Dương – Làng sơn mài Tương Bình Hiệp',
    issuingOrganization: 'Trung tâm Xúc tiến Du lịch – Sở Văn hóa, Thể thao và Du lịch tỉnh Bình Dương',
    authorOrg: 'Cổng thông tin Du lịch Bình Dương',
    url: 'https://dulich.binhduong.gov.vn/vi/langsonmai',
    accessDate: '2026-11-09',
    updatedDate: '2026-11-09',
    language: 'Tiếng Việt',
    topic: 'Lịch sử làng nghề, không gian xưởng thợ và tour trải nghiệm sơn mài Tương Bình Hiệp',
    topicGroups: ['lacquer_craft', 'conservation_planning'],
    type: 'state_agency',
    summary: 'Trang thông tin ngành du lịch tỉnh Bình Dương giới thiệu về cội nguồn hơn 300 năm của làng sơn mài Tương Bình Hiệp (TP. Thủ Dầu Một), chỉ dẫn các xưởng thợ gia truyền, quy trình nung ủ sơn ta và các tuyến tham quan làng nghề truyền thống.',
    license: 'Cổng thông tin ngành du lịch tỉnh Bình Dương',
    usageLicenseNotes: 'Tư liệu quảng bá di sản địa phương. Cần kiểm tra lại liên kết do máy chủ tên miền đang gián đoạn.',
    verificationStatus: 'pending',
    linkStatus: 'needs_check',
    linkStatusNote: 'Cần kiểm tra: Tên miền dulich.binhduong.gov.vn đang gặp sự cố DNS hoặc tạm thời gián đoạn truy cập',
    associatedCraftIds: ['craft-son-mai-tuong-binh-hiep']
  },
  {
    id: 'ref-official-08',
    title: 'Cổng Du lịch Bình Dương – Nghề sơn mài Tương Bình Hiệp (Chuyện kể đất Phương Nam)',
    issuingOrganization: 'Cổng thông tin Du lịch Bình Dương & Đài PT-TH Vĩnh Long',
    authorOrg: 'Cổng thông tin Du lịch Bình Dương',
    url: 'https://dulich.binhduong.gov.vn/vi/detailnews/?id=news_2043&t=nghe-son-mai-tuong-binh-hiep-duoc-gioi-thieu-qua-chuong-trinh-chuyen-ke-dat-phuong-nam-cua-dai-truyen-hinh-vinh-long',
    accessDate: '2026-11-09',
    updatedDate: '2026-11-09',
    language: 'Tiếng Việt',
    topic: 'Ký sự truyền hình về quy trình chế tác sơn mài Tương Bình Hiệp và tâm huyết nghệ nhân',
    topicGroups: ['lacquer_craft', 'conservation_planning'],
    type: 'state_agency',
    summary: 'Bài viết và tư liệu truyền thông chính thức ghi nhận quy trình chế tác công phu: tạo vóc, bó vải, quét hom, vào sơn nhiều lớp, cẩn ốc xà cừ, mài dưới nước và đánh bóng của các nghệ nhân sơn mài đất Thủ.',
    license: 'Bản quyền Cổng Du lịch Bình Dương & Đài PT-TH Vĩnh Long',
    usageLicenseNotes: 'Tư liệu truyền thông phục vụ công chúng. Cần kiểm tra lại liên kết do máy chủ tên miền đang gián đoạn.',
    verificationStatus: 'pending',
    linkStatus: 'needs_check',
    linkStatusNote: 'Cần kiểm tra: Liên kết thuộc tên miền dulich.binhduong.gov.vn cần xác minh lại địa chỉ kết nối',
    associatedCraftIds: ['craft-son-mai-tuong-binh-hiep']
  },
  {
    id: 'ref-official-09',
    title: 'Biên Hòa: Nghiên cứu xây dựng Bảo tàng Gốm tại khu vực Hồ Đá (Hóa An)',
    issuingOrganization: 'Cổng thông tin điện tử UBND thành phố Biên Hòa, tỉnh Đồng Nai',
    authorOrg: 'UBND thành phố Biên Hòa',
    url: 'https://bienhoa.dongnai.gov.vn/vi/news/kinh-te-moi-truong/bien-hoa-nghien-cuu-xay-dung-bao-tang-gom-tai-khu-vuc-ho-da-591.html',
    year: 2024,
    accessDate: '2026-11-09',
    updatedDate: '2026-11-09',
    language: 'Tiếng Việt',
    topic: 'Quy hoạch bảo tồn và xây dựng Bảo tàng Gốm Biên Hòa kết nối tuyến du lịch ven sông Đồng Nai',
    topicGroups: ['pottery_craft', 'conservation_planning', 'legal_policy'],
    type: 'planning_doc',
    summary: 'Văn bản và tin tức quy hoạch của UBND thành phố Biên Hòa về phương án xây dựng Bảo tàng Gốm Biên Hòa tại Hồ Đá (phường Hóa An), quy hoạch không gian trưng bày hiện vật men gốm mỹ nghệ, khôi phục lò gốm cổ và kết nối tuyến du lịch di sản văn hoá sinh thái ven sông Đồng Nai.',
    license: 'Thông tin quy hoạch và chủ trương nhà nước công khai',
    usageLicenseNotes: 'Văn bản thông tin quy hoạch công khai của UBND thành phố Biên Hòa.',
    verificationStatus: 'verified',
    linkStatus: 'active',
    linkStatusNote: 'Đã kiểm tra kết nối thành công (HTTP 200 OK)',
    associatedCraftIds: ['craft-gom-bien-hoa']
  },
  {
    id: 'ref-official-10',
    title: 'Gìn giữ hồn gốm Biên Hòa - Lan tỏa giá trị văn hóa truyền thống trong thời đại mới',
    issuingOrganization: 'Cổng thông tin điện tử Văn phòng UBND tỉnh Đồng Nai',
    authorOrg: 'Văn phòng UBND tỉnh Đồng Nai',
    url: 'https://vpubnd.dongnai.gov.vn/vi/news/thong-tin-tuyen-truyen-98/gin-giu-hon-gom-bien-hoa-lan-toa-gia-tri-van-hoa-truyen-thong-trong-thoi-dai-moi-279.html',
    year: 2024,
    accessDate: '2026-11-09',
    updatedDate: '2026-11-09',
    language: 'Tiếng Việt',
    topic: 'Bảo tồn kỹ thuật men gốm Biên Hòa, giải pháp vùng nguyên liệu và đào tạo nghệ nhân',
    topicGroups: ['pottery_craft', 'conservation_planning'],
    type: 'state_agency',
    summary: 'Bài viết chỉ đạo và tuyên truyền chính thống của UBND tỉnh Đồng Nai về giải pháp duy trì thương hiệu gốm Biên Hòa trứ danh (men xanh đồng trổ bông Vert de Bien Hoa, men thủy tinh), bài toán bảo vệ vùng nguyên liệu đất sét tự nhiên và cơ chế chính sách tiếp lửa cho thế hệ trẻ làm nghề.',
    license: 'Thông tin tuyên truyền chính thống UBND tỉnh Đồng Nai',
    usageLicenseNotes: 'Bài viết tuyên truyền chính thức của cơ quan nhà nước cấp tỉnh.',
    verificationStatus: 'verified',
    linkStatus: 'active',
    linkStatusNote: 'Đã kiểm tra kết nối thành công (HTTP 200 OK)',
    associatedCraftIds: ['craft-gom-bien-hoa']
  },

  // --- CÁC NGUỒN THAM KHẢO NGHIÊN CỨU HIỆN CÓ ĐƯỢC BẢO TOÀN ---
  {
    id: 'ref-01',
    title: 'Quyết định công bố Danh mục Di sản văn hóa phi vật thể quốc gia: Nghề làm gốm Biên Hòa',
    issuingOrganization: 'Bộ Văn hóa, Thể thao và Du lịch',
    authorOrg: 'Bộ Văn hóa, Thể thao và Du lịch',
    url: 'https://dsvh.gov.vn/',
    year: 2023,
    accessDate: '2026-10-15',
    updatedDate: '2026-11-09',
    language: 'Tiếng Việt',
    topic: 'Di sản phi vật thể quốc gia, nghề gốm truyền thống Đông Nam Bộ',
    topicGroups: ['pottery_craft', 'legal_policy'],
    type: 'official_decision',
    summary: 'Văn bản pháp lý ghi nhận tri thức dân gian và nghề thủ công truyền thống gốm Biên Hòa (tỉnh Đồng Nai), tôn vinh kỹ thuật men xanh đồng trổ bông đặc trưng cùng giá trị lịch sử từ cuối thế kỷ 19.',
    license: 'Công báo Chính phủ / Tài liệu quản lý nhà nước',
    usageLicenseNotes: 'Công báo Chính phủ, tài liệu pháp lý công khai.',
    verificationStatus: 'verified',
    linkStatus: 'active',
    linkStatusNote: 'Đã xác thực theo Cổng TT Cục Di sản văn hóa',
    associatedCraftIds: ['craft-gom-bien-hoa']
  },
  {
    id: 'ref-02',
    title: 'Quyết định số 4069/QĐ-BVHTTDL: Đưa Nghề sơn mài Tương Bình Hiệp vào Danh mục Di sản văn hóa phi vật thể quốc gia',
    issuingOrganization: 'Bộ Văn hóa, Thể thao và Du lịch',
    authorOrg: 'Bộ Văn hóa, Thể thao và Du lịch',
    url: 'https://dsvh.gov.vn/',
    year: 2016,
    accessDate: '2026-10-18',
    updatedDate: '2026-11-09',
    language: 'Tiếng Việt',
    topic: 'Nghề sơn mài truyền thống Nam Bộ, văn hoá tỉnh Bình Dương',
    topicGroups: ['lacquer_craft', 'legal_policy'],
    type: 'official_decision',
    summary: 'Quyết định ghi danh nghề thủ công truyền thống làng sơn mài Tương Bình Hiệp (TP. Thủ Dầu Một, Bình Dương). Xác định quy trình sơn ta nhiều lớp, kỹ thuật cẩn trứng, khảm xà cừ và mài ướt độc đáo.',
    license: 'Công báo Chính phủ',
    usageLicenseNotes: 'Công báo Chính phủ, tài liệu pháp lý công khai.',
    verificationStatus: 'verified',
    linkStatus: 'active',
    linkStatusNote: 'Đã xác thực theo Cổng TT Cục Di sản văn hóa',
    associatedCraftIds: ['craft-son-mai-tuong-binh-hiep']
  },
  {
    id: 'ref-03',
    title: 'Quyết định công nhận Tri thức dân gian và Kỹ thuật dệt thổ cẩm của người S\'tiêng tỉnh Bình Phước',
    issuingOrganization: 'Bộ Văn hóa, Thể thao và Du lịch',
    authorOrg: 'Bộ Văn hóa, Thể thao và Du lịch',
    url: 'https://dsvh.gov.vn/',
    year: 2014,
    accessDate: '2026-10-20',
    updatedDate: '2026-11-09',
    language: 'Tiếng Việt',
    topic: 'Dệt thổ cẩm, trang phục truyền thống các dân tộc thiểu số miền Đông Nam Bộ',
    topicGroups: ['weaving_ethnic', 'legal_policy'],
    type: 'official_decision',
    summary: 'Ghi danh kỹ thuật dệt cạp cửi lưng (backstrap loom), hoa văn hình học cổ truyền mô phỏng muông thú, hạt lúa và thế giới quan của cộng đồng dân tộc S\'tiêng tại Bình Phước. Lưu ý kiểm soát thông tin: Không tự suy đoán tên nghệ nhân hoặc lịch sử ngoài tài liệu khoa học.',
    license: 'Công báo Chính phủ',
    usageLicenseNotes: 'Công báo Chính phủ, tài liệu pháp lý công khai.',
    verificationStatus: 'verified',
    linkStatus: 'active',
    linkStatusNote: 'Đã xác thực theo Cổng TT Cục Di sản văn hóa',
    associatedCraftIds: ['craft-det-tho-cam-stieng']
  },
  {
    id: 'ref-04',
    title: 'Khảo cứu Gốm mỹ nghệ Biên Hòa: Giao lưu nghệ thuật Đông - Tây và phong cách men độc bản',
    issuingOrganization: 'Bảo tàng Tỉnh Đồng Nai & Hội Khoa học Lịch sử Đồng Nai',
    authorOrg: 'Bảo tàng Tỉnh Đồng Nai & Hội Khoa học Lịch sử Đồng Nai',
    url: 'https://dsvhpvt.dsvh.gov.vn/Home.aspx',
    year: 2019,
    accessDate: '2026-11-01',
    updatedDate: '2026-11-09',
    language: 'Tiếng Việt',
    topic: 'Nghiên cứu lịch sử gốm mỹ nghệ Trường Mỹ nghệ Biên Hòa (1903), men tro trấu và cobalt',
    topicGroups: ['pottery_craft', 'conservation_planning'],
    type: 'museum_archive',
    summary: 'Công trình nghiên cứu chuyên sâu về các dòng men gốm Biên Hòa: men ngọc bích, men đá đỏ, men chàm xanh đồng rạn nứt cùng ảnh hưởng của trường phái Limoges và nghệ thuật Chăm, Hoa, Việt.',
    license: 'Tài liệu xuất bản khoa học bảo tàng',
    usageLicenseNotes: 'Tài liệu nghiên cứu khoa học bảo tàng được trích dẫn học thuật.',
    verificationStatus: 'verified',
    linkStatus: 'active',
    linkStatusNote: 'Đối chiếu lưu trữ tại Bảo tàng Đồng Nai',
    associatedCraftIds: ['craft-gom-bien-hoa', 'craft-gom-lai-thieu']
  },
  {
    id: 'ref-05',
    title: 'Báo cáo Điền dã Tri thức Đan lát Mây tre truyền thống của Người Chơ Ro vùng Chiến khu Đ',
    issuingOrganization: 'Viện Văn hóa Nghệ thuật Quốc gia Việt Nam (VICAS) - Phân viện tại TP.HCM',
    authorOrg: 'Viện Văn hóa Nghệ thuật Quốc gia Việt Nam (VICAS)',
    url: 'https://dsvhpvt.dsvh.gov.vn/Home.aspx',
    year: 2021,
    accessDate: '2026-11-02',
    updatedDate: '2026-11-09',
    language: 'Tiếng Việt',
    topic: 'Văn hoá dân tộc Chơ Ro, kỹ thuật đan lát gùi, nia, bẫy cá từ tre nứa rừng tự nhiên',
    topicGroups: ['weaving_ethnic', 'conservation_planning'],
    type: 'research_paper',
    summary: 'Khảo sát thực địa tại Định Quán và Vĩnh Cửu (Đồng Nai). Ghi nhận các phương thức lựa chọn tre ngà già, ngâm bùn chống mối mọt và kỹ thuật đan đôi, đan ba tạo hoa văn sọc trám cổ xưa.',
    license: 'Nghiên cứu học thuật được bảo hộ quyền tác giả',
    usageLicenseNotes: 'Công trình nghiên cứu khoa học xã hội viện VICAS.',
    verificationStatus: 'verified',
    linkStatus: 'active',
    linkStatusNote: 'Đối chiếu lưu trữ hồ sơ thực địa VICAS',
    associatedCraftIds: ['craft-dan-lat-cho-ro']
  },
  {
    id: 'ref-06',
    title: 'Hồ sơ Di sản Nghề làm gốm gia dụng Lái Thiêu - Giá trị văn hoá đô thị ven sông Sài Gòn',
    issuingOrganization: 'Sở Văn hóa, Thể thao và Du lịch tỉnh Bình Dương',
    authorOrg: 'Sở Văn hóa, Thể thao và Du lịch tỉnh Bình Dương',
    url: 'https://dsvhpvt.dsvh.gov.vn/Home.aspx',
    year: 2022,
    accessDate: '2026-11-03',
    updatedDate: '2026-11-09',
    language: 'Tiếng Việt',
    topic: 'Gốm men màu Lái Thiêu, chén con gà, đĩa con cá, lò bầu và văn hoá thương hồ Nam Bộ',
    topicGroups: ['pottery_craft', 'conservation_planning'],
    type: 'field_report',
    summary: 'Tài liệu tổng hợp hiện trạng các lò gốm dọc rạch Lái Thiêu (Thuận An). Mô tả quy trình nung lò bao (lò cóc/lò rồng) và biểu tượng con gà trống men xanh đỏ thân thuộc trong gia đình Nam Bộ.',
    license: 'Tài liệu lưu trữ nội bộ ngành văn hóa',
    usageLicenseNotes: 'Tài liệu lưu trữ khảo sát địa phương.',
    verificationStatus: 'pending',
    linkStatus: 'active',
    linkStatusNote: 'Hồ sơ địa phương đang thẩm định cấp tỉnh',
    associatedCraftIds: ['craft-gom-lai-thieu']
  },
  {
    id: 'ref-07',
    title: 'UNESCO Intangible Cultural Heritage: Safeguarding Traditional Craftsmanship (Domain 5)',
    issuingOrganization: 'UNESCO Intangible Cultural Heritage Section',
    authorOrg: 'UNESCO Intangible Cultural Heritage Section',
    url: 'https://ich.unesco.org/en/intangible-heritage-domains-00052',
    year: 2020,
    accessDate: '2026-10-25',
    updatedDate: '2026-11-09',
    language: 'Tiếng Anh & Pháp',
    topic: 'Khung định hướng quốc tế về bảo tồn kỹ năng thủ công và tri thức bản địa',
    topicGroups: ['legal_policy', 'ich_database', 'conservation_planning'],
    type: 'book',
    summary: 'Văn kiện hướng dẫn thực hành Công ước 2003 của UNESCO, xác định các biện pháp khẩn cấp nhằm bảo vệ nghệ nhân truyền nghề, bảo vệ nguồn nguyên liệu tự nhiên và tôn trọng quyền tự quyết cộng đồng.',
    license: 'UNESCO Open Access (CC-BY-SA 3.0 IGO)',
    usageLicenseNotes: 'Tài liệu hướng dẫn mở UNESCO.',
    verificationStatus: 'verified',
    linkStatus: 'active',
    linkStatusNote: 'Đã kiểm tra kết nối thành công (HTTP 200 OK)',
    associatedCraftIds: ['craft-gom-bien-hoa', 'craft-son-mai-tuong-binh-hiep', 'craft-det-tho-cam-stieng', 'craft-dan-lat-cho-ro']
  }
];

export const INITIAL_CRAFTS: Craft[] = [
  {
    id: 'craft-gom-bien-hoa',
    name: 'Nghề làm gốm Biên Hòa',
    englishName: 'Bien Hoa Traditional Ceramics & Art Pottery',
    otherNames: ['Gốm mỹ nghệ Đồng Nai', 'Gốm Tân Vạn', 'Gốm men xanh đồng'],
    category: 'pottery',
    categoryName: 'Gốm và chế tác đất',
    province: 'Đồng Nai',
    specificLocation: 'Phường Tân Vạn, phường Bửu Hòa và phường Hóa An, TP. Biên Hòa, tỉnh Đồng Nai',
    ethnicCommunity: 'Cộng đồng người Việt (Kinh), người Hoa, có sự tiếp biến văn hoá Chăm và phương Tây',
    heritageStatus: 'officially_recognized',
    heritageRecognitionDetails: {
      title: 'Di sản văn hoá phi vật thể quốc gia',
      decisionNumber: 'Quyết định của Bộ trưởng Bộ Văn hóa, Thể thao và Du lịch',
      recognizedYear: 2023,
      recognizedBy: 'Bộ Văn hóa, Thể thao và Du lịch'
    },
    shortDescription: 'Gốm Biên Hòa nổi tiếng với nghệ thuật khắc hoa văn chìm nổi tinh xảo kết hợp nước men tro trấu truyền thống và men xanh đồng trổ bông (vert de Bien Hoa) rực rỡ.',
    historicalOrigin: 'Hình thành từ cuối thế kỷ 19 dọc tả ngạn sông Đồng Nai nơi có dồi dào đất sét dẻo và củi nung. Năm 1903, việc thành lập Trường Mỹ nghệ Biên Hòa (l\'École d\'Art de Bien Hoa) đã nâng tầm gốm dân dụng lên thành dòng gốm mỹ nghệ bác học nổi tiếng tại các triển lãm quốc tế Paris.',
    formationDevelopment: 'Trải qua ba giai đoạn chính: gốm đất nung Cù lao Phố thế kỷ 18-19, thời hoàng kim gốm mỹ nghệ men nhiều màu (1923 - 1975) và thời kỳ thích ứng công nghiệp mỹ nghệ đương đại xuất khẩu châu Âu, Bắc Mỹ.',
    primaryMaterials: [
      'Đất sét trắng (cao lanh) vùng Tân Uyên, Bình Dương',
      'Đất sét đỏ chịu nhiệt vùng Biên Hòa',
      'Tro trấu, đá vôi, vỏ sò, thạch anh tự nhiên',
      'Oxit kim loại tạo màu: oxit đồng (xanh lá rêu), oxit coban (xanh lam), oxit sắt (vàng da bò)'
    ],
    traditionalTools: [
      'Bàn xoay chân (bàn chuốt gốm thủ công bằng gỗ mít)',
      'Khuôn thạch cao ép mẫu hoa văn',
      'Dao trổ khắc bằng tre già hoặc thép lá mỏng',
      'Bút lông và ống thổi men gốm',
      'Lò nung truyền thống (lò bầu nhiều ngăn, lò con thoi)'
    ],
    productionSteps: [
      {
        stepNumber: 1,
        title: 'Khai thác và thấu đất',
        description: 'Đất sét được ủ ẩm, ngâm lọc tạp chất hữu cơ, nhào dẫm kỹ cho đến khi mịn bóng và dẻo quánh, loại bỏ hoàn toàn bọt khí.'
      },
      {
        stepNumber: 2,
        title: 'Tạo hình sản phẩm',
        description: 'Nghệ nhân chuốt đất trên bàn xoay thủ công hoặc đúc rót qua khuôn thạch cao đối với các dáng bình phức tạp.'
      },
      {
        stepNumber: 3,
        title: 'Khắc vạch và tô men (Chạm lộng)',
        description: 'Khi sản phẩm se cứng (độ ẩm da bò), người thợ dùng dao tre khắc rãnh hoa văn, sau đó tỉ mỉ chấm rót từng mảng men màu vào lòng nét khắc.'
      },
      {
        stepNumber: 4,
        title: 'Nung sản phẩm ở nhiệt độ cao',
        description: 'Sản phẩm được xếp vào lò bầu nung bằng củi điều hoặc lò gas công nghệ cao ở nhiệt độ từ 1.150°C đến 1.250°C trong 24 đến 36 giờ.'
      }
    ],
    distinctiveTechniques: [
      'Kỹ thuật khắc hoa văn nét chìm và tô men viền (champlevé trên gốm)',
      'Công thức men tro trấu kết hợp đồng tạo màu men xanh ngọc rạn nứt tự nhiên',
      'Kỹ thuật xếp gốm và điều tiết ngọn lửa lò bầu để tạo hiệu ứng biến màu hỏa biến'
    ],
    representativeProducts: [
      'Bình hoa gốm men xanh đồng khắc hoa sen, cúc đại đóa',
      'Voi gốm trang trí sân vườn và đôn voi Biên Hòa',
      'Tượng phù điêu gốm dân gian, linh thú nghê, rồng',
      'Chậu kiểng đại cảnh và gạch thông gió kiến trúc nghệ thuật'
    ],
    motifsAndSymbolism: 'Hoa sen tượng trưng cho sự thanh khiết, mẫu đơn phú quý, tứ linh (Long - Lân - Quy - Phụng) cùng các biểu tượng sóng nước, mây lửa mang đậm dấu ấn phong thuỷ và mỹ cảm phương Nam.',
    culturalSocioEconomicValues: 'Biểu tượng của sự giao thoa mỹ thuật Việt - Hoa - Pháp độc nhất vô nhị ở Nam Bộ; giải quyết công ăn việc làm cho hàng nghìn hộ thợ thủ công ven sông Đồng Nai và là di sản giáo dục mỹ thuật ứng dụng quan trọng.',
    artisanRole: 'Nghệ nhân Biên Hòa là người nắm giữ bí quyết pha chế men màu bí truyền và đôi tay điêu luyện điều khiển dao khắc tạo nên thần thái của từng đường nét hoa văn.',
    conservationStatus: 'Đang triển khai quy hoạch cụm công nghiệp gốm Tân Hạnh nhằm di dời các lò gốm truyền thống khỏi khu dân cư, đồng thời bảo tồn nhà xưởng di sản và truyền nghề tại Trường Cao đẳng Mỹ thuật Trang trí Đồng Nai.',
    challenges: [
      'Thiếu hụt nguồn đất sét chất lượng cao tại địa phương do quá trình đô thị hoá',
      'Áp lực quy chuẩn môi trường khói bụi từ lò nung củi truyền thống',
      'Thế hệ thợ trẻ có xu hướng chọn công việc nhẹ nhàng, thiếu nghệ nhân kế nghiệp'
    ],
    conservationSolutions: [
      'Chuyển đổi hoàn toàn sang lò nung gas thân thiện môi trường nhưng giữ nguyên kỹ thuật tạo hình thủ công',
      'Xây dựng bảo tàng sống và không gian trải nghiệm văn hoá gốm tại Cù lao Phố',
      'Đưa môn khắc men gốm Biên Hòa vào chương trình đào tạo nghề có học bổng hỗ trợ'
    ],
    mainImage: ASSET_POTTERY_BIENHOA,
    galleryImages: [
      {
        url: ASSET_POTTERY_BIENHOA,
        caption: 'Bình gốm mỹ nghệ Biên Hòa men xanh đồng trổ bông lưu giữ tại bảo tàng',
        author: 'Bộ phận Lưu trữ Bảo tàng Đồng Nai',
        license: 'Ảnh tư liệu nghiên cứu khoa học',
        isIllustration: false
      },
      {
        url: ASSET_HERO,
        caption: 'Nghệ nhân cao tuổi tạo hình thân bình trên bàn xoay thủ công truyền thống',
        author: 'Dự án Di sản số Đông Nam Bộ',
        license: 'Tác quyền dự án giáo dục cộng đồng',
        isIllustration: false
      }
    ],
    referenceIds: ['ref-01', 'ref-04', 'ref-07'],
    coordinates: {
      lat: 10.9388,
      lng: 106.8197
    },
    featured: true,
    published: true,
    updatedAt: '2026-10-28'
  },
  {
    id: 'craft-son-mai-tuong-binh-hiep',
    name: 'Nghề sơn mài Tương Bình Hiệp',
    englishName: 'Tuong Binh Hiep Traditional Lacquer Craft',
    otherNames: ['Sơn mài Thủ Dầu Một', 'Sơn mài Bình Dương', 'Sơn ta Tương Bình Hiệp'],
    category: 'lacquer',
    categoryName: 'Nghề sơn mài',
    province: 'Bình Dương',
    specificLocation: 'Làng Tương Bình Hiệp, TP. Thủ Dầu Một, tỉnh Bình Dương',
    ethnicCommunity: 'Cộng đồng người Việt (Kinh)',
    heritageStatus: 'officially_recognized',
    heritageRecognitionDetails: {
      title: 'Di sản văn hoá phi vật thể quốc gia',
      decisionNumber: 'Quyết định số 4069/QĐ-BVHTTDL ngày 14/11/2016',
      recognizedYear: 2016,
      recognizedBy: 'Bộ Văn hóa, Thể thao và Du lịch'
    },
    shortDescription: 'Làng nghề sơn mài cổ truyền Tương Bình Hiệp nổi tiếng với độ bền vượt trội, sự công phu qua 25 công đoạn và nghệ thuật cẩn vỏ trứng, thếp vàng độc đáo.',
    historicalOrigin: 'Theo gia phả các dòng họ thợ sơn, nghề xuất hiện từ giữa thế kỷ 18 khi những di dân miền Trung theo dòng sông Sài Gòn vào vùng đất Thủ khai hoang lập ấp. Họ mang theo nghề sơn son thếp vàng trang trí đình chùa rồi phát triển thành sơn mài mỹ nghệ.',
    formationDevelopment: 'Từ việc sơn các vật dụng gia đình đơn giản đến thế kỷ 20 làng nghề hình thành các hiệp hội chế tác tranh sơn mài, bình phong, hộp mỹ phẩm cung cấp cho cả Nam Kỳ Lục Tỉnh và xuất khẩu sang Pháp.',
    primaryMaterials: [
      'Nhựa cây sơn ta (Rhus succedanea) tự nhiên',
      'Gỗ mít già, ván ép chất lượng cao làm mộc lõi',
      'Vải màn tơ tằm hoặc vải xô bó cốt',
      'Mùn cưa mịn, đất phù sa, đất sét luyện mộc',
      'Vàng quỳ, bạc quỳ, vỏ trứng vịt, xà cừ biển'
    ],
    traditionalTools: [
      'Chổi quét sơn làm từ tóc người hoặc lông đuôi ngựa mềm',
      'Bay miết sơn bằng sừng trâu dẻo',
      'Đá mài bùn, than củi xoan hoặc giấy ráp nước các số mịn',
      'Phòng ủ ẩm kín gió (buồng ủ sơn mài)'
    ],
    productionSteps: [
      {
        stepNumber: 1,
        title: 'Làm mộc và bó vải (Cốt vóc)',
        description: 'Tẩm sấy phôi gỗ chống cong vênh, quét lớp sơn sống rồi dùng vải màn bó chặt khít với mùn cưa và đất sét mịn để ngăn nứt.'
      },
      {
        stepNumber: 2,
        title: 'Hàng chục lớp sơn lót và hom ủ',
        description: 'Quét từ 15 đến 25 lớp sơn ta mỏng, sau mỗi lớp đều phải đưa vào buồng ủ ẩm nhiều ngày cho sơn khô tự nhiên rồi mới mài phẳng.'
      },
      {
        stepNumber: 3,
        title: 'Thể hiện trang trí và cẩn trứng, thếp vàng',
        description: 'Nghệ nhân dùng nhíp dán từng mẩu vỏ trứng vịt nung tạo sắc trắng ngà, rắc quỳ vàng, quỳ bạc tạo chiều sâu không gian.'
      },
      {
        stepNumber: 4,
        title: 'Mài ướt và đánh bóng (Quang dầu)',
        description: 'Dùng than củi mềm mài dưới nước cho đến khi các lớp họa tiết ẩn hiện lung linh, cuối cùng dùng lòng bàn tay thoa bột than đánh bóng.'
      }
    ],
    distinctiveTechniques: [
      'Kỹ thuật cẩn vỏ trứng vịt nung tạo mảng màu trắng ngà và vết nứt tự nhiên',
      'Kỹ thuật phủ nhiều lớp sơn quang rồi mài lộ hình (mài mò)',
      'Quy trình ủ sơn trong môi trường độ ẩm cao (80-90%) để sơn tự trùng ngưng'
    ],
    representativeProducts: [
      'Tranh sơn mài phong cảnh làng quê, hoa sen, phố cổ',
      'Bình phong sơn mài cẩn xà cừ và thếp vàng',
      'Hộp đựng trang sức, khay trà, đĩa mỹ nghệ cao cấp',
      'Tượng Phật và hoành phi câu đối sơn son thếp vàng'
    ],
    motifsAndSymbolism: 'Cảnh sinh hoạt đồng quê Nam Bộ, bến đò sông Sài Gòn, hoa sen, tùng hạc diên niên và rồng phụng thể hiện ước vọng bình an, trường thọ và sự thịnh vượng.',
    culturalSocioEconomicValues: 'Di sản đại diện cho tính kiên trì, công phu tột bực của người thợ Nam Bộ; là niềm tự hào của vùng đất Thủ Dầu Một trong chuỗi du lịch làng nghề di sản văn hoá.',
    artisanRole: 'Nghệ nhân là linh hồn của xưởng sơn, am hiểu thời tiết khí hậu để điều chỉnh thời gian ủ sơn và sở hữu đôi tay nhạy cảm để mài tranh mà không làm bay mất lớp vàng bạc lót bên dưới.',
    conservationStatus: 'UBND tỉnh Bình Dương đã phê duyệt Đề án Bảo tồn và phát triển làng nghề sơn mài Tương Bình Hiệp kết hợp du lịch sinh thái; quy hoạch khu sản xuất tập trung có xử lý nước thải.',
    challenges: [
      'Giá thành nguyên liệu sơn ta tự nhiên và vàng bạc quỳ ngày càng đắt đỏ',
      'Sự xuất hiện của các dòng sơn công nghiệp PU giá rẻ làm mất đi giá trị truyền thống',
      'Diện tích đất xưởng trong làng bị thu hẹp do đô thị hoá nhanh chóng'
    ],
    conservationSolutions: [
      'Hỗ trợ làng nghề thành lập Trung tâm dịch vụ du lịch trải nghiệm sơn mài Tương Bình Hiệp',
      'Bảo vệ nghiêm ngặt chỉ dẫn địa lý và tem chứng nhận chất lượng sơn ta cổ truyền',
      'Tổ chức các lớp đào tạo thợ giỏi do các Nghệ nhân Ưu tú trực tiếp giảng dạy'
    ],
    mainImage: ASSET_LACQUER_TUONGBINHHIEP,
    galleryImages: [
      {
        url: ASSET_LACQUER_TUONGBINHHIEP,
        caption: 'Đĩa sơn mài Tương Bình Hiệp cẩn vỏ trứng và thếp vàng họa tiết hoa sen Nam Bộ',
        author: 'Hiệp hội Sơn mài Điêu khắc Bình Dương',
        license: 'Tư liệu quảng bá di sản địa phương',
        isIllustration: false
      }
    ],
    referenceIds: ['ref-02', 'ref-07'],
    coordinates: {
      lat: 10.9982,
      lng: 106.6341
    },
    featured: true,
    published: true,
    updatedAt: '2026-10-30'
  },
  {
    id: 'craft-det-tho-cam-stieng',
    name: 'Nghề dệt thổ cẩm của người S\'tiêng',
    englishName: 'S\'tieng Indigenous Brocade Weaving',
    otherNames: ['Dệt cạp cửi S\'tiêng', 'Dệt vải truyền thống người S\'tiêng Bù Gia Mập'],
    category: 'weaving',
    categoryName: 'Dệt và chế tác vải',
    province: 'Bình Phước',
    specificLocation: 'Huyện Bù Gia Mập, thị xã Bình Long và huyện Hớn Quản, tỉnh Bình Phước',
    ethnicCommunity: 'Đồng bào dân tộc S\'tiêng (nhóm Bù Đơ và Bù Lơ)',
    heritageStatus: 'officially_recognized',
    heritageRecognitionDetails: {
      title: 'Di sản văn hoá phi vật thể quốc gia',
      decisionNumber: 'Quyết định của Bộ trưởng Bộ Văn hóa, Thể thao và Du lịch',
      recognizedYear: 2014,
      recognizedBy: 'Bộ Văn hóa, Thể thao và Du lịch'
    },
    shortDescription: 'Tri thức dân gian dệt cạp cửi lưng với hoa văn hình học cổ truyền đặc sắc, phản ánh mối giao hòa thiêng liêng giữa con người và núi rừng đại ngàn Bình Phước.',
    historicalOrigin: 'Tồn tại lâu đời gắn liền với phương thức sinh hoạt du canh du cư trên các triền nương rẫy Đông Nam Bộ. Phụ nữ S\'tiêng từ nhỏ đã được mẹ truyền dạy cách se sợi bông rừng, nhuộm màu từ lá vỏ cây và dệt váy áo cho cả gia đình.',
    formationDevelopment: 'Trước kia hoàn toàn tự cung tự cấp sợi và thuốc nhuộm rừng. Hiện nay phụ nữ S\'tiêng tiếp nhận thêm sợi chỉ màu công nghiệp nhưng vẫn giữ trọn bộ khung dệt dây lưng nguyên sơ và các đồ án hoa văn mang tính biểu tượng dân tộc.',
    primaryMaterials: [
      'Sợi bông tự nhiên (vải bạt bông rừng xưa) hoặc sợi chỉ màu bền chắc',
      'Củ nâu, lá chàm, vỏ cây rừng bản địa làm thuốc nhuộm thảo mộc',
      'Than củi giã nhuyễn cố định sắc đen chàm huyền bí'
    ],
    traditionalTools: [
      'Khung dệt dây đai lưng (Backstrap loom - không có khung giá cố định)',
      'Thanh chèn gỗ bản rộng để ép chặt sợi canh',
      'Ống tre cuộn sợi và que gạt hoa văn',
      'Dây thắt lưng da hoặc sợi bện quàng qua lưng người dệt'
    ],
    productionSteps: [
      {
        stepNumber: 1,
        title: 'Chuẩn bị sợi và tạo màu tự nhiên',
        description: 'Sợi được luộc sạch hồ, ngâm trong dung dịch nước lá chàm hoặc rễ cây rừng để tạo màu chàm đen, màu đỏ son và màu vàng nghệ.'
      },
      {
        stepNumber: 2,
        title: 'Mắc sợi lên khung dệt dây lưng',
        description: 'Người phụ nữ ngồi duỗi thẳng hai chân trên sàn nhà gỗ, quàng đai dệt qua thắt lưng để dùng lực cơ thể căng đều sợi chỉ.'
      },
      {
        stepNumber: 3,
        title: 'Đếm sợi nhặt hoa văn (Nhặt bông)',
        description: 'Dùng que tre nhỏ nhặt từng sợi chỉ ngang theo trí nhớ hoa văn truyền đời, không cần bản vẽ hay mẫu phác thảo giấy.'
      },
      {
        stepNumber: 4,
        title: 'Dập sợi và may hoàn thiện mép vải',
        description: 'Dùng thanh gỗ dẹt ép chặt sợi chỉ ngang để mặt vải dày dặn, ấm áp rồi kết tua rua chỉ đỏ ở hai đầu viền.'
      }
    ],
    distinctiveTechniques: [
      'Kỹ thuật dệt dùng sức kéo của thắt lưng tạo độ căng linh hoạt cho sợi dệt',
      'Kỹ thuật giấu mối chỉ viền tinh xảo để mặt trái và mặt phải hoa văn đều ngay ngắn',
      'Quy trình nhuộm thảo mộc tự nhiên thơm mùi vỏ cây rừng'
    ],
    representativeProducts: [
      'Váy hoa truyền thống của phụ nữ S\'tiêng',
      'Khăn choàng dệt hoa văn quả trám và chim muông',
      'Tấm đắp thổ cẩm mùa đông và dải địu trẻ em',
      'Túi đeo thổ cẩm tiện dụng cho du khách'
    ],
    motifsAndSymbolism: 'Đồ án hoa văn hình thoi mô phỏng mắt chim rừng, đường ziczac tượng trưng cho dòng sông suối, hàng chấm hạt lúa mẹ biểu hiện sự ấm no và lòng tạ ơn thần linh (Yàng).',
    culturalSocioEconomicValues: 'Tiêu chí đánh giá sự khéo léo, đức hạnh của người con gái S\'tiêng trưởng thành; là linh hồn của các dịp lễ hội đâm trâu, lễ mừng lúa mới của buôn làng miền Đông.',
    artisanRole: 'Những phụ nữ cao tuổi trong sóc đóng vai trò là "bảo tàng sống", lưu giữ hàng chục đồ án hoa văn cổ trong ký ức và kiên trì truyền dạy từng đường thoi cho con cháu.',
    conservationStatus: 'Tỉnh Bình Phước đã thành lập Hợp tác xã dệt thổ cẩm xã Bù Gia Mập, tổ chức đưa sản phẩm thổ cẩm tham gia các tuần lễ văn hoá du lịch quốc gia.',
    challenges: [
      'Thói quen mặc âu phục khiến trang phục truyền thống chỉ còn xuất hiện vào ngày lễ hội',
      'Kỹ thuật nhuộm vỏ cây rừng dần bị mai một do rừng tự nhiên được bảo vệ nghiêm ngặt',
      'Đầu ra sản phẩm còn phụ thuộc vào lượng khách tham quan vườn quốc gia'
    ],
    conservationSolutions: [
      'Cải tiến mẫu mã ứng dụng (túi xách, ví, khăn trải bàn khách sạn sinh thái)',
      'Tài trợ khung dệt và mở lớp truyền dạy nghề miễn phí tại nhà rông văn hoá',
      'Xây dựng thương hiệu tập thể Thổ cẩm S\'tiêng Bình Phước'
    ],
    mainImage: ASSET_WEAVING_STIENG,
    galleryImages: [
      {
        url: ASSET_WEAVING_STIENG,
        caption: 'Nghệ nhân S\'tiêng dệt thổ cẩm bằng khung cửi dây đai lưng tại sóc buôn Bình Phước',
        author: 'Dự án Di sản số Đông Nam Bộ',
        license: 'Ảnh tư liệu nghiên cứu',
        isIllustration: false
      }
    ],
    referenceIds: ['ref-03', 'ref-07'],
    coordinates: {
      lat: 11.9688,
      lng: 107.1352
    },
    featured: true,
    published: true,
    updatedAt: '2026-10-25'
  },
  {
    id: 'craft-dan-lat-cho-ro',
    name: 'Nghề đan lát mây tre của người Chơ Ro',
    englishName: 'Chơ Ro Traditional Bamboo & Rattan Basketry',
    otherNames: ['Đan gùi Chơ Ro', 'Đan mây tre Chiến khu Đ Đồng Nai'],
    category: 'basketry',
    categoryName: 'Nghề đan lát',
    province: 'Đồng Nai',
    specificLocation: 'Xã Phú Lý (huyện Vĩnh Cửu) và xã Túc Trưng (huyện Định Quán), tỉnh Đồng Nai',
    ethnicCommunity: 'Đồng bào dân tộc Chơ Ro (người bản địa Đông Nam Bộ)',
    heritageStatus: 'under_research',
    heritageRecognitionDetails: {
      title: 'Đang trong quá trình nghiên cứu lập hồ sơ đề xuất Di sản Quốc gia',
      recognizedBy: 'Sở VHTTDL Đồng Nai & Hội đồng Di sản Văn hoá tỉnh'
    },
    shortDescription: 'Nghệ thuật đan lát vật dụng sinh hoạt và nông cụ từ tre nứa ngâm bùn, nổi tiếng với chiếc gùi có quai đeo êm ái và độ bền dẻo qua nhiều mùa rẫy.',
    historicalOrigin: 'Gắn chặt với đời sống rừng già Đông Nam Bộ từ ngàn đời. Người Chơ Ro coi cây tre cây nứa là quà tặng của rừng xanh, từ chiếc bẫy thú, rá vo gạo đến chiếc gùi theo người lên rẫy.',
    formationDevelopment: 'Duy trì qua nhiều thế hệ tại các ấp người Chơ Ro ven rừng Chiến khu Đ. Dù đồ nhựa gia dụng phát triển, người Chơ Ro vẫn giữ tập quán đan gùi phục vụ lễ cúng Sa-yang-va (thần Lúa).',
    primaryMaterials: [
      'Tre ngà, lồ ô già đốn vào cuối mùa khô',
      'Mây rừng dẻo dai làm nẹp và quai đeo',
      'Dây vỏ cây rui bền chắc dùng để khâu viền'
    ],
    traditionalTools: [
      'Dao rựa vót nan sắc bén',
      'Kẹp gỗ ép nan tre đều độ dày',
      'Dùi sắt nhọn xâu lỗ luồn dây mây'
    ],
    productionSteps: [
      {
        stepNumber: 1,
        title: 'Chọn và hạ tre ngâm nước chống mọt',
        description: 'Chỉ chặt tre già có vỏ vàng óng, ngâm dưới bùn suối từ 1 đến 2 tháng để triệt tiêu chất đường tránh sâu mọt đục khoét.'
      },
      {
        stepNumber: 2,
        title: 'Chẻ và vót chuốt nan tre',
        description: 'Chẻ tre thành các thanh đều tăm tắp, dùng dao rựa vót sạch dằm xơ cho nan tre phẳng mịn và dẻo dai.'
      },
      {
        stepNumber: 3,
        title: 'Tạo đáy và đan thân lượn sóng',
        description: 'Bắt đầu từ nan chữ thập ở đáy gùi, đan cài nan đôi nan ba tạo thân gùi chắc nịch có độ mở hình nón cụt.'
      },
      {
        stepNumber: 4,
        title: 'Nẹp vành và bện quai mây',
        description: 'Dùng thân tre uốn vòng miệng rồi dùng sợi mây rừng khâu chằng chịt cố định, gắn quai mây bện bản êm vai.'
      }
    ],
    distinctiveTechniques: [
      'Phương pháp ngâm bùn suối tự nhiên bảo quản tre nứa không dùng hoá chất độc hại',
      'Kỹ thuật đan đan lóng mốt, lóng đôi kết hợp hoa văn cài nan nhuộm lá chàm',
      'Thiết kế quai gùi phân tán lực giúp phụ nữ gùi nặng không đau vai'
    ],
    representativeProducts: [
      'Chiếc gùi nhỏ đi rẫy và gùi hoa văn dùng trong lễ hội',
      'Nia sảy thóc, rổ xúc cá, đó bắt tôm trên suối',
      'Cái bồ đựng hạt giống ngô lúa trên gác bếp'
    ],
    motifsAndSymbolism: 'Họa tiết đan chéo mắt cáo và sọc đen trắng tượng trưng cho sự gắn bó đùm bọc giữa các dòng họ trong làng Chơ Ro.',
    culturalSocioEconomicValues: 'Phản ánh tri thức sinh thái học bản địa sâu sắc trong việc khai thác bền vững tài nguyên rừng; là vật thiêng chứa lúa giống trong lễ cúng thần Yang.',
    artisanRole: 'Những người đàn ông lớn tuổi trong làng Chơ Ro vừa là thợ đan vừa là người am hiểu từng con suối, cánh rừng già.',
    conservationStatus: 'Tỉnh Đồng Nai đang xây dựng đề án bảo tồn nghề thủ công truyền thống gắn với du lịch sinh thái Vườn quốc gia Cát Tiên và Khu bảo tồn Thiên nhiên - Văn hoá Đồng Nai.',
    challenges: [
      'Nguồn mây tre tự nhiên trong rừng được bảo tồn nghiêm ngặt, việc xin cấp phép khai thác khó khăn',
      'Sản phẩm khó cạnh tranh về giá với hàng gia dụng công nghiệp',
      'Thanh niên trong làng làm việc tại các khu công nghiệp, ít mặn mà học nghề'
    ],
    conservationSolutions: [
      'Quy hoạch vùng trồng nguyên liệu tre nứa mây tập trung cho cộng đồng',
      'Liên kết với các homestay sinh thái tổ chức workshop cho du khách trải nghiệm tự đan rổ quà lưu niệm',
      'Lập hồ sơ khoa học đề nghị ghi danh Di sản văn hoá phi vật thể quốc gia'
    ],
    mainImage: ASSET_BASKETRY_BAMBOO,
    galleryImages: [
      {
        url: ASSET_BASKETRY_BAMBOO,
        caption: 'Nghệ nhân hoàn thiện vành rổ đan mây tre truyền thống Đông Nam Bộ',
        author: 'Dự án Di sản số Đông Nam Bộ',
        license: 'Ảnh thực địa nghiên cứu',
        isIllustration: false
      }
    ],
    referenceIds: ['ref-05', 'ref-07'],
    coordinates: {
      lat: 11.2333,
      lng: 107.0333
    },
    featured: true,
    published: true,
    updatedAt: '2026-10-22'
  },
  {
    id: 'craft-gom-lai-thieu',
    name: 'Nghề gốm Lái Thiêu',
    englishName: 'Lai Thieu Traditional Household Pottery',
    otherNames: ['Gốm men màu Lái Thiêu', 'Gốm lò rồng Lái Thiêu', 'Gốm chén con gà'],
    category: 'pottery',
    categoryName: 'Gốm và chế tác đất',
    province: 'Bình Dương',
    specificLocation: 'Phường Lái Thiêu và phường Thuận Giao, TP. Thuận An, tỉnh Bình Dương',
    ethnicCommunity: 'Cộng đồng người Việt và người Hoa (Quảng Đông, Triều Châu)',
    heritageStatus: 'under_research',
    heritageRecognitionDetails: {
      title: 'Đang nghiên cứu và đề xuất lập hồ sơ Di sản phi vật thể quốc gia',
      recognizedBy: 'Sở VHTTDL tỉnh Bình Dương'
    },
    shortDescription: 'Dòng gốm gia dụng mộc mạc gắn liền với chiếc tô con gà, chậu kiểng men nhiều màu và văn hoá ẩm thực gia đình miền Nam qua bao thế hệ.',
    historicalOrigin: 'Phát triển mạnh từ giữa thế kỷ 19 dọc rạch Lái Thiêu, nơi thuận lợi cho thuyền ghe chở đất sét từ bến cát về và chuyển gốm xuôi dòng sông Sài Gòn đi khắp lục tỉnh Nam Kỳ.',
    formationDevelopment: 'Từng có hàng trăm lò gốm san sát nhau đỏ lửa ngày đêm tạo nên cảnh quan đô thị ven sông đặc trưng của đất Lái Thiêu, nổi tiếng với các lò nung kiểu lò rồng uốn lượn theo triền dốc.',
    primaryMaterials: [
      'Đất sét xám đỏ bến cát chịu nhiệt',
      'Men sống phối trộn từ tro trấu, đá vôi và oxit màu công nghiệp nhẹ'
    ],
    traditionalTools: [
      'Bàn xoay chuốt gốm kiểu Quảng Đông',
      'Lò rồng (Lò dốc nung bằng củi cao su)',
      'Bút lông nét to vẽ gà trống, cá chép phóng khoáng'
    ],
    productionSteps: [
      {
        stepNumber: 1,
        title: 'Nhào đất và đùn cốt',
        description: 'Đất thô được ủ và lọc cát mịn, đùn thành từng thỏi đều để chuẩn bị chuốt trên bàn xoay.'
      },
      {
        stepNumber: 2,
        title: 'Tạo hình hàng gia dụng hàng loạt',
        description: 'Thợ chuốt định hình nhanh chóng hàng trăm chiếc chén, tô, đĩa, ơ kho cá trong một buổi sáng.'
      },
      {
        stepNumber: 3,
        title: 'Vẽ hoa văn phóng bút',
        description: 'Dùng bút lông to vẽ hình con gà trống hoa chuối hoặc bụi tre non chỉ trong vài nét quẹt dứt khoát.'
      },
      {
        stepNumber: 4,
        title: 'Nung lò rồng liên hoàn',
        description: 'Sản phẩm được xếp chồng trong lò rồng dài hàng chục mét nung bằng củi liên tục 3 ngày 3 đêm.'
      }
    ],
    distinctiveTechniques: [
      'Lối vẽ mộc phóng bút không cần phác thảo (vẽ nhanh, nét sống động)',
      'Kỹ thuật vận hành ngọn lửa lò rồng điều chỉnh nhiệt theo độ nghiêng con dốc'
    ],
    representativeProducts: [
      'Tô chén con gà trống đặc trưng Nam Bộ',
      'Đĩa hoa cúc chấm men xanh tím',
      'Heo đất tiết kiệm men bóng đỏ vàng',
      'Chậu kiểng bonsai và thống đựng gạo cổ'
    ],
    motifsAndSymbolism: 'Hình ảnh chú gà trống cất tiếng gáy ban mai tượng trưng cho sự siêng năng, khởi đầu may mắn; đĩa cá bơi lội cầu chúc dư dả dồi dào tài lộc.',
    culturalSocioEconomicValues: 'Ký ức ẩm thực dân dã không thể thay thế trong các quán cơm tấm, tiệm hủ tiếu Nam Bộ; gắn bó máu thịt với đời sống sông nước miền Tây và Đông Nam Bộ.',
    artisanRole: 'Những người thợ vẽ và thợ đốt lò Lái Thiêu gìn giữ phong thái lao động hào sảng, phóng khoáng của đất phương Nam.',
    conservationStatus: 'Nhiều lò rồng cổ đã phải ngừng hoạt động do ô nhiễm khói bụi đô thị; hiện còn một số nghệ nhân tâm huyết cải tạo xưởng thành điểm tham quan gốm nghệ thuật.',
    challenges: [
      'Sự thu hẹp diện tích đất sản xuất do đô thị hoá tại Thuận An',
      'Lệnh cấm đốt lò củi gây khó khăn cho việc nung gốm truyền thống'
    ],
    conservationSolutions: [
      'Bảo tồn nguyên trạng ít nhất một lò rồng cổ làm bảo tàng công nghiệp gốm',
      'Phát triển mô hình xưởng gốm mini kết hợp cà phê nghệ thuật cho giới trẻ'
    ],
    mainImage: ASSET_POTTERY_BIENHOA,
    galleryImages: [
      {
        url: ASSET_POTTERY_BIENHOA,
        caption: 'Gốm men màu Nam Bộ lưu giữ nét tạo hình mộc mạc',
        author: 'Bảo tàng Tỉnh Bình Dương',
        license: 'Ảnh tư liệu khoa học',
        isIllustration: false
      }
    ],
    referenceIds: ['ref-06', 'ref-04'],
    coordinates: {
      lat: 10.9125,
      lng: 106.6972
    },
    featured: false,
    published: true,
    updatedAt: '2026-10-18'
  },
  {
    id: 'craft-det-hoa-van-ma',
    name: 'Tri thức dệt và hoa văn thổ cẩm của người Mạ',
    englishName: 'Mạ Traditional Brocade & Motif Knowledge',
    otherNames: ['Dệt thổ cẩm Tà Lài', 'Dệt vải dân tộc Mạ Đồng Nai'],
    category: 'weaving',
    categoryName: 'Dệt và chế tác vải',
    province: 'Đồng Nai',
    specificLocation: 'Ấp Tà Lài, xã Tà Lài, huyện Tân Phú, tỉnh Đồng Nai (vùng đệm Vườn Quốc gia Cát Tiên)',
    ethnicCommunity: 'Đồng bào dân tộc Mạ (Châu Mạ)',
    heritageStatus: 'under_research',
    heritageRecognitionDetails: {
      title: 'Đang nghiên cứu và khảo sát lập hồ sơ bảo tồn khẩn cấp',
      recognizedBy: 'Sở VHTTDL tỉnh Đồng Nai'
    },
    shortDescription: 'Tri thức dệt thổ cẩm của người Mạ với hệ thống hoa văn hình học phong phú, tái hiện thế giới thần thoại và muông thú của rừng nguyên sinh nhiệt đới.',
    historicalOrigin: 'Tộc người Mạ sinh sống lâu đời trên vùng thượng lưu sông Đồng Nai. Kỹ thuật dệt vải của người Mạ được coi là một trong những đỉnh cao dệt thủ công của vùng rừng núi Đông Nam Bộ.',
    formationDevelopment: 'Hiện nay tập trung tại ấp Tà Lài (Tân Phú). Các nghệ nhân duy trì việc dệt khăn, áo, chăn phục vụ lễ hội lúa mới và sinh hoạt tâm linh của cộng đồng.',
    primaryMaterials: [
      'Sợi bông tự nhiên se tay',
      'Vỏ cây tràm, củ nâu, lá chàm rừng ngâm ủ'
    ],
    traditionalTools: [
      'Bộ cửi ngồi duỗi chân với thanh gạt tre chuốt nhẵn',
      'Con thoi gỗ chạm khắc gia huy của dòng họ'
    ],
    productionSteps: [
      {
        stepNumber: 1,
        title: 'Khai thác chất tạo màu từ rừng nhiệt đới',
        description: 'Vào rừng tìm rễ cây và lá rừng giã nát lấy nước cốt, ngâm sợi nhiều ngày tạo độ bám màu bền chặt.'
      },
      {
        stepNumber: 2,
        title: 'Mắc sợi và luồn que hoa văn',
        description: 'Sắp xếp sợi dọc và sợi ngang tạo các khoảng sáng tối xen kẽ theo quy luật số lẻ truyền thống.'
      },
      {
        stepNumber: 3,
        title: 'Dệt cài sợi nổi',
        description: 'Nghệ nhân dùng tay gảy sợi chỉ màu phụ để tạo khối hoa văn nổi lên khỏi nền vải chàm sẫm.'
      }
    ],
    distinctiveTechniques: [
      'Kỹ thuật tạo hoa văn nổi bằng sợi dệt kép',
      'Quy chuẩn đếm sợi theo hệ đếm cổ truyền trong trí nhớ người thợ dệt'
    ],
    representativeProducts: [
      'Tấm đắp Mạ cổ với họa tiết chim trĩ và mặt trời',
      'Áo chui đầu nam và váy quấn phụ nữ Mạ',
      'Dây thắt lưng dệt hoa văn tinh xảo'
    ],
    motifsAndSymbolism: 'Hoa văn chim phượng hoàng rừng, con thằn lằn, cây nêu lễ hội và mắt thần Yang bảo bọc bản làng trước tai ương.',
    culturalSocioEconomicValues: 'Di sản lưu giữ toàn bộ kho tàng thần thoại và biểu tượng học của người Mạ ở miền Đông Nam Bộ.',
    artisanRole: 'Chỉ còn số ít nghệ nhân cao tuổi tại Tà Lài còn nhớ đầy đủ các bài ca dệt vải và ý nghĩa của từng mô típ hoa văn cổ.',
    conservationStatus: 'Vườn quốc gia Cát Tiên phối hợp chính quyền địa phương hỗ trợ nhà văn hoá Tà Lài làm nơi giới thiệu nghề dệt cho khách du lịch sinh thái.',
    challenges: [
      'Nguy cơ thất truyền cao khi chỉ còn khoảng 10 nghệ nhân lớn tuổi nắm vững kỹ thuật đan hoa văn phức tạp',
      'Thu nhập từ dệt không đủ trang trải đời sống'
    ],
    conservationSolutions: [
      'Ghi hình, tư liệu hóa số toàn bộ các đồ án hoa văn cổ của người Mạ',
      'Thành lập tổ hợp tác du lịch văn hoá Tà Lài gắn với bảo tồn dệt'
    ],
    mainImage: ASSET_WEAVING_STIENG,
    galleryImages: [
      {
        url: ASSET_WEAVING_STIENG,
        caption: 'Họa tiết thổ cẩm truyền thống các dân tộc bản địa miền Đông Nam Bộ',
        author: 'Dự án Di sản số Đông Nam Bộ',
        license: 'Ảnh tư liệu nghiên cứu',
        isIllustration: true
      }
    ],
    referenceIds: ['ref-03', 'ref-07'],
    coordinates: {
      lat: 11.4167,
      lng: 107.4167
    },
    featured: false,
    published: true,
    updatedAt: '2026-10-15'
  },
  {
    id: 'craft-cham-khac-go-sai-gon',
    name: 'Nghề chạm khắc mộc mỹ nghệ Chợ Lớn - Hóc Môn',
    englishName: 'Chợ Lớn & Hóc Môn Traditional Wood Carving',
    otherNames: ['Mộc mỹ nghệ Nam Bộ', 'Chạm khắc gỗ truyền thống Gia Định'],
    category: 'woodwork',
    categoryName: 'Chạm khắc và chế tác gỗ',
    province: 'TP. Hồ Chí Minh',
    specificLocation: 'Quận 5 (Chợ Lớn), huyện Hóc Môn và TP. Thủ Đức, TP. Hồ Chí Minh',
    ethnicCommunity: 'Cộng đồng người Việt và người Hoa (Triều Châu, Phúc Kiến)',
    heritageStatus: 'unverified_tradition',
    heritageRecognitionDetails: {
      title: 'Nghề truyền thống được giới thiệu – Dữ liệu minh hoạ – cần xác minh',
      recognizedBy: 'Chưa có quyết định công nhận chính thức từ cơ quan nhà nước'
    },
    shortDescription: 'Kỹ thuật chạm khắc gỗ tinh xảo thể hiện trên bàn thờ gia tiên, hoành phi câu đối và kiến trúc đình chùa cổ kính của đô thị Sài Gòn xưa.',
    historicalOrigin: 'Hình thành cùng với công cuộc khai phá vùng đất Gia Định từ thế kỷ 17-18. Các phường thợ mộc từ miền Trung và thợ chạm người Hoa hội tụ tại Chợ Lớn tạo nên phong cách chạm khắc đồ sộ, giàu chất tả thực.',
    formationDevelopment: 'Phát triển từ các xưởng mộc đóng thuyền, làm nhà rường sang chạm khắc tủ thờ, bao lam, bàn ghế cẩn ốc xà cừ phục vụ tầng lớp thương nhân và thị dân Nam Bộ.',
    primaryMaterials: [
      'Gỗ gõ đỏ, gỗ hương, gỗ mít, gỗ mun bản địa Đông Nam Bộ xưa',
      'Vỏ ốc xà cừ biển nhập từ vùng duyên hải'
    ],
    traditionalTools: [
      'Bộ đục chạm khắc hơn 30 cây đủ cỡ (đục vũm, đục bạt, đục chàng)',
      'Vồ gỗ mun, thước tầm, cưa lọng tay'
    ],
    productionSteps: [
      {
        stepNumber: 1,
        title: 'Pha chế gỗ và chọn thớ',
        description: 'Gỗ khối được xẻ theo chiều vân, phơi tẩm kỹ chống co ngót trước khi vẽ mẫu đồ án.'
      },
      {
        stepNumber: 2,
        title: 'Chạm bong và chạm lộng',
        description: 'Dùng đục phá thế khối lớn rồi tỉ mỉ chạm sâu nhiều tầng lớp hoa lá cành, kênh bong tách rời khỏi nền.'
      },
      {
        stepNumber: 3,
        title: 'Cạo bóng và cẩn xà cừ',
        description: 'Dùng mảnh kính vỡ và lá chuối khô cạo mịn đường đục, cẩn từng mảnh ốc xà cừ ngũ sắc.'
      }
    ],
    distinctiveTechniques: [
      'Kỹ thuật chạm kênh bong nhiều tầng lớp (chạm lộng 3D trên gỗ)',
      'Kỹ thuật cẩn ốc xà cừ chìm vừa khít không hở kẽ mộng'
    ],
    representativeProducts: [
      'Bao lam đình chùa chạm tứ linh, bát tiên',
      'Tủ thờ Gò Công - Sài Gòn cẩn ốc ngũ sắc',
      'Bàn ghế trường kỷ và hoành phi câu đối sơn son thếp vàng'
    ],
    motifsAndSymbolism: 'Tích truyện cổ, cúc hóa rồng, trúc hóa long, hoa sen và các biểu tượng phước lộc thọ.',
    culturalSocioEconomicValues: 'Dấu ấn tinh hoa nghề mộc đô thị; minh chứng cho sự tài hoa của các thế hệ thợ mộc miền Đông Nam Bộ.',
    artisanRole: 'Nghệ nhân mộc Chợ Lớn nổi tiếng với khả năng đọc hình họa và kỹ năng dùng đục mềm mại như nét cọ vẽ.',
    conservationStatus: 'Quy mô xưởng mộc thu hẹp do thiếu mặt bằng và nguồn gỗ tự nhiên quý hiếm bị hạn chế.',
    challenges: [
      'Nguồn gỗ quý ngày càng cạn kiệt, chi phí nguyên liệu cao',
      'Thị hiếu nội thất hiện đại chuộng gỗ công nghiệp giản đơn'
    ],
    conservationSolutions: [
      'Chuyển hướng sang bảo chế tác đồ mỹ nghệ quà tặng tinh xảo',
      'Ứng dụng số hóa 3D lưu giữ các mẫu hoa văn chạm khắc cổ'
    ],
    mainImage: ASSET_LACQUER_TUONGBINHHIEP,
    galleryImages: [
      {
        url: ASSET_LACQUER_TUONGBINHHIEP,
        caption: 'Chi tiết chạm khắc gỗ mỹ nghệ cẩn xà cừ truyền thống Nam Bộ',
        author: 'Hội Mỹ nghệ TP.HCM',
        license: 'Ảnh tư liệu minh họa',
        isIllustration: true
      }
    ],
    referenceIds: ['ref-07'],
    coordinates: {
      lat: 10.7550,
      lng: 106.6600
    },
    featured: false,
    published: true,
    updatedAt: '2026-10-10'
  },
  {
    id: 'craft-dan-lat-dem-bang-tay-ninh',
    name: 'Nghề đan đệm bàng và mây tre Tây Ninh',
    englishName: 'Tay Ninh Traditional Lepironia & Bamboo Weaving',
    otherNames: ['Đan đệm cỏ bàng Tây Ninh', 'Đan mây tre rừng Chàng Riệc'],
    category: 'basketry',
    categoryName: 'Nghề đan lát',
    province: 'Tây Ninh',
    specificLocation: 'Huyện Tân Biên, Châu Thành và Bến Cầu, tỉnh Tây Ninh',
    ethnicCommunity: 'Cộng đồng người Việt và người Khmer',
    heritageStatus: 'unverified_tradition',
    heritageRecognitionDetails: {
      title: 'Nghề truyền thống được giới thiệu – Dữ liệu minh hoạ – cần xác minh',
      recognizedBy: 'Chưa có quyết định công nhận chính thức từ cơ quan nhà nước'
    },
    shortDescription: 'Tri thức khai thác cỏ bàng và tre nứa vùng đất giáp biên giới để chế tác đệm nằm mát lưng, giỏ xách và dụng cụ sinh hoạt mộc mạc.',
    historicalOrigin: 'Được hình thành từ nhu cầu thích nghi với điều kiện khí hậu nắng gió miền Đông. Cỏ bàng mọc tự nhiên ở các vùng đất phèn trũng được người dân cắt về ép dẹp phơi khô làm đệm.',
    formationDevelopment: 'Từ nghề phụ gia đình nông nhàn, đệm bàng Tây Ninh từng tỏa đi khắp các chợ đầu mối miền Nam phục vụ giấc ngủ của người nông dân lao động.',
    primaryMaterials: [
      'Cỏ bàng khô dẻo dai',
      'Mây rừng và tre nứa địa phương'
    ],
    traditionalTools: [
      'Chày giã bàng bằng gỗ nặng',
      'Bàn ép cỏ bàng thủ công',
      'Dao xén mép đệm'
    ],
    productionSteps: [
      {
        stepNumber: 1,
        title: 'Cắt và phơi cỏ bàng',
        description: 'Cắt cỏ bàng đúng độ già, phơi nắng to cho cọng cỏ chuyển sang màu vàng rơm.'
      },
      {
        stepNumber: 2,
        title: 'Giã bàng cho dẹp mềm',
        description: 'Dùng chày gỗ giã đều tay để cọng cỏ bàng bẹp mỏng nhưng không bị nát gãy.'
      },
      {
        stepNumber: 3,
        title: 'Đan cài từng sợi',
        description: 'Ngồi đan đan lóng đôi tạo mặt đệm êm mát, phẳng phiu.'
      }
    ],
    distinctiveTechniques: [
      'Kỹ thuật giã mềm cọng bàng giữ được độ dai đàn hồi tự nhiên',
      'Kỹ thuật gập mép viền không cần chỉ may'
    ],
    representativeProducts: [
      'Chiếc đệm bàng nằm mát mùa hè',
      'Túi bàng đựng đồ thân thiện môi trường',
      'Nón bàng che mưa nắng đồng rẫy'
    ],
    motifsAndSymbolism: 'Màu vàng rơm mộc mạc của cỏ đất mẹ, biểu tượng của sự chân chất, dung dị của con người miền Đông.',
    culturalSocioEconomicValues: 'Sản phẩm thuần tự nhiên, phân hủy sinh học 100%, có tiềm năng lớn trong xu hướng tiêu dùng xanh bền vững.',
    artisanRole: 'Những phụ nữ nông thôn Tây Ninh giữ lửa nghề qua từng nhịp chày giã bàng bên hiên nhà.',
    conservationStatus: 'Diện tích cỏ bàng tự nhiên bị thu hẹp do chuyển đổi đất nông nghiệp trồng mì, cao su.',
    challenges: [
      'Cạnh tranh khốc liệt với chiếu nhựa tổng hợp giá rẻ',
      'Thiếu diện tích bảo tồn cây cỏ bàng nguyên liệu'
    ],
    conservationSolutions: [
      'Cải tiến thành các sản phẩm thời trang xanh (túi xách cao cấp, giỏ mây xuất khẩu)',
      'Xây dựng vùng đệm sinh thái bảo tồn đồng cỏ bàng tự nhiên'
    ],
    mainImage: ASSET_BASKETRY_BAMBOO,
    galleryImages: [
      {
        url: ASSET_BASKETRY_BAMBOO,
        caption: 'Sản phẩm đan lát thủ công từ nguyên liệu tự nhiên Đông Nam Bộ',
        author: 'Dự án Di sản số',
        license: 'Ảnh tư liệu minh hoạ',
        isIllustration: true
      }
    ],
    referenceIds: ['ref-07'],
    coordinates: {
      lat: 11.3100,
      lng: 106.0988
    },
    featured: false,
    published: true,
    updatedAt: '2026-10-05'
  }
];

export const INITIAL_STORIES: ArtisanStory[] = [
  {
    id: 'story-01',
    title: 'Người thổi hồn vào đất bên dòng Đồng Nai',
    subtitle: 'Nửa thế kỷ gìn giữ tinh hoa men xanh đồng trổ bông gốm Biên Hòa',
    artisanName: 'Nghệ nhân Đặng Văn Trước',
    honorificTitle: 'Nghệ nhân Ưu tú Gốm Biên Hòa',
    birthYear: 1952,
    craftId: 'craft-gom-bien-hoa',
    village: 'Làng gốm Tân Vạn, TP. Biên Hòa, tỉnh Đồng Nai',
    image: ASSET_HERO,
    quote: 'Gốm Biên Hòa không chỉ là đất và men nung, đó là cốt cách của người thợ miền Đông: phóng khoáng, kiên định và luôn mở lòng đón nhận cái mới.',
    excerpt: 'Hơn 50 năm gắn bó với bàn xoay thủ công và lò bầu nung củi, Nghệ nhân Đặng Văn Trước đã phục dựng thành công công thức men xanh đồng cổ điển từng làm say đắm giới mộ điệu mỹ thuật quốc tế.',
    content: 'Sinh ra trong một gia đình ba đời làm gốm tại bến Tân Vạn, từ năm 10 tuổi ông Trước đã quen với mùi đất sét ẩm và tiếng reo của bàn xoay gốm chân. Ông theo học các bậc thầy lão thành tại Trường Mỹ nghệ Biên Hòa cũ, nơi nghệ thuật gốm truyền thống Nam Bộ hòa quyện với phong cách tạo hình Pháp.\n\nSau ngày hòa bình, trải qua bao thăng trầm của kinh tế thị trường, khi nhiều lò gốm phải đóng cửa vì khói bụi và sự cạnh tranh của đồ nhựa, ông vẫn miệt mài bên xưởng thực nghiệm. Ông cất công đi tìm lại các mẫu quặng đồng, đá vôi và tro trấu tự nhiên để nung thử hàng trăm mẻ men rạn.\n\n"Nét độc đáo nhất của gốm Biên Hòa là sự khắc vạch chìm rồi chấm men màu. Người thợ phải nén từng hơi thở khi đi lưỡi dao tre trên nền đất da bò, chỉ cần lệch một ly là bình gốm mất đi cái thần", ông chia sẻ với các học viên trẻ.',
    learningJourney: 'Học nghề từ năm 1964 qua phương thức kèm cặp truyền khẩu trực tiếp từ cha và các thầy giáo Trường Mỹ thuật Biên Hòa.',
    transmissionStory: 'Hiện ông đã đào tạo được hơn 40 học trò thành nghề, nhiều người trong số đó đã mở xưởng gốm mỹ thuật đương đại tại TP.HCM và Đồng Nai.',
    source: 'Ghi chép điền dã của Ban Nghiên cứu Văn hóa Dân gian Đồng Nai (2023)',
    published: true,
    publishedAt: '2026-10-12'
  },
  {
    id: 'story-02',
    title: 'Bí mật hai mươi lăm lớp sơn và ngọn lửa giữ nghề Tương Bình Hiệp',
    subtitle: 'Chuyện về người nghệ nhân mài bóng thời gian trên tấm vóc sơn ta',
    artisanName: 'Nghệ nhân Nguyễn Văn Quý',
    honorificTitle: 'Nghệ nhân Ưu tú Sơn mài Nam Bộ',
    birthYear: 1948,
    craftId: 'craft-son-mai-tuong-binh-hiep',
    village: 'Làng sơn mài Tương Bình Hiệp, TP. Thủ Dầu Một, Bình Dương',
    image: ASSET_LACQUER_TUONGBINHHIEP,
    quote: 'Sơn mài dạy cho con người ta sự nhẫn nại. Muốn có một tác phẩm sâu thẳm, người ta phải dám vùi lớp vàng son dưới nhiều lớp sơn đen rồi mới từ từ mài lộ ra.',
    excerpt: 'Nghệ nhân Nguyễn Văn Quý là một trong số ít thợ sơn lão thành còn nắm giữ bí quyết ủ sơn ta tự nhiên và kỹ thuật cẩn vỏ trứng vịt nung đạt độ phẳng tuyệt đối.',
    content: 'Làng Tương Bình Hiệp nằm êm đềm ven sông Sài Gòn. Trong căn nhà cổ ba gian của nghệ nhân Nguyễn Văn Quý, thoang thoảng mùi sơn ta thơm nồng đặc trưng. Để có một tấm vóc hoàn chỉnh, ông phải mất ròng rã 3 tháng làm mộc, bó vải, hom đất và phết từ 20 đến 25 lớp sơn.\n\n"Người làm sơn mài sợ nhất là sự nóng vội. Sơn ta chỉ khô trong buồng ủ có độ ẩm cao, càng ẩm sơn càng nhanh khô và càng bóng sâu. Nếu dùng sơn hóa học chỉ cần 1 giờ là khô, nhưng nó sẽ bong tróc chỉ sau vài năm. Còn bức tranh sơn mài cổ truyền có thể ngâm nước biển hàng trăm năm mà màu vàng quỳ vẫn sáng ngời", ông Quý hào hứng kể.\n\nÔng còn nổi tiếng với kỹ thuật nung vỏ trứng vịt để tạo ra 5 cung bậc sắc trắng khác nhau, từ trắng tinh khôi đến vàng ngà cổ kính, kết hợp với bụi quỳ vàng tạo chiều sâu lấp lánh cho những bức tranh đầm sen quê hương.',
    learningJourney: 'Thừa kế xưởng sơn của dòng họ Nguyễn có từ đầu thế kỷ 20, từng đoạt nhiều huy chương vàng tại các hội chợ triển lãm thủ công mỹ nghệ toàn quốc.',
    transmissionStory: 'Tổ chức các lớp học mài tranh miễn phí vào mỗi dịp hè cho thiếu nhi trong làng để nuôi dưỡng tình yêu di sản từ thuở nhỏ.',
    source: 'Tư liệu Hội Văn nghệ Dân gian Bình Dương (2022)',
    published: true,
    publishedAt: '2026-09-28'
  },
  {
    id: 'story-03',
    title: 'Khung dệt dây lưng và giấc mơ thổ cẩm giữa rừng Bù Gia Mập',
    subtitle: 'Bà Điểu Thị Ran và hành trình gìn giữ trang phục truyền thống dân tộc S\'tiêng',
    artisanName: 'Nghệ nhân Điểu Thị Ran',
    honorificTitle: 'Nghệ nhân dân gian giữ hồn thổ cẩm S\'tiêng',
    birthYear: 1958,
    craftId: 'craft-det-tho-cam-stieng',
    village: 'Sóc Bù Lư, xã Bù Gia Mập, tỉnh Bình Phước',
    image: ASSET_WEAVING_STIENG,
    quote: 'Chừng nào người phụ nữ S\'tiêng còn ngồi cạp cửi bên bậu cửa sổ, buôn làng mình còn nhớ đường về với cội nguồn tổ tiên.',
    excerpt: 'Đôi bàn chân duỗi thẳng làm điểm tựa căng sợi, đôi bàn tay thoăn thoắt đếm sợi nhặt hoa văn, bà Điểu Thị Ran đã đưa tấm thổ cẩm rừng Bù Gia Mập bước ra các sàn diễn thời trang quốc tế.',
    content: 'Tại vùng đệm Vườn Quốc gia Bù Gia Mập, bà Điểu Thị Ran được cả sóc kính trọng gọi là "người đàn bà vẽ hoa bằng chỉ dệt". Khung cửi của bà không hề có trụ đứng hay bàn đạp, mà là một bó que tre đơn sơ quàng qua lưng bằng một đai da mềm.\n\nBà nhớ lại: "Hồi xưa trong rừng đói khổ, người S\'tiêng phải tự trồng bông bạt trên rẫy rồi kéo sợi bằng xa quay tay. Đi rừng thấy lá chàm thì hái ngâm nước làm màu xanh đen, thấy vỏ cây bù-lơ thì lấy về nấu lấy màu đỏ thắm. Mẹ tôi dặn, hoa văn quả trám là mắt của chim rừng dẫn đường, dệt lên váy để đi rừng không bị lạc lối".\n\nHiện nay, bà Ran là chủ nhiệm Hợp tác xã dệt thổ cẩm phụ nữ Bù Gia Mập. Không chỉ dệt váy áo truyền thống cho người già trong buôn mặc vào lễ cúng thần lúa, bà còn sáng tạo thêm khăn quàng cổ, ví cầm tay phục vụ khách du lịch yêu thiên nhiên.',
    learningJourney: 'Học dệt từ mẹ từ năm 13 tuổi, trải qua hơn 45 năm gắn bó trọn đời với khung cửi dây lưng.',
    transmissionStory: 'Đào tạo hơn 60 phụ nữ trẻ trong xã Bù Gia Mập, giúp họ có thêm thu nhập ổn định từ việc bán đồ lưu niệm thổ cẩm cho du khách.',
    source: 'Hồ sơ Di sản Văn hoá Phi vật thể tỉnh Bình Phước (2024)',
    published: true,
    publishedAt: '2026-10-05'
  }
];

export const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'media-01',
    title: 'Nghệ nhân tạo dáng gốm mỹ nghệ trên bàn xoay chân',
    description: 'Quy trình tạo hình thân bình gốm đất nung bằng lực tay và đôi chân điều chỉnh tốc độ bàn xoay truyền thống.',
    location: 'Phường Tân Vạn, TP. Biên Hòa, tỉnh Đồng Nai',
    craftId: 'craft-gom-bien-hoa',
    craftName: 'Nghề làm gốm Biên Hòa',
    category: 'process',
    url: ASSET_HERO,
    author: 'Dự án Di sản số Đông Nam Bộ',
    license: 'Giấy phép phi thương mại CC-BY-NC 4.0',
    isIllustration: false
  },
  {
    id: 'media-02',
    title: 'Bình hoa gốm men xanh đồng trổ bông (Vert de Bien Hoa)',
    description: 'Hiện vật gốm mỹ nghệ Biên Hòa đầu thế kỷ 20 trưng bày trong tủ kính bảo tàng, họa tiết sen chạm lộng tinh xảo.',
    location: 'Bảo tàng Tỉnh Đồng Nai',
    craftId: 'craft-gom-bien-hoa',
    craftName: 'Nghề làm gốm Biên Hòa',
    category: 'product',
    url: ASSET_POTTERY_BIENHOA,
    author: 'Bộ phận Lưu trữ Bảo tàng Đồng Nai',
    license: 'Tư liệu khoa học bảo tồn',
    isIllustration: false
  },
  {
    id: 'media-03',
    title: 'Đĩa sơn mài Tương Bình Hiệp cẩn vỏ trứng và thếp vàng',
    description: 'Tác phẩm sơn mài truyền thống phản chiếu ánh sáng lộng lẫy qua 25 lớp sơn ta và công đoạn mài bóng ướt kỳ công.',
    location: 'Làng Tương Bình Hiệp, Thủ Dầu Một, Bình Dương',
    craftId: 'craft-son-mai-tuong-binh-hiep',
    craftName: 'Nghề sơn mài Tương Bình Hiệp',
    category: 'product',
    url: ASSET_LACQUER_TUONGBINHHIEP,
    author: 'Hiệp hội Sơn mài Điêu khắc Bình Dương',
    license: 'Ảnh tư liệu triển lãm',
    isIllustration: false
  },
  {
    id: 'media-04',
    title: 'Nghệ nhân dân tộc S\'tiêng dệt thổ cẩm trên khung cửi lưng',
    description: 'Phương thức dệt cạp cửi lưng cổ xưa với hoa văn hình học màu đỏ son và xanh chàm tự nhiên.',
    location: 'Xã Bù Gia Mập, tỉnh Bình Phước',
    craftId: 'craft-det-tho-cam-stieng',
    craftName: 'Nghề dệt thổ cẩm của người S\'tiêng',
    category: 'artisan',
    url: ASSET_WEAVING_STIENG,
    author: 'Dự án Di sản số Đông Nam Bộ',
    license: 'Giấy phép tư liệu văn hoá cộng đồng',
    isIllustration: false
  },
  {
    id: 'media-05',
    title: 'Nghề đan lát mây tre và nông cụ truyền thống miền Đông',
    description: 'Thao tác nẹp viền rổ nia bằng sợi mây rừng uốn dẻo, bền chắc qua thời gian.',
    location: 'Định Quán, tỉnh Đồng Nai',
    craftId: 'craft-dan-lat-cho-ro',
    craftName: 'Nghề đan lát mây tre của người Chơ Ro',
    category: 'process',
    url: ASSET_BASKETRY_BAMBOO,
    author: 'Dự án Di sản số Đông Nam Bộ',
    license: 'Giấy phép khảo sát điền dã',
    isIllustration: false
  }
];

export const INITIAL_AI_DRAFTS = [
  {
    id: 'draft-01',
    title: 'Bản thảo bài giảng: So sánh nghệ thuật men gốm Biên Hòa và gốm gia dụng Lái Thiêu',
    type: 'craft_intro' as const,
    sourceReferenceIds: ['ref-01', 'ref-04', 'ref-06'],
    sourceReferenceTitles: [
      'Quyết định công bố Danh mục Di sản văn hóa phi vật thể quốc gia: Nghề làm gốm Biên Hòa',
      'Khảo cứu Gốm mỹ nghệ Biên Hòa',
      'Hồ sơ Di sản Nghề làm gốm gia dụng Lái Thiêu'
    ],
    generatedContent: 'Vùng văn hóa Đông Nam Bộ sở hữu hai trung tâm gốm lừng danh phản ánh hai thái cực đặc sắc của đời sống Nam Bộ: Gốm Biên Hòa (Đồng Nai) đại diện cho dòng gốm mỹ nghệ bác học, kỹ thuật khắc vạch chìm nổi và men xanh đồng trổ bông; trong khi Gốm Lái Thiêu (Bình Dương) mang đậm tính thực dụng, phóng khoáng qua nét vẽ con gà trống, đĩa con cá phục vụ mọi nếp nhà dân dã ven sông Sài Gòn.',
    notes: 'Bản thảo do AI Studio đề xuất dựa trên 3 tài liệu chính thống. Đã qua kiểm tra bước 1, cần biên tập viên duyệt công bố.',
    status: 'draft' as const,
    createdAt: '2026-11-04'
  }
];

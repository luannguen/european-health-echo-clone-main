import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BackToTop from "@/components/BackToTop";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronLeft, MapPin, Share2, Tag, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Dữ liệu mẫu cho bài viết chi tiết - trong thực tế sẽ được lấy từ API
const newsItems = [
  {
    id: 1,
    title: "Triển lãm Quốc tế về Hệ thống Lạnh và Điều hòa Không khí 2025",
    content: `
      <p>Chào mừng quý vị đến với Triển lãm Quốc tế về Hệ thống Lạnh và Điều hòa Không khí - sự kiện triển lãm quốc tế lớn nhất trong năm 2025 về các giải pháp và sản phẩm mới trong lĩnh vực hệ thống làm lạnh và điều hòa không khí.</p>
      
      <h3>Về sự kiện</h3>
      <p>Triển lãm Quốc tế về Hệ thống Lạnh và Điều hòa Không khí là sự kiện thường niên, quy tụ các nhà sản xuất, nhà cung cấp, và chuyên gia hàng đầu trong ngành điện lạnh và điều hòa không khí từ khắp nơi trên thế giới. Đây là cơ hội tuyệt vời để các doanh nghiệp trong nước và quốc tế trưng bày sản phẩm, công nghệ mới nhất và mở rộng mạng lưới đối tác.</p>
      
      <h3>Những điểm nổi bật</h3>
      <ul>
        <li>Trưng bày hơn 200 gian hàng đến từ 15+ quốc gia và vùng lãnh thổ</li>
        <li>Giới thiệu các công nghệ tiết kiệm năng lượng và thân thiện với môi trường mới nhất</li>
        <li>Các buổi hội thảo chuyên sâu với sự tham gia của các chuyên gia hàng đầu</li>
        <li>Hoạt động kết nối giao thương B2B giữa các doanh nghiệp</li>
        <li>Khu vực trình diễn công nghệ với các mô hình hoạt động thực tế</li>
      </ul>
      
      <h3>Đối tượng tham dự</h3>
      <p>Sự kiện hướng đến các nhóm đối tượng:</p>
      <ul>
        <li>Doanh nghiệp sản xuất, kinh doanh thiết bị điện lạnh</li>
        <li>Chuyên gia, kỹ thuật viên trong ngành</li>
        <li>Nhà thầu, đơn vị tư vấn thiết kế</li>
        <li>Đại diện các khu công nghiệp, nhà máy sản xuất</li>
        <li>Doanh nghiệp xuất nhập khẩu thiết bị điện lạnh</li>
      </ul>
      
      <h3>Thông tin chi tiết</h3>
      <p>Thời gian: 15-18 tháng 5 năm 2025, từ 09:00 - 17:00 hàng ngày</p>
      <p>Địa điểm: Trung tâm Hội chợ và Triển lãm Sài Gòn (SECC), 799 Nguyễn Văn Linh, Quận 7, TP.HCM</p>
      <p>Đơn vị tổ chức: Hiệp hội Điện lạnh Việt Nam phối hợp cùng Công ty Triển lãm Quốc tế ABC</p>
      
      <h3>Đăng ký tham dự</h3>
      <p>Để đăng ký tham dự hoặc đặt gian hàng, vui lòng liên hệ:</p>
      <p>Email: info@refrigerationexpo2025.vn</p>
      <p>Hotline: 1900 1234 567</p>
      
      <p>Rất mong được đón tiếp quý vị tại sự kiện!</p>
    `,
    image: "/lovable-uploads/0bd3c048-8e37-4775-a6bc-0b54ec07edbe.png",
    publishDate: "2025-04-01",
    author: "Ban Tổ Chức",
    category: "Triển lãm",
    tags: ["Triển lãm", "Điều hòa", "Công nghệ làm lạnh"],
    location: "Trung tâm Hội chợ và Triển lãm Sài Gòn (SECC), Quận 7, TP.HCM",
    organizer: "Hiệp hội Điện lạnh Việt Nam",
    comments: 5,
    views: 1250
  },
  {
    id: 2,
    title: "Hội thảo Công nghệ Tiết kiệm Năng lượng trong Hệ thống Lạnh",
    content: `
      <p>Trân trọng kính mời quý đơn vị, doanh nghiệp và các chuyên gia trong ngành tham dự Hội thảo Công nghệ Tiết kiệm Năng lượng trong Hệ thống Lạnh - sự kiện chuyên sâu về các giải pháp tiết kiệm năng lượng mới nhất cho hệ thống lạnh công nghiệp và thương mại.</p>
      
      <h3>Giới thiệu</h3>
      <p>Trong bối cảnh biến đổi khí hậu và yêu cầu ngày càng cao về phát triển bền vững, việc áp dụng các công nghệ tiết kiệm năng lượng trong hệ thống lạnh đang trở thành xu hướng tất yếu. Hội thảo lần này sẽ tập trung vào các giải pháp tiên tiến nhất, giúp doanh nghiệp tối ưu hóa chi phí vận hành đồng thời giảm thiểu tác động môi trường.</p>
      
      <h3>Nội dung chính</h3>
      <ul>
        <li>Tổng quan về xu hướng công nghệ tiết kiệm năng lượng trong ngành lạnh</li>
        <li>Các giải pháp tích hợp IoT và AI trong quản lý hệ thống lạnh</li>
        <li>Nghiên cứu điển hình về các dự án tiết kiệm năng lượng thành công</li>
        <li>Công nghệ Inverter thế hệ mới và hiệu quả năng lượng</li>
        <li>Môi chất lạnh thân thiện môi trường và hiệu quả năng lượng cao</li>
        <li>Chính sách hỗ trợ và các chương trình khuyến khích tiết kiệm năng lượng</li>
      </ul>
      
      <h3>Diễn giả</h3>
      <p>Hội thảo có sự tham gia của các chuyên gia hàng đầu đến từ:</p>
      <ul>
        <li>TS. Nguyễn Văn A - Viện Nghiên cứu Năng lượng</li>
        <li>KS. Trần Văn B - Hiệp hội Điện lạnh Việt Nam</li>
        <li>TS. Phạm Văn C - Đại học Bách Khoa Hà Nội</li>
        <li>Ông David Smith - Chuyên gia quốc tế về hệ thống lạnh hiệu quả năng lượng</li>
      </ul>
      
      <h3>Thông tin chi tiết</h3>
      <p>Thời gian: 20/04/2025 (08:30 - 16:30)</p>
      <p>Địa điểm: Khách sạn Melia, 44 Lý Thường Kiệt, Hà Nội</p>
      <p>Ngôn ngữ: Tiếng Việt và Tiếng Anh (có phiên dịch)</p>
      <p>Phí tham dự: 1.500.000 VNĐ/người (bao gồm tài liệu, ăn trưa và giải khát)</p>
      
      <h3>Đăng ký tham dự</h3>
      <p>Để đăng ký tham dự, vui lòng điền form đăng ký online tại website hoặc liên hệ:</p>
      <p>Email: workshop@vrc.com.vn</p>
      <p>Hotline: 098 765 4321</p>
      
      <p>Hạn đăng ký: 15/04/2025</p>
      <p>Số lượng đại biểu có hạn, Ban tổ chức khuyến khích quý vị đăng ký sớm để đảm bảo có chỗ tham dự.</p>
    `,
    image: "/assets/images/projects-overview.jpg",
    publishDate: "2025-03-25",
    author: "VRC",
    category: "Hội thảo",
    tags: ["Tiết kiệm năng lượng", "Công nghệ mới", "Hệ thống lạnh"],
    location: "Khách sạn Melia, 44 Lý Thường Kiệt, Hà Nội",
    organizer: "VRC",
    comments: 8,
    views: 734
  },
  // Thêm các bài viết chi tiết khác tương tự
];

// Dữ liệu cho các tin liên quan
const relatedNews = [
  {
    id: 3,
    title: "Khóa đào tạo Kỹ thuật viên Bảo trì Hệ thống Lạnh Công nghiệp",
    image: "/assets/images/service-overview.jpg",
    publishDate: "2025-03-20",
    category: "Đào tạo"
  },
  {
    id: 4,
    title: "Lễ ra mắt dòng sản phẩm Điều hòa Inverter thế hệ mới",
    image: "/assets/images/projects-overview.jpg",
    publishDate: "2025-03-10",
    category: "Ra mắt sản phẩm"
  },
  {
    id: 5,
    title: "Diễn đàn Doanh nghiệp Điện lạnh Việt - EU",
    image: "/assets/images/service-overview.jpg",
    publishDate: "2025-04-01",
    category: "Diễn đàn"
  }
];

const NewsDetail = () => {
  // Lấy id từ URL
  const { id } = useParams<{ id: string }>();
  const newsId = parseInt(id || "1");
  
  // Tìm tin tức dựa trên id
  const newsItem = newsItems.find(item => item.id === newsId) || newsItems[0];
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Breadcrumbs */}
        <div className="bg-muted/30 py-3">
          <div className="container-custom">
            <div className="flex items-center text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Trang chủ</Link>
              <span className="mx-2">/</span>
              <Link to="/news" className="hover:text-primary">Tin tức & Sự kiện</Link>
              <span className="mx-2">/</span>
              <span className="text-primary font-medium truncate">{newsItem.title}</span>
            </div>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <Button variant="outline" asChild className="mb-4">
                <Link to="/news">
                  <ChevronLeft size={16} className="mr-1" />
                  Quay lại danh sách tin tức
                </Link>
              </Button>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={newsItem.image} 
                    alt={newsItem.title}
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {newsItem.category}
                    </Badge>
                    
                    {newsItem.tags && newsItem.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-secondary/10">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                    {newsItem.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-4 mb-6">
                    <div className="flex items-center">
                      <CalendarIcon size={16} className="mr-1" />
                      <span>{formatDate(newsItem.publishDate)}</span>
                    </div>
                    <div className="flex items-center">
                      <User size={16} className="mr-1" />
                      <span>{newsItem.author}</span>
                    </div>
                    {newsItem.location && (
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        <span>{newsItem.location}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Nội dung chi tiết */}
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: newsItem.content }}
                  />
                  
                  {/* Chia sẻ */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Chia sẻ:</span>
                        <div className="flex gap-2">
                          <a href="#" className="p-2 bg-muted rounded-full hover:bg-primary hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                          </a>
                          <a href="#" className="p-2 bg-muted rounded-full hover:bg-primary hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                            </svg>
                          </a>
                          <a href="#" className="p-2 bg-muted rounded-full hover:bg-primary hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                              <rect x="2" y="9" width="4" height="12"></rect>
                              <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center text-muted-foreground text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          {newsItem.views} lượt xem
                        </span>
                        <span className="flex items-center text-muted-foreground text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                          {newsItem.comments} bình luận
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tin liên quan */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-primary mb-4">Tin liên quan</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedNews.map(news => (
                    <Link 
                      to={`/news-detail/${news.id}`} 
                      key={news.id}
                      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src={news.image} 
                          alt={news.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105" 
                        />
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-primary font-medium mb-1">
                          {news.category}
                        </div>
                        <h4 className="font-medium line-clamp-2 hover:text-primary transition-colors">
                          {news.title}
                        </h4>
                        <div className="text-xs text-muted-foreground mt-2 flex items-center">
                          <CalendarIcon size={12} className="mr-1" />
                          {formatDate(news.publishDate)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Tìm kiếm */}
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <h3 className="font-semibold text-lg mb-3">Tìm kiếm</h3>
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="Tìm kiếm tin tức..." 
                    className="flex-grow border rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button className="bg-primary text-white px-4 py-2 rounded-r-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Danh mục */}
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <h3 className="font-semibold text-lg mb-3">Danh mục</h3>
                <ul className="space-y-2">
                  {[
                    { name: "Tin tức công ty", count: 12 },
                    { name: "Triển lãm", count: 8 },
                    { name: "Hội thảo", count: 15 },
                    { name: "Công nghệ mới", count: 24 },
                    { name: "Dự án tiêu biểu", count: 10 }
                  ].map((category, index) => (
                    <li key={index}>
                      <Link 
                        to={`/news/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`} 
                        className="flex justify-between items-center py-2 hover:text-primary"
                      >
                        <span>{category.name}</span>
                        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                          {category.count}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Bài viết gần đây */}
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <h3 className="font-semibold text-lg mb-3">Bài viết gần đây</h3>
                <div className="space-y-4">
                  {newsItems.slice(0, 3).map(news => (
                    <div key={news.id} className="flex gap-3">
                      <Link to={`/news-detail/${news.id}`} className="block w-20 h-20 flex-shrink-0">
                        <img 
                          src={news.image} 
                          alt={news.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </Link>
                      <div>
                        <Link to={`/news-detail/${news.id}`} className="font-medium text-sm hover:text-primary line-clamp-2">
                          {news.title}
                        </Link>
                        <div className="text-xs text-muted-foreground mt-1 flex items-center">
                          <CalendarIcon size={12} className="mr-1" />
                          {formatDate(news.publishDate)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Tags */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(newsItems.flatMap(news => news.tags || []))).map((tag, index) => (
                    <Link 
                      key={index}
                      to={`/news/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      className="bg-gray-100 hover:bg-primary hover:text-white px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default NewsDetail;
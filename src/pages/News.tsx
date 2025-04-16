import { useState } from "react";
import { CalendarIcon, ChevronRight, MapPin, Tag, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon } from "@/components/ui/search-icon";

// Dữ liệu mẫu cho tin tức
const newsItems = [
  {
    id: 1,
    title: "Triển lãm Quốc tế về Hệ thống Lạnh và Điều hòa Không khí 2025",
    summary: "Sự kiện triển lãm quốc tế lớn nhất trong năm 2025 về các giải pháp và sản phẩm mới trong lĩnh vực hệ thống làm lạnh và điều hòa không khí...",
    image: "/lovable-uploads/0bd3c048-8e37-4775-a6bc-0b54ec07edbe.png",
    publishDate: "2025-04-01",
    author: "Ban Tổ Chức",
    category: "Triển lãm",
    tags: ["Triển lãm", "Điều hòa", "Công nghệ làm lạnh"],
    location: "Trung tâm Hội chợ và Triển lãm Sài Gòn (SECC), Quận 7, TP.HCM",
    organizer: "Hiệp hội Điện lạnh Việt Nam",
    comments: 5,
    views: 1250,
    type: "event",
    eventDate: "2025-05-15"
  },
  {
    id: 2,
    title: "Hội thảo Công nghệ Tiết kiệm Năng lượng trong Hệ thống Lạnh",
    summary: "Hội thảo chuyên sâu về các công nghệ tiết kiệm năng lượng mới nhất áp dụng trong hệ thống lạnh công nghiệp và thương mại...",
    image: "/assets/images/projects-overview.jpg",
    publishDate: "2025-03-25",
    author: "VRC",
    category: "Hội thảo",
    tags: ["Tiết kiệm năng lượng", "Công nghệ mới", "Hệ thống lạnh"],
    location: "Khách sạn Melia, 44 Lý Thường Kiệt, Hà Nội",
    organizer: "VRC",
    comments: 8,
    views: 734,
    type: "event",
    eventDate: "2025-04-20"
  },
  {
    id: 3,
    title: "Khóa đào tạo Kỹ thuật viên Bảo trì Hệ thống Lạnh Công nghiệp",
    summary: "Khóa đào tạo chuyên sâu dành cho kỹ thuật viên về quy trình bảo trì, sửa chữa và nâng cấp các hệ thống lạnh công nghiệp quy mô lớn...",
    image: "/assets/images/service-overview.jpg",
    publishDate: "2025-03-20",
    author: "VRC Academy",
    category: "Đào tạo",
    tags: ["Đào tạo kỹ thuật", "Bảo trì", "Hệ thống lạnh công nghiệp"],
    location: "Trung tâm Đào tạo VRC, Biên Hòa, Đồng Nai",
    comments: 3,
    views: 421,
    type: "news"
  },
  {
    id: 4,
    title: "Lễ ra mắt dòng sản phẩm Điều hòa Inverter thế hệ mới",
    summary: "Sự kiện ra mắt dòng sản phẩm điều hòa không khí công nghệ Inverter thế hệ mới với khả năng tiết kiệm năng lượng vượt trội...",
    image: "/assets/images/projects-overview.jpg",
    publishDate: "2025-03-10",
    author: "VRC",
    category: "Ra mắt sản phẩm",
    tags: ["Inverter", "Điều hòa", "Tiết kiệm năng lượng"],
    location: "Trung tâm Hội nghị Quốc gia, Hà Nội",
    comments: 12,
    views: 980,
    type: "event",
    eventDate: "2025-03-25"
  },
  {
    id: 5,
    title: "VRC ký kết hợp tác với tập đoàn điện lạnh hàng đầu châu Âu",
    summary: "VRC vừa ký kết thỏa thuận hợp tác chiến lược với tập đoàn điện lạnh hàng đầu châu Âu, mở rộng cơ hội phát triển thị trường và chuyển giao công nghệ...",
    image: "/assets/images/service-overview.jpg",
    publishDate: "2025-03-15",
    author: "Phòng Truyền thông",
    category: "Tin công ty",
    tags: ["Hợp tác quốc tế", "Phát triển", "Công nghệ mới"],
    comments: 6,
    views: 890,
    type: "news"
  },
  {
    id: 6,
    title: "Thực trạng và giải pháp tiết kiệm năng lượng trong ngành điện lạnh tại Việt Nam",
    summary: "Báo cáo phân tích về thực trạng sử dụng năng lượng trong ngành điện lạnh tại Việt Nam và đề xuất các giải pháp tiết kiệm hiệu quả...",
    image: "/lovable-uploads/0bd3c048-8e37-4775-a6bc-0b54ec07edbe.png",
    publishDate: "2025-03-05",
    author: "TS. Nguyễn Văn An",
    category: "Nghiên cứu",
    tags: ["Nghiên cứu", "Tiết kiệm năng lượng", "Thị trường Việt Nam"],
    comments: 9,
    views: 1120,
    type: "news"
  },
  {
    id: 7,
    title: "VRC nhận giải thưởng Doanh nghiệp Xanh 2025",
    summary: "VRC vinh dự nhận giải thưởng Doanh nghiệp Xanh 2025 cho những đóng góp tích cực trong việc phát triển sản phẩm và giải pháp thân thiện với môi trường...",
    image: "/assets/images/service-overview.jpg",
    publishDate: "2025-02-28",
    author: "Phòng Truyền thông",
    category: "Giải thưởng",
    tags: ["Giải thưởng", "Phát triển bền vững", "Doanh nghiệp xanh"],
    comments: 15,
    views: 1500,
    type: "news"
  },
  {
    id: 8,
    title: "Diễn đàn Doanh nghiệp Điện lạnh Việt - EU",
    summary: "Diễn đàn kết nối doanh nghiệp trong lĩnh vực điện lạnh giữa Việt Nam và các nước Liên minh Châu Âu, tạo cơ hội hợp tác và phát triển thị trường...",
    image: "/assets/images/service-overview.jpg",
    publishDate: "2025-04-01",
    author: "Bộ Công Thương",
    category: "Diễn đàn",
    tags: ["Hợp tác quốc tế", "EU", "Thương mại"],
    location: "Pullman Saigon Centre, TP.HCM",
    organizer: "Bộ Công Thương và Phái đoàn EU tại Việt Nam",
    comments: 7,
    views: 870,
    type: "event",
    eventDate: "2025-04-28"
  }
];

// Dữ liệu mẫu cho tin nổi bật
const featuredNews = newsItems[0];
// Dữ liệu danh mục
const categories = [
  { name: "Tin công ty", count: 12 },
  { name: "Triển lãm", count: 8 },
  { name: "Hội thảo", count: 15 },
  { name: "Nghiên cứu", count: 6 },
  { name: "Công nghệ mới", count: 24 },
  { name: "Giải thưởng", count: 5 }
];

const News = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // Filter news based on active tab
  const getFilteredNews = () => {
    if (activeTab === "all") return newsItems;
    if (activeTab === "news") return newsItems.filter(item => item.type === "news");
    if (activeTab === "events") return newsItems.filter(item => item.type === "event");
    return newsItems;
  };

  const filteredNews = getFilteredNews();

  return (
    <main className="flex-grow">
      {/* Tiêu đề trang */}
      <div className="bg-gradient-to-b from-primary/10 to-transparent py-8 md:py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">Tin tức & Sự kiện</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            Cập nhật những thông tin mới nhất về ngành điện lạnh, công nghệ mới và các hoạt động của chúng tôi
          </p>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Tin nổi bật */}
            <div className="mb-10">
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img 
                  src={featuredNews.image} 
                  alt={featuredNews.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105" 
                />
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-block bg-secondary text-black font-medium px-3 py-1 rounded-md text-sm">
                  {featuredNews.category}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                <Link to={`/news-detail/${featuredNews.id}`} className="hover:text-accent">
                  {featuredNews.title}
                </Link>
              </h2>
              <p className="text-muted-foreground mb-4">{featuredNews.summary}</p>
              
              <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-4 mb-4">
                <div className="flex items-center">
                  <CalendarIcon size={16} className="mr-1" />
                  <span>{formatDate(featuredNews.publishDate)}</span>
                </div>
                <div className="flex items-center">
                  <User size={16} className="mr-1" />
                  <span>Tác giả: {featuredNews.author}</span>
                </div>
              </div>
              
              <Button asChild>
                <Link to={`/news-detail/${featuredNews.id}`}>
                  Xem chi tiết
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </Button>
            </div>

            {/* Tab lọc tin tức/sự kiện */}
            <Tabs defaultValue="all" className="mb-8" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full max-w-[400px]">
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                <TabsTrigger value="news">Tin tức</TabsTrigger>
                <TabsTrigger value="events">Sự kiện</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Danh sách tin tức */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNews.slice(1).map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <Link to={item.type === "news" ? `/news-detail/${item.id}` : `/event-details/${item.id}`} className="block aspect-[4/3] overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105" 
                    />
                  </Link>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">
                        {item.category}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <CalendarIcon size={12} className="mr-1" />
                        {formatDate(item.publishDate)}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-primary mb-2 hover:text-accent">
                      <Link to={item.type === "news" ? `/news-detail/${item.id}` : `/event-details/${item.id}`}>
                        {item.title}
                      </Link>
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {item.summary}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-muted-foreground">
                        Tác giả: {item.author}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          {item.views}
                        </span>
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                          {item.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Phân trang */}
            <div className="flex justify-center mt-10">
              <div className="join">
                <button className="bg-white border border-gray-300 px-3 py-1 hover:bg-primary hover:text-white transition-colors">
                  «
                </button>
                <button className="bg-primary text-white border border-primary px-3 py-1">1</button>
                <button className="bg-white border border-gray-300 px-3 py-1 hover:bg-primary hover:text-white transition-colors">2</button>
                <button className="bg-white border border-gray-300 px-3 py-1 hover:bg-primary hover:text-white transition-colors">3</button>
                <button className="bg-white border border-gray-300 px-3 py-1 hover:bg-primary hover:text-white transition-colors">
                  »
                </button>
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
                  <SearchIcon size={18} />
                </button>
              </div>
            </div>
            
            {/* Danh mục */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <h3 className="font-semibold text-lg mb-3">Danh mục</h3>
              <ul className="space-y-2">
                {categories.map((category, index) => (
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
                {newsItems.slice(0, 5).map(news => (
                  <div key={news.id} className="flex gap-3">
                    <Link to={news.type === "news" ? `/news-detail/${news.id}` : `/event-details/${news.id}`} className="block w-20 h-20 flex-shrink-0">
                      <img 
                        src={news.image} 
                        alt={news.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </Link>
                    <div>
                      <Link to={news.type === "news" ? `/news-detail/${news.id}` : `/event-details/${news.id}`} className="font-medium text-sm hover:text-primary line-clamp-2">
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
                {Array.from(new Set(newsItems.flatMap(news => news.tags))).map((tag, index) => (
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
  );
};

export default News;
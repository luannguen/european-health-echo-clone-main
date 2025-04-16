import { ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PublicationProps {
  title: string;
  date: string;
  type: string;
  imageUrl: string;
  link: string;
  excerpt: string;
}

const allPublications: PublicationProps[] = [
  {
    title: "Công nghệ Inverter tiên tiến: Tối ưu hóa tiêu thụ điện năng trong hệ thống HVAC",
    date: "15 March 2025",
    type: "Báo cáo",
    imageUrl: "https://images.unsplash.com/photo-1548872591-c72c3fc1c836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    link: "/publications/inverter-technology",
    excerpt: "Phân tích chi tiết về công nghệ Inverter thế hệ mới giúp tiết kiệm tới 30% điện năng so với hệ thống truyền thống và cách áp dụng vào các công trình thương mại và dân dụng."
  },
  {
    title: "Giải pháp tận dụng nhiệt thải Heat Recovery trong hệ thống công nghiệp",
    date: "27 February 2025",
    type: "Nghiên cứu",
    imageUrl: "https://images.unsplash.com/photo-1581093458791-9a9cd7db6447?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    link: "/publications/heat-recovery-solutions",
    excerpt: "Cách tận dụng nhiệt thải từ quá trình làm lạnh để tái sử dụng cho hệ thống nước nóng hoặc không gian cần sưởi ấm, giúp tiết kiệm năng lượng gấp đôi."
  },
  {
    title: "Tiêu chuẩn công trình xanh: Lợi ích kinh tế và môi trường trong dài hạn",
    date: "10 January 2025",
    type: "Hướng dẫn",
    imageUrl: "https://images.unsplash.com/photo-1548407260-da850faa41e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    link: "/publications/green-building-standards",
    excerpt: "Hệ thống điều hòa tiết kiệm năng lượng của VRC giúp các công trình đạt được chứng nhận LEED, LOTUS, EDGE và các tiêu chuẩn công trình xanh quốc tế khác."
  },
  {
    title: "Báo cáo hiệu quả tiết kiệm năng lượng: Phân tích chi phí-lợi ích các công nghệ mới",
    date: "5 December 2024",
    type: "Báo cáo",
    imageUrl: "https://images.unsplash.com/photo-1618004912476-29818d81ae2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    link: "/publications/energy-efficiency-report",
    excerpt: "Phân tích chi tiết về hiệu quả đầu tư của các công nghệ tiết kiệm năng lượng, thời gian hoàn vốn và lợi ích dài hạn cho doanh nghiệp và môi trường."
  },
  {
    title: "Hệ thống quản lý năng lượng thông minh cho tòa nhà thương mại",
    date: "18 October 2024",
    type: "Hướng dẫn",
    imageUrl: "https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    link: "/publications/smart-building-management",
    excerpt: "Cách thiết lập và vận hành hệ thống quản lý năng lượng thông minh cho các tòa nhà thương mại, giúp giảm chi phí vận hành và tối ưu hiệu suất thiết bị."
  },
  {
    title: "Môi chất lạnh thân thiện với môi trường: Xu hướng và quy định mới",
    date: "3 September 2024",
    type: "Nghiên cứu",
    imageUrl: "https://images.unsplash.com/photo-1473876637954-4b493d59fd97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    link: "/publications/eco-friendly-refrigerants",
    excerpt: "Tổng quan về các môi chất lạnh mới có GWP thấp, các quy định quốc tế về hạn chế sử dụng môi chất gây hiệu ứng nhà kính và lộ trình chuyển đổi cho doanh nghiệp."
  },
  {
    title: "Ứng dụng AI trong tối ưu hóa vận hành hệ thống điều hòa",
    date: "25 July 2024",
    type: "Báo cáo",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    link: "/publications/ai-hvac-optimization",
    excerpt: "Cách trí tuệ nhân tạo và học máy đang cách mạng hóa việc vận hành hệ thống HVAC, với khả năng dự đoán nhu cầu, tối ưu hóa tiêu thụ năng lượng và bảo trì."
  },
  {
    title: "Kết hợp năng lượng tái tạo với hệ thống điều hòa không khí",
    date: "12 June 2024",
    type: "Hướng dẫn",
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    link: "/publications/renewable-energy-hvac",
    excerpt: "Giải pháp kết hợp điện mặt trời và các nguồn năng lượng tái tạo khác với hệ thống điều hòa không khí để giảm thiểu phát thải carbon và chi phí vận hành."
  }
];

const Publications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Tất cả");
  
  const filteredPublications = allPublications.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        pub.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "Tất cả" || pub.type === filterType;
    return matchesSearch && matchesType;
  });
  
  const publicationTypes = ["Tất cả", ...new Set(allPublications.map(pub => pub.type))];
  
  return (
    <>
      {/* Banner */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-500 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm mb-4">
            <Link to="/" className="hover:underline text-white/80">Trang chủ</Link>
            <ArrowRight size={14} className="mx-2" />
            <span>Bài viết</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Bài viết & Nghiên cứu</h1>
          <p className="mt-4 text-lg max-w-3xl">
            Khám phá các báo cáo, nghiên cứu và hướng dẫn chuyên sâu về công nghệ tiết kiệm năng lượng 
            và các giải pháp điều hòa không khí hiện đại.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto py-12 px-4">
        {/* Search and filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input 
              placeholder="Tìm kiếm bài viết..." 
              className="pl-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {publicationTypes.map((type) => (
              <Button
                key={type}
                variant={filterType === type ? "default" : "outline"}
                onClick={() => setFilterType(type)}
                className="min-w-[80px]"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Publications grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPublications.map((publication, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={publication.imageUrl} 
                  alt={publication.title} 
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-2 right-2 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded">
                  {publication.type}
                </span>
              </div>
              <div className="p-5">
                <p className="text-sm text-muted-foreground mb-2">{publication.date}</p>
                <h3 className="text-lg font-semibold mb-3 line-clamp-2">{publication.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">{publication.excerpt}</p>
                <Link to={publication.link} className="inline-flex items-center text-accent hover:text-primary transition-colors font-medium">
                  Đọc tiếp
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {filteredPublications.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold mb-2">Không tìm thấy bài viết phù hợp</h3>
            <p className="text-muted-foreground">Vui lòng thử các từ khóa khác hoặc xem tất cả bài viết</p>
            <Button onClick={() => {setSearchTerm(''); setFilterType('Tất cả');}} className="mt-4">
              Xem tất cả bài viết
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Publications;

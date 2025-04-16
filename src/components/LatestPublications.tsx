
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PublicationProps {
  title: string;
  date: string;
  type: string;
  imageUrl: string;
  link: string;
}

const publications: PublicationProps[] = [
  {
    title: "Công nghệ Inverter tiên tiến: Tối ưu hóa tiêu thụ điện năng trong hệ thống HVAC",
    date: "15 March 2025",
    type: "Báo cáo",
    imageUrl: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1170&h=750&dpr=1",
    link: "/publications/inverter-technology"
  },
  {
    title: "Giải pháp tận dụng nhiệt thải Heat Recovery trong hệ thống công nghiệp",
    date: "27 February 2025",
    type: "Nghiên cứu",
    imageUrl: "https://images.pexels.com/photos/175413/pexels-photo-175413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "/publications/heat-recovery-solutions"
  },
  {
    title: "Tiêu chuẩn công trình xanh: Lợi ích kinh tế và môi trường trong dài hạn",
    date: "10 January 2025",
    type: "Hướng dẫn",
    imageUrl: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1170&h=750&dpr=1",
    link: "/publications/green-building-standards"
  },
  {
    title: "Báo cáo hiệu quả tiết kiệm năng lượng: Phân tích chi phí-lợi ích các công nghệ mới",
    date: "5 December 2024",
    type: "Báo cáo",
    imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    link: "/publications/energy-efficiency-report"
  }
];

const LatestPublications = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container-custom">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <h2 className="mb-4">Bài viết mới nhất</h2>
            <p className="text-muted-foreground max-w-2xl">
              Tham khảo các báo cáo, nghiên cứu và hướng dẫn mới nhất về công nghệ tiết kiệm năng lượng và giải pháp điều hòa không khí hiệu suất cao.
            </p>
          </div>
          <Link to="/publications" className="mt-4 md:mt-0 inline-flex items-center text-accent hover:text-primary transition-colors font-medium">
            Xem tất cả bài viết
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {publications.map((publication, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={publication.imageUrl} 
                  alt={publication.title} 
                  className="w-full h-40 object-cover"
                />
                <span className="absolute top-2 right-2 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded">
                  {publication.type}
                </span>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-2">{publication.date}</p>
                <h3 className="text-base font-medium line-clamp-2 mb-3">{publication.title}</h3>
                <Link to={publication.link} className="inline-flex items-center text-accent hover:text-primary transition-colors text-sm font-medium">
                  Xem thêm
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestPublications;

import { ArrowRight } from 'lucide-react';

interface TopicCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const topics: TopicCardProps[] = [
  {
    title: "Hệ thống điều hòa công nghiệp",
    description: "Giải pháp làm mát cho nhà máy, kho bãi và không gian rộng lớn",
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    link: "/products/industrial"
  },
  {
    title: "Hệ thống lạnh thương mại",
    description: "Thiết bị làm lạnh cho siêu thị, nhà hàng và cửa hàng bán lẻ",
    imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    link: "/products/commercial"
  },
  {
    title: "Giải pháp tiết kiệm năng lượng",
    description: "Công nghệ hiện đại giúp tiết kiệm chi phí và bảo vệ môi trường",
    imageUrl: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    link: "/services"
  }
];

const FeaturedTopics = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <h2 className="mb-4">Sản phẩm nổi bật</h2>
            <p className="text-muted-foreground max-w-2xl">
              Khám phá các giải pháp điện lạnh hàng đầu của chúng tôi, phù hợp với mọi nhu cầu công nghiệp và thương mại.
            </p>
          </div>
          <a href="/products" className="mt-4 md:mt-0 inline-flex items-center text-accent hover:text-primary transition-colors font-medium">
            Xem tất cả sản phẩm
            <ArrowRight size={18} className="ml-2" />
          </a>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img 
                src={topic.imageUrl} 
                alt={topic.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
                <p className="text-muted-foreground mb-4">{topic.description}</p>
                <a href={topic.link} className="inline-flex items-center text-accent hover:text-primary transition-colors font-medium">
                  Tìm hiểu thêm
                  <ArrowRight size={18} className="ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTopics;

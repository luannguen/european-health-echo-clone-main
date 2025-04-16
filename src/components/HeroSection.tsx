
import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface SlideProps {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  link: string;
}

const slides: SlideProps[] = [
  {
    id: 1,
    title: "Hệ thống điện lạnh công nghiệp",
    subtitle: "Giải pháp hiện đại cho mọi quy mô doanh nghiệp",
    imageUrl: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    link: "/products/industrial"
  },
  {
    id: 2,
    title: "Công nghệ tiết kiệm năng lượng",
    subtitle: "Giải pháp xanh cho tương lai bền vững",
    imageUrl: "https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    link: "/technology"
  },
  {
    id: 3,
    title: "Dịch vụ bảo trì chuyên nghiệp",
    subtitle: "Đội ngũ kỹ thuật hàng đầu, phục vụ 24/7",
    imageUrl: "https://images.unsplash.com/photo-1551038247-3d9af20df552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    link: "/services"
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="container-custom h-full flex items-center relative z-20">
            <div className="max-w-2xl text-white">
              <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
              <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
              <a 
                href={slide.link} 
                className="inline-flex items-center btn-secondary font-medium"
              >
                Tìm hiểu thêm
                <ChevronRight size={20} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-white' : 'bg-white/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

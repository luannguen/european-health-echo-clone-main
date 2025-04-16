import { ArrowUpRight, CheckCircle, Cpu, Database, Server, BarChart, Microscope } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// ChipIcon component for lucide-react compatibility
function ChipIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 7h6v10H9z" />
      <path d="M5 3v4" />
      <path d="M9 3v4" />
      <path d="M15 3v4" />
      <path d="M19 3v4" />
      <path d="M5 21v-4" />
      <path d="M9 21v-4" />
      <path d="M15 21v-4" />
      <path d="M19 21v-4" />
      <path d="M3 9h4" />
      <path d="M17 9h4" />
      <path d="M3 15h4" />
      <path d="M17 15h4" />
    </svg>
  );
}

const Technologies = () => {
  // Sample data for technologies
  const technologies = [
    {
      title: "Hệ thống làm lạnh công nghiệp",
      description: "Công nghệ làm lạnh tiên tiến cho nhà máy và cơ sở công nghiệp",
      icon: <Server className="text-primary" />,
      features: [
        "Hệ thống làm lạnh công nghiệp quy mô lớn",
        "Điều khiển nhiệt độ chính xác đến 0.1°C",
        "Tiết kiệm năng lượng lên đến 30%",
        "Khả năng giám sát từ xa qua internet"
      ],
      link: "/technologies/industrial-cooling"
    },
    {
      title: "Điều hòa không khí thương mại",
      description: "Giải pháp điều hòa cho văn phòng và không gian thương mại",
      icon: <Cpu className="text-primary" />,
      features: [
        "Hệ thống VRV/VRF hiện đại",
        "Lọc không khí tiên tiến, loại bỏ 99.9% vi khuẩn",
        "Công nghệ inverter tiết kiệm điện",
        "Kiểm soát độ ẩm chính xác"
      ],
      link: "/technologies/commercial-hvac"
    },
    {
      title: "Thiết bị làm lạnh thực phẩm",
      description: "Công nghệ bảo quản thực phẩm với độ tin cậy cao",
      icon: <ChipIcon className="text-primary" />,
      features: [
        "Duy trì nhiệt độ ổn định cho bảo quản lâu dài",
        "Hệ thống báo động nhiệt độ thời gian thực",
        "Công nghệ làm lạnh nhanh",
        "Tuân thủ tiêu chuẩn HACCP"
      ],
      link: "/technologies/food-refrigeration"
    },
    {
      title: "Hệ thống quản lý năng lượng",
      description: "Giải pháp tối ưu hóa hiệu suất năng lượng cho hệ thống làm lạnh",
      icon: <BarChart className="text-primary" />,
      features: [
        "Phân tích tiêu thụ năng lượng theo thời gian thực",
        "AI tự động điều chỉnh vận hành tối ưu",
        "Báo cáo hiệu suất chi tiết",
        "Giảm chi phí vận hành đến 25%"
      ],
      link: "/technologies/energy-management"
    },
    {
      title: "Thiết bị điều khiển thông minh",
      description: "Bộ điều khiển thông minh tích hợp IoT",
      icon: <Database className="text-primary" />,
      features: [
        "Điều khiển từ xa qua ứng dụng di động",
        "Tích hợp với hệ thống BMS",
        "Cập nhật firmware tự động",
        "Phân tích dữ liệu và báo cáo định kỳ"
      ],
      link: "/technologies/smart-controls"
    },
    {
      title: "Công nghệ làm lạnh xanh",
      description: "Các giải pháp làm lạnh thân thiện với môi trường",
      icon: <Microscope className="text-primary" />,
      features: [
        "Sử dụng môi chất lạnh tự nhiên",
        "Giảm lượng phát thải CO2",
        "Công nghệ thu hồi nhiệt hiệu quả",
        "Đạt tiêu chuẩn môi trường quốc tế"
      ],
      link: "/technologies/green-cooling"
    }
  ];

  // Sample data for equipment categories
  const equipmentCategories = [
    {
      title: "Thiết bị làm lạnh công nghiệp",
      items: ["Hệ thống làm lạnh nước", "Tháp giải nhiệt", "Máy làm lạnh Chiller", "Bộ trao đổi nhiệt"]
    },
    {
      title: "Thiết bị điều hòa không khí",
      items: ["Hệ thống VRF/VRV", "Điều hòa trung tâm", "AHU và FCU", "Điều hòa không khí chính xác"]
    },
    {
      title: "Thiết bị lạnh thương mại",
      items: ["Tủ đông công nghiệp", "Tủ mát siêu thị", "Kho lạnh", "Quầy trưng bày lạnh"]
    },
    {
      title: "Thiết bị phụ trợ",
      items: ["Hệ thống ống đồng", "Van điều khiển", "Cảm biến nhiệt độ", "Thiết bị kiểm soát độ ẩm"]
    }
  ];

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="bg-primary/90 py-16 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-white mb-6">Công nghệ & Thiết bị</h1>
            <p className="text-xl md:text-2xl mb-8">
              Ứng dụng công nghệ hiện đại và các thiết bị tiên tiến nhất trong lĩnh vực kỹ thuật lạnh và điều hòa không khí.
            </p>
            <Button asChild variant="secondary">
              <Link to="/contact">
                Tư vấn giải pháp công nghệ
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Technology Overview */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="mb-6">Công nghệ tiên tiến</h2>
              <p className="text-muted-foreground mb-6">
                VRC luôn đi đầu trong việc ứng dụng các công nghệ tiên tiến nhất trong lĩnh vực kỹ thuật lạnh và điều hòa không khí. Chúng tôi không ngừng nghiên cứu và phát triển để mang đến những giải pháp hiệu quả, tiết kiệm năng lượng và thân thiện với môi trường.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-primary mr-3 mt-1" />
                  <span>Công nghệ tiết kiệm năng lượng đạt chuẩn quốc tế</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-primary mr-3 mt-1" />
                  <span>Tích hợp IoT và hệ thống quản lý thông minh</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-primary mr-3 mt-1" />
                  <span>Giải pháp thân thiện với môi trường, giảm phát thải carbon</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-primary mr-3 mt-1" />
                  <span>Hệ thống giám sát và điều khiển từ xa hiện đại</span>
                </li>
              </ul>
            </div>
            <div>
              <img 
                src="/lovable-uploads/0bd3c048-8e37-4775-a6bc-0b54ec07edbe.png"
                alt="Công nghệ kỹ thuật lạnh tiên tiến" 
                className="rounded-lg shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                  e.currentTarget.alt = "Placeholder image";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-12 bg-muted">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="mb-4">Công nghệ hiện đại</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Khám phá các công nghệ tiên tiến được VRC áp dụng trong các giải pháp kỹ thuật lạnh và điều hòa không khí.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <Card key={index} className="transition-all hover:shadow-md">
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    {tech.icon}
                  </div>
                  <CardTitle>{tech.title}</CardTitle>
                  <CardDescription>{tech.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tech.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to={tech.link} className="text-primary hover:text-accent flex items-center">
                    Chi tiết
                    <ArrowUpRight size={16} className="ml-1" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <h2 className="mb-10 text-center">Danh mục thiết bị</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {equipmentCategories.map((category, index) => (
              <div key={index} className="rounded-lg border border-muted p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">{category.title}</h3>
                <ul className="space-y-3">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle size={16} className="text-primary mr-3 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12 bg-muted/50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="mb-4">Đối tác công nghệ</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi hợp tác với các thương hiệu hàng đầu thế giới để mang đến những giải pháp công nghệ tốt nhất.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-4 flex items-center justify-center h-24 shadow-sm">
                <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-muted-foreground">
                  Logo đối tác {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-accent/10">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="mb-6">Tìm hiểu giải pháp công nghệ phù hợp</h2>
            <p className="text-muted-foreground mb-8">
              Hãy liên hệ với chúng tôi ngay hôm nay để được tư vấn về các giải pháp công nghệ và thiết bị phù hợp với nhu cầu của doanh nghiệp bạn.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild>
                <Link to="/contact">Liên hệ tư vấn</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/projects">Xem dự án thực tế</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Technologies;
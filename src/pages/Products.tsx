import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import AppLink from "@/components/ui/app-link";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  features: string[];
  specifications?: Record<string, string>;
  price?: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

// Danh sách sản phẩm trong lĩnh vực kỹ thuật lạnh
const productsData: Product[] = [
  {
    id: 1,
    name: "Điều hòa công nghiệp VRC-5000",
    description: "Hệ thống điều hòa công nghiệp công suất lớn, phù hợp cho nhà xưởng, nhà máy sản xuất",
    category: "industrial",
    imageUrl: "/assets/images/projects-overview.jpg",
    features: ["Công suất làm lạnh: 50.000 BTU", "Tiết kiệm điện năng 40%", "Vận hành êm ái", "Điều khiển thông minh từ xa"],
    specifications: {
      "Công suất làm lạnh": "50.000 BTU/h",
      "Công suất điện tiêu thụ": "4.8kW",
      "Nguồn điện": "380V-415V/3Ph/50Hz",
      "Độ ồn": "55dB(A)",
      "Kích thước (DxRxC)": "1800x900x1950mm",
      "Khối lượng": "320kg",
      "Gas làm lạnh": "R410A",
      "Xuất xứ": "Việt Nam"
    },
    price: "Liên hệ",
    isNew: true
  },
  {
    id: 2,
    name: "Kho lạnh bảo quản VRC-KL500",
    description: "Kho lạnh công nghiệp lắp đặt nhanh chóng, bảo quản thực phẩm, dược phẩm với nhiệt độ ổn định",
    category: "cold-storage",
    imageUrl: "/assets/images/service-overview.jpg",
    features: ["Diện tích: 50-500m²", "Nhiệt độ: -30°C đến +20°C", "Panel cách nhiệt PU 100mm", "Hệ thống điều khiển tự động"],
    specifications: {
      "Diện tích": "50-500m²",
      "Nhiệt độ làm việc": "-30°C đến +20°C",
      "Panel cách nhiệt": "PU 100mm",
      "Độ dày": "100mm",
      "Khối lượng panel": "12kg/m²",
      "Cửa kho lạnh": "Cửa trượt/cửa mở",
      "Hệ thống điều khiển": "Tự động, giám sát từ xa",
      "Xuất xứ": "Việt Nam"
    },
    price: "Liên hệ",
    isBestseller: true
  },
  {
    id: 3,
    name: "Máy làm lạnh nước công nghiệp VRC-Chiller",
    description: "Hệ thống làm lạnh nước trung tâm cho nhà máy sản xuất, cao ốc văn phòng",
    category: "chiller",
    imageUrl: "/lovable-uploads/0bd3c048-8e37-4775-a6bc-0b54ec07edbe.png",
    features: ["Công suất: 30-1000RT", "Hiệu suất năng lượng cao", "Vận hành ổn định", "Hệ thống khởi động mềm"],
    specifications: {
      "Công suất làm lạnh": "30-1000RT",
      "Công suất tiêu thụ": "0.65kW/RT",
      "Gas làm lạnh": "R134a/R407C/R410A",
      "Nhiệt độ nước đầu ra": "5°C ~ 15°C",
      "Điện áp vận hành": "380V-415V/3Ph/50Hz",
      "Kiểu máy nén": "Scroll/Screw",
      "Hệ thống điều khiển": "Màn hình cảm ứng, kết nối BMS",
      "Xuất xứ": "Liên doanh Việt-Đức"
    },
    price: "Liên hệ"
  },
  {
    id: 4,
    name: "Điều hòa dân dụng VRC Smart Inverter",
    description: "Điều hòa tiết kiệm năng lượng, thông minh cho gia đình và văn phòng nhỏ",
    category: "residential",
    imageUrl: "/assets/images/projects-overview.jpg",
    features: ["Công nghệ Inverter", "Lọc không khí kháng khuẩn", "Kết nối WiFi", "Tiết kiệm điện đến 60%"],
    specifications: {
      "Công suất làm lạnh": "9.000 - 24.000 BTU",
      "Chế độ": "Làm lạnh/Sưởi ấm",
      "Công nghệ": "DC Inverter",
      "Gas làm lạnh": "R32 thân thiện môi trường",
      "Hiệu suất năng lượng": "CSPF 5.8",
      "Độ ồn dàn lạnh": "18-36dB",
      "Kết nối": "WiFi, điều khiển qua smartphone",
      "Xuất xứ": "Việt Nam"
    },
    price: "8.500.000 - 15.900.000 VNĐ",
    isNew: true,
    isBestseller: true
  },
  {
    id: 5,
    name: "Tháp giải nhiệt VRC-CT250",
    description: "Tháp giải nhiệt công nghiệp cho nhà máy sản xuất và hệ thống điều hòa trung tâm",
    category: "auxiliary",
    imageUrl: "/assets/images/service-overview.jpg",
    features: ["Công suất: 50-1000RT", "Thiết kế chống ăn mòn", "Quạt tiết kiệm điện", "Dễ dàng bảo trì"],
    specifications: {
      "Công suất giải nhiệt": "50-1000RT",
      "Vật liệu thân": "FRP chống ăn mòn",
      "Vật liệu tấm tản nhiệt": "PVC chống UV",
      "Năng lượng tiêu thụ": "0.03-0.05kW/RT",
      "Độ ồn": "65-75dB",
      "Trọng lượng hoạt động": "2000-25000kg",
      "Xuất xứ": "Việt Nam"
    },
    price: "Liên hệ"
  },
  {
    id: 6,
    name: "Hệ thống thông gió VRC-Ventilation",
    description: "Hệ thống thông gió và lọc không khí công nghiệp cho nhà xưởng, tòa nhà",
    category: "auxiliary",
    imageUrl: "/assets/images/projects-overview.jpg",
    features: ["Lưu lượng: 1.000-100.000 m³/h", "Tiết kiệm năng lượng", "Điều khiển tự động", "Lọc không khí hiệu quả"],
    specifications: {
      "Lưu lượng gió": "1.000-100.000 m³/h",
      "Áp suất tĩnh": "100-2000 Pa",
      "Công suất tiêu thụ": "0.75-75kW",
      "Vật liệu quạt": "Thép mạ kẽm/thép không gỉ",
      "Loại quạt": "Ly tâm/Hướng trục",
      "Lọc không khí": "G4, F7, HEPA (tùy chọn)",
      "Điều khiển": "Biến tần, cảm biến CO2, nhiệt độ",
      "Xuất xứ": "Việt Nam"
    },
    price: "Liên hệ"
  },
  {
    id: 7,
    name: "Hệ thống VRV/VRF VRC-Multi",
    description: "Hệ thống điều hòa đa cục, phù hợp cho các tòa nhà văn phòng, khách sạn, trung tâm thương mại",
    category: "commercial",
    imageUrl: "/lovable-uploads/0bd3c048-8e37-4775-a6bc-0b54ec07edbe.png",
    features: ["Điều khiển độc lập từng phòng", "Tiết kiệm năng lượng", "Vận hành êm ái", "Lắp đặt linh hoạt"],
    specifications: {
      "Công suất làm lạnh": "8HP - 60HP",
      "Số dàn lạnh tối đa": "64 dàn",
      "Gas làm lạnh": "R410A",
      "Chiều dài đường ống tối đa": "165m",
      "Chênh lệch độ cao tối đa": "90m",
      "IPLV": "6.8",
      "Kết nối BMS": "LonWorks, BACnet, Modbus",
      "Xuất xứ": "Liên doanh Việt-Nhật"
    },
    price: "Liên hệ",
    isNew: true
  },
  {
    id: 8,
    name: "Hệ thống lọc bụi công nghiệp VRC-DustFilter",
    description: "Hệ thống lọc bụi và khí thải công nghiệp cho nhà máy sản xuất",
    category: "auxiliary",
    imageUrl: "/assets/images/service-overview.jpg",
    features: ["Hiệu suất lọc > 99%", "Tự động làm sạch", "Tuổi thọ cao", "Giám sát từ xa"],
    specifications: {
      "Lưu lượng xử lý": "1.000-100.000 m³/h",
      "Hiệu suất lọc": ">99%",
      "Kích thước hạt lọc": "0.3-100 μm",
      "Áp suất tĩnh": "1500-3000 Pa",
      "Công suất tiêu thụ": "1.5-90kW",
      "Phương pháp làm sạch": "Khí nén/Cơ học",
      "Vật liệu lọc": "Polyester/PTFE",
      "Xuất xứ": "Việt Nam"
    },
    price: "Liên hệ"
  }
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const filteredProducts = activeCategory === "all" 
    ? productsData 
    : productsData.filter(product => product.category === activeCategory);

  return (
    <main className="flex-grow">
      {/* Banner */}
      <div className="bg-gradient-to-b from-primary/10 to-transparent py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">Sản Phẩm</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            VRC cung cấp các giải pháp và thiết bị kỹ thuật lạnh đa dạng, từ hệ thống điều hòa không khí, kho lạnh đến các giải pháp làm lạnh công nghiệp tiên tiến
          </p>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="container mx-auto py-12 px-4">
        <Tabs defaultValue="all" className="mb-10">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-8">
            <TabsTrigger value="all" onClick={() => setActiveCategory("all")}>Tất cả</TabsTrigger>
            <TabsTrigger value="industrial" onClick={() => setActiveCategory("industrial")}>Công nghiệp</TabsTrigger>
            <TabsTrigger value="commercial" onClick={() => setActiveCategory("commercial")}>Thương mại</TabsTrigger>
            <TabsTrigger value="residential" onClick={() => setActiveCategory("residential")}>Dân dụng</TabsTrigger>
            <TabsTrigger value="cold-storage" onClick={() => setActiveCategory("cold-storage")}>Kho lạnh</TabsTrigger>
            <TabsTrigger value="auxiliary" onClick={() => setActiveCategory("auxiliary")}>Phụ trợ</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeCategory} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="h-60 w-full bg-gray-100 flex items-center justify-center relative overflow-hidden">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform hover:scale-105" />
                    {product.isNew && (
                      <Badge className="absolute top-3 right-3 bg-green-600">Mới</Badge>
                    )}
                    {product.isBestseller && (
                      <Badge className="absolute top-3 left-3 bg-amber-600">Bán chạy</Badge>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      {product.price && (
                        <div className="text-primary font-semibold">{product.price}</div>
                      )}
                    </div>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-medium mb-2">Tính năng nổi bật:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setSelectedProduct(product)}>
                      Thông số kỹ thuật
                    </Button>                    <Button>
                      <AppLink routeKey="CONTACT" query={{ product: product.id.toString() }}>
                        Yêu cầu báo giá
                      </AppLink>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Thông số kỹ thuật */}
        {selectedProduct && selectedProduct.specifications && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-primary">{selectedProduct.name}</h3>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedProduct(null)}>
                    Đóng
                  </Button>
                </div>
                <h4 className="font-medium mb-4 text-lg">Thông số kỹ thuật</h4>
                <div className="overflow-hidden rounded border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="divide-y divide-gray-200">
                      {Object.entries(selectedProduct.specifications).map(([key, value], index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-6 py-3 text-sm font-medium">{key}</td>
                          <td className="px-6 py-3 text-sm">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end mt-6">
                  <Button onClick={() => setSelectedProduct(null)}>
                    Đóng
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Đăng ký tư vấn */}
        <section className="mt-16 bg-gradient-to-r from-primary/10 to-transparent p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-primary">Yêu cầu tư vấn sản phẩm</h2>
          <p className="mb-6 text-muted-foreground">
            Bạn cần tư vấn về giải pháp kỹ thuật lạnh phù hợp cho công trình hay doanh nghiệp của mình? 
            Đội ngũ kỹ sư và chuyên gia của VRC sẵn sàng hỗ trợ bạn lựa chọn giải pháp tối ưu.
          </p>          <Button size="lg" variant="default">
            <AppLink routeKey="CONTACT">
              Liên hệ tư vấn
            </AppLink>
          </Button>
        </section>

        {/* Câu hỏi thường gặp */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-primary">Câu hỏi thường gặp</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Làm thế nào để chọn công suất điều hòa phù hợp?</AccordionTrigger>
              <AccordionContent>
                Để chọn công suất điều hòa phù hợp, bạn cần tính toán dựa trên diện tích phòng, số người sử dụng, hướng phòng, 
                thiết bị sinh nhiệt trong phòng và vị trí địa lý. Thông thường, cần 9.000 BTU cho phòng 15m², 
                12.000 BTU cho phòng 20m², 18.000 BTU cho phòng 30m². Với không gian công nghiệp hoặc thương mại, 
                VRC có đội ngũ kỹ sư sẽ tính toán chi tiết và đề xuất giải pháp tối ưu.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Thời gian bảo hành cho các sản phẩm của VRC là bao lâu?</AccordionTrigger>
              <AccordionContent>
                VRC cung cấp chế độ bảo hành 24 tháng cho tất cả các sản phẩm điều hòa dân dụng, 
                36 tháng đối với máy nén của hệ thống VRV/VRF, và 12 tháng đối với các thiết bị công nghiệp. 
                Ngoài ra, chúng tôi có các gói bảo trì và gia hạn bảo hành để đảm bảo hệ thống của bạn 
                luôn vận hành ổn định và hiệu quả trong suốt vòng đời sản phẩm.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Chi phí lắp đặt hệ thống kho lạnh phụ thuộc vào yếu tố nào?</AccordionTrigger>
              <AccordionContent>
                Chi phí lắp đặt kho lạnh phụ thuộc vào nhiều yếu tố như: diện tích kho, nhiệt độ yêu cầu, 
                loại hàng hóa cần bảo quản, độ dày panel cách nhiệt, hệ thống điện, hệ thống giám sát, 
                và các trang thiết bị đi kèm. VRC cung cấp giải pháp kho lạnh theo yêu cầu cụ thể 
                của từng khách hàng với mức giá cạnh tranh nhất trên thị trường.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Làm thế nào để tiết kiệm điện năng khi sử dụng điều hòa?</AccordionTrigger>
              <AccordionContent>
                Để tiết kiệm điện năng khi sử dụng điều hòa, bạn nên: 
                (1) Chọn điều hòa có công nghệ Inverter, 
                (2) Đặt nhiệt độ ở mức 25-26°C, 
                (3) Bảo dưỡng định kỳ 6 tháng/lần, 
                (4) Sử dụng quạt kết hợp với điều hòa, 
                (5) Tắt điều hòa khi không sử dụng, 
                (6) Cách nhiệt tốt cho phòng/công trình, và 
                (7) Lắp đặt hệ thống điều khiển thông minh để tối ưu hóa việc sử dụng.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>VRC có cung cấp dịch vụ bảo trì định kỳ không?</AccordionTrigger>
              <AccordionContent>
                Có, VRC cung cấp các gói dịch vụ bảo trì định kỳ cho tất cả các sản phẩm kỹ thuật lạnh. 
                Chúng tôi có đội ngũ kỹ thuật viên được đào tạo chuyên nghiệp, sẵn sàng phục vụ 24/7. 
                Các gói bảo trì bao gồm vệ sinh thiết bị, kiểm tra an toàn, tối ưu hóa vận hành, 
                và thay thế vật tư tiêu hao theo định kỳ. Hợp đồng bảo trì dài hạn sẽ được hưởng 
                chính sách ưu đãi đặc biệt và ưu tiên xử lý sự cố.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </main>
  );
};

export default Products;
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import AppLink from "@/components/ui/app-link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackToTop from "@/components/BackToTop";
import TopContact from "@/components/TopContact";

const ResidentialProducts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopContact />
      <Header />
      
      <main className="flex-grow">
        {/* Banner */}
        <div className="bg-gradient-to-b from-primary to-primary/80 text-white py-12 md:py-16">
          <div className="container mx-auto px-4">            <div className="flex items-center text-sm mb-4">
              <AppLink routeKey="HOME" className="hover:underline">Trang chủ</AppLink>
              <ArrowRight size={14} className="mx-2" />
              <AppLink routeKey="PRODUCTS" className="hover:underline">Sản phẩm</AppLink>
              <ArrowRight size={14} className="mx-2" />
              <span>Sản phẩm dân dụng</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Điều Hòa Dân Dụng</h1>
            <p className="mt-4 text-lg max-w-3xl">
              Giải pháp điều hòa không khí hiện đại, tiết kiệm năng lượng và thông minh cho gia đình và văn phòng của bạn.
            </p>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="container mx-auto py-12 px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Điều Hòa VRC Smart Inverter</h2>
              
              <div className="bg-gray-100 p-4 rounded-lg mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1499573550747-98de39d9ad77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Điều hòa VRC Smart Inverter" 
                  className="w-full h-auto rounded-lg mb-4"
                />
                <div className="grid grid-cols-4 gap-2">
                  <img 
                    src="https://images.unsplash.com/photo-1499573550747-98de39d9ad77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                    alt="Điều hòa VRC Smart Inverter - 1" 
                    className="w-full h-24 object-cover rounded cursor-pointer"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1551522975-36a6e66a35d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                    alt="Điều hòa VRC Smart Inverter - 2" 
                    className="w-full h-24 object-cover rounded cursor-pointer"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1577552568192-467fa6c70aa0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                    alt="Điều hòa VRC Smart Inverter - 3" 
                    className="w-full h-24 object-cover rounded cursor-pointer"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                    alt="Điều hòa VRC Smart Inverter - Ứng dụng" 
                    className="w-full h-24 object-cover rounded cursor-pointer"
                  />
                </div>
              </div>

              <Tabs defaultValue="overview" className="mb-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                  <TabsTrigger value="specs">Thông số kỹ thuật</TabsTrigger>
                  <TabsTrigger value="documents">Tài liệu</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6">
                  <div className="space-y-4">
                    <p>
                      Điều hòa VRC Smart Inverter là giải pháp điều hòa không khí tiết kiệm năng lượng và thông minh dành cho gia đình và văn phòng. 
                      Sử dụng công nghệ Inverter tiên tiến, sản phẩm có khả năng tiết kiệm điện năng lên đến 60% so với các dòng điều hòa thông thường, 
                      đồng thời vẫn đảm bảo hiệu suất làm lạnh tối ưu.
                    </p>
                    <p>
                      Được thiết kế với chức năng lọc không khí kháng khuẩn hiệu quả cao, điều hòa VRC Smart Inverter không chỉ làm mát 
                      không gian sống mà còn góp phần tạo ra môi trường không khí trong lành, bảo vệ sức khỏe người dùng. 
                      Công nghệ lọc đa tầng giúp loại bỏ bụi mịn, phấn hoa, vi khuẩn và mùi hôi, mang lại không khí trong lành.
                    </p>
                    <p>
                      Đặc biệt, điều hòa VRC Smart Inverter tích hợp khả năng kết nối WiFi, cho phép người dùng điều khiển thiết bị mọi lúc, 
                      mọi nơi thông qua smartphone. Ứng dụng điều khiển thông minh còn hỗ trợ các tính năng như lập lịch, theo dõi mức tiêu thụ điện năng, 
                      và điều chỉnh chế độ hoạt động tối ưu dựa trên thói quen sử dụng.
                    </p>

                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">Tính năng nổi bật</h3>
                      <ul className="grid gap-3">
                        <li className="flex items-start">
                          <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Công nghệ DC Inverter tiết kiệm điện đến 60% so với điều hòa thông thường</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Hệ thống lọc không khí kháng khuẩn, loại bỏ bụi mịn và các chất gây dị ứng</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Kết nối WiFi, điều khiển từ xa qua smartphone với ứng dụng chuyên dụng</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Vận hành siêu êm với độ ồn chỉ từ 18dB, đảm bảo giấc ngủ ngon</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Chế độ làm lạnh nhanh, đạt nhiệt độ mong muốn chỉ trong vài phút</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Chế độ sưởi ấm cho mùa đông, phù hợp với khí hậu nhiều vùng miền</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Sử dụng gas R32 thân thiện với môi trường, không gây hại tầng ozone</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">Ứng dụng</h3>
                      <p>Điều hòa VRC Smart Inverter phù hợp với nhiều không gian như:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Phòng khách và phòng ngủ trong gia đình</li>
                        <li>Căn hộ chung cư và nhà phố</li>
                        <li>Văn phòng làm việc quy mô nhỏ và vừa</li>
                        <li>Phòng họp và không gian làm việc chung</li>
                        <li>Shop thời trang và cửa hàng bán lẻ</li>
                        <li>Phòng khách sạn và nhà nghỉ</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="specs" className="mt-6">
                  <div className="overflow-hidden rounded border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thông số</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá trị</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Công suất làm lạnh</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">9.000 - 24.000 BTU</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Chế độ</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">Làm lạnh/Sưởi ấm</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Công nghệ</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">DC Inverter</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Gas làm lạnh</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">R32 thân thiện môi trường</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Hiệu suất năng lượng</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">CSPF 5.8</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Độ ồn dàn lạnh</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">18-36dB</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Kết nối</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">WiFi, điều khiển qua smartphone</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Xuất xứ</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">Việt Nam</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Bảo hành</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">24 tháng</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="documents" className="mt-6">
                  <div className="space-y-4">
                    <p>Tải xuống các tài liệu kỹ thuật và hướng dẫn sử dụng:</p>
                    
                    <div className="grid gap-4">
                      <div className="p-4 border rounded-lg flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Hướng dẫn sử dụng điều hòa VRC Smart Inverter</h4>
                          <p className="text-sm text-muted-foreground">PDF - 2.1MB</p>
                        </div>
                        <Button variant="outline">Tải xuống</Button>
                      </div>
                      
                      <div className="p-4 border rounded-lg flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Hướng dẫn lắp đặt điều hòa VRC Smart Inverter</h4>
                          <p className="text-sm text-muted-foreground">PDF - 3.4MB</p>
                        </div>
                        <Button variant="outline">Tải xuống</Button>
                      </div>
                      
                      <div className="p-4 border rounded-lg flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Catalog điều hòa VRC Smart Inverter</h4>
                          <p className="text-sm text-muted-foreground">PDF - 1.8MB</p>
                        </div>
                        <Button variant="outline">Tải xuống</Button>
                      </div>
                      
                      <div className="p-4 border rounded-lg flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Hướng dẫn sử dụng ứng dụng điều khiển từ xa</h4>
                          <p className="text-sm text-muted-foreground">PDF - 1.2MB</p>
                        </div>
                        <Button variant="outline">Tải xuống</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              {/* Form yêu cầu báo giá */}
              <Card className="mb-8 sticky top-20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Yêu cầu báo giá</h3>
                  <p className="text-muted-foreground mb-6">Liên hệ với chuyên viên tư vấn của chúng tôi để nhận báo giá chi tiết</p>
                  
                  <div className="mt-6 space-y-6">
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-medium mb-2">VRC Smart Inverter</h4>
                      <p className="text-xl font-semibold text-primary">Từ 8.500.000 VNĐ</p>
                    </div>
                      <Button className="w-full">
                      <AppLink routeKey="CONTACT" query={{ product: "vrc-smart-inverter" }}>
                        Yêu cầu báo giá ngay
                      </AppLink>
                    </Button>
                      <Button variant="outline" className="w-full">
                      <a href="tel:+84987654321">
                        Gọi ngay: 0987 654 321
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Sản phẩm liên quan */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Sản phẩm khác</h3>
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden flex">
                    <div className="w-1/3 bg-gray-200">
                      <img 
                        src="https://images.unsplash.com/photo-1527149074866-a9733dcc96e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                        alt="Hệ thống VRV/VRF VRC-Multi" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 w-2/3">
                      <h4 className="font-medium mb-1">Hệ thống VRV/VRF VRC-Multi</h4>                      <p className="text-sm text-muted-foreground mb-2">Điều hòa thương mại</p>
                      <AppLink routeKey="PRODUCTS_COMMERCIAL" className="text-primary hover:underline text-sm">
                        Xem chi tiết
                      </AppLink>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden flex">
                    <div className="w-1/3 bg-gray-200">
                      <img 
                        src="https://images.unsplash.com/photo-1615252302352-667966ed2e18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                        alt="Điều hòa công nghiệp VRC-5000" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 w-2/3">
                      <h4 className="font-medium mb-1">Điều hòa công nghiệp VRC-5000</h4>
                      <p className="text-sm text-muted-foreground mb-2">Điều hòa công nghiệp</p>
                      <Link to="/products/industrial" className="text-primary hover:underline text-sm">
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden flex">
                    <div className="w-1/3 bg-gray-200">
                      <img 
                        src="https://images.unsplash.com/photo-1582891420766-5d7fb480ada3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                        alt="Hệ thống thông gió VRC-Ventilation" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 w-2/3">
                      <h4 className="font-medium mb-1">Hệ thống thông gió VRC-Ventilation</h4>
                      <p className="text-sm text-muted-foreground mb-2">Hệ thống phụ trợ</p>
                      <Link to="/products/auxiliary" className="text-primary hover:underline text-sm">
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Dự án đã thực hiện */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Dự án đã thực hiện</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Chung cư cao cấp Star Heights" 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Chung cư cao cấp Star Heights</h3>
                  <p className="text-muted-foreground mb-4">
                    Cung cấp và lắp đặt 500 bộ điều hòa Smart Inverter cho các căn hộ cao cấp
                  </p>
                  <Link to="/projects/commercial" className="text-primary hover:underline flex items-center">
                    Xem chi tiết
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Văn phòng Green Office" 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Văn phòng Green Office</h3>
                  <p className="text-muted-foreground mb-4">
                    Lắp đặt 25 bộ điều hòa Smart Inverter cho văn phòng làm việc hiện đại
                  </p>
                  <Link to="/projects/commercial" className="text-primary hover:underline flex items-center">
                    Xem chi tiết
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1576495169018-bd2414046c6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Chuỗi nhà hàng FastFood" 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Chuỗi nhà hàng FastFood</h3>
                  <p className="text-muted-foreground mb-4">
                    Cung cấp giải pháp điều hòa tiết kiệm năng lượng cho 15 nhà hàng trên toàn quốc
                  </p>
                  <Link to="/projects/commercial" className="text-primary hover:underline flex items-center">
                    Xem chi tiết
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default ResidentialProducts;
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackToTop from "@/components/BackToTop";
import TopContact from "@/components/TopContact";

const AuxiliaryProducts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopContact />
      <Header />
      
      <main className="flex-grow">
        {/* Banner */}
        <div className="bg-gradient-to-b from-primary to-primary/80 text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm mb-4">
              <Link to="/" className="hover:underline">Trang chủ</Link>
              <ArrowRight size={14} className="mx-2" />
              <Link to="/products" className="hover:underline">Sản phẩm</Link>
              <ArrowRight size={14} className="mx-2" />
              <span>Sản phẩm phụ trợ</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Hệ Thống Thông Gió và Phụ Trợ</h1>
            <p className="mt-4 text-lg max-w-3xl">
              Giải pháp thông gió, lọc không khí và các thiết bị phụ trợ chất lượng cao, bổ sung hiệu quả cho hệ thống điều hòa không khí.
            </p>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="container mx-auto py-12 px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Hệ Thống Thông Gió VRC-Ventilation</h2>
              
              <div className="bg-gray-100 p-4 rounded-lg mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1582891420766-5d7fb480ada3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Hệ thống thông gió VRC-Ventilation" 
                  className="w-full h-auto rounded-lg mb-4"
                />
                <div className="grid grid-cols-4 gap-2">
                  <img 
                    src="https://images.unsplash.com/photo-1582891420766-5d7fb480ada3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                    alt="Hệ thống thông gió VRC-Ventilation - 1" 
                    className="w-full h-24 object-cover rounded cursor-pointer"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1563501045771-07d988aa4cd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                    alt="Hệ thống thông gió VRC-Ventilation - 2" 
                    className="w-full h-24 object-cover rounded cursor-pointer"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1627745193246-1fa1c9404b21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                    alt="Hệ thống thông gió VRC-Ventilation - 3" 
                    className="w-full h-24 object-cover rounded cursor-pointer"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1599696848652-f0d25ed9c226?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                    alt="Hệ thống thông gió VRC-Ventilation - Ứng dụng" 
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
                      Hệ thống thông gió VRC-Ventilation là giải pháp tối ưu để cải thiện chất lượng không khí và đảm bảo lưu thông không khí hiệu quả 
                      trong các không gian công nghiệp, thương mại và dân dụng. Hệ thống được thiết kế để hoạt động độc lập hoặc kết hợp với các hệ thống 
                      điều hòa không khí, tạo ra môi trường làm việc và sinh hoạt khỏe mạnh, thoải mái.
                    </p>
                    <p>
                      Bằng việc sử dụng công nghệ quạt tiên tiến với động cơ EC (Electronically Commutated) tiết kiệm năng lượng, 
                      hệ thống VRC-Ventilation đạt hiệu suất vận hành cao trong khi vẫn đảm bảo vận hành êm ái và tiết kiệm điện năng. 
                      Hệ thống còn được trang bị bộ lọc không khí đa tầng, giúp loại bỏ bụi mịn, phấn hoa, vi khuẩn và các chất gây ô nhiễm khác 
                      trước khi không khí được đưa vào không gian sử dụng.
                    </p>
                    <p>
                      Với khả năng kiểm soát lưu lượng gió thông minh, hệ thống tự động điều chỉnh công suất dựa trên chất lượng không khí 
                      và nhu cầu thông gió thực tế, đảm bảo môi trường luôn trong lành mà không lãng phí năng lượng. 
                      Hệ thống có thể được điều khiển từ xa thông qua smartphone hoặc tích hợp với hệ thống quản lý tòa nhà (BMS), 
                      mang lại sự thuận tiện tối đa cho người sử dụng.
                    </p>

                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">Tính năng nổi bật</h3>
                      <ul className="grid gap-3">
                        <li className="flex items-start">
                          <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Công nghệ quạt EC tiết kiệm điện năng lên đến 50% so với quạt thông thường</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Hệ thống lọc không khí đa tầng với bộ lọc HEPA H13 loại bỏ đến 99.97% hạt bụi mịn PM2.5</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Vận hành êm ái với độ ồn thấp, phù hợp cho mọi không gian</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Cảm biến chất lượng không khí thông minh, tự động điều chỉnh lưu lượng gió</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Điều khiển từ xa qua smartphone và tích hợp với hệ thống BMS</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Hệ thống thu hồi nhiệt (Heat Recovery) giúp tiết kiệm chi phí điều hòa không khí</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Thiết kế module linh hoạt, dễ dàng mở rộng theo nhu cầu</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">Ứng dụng</h3>
                      <p>Hệ thống thông gió VRC-Ventilation phù hợp với nhiều không gian như:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Nhà xưởng sản xuất và nhà máy công nghiệp</li>
                        <li>Tòa nhà văn phòng và trung tâm thương mại</li>
                        <li>Bệnh viện và cơ sở y tế</li>
                        <li>Nhà hàng, khách sạn và không gian công cộng</li>
                        <li>Trường học và cơ sở giáo dục</li>
                        <li>Khu dân cư và chung cư cao cấp</li>
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Lưu lượng gió</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">500 - 25,000 m³/h</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Công nghệ quạt</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">EC (Electronically Commutated)</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Hiệu suất lọc</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">HEPA H13 (99.97%)</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Áp suất tĩnh</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">50 - 500 Pa</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Công suất điện</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">0.25 - 5.5 kW</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Nguồn điện</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">220V/1Ph/50Hz hoặc 380V/3Ph/50Hz</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Độ ồn</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">35 - 65 dB(A)</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Kết nối</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">WiFi, Modbus, BACnet</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Xuất xứ</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">Việt Nam</td>
                        </tr>
                        <tr className="bg-gray-50">
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
                          <h4 className="font-medium">Hướng dẫn sử dụng hệ thống thông gió VRC-Ventilation</h4>
                          <p className="text-sm text-muted-foreground">PDF - 2.8MB</p>
                        </div>
                        <Button variant="outline">Tải xuống</Button>
                      </div>
                      
                      <div className="p-4 border rounded-lg flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Hướng dẫn lắp đặt hệ thống thông gió VRC-Ventilation</h4>
                          <p className="text-sm text-muted-foreground">PDF - 4.1MB</p>
                        </div>
                        <Button variant="outline">Tải xuống</Button>
                      </div>
                      
                      <div className="p-4 border rounded-lg flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Catalog hệ thống thông gió VRC-Ventilation</h4>
                          <p className="text-sm text-muted-foreground">PDF - 3.2MB</p>
                        </div>
                        <Button variant="outline">Tải xuống</Button>
                      </div>
                      
                      <div className="p-4 border rounded-lg flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Tài liệu tính toán và thiết kế hệ thống thông gió</h4>
                          <p className="text-sm text-muted-foreground">PDF - 2.5MB</p>
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
                      <h4 className="font-medium mb-2">VRC-Ventilation</h4>
                      <p className="text-xl font-semibold text-primary">Liên hệ để nhận giá</p>
                    </div>
                    
                    <Button className="w-full" asChild>
                      <Link to="/contact?product=vrc-ventilation">
                        Yêu cầu báo giá ngay
                      </Link>
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <Link to="tel:+84987654321">
                        Gọi ngay: 0987 654 321
                      </Link>
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
                        src="https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                        alt="Kho lạnh bảo quản VRC-KL500" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 w-2/3">
                      <h4 className="font-medium mb-1">Kho lạnh bảo quản VRC-KL500</h4>
                      <p className="text-sm text-muted-foreground mb-2">Kho lạnh công nghiệp</p>
                      <Link to="/products/cold-storage" className="text-primary hover:underline text-sm">
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden flex">
                    <div className="w-1/3 bg-gray-200">
                      <img 
                        src="https://images.unsplash.com/photo-1499573550747-98de39d9ad77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                        alt="Điều hòa dân dụng VRC Smart Inverter" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 w-2/3">
                      <h4 className="font-medium mb-1">Điều hòa VRC Smart Inverter</h4>
                      <p className="text-sm text-muted-foreground mb-2">Điều hòa dân dụng</p>
                      <Link to="/products/residential" className="text-primary hover:underline text-sm">
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
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Nhà máy sản xuất ABC" 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Nhà máy sản xuất ABC</h3>
                  <p className="text-muted-foreground mb-4">
                    Thiết kế và lắp đặt hệ thống thông gió công nghiệp cho nhà máy diện tích 5,000m²
                  </p>
                  <Link to="/projects/industrial" className="text-primary hover:underline flex items-center">
                    Xem chi tiết
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1590086782957-93c06ef21604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Trung tâm thương mại Mega Mall" 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Trung tâm thương mại Mega Mall</h3>
                  <p className="text-muted-foreground mb-4">
                    Cung cấp hệ thống thông gió và lọc không khí cho TTTM với 50,000 lượt khách mỗi ngày
                  </p>
                  <Link to="/projects/commercial" className="text-primary hover:underline flex items-center">
                    Xem chi tiết
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1607746309150-d7a860563210?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Bệnh viện ĐK Sunshine" 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Bệnh viện ĐK Sunshine</h3>
                  <p className="text-muted-foreground mb-4">
                    Lắp đặt hệ thống thông gió và lọc không khí đạt tiêu chuẩn y tế cho bệnh viện 500 giường
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

export default AuxiliaryProducts;
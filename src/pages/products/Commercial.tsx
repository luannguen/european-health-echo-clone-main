import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CommercialProducts = () => {
  return (
    <>
      {/* Banner */}
      <div className="bg-gradient-to-b from-primary to-primary/80 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm mb-4">
            <Link to="/" className="hover:underline">Trang chủ</Link>
            <ArrowRight size={14} className="mx-2" />
            <Link to="/products" className="hover:underline">Sản phẩm</Link>
            <ArrowRight size={14} className="mx-2" />
            <span>Sản phẩm thương mại</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Hệ Thống VRV/VRF</h1>
          <p className="mt-4 text-lg max-w-3xl">
            Giải pháp điều hòa không khí tiên tiến dành cho tòa nhà văn phòng, khách sạn, và các không gian thương mại hiện đại.
          </p>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Hệ Thống VRV/VRF VRC-Multi</h2>
              <div className="bg-gray-100 p-4 rounded-lg mb-8">
              <img 
                src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                alt="Hệ thống VRV/VRF VRC-Multi" 
                className="w-full h-auto rounded-lg mb-4"
              />
              <div className="grid grid-cols-4 gap-2">
                <img 
                  src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                  alt="Hệ thống VRV/VRF VRC-Multi - 1" 
                  className="w-full h-24 object-cover rounded cursor-pointer"
                />
                <img 
                  src="https://images.pexels.com/photos/4481326/pexels-photo-4481326.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                  alt="Hệ thống VRV/VRF VRC-Multi - 2" 
                  className="w-full h-24 object-cover rounded cursor-pointer"
                />
                <img 
                  src="https://images.pexels.com/photos/2647714/pexels-photo-2647714.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                  alt="Hệ thống VRV/VRF VRC-Multi - 3" 
                  className="w-full h-24 object-cover rounded cursor-pointer"
                />
                <img 
                  src="https://images.pexels.com/photos/1662159/pexels-photo-1662159.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                  alt="Hệ thống VRV/VRF VRC-Multi - Lắp đặt" 
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
                    Hệ thống VRV/VRF VRC-Multi là giải pháp điều hòa không khí hiện đại dành cho các tòa nhà thương mại, văn phòng và khách sạn. 
                    Với khả năng kết nối và điều khiển độc lập nhiều dàn lạnh từ một dàn nóng, hệ thống cho phép tối ưu hóa việc sử dụng năng lượng và 
                    đáp ứng nhu cầu điều hòa không khí đa dạng trong các không gian khác nhau.
                  </p>
                  <p>
                    Công nghệ VRV/VRF (Variable Refrigerant Volume/Flow) của VRC-Multi cho phép điều chỉnh lưu lượng gas làm lạnh đến từng dàn lạnh, 
                    tạo ra sự linh hoạt cao trong việc kiểm soát nhiệt độ và tiết kiệm năng lượng đáng kể so với các hệ thống điều hòa trung tâm thông thường.
                  </p>
                  <p>
                    Hệ thống còn được tích hợp với các giải pháp điều khiển thông minh, cho phép quản lý tập trung qua hệ thống BMS 
                    (Building Management System) và theo dõi từ xa thông qua smartphone hoặc máy tính.
                  </p>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Tính năng nổi bật</h3>
                    <ul className="grid gap-3">
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Điều khiển nhiệt độ độc lập cho từng phòng, tối ưu hóa sự thoải mái</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Tiết kiệm năng lượng với công nghệ Inverter và điều khiển lưu lượng gas thông minh</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Vận hành êm ái, giảm thiểu tiếng ồn trong môi trường làm việc và sinh hoạt</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Khả năng mở rộng linh hoạt, kết nối lên đến 64 dàn lạnh từ một dàn nóng</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Đa dạng loại dàn lạnh: cassette, âm trần nối ống gió, treo tường, đứng sàn</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Tích hợp BMS, kết nối với các hệ thống quản lý tòa nhà qua LonWorks, BACnet, Modbus</span>
                      </li>                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Chiều dài đường ống lên đến 165m, linh hoạt trong thiết kế và lắp đặt</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-green-700">Giải pháp tiết kiệm năng lượng</h3>
                    <p className="mb-4">Công nghệ VRV/VRF VRC-Multi không chỉ mang lại hiệu quả làm mát vượt trội mà còn giúp doanh nghiệp tiết kiệm đáng kể chi phí vận hành và giảm thiểu tác động đến môi trường:</p>
                    
                    <ul className="space-y-3 mb-5">
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <span>Giảm lượng điện tiêu thụ lên đến 30% so với các hệ thống điều hòa thông thường</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <span>Công nghệ heat recovery tận dụng nhiệt thải để tối ưu hóa hiệu suất</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <span>Chế độ hoạt động thông minh tự động điều chỉnh dựa trên tình trạng sử dụng thực tế</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <span>Đạt các tiêu chuẩn hiệu suất năng lượng quốc tế và chứng nhận xanh</span>
                      </li>
                    </ul>
                      <Button className="bg-green-600 hover:bg-green-700" asChild>
                      <Link to="/technologies/energy-efficiency">
                        Tìm hiểu thêm
                        <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </Button>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Ứng dụng</h3>
                    <p>Hệ thống VRV/VRF VRC-Multi phù hợp với nhiều loại không gian như:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Tòa nhà văn phòng và trung tâm thương mại</li>
                      <li>Khách sạn và khu nghỉ dưỡng</li>
                      <li>Bệnh viện và cơ sở y tế</li>
                      <li>Trường học và trung tâm giáo dục</li>
                      <li>Ngân hàng và tổ chức tài chính</li>
                      <li>Nhà hàng và không gian giải trí</li>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm">8HP - 60HP</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Số dàn lạnh tối đa</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">64 dàn</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Gas làm lạnh</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">R410A</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Chiều dài đường ống tối đa</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">165m</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Chênh lệch độ cao tối đa</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">90m</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">IPLV (Hiệu suất năng lượng)</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">6.8</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Kết nối BMS</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">LonWorks, BACnet, Modbus</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Xuất xứ</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">Liên doanh Việt-Nhật</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Bảo hành</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">36 tháng cho máy nén</td>
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
                        <h4 className="font-medium">Hướng dẫn sử dụng VRC-Multi</h4>
                        <p className="text-sm text-muted-foreground">PDF - 3.2MB</p>
                      </div>
                      <Button variant="outline">Tải xuống</Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Hướng dẫn lắp đặt VRC-Multi</h4>
                        <p className="text-sm text-muted-foreground">PDF - 5.1MB</p>
                      </div>
                      <Button variant="outline">Tải xuống</Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Catalog VRC-Multi</h4>
                        <p className="text-sm text-muted-foreground">PDF - 2.4MB</p>
                      </div>
                      <Button variant="outline">Tải xuống</Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Bảng thông số kỹ thuật chi tiết</h4>
                        <p className="text-sm text-muted-foreground">PDF - 1.8MB</p>
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
                    <h4 className="font-medium mb-2">VRC-Multi</h4>
                    <p className="text-xl font-semibold text-primary">Liên hệ để nhận giá</p>
                  </div>
                  
                  <Button className="w-full" asChild>
                    <Link to="/contact?product=vrc-multi">
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
              <h3 className="text-xl font-semibold mb-4">Sản phẩm khác</h3>              <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden flex">
                  <div className="w-1/3 bg-gray-200">
                    <img 
                      src="https://images.pexels.com/photos/2599537/pexels-photo-2599537.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
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
                      src="https://images.pexels.com/photos/3690856/pexels-photo-3690856.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                      alt="Điều hòa dân dụng VRC Smart Inverter" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 w-2/3">
                    <h4 className="font-medium mb-1">Điều hòa dân dụng VRC Smart Inverter</h4>
                    <p className="text-sm text-muted-foreground mb-2">Điều hòa văn phòng & gia đình</p>
                    <Link to="/products/residential" className="text-primary hover:underline text-sm">
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden flex">
                  <div className="w-1/3 bg-gray-200">
                    <img 
                      src="https://images.pexels.com/photos/236730/pexels-photo-236730.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                      alt="Máy làm lạnh nước công nghiệp VRC-Chiller" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 w-2/3">
                    <h4 className="font-medium mb-1">Máy làm lạnh nước VRC-Chiller</h4>
                    <p className="text-sm text-muted-foreground mb-2">Chiller công nghiệp</p>
                    <Link to="/products/chiller" className="text-primary hover:underline text-sm">
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
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Tòa nhà Vincom Center" 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Tòa nhà Vincom Center</h3>
                <p className="text-muted-foreground mb-4">
                  Lắp đặt hệ thống VRV/VRF cho toàn bộ tòa nhà 25 tầng với 120 dàn lạnh
                </p>
                <Link to="/projects/commercial" className="text-primary hover:underline flex items-center">
                  Xem chi tiết
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Khách sạn Luxury Palace" 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Khách sạn Luxury Palace</h3>
                <p className="text-muted-foreground mb-4">
                  Cung cấp và lắp đặt hệ thống VRV/VRF cho 150 phòng khách sạn 5 sao
                </p>
                <Link to="/projects/commercial" className="text-primary hover:underline flex items-center">
                  Xem chi tiết
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Trung tâm thương mại Mega Mall" 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Trung tâm thương mại Mega Mall</h3>
                <p className="text-muted-foreground mb-4">
                  Thiết kế và lắp đặt hệ thống điều hòa trung tâm kết hợp VRV cho TTTM 5 tầng
                </p>
                <Link to="/projects/commercial" className="text-primary hover:underline flex items-center">
                  Xem chi tiết
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </CardContent>
            </Card>
          </div>        </section>
      </div>
    </>
  );
};

export default CommercialProducts;
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const IndustrialProducts = () => {
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
            <span>Sản phẩm công nghiệp</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Giải Pháp Điều Hòa Công Nghiệp</h1>
          <p className="mt-4 text-lg max-w-3xl">
            Các hệ thống điều hòa công suất lớn, được thiết kế đặc biệt cho nhà xưởng, nhà máy sản xuất và các công trình công nghiệp quy mô lớn.
          </p>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Điều Hòa Công Nghiệp VRC-5000</h2>
              <div className="bg-gray-100 p-4 rounded-lg mb-8">              <img 
                src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Điều hòa công nghiệp VRC-5000" 
                className="w-full h-auto rounded-lg mb-4"
              />
              <div className="grid grid-cols-4 gap-2">
                <img 
                  src="https://images.pexels.com/photos/3779837/pexels-photo-3779837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Điều hòa công nghiệp VRC-5000 - 1" 
                  className="w-full h-24 object-cover rounded cursor-pointer"
                />
                <img 
                  src="https://images.pexels.com/photos/3779835/pexels-photo-3779835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Điều hòa công nghiệp VRC-5000 - 2" 
                  className="w-full h-24 object-cover rounded cursor-pointer"
                />
                <img 
                  src="https://images.pexels.com/photos/442151/pexels-photo-442151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Điều hòa công nghiệp VRC-5000 - 3" 
                  className="w-full h-24 object-cover rounded cursor-pointer"
                />
                <img 
                  src="https://images.pexels.com/photos/236748/pexels-photo-236748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Điều hòa công nghiệp VRC-5000 - Lắp đặt" 
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
                    Điều hòa công nghiệp VRC-5000 là giải pháp làm mát hiệu quả dành cho các không gian lớn như nhà xưởng, 
                    nhà máy sản xuất và các công trình công nghiệp. Với công suất làm lạnh lên đến 50.000 BTU, 
                    hệ thống có thể đáp ứng nhu cầu của các không gian rộng lớn với tải nhiệt cao.
                  </p>
                  <p>
                    Được thiết kế với công nghệ tiết kiệm năng lượng hiện đại, VRC-5000 giúp giảm điện năng tiêu thụ đến 40% 
                    so với các hệ thống thông thường, đồng thời vẫn đảm bảo hiệu suất làm mát tối ưu cho môi trường công nghiệp.
                  </p>
                  <p>
                    Hệ thống còn được tích hợp các tính năng điều khiển thông minh từ xa, cho phép quản lý và giám sát 
                    hoạt động của thiết bị mọi lúc, mọi nơi thông qua smartphone hoặc máy tính.
                  </p>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Tính năng nổi bật</h3>
                    <ul className="grid gap-3">
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Công suất làm lạnh lớn: 50.000 BTU, phù hợp cho không gian rộng lớn</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Tiết kiệm điện năng lên đến 40% so với hệ thống thông thường</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Vận hành êm ái với độ ồn thấp, phù hợp cho môi trường làm việc</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Hệ thống điều khiển thông minh từ xa qua smartphone hoặc máy tính</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Dễ dàng lắp đặt và bảo trì, giảm chi phí vận hành</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Độ bền cao, phù hợp với điều kiện vận hành liên tục 24/7</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Sử dụng gas làm lạnh R410A thân thiện với môi trường</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Ứng dụng</h3>
                    <p>Điều hòa công nghiệp VRC-5000 phù hợp với nhiều loại không gian như:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Nhà xưởng sản xuất và nhà máy công nghiệp</li>
                      <li>Kho hàng và trung tâm phân phối</li>
                      <li>Showroom và không gian trưng bày lớn</li>
                      <li>Trung tâm dữ liệu (Data center)</li>
                      <li>Nhà máy chế biến thực phẩm và dược phẩm</li>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm">50.000 BTU/h</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Công suất điện tiêu thụ</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">4.8kW</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Nguồn điện</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">380V-415V/3Ph/50Hz</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Độ ồn</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">55dB(A)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Kích thước (DxRxC)</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">1800x900x1950mm</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Khối lượng</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">320kg</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Gas làm lạnh</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">R410A</td>
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
                        <h4 className="font-medium">Hướng dẫn sử dụng VRC-5000</h4>
                        <p className="text-sm text-muted-foreground">PDF - 2.5MB</p>
                      </div>
                      <Button variant="outline">Tải xuống</Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Hướng dẫn lắp đặt VRC-5000</h4>
                        <p className="text-sm text-muted-foreground">PDF - 3.8MB</p>
                      </div>
                      <Button variant="outline">Tải xuống</Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Brochure VRC-5000</h4>
                        <p className="text-sm text-muted-foreground">PDF - 1.7MB</p>
                      </div>
                      <Button variant="outline">Tải xuống</Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Bảng thông số kỹ thuật chi tiết</h4>
                        <p className="text-sm text-muted-foreground">PDF - 0.9MB</p>
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
                    <h4 className="font-medium mb-2">VRC-5000</h4>
                    <p className="text-xl font-semibold text-primary">Liên hệ để nhận giá</p>
                  </div>
                  
                  <Button className="w-full" asChild>
                    <Link to="/contact?product=vrc-5000">
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
                      src="https://images.unsplash.com/photo-1562769203-2d3ee3970449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
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
                
                <div className="border rounded-lg overflow-hidden flex">
                  <div className="w-1/3 bg-gray-200">
                    <img 
                      src="https://images.unsplash.com/photo-1527149074866-a9733dcc96e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                      alt="Hệ thống VRV/VRF VRC-Multi" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 w-2/3">
                    <h4 className="font-medium mb-1">Hệ thống VRV/VRF VRC-Multi</h4>
                    <p className="text-sm text-muted-foreground mb-2">Điều hòa đa cục</p>
                    <Link to="/products/commercial" className="text-primary hover:underline text-sm">
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
                  Lắp đặt hệ thống điều hòa công nghiệp VRC-5000 cho nhà máy sản xuất với diện tích 2000m²
                </p>
                <Link to="/projects/industrial" className="text-primary hover:underline flex items-center">
                  Xem chi tiết
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Khu công nghiệp XYZ" 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Khu công nghiệp XYZ</h3>
                <p className="text-muted-foreground mb-4">
                  Cung cấp và lắp đặt 15 hệ thống điều hòa công nghiệp VRC-5000 cho các xưởng sản xuất
                </p>
                <Link to="/projects/industrial" className="text-primary hover:underline flex items-center">
                  Xem chi tiết
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Nhà máy dệt may DEF" 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Nhà máy dệt may DEF</h3>
                <p className="text-muted-foreground mb-4">
                  Lắp đặt và bảo trì hệ thống điều hòa công nghiệp cho nhà máy dệt may với 5 phân xưởng
                </p>
                <Link to="/projects/industrial" className="text-primary hover:underline flex items-center">
                  Xem chi tiết
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
};

export default IndustrialProducts;
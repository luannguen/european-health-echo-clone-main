import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackToTop from "@/components/BackToTop";
import TopContact from "@/components/TopContact";

const ColdStorageProducts = () => {
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
              <span>Kho lạnh</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Hệ Thống Kho Lạnh Công Nghiệp</h1>
            <p className="mt-4 text-lg max-w-3xl">
              Giải pháp kho lạnh tổng thể cho doanh nghiệp thực phẩm, dược phẩm, và các ngành công nghiệp đòi hỏi bảo quản lạnh chuyên nghiệp.
            </p>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="container mx-auto py-12 px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Kho Lạnh Bảo Quản VRC-KL500</h2>
              
              <div className="bg-gray-100 p-4 rounded-lg mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Kho lạnh bảo quản VRC-KL500" 
                  className="w-full h-auto rounded-lg mb-4"
                />
                <div className="grid grid-cols-4 gap-2">
                  <img 
                    src="https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                    alt="Kho lạnh bảo quản VRC-KL500 - 1" 
                    className="w-full h-24 object-cover rounded cursor-pointer"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                    alt="Kho lạnh bảo quản VRC-KL500 - 2" 
                    className="w-full h-24 object-cover rounded cursor-pointer"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                    alt="Kho lạnh bảo quản VRC-KL500 - 3" 
                    className="w-full h-24 object-cover rounded cursor-pointer"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                    alt="Kho lạnh bảo quản VRC-KL500 - Lắp đặt" 
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
                      Kho lạnh bảo quản VRC-KL500 là giải pháp kho lạnh công nghiệp hiệu suất cao, được thiết kế đặc biệt cho các doanh nghiệp 
                      trong ngành thực phẩm, dược phẩm và các ngành công nghiệp đòi hỏi bảo quản lạnh chuyên nghiệp. Với khả năng mở rộng linh hoạt 
                      từ 50 đến 500m², hệ thống có thể đáp ứng nhu cầu từ các doanh nghiệp vừa và nhỏ đến các nhà máy sản xuất quy mô lớn.
                    </p>
                    <p>
                      Được chế tạo với panel cách nhiệt PU 100mm chất lượng cao, kho lạnh VRC-KL500 đảm bảo khả năng cách nhiệt tối ưu, 
                      giúp duy trì nhiệt độ ổn định từ -30°C đến +20°C tùy theo yêu cầu bảo quản cụ thể. Hệ thống còn được tích hợp 
                      công nghệ điều khiển tự động tiên tiến, cho phép giám sát và điều chỉnh nhiệt độ từ xa, đảm bảo an toàn cho hàng hóa 24/7.
                    </p>
                    <p>
                      VRC cung cấp giải pháp kho lạnh trọn gói, từ tư vấn thiết kế, cung cấp thiết bị, thi công lắp đặt đến bảo trì 
                      và hỗ trợ kỹ thuật lâu dài, đảm bảo hệ thống kho lạnh của bạn luôn vận hành ổn định và hiệu quả suốt vòng đời sản phẩm.
                    </p>

                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">Tính năng nổi bật</h3>
                      <ul className="grid gap-3">
                        <li className="flex items-start">
                          <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Diện tích linh hoạt từ 50-500m², dễ dàng mở rộng theo nhu cầu</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Phạm vi nhiệt độ rộng từ -30°C đến +20°C, đáp ứng đa dạng nhu cầu bảo quản</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Panel cách nhiệt PU 100mm chất lượng cao, giảm thiểu tổn thất nhiệt</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Hệ thống điều khiển tự động, giám sát từ xa qua smartphone hoặc máy tính</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Đa dạng lựa chọn cửa kho: cửa trượt, cửa mở, cửa tự động theo nhu cầu</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Hệ thống cảnh báo nhiệt độ và an toàn tích hợp, bảo vệ hàng hóa 24/7</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                          <span>Thiết kế module, lắp đặt nhanh chóng và dễ dàng di chuyển khi cần thiết</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">Ứng dụng</h3>
                      <p>Kho lạnh bảo quản VRC-KL500 phù hợp với nhiều ngành công nghiệp như:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Chế biến và bảo quản thực phẩm tươi sống</li>
                        <li>Bảo quản thực phẩm đông lạnh và kem</li>
                        <li>Bảo quản dược phẩm và vắc-xin</li>
                        <li>Chuỗi nhà hàng và siêu thị</li>
                        <li>Nhà máy chế biến thủy hải sản</li>
                        <li>Kho logistic và trung tâm phân phối</li>
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Diện tích</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">50-500m²</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Nhiệt độ làm việc</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">-30°C đến +20°C</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Panel cách nhiệt</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">PU 100mm</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Độ dày</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">100mm</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Khối lượng panel</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">12kg/m²</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Cửa kho lạnh</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">Cửa trượt/cửa mở</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Hệ thống điều khiển</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">Tự động, giám sát từ xa</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Xuất xứ</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">Việt Nam</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Bảo hành</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">12 tháng</td>
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
                          <h4 className="font-medium">Hướng dẫn vận hành kho lạnh VRC-KL500</h4>
                          <p className="text-sm text-muted-foreground">PDF - 3.5MB</p>
                        </div>
                        <Button variant="outline">Tải xuống</Button>
                      </div>
                      
                      <div className="p-4 border rounded-lg flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Hướng dẫn lắp đặt kho lạnh VRC-KL500</h4>
                          <p className="text-sm text-muted-foreground">PDF - 4.2MB</p>
                        </div>
                        <Button variant="outline">Tải xuống</Button>
                      </div>
                      
                      <div className="p-4 border rounded-lg flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Catalog kho lạnh VRC-KL500</h4>
                          <p className="text-sm text-muted-foreground">PDF - 2.8MB</p>
                        </div>
                        <Button variant="outline">Tải xuống</Button>
                      </div>
                      
                      <div className="p-4 border rounded-lg flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Hướng dẫn sử dụng hệ thống giám sát từ xa</h4>
                          <p className="text-sm text-muted-foreground">PDF - 1.9MB</p>
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
                      <h4 className="font-medium mb-2">VRC-KL500</h4>
                      <p className="text-xl font-semibold text-primary">Liên hệ để nhận giá</p>
                    </div>
                    
                    <Button className="w-full" asChild>
                      <Link to="/contact?product=vrc-kl500">
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
                  src="https://images.unsplash.com/photo-1552233659-a9b2910f9455?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Nhà máy thực phẩm XYZ" 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Nhà máy thực phẩm XYZ</h3>
                  <p className="text-muted-foreground mb-4">
                    Thiết kế và thi công 4 kho lạnh đa nhiệt độ với tổng diện tích 5,000m²
                  </p>
                  <Link to="/projects/industrial" className="text-primary hover:underline flex items-center">
                    Xem chi tiết
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1604742763104-86a0cf0aa1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Chuỗi siêu thị FreshMart" 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Chuỗi siêu thị FreshMart</h3>
                  <p className="text-muted-foreground mb-4">
                    Lắp đặt hệ thống kho lạnh mini cho 20 chi nhánh siêu thị trên toàn quốc
                  </p>
                  <Link to="/projects/commercial" className="text-primary hover:underline flex items-center">
                    Xem chi tiết
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Nhà máy dược phẩm MediPharm" 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Nhà máy dược phẩm MediPharm</h3>
                  <p className="text-muted-foreground mb-4">
                    Thiết kế và lắp đặt kho lạnh bảo quản dược phẩm đạt chuẩn GMP tiêu chuẩn quốc tế
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
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default ColdStorageProducts;
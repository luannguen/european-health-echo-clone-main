import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import BackToTop from "@/components/BackToTop";

const IndustrialProjects = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Banner */}
        <div className="bg-primary text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm mb-4">
              <Link to="/" className="hover:underline text-white/80">Trang chủ</Link>
              <ArrowRight size={14} className="mx-2 text-white/60" />
              <Link to="/projects" className="hover:underline text-white/80">Dự án</Link>
              <ArrowRight size={14} className="mx-2 text-white/60" />
              <span>Dự án công nghiệp</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Dự Án Hệ Thống Làm Lạnh Công Nghiệp</h1>
            <p className="mt-4 text-lg max-w-3xl">
              Các dự án tiêu biểu về hệ thống làm lạnh công nghiệp mà VRC đã triển khai thành công cho nhà máy sản xuất và chế biến
            </p>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="container mx-auto py-12 px-4">
          {/* Dự án tiêu biểu */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">Dự án tiêu biểu</h2>
            
            {/* Dự án 1 */}
            <div className="mb-16">
              <div className="rounded-lg overflow-hidden mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80" 
                  alt="Nhà máy sản xuất ABC" 
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold mb-4">Nhà máy sản xuất ABC</h3>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center">
                      <MapPin size={18} className="text-primary mr-2" />
                      <span>Bình Dương, Việt Nam</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={18} className="text-primary mr-2" />
                      <span>Hoàn thành: 12/2022</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={18} className="text-primary mr-2" />
                      <span>Thời gian thực hiện: 4 tháng</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <p>
                      Dự án lắp đặt hệ thống điều hòa công nghiệp VRC-5000 cho nhà máy sản xuất ABC với diện tích 
                      2000m² tại Bình Dương. Hệ thống được thiết kế để đáp ứng yêu cầu khắt khe về nhiệt độ và độ ẩm 
                      trong quy trình sản xuất điện tử, đồng thời tối ưu hóa chi phí vận hành.
                    </p>
                    <p>
                      VRC đã cung cấp giải pháp trọn gói bao gồm thiết kế, cung cấp thiết bị, lắp đặt và bảo trì 
                      cho toàn bộ hệ thống điều hòa không khí của nhà máy, giúp đảm bảo môi trường làm việc thoải mái 
                      cho hơn 500 công nhân và duy trì điều kiện lý tưởng cho các thiết bị máy móc.
                    </p>

                    <h4 className="text-xl font-semibold mt-8">Phạm vi công việc</h4>
                    <ul className="grid gap-3 mt-4">
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Thiết kế kỹ thuật và tư vấn giải pháp điều hòa công nghiệp</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Cung cấp và lắp đặt 8 hệ thống điều hòa công nghiệp VRC-5000</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Lắp đặt hệ thống ống gió và quạt thông gió công nghiệp</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Cài đặt hệ thống giám sát và điều khiển tự động BMS</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Hướng dẫn vận hành và chuyển giao công nghệ</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Bảo trì định kỳ và hỗ trợ kỹ thuật 24/7</span>
                      </li>
                    </ul>

                    <h4 className="text-xl font-semibold mt-8">Kết quả đạt được</h4>
                    <ul className="grid gap-3 mt-4">
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Duy trì nhiệt độ ổn định 22±1°C và độ ẩm 50±5% trong toàn bộ khu vực sản xuất</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Tiết kiệm 35% chi phí năng lượng so với hệ thống trước đó</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Giảm thời gian dừng máy do sự cố nhiệt độ từ 5% xuống dưới 0.5%</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Hoàn thiện dự án đúng tiến độ và trong ngân sách đề ra</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <Card className="mb-8">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Thông tin dự án</h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Khách hàng:</span>
                          <span className="font-medium">Công ty Điện tử ABC</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Địa điểm:</span>
                          <span className="font-medium">Bình Dương, Việt Nam</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Diện tích:</span>
                          <span className="font-medium">2,000 m²</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Công suất hệ thống:</span>
                          <span className="font-medium">400,000 BTU</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Thời gian thực hiện:</span>
                          <span className="font-medium">4 tháng</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Năm hoàn thành:</span>
                          <span className="font-medium">2022</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div>
                    <h4 className="text-xl font-semibold mb-4">Sản phẩm sử dụng</h4>
                    <div className="space-y-4">
                      <Link to="/products/industrial" className="block p-4 border rounded-lg hover:border-primary transition-all">
                        <div className="flex items-center">
                          <img 
                            src="https://images.unsplash.com/photo-1615252302352-667966ed2e18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" 
                            alt="VRC-5000" 
                            className="w-16 h-16 object-cover rounded mr-4"
                          />
                          <div>
                            <h5 className="font-medium">Điều hòa công nghiệp VRC-5000</h5>
                            <p className="text-sm text-muted-foreground">Xem thông tin sản phẩm</p>
                          </div>
                        </div>
                      </Link>
                      
                      <Link to="/products/auxiliary" className="block p-4 border rounded-lg hover:border-primary transition-all">
                        <div className="flex items-center">
                          <img 
                            src="https://images.unsplash.com/photo-1582891420766-5d7fb480ada3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" 
                            alt="VRC-Ventilation" 
                            className="w-16 h-16 object-cover rounded mr-4"
                          />
                          <div>
                            <h5 className="font-medium">Hệ thống thông gió VRC-Ventilation</h5>
                            <p className="text-sm text-muted-foreground">Xem thông tin sản phẩm</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="text-xl font-semibold mb-4">Hình ảnh dự án</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
                    alt="Hình ảnh dự án 1" 
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
                    alt="Hình ảnh dự án 2" 
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
                    alt="Hình ảnh dự án 3" 
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1553775282-20af80779df7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
                    alt="Hình ảnh dự án 4" 
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
            
            {/* Dự án 2 */}
            <div className="mb-16">
              <div className="rounded-lg overflow-hidden mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1552233659-a9b2910f9455?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80" 
                  alt="Nhà máy thực phẩm XYZ" 
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold mb-4">Nhà máy thực phẩm XYZ</h3>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center">
                      <MapPin size={18} className="text-primary mr-2" />
                      <span>Long An, Việt Nam</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={18} className="text-primary mr-2" />
                      <span>Hoàn thành: 06/2023</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={18} className="text-primary mr-2" />
                      <span>Thời gian thực hiện: 6 tháng</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <p>
                      Dự án thiết kế và thi công hệ thống kho lạnh và dây chuyền đông lạnh cho nhà máy thực phẩm XYZ 
                      tại Long An. Đây là một trong những dự án lớn nhất của VRC trong lĩnh vực làm lạnh công nghiệp cho 
                      ngành thực phẩm với tổng diện tích kho lạnh lên đến 5,000m².
                    </p>
                    <p>
                      VRC đã cung cấp giải pháp toàn diện bao gồm hệ thống kho lạnh đa nhiệt độ (-18°C đến +10°C), 
                      dây chuyền làm lạnh nhanh IQF, hệ thống băng chuyền làm lạnh và hệ thống giám sát nhiệt độ tự động. 
                      Dự án đã giúp khách hàng tăng 40% công suất bảo quản và đáp ứng các tiêu chuẩn khắt khe của 
                      thị trường xuất khẩu.
                    </p>

                    <h4 className="text-xl font-semibold mt-8">Phạm vi công việc</h4>
                    <ul className="grid gap-3 mt-4">
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Thiết kế và thi công 4 kho lạnh đa nhiệt độ tổng diện tích 5,000m²</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Lắp đặt hệ thống làm lạnh nhanh IQF công suất 2 tấn/giờ</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Cung cấp hệ thống máy làm lạnh nước công nghiệp VRC-Chiller</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Lắp đặt hệ thống băng chuyền làm lạnh và đóng gói tự động</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Triển khai hệ thống giám sát và cảnh báo nhiệt độ tự động</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Đào tạo vận hành và bàn giao hệ thống</span>
                      </li>
                    </ul>

                    <h4 className="text-xl font-semibold mt-8">Kết quả đạt được</h4>
                    <ul className="grid gap-3 mt-4">
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Tăng công suất bảo quản và chế biến lên 40%</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Đáp ứng tiêu chuẩn HACCP và các yêu cầu xuất khẩu sang EU</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Giảm chi phí vận hành 25% so với hệ thống cũ</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Giảm tỷ lệ hao hụt sản phẩm trong quá trình bảo quản từ 5% xuống 1%</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Hoàn thành dự án đúng tiến độ cam kết</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <Card className="mb-8">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Thông tin dự án</h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Khách hàng:</span>
                          <span className="font-medium">Công ty Thực phẩm XYZ</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Địa điểm:</span>
                          <span className="font-medium">Long An, Việt Nam</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Diện tích kho lạnh:</span>
                          <span className="font-medium">5,000 m²</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Công suất hệ thống:</span>
                          <span className="font-medium">500 RT</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Thời gian thực hiện:</span>
                          <span className="font-medium">6 tháng</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Năm hoàn thành:</span>
                          <span className="font-medium">2023</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div>
                    <h4 className="text-xl font-semibold mb-4">Sản phẩm sử dụng</h4>
                    <div className="space-y-4">
                      <Link to="/products/cold-storage" className="block p-4 border rounded-lg hover:border-primary transition-all">
                        <div className="flex items-center">
                          <img 
                            src="https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" 
                            alt="VRC-KL500" 
                            className="w-16 h-16 object-cover rounded mr-4"
                          />
                          <div>
                            <h5 className="font-medium">Kho lạnh bảo quản VRC-KL500</h5>
                            <p className="text-sm text-muted-foreground">Xem thông tin sản phẩm</p>
                          </div>
                        </div>
                      </Link>
                      
                      <Link to="/products/chiller" className="block p-4 border rounded-lg hover:border-primary transition-all">
                        <div className="flex items-center">
                          <img 
                            src="https://images.unsplash.com/photo-1562769203-2d3ee3970449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" 
                            alt="VRC-Chiller" 
                            className="w-16 h-16 object-cover rounded mr-4"
                          />
                          <div>
                            <h5 className="font-medium">Máy làm lạnh nước VRC-Chiller</h5>
                            <p className="text-sm text-muted-foreground">Xem thông tin sản phẩm</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="text-xl font-semibold mb-4">Hình ảnh dự án</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
                    alt="Hình ảnh dự án 1" 
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
                    alt="Hình ảnh dự án 2" 
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
                    alt="Hình ảnh dự án 3" 
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1619454016518-697bc231e7cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
                    alt="Hình ảnh dự án 4" 
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <div className="bg-primary/10 rounded-lg p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Bạn cần tư vấn về dự án công nghiệp?</h2>
              <p className="text-muted-foreground mb-6">
                Đội ngũ kỹ sư giàu kinh nghiệm của VRC sẵn sàng hỗ trợ bạn thiết kế, lắp đặt và bảo trì hệ thống làm lạnh công nghiệp phù hợp với nhu cầu cụ thể của doanh nghiệp.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/contact">
                    Liên hệ tư vấn
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/products/industrial">
                    Xem sản phẩm công nghiệp
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BackToTop />
    </div>
  );
};

export default IndustrialProjects;
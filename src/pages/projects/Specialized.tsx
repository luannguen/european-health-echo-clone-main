// filepath: e:\Download\european-health-echo-clone-main\european-health-echo-clone-main\src\pages\projects\Specialized.tsx
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import BackToTop from "@/components/BackToTop";

const SpecializedProjects = () => {
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
              <span>Dự án chuyên biệt</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Dự Án Đặc Biệt & Chuyên Biệt</h1>
            <p className="mt-4 text-lg max-w-3xl">
              Các dự án tiêu biểu về hệ thống điều hòa không khí với yêu cầu kỹ thuật đặc biệt cho phòng sạch, phòng thí nghiệm và y tế
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
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80" 
                  alt="Bệnh viện Quốc tế XYZ" 
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold mb-4">Bệnh viện Quốc tế XYZ</h3>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center">
                      <MapPin size={18} className="text-primary mr-2" />
                      <span>TP. Hồ Chí Minh, Việt Nam</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={18} className="text-primary mr-2" />
                      <span>Hoàn thành: 03/2023</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={18} className="text-primary mr-2" />
                      <span>Thời gian thực hiện: 8 tháng</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <p>
                      Dự án thiết kế và thi công hệ thống điều hòa không khí đặc biệt cho Bệnh viện Quốc tế XYZ với tổng diện tích 
                      25.000m², bao gồm các khu vực phòng mổ, phòng vô trùng, phòng cách ly áp suất âm và dương, phòng ICU 
                      và các phòng chức năng đặc biệt khác.
                    </p>
                    <p>
                      VRC đã cung cấp giải pháp toàn diện với các hệ thống AHU (Air Handling Unit) và PAU (Precision Air Unit) 
                      chuyên dụng cho y tế, cùng các hệ thống lọc HEPA, UV và kiểm soát độ ẩm chuyên biệt. 
                      Dự án đáp ứng các tiêu chuẩn y tế khắt khe nhất của Bộ Y Tế Việt Nam và các tiêu chuẩn quốc tế ISO 14644, ASHRAE và HTM 03-01.
                    </p>

                    <h4 className="text-xl font-semibold mt-8">Phạm vi công việc</h4>
                    <ul className="grid gap-3 mt-4">
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Thiết kế và tư vấn giải pháp HVAC cho toàn bộ bệnh viện</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Lắp đặt 12 hệ thống AHU cho phòng mổ và khu vực đặc biệt</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Triển khai 8 phòng áp suất âm cho khu cách ly bệnh truyền nhiễm</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Lắp đặt hệ thống lọc HEPA H14 cho các phòng vô trùng và phòng mổ</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Xây dựng hệ thống BMS giám sát các thông số không khí theo thời gian thực</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Đào tạo đội ngũ kỹ thuật của bệnh viện vận hành và bảo trì hệ thống</span>
                      </li>
                    </ul>

                    <h4 className="text-xl font-semibold mt-8">Kết quả đạt được</h4>
                    <ul className="grid gap-3 mt-4">
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Đạt chuẩn ISO 5 (Class 100) cho phòng mổ và ISO 6 (Class 1.000) cho khu vực vô trùng</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Duy trì chênh áp 15 Pa cho phòng áp suất dương và -15 Pa cho phòng áp suất âm</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Giảm tỷ lệ nhiễm khuẩn bệnh viện xuống dưới 0.5% (so với mức trung bình 2-3%)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Tích hợp thành công với hệ thống BMS tổng thể của tòa nhà</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Hoàn thành dự án đúng tiến độ và đáp ứng mọi yêu cầu kỹ thuật đặc biệt</span>
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
                          <span className="font-medium">Bệnh viện Quốc tế XYZ</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Địa điểm:</span>
                          <span className="font-medium">TP. HCM, Việt Nam</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Diện tích:</span>
                          <span className="font-medium">25,000 m²</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Công suất hệ thống:</span>
                          <span className="font-medium">1,200 RT</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Thời gian thực hiện:</span>
                          <span className="font-medium">8 tháng</span>
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
                    <h4 className="text-xl font-semibold mb-4">Tiêu chuẩn đáp ứng</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>ISO 14644 (Phòng sạch và môi trường kiểm soát)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>ASHRAE 170 (Tiêu chuẩn thông gió cho cơ sở y tế)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>HTM 03-01 (Thông gió cho môi trường chăm sóc sức khỏe)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>QCVN 13:2022/BYT (Tiêu chuẩn Việt Nam về môi trường y tế)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="text-xl font-semibold mb-4">Hình ảnh dự án</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1611091248112-ebe885c3c192?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
                    alt="Hình ảnh dự án 1" 
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
                    alt="Hình ảnh dự án 2" 
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
                    alt="Hình ảnh dự án 3" 
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1581095459868-1e25c53b9670?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
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
                  src="https://images.unsplash.com/photo-1566669437687-7040a6926753?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80" 
                  alt="Trung tâm dữ liệu Tech Center" 
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold mb-4">Trung tâm dữ liệu Tech Center</h3>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center">
                      <MapPin size={18} className="text-primary mr-2" />
                      <span>Hà Nội, Việt Nam</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={18} className="text-primary mr-2" />
                      <span>Hoàn thành: 11/2022</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={18} className="text-primary mr-2" />
                      <span>Thời gian thực hiện: 7 tháng</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <p>
                      Dự án thiết kế và lắp đặt hệ thống làm mát chuyên biệt cho trung tâm dữ liệu Tech Center 
                      với diện tích 3.000m² và công suất xử lý 2MW. Yêu cầu đặc biệt của dự án là duy trì nhiệt độ 
                      và độ ẩm ổn định 24/7, đảm bảo hoạt động liên tục của hệ thống máy chủ.
                    </p>
                    <p>
                      VRC đã triển khai hệ thống làm mát chính xác (Precision Cooling) kết hợp với giải pháp làm mát 
                      hàng nóng-hàng lạnh (Hot-Cold Aisle Containment) và hệ thống dự phòng N+1. 
                      Dự án đáp ứng các tiêu chuẩn TIER III về độ tin cậy và hiệu quả năng lượng với chỉ số PUE 
                      (Power Usage Effectiveness) đạt 1.45, thấp hơn nhiều so với mức trung bình ngành.
                    </p>

                    <h4 className="text-xl font-semibold mt-8">Phạm vi công việc</h4>
                    <ul className="grid gap-3 mt-4">
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Tư vấn thiết kế và lựa chọn giải pháp làm mát tối ưu</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Lắp đặt 16 hệ thống điều hòa chính xác (CRAC) chuyên dụng cho data center</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Triển khai giải pháp Hot-Cold Aisle Containment cho 120 tủ rack</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Lắp đặt hệ thống giám sát nhiệt độ và độ ẩm theo thời gian thực</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Xây dựng hệ thống báo động và ứng phó khẩn cấp</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Đào tạo đội ngũ vận hành và cung cấp dịch vụ bảo trì 24/7</span>
                      </li>
                    </ul>

                    <h4 className="text-xl font-semibold mt-8">Kết quả đạt được</h4>
                    <ul className="grid gap-3 mt-4">
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Duy trì nhiệt độ 22±1°C và độ ẩm 45±5% ổn định 24/7</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Đạt chỉ số PUE 1.45, giảm 30% chi phí năng lượng làm mát</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Tuân thủ tiêu chuẩn TIER III với độ tin cậy 99.982%</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Zero downtime từ khi vận hành đến nay</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Được chứng nhận bởi Uptime Institute về độ tin cậy và hiệu quả</span>
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
                          <span className="font-medium">Tech Center</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Địa điểm:</span>
                          <span className="font-medium">Hà Nội, Việt Nam</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Diện tích:</span>
                          <span className="font-medium">3,000 m²</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Công suất IT:</span>
                          <span className="font-medium">2 MW</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Công suất làm mát:</span>
                          <span className="font-medium">700 RT</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Năm hoàn thành:</span>
                          <span className="font-medium">2022</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-4">Các chỉ số hiệu quả</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>PUE (Power Usage Effectiveness): 1.45</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Độ tin cậy: 99.982% (TIER III)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Thời gian phản hồi sự cố:  15 phút</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Hiệu suất năng lượng: ASHRAE A1</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold mb-4">Tiêu chuẩn đáp ứng</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>ASHRAE TC 9.9 (Làm mát Data Center)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>Uptime Institute TIER III</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={16} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>TIA-942 (Tiêu chuẩn hạ tầng Data Center)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="text-xl font-semibold mb-4">Hình ảnh dự án</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
                    alt="Hình ảnh dự án 1" 
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1600267204091-5c1ab8b10c02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
                    alt="Hình ảnh dự án 2" 
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
                    alt="Hình ảnh dự án 3" 
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1597138804456-e7607e72e3c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
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
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Bạn cần tư vấn về dự án chuyên biệt?</h2>
              <p className="text-muted-foreground mb-6">
                Đội ngũ kỹ sư chuyên môn cao của VRC sẵn sàng hỗ trợ bạn thiết kế và triển khai hệ thống điều hòa không khí đặc biệt cho phòng sạch, phòng thí nghiệm, bệnh viện, data center và các không gian đặc thù khác.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/contact">
                    Liên hệ tư vấn
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/technologies">
                    Xem giải pháp công nghệ
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

export default SpecializedProjects;
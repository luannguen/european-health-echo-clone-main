import { ArrowRight, ArrowLeft, CheckCircle, Leaf, Zap, BarChart3, Award, Factory } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const EnergyEfficiency = () => {
  return (
    <>
      {/* Banner */}
      <div className="bg-gradient-to-b from-green-600 to-green-500 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm mb-4">
            <Link to="/" className="hover:underline text-white/80">Trang chủ</Link>
            <ArrowRight size={14} className="mx-2" />
            <Link to="/technologies" className="hover:underline text-white/80">Công nghệ</Link>
            <ArrowRight size={14} className="mx-2" />
            <span>Giải pháp tiết kiệm năng lượng</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Giải pháp tiết kiệm năng lượng</h1>
          <p className="mt-4 text-lg max-w-3xl">
            Công nghệ hiện đại giúp tiết kiệm chi phí vận hành và bảo vệ môi trường với các hệ thống điều hòa không khí thế hệ mới.
          </p>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-6">Công nghệ tiết kiệm năng lượng VRC</h2>
            
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Tại VRC, chúng tôi hiểu rằng hiệu quả năng lượng không chỉ giúp giảm chi phí vận hành mà còn góp phần bảo vệ 
                môi trường. Chúng tôi đã phát triển và triển khai nhiều công nghệ tiết kiệm năng lượng tiên tiến trong các 
                sản phẩm điều hòa không khí và hệ thống lạnh.
              </p>
              
              <div className="mb-10">
                <h3 className="text-xl font-semibold text-green-600 mb-4">Các công nghệ tiết kiệm năng lượng hàng đầu</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                    <div className="flex items-center mb-3">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <Zap className="h-6 w-6 text-green-600" />
                      </div>
                      <h4 className="text-lg font-medium">Công nghệ Inverter tiên tiến</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Máy nén biến tần thế hệ mới giúp điều chỉnh công suất linh hoạt, giảm tiêu thụ điện năng lên đến 30% so
                      với hệ thống điều hòa truyền thống.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                    <div className="flex items-center mb-3">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <BarChart3 className="h-6 w-6 text-green-600" />
                      </div>
                      <h4 className="text-lg font-medium">Hệ thống quản lý năng lượng</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Theo dõi và tối ưu hóa mức tiêu thụ năng lượng thời gian thực, tự động điều chỉnh hoạt động dựa trên nhu cầu
                      thực tế của không gian.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                    <div className="flex items-center mb-3">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <Leaf className="h-6 w-6 text-green-600" />
                      </div>
                      <h4 className="text-lg font-medium">Công nghệ Heat Recovery</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Tận dụng nhiệt thải từ quá trình làm lạnh để tái sử dụng cho hệ thống nước nóng hoặc không gian cần sưởi ấm,
                      giúp tiết kiệm năng lượng gấp đôi.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                    <div className="flex items-center mb-3">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <Award className="h-6 w-6 text-green-600" />
                      </div>
                      <h4 className="text-lg font-medium">Chất làm lạnh thế hệ mới</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Sử dụng môi chất lạnh thân thiện với môi trường có GWP thấp (Global Warming Potential), giảm thiểu tác động đến 
                      hiệu ứng nhà kính và tầng ozone.
                    </p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-green-600 mb-4">Lợi ích kinh tế và môi trường</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Tiết kiệm chi phí đáng kể</h4>
                    <p className="text-gray-600 mt-1">
                      Giảm chi phí điện năng vận hành từ 20-30% so với các hệ thống truyền thống, với thời gian hoàn vốn đầu tư nhanh
                      chỉ từ 2-3 năm.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Giảm khí thải carbon</h4>
                    <p className="text-gray-600 mt-1">
                      Mỗi hệ thống VRV/VRF sử dụng công nghệ tiết kiệm năng lượng có thể giảm đến 30-40% lượng khí thải CO2 so với
                      các hệ thống điều hòa truyền thống.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Tuổi thọ thiết bị cao hơn</h4>
                    <p className="text-gray-600 mt-1">
                      Công nghệ Inverter giúp giảm số lần khởi động/tắt máy nén, dẫn đến ít hao mòn các bộ phận và kéo dài tuổi thọ
                      thiết bị lên đến 20-30%.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Đạt tiêu chuẩn công trình xanh</h4>
                    <p className="text-gray-600 mt-1">
                      Hệ thống điều hòa tiết kiệm năng lượng của VRC giúp các công trình đạt được chứng nhận LEED, LOTUS, EDGE và các
                      tiêu chuẩn công trình xanh quốc tế khác.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 border border-green-200 rounded-lg mb-10">
                <h3 className="text-xl font-semibold text-green-700 mb-4">Trường hợp điển hình</h3>
                <div className="mb-4">
                  <h4 className="font-medium">Tòa nhà văn phòng GreenTower</h4>
                  <p className="text-gray-600 mt-1">
                    Sau khi lắp đặt hệ thống VRV/VRF tiết kiệm năng lượng của VRC, tòa nhà đã giảm 28% chi phí điện năng hàng năm,
                    tương đương 150 triệu đồng tiết kiệm mỗi tháng.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Trung tâm thương mại EcoMall</h4>
                  <p className="text-gray-600 mt-1">
                    Áp dụng công nghệ Heat Recovery kết hợp với quản lý năng lượng thông minh, trung tâm thương mại đã giảm 32% 
                    lượng khí thải carbon và tiết kiệm gần 2 tỷ đồng chi phí năng lượng mỗi năm.
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-green-600 mb-4">Tương lai của công nghệ tiết kiệm năng lượng</h3>
              <p className="mb-4">
                VRC không ngừng nghiên cứu và phát triển các công nghệ tiết kiệm năng lượng mới. Trong tương lai gần, chúng tôi
                sẽ giới thiệu:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 mb-8">
                <li>Hệ thống điều hòa tích hợp AI học máy để tối ưu hóa vận hành dựa trên thói quen sử dụng</li>
                <li>Công nghệ lưu trữ nhiệt tiên tiến, giúp tận dụng thời điểm điện giá thấp để vận hành</li>
                <li>Hệ thống hybrid kết hợp với năng lượng tái tạo như năng lượng mặt trời</li>
                <li>Công nghệ điều khiển từ xa qua cloud tiết kiệm năng lượng cho chuỗi cơ sở nhiều chi nhánh</li>
              </ul>
            </div>
            
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Các giải pháp tiết kiệm năng lượng theo ngành</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <Factory className="h-10 w-10 text-green-500 mb-4" />
                    <h4 className="text-lg font-medium mb-2">Giải pháp cho công nghiệp</h4>
                    <p className="text-gray-600 mb-4">
                      Hệ thống làm mát và điều hòa công nghiệp tiết kiệm năng lượng cho các nhà máy, xưởng sản xuất và kho lạnh.
                    </p>
                    <Button variant="outline" className="mt-2" asChild>
                      <Link to="/products/industrial">
                        Tìm hiểu thêm
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <img 
                      src="https://images.pexels.com/photos/3769149/pexels-photo-3769149.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                      alt="Tòa nhà văn phòng" 
                      className="h-10 w-10 object-cover rounded mb-4"
                    />
                    <h4 className="text-lg font-medium mb-2">Giải pháp cho tòa nhà</h4>
                    <p className="text-gray-600 mb-4">
                      Hệ thống VRV/VRF tiết kiệm năng lượng cho văn phòng, khách sạn và tòa nhà thương mại.
                    </p>
                    <Button variant="outline" className="mt-2" asChild>
                      <Link to="/products/commercial">
                        Tìm hiểu thêm
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold text-green-600 mb-6">Liên hệ với chúng tôi</h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Để nhận tư vấn về các giải pháp tiết kiệm năng lượng phù hợp với nhu cầu của doanh nghiệp hoặc công trình của bạn
              </p>
              <Button className="bg-green-600 hover:bg-green-700" size="lg" asChild>
                <Link to="/contact?subject=energy-efficiency">
                  Nhận tư vấn miễn phí
                </Link>
              </Button>
            </div>
          </div>
          
          <div>
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Liên hệ tư vấn</h3>
                <p className="text-muted-foreground mb-6">
                  Nhận tư vấn miễn phí về giải pháp tiết kiệm năng lượng phù hợp
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center border-l-4 border-green-500 pl-3 py-2">
                    <CheckCircle className="text-green-500 mr-2" size={18} />
                    <span className="text-sm">Đánh giá hiệu quả năng lượng miễn phí</span>
                  </div>
                  
                  <div className="flex items-center border-l-4 border-green-500 pl-3 py-2">
                    <CheckCircle className="text-green-500 mr-2" size={18} />
                    <span className="text-sm">Báo cáo tiết kiệm chi phí dự kiến</span>
                  </div>
                  
                  <div className="flex items-center border-l-4 border-green-500 pl-3 py-2">
                    <CheckCircle className="text-green-500 mr-2" size={18} />
                    <span className="text-sm">Tư vấn giải pháp phù hợp cho công trình</span>
                  </div>
                </div>
                
                <Button className="w-full mt-6 bg-green-600 hover:bg-green-700" asChild>
                  <Link to="/contact?subject=energy-efficiency">
                    Đăng ký tư vấn ngay
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full mt-3" asChild>
                  <Link to="tel:+842812345678">
                    Gọi: 028 1234 5678
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Tài liệu liên quan</h3>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 flex items-center">
                  <div className="mr-3 text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Catalogue công nghệ tiết kiệm năng lượng</h4>
                    <p className="text-sm text-muted-foreground">PDF - 4.2MB</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 flex items-center">
                  <div className="mr-3 text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Báo cáo hiệu quả tiết kiệm năng lượng</h4>
                    <p className="text-sm text-muted-foreground">PDF - 2.8MB</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 flex items-center">
                  <div className="mr-3 text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Chứng chỉ và tiêu chuẩn năng lượng</h4>
                    <p className="text-sm text-muted-foreground">PDF - 1.5MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnergyEfficiency;

import { ArrowLeft, ArrowRight, CalendarIcon, MapPinIcon, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackToTop from "@/components/BackToTop";

const CommercialProjects = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Banner */}
        <div className="bg-gradient-to-b from-primary to-primary/80 text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm mb-4">
              <Link to="/" className="hover:underline">Trang chủ</Link>
              <ArrowRight size={14} className="mx-2" />
              <Link to="/projects" className="hover:underline">Dự án</Link>
              <ArrowRight size={14} className="mx-2" />
              <span>Dự án thương mại</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Chung Cư Cao Cấp Star Heights</h1>
            <p className="mt-4 text-lg max-w-3xl">
              Cung cấp và lắp đặt toàn bộ hệ thống điều hòa không khí cho khu chung cư cao cấp, đảm bảo môi trường sống thoải mái và sang trọng.
            </p>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="container mx-auto py-12 px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {/* Thông tin dự án */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Tổng quan dự án</h2>
                
                <div className="bg-gray-100 p-4 rounded-lg mb-8">
                  <img 
                    src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                    alt="Chung cư cao cấp Star Heights" 
                    className="w-full h-auto rounded-lg mb-4"
                  />
                  <div className="grid grid-cols-4 gap-2">
                    <img 
                      src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                      alt="Chung cư cao cấp Star Heights - 1" 
                      className="w-full h-24 object-cover rounded cursor-pointer"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                      alt="Chung cư cao cấp Star Heights - 2" 
                      className="w-full h-24 object-cover rounded cursor-pointer"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1515263487990-61b07816b324?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                      alt="Chung cư cao cấp Star Heights - 3" 
                      className="w-full h-24 object-cover rounded cursor-pointer"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                      alt="Chung cư cao cấp Star Heights - 4" 
                      className="w-full h-24 object-cover rounded cursor-pointer"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <MapPinIcon className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-medium">Địa điểm</h3>
                    </div>
                    <p className="ml-7">Quận 2, Thành phố Hồ Chí Minh</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <CalendarIcon className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-medium">Thời gian thực hiện</h3>
                    </div>
                    <p className="ml-7">12/2022 - 06/2023</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Building2 className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-medium">Chủ đầu tư</h3>
                    </div>
                    <p className="ml-7">Star Heights Investments JSC</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Building2 className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-medium">Diện tích</h3>
                    </div>
                    <p className="ml-7">35.000 m²</p>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="overview" className="mb-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Tổng quan dự án</TabsTrigger>
                  <TabsTrigger value="challenge">Thách thức</TabsTrigger>
                  <TabsTrigger value="solution">Giải pháp & Kết quả</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6">
                  <div className="space-y-4">
                    <p>
                      Dự án chung cư cao cấp Star Heights là tổ hợp căn hộ cao cấp bao gồm 3 tòa tháp với 500 căn hộ, 
                      được thiết kế theo tiêu chuẩn sống hiện đại, sang trọng và thân thiện với môi trường. 
                      Với vị trí đắc địa tại Quận 2, Thành phố Hồ Chí Minh, dự án hướng đến phân khúc khách hàng cao cấp 
                      với nhu cầu về một không gian sống tiện nghi, thoải mái và đẳng cấp.
                    </p>
                    <p>
                      VRC được chọn là đơn vị cung cấp và lắp đặt toàn bộ hệ thống điều hòa không khí cho dự án, 
                      bao gồm 500 bộ điều hòa dân dụng VRC Smart Inverter cho các căn hộ và hệ thống điều hòa trung tâm VRV/VRF 
                      cho các khu vực công cộng như sảnh, hành lang, khu tiện ích và văn phòng quản lý.
                    </p>
                    <p>
                      Dự án được triển khai trong thời gian 6 tháng, từ tháng 12/2022 đến tháng 06/2023, với tổng diện tích lắp đặt 
                      là 35.000 m². Việc triển khai hệ thống điều hòa được thực hiện song song với các hạng mục hoàn thiện 
                      nội thất của dự án, đòi hỏi sự phối hợp chặt chẽ giữa VRC và các nhà thầu khác.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="challenge" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium mb-2">Thách thức của dự án</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Yêu cầu cao về thẩm mỹ:</strong> Dự án đòi hỏi hệ thống điều hòa phải được lắp đặt một cách gọn gàng, 
                        không ảnh hưởng đến tính thẩm mỹ của kiến trúc và nội thất cao cấp của các căn hộ.
                      </li>
                      <li>
                        <strong>Tiêu chuẩn tiết kiệm năng lượng:</strong> Chủ đầu tư yêu cầu hệ thống điều hòa phải đạt tiêu chuẩn 
                        tiết kiệm năng lượng cao, góp phần vào việc đạt chứng chỉ công trình xanh LEED cho dự án.
                      </li>
                      <li>
                        <strong>Độ ồn thấp:</strong> Các căn hộ cao cấp đòi hỏi hệ thống điều hòa phải vận hành êm ái, 
                        với độ ồn tối thiểu để đảm bảo chất lượng cuộc sống.
                      </li>
                      <li>
                        <strong>Triển khai đồng thời:</strong> Việc lắp đặt điều hòa cho 500 căn hộ và khu vực công cộng 
                        trong thời gian ngắn đòi hỏi khả năng quản lý dự án và nguồn lực lớn.
                      </li>
                      <li>
                        <strong>Hệ thống điều khiển thông minh:</strong> Dự án cần tích hợp hệ thống điều hòa với hệ thống nhà thông minh 
                        của toàn tòa nhà, cho phép quản lý và điều khiển từ xa.
                      </li>
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="solution" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium mb-3">Giải pháp của VRC</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-6">
                      <li>
                        <strong>Điều hòa dân dụng VRC Smart Inverter:</strong> Lắp đặt 500 bộ điều hòa dân dụng tiết kiệm năng lượng 
                        với thiết kế gọn nhẹ, vận hành êm ái chỉ từ 18dB, phù hợp với nhu cầu của các căn hộ cao cấp.
                      </li>
                      <li>
                        <strong>Hệ thống VRV/VRF cho khu vực công cộng:</strong> Sử dụng hệ thống điều hòa trung tâm VRV/VRF VRC-Multi 
                        cho các khu vực công cộng, đảm bảo hiệu suất cao và khả năng điều chỉnh linh hoạt theo tải.
                      </li>
                      <li>
                        <strong>Tích hợp điều khiển thông minh:</strong> Tích hợp toàn bộ hệ thống với giải pháp nhà thông minh, 
                        cho phép cư dân điều khiển qua smartphone và ban quản lý có thể giám sát toàn bộ hệ thống.
                      </li>
                      <li>
                        <strong>Lắp đặt chuyên nghiệp:</strong> Triển khai đội ngũ kỹ thuật viên được đào tạo chuyên sâu về lắp đặt thẩm mỹ, 
                        đảm bảo hệ thống ống đồng và dây điện được đi âm tường, gọn gàng.
                      </li>
                      <li>
                        <strong>Giải pháp cách âm:</strong> Áp dụng các giải pháp cách âm tiên tiến cho cục nóng, giảm thiểu tiếng ồn 
                        và độ rung cho cả người sử dụng và các căn hộ lân cận.
                      </li>
                    </ul>

                    <h3 className="text-lg font-medium mb-3">Kết quả đạt được</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Tiết kiệm năng lượng:</strong> Hệ thống điều hòa đạt hiệu suất tiết kiệm năng lượng vượt 40% 
                        so với các hệ thống thông thường, góp phần vào chứng chỉ LEED của tòa nhà.
                      </li>
                      <li>
                        <strong>Độ hài lòng cao:</strong> Khảo sát sau khi bàn giao cho thấy 97% cư dân hài lòng với hệ thống điều hòa, 
                        đặc biệt là về độ êm ái và tiết kiệm điện năng.
                      </li>
                      <li>
                        <strong>Hoàn thành đúng tiến độ:</strong> Toàn bộ dự án được hoàn thành đúng tiến độ 6 tháng, 
                        không ảnh hưởng đến kế hoạch bàn giao căn hộ cho cư dân.
                      </li>
                      <li>
                        <strong>Tiết giảm chi phí vận hành:</strong> Hệ thống quản lý thông minh giúp tòa nhà tiết kiệm 35% 
                        chi phí năng lượng cho điều hòa so với dự kiến ban đầu.
                      </li>
                      <li>
                        <strong>Bảo trì dễ dàng:</strong> Hệ thống giám sát từ xa giúp phát hiện sớm các vấn đề tiềm ẩn, 
                        giảm thiểu thời gian và chi phí bảo trì.
                      </li>
                    </ul>

                    <div className="mt-8">
                      <p className="italic font-medium">
                        "VRC đã cung cấp giải pháp điều hòa không khí hoàn hảo cho Star Heights, giúp chúng tôi nâng cao 
                        trải nghiệm sống của cư dân và đạt được các mục tiêu về tiết kiệm năng lượng của dự án. 
                        Chúng tôi đặc biệt ấn tượng với khả năng triển khai đúng tiến độ và chất lượng dịch vụ chuyên nghiệp của đội ngũ VRC."
                      </p>
                      <p className="mt-2 font-medium">
                        — Nguyễn Văn A, Giám đốc Dự án, Star Heights Investment JSC
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              {/* Thông tin liên hệ */}
              <Card className="mb-8 sticky top-20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Quan tâm đến dự án?</h3>
                  <p className="text-muted-foreground mb-6">Liên hệ với chúng tôi để nhận tư vấn chi tiết về các giải pháp điều hòa không khí cho dự án của bạn</p>
                  
                  <div className="space-y-4">                    
                    <Button className="w-full" asChild>
                      <Link to="/contact?project=residential">
                        Nhận tư vấn dự án
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
              
              {/* Dự án liên quan */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Dự án tương tự</h3>
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden flex">
                    <div className="w-1/3 bg-gray-200">
                      <img 
                        src="https://images.unsplash.com/photo-1571624436279-b272aff752b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                        alt="Văn phòng Green Office" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 w-2/3">
                      <h4 className="font-medium mb-1">Văn phòng Green Office</h4>
                      <p className="text-sm text-muted-foreground mb-1">Quận 1, TP.HCM</p>
                      <Link to="/projects/commercial" className="text-primary hover:underline text-sm">
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden flex">
                    <div className="w-1/3 bg-gray-200">
                      <img 
                        src="https://images.unsplash.com/photo-1604742763104-86a0cf0aa1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                        alt="Chuỗi siêu thị FreshMart" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 w-2/3">
                      <h4 className="font-medium mb-1">Chuỗi siêu thị FreshMart</h4>
                      <p className="text-sm text-muted-foreground mb-1">Toàn quốc</p>
                      <Link to="/projects/commercial" className="text-primary hover:underline text-sm">
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden flex">
                    <div className="w-1/3 bg-gray-200">
                      <img 
                        src="https://images.unsplash.com/photo-1590086782957-93c06ef21604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                        alt="Trung tâm thương mại Mega Mall" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 w-2/3">
                      <h4 className="font-medium mb-1">Trung tâm thương mại Mega Mall</h4>
                      <p className="text-sm text-muted-foreground mb-1">Hà Nội</p>
                      <Link to="/projects/commercial" className="text-primary hover:underline text-sm">
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sản phẩm đã sử dụng */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Sản phẩm đã sử dụng</h3>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <img 
                          src="https://images.unsplash.com/photo-1499573550747-98de39d9ad77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                          alt="Điều hòa dân dụng VRC Smart Inverter" 
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div>
                          <h4 className="font-medium">VRC Smart Inverter</h4>
                          <p className="text-sm text-muted-foreground">Điều hòa dân dụng</p>
                          <Link to="/products/residential" className="text-primary hover:underline text-sm">
                            Xem sản phẩm
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <img 
                          src="https://images.unsplash.com/photo-1527149074866-a9733dcc96e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                          alt="Hệ thống VRV/VRF VRC-Multi" 
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div>
                          <h4 className="font-medium">VRC-Multi VRV/VRF</h4>
                          <p className="text-sm text-muted-foreground">Hệ thống điều hòa trung tâm</p>
                          <Link to="/products/commercial" className="text-primary hover:underline text-sm">
                            Xem sản phẩm
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <section className="mt-16 bg-primary/5 p-8 rounded-lg">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Bạn có dự án tương tự?</h2>
              <p className="text-muted-foreground mb-6">
                Đội ngũ chuyên gia của VRC sẵn sàng tư vấn giải pháp điều hòa không khí tối ưu cho dự án của bạn. 
                Liên hệ ngay để nhận báo giá và tư vấn miễn phí!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/contact">
                    Liên hệ tư vấn
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/projects">
                    Xem thêm dự án khác
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <BackToTop />
    </div>
  );
};

export default CommercialProjects;
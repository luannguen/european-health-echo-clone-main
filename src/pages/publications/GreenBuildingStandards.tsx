import { ArrowRight, ArrowLeft, FileText, Calendar, Tag, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const GreenBuildingStandards = () => {
  return (
    <>
      {/* Banner */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-500 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm mb-4">
            <Link to="/" className="hover:underline text-white/80">Trang chủ</Link>
            <ArrowRight size={14} className="mx-2" />
            <Link to="/publications" className="hover:underline text-white/80">Bài viết</Link>
            <ArrowRight size={14} className="mx-2" />
            <span>Tiêu chuẩn công trình xanh</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Tiêu chuẩn công trình xanh: Lợi ích kinh tế và môi trường trong dài hạn</h1>
          <div className="mt-4 flex items-center gap-6">
            <div className="flex items-center">
              <Calendar className="mr-2" size={18} />
              <span>10 January 2025</span>
            </div>
            <div className="flex items-center">
              <FileText className="mr-2" size={18} />
              <span>Hướng dẫn</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <article className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">            <img 
              src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1170&h=750&dpr=1" 
              alt="Tiêu chuẩn công trình xanh" 
              className="w-full h-auto rounded-lg mb-8"
            />
            
            <div className="prose prose-lg max-w-none">
              <h2>Giới thiệu về tiêu chuẩn công trình xanh</h2>
              
              <p>
                Trong bối cảnh biến đổi khí hậu và gia tăng nhu cầu phát triển bền vững, các tiêu chuẩn công trình xanh 
                đang trở thành xu hướng quan trọng trong ngành xây dựng trên toàn cầu. Công trình xanh được thiết kế và 
                vận hành với mục tiêu giảm thiểu tác động tiêu cực đến môi trường, đồng thời nâng cao chất lượng cuộc sống 
                của người sử dụng và hiệu quả kinh tế trong suốt vòng đời của công trình.
              </p>
              
              <p>
                Bài viết này phân tích chi tiết về các tiêu chuẩn công trình xanh phổ biến hiện nay, vai trò của hệ thống 
                điều hòa không khí hiệu quả năng lượng trong việc đạt được các chứng nhận này, cũng như lợi ích kinh tế và 
                môi trường trong dài hạn.
              </p>
              
              <h3>Các tiêu chuẩn công trình xanh phổ biến</h3>
              
              <h4>1. LEED (Leadership in Energy and Environmental Design)</h4>
              <p>
                Phát triển bởi U.S. Green Building Council, LEED là một trong những chứng nhận công trình xanh được công nhận 
                rộng rãi nhất trên toàn cầu. Hệ thống đánh giá của LEED dựa trên nhiều tiêu chí như hiệu quả năng lượng, 
                sử dụng nước, chất lượng không khí trong nhà, và sử dụng vật liệu bền vững.
              </p>
              <p>
                Các cấp độ chứng nhận LEED:
              </p>
              <ul>
                <li>Chứng nhận cơ bản (Certified): 40-49 điểm</li>
                <li>Bạc (Silver): 50-59 điểm</li>
                <li>Vàng (Gold): 60-79 điểm</li>
                <li>Bạch kim (Platinum): 80+ điểm</li>
              </ul>
              
              <h4>2. LOTUS</h4>
              <p>
                Phát triển bởi Vietnam Green Building Council (VGBC), LOTUS là hệ thống đánh giá công trình xanh đầu tiên 
                được thiết kế riêng cho điều kiện khí hậu và xây dựng tại Việt Nam. LOTUS đánh giá các khía cạnh như 
                năng lượng, nước, vật liệu, sinh thái, sức khỏe và tiện nghi, và đổi mới.
              </p>
              
              <h4>3. EDGE (Excellence in Design for Greater Efficiencies)</h4>
              <p>
                Được phát triển bởi IFC (International Finance Corporation), EDGE tập trung vào ba yếu tố chính: 
                hiệu quả năng lượng, nước và vật liệu. Để được chứng nhận, dự án cần đạt được mức giảm tối thiểu 20% 
                về mỗi yếu tố so với công trình thông thường.
              </p>
              
              <h4>4. WELL Building Standard</h4>
              <p>
                WELL tập trung vào sức khỏe và tiện nghi của người sử dụng công trình, với các tiêu chí đánh giá về 
                chất lượng không khí, nước, ánh sáng, dinh dưỡng, thể chất, tiện nghi và tinh thần.
              </p>
              
              <h3>Vai trò của hệ thống điều hòa không khí trong công trình xanh</h3>
              
              <p>
                Hệ thống điều hòa không khí chiếm khoảng 40-60% tổng năng lượng tiêu thụ trong các tòa nhà thương mại và 
                dân dụng. Do đó, việc lựa chọn và vận hành hiệu quả hệ thống HVAC đóng vai trò quyết định trong việc đạt được 
                chứng nhận công trình xanh.
              </p>
              
              <h4>Các yếu tố quan trọng trong hệ thống HVAC góp phần đạt chứng nhận công trình xanh:</h4>
              
              <ol>
                <li>
                  <strong>Hiệu suất năng lượng cao:</strong> Sử dụng các hệ thống có chỉ số hiệu suất năng lượng (EER/COP) 
                  cao như VRF/VRV với công nghệ Inverter.
                </li>
                <li>
                  <strong>Thu hồi năng lượng:</strong> Tích hợp các hệ thống thu hồi nhiệt để tái sử dụng năng lượng thải ra.
                </li>
                <li>
                  <strong>Môi chất lạnh thân thiện với môi trường:</strong> Sử dụng các môi chất có GWP (Global Warming Potential) 
                  thấp để giảm thiểu tác động đến biến đổi khí hậu.
                </li>
                <li>
                  <strong>Kiểm soát chất lượng không khí trong nhà:</strong> Hệ thống lọc không khí hiệu quả, kiểm soát độ ẩm 
                  và CO2 để đảm bảo môi trường sống và làm việc lành mạnh.
                </li>
                <li>
                  <strong>Quản lý thông minh:</strong> Tích hợp hệ thống quản lý năng lượng tòa nhà (BMS) để tối ưu hóa vận hành.
                </li>
              </ol>
              
              <h3>Lợi ích kinh tế của công trình xanh</h3>
              
              <p>
                Mặc dù chi phí đầu tư ban đầu cho công trình xanh có thể cao hơn 2-7% so với công trình thông thường, 
                nhưng lợi ích kinh tế trong dài hạn là rất đáng kể:
              </p>
              
              <table>
                <thead>
                  <tr>
                    <th>Lợi ích</th>
                    <th>Mức tiết kiệm trung bình</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Giảm chi phí năng lượng</td>
                    <td>25-35%</td>
                  </tr>
                  <tr>
                    <td>Giảm chi phí nước</td>
                    <td>30-50%</td>
                  </tr>
                  <tr>
                    <td>Giảm chi phí bảo trì</td>
                    <td>10-20%</td>
                  </tr>
                  <tr>
                    <td>Tăng giá trị tài sản</td>
                    <td>7-15%</td>
                  </tr>
                  <tr>
                    <td>Tăng tỷ lệ cho thuê</td>
                    <td>3-8%</td>
                  </tr>
                </tbody>
              </table>
              
              <p>
                Với các lợi ích trên, thời gian hoàn vốn cho khoản đầu tư bổ sung thường trong khoảng 3-7 năm, 
                trong khi vòng đời của công trình thường kéo dài 50-100 năm.
              </p>
              
              <h3>Lợi ích môi trường và xã hội</h3>
              
              <p>
                Ngoài lợi ích kinh tế, công trình xanh còn mang lại nhiều lợi ích về môi trường và xã hội:
              </p>
              
              <ul>
                <li>Giảm 30-50% lượng phát thải khí nhà kính</li>
                <li>Giảm 30-50% lượng chất thải xây dựng</li>
                <li>Cải thiện chất lượng không khí trong nhà, giúp tăng năng suất lao động lên 8-11%</li>
                <li>Giảm 35% tỷ lệ nghỉ ốm của nhân viên</li>
                <li>Tăng cường hình ảnh doanh nghiệp và sự hài lòng của khách hàng</li>
              </ul>
              
              <h3>Nghiên cứu trường hợp: Tòa nhà văn phòng Green Office Tower</h3>
              
              <p>
                Tòa nhà văn phòng Green Office Tower tại TP.HCM được chứng nhận LEED Gold sau khi đầu tư vào các hệ thống tiết kiệm 
                năng lượng, bao gồm hệ thống điều hòa VRF sử dụng công nghệ Inverter và thu hồi nhiệt. Kết quả sau 24 tháng vận hành:
              </p>
              
              <ul>
                <li>Tiết kiệm 32% chi phí năng lượng so với tòa nhà tương tự</li>
                <li>Giảm 28% lượng phát thải CO2</li>
                <li>Tăng 12% giá cho thuê văn phòng</li>
                <li>Tỷ lệ lấp đầy đạt 95% (cao hơn 15% so với trung bình khu vực)</li>
                <li>Thời gian hoàn vốn cho khoản đầu tư bổ sung: 4.5 năm</li>
              </ul>
              
              <h3>Hướng dẫn đạt được chứng nhận công trình xanh</h3>
              
              <h4>1. Giai đoạn lập kế hoạch và thiết kế</h4>
              <ul>
                <li>Tích hợp tiêu chí xanh ngay từ giai đoạn lập ý tưởng dự án</li>
                <li>Thiết lập mục tiêu cụ thể về mức chứng nhận muốn đạt được</li>
                <li>Lựa chọn đơn vị tư vấn có kinh nghiệm về công trình xanh</li>
                <li>Đánh giá chi phí-lợi ích của các giải pháp xanh khác nhau</li>
              </ul>
              
              <h4>2. Giai đoạn thi công</h4>
              <ul>
                <li>Quản lý chất thải xây dựng, ưu tiên tái chế và tái sử dụng</li>
                <li>Kiểm soát chất lượng thi công để đảm bảo hiệu quả của các giải pháp xanh</li>
                <li>Lưu giữ đầy đủ hồ sơ về nguồn gốc và chứng nhận của vật liệu sử dụng</li>
              </ul>
              
              <h4>3. Giai đoạn vận hành</h4>
              <ul>
                <li>Đào tạo nhân viên vận hành về các hệ thống tiết kiệm năng lượng</li>
                <li>Theo dõi và đánh giá hiệu quả hoạt động của tòa nhà</li>
                <li>Thiết lập kế hoạch bảo trì định kỳ để duy trì hiệu suất tối ưu</li>
                <li>Áp dụng các chiến lược cải tiến liên tục để nâng cao hiệu quả</li>
              </ul>
              
              <h3>Kết luận và khuyến nghị</h3>
              
              <p>
                Đầu tư vào công trình xanh và các hệ thống điều hòa không khí tiết kiệm năng lượng không chỉ là xu hướng 
                mà đã trở thành yêu cầu bắt buộc trong bối cảnh biến đổi khí hậu và giá năng lượng ngày càng tăng. 
                Với lợi ích kinh tế và môi trường rõ rệt, các chủ đầu tư nên cân nhắc nghiêm túc việc áp dụng các 
                tiêu chuẩn công trình xanh cho các dự án mới cũng như cải tạo.
              </p>
              
              <p>
                Các khuyến nghị cho chủ đầu tư và quản lý tòa nhà:
              </p>
              
              <ol>
                <li>Đặt mục tiêu rõ ràng về hiệu suất năng lượng và chứng nhận xanh ngay từ đầu dự án</li>
                <li>Đầu tư vào hệ thống điều hòa không khí tiên tiến, có hiệu suất cao như VRF/VRV với công nghệ Inverter</li>
                <li>Tích hợp hệ thống quản lý năng lượng thông minh để tối ưu hóa vận hành</li>
                <li>Đào tạo người dùng và nhân viên vận hành về các thực hành tiết kiệm năng lượng</li>
                <li>Theo dõi và đánh giá hiệu suất liên tục, thực hiện các điều chỉnh khi cần thiết</li>
              </ol>
              
              <p>
                Với việc áp dụng các tiêu chuẩn công trình xanh và giải pháp điều hòa không khí hiệu quả, 
                chúng ta không chỉ bảo vệ môi trường mà còn tạo ra giá trị kinh tế bền vững trong dài hạn.
              </p>
            </div>
            
            <div className="mt-12 border-t border-b py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Tag className="mr-2" size={20} />
                  <span className="text-muted-foreground">Tags:</span>
                  <div className="flex gap-2 ml-2">
                    <Link to="/publications?tag=green-building" className="text-blue-600 hover:underline">#CôngTrìnhXanh</Link>
                    <Link to="/publications?tag=energy-efficiency" className="text-blue-600 hover:underline">#TiếtKiệmNăngLượng</Link>
                    <Link to="/publications?tag=leed" className="text-blue-600 hover:underline">#LEED</Link>
                  </div>
                </div>
                <div className="flex items-center">
                  <Share2 className="mr-2" size={20} />
                  <span className="text-muted-foreground">Chia sẻ:</span>
                  <div className="flex gap-2 ml-2">
                    <a href="#" className="hover:text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="#" className="hover:text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    </a>
                    <a href="#" className="hover:text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512" fill="currentColor"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Bài viết liên quan</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex h-full">                    <img 
                      src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=300&dpr=1" 
                      alt="Công nghệ Inverter tiên tiến"
                      className="w-1/3 object-cover"
                    />
                    <div className="p-4 w-2/3">
                      <p className="text-sm text-muted-foreground mb-1">15 March 2025</p>
                      <h4 className="font-medium mb-2 line-clamp-2">Công nghệ Inverter tiên tiến: Tối ưu hóa tiêu thụ điện năng trong hệ thống HVAC</h4>
                      <Link to="/publications/inverter-technology" className="text-sm text-blue-600 hover:underline flex items-center">
                        Đọc tiếp
                        <ArrowRight size={14} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex h-full">                    <img 
                      src="https://images.pexels.com/photos/4481326/pexels-photo-4481326.jpeg?auto=compress&cs=tinysrgb&w=300&dpr=1" 
                      alt="Báo cáo hiệu quả tiết kiệm năng lượng"
                      className="w-1/3 object-cover"
                    />
                    <div className="p-4 w-2/3">
                      <p className="text-sm text-muted-foreground mb-1">5 December 2024</p>
                      <h4 className="font-medium mb-2 line-clamp-2">Báo cáo hiệu quả tiết kiệm năng lượng: Phân tích chi phí-lợi ích các công nghệ mới</h4>
                      <Link to="/publications/energy-efficiency-report" className="text-sm text-blue-600 hover:underline flex items-center">
                        Đọc tiếp
                        <ArrowRight size={14} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Tải tài liệu</h3>
                <p className="text-muted-foreground mb-4">
                  Tải xuống hướng dẫn đầy đủ về tiêu chuẩn công trình xanh và các giải pháp tiết kiệm năng lượng
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Tải xuống PDF
                </Button>
              </div>
              
              <div className="border rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Liên hệ chuyên gia</h3>
                <p className="text-muted-foreground mb-4">
                  Cần tư vấn về giải pháp giúp công trình của bạn đạt chứng nhận xanh?
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/contact?subject=green-building">
                    Đặt lịch tư vấn
                  </Link>
                </Button>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Bài viết mới nhất</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <ArrowRight size={16} className="mt-1 text-blue-600" />
                    <div>
                      <Link to="/publications/inverter-technology" className="hover:text-blue-600 font-medium">
                        Công nghệ Inverter tiên tiến
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">15 March 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ArrowRight size={16} className="mt-1 text-blue-600" />
                    <div>
                      <Link to="/publications/heat-recovery-solutions" className="hover:text-blue-600 font-medium">
                        Giải pháp tận dụng nhiệt thải Heat Recovery
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">27 February 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ArrowRight size={16} className="mt-1 text-blue-600" />
                    <div>
                      <Link to="/publications/energy-efficiency-report" className="hover:text-blue-600 font-medium">
                        Báo cáo hiệu quả tiết kiệm năng lượng
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">5 December 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      
      <div className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" asChild>
              <Link to="/publications" className="flex items-center">
                <ArrowLeft className="mr-2" size={16} />
                Quay lại danh sách bài viết
              </Link>
            </Button>
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link to="/contact?subject=green-building">
                Liên hệ tư vấn
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GreenBuildingStandards;

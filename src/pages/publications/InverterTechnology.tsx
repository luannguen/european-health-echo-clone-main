import { ArrowRight, ArrowLeft, FileText, Calendar, Tag, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const InverterTechnology = () => {
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
            <span>Công nghệ Inverter tiên tiến</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Công nghệ Inverter tiên tiến: Tối ưu hóa tiêu thụ điện năng trong hệ thống HVAC</h1>
          <div className="mt-4 flex items-center gap-6">
            <div className="flex items-center">
              <Calendar className="mr-2" size={18} />
              <span>15 March 2025</span>
            </div>
            <div className="flex items-center">
              <FileText className="mr-2" size={18} />
              <span>Báo cáo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <article className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">            <img 
              src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Công nghệ Inverter tiên tiến" 
              className="w-full h-auto rounded-lg mb-8"
            />
            
            <div className="prose prose-lg max-w-none">
              <h2>Tổng quan về công nghệ Inverter trong hệ thống HVAC</h2>
              
              <p>
                Công nghệ Inverter đã tạo ra một cuộc cách mạng trong ngành điều hòa không khí và làm lạnh thương mại. 
                Khác với các hệ thống truyền thống hoạt động theo nguyên lý bật/tắt, công nghệ Inverter cho phép máy nén 
                điều chỉnh tốc độ liên tục, cung cấp chính xác lượng làm lạnh hoặc sưởi ấm cần thiết.
              </p>
              
              <p>
                Trong báo cáo này, chúng tôi phân tích chi tiết về cách thức hoạt động của công nghệ Inverter thế hệ mới, 
                ứng dụng của nó trong các hệ thống HVAC thương mại và dân dụng, cùng với dữ liệu về hiệu quả năng lượng 
                và khả năng tiết kiệm chi phí.
              </p>
              
              <h3>Nguyên lý hoạt động của công nghệ Inverter</h3>
              
              <p>
                Hệ thống Inverter sử dụng biến tần điện tử để điều chỉnh tần số dòng điện cung cấp cho máy nén, 
                từ đó điều khiển tốc độ quay của máy nén. Điều này cho phép:
              </p>
              
              <ul>
                <li>Khởi động và vận hành với công suất thấp, sau đó tăng dần đến mức cần thiết</li>
                <li>Duy trì nhiệt độ ổn định với biên độ dao động tối thiểu (±0.5°C so với ±2°C của hệ thống thông thường)</li>
                <li>Tránh việc khởi động và tắt máy nén liên tục, giảm hao mòn thiết bị</li>
                <li>Tiết kiệm năng lượng đáng kể khi chỉ cần vận hành với công suất một phần</li>
              </ul>
              
              <h3>So sánh hiệu quả năng lượng</h3>
              
              <p>
                Dựa trên các nghiên cứu thực tế và dữ liệu từ các dự án đã triển khai, hệ thống sử dụng công nghệ Inverter 
                có thể tiết kiệm từ 25-40% năng lượng so với hệ thống không sử dụng Inverter. Chi tiết như sau:
              </p>
              
              <table>
                <thead>
                  <tr>
                    <th>Loại công trình</th>
                    <th>Mức tiết kiệm trung bình</th>
                    <th>Thời gian hoàn vốn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Văn phòng</td>
                    <td>30-35%</td>
                    <td>2-3 năm</td>
                  </tr>
                  <tr>
                    <td>Trung tâm thương mại</td>
                    <td>25-30%</td>
                    <td>2.5-3.5 năm</td>
                  </tr>
                  <tr>
                    <td>Khách sạn</td>
                    <td>35-40%</td>
                    <td>1.5-2.5 năm</td>
                  </tr>
                  <tr>
                    <td>Nhà ở</td>
                    <td>30-40%</td>
                    <td>3-4 năm</td>
                  </tr>
                </tbody>
              </table>
              
              <h3>Các công nghệ Inverter tiên tiến</h3>
              
              <p>
                Trong những năm gần đây, công nghệ Inverter đã có những bước tiến đáng kể:
              </p>
              
              <h4>1. Twin Rotary Inverter</h4>
              <p>
                Sử dụng hai rô-to lệch pha nhau 180°, cải thiện hiệu suất và giảm rung động, 
                có khả năng đạt hiệu suất EER lên đến 4.5, cao hơn 15% so với công nghệ Inverter thông thường.
              </p>
              
              <h4>2. Vector Control Inverter</h4>
              <p>
                Áp dụng công nghệ điều khiển vector, cải thiện thời gian phản hồi và độ chính xác trong điều khiển tốc độ, 
                giúp hệ thống đạt đến nhiệt độ mong muốn nhanh hơn tới 30%.
              </p>
              
              <h4>3. DC Inverter với Smart Load Detection</h4>
              <p>
                Tích hợp các thuật toán phát hiện tải thông minh, tự động điều chỉnh công suất dựa trên tải thực tế và 
                điều kiện môi trường, tối ưu hóa hiệu suất năng lượng trong mọi điều kiện vận hành.
              </p>
              
              <h3>Lợi ích bổ sung của công nghệ Inverter</h3>
              
              <p>
                Ngoài việc tiết kiệm năng lượng, công nghệ Inverter còn mang lại nhiều lợi ích khác:
              </p>
              
              <ol>
                <li><strong>Kiểm soát nhiệt độ chính xác hơn</strong> - Duy trì nhiệt độ ổn định với biên độ dao động nhỏ, tạo môi trường thoải mái hơn.</li>
                <li><strong>Vận hành êm hơn</strong> - Giảm thiểu tiếng ồn do tránh được việc khởi động/tắt máy nén liên tục.</li>
                <li><strong>Tuổi thọ thiết bị cao hơn</strong> - Giảm ứng suất cơ học lên máy nén, tăng tuổi thọ thiết bị thêm 20-30%.</li>
                <li><strong>Khả năng xử lý tải biến đổi tốt hơn</strong> - Thích ứng hiệu quả với các thay đổi về tải nhiệt, đặc biệt hữu ích cho các không gian có tải biến đổi lớn trong ngày.</li>
                <li><strong>Giảm phát thải carbon</strong> - Nhờ tiêu thụ năng lượng thấp hơn, góp phần giảm lượng khí thải CO2.</li>
              </ol>
              
              <h3>Nghiên cứu trường hợp: Tòa nhà văn phòng Green Tower</h3>
              
              <p>
                Tòa nhà văn phòng Green Tower với diện tích 12,000m² đã nâng cấp từ hệ thống điều hòa trung tâm thông thường 
                sang hệ thống VRV sử dụng công nghệ Inverter tiên tiến. Kết quả sau 12 tháng vận hành:
              </p>
              
              <ul>
                <li>Giảm 32% chi phí điện năng cho hệ thống điều hòa không khí</li>
                <li>Giảm 28% lượng phát thải CO2</li>
                <li>Thời gian hoàn vốn đầu tư: 2.3 năm</li>
                <li>Cải thiện đáng kể sự hài lòng của người dùng nhờ kiểm soát nhiệt độ chính xác hơn</li>
              </ul>
              
              <h3>Kết luận và khuyến nghị</h3>
              
              <p>
                Công nghệ Inverter tiên tiến không chỉ là một lựa chọn thông minh về mặt kinh tế mà còn là bước tiến quan trọng hướng đến phát triển bền vững. 
                Với khả năng tiết kiệm năng lượng đáng kể, cải thiện độ tin cậy và tuổi thọ thiết bị, đây là giải pháp đáng cân nhắc cho mọi dự án xây dựng 
                mới hoặc cải tạo.
              </p>
              
              <p>
                Đối với các chủ đầu tư và quản lý cơ sở:
              </p>
              
              <ul>
                <li>Nên ưu tiên lựa chọn hệ thống sử dụng công nghệ Inverter cho các dự án mới</li>
                <li>Xem xét việc nâng cấp hệ thống hiện có sang công nghệ Inverter, đặc biệt nếu hệ thống hiện tại đã hoạt động trên 10 năm</li>
                <li>Kết hợp công nghệ Inverter với các hệ thống quản lý năng lượng thông minh để tối đa hóa hiệu quả</li>
                <li>Cân nhắc các chương trình hỗ trợ tài chính và ưu đãi thuế cho các dự án tiết kiệm năng lượng</li>
              </ul>
            </div>
            
            <div className="mt-12 border-t border-b py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Tag className="mr-2" size={20} />
                  <span className="text-muted-foreground">Tags:</span>
                  <div className="flex gap-2 ml-2">
                    <Link to="/publications?tag=inverter" className="text-blue-600 hover:underline">#Inverter</Link>
                    <Link to="/publications?tag=energy-efficiency" className="text-blue-600 hover:underline">#TiếtKiệmNăngLượng</Link>
                    <Link to="/publications?tag=hvac" className="text-blue-600 hover:underline">#HVAC</Link>
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
                  <div className="flex h-full">
                    <img 
                      src="https://images.unsplash.com/photo-1581093458791-9a9cd7db6447?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                      alt="Giải pháp Heat Recovery"
                      className="w-1/3 object-cover"
                    />
                    <div className="p-4 w-2/3">
                      <p className="text-sm text-muted-foreground mb-1">27 February 2025</p>
                      <h4 className="font-medium mb-2 line-clamp-2">Giải pháp tận dụng nhiệt thải Heat Recovery trong hệ thống công nghiệp</h4>
                      <Link to="/publications/heat-recovery-solutions" className="text-sm text-blue-600 hover:underline flex items-center">
                        Đọc tiếp
                        <ArrowRight size={14} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex h-full">
                    <img 
                      src="https://images.unsplash.com/photo-1618004912476-29818d81ae2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
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
                  Tải xuống báo cáo đầy đủ về công nghệ Inverter tiên tiến và ứng dụng trong hệ thống điều hòa không khí
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Tải xuống PDF
                </Button>
              </div>
              
              <div className="border rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Liên hệ chuyên gia</h3>
                <p className="text-muted-foreground mb-4">
                  Cần tư vấn về giải pháp tiết kiệm năng lượng phù hợp cho công trình của bạn?
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/contact?subject=inverter-technology">
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
                      <Link to="/publications/heat-recovery-solutions" className="hover:text-blue-600 font-medium">
                        Giải pháp tận dụng nhiệt thải Heat Recovery
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">27 February 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ArrowRight size={16} className="mt-1 text-blue-600" />
                    <div>
                      <Link to="/publications/green-building-standards" className="hover:text-blue-600 font-medium">
                        Tiêu chuẩn công trình xanh: Lợi ích kinh tế và môi trường
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">10 January 2025</p>
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
              <Link to="/contact?subject=inverter-technology">
                Liên hệ tư vấn
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InverterTechnology;

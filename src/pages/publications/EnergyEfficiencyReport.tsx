import { ArrowRight, ArrowLeft, FileText, Calendar, Tag, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const EnergyEfficiencyReport = () => {
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
            <span>Báo cáo hiệu quả tiết kiệm năng lượng</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Báo cáo hiệu quả tiết kiệm năng lượng: Phân tích chi phí-lợi ích các công nghệ mới</h1>
          <div className="mt-4 flex items-center gap-6">
            <div className="flex items-center">
              <Calendar className="mr-2" size={18} />
              <span>5 December 2024</span>
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
          <div className="lg:col-span-2">
            <img 
              src="https://images.unsplash.com/photo-1618004912476-29818d81ae2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
              alt="Báo cáo hiệu quả tiết kiệm năng lượng" 
              className="w-full h-auto rounded-lg mb-8"
            />
            
            <div className="prose prose-lg max-w-none">
              <h2>Tổng quan về các công nghệ tiết kiệm năng lượng mới</h2>
              
              <p>
                Trong bối cảnh giá năng lượng tăng cao và nhu cầu giảm thiểu tác động môi trường, các công nghệ 
                tiết kiệm năng lượng đang ngày càng được các doanh nghiệp và chủ đầu tư quan tâm. Báo cáo này phân tích 
                chi tiết về hiệu quả đầu tư của các công nghệ tiết kiệm năng lượng mới nhất trong lĩnh vực điều hòa không khí 
                và làm lạnh thương mại.
              </p>
              
              <p>
                Chúng tôi đã thu thập dữ liệu từ hơn 200 dự án thực tế tại Việt Nam và khu vực Đông Nam Á 
                trong giai đoạn 2022-2024 để đưa ra những đánh giá khách quan và toàn diện về hiệu quả kinh tế, 
                thời gian hoàn vốn và tác động môi trường của các công nghệ này.
              </p>
              
              <h3>1. So sánh hiệu quả đầu tư các công nghệ hiện đại</h3>
              
              <p>
                Bảng dưới đây tổng hợp các thông số chính về hiệu quả đầu tư của các công nghệ tiết kiệm năng lượng phổ biến:
              </p>
              
              <table>
                <thead>
                  <tr>
                    <th>Công nghệ</th>
                    <th>Chi phí đầu tư ban đầu</th>
                    <th>Tiết kiệm năng lượng</th>
                    <th>Thời gian hoàn vốn</th>
                    <th>Tuổi thọ trung bình</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>VRF/VRV Inverter thế hệ mới</td>
                    <td>Cao</td>
                    <td>30-40%</td>
                    <td>3-4 năm</td>
                    <td>15-20 năm</td>
                  </tr>
                  <tr>
                    <td>Hệ thống thu hồi nhiệt (Heat Recovery)</td>
                    <td>Trung bình-Cao</td>
                    <td>25-35%</td>
                    <td>2-4 năm</td>
                    <td>15-18 năm</td>
                  </tr>
                  <tr>
                    <td>Máy làm lạnh hiệu suất cao (High-efficiency Chillers)</td>
                    <td>Rất cao</td>
                    <td>20-30%</td>
                    <td>4-6 năm</td>
                    <td>20-25 năm</td>
                  </tr>
                  <tr>
                    <td>Hệ thống quản lý năng lượng thông minh (BMS)</td>
                    <td>Trung bình</td>
                    <td>15-25%</td>
                    <td>2-3 năm</td>
                    <td>10-15 năm</td>
                  </tr>
                  <tr>
                    <td>Kết hợp điều hòa với năng lượng mặt trời</td>
                    <td>Rất cao</td>
                    <td>40-60%</td>
                    <td>5-8 năm</td>
                    <td>20-25 năm</td>
                  </tr>
                </tbody>
              </table>
              
              <h3>2. Phân tích chi tiết theo loại công trình</h3>
              
              <h4>2.1 Tòa nhà văn phòng</h4>
              <p>
                Tòa nhà văn phòng thường có tải nhiệt lớn từ các thiết bị điện tử và mật độ người sử dụng cao, 
                đồng thời có thời gian vận hành dài (8-10 giờ/ngày, 5-6 ngày/tuần).
              </p>
              
              <p>                <strong>Giải pháp tối ưu:</strong> Hệ thống VRF/VRV Inverter kết hợp với BMS thông minh có thể tiết kiệm 
                trung bình 35% chi phí năng lượng, với thời gian hoàn vốn khoảng 3.5 năm. Đối với các tòa nhà lớn ({'>'} 10,000m²), 
                hệ thống chiller hiệu suất cao kết hợp với hệ thống thu hồi nhiệt có thể mang lại hiệu quả kinh tế tốt hơn trong dài hạn.
              </p>
              
              <h4>2.2 Trung tâm thương mại</h4>
              <p>
                Trung tâm thương mại có đặc điểm là tải nhiệt biến đổi lớn theo giờ trong ngày và theo mùa, đồng thời 
                có các khu vực với yêu cầu nhiệt độ khác nhau.
              </p>
              
              <p>
                <strong>Giải pháp tối ưu:</strong> Hệ thống VRF/VRV multi-zone với khả năng vận hành độc lập từng khu vực, 
                kết hợp với hệ thống DOAS (Dedicated Outdoor Air System) để kiểm soát độ ẩm và chất lượng không khí. 
                Giải pháp này có thể tiết kiệm 25-30% chi phí năng lượng với thời gian hoàn vốn khoảng 4 năm.
              </p>
              
              <h4>2.3 Khách sạn</h4>
              <p>
                Khách sạn có nhu cầu đồng thời về điều hòa không khí và nước nóng, đồng thời có yêu cầu cao về độ ồn và tiện nghi.
              </p>
              
              <p>
                <strong>Giải pháp tối ưu:</strong> Hệ thống VRF/VRV ba đường ống với chức năng thu hồi nhiệt để sản xuất nước nóng 
                từ quá trình làm lạnh. Giải pháp này có thể tiết kiệm tới 40% tổng chi phí năng lượng (điều hòa và nước nóng), 
                với thời gian hoàn vốn khoảng 3 năm.
              </p>
              
              <h4>2.4 Cơ sở sản xuất và công nghiệp</h4>
              <p>
                Các cơ sở sản xuất thường có tải nhiệt lớn từ máy móc thiết bị, yêu cầu cao về chất lượng không khí, 
                và nhu cầu làm mát quá trình.
              </p>
              
              <p>
                <strong>Giải pháp tối ưu:</strong> Hệ thống làm mát kết hợp (hybrid cooling) sử dụng làm mát tự nhiên khi điều kiện 
                thời tiết cho phép và chuyển sang làm mát cơ khí khi cần thiết. Đối với quy mô lớn, hệ thống chiller hiệu suất cao 
                kết hợp với hệ thống thu hồi nhiệt từ quá trình sản xuất có thể tiết kiệm 30-45% năng lượng với thời gian hoàn vốn 4-5 năm.
              </p>
              
              <h3>3. Phân tích ROI (Return on Investment)</h3>
              
              <p>
                Phân tích ROI được thực hiện dựa trên dữ liệu thực tế từ các dự án đã triển khai, với giả định giá điện 
                tăng trung bình 5%/năm và chi phí bảo trì hàng năm bằng 2-3% giá trị đầu tư ban đầu.
              </p>
              
              <div className="not-prose my-8">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold mb-4">ROI trung bình sau 10 năm sử dụng:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between">
                      <span>VRF/VRV Inverter thế hệ mới:</span>
                      <span className="font-semibold text-green-600">280%</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Hệ thống thu hồi nhiệt:</span>
                      <span className="font-semibold text-green-600">320%</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Máy làm lạnh hiệu suất cao:</span>
                      <span className="font-semibold text-green-600">210%</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Hệ thống quản lý năng lượng thông minh:</span>
                      <span className="font-semibold text-green-600">390%</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Kết hợp điều hòa với năng lượng mặt trời:</span>
                      <span className="font-semibold text-green-600">180%</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <p>
                Kết quả phân tích cho thấy, mặc dù chi phí đầu tư ban đầu cao hơn, các công nghệ tiết kiệm năng lượng 
                hiện đại đều mang lại lợi nhuận đầu tư tích cực trong dài hạn, với ROI trung bình từ 180% đến 390% sau 10 năm sử dụng.
              </p>
              
              <h3>4. Ảnh hưởng của các chính sách hỗ trợ và ưu đãi</h3>
              
              <p>
                Nhiều quốc gia trong khu vực Đông Nam Á, bao gồm Việt Nam, đang áp dụng các chính sách hỗ trợ và ưu đãi 
                cho các dự án tiết kiệm năng lượng. Những chính sách này có thể cải thiện đáng kể hiệu quả đầu tư:
              </p>
              
              <ul>
                <li>Miễn giảm thuế nhập khẩu cho thiết bị tiết kiệm năng lượng (giảm 5-10% chi phí đầu tư)</li>
                <li>Ưu đãi thuế thu nhập doanh nghiệp cho dự án xanh (giảm 10-15% thuế TNDN)</li>
                <li>Hỗ trợ lãi suất cho các khoản vay đầu tư vào công nghệ tiết kiệm năng lượng (giảm 2-3% lãi suất)</li>
                <li>Trợ giá cho các dự án sử dụng năng lượng tái tạo kết hợp (20-30% chi phí đầu tư)</li>
              </ul>
              
              <p>
                Khi áp dụng các chính sách hỗ trợ và ưu đãi, thời gian hoàn vốn của các dự án có thể giảm thêm 15-25%, 
                làm tăng đáng kể tính hấp dẫn của các khoản đầu tư này.
              </p>
              
              <h3>5. Nghiên cứu trường hợp: Dự án cải tạo khách sạn Luxury Palace</h3>
              
              <p>
                Khách sạn Luxury Palace (180 phòng) đã thay thế hệ thống điều hòa không khí và cung cấp nước nóng truyền thống 
                bằng hệ thống VRF/VRV thu hồi nhiệt kết hợp với BMS thông minh. Kết quả sau 24 tháng vận hành:
              </p>
              
              <ul>
                <li>Chi phí đầu tư ban đầu: 5.2 tỷ đồng</li>
                <li>Tiết kiệm năng lượng hàng năm: 38% (tương đương 1.8 tỷ đồng/năm)</li>
                <li>Giảm chi phí bảo trì: 20% (tương đương 0.2 tỷ đồng/năm)</li>
                <li>Thời gian hoàn vốn thực tế: 2.6 năm</li>
                <li>ROI sau 10 năm: 360%</li>
                <li>Giảm lượng phát thải CO2: 320 tấn/năm</li>
              </ul>
              
              <p>
                Ngoài lợi ích kinh tế, dự án cũng cải thiện đáng kể sự thoải mái cho khách hàng, với tỷ lệ hài lòng tăng từ 82% lên 94%.
              </p>
              
              <h3>6. Tác động môi trường và phát triển bền vững</h3>
              
              <p>
                Ngoài hiệu quả kinh tế, các công nghệ tiết kiệm năng lượng còn mang lại những lợi ích đáng kể về môi trường:
              </p>
              
              <table>
                <thead>
                  <tr>
                    <th>Công nghệ</th>
                    <th>Giảm phát thải CO2</th>
                    <th>Giảm sử dụng môi chất lạnh</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>VRF/VRV Inverter thế hệ mới</td>
                    <td>25-35%</td>
                    <td>10-20%</td>
                  </tr>
                  <tr>
                    <td>Hệ thống thu hồi nhiệt</td>
                    <td>20-30%</td>
                    <td>5-10%</td>
                  </tr>
                  <tr>
                    <td>Máy làm lạnh hiệu suất cao</td>
                    <td>15-25%</td>
                    <td>15-25%</td>
                  </tr>
                  <tr>
                    <td>Kết hợp điều hòa với năng lượng mặt trời</td>
                    <td>40-60%</td>
                    <td>0%</td>
                  </tr>
                </tbody>
              </table>
              
              <p>
                Việc áp dụng các công nghệ này không chỉ giúp doanh nghiệp tiết kiệm chi phí mà còn đóng góp đáng kể 
                cho mục tiêu giảm phát thải khí nhà kính và phát triển bền vững.
              </p>
              
              <h3>7. Kết luận và khuyến nghị</h3>
              
              <p>
                Dựa trên phân tích chi phí-lợi ích toàn diện, báo cáo đưa ra các khuyến nghị sau cho các doanh nghiệp 
                và chủ đầu tư:
              </p>
              
              <ol>
                <li>
                  <strong>Đối với dự án mới:</strong> Ưu tiên lựa chọn các công nghệ tiết kiệm năng lượng hiện đại ngay từ đầu, 
                  mặc dù chi phí đầu tư cao hơn, nhưng sẽ mang lại hiệu quả kinh tế tốt hơn trong dài hạn và tránh 
                  chi phí cải tạo sau này.
                </li>
                <li>
                  <strong>Đối với cải tạo:</strong> Cân nhắc từng bước, bắt đầu từ các giải pháp có thời gian hoàn vốn ngắn như 
                  BMS thông minh, sau đó tiến đến các giải pháp tổng thể khi tài chính cho phép.
                </li>
                <li>
                  <strong>Kết hợp nhiều công nghệ:</strong> Phối hợp các công nghệ khác nhau (ví dụ: VRF/VRV + thu hồi nhiệt + BMS) 
                  có thể tối ưu hóa hiệu quả đầu tư so với việc chỉ áp dụng một công nghệ đơn lẻ.
                </li>
                <li>
                  <strong>Tận dụng các chính sách hỗ trợ:</strong> Chủ động tìm hiểu và tận dụng các chính sách ưu đãi, 
                  hỗ trợ của chính phủ để cải thiện hiệu quả đầu tư.
                </li>
                <li>
                  <strong>Đào tạo nhân viên vận hành:</strong> Đầu tư vào đào tạo nhân viên vận hành là yếu tố quan trọng 
                  để đảm bảo các hệ thống hoạt động ở hiệu suất tối ưu.
                </li>
              </ol>
              
              <p>
                Tóm lại, các công nghệ tiết kiệm năng lượng hiện đại mang lại hiệu quả đầu tư tích cực trong dài hạn, 
                với ROI trung bình từ 180% đến 390% sau 10 năm sử dụng. Đầu tư vào các công nghệ này không chỉ là quyết định 
                kinh doanh thông minh mà còn là một phần của trách nhiệm xã hội doanh nghiệp trong việc bảo vệ môi trường 
                và phát triển bền vững.
              </p>
            </div>
            
            <div className="mt-12 border-t border-b py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Tag className="mr-2" size={20} />
                  <span className="text-muted-foreground">Tags:</span>
                  <div className="flex gap-2 ml-2">
                    <Link to="/publications?tag=energy-efficiency" className="text-blue-600 hover:underline">#TiếtKiệmNăngLượng</Link>
                    <Link to="/publications?tag=roi" className="text-blue-600 hover:underline">#ROI</Link>
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
                      src="https://images.unsplash.com/photo-1548872591-c72c3fc1c836?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
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
                  <div className="flex h-full">
                    <img 
                      src="https://images.unsplash.com/photo-1581093458791-9a9cd7db6447?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                      alt="Giải pháp tận dụng nhiệt thải Heat Recovery"
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
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Tải tài liệu</h3>
                <p className="text-muted-foreground mb-4">
                  Tải xuống báo cáo đầy đủ về phân tích chi phí-lợi ích các công nghệ tiết kiệm năng lượng mới
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Tải xuống PDF
                </Button>
              </div>
              
              <div className="border rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Liên hệ chuyên gia</h3>
                <p className="text-muted-foreground mb-4">
                  Cần tư vấn về giải pháp tiết kiệm năng lượng phù hợp cho dự án của bạn?
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/contact?subject=energy-efficiency-report">
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
                      <Link to="/publications/green-building-standards" className="hover:text-blue-600 font-medium">
                        Tiêu chuẩn công trình xanh
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">10 January 2025</p>
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
              <Link to="/contact?subject=energy-efficiency-report">
                Liên hệ tư vấn
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnergyEfficiencyReport;

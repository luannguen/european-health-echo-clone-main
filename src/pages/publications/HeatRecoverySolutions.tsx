import { ArrowRight, ArrowLeft, FileText, Calendar, Tag, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeatRecoverySolutions = () => {
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
            <span>Giải pháp Heat Recovery</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Giải pháp tận dụng nhiệt thải Heat Recovery trong hệ thống công nghiệp</h1>
          <div className="mt-4 flex items-center gap-6">
            <div className="flex items-center">
              <Calendar className="mr-2" size={18} />
              <span>27 February 2025</span>
            </div>
            <div className="flex items-center">
              <FileText className="mr-2" size={18} />
              <span>Nghiên cứu</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <article className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">            <img 
              src="https://images.pexels.com/photos/3779835/pexels-photo-3779835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Giải pháp Heat Recovery" 
              className="w-full h-auto rounded-lg mb-8"
            />
            
            <div className="prose prose-lg max-w-none">
              <h2>Giới thiệu về công nghệ Heat Recovery</h2>
              
              <p>
                Hệ thống điều hòa không khí và làm lạnh trong các công trình thương mại và công nghiệp thải ra một lượng lớn nhiệt thừa. 
                Thay vì để nhiệt năng này lãng phí, công nghệ Heat Recovery (thu hồi nhiệt) cung cấp giải pháp tận dụng hiệu quả 
                nguồn năng lượng này, giúp giảm đáng kể chi phí vận hành và tác động môi trường.
              </p>
              
              <p>
                Trong nghiên cứu này, chúng tôi phân tích các giải pháp thu hồi nhiệt hiện đại, ứng dụng thực tế của chúng 
                trong môi trường công nghiệp và thương mại, cùng với dữ liệu về hiệu quả kinh tế và môi trường.
              </p>
              
              <h3>Nguyên lý hoạt động của hệ thống Heat Recovery</h3>
              
              <p>
                Hệ thống Heat Recovery hoạt động dựa trên nguyên tắc chuyển đổi và tái sử dụng nhiệt thay vì thải bỏ. 
                Các công nghệ chính bao gồm:
              </p>
              
              <ul>
                <li>
                  <strong>Trao đổi nhiệt không khí-không khí:</strong> Sử dụng thiết bị trao đổi nhiệt để truyền nhiệt từ luồng không khí thải ra luồng không khí mới đi vào.
                </li>
                <li>
                  <strong>Thu hồi nhiệt từ ga nóng:</strong> Thu hồi nhiệt từ khí ga nóng sau khi ra khỏi máy nén trong hệ thống làm lạnh để sử dụng cho mục đích khác như đun nước nóng.
                </li>
                <li>
                  <strong>Hệ thống ba đường ống (3-pipe system):</strong> Cho phép đồng thời làm lạnh và sưởi ấm bằng cách chuyển nhiệt giữa các khu vực khác nhau trong cùng một tòa nhà.
                </li>
                <li>
                  <strong>Thu hồi nhiệt từ nước thải:</strong> Sử dụng nhiệt từ nước thải công nghiệp cho các quá trình khác cần nhiệt độ thấp.
                </li>
              </ul>
              
              <h3>Phân tích hiệu quả kinh tế</h3>
              
              <p>
                Dựa trên dữ liệu từ các dự án thực tế, việc triển khai hệ thống Heat Recovery có thể mang lại lợi ích kinh tế đáng kể:
              </p>
              
              <table>
                <thead>
                  <tr>
                    <th>Loại hệ thống</th>
                    <th>Tiết kiệm năng lượng</th>
                    <th>Thời gian hoàn vốn</th>
                    <th>Chi phí đầu tư ban đầu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Thu hồi nhiệt không khí</td>
                    <td>15-25%</td>
                    <td>2-4 năm</td>
                    <td>Trung bình</td>
                  </tr>
                  <tr>
                    <td>Thu hồi nhiệt ga nóng</td>
                    <td>20-40%</td>
                    <td>1.5-3 năm</td>
                    <td>Trung bình-Cao</td>
                  </tr>
                  <tr>
                    <td>Hệ thống ba đường ống</td>
                    <td>30-50%</td>
                    <td>2-5 năm</td>
                    <td>Cao</td>
                  </tr>
                  <tr>
                    <td>Thu hồi nhiệt nước thải</td>
                    <td>10-30%</td>
                    <td>3-6 năm</td>
                    <td>Thấp-Trung bình</td>
                  </tr>
                </tbody>
              </table>
              
              <p>
                Chi phí đầu tư ban đầu cho hệ thống Heat Recovery có thể cao hơn so với hệ thống thông thường, nhưng thời gian hoàn vốn 
                thường ngắn nhờ vào lượng năng lượng tiết kiệm được đáng kể.
              </p>
              
              <h3>Ứng dụng trong các ngành công nghiệp</h3>
              
              <h4>1. Ngành chế biến thực phẩm</h4>
              <p>
                Trong ngành chế biến thực phẩm, nhiệt thải từ quá trình làm lạnh và đông lạnh sản phẩm có thể được thu hồi để sử dụng 
                cho các quá trình làm nóng như thanh trùng, tiệt trùng hoặc sấy khô. Việc này có thể tiết kiệm tới 35% năng lượng 
                nhiệt và giảm chi phí vận hành đáng kể.
              </p>
              
              <h4>2. Ngành dệt may</h4>
              <p>
                Các nhà máy dệt may tiêu thụ lượng lớn năng lượng nhiệt và điện. Hệ thống thu hồi nhiệt từ nước thải và 
                khí thải có thể tái sử dụng nhiệt cho quá trình giặt, nhuộm và sấy, giúp giảm chi phí năng lượng tới 25%.
              </p>
              
              <h4>3. Ngành khách sạn và trung tâm thương mại</h4>
              <p>
                Với nhu cầu đồng thời về làm mát và nước nóng, hệ thống VRV/VRF với chức năng thu hồi nhiệt là giải pháp lý tưởng. 
                Nhiệt thải từ việc làm mát các khu vực như trung tâm mua sắm, nhà hàng có thể được chuyển để làm nóng nước hoặc sưởi ấm 
                các khu vực khác như phòng khách sạn hoặc spa.
              </p>
              
              <h4>4. Ngành sản xuất</h4>
              <p>
                Trong các nhà máy sản xuất, nhiệt thải từ máy móc, lò nung, và các quá trình công nghiệp có thể được thu hồi để 
                cấp nhiệt cho các quá trình khác hoặc để sưởi ấm không gian văn phòng, giảm đáng kể nhu cầu năng lượng sưởi ấm.
              </p>
              
              <h3>Công nghệ Heat Recovery tiên tiến</h3>
              
              <h4>1. Hệ thống VRF với Heat Recovery thế hệ mới</h4>
              <p>
                Các hệ thống VRF (Variable Refrigerant Flow) tích hợp công nghệ thu hồi nhiệt hiện đại cho phép tái sử dụng nhiệt 
                thải để làm nóng nước hoặc sưởi ấm không gian khác trong cùng thời điểm làm mát, đạt hiệu suất năng lượng (COP) lên đến 7.0.
              </p>
              
              <h4>2. Heat Recovery Chillers</h4>
              <p>
                Máy làm lạnh nước với chức năng thu hồi nhiệt có thể sản xuất đồng thời nước lạnh và nước nóng, 
                tối ưu hóa hiệu quả năng lượng và giảm chi phí vận hành cho các công trình lớn như khách sạn, bệnh viện hoặc trung tâm dữ liệu.
              </p>
              
              <h4>3. Hệ thống thu hồi nhiệt từ khí thải công nghiệp</h4>
              <p>
                Các hệ thống trao đổi nhiệt hiệu suất cao có thể thu hồi đến 85% nhiệt thải từ các quá trình công nghiệp, 
                giúp tiết kiệm đáng kể chi phí năng lượng và giảm phát thải khí nhà kính.
              </p>
              
              <h3>Nghiên cứu trường hợp: Nhà máy chế biến thực phẩm Foodtech</h3>
              
              <p>
                Nhà máy chế biến thực phẩm Foodtech đã triển khai hệ thống thu hồi nhiệt từ quá trình làm lạnh để cung cấp 
                nước nóng cho quy trình vệ sinh và thanh trùng. Kết quả sau 18 tháng vận hành:
              </p>
              
              <ul>
                <li>Giảm 38% chi phí năng lượng cho việc đun nước nóng</li>
                <li>Giảm 25% tổng lượng phát thải CO2 của nhà máy</li>
                <li>Thời gian hoàn vốn đầu tư: 2.2 năm</li>
                <li>Giảm tải cho hệ thống làm mát, kéo dài tuổi thọ thiết bị</li>
              </ul>
              
              <h3>Kết luận và khuyến nghị</h3>
              
              <p>
                Công nghệ Heat Recovery không chỉ là giải pháp tiết kiệm chi phí mà còn là một phần quan trọng của chiến lược 
                phát triển bền vững trong lĩnh vực công nghiệp và thương mại. Với khả năng tiết kiệm năng lượng đáng kể và 
                thời gian hoàn vốn tương đối ngắn, đây là lựa chọn đáng cân nhắc cho mọi dự án cải tạo hoặc xây dựng mới.
              </p>
              
              <p>
                Các khuyến nghị cho doanh nghiệp khi triển khai hệ thống thu hồi nhiệt:
              </p>
              
              <ol>
                <li>
                  <strong>Đánh giá toàn diện:</strong> Tiến hành đánh giá chi tiết về nguồn nhiệt thải và nhu cầu sử dụng nhiệt 
                  trong cơ sở để xác định giải pháp Heat Recovery phù hợp nhất.
                </li>
                <li>
                  <strong>Tính toán ROI:</strong> Phân tích cụ thể về thời gian hoàn vốn và lợi ích dài hạn để đưa ra quyết định đầu tư chính xác.
                </li>
                <li>
                  <strong>Lựa chọn công nghệ phù hợp:</strong> Không phải mọi giải pháp Heat Recovery đều phù hợp với mọi ứng dụng. 
                  Cần cân nhắc kỹ lưỡng các yếu tố như nhiệt độ, lưu lượng, và khoảng cách giữa nguồn nhiệt và nơi sử dụng.
                </li>
                <li>
                  <strong>Tích hợp với hệ thống quản lý năng lượng:</strong> Kết hợp hệ thống Heat Recovery với các hệ thống quản lý 
                  năng lượng thông minh để tối ưu hóa hiệu quả hoạt động.
                </li>
                <li>
                  <strong>Bảo trì định kỳ:</strong> Đảm bảo hiệu suất tối ưu thông qua chương trình bảo trì và kiểm tra định kỳ.
                </li>
              </ol>
              
              <p>
                Với việc áp dụng đúng đắn, công nghệ Heat Recovery có thể trở thành một trong những giải pháp hiệu quả nhất để 
                cắt giảm chi phí năng lượng và giảm tác động môi trường của các hoạt động công nghiệp và thương mại.
              </p>
            </div>
            
            <div className="mt-12 border-t border-b py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Tag className="mr-2" size={20} />
                  <span className="text-muted-foreground">Tags:</span>
                  <div className="flex gap-2 ml-2">
                    <Link to="/publications?tag=heat-recovery" className="text-blue-600 hover:underline">#HeatRecovery</Link>
                    <Link to="/publications?tag=energy-efficiency" className="text-blue-600 hover:underline">#TiếtKiệmNăngLượng</Link>
                    <Link to="/publications?tag=industry" className="text-blue-600 hover:underline">#CôngNghiệp</Link>
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
                      src="https://images.unsplash.com/photo-1548407260-da850faa41e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                      alt="Tiêu chuẩn công trình xanh"
                      className="w-1/3 object-cover"
                    />
                    <div className="p-4 w-2/3">
                      <p className="text-sm text-muted-foreground mb-1">10 January 2025</p>
                      <h4 className="font-medium mb-2 line-clamp-2">Tiêu chuẩn công trình xanh: Lợi ích kinh tế và môi trường trong dài hạn</h4>
                      <Link to="/publications/green-building-standards" className="text-sm text-blue-600 hover:underline flex items-center">
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
                  Tải xuống nghiên cứu đầy đủ về giải pháp Heat Recovery và ứng dụng trong công nghiệp
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Tải xuống PDF
                </Button>
              </div>
              
              <div className="border rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Liên hệ chuyên gia</h3>
                <p className="text-muted-foreground mb-4">
                  Cần tư vấn về giải pháp thu hồi nhiệt phù hợp cho doanh nghiệp của bạn?
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/contact?subject=heat-recovery">
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
              <Link to="/contact?subject=heat-recovery">
                Liên hệ tư vấn
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeatRecoverySolutions;

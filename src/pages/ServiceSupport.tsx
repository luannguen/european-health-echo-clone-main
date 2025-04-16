import { ArrowRight, Clock, FileCheck, Wrench, Shield, Cog, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Link } from "react-router-dom";

const ServiceSupport = () => {
  return (
    <>
        {/* Hero Section */}
        <section className="bg-primary py-12 text-white">
          <div className="container-custom">
            <h1 className="text-white mb-6">Dịch vụ kỹ thuật</h1>
            <p className="text-xl md:text-2xl max-w-3xl mb-6">
              Cung cấp dịch vụ kỹ thuật điện lạnh chuyên nghiệp với đội ngũ kỹ sư giàu kinh nghiệm, phục vụ 24/7.
            </p>
          </div>
        </section>

        {/* Our Services Section */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="mb-8">Dịch vụ của chúng tôi</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              <div className="bg-muted p-6 rounded-lg">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <FileCheck className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Tư vấn thiết kế</h3>
                <p className="text-muted-foreground mb-4">
                  Đưa ra giải pháp thiết kế hệ thống điện lạnh tối ưu cho mọi loại công trình dân dụng và công nghiệp.
                </p>
              </div>
              
              <div className="bg-muted p-6 rounded-lg">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Wrench className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Lắp đặt chuyên nghiệp</h3>
                <p className="text-muted-foreground mb-4">
                  Dịch vụ lắp đặt hệ thống điện lạnh công nghiệp và dân dụng với tiêu chuẩn kỹ thuật cao.
                </p>
              </div>
              
              <div className="bg-muted p-6 rounded-lg">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Cog className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Bảo trì định kỳ</h3>
                <p className="text-muted-foreground mb-4">
                  Chương trình bảo trì định kỳ giúp hệ thống vận hành ổn định, kéo dài tuổi thọ thiết bị và tiết kiệm chi phí.
                </p>
              </div>
              
              <div className="bg-muted p-6 rounded-lg">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Shield className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sửa chữa khẩn cấp</h3>
                <p className="text-muted-foreground mb-4">
                  Dịch vụ sửa chữa nhanh chóng, khắc phục sự cố 24/7 với đội ngũ kỹ thuật viên chuyên nghiệp.
                </p>
              </div>
              
              <div className="bg-muted p-6 rounded-lg">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Clock className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Nâng cấp hệ thống</h3>
                <p className="text-muted-foreground mb-4">
                  Tư vấn và thực hiện nâng cấp hệ thống điện lạnh cũ, áp dụng công nghệ mới tiết kiệm năng lượng.
                </p>
              </div>
            </div>
            
            <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
              <h3 className="text-xl font-semibold mb-3">Hỗ trợ tùy chỉnh</h3>
              <p className="mb-4">
                Chúng tôi cung cấp dịch vụ kỹ thuật tùy chỉnh theo yêu cầu cụ thể của từng khách hàng và đặc thù của công trình.
              </p>
              <Link to="/contact" className="inline-flex items-center text-accent hover:text-primary transition-colors font-medium">
                Liên hệ để biết thêm thông tin
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Service Process Section */}
        <section className="py-12 bg-muted">
          <div className="container-custom">
            <h2 className="mb-8">Quy trình làm việc</h2>
            
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm relative">
                <div className="absolute -top-4 -left-4 bg-secondary w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
                <h3 className="text-lg font-semibold mb-3">Khảo sát</h3>
                <p className="text-muted-foreground">
                  Đánh giá hiện trạng, xác định nhu cầu và yêu cầu kỹ thuật của công trình.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm relative">
                <div className="absolute -top-4 -left-4 bg-secondary w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
                <h3 className="text-lg font-semibold mb-3">Lập kế hoạch</h3>
                <p className="text-muted-foreground">
                  Xây dựng phương án kỹ thuật và lịch trình thực hiện phù hợp.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm relative">
                <div className="absolute -top-4 -left-4 bg-secondary w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
                <h3 className="text-lg font-semibold mb-3">Triển khai</h3>
                <p className="text-muted-foreground">
                  Thực hiện công việc với đội ngũ kỹ thuật chuyên nghiệp, đảm bảo tiến độ.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm relative">
                <div className="absolute -top-4 -left-4 bg-secondary w-8 h-8 rounded-full flex items-center justify-center font-bold">4</div>
                <h3 className="text-lg font-semibold mb-3">Nghiệm thu</h3>
                <p className="text-muted-foreground">
                  Kiểm tra, đánh giá kết quả và bàn giao với cam kết chất lượng dịch vụ.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Expertise Section */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="mb-8">Lĩnh vực chuyên môn</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <h3 className="text-xl font-semibold mb-4">Hệ thống công nghiệp</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <span>Điều hòa không khí trung tâm</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <span>Kho lạnh công nghiệp</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <span>Hệ thống làm mát nhà xưởng</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <span>Hệ thống lạnh cho quy trình sản xuất</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <span>Giải pháp tiết kiệm năng lượng</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Hệ thống thương mại</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <span>Điều hòa cho văn phòng, trung tâm thương mại</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <span>Tủ lạnh, tủ đông thương mại</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <span>Hệ thống quầy kệ lạnh siêu thị</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <span>Giải pháp lạnh cho nhà hàng, khách sạn</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <span>Hệ thống VRV/VRF cho cao ốc</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <Separator className="my-10" />
            
            <h3 className="text-xl font-semibold mb-6">Bảng giá dịch vụ</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Loại dịch vụ</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead className="text-right w-[150px]">Thời gian đáp ứng</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Bảo trì định kỳ</TableCell>
                  <TableCell>Kiểm tra, vệ sinh và bảo dưỡng hệ thống theo lịch</TableCell>
                  <TableCell className="text-right">Theo lịch hẹn</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Sửa chữa khẩn cấp</TableCell>
                  <TableCell>Khắc phục sự cố nhanh chóng, giảm thiểu thời gian ngừng hoạt động</TableCell>
                  <TableCell className="text-right">2-4 giờ</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tư vấn kỹ thuật</TableCell>
                  <TableCell>Đánh giá và tư vấn giải pháp tối ưu cho hệ thống</TableCell>
                  <TableCell className="text-right">Theo yêu cầu</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Lắp đặt mới</TableCell>
                  <TableCell>Lắp đặt hệ thống điện lạnh mới theo tiêu chuẩn</TableCell>
                  <TableCell className="text-right">Theo dự án</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-12 bg-muted">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="mb-4">Liên hệ với chúng tôi</h2>
                <p className="text-muted-foreground mb-6">
                  Hãy liên hệ với đội ngũ kỹ thuật của chúng tôi để được tư vấn và báo giá các dịch vụ điện lạnh phù hợp với nhu cầu của bạn.
                </p>
                <div className="flex items-center mb-4">
                  <Mail className="text-primary mr-3" />
                  <a href="mailto:support@dienlanhvn.com" className="text-accent hover:underline">support@dienlanhvn.com</a>
                </div>
                <Link to="/contact" className="btn-primary inline-flex items-center">
                  Liên hệ ngay
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Đội ngũ kỹ thuật</h3>
                <p className="mb-4">
                  Đội ngũ kỹ sư và kỹ thuật viên giàu kinh nghiệm của chúng tôi luôn sẵn sàng hỗ trợ mọi vấn đề về hệ thống điện lạnh.
                </p>
                <p className="text-muted-foreground">
                  Giờ làm việc: Thứ Hai - Thứ Bảy, 7:30 - 18:00
                  <br />
                  Hỗ trợ khẩn cấp: 24/7
                </p>
              </div>
            </div>
          </div>
        </section>
    </>
  );
};

export default ServiceSupport;

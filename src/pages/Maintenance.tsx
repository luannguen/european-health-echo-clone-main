import { ArrowRight, Cog, CheckCircle2, BarChart3, Clock, Award, Calendar, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Maintenance = () => {
  return (
    <>
        {/* Hero Section */}
        <section className="bg-primary py-12 text-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="md:w-1/2">
                <h1 className="text-white mb-4">Dịch vụ bảo trì định kỳ</h1>
                <p className="text-xl opacity-90 mb-6">
                  Duy trì hiệu suất tối ưu và kéo dài tuổi thọ thiết bị điện lạnh với các gói bảo trì định kỳ chuyên nghiệp.
                </p>
                <div className="flex gap-4">
                  <Link to="/contact" className="btn-accent">
                    Đăng ký bảo trì
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="bg-white/10 rounded-full p-10 backdrop-blur-sm">
                  <Cog size={120} className="text-white animate-spin-slow" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Package Section */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="mb-8">Gói dịch vụ bảo trì</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-primary/20 hover:border-primary transition-all">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Shield size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Gói cơ bản</h3>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-primary mr-2" />
                      <span>Kiểm tra định kỳ 3 tháng/lần</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-primary mr-2" />
                      <span>Vệ sinh bộ phận trao đổi nhiệt</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-primary mr-2" />
                      <span>Bảo dưỡng các bộ phận điện tử</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-primary mr-2" />
                      <span>Báo cáo tình trạng thiết bị</span>
                    </li>
                  </ul>
                  <Link to="/contact" className="text-primary hover:text-accent flex items-center text-sm">
                    Tìm hiểu thêm
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-primary hover:shadow-md transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-white text-xs py-1 px-3">Phổ biến</div>
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Award size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Gói tiêu chuẩn</h3>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-primary mr-2" />
                      <span>Kiểm tra định kỳ 2 tháng/lần</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-primary mr-2" />
                      <span>Vệ sinh hệ thống toàn diện</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-primary mr-2" />
                      <span>Kiểm tra và nạp gas khi cần</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-primary mr-2" />
                      <span>Thay thế linh kiện nhỏ miễn phí</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-primary mr-2" />
                      <span>Phản hồi khẩn cấp trong 24h</span>
                    </li>
                  </ul>
                  <Link to="/contact" className="text-primary hover:text-accent flex items-center text-sm">
                    Tìm hiểu thêm
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:border-primary transition-all">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Calendar size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Gói cao cấp</h3>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-primary mr-2" />
                      <span>Kiểm tra định kỳ hàng tháng</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-primary mr-2" />
                      <span>Vệ sinh và bảo trì toàn diện</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-primary mr-2" />
                      <span>Kiểm tra năng lượng tối ưu</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-primary mr-2" />
                      <span>Ưu đãi 30% chi phí linh kiện</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-primary mr-2" />
                      <span>Phản hồi khẩn cấp trong 4h</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-primary mr-2" />
                      <span>Bảo hành mở rộng</span>
                    </li>
                  </ul>
                  <Link to="/contact" className="text-primary hover:text-accent flex items-center text-sm">
                    Tìm hiểu thêm
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 bg-muted">
          <div className="container-custom">
            <h2 className="mb-8">Lợi ích của bảo trì định kỳ</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <BarChart3 size={32} className="text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tiết kiệm năng lượng</h3>
                <p className="text-muted-foreground">Giảm đến 30% chi phí điện năng khi hệ thống được bảo trì thường xuyên.</p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <Clock size={32} className="text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Kéo dài tuổi thọ</h3>
                <p className="text-muted-foreground">Tăng tuổi thọ thiết bị lên đến 40% với các chương trình bảo trì định kỳ.</p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <Shield size={32} className="text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Phòng ngừa sự cố</h3>
                <p className="text-muted-foreground">Phát hiện sớm các vấn đề tiềm ẩn, giảm thiểu thời gian dừng hoạt động.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-accent/10">
          <div className="container-custom text-center">
            <div className="max-w-2xl mx-auto">
              <Calendar size={48} className="text-accent mx-auto mb-4" />
              <h2 className="mb-6">Lên lịch bảo trì ngay hôm nay</h2>
              <p className="text-muted-foreground mb-8">
                Đừng đợi đến khi hệ thống gặp sự cố. Chủ động đăng ký gói bảo trì của chúng tôi để đảm bảo hệ thống của bạn luôn hoạt động hiệu quả.
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/contact" className="btn-primary">
                  Đăng ký dịch vụ
                </Link>
                <Link to="/services" className="btn-outline">
                  Các dịch vụ khác
                </Link>
              </div>
            </div>
          </div>        </section>
    </>
  );
};

export default Maintenance;
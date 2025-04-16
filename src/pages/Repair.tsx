import { ArrowRight, Shield, CheckCircle2, Clock, PhoneCall, AlertTriangle, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Repair = () => {
  return (
    <>
        {/* Hero Section */}
        <section className="bg-primary py-12 text-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="md:w-1/2">
                <h1 className="text-white mb-4">Dịch vụ sửa chữa khẩn cấp</h1>
                <p className="text-xl opacity-90 mb-6">
                  Khắc phục nhanh chóng mọi sự cố về hệ thống điện lạnh công nghiệp và dân dụng với thời gian phản hồi nhanh, hỗ trợ 24/7.
                </p>
                <div className="flex gap-4">
                  <Link to="/contact" className="btn-accent">
                    Gọi sửa chữa ngay
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="bg-white/10 rounded-full p-10 backdrop-blur-sm">
                  <Shield size={120} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Service Section */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="mb-8">Dịch vụ khẩn cấp 24/7</h2>
            <div className="p-6 bg-accent/10 rounded-lg border border-accent/20 mb-10">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/4 flex justify-center">
                  <PhoneCall size={80} className="text-accent" />
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-semibold mb-2">Đường dây nóng hỗ trợ kỹ thuật</h3>
                  <p className="mb-4">
                    Đội ngũ kỹ thuật viên của chúng tôi luôn sẵn sàng hỗ trợ khắc phục mọi sự cố điện lạnh 24/7, kể cả ngày lễ và cuối tuần.
                  </p>
                  <div className="flex items-center">
                    <a href="tel:1800 1234" className="text-2xl font-bold text-accent mr-4">1800 1234</a>
                    <Link to="/contact" className="btn-primary inline-block">
                      Liên hệ ngay
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Clock size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Phản hồi nhanh</h3>
                  <p className="text-muted-foreground">
                    Cam kết có mặt trong vòng 2-4 giờ kể từ khi nhận được thông báo sự cố khẩn cấp.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Chẩn đoán chính xác</h3>
                  <p className="text-muted-foreground">
                    Phát hiện nhanh chóng nguyên nhân sự cố với thiết bị chẩn đoán hiện đại và kinh nghiệm phong phú.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Zap size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Xử lý hiệu quả</h3>
                  <p className="text-muted-foreground">
                    Khắc phục sự cố nhanh chóng với tỷ lệ giải quyết vấn đề ngay lần đầu tiên đạt trên 90%.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Common Issues Section */}
        <section className="py-12 bg-muted">
          <div className="container-custom">
            <h2 className="mb-8">Các sự cố thường gặp</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <AlertTriangle size={32} className="text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Hệ thống không làm lạnh</h3>
                <p className="text-muted-foreground mb-4">
                  Sự cố thường do thiếu gas lạnh, rò rỉ đường ống, bộ trao đổi nhiệt bị bẩn hoặc máy nén hư hỏng.
                </p>
                <Link to="/contact" className="text-primary hover:text-accent flex items-center text-sm">
                  Tìm hiểu thêm
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <AlertTriangle size={32} className="text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tiếng ồn bất thường</h3>
                <p className="text-muted-foreground mb-4">
                  Tiếng ồn có thể do linh kiện bị lỏng, quạt bị mất cân bằng hoặc máy nén có vấn đề.
                </p>
                <Link to="/contact" className="text-primary hover:text-accent flex items-center text-sm">
                  Tìm hiểu thêm
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <AlertTriangle size={32} className="text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Đóng băng hệ thống</h3>
                <p className="text-muted-foreground mb-4">
                  Đóng băng thường do lưu lượng không khí kém, lọc khí bị tắc hoặc thiếu gas lạnh.
                </p>
                <Link to="/contact" className="text-primary hover:text-accent flex items-center text-sm">
                  Tìm hiểu thêm
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <AlertTriangle size={32} className="text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Rò rỉ nước</h3>
                <p className="text-muted-foreground mb-4">
                  Rò rỉ nước thường do đường ống thoát nước bị tắc, khay hứng nước bị hư hoặc lắp đặt không đúng.
                </p>
                <Link to="/contact" className="text-primary hover:text-accent flex items-center text-sm">
                  Tìm hiểu thêm
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Service Process */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="mb-8">Quy trình xử lý sự cố</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 z-10 relative">
                  <span className="font-bold text-primary">1</span>
                </div>
                <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-primary/20"></div>
                <h3 className="text-lg font-semibold mb-2">Tiếp nhận thông tin</h3>
                <p className="text-muted-foreground">Ghi nhận chi tiết sự cố và xác định mức độ khẩn cấp</p>
              </div>

              <div className="relative">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 z-10 relative">
                  <span className="font-bold text-primary">2</span>
                </div>
                <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-primary/20"></div>
                <h3 className="text-lg font-semibold mb-2">Chẩn đoán tại chỗ</h3>
                <p className="text-muted-foreground">Kỹ thuật viên đến kiểm tra và phân tích nguyên nhân</p>
              </div>

              <div className="relative">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 z-10 relative">
                  <span className="font-bold text-primary">3</span>
                </div>
                <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-primary/20"></div>
                <h3 className="text-lg font-semibold mb-2">Xử lý sửa chữa</h3>
                <p className="text-muted-foreground">Tiến hành sửa chữa với phụ tùng thay thế chính hãng</p>
              </div>

              <div className="relative">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold text-primary">4</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Kiểm tra hoạt động</h3>
                <p className="text-muted-foreground">Vận hành thử nghiệm và đảm bảo hệ thống hoạt động tốt</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-accent/10">
          <div className="container-custom text-center">
            <div className="max-w-2xl mx-auto">
              <PhoneCall size={48} className="text-accent mx-auto mb-4" />
              <h2 className="mb-6">Gặp sự cố? Đừng chần chừ</h2>
              <p className="text-muted-foreground mb-8">
                Mỗi phút trì hoãn có thể khiến thiệt hại trở nên nghiêm trọng hơn. Liên hệ ngay với đội ngũ sửa chữa khẩn cấp của chúng tôi.
              </p>
              <div className="flex gap-4 justify-center">
                <a href="tel:1800 1234" className="btn-primary">
                  Gọi ngay 1800 1234
                </a>
                <Link to="/contact" className="btn-outline">
                  Gửi yêu cầu
                </Link>
              </div>
            </div>
          </div>        </section>
    </>
  );
};

export default Repair;
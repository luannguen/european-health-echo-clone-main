import { ArrowRight, Wrench, CheckCircle2, AlertTriangle, Clock, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AppLink from "@/components/ui/app-link";

const Installation = () => {
  return (
    <>
        {/* Hero Section */}
        <section className="bg-primary py-12 text-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="md:w-1/2">
                <h1 className="text-white mb-4">Dịch vụ lắp đặt chuyên nghiệp</h1>
                <p className="text-xl opacity-90 mb-6">
                  Lắp đặt hệ thống điện lạnh công nghiệp và dân dụng với đội ngũ kỹ thuật lành nghề, đảm bảo hiệu suất tối ưu và tuổi thọ dài lâu.
                </p>                <div className="flex gap-4">
                  <AppLink routeKey="CONTACT" className="btn-accent">
                    Yêu cầu báo giá
                  </AppLink>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="bg-white/10 rounded-full p-10 backdrop-blur-sm">
                  <Wrench size={120} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="mb-8">Quy trình lắp đặt</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Khảo sát</h3>
                  <p className="text-muted-foreground">Đánh giá hiện trạng, xác định yêu cầu kỹ thuật và lên phương án tối ưu.</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Lập kế hoạch</h3>
                  <p className="text-muted-foreground">Lên kế hoạch chi tiết, chuẩn bị thiết bị và nhân lực phù hợp.</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wrench size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Triển khai</h3>
                  <p className="text-muted-foreground">Lắp đặt chuyên nghiệp theo tiêu chuẩn kỹ thuật và quy trình chất lượng.</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Nghiệm thu</h3>
                  <p className="text-muted-foreground">Kiểm tra, vận hành thử, hướng dẫn sử dụng và bàn giao công trình.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 bg-muted">
          <div className="container-custom">
            <h2 className="mb-8">Lợi ích khi sử dụng dịch vụ</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg flex gap-4">
                <div className="shrink-0">
                  <CheckCircle2 size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Đội ngũ chuyên nghiệp</h3>
                  <p className="text-muted-foreground">Kỹ thuật viên được đào tạo chuyên sâu và có chứng chỉ hành nghề.</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg flex gap-4">
                <div className="shrink-0">
                  <CheckCircle2 size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Thiết bị chính hãng</h3>
                  <p className="text-muted-foreground">Sử dụng thiết bị và phụ kiện chính hãng, đảm bảo chất lượng.</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg flex gap-4">
                <div className="shrink-0">
                  <CheckCircle2 size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Hiệu suất tối ưu</h3>
                  <p className="text-muted-foreground">Lắp đặt đúng kỹ thuật giúp hệ thống đạt hiệu suất tối đa.</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg flex gap-4">
                <div className="shrink-0">
                  <CheckCircle2 size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Bảo hành dài hạn</h3>
                  <p className="text-muted-foreground">Cam kết bảo hành dài hạn và hỗ trợ kỹ thuật sau lắp đặt.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-accent/10">
          <div className="container-custom text-center">
            <div className="max-w-2xl mx-auto">
              <Clock size={48} className="text-accent mx-auto mb-4" />
              <h2 className="mb-6">Sẵn sàng lắp đặt cho dự án của bạn</h2>
              <p className="text-muted-foreground mb-8">
                Liên hệ ngay hôm nay để nhận tư vấn và báo giá miễn phí từ đội ngũ chuyên gia của chúng tôi.
              </p>              <div className="flex gap-4 justify-center">
                <AppLink routeKey="CONTACT" className="btn-primary">
                  Liên hệ tư vấn
                </AppLink>
                <AppLink routeKey="SERVICES" className="btn-outline">
                  Xem thêm dịch vụ
                </AppLink>
              </div>
            </div>
          </div>
        </section>
    </>
  );
};

export default Installation;
import { ArrowRight, FileCheck, CheckCircle2, Lightbulb, PenTool, BarChart3, Factory } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Consulting = () => {
  return (
    <>
        {/* Hero Section */}
        <section className="bg-primary py-12 text-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="md:w-1/2">
                <h1 className="text-white mb-4">Tư vấn thiết kế hệ thống điện lạnh</h1>
                <p className="text-xl opacity-90 mb-6">
                  Giải pháp thiết kế tối ưu cho hệ thống điện lạnh công nghiệp và dân dụng, tiết kiệm năng lượng và chi phí vận hành.
                </p>
                <div className="flex gap-4">
                  <Link to="/contact" className="btn-accent">
                    Nhận tư vấn miễn phí
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="bg-white/10 rounded-full p-10 backdrop-blur-sm">
                  <FileCheck size={120} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="mb-8">Dịch vụ tư vấn thiết kế</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Lightbulb size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Tư vấn khả thi</h3>
                  <p className="text-muted-foreground">
                    Đánh giá hiện trạng công trình, khảo sát nhu cầu và đề xuất các phương án khả thi cho hệ thống điện lạnh.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <PenTool size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Thiết kế kỹ thuật</h3>
                  <p className="text-muted-foreground">
                    Lập bản vẽ, thiết kế chi tiết, tính toán công suất và lựa chọn thiết bị phù hợp cho công trình.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <BarChart3 size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Phân tích hiệu quả</h3>
                  <p className="text-muted-foreground">
                    Đánh giá chi phí-lợi ích, tính toán ROI và đề xuất giải pháp tối ưu về mặt kinh tế và kỹ thuật.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Expertise Areas */}
        <section className="py-12 bg-muted">
          <div className="container-custom">
            <h2 className="mb-8">Lĩnh vực chuyên môn</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg flex gap-4">
                <div className="shrink-0">
                  <Factory size={32} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Hệ thống công nghiệp</h3>
                  <ul className="space-y-1">
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-primary mr-2" />
                      <span>Hệ thống làm lạnh nhà xưởng</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-primary mr-2" />
                      <span>Kho lạnh công nghiệp</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-primary mr-2" />
                      <span>HVAC cho nhà máy sản xuất</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-primary mr-2" />
                      <span>Hệ thống làm mát quy trình sản xuất</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg flex gap-4">
                <div className="shrink-0">
                  <Factory size={32} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Hệ thống thương mại</h3>
                  <ul className="space-y-1">
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-primary mr-2" />
                      <span>Hệ thống HVAC tòa nhà văn phòng</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-primary mr-2" />
                      <span>Điều hòa không khí trung tâm thương mại</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-primary mr-2" />
                      <span>Hệ thống lạnh cho siêu thị, nhà hàng</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-primary mr-2" />
                      <span>VRV/VRF cho khách sạn, cao ốc</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Process */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="mb-8">Quy trình tư vấn thiết kế</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 z-10 relative">
                  <span className="font-bold text-primary">1</span>
                </div>
                <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-primary/20"></div>
                <h3 className="text-lg font-semibold mb-2">Khảo sát hiện trạng</h3>
                <p className="text-muted-foreground">Đánh giá điều kiện công trình và nhu cầu sử dụng</p>
              </div>

              <div className="relative">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 z-10 relative">
                  <span className="font-bold text-primary">2</span>
                </div>
                <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-primary/20"></div>
                <h3 className="text-lg font-semibold mb-2">Lập kế hoạch</h3>
                <p className="text-muted-foreground">Xây dựng các phương án và lên kế hoạch chi tiết</p>
              </div>

              <div className="relative">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 z-10 relative">
                  <span className="font-bold text-primary">3</span>
                </div>
                <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-primary/20"></div>
                <h3 className="text-lg font-semibold mb-2">Thiết kế kỹ thuật</h3>
                <p className="text-muted-foreground">Thiết kế chi tiết hệ thống theo tiêu chuẩn</p>
              </div>

              <div className="relative">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 z-10 relative">
                  <span className="font-bold text-primary">4</span>
                </div>
                <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-primary/20"></div>
                <h3 className="text-lg font-semibold mb-2">Phân tích hiệu quả</h3>
                <p className="text-muted-foreground">Tính toán hiệu suất và phân tích chi phí</p>
              </div>

              <div className="relative">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold text-primary">5</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Trình bày phương án</h3>
                <p className="text-muted-foreground">Báo cáo đề xuất và hướng dẫn triển khai</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12 bg-muted">
          <div className="container-custom">
            <h2 className="mb-8">Lợi ích khi sử dụng dịch vụ</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <CheckCircle2 size={32} className="text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tối ưu hiệu suất</h3>
                <p className="text-muted-foreground">Thiết kế hệ thống hoạt động hiệu quả, giảm thiểu tổn thất năng lượng.</p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <CheckCircle2 size={32} className="text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tiết kiệm chi phí</h3>
                <p className="text-muted-foreground">Giảm chi phí đầu tư ban đầu và chi phí vận hành dài hạn.</p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <CheckCircle2 size={32} className="text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tuân thủ tiêu chuẩn</h3>
                <p className="text-muted-foreground">Đảm bảo hệ thống tuân thủ các tiêu chuẩn kỹ thuật và an toàn quốc tế.</p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <CheckCircle2 size={32} className="text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Bền vững và thân thiện</h3>
                <p className="text-muted-foreground">Ưu tiên các giải pháp thân thiện với môi trường và tiết kiệm năng lượng.</p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <CheckCircle2 size={32} className="text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Dễ dàng bảo trì</h3>
                <p className="text-muted-foreground">Thiết kế có tính đến yếu tố dễ dàng bảo trì và nâng cấp trong tương lai.</p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <CheckCircle2 size={32} className="text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tính toán chính xác</h3>
                <p className="text-muted-foreground">Tránh tình trạng thiết kế quá tải hoặc không đủ công suất cho nhu cầu sử dụng.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-accent/10">
          <div className="container-custom text-center">
            <div className="max-w-2xl mx-auto">
              <Lightbulb size={48} className="text-accent mx-auto mb-4" />
              <h2 className="mb-6">Bắt đầu với dự án của bạn ngay hôm nay</h2>
              <p className="text-muted-foreground mb-8">
                Hãy liên hệ với đội ngũ tư vấn thiết kế của chúng tôi để được tư vấn miễn phí và đề xuất giải pháp tối ưu cho dự án của bạn.
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/contact" className="btn-primary">
                  Yêu cầu tư vấn
                </Link>
                <Link to="/services" className="btn-outline">
                  Xem thêm dịch vụ
                </Link>
              </div>
            </div>
          </div>        </section>
    </>
  );
};

export default Consulting;
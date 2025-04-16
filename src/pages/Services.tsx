import { ArrowRight, CheckCircle, ArrowUpRight, FileCheck, Wrench, Cog, Shield, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="bg-primary/90 py-16 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-white mb-6">Dịch vụ chuyên nghiệp</h1>
            <p className="text-xl md:text-2xl mb-8">
              Cung cấp đầy đủ các giải pháp dịch vụ kỹ thuật điện lạnh chất lượng cao từ tư vấn, lắp đặt đến bảo trì và sửa chữa.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-accent">
                Liên hệ tư vấn
              </Link>
              <Link to="/service-support" className="btn-white">
                Hỗ trợ kỹ thuật
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="mb-6">Dịch vụ toàn diện</h2>
              <p className="text-muted-foreground mb-6">
                Với hơn 20 năm kinh nghiệm trong lĩnh vực điện lạnh công nghiệp và dân dụng, VRC đã trở thành đối tác tin cậy của hàng nghìn khách hàng trên cả nước. Chúng tôi tự hào cung cấp các dịch vụ kỹ thuật chất lượng cao với đội ngũ chuyên viên được đào tạo bài bản.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-primary mr-3 mt-1" />
                  <span>Đội ngũ kỹ sư giàu kinh nghiệm, được chứng nhận chuyên môn</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-primary mr-3 mt-1" />
                  <span>Phục vụ 24/7 với thời gian phản hồi nhanh chóng</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-primary mr-3 mt-1" />
                  <span>Trang thiết bị hiện đại, công nghệ tiên tiến</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-primary mr-3 mt-1" />
                  <span>Cam kết chất lượng và bảo hành dài hạn</span>
                </li>
              </ul>
            </div>
            <div>
              <img 
                src="/assets/images/service-overview.jpg" 
                alt="Dịch vụ điện lạnh chuyên nghiệp" 
                className="rounded-lg shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                  e.currentTarget.alt = "Placeholder image";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-12 bg-muted">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="mb-4">Danh mục dịch vụ</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi cung cấp đầy đủ các dịch vụ điện lạnh công nghiệp và dân dụng, từ tư vấn thiết kế đến lắp đặt, bảo trì và sửa chữa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Service Card 1: Tư vấn thiết kế */}
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <FileCheck className="text-primary" />
                </div>
                <CardTitle>Tư vấn thiết kế</CardTitle>
                <CardDescription>
                  Giải pháp thiết kế hệ thống điện lạnh tối ưu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Đưa ra giải pháp thiết kế hệ thống điện lạnh phù hợp nhất với yêu cầu và điều kiện của từng công trình.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/services/consulting" className="text-primary hover:text-accent flex items-center">
                  Chi tiết
                  <ArrowUpRight size={16} className="ml-1" />
                </Link>
              </CardFooter>
            </Card>

            {/* Service Card 2: Lắp đặt */}
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Wrench className="text-primary" />
                </div>
                <CardTitle>Lắp đặt chuyên nghiệp</CardTitle>
                <CardDescription>
                  Lắp đặt hệ thống lạnh công nghiệp và dân dụng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Dịch vụ lắp đặt chuyên nghiệp với đội ngũ kỹ thuật giàu kinh nghiệm, đảm bảo hệ thống vận hành hiệu quả.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/services/installation" className="text-primary hover:text-accent flex items-center">
                  Chi tiết
                  <ArrowUpRight size={16} className="ml-1" />
                </Link>
              </CardFooter>
            </Card>

            {/* Service Card 3: Bảo trì */}
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Cog className="text-primary" />
                </div>
                <CardTitle>Bảo trì định kỳ</CardTitle>
                <CardDescription>
                  Duy trì hiệu suất và kéo dài tuổi thọ thiết bị
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Chương trình bảo trì định kỳ giúp hệ thống vận hành ổn định, kéo dài tuổi thọ và phát hiện sớm các vấn đề tiềm ẩn.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/services/maintenance" className="text-primary hover:text-accent flex items-center">
                  Chi tiết
                  <ArrowUpRight size={16} className="ml-1" />
                </Link>
              </CardFooter>
            </Card>

            {/* Service Card 4: Sửa chữa */}
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="text-primary" />
                </div>
                <CardTitle>Sửa chữa khẩn cấp</CardTitle>
                <CardDescription>
                  Khắc phục sự cố nhanh chóng, hỗ trợ 24/7
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Dịch vụ sửa chữa khẩn cấp với thời gian phản hồi nhanh, giảm thiểu thời gian dừng hoạt động của hệ thống.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/services/repair" className="text-primary hover:text-accent flex items-center">
                  Chi tiết
                  <ArrowUpRight size={16} className="ml-1" />
                </Link>
              </CardFooter>
            </Card>

            {/* Service Card 5: Nâng cấp hệ thống */}
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="text-primary" />
                </div>
                <CardTitle>Nâng cấp hệ thống</CardTitle>
                <CardDescription>
                  Cải thiện hiệu suất và tiết kiệm năng lượng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Tư vấn và thực hiện nâng cấp hệ thống điện lạnh cũ, áp dụng công nghệ mới giúp tiết kiệm chi phí vận hành.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/services/upgrade" className="text-primary hover:text-accent flex items-center">
                  Chi tiết
                  <ArrowUpRight size={16} className="ml-1" />
                </Link>
              </CardFooter>
            </Card>

            {/* Service Card 6: Hỗ trợ kỹ thuật */}
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <FileCheck className="text-primary" />
                </div>
                <CardTitle>Hỗ trợ kỹ thuật</CardTitle>
                <CardDescription>
                  Tư vấn và giải đáp mọi vấn đề kỹ thuật
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Đội ngũ kỹ thuật viên giàu kinh nghiệm luôn sẵn sàng hỗ trợ giải quyết mọi vấn đề về kỹ thuật điện lạnh.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/service-support" className="text-primary hover:text-accent flex items-center">
                  Chi tiết
                  <ArrowUpRight size={16} className="ml-1" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Client Types Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <h2 className="mb-8">Đối tượng phục vụ</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="rounded-lg border border-muted p-6">
              <h3 className="text-xl font-semibold mb-4">Khách hàng công nghiệp</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-primary mr-3 mt-1" />
                  <span>Nhà máy sản xuất và xưởng công nghiệp</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-primary mr-3 mt-1" />
                  <span>Kho lạnh và hệ thống bảo quản</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-primary mr-3 mt-1" />
                  <span>Nhà máy chế biến thực phẩm</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-primary mr-3 mt-1" />
                  <span>Hệ thống điều hòa trung tâm công suất lớn</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-muted p-6">
              <h3 className="text-xl font-semibold mb-4">Khách hàng thương mại</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-primary mr-3 mt-1" />
                  <span>Cao ốc văn phòng và trung tâm thương mại</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-primary mr-3 mt-1" />
                  <span>Khách sạn, nhà hàng và khu nghỉ dưỡng</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-primary mr-3 mt-1" />
                  <span>Bệnh viện và các cơ sở y tế</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-primary mr-3 mt-1" />
                  <span>Siêu thị và cửa hàng bán lẻ</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-accent/10">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="mb-6">Bắt đầu với dịch vụ của chúng tôi</h2>
            <p className="text-muted-foreground mb-8">
              Hãy liên hệ với chúng tôi ngay hôm nay để được tư vấn và báo giá các dịch vụ điện lạnh phù hợp với nhu cầu của bạn. Đội ngũ kỹ thuật của VRC luôn sẵn sàng hỗ trợ.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                Liên hệ ngay
              </Link>
              <Link to="/service-support" className="btn-outline">
                Tìm hiểu thêm
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
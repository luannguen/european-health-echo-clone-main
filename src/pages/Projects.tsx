import { ArrowRight, CheckCircle, ArrowUpRight, Building, Building2, Factory, CheckCircle2, BarChart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Projects = () => {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="bg-primary/90 py-16 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-white mb-6">Dự án tiêu biểu</h1>
            <p className="text-xl md:text-2xl mb-8">
              Những công trình thực tế đã được VRC thiết kế, cung cấp thiết bị và thi công lắp đặt trên khắp cả nước.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-accent">
                Đặt lịch tư vấn
              </Link>
              <Link to="/services" className="btn-white">
                Xem dịch vụ
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
              <h2 className="mb-6">Năng lực và kinh nghiệm</h2>
              <p className="text-muted-foreground mb-6">
                Với hơn 20 năm kinh nghiệm, VRC đã thực hiện hàng trăm dự án lớn nhỏ trong lĩnh vực điện lạnh công nghiệp và dân dụng. Chúng tôi tự hào là đối tác tin cậy của nhiều tập đoàn lớn và các đơn vị hàng đầu trong các ngành công nghiệp.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-primary mr-3 mt-1" />
                  <span>Hơn 500 dự án lớn nhỏ đã hoàn thành</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-primary mr-3 mt-1" />
                  <span>Đối tác của các tập đoàn và doanh nghiệp hàng đầu</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-primary mr-3 mt-1" />
                  <span>Đội ngũ kỹ sư và chuyên viên giàu kinh nghiệm</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-primary mr-3 mt-1" />
                  <span>Cam kết chất lượng và tiến độ thi công</span>
                </li>
              </ul>
            </div>
            <div>
              <img 
                src="/assets/images/projects-overview.jpg" 
                alt="Dự án điện lạnh công nghiệp" 
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

      {/* Project Categories */}
      <section className="py-12 bg-muted">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="mb-4">Danh mục dự án</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              VRC tự hào thực hiện các dự án đa dạng với quy mô khác nhau, từ hệ thống điều hòa không khí trung tâm cho tòa nhà thương mại đến các hệ thống làm lạnh công nghiệp phức tạp.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project Category 1 */}
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Building className="text-primary" />
                </div>
                <CardTitle>Hệ thống điều hòa trung tâm</CardTitle>
                <CardDescription>
                  Cho tòa nhà văn phòng và thương mại
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Thiết kế, cung cấp và lắp đặt hệ thống điều hòa không khí trung tâm cho các tòa nhà văn phòng, trung tâm thương mại và khách sạn.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/projects/commercial" className="text-primary hover:text-accent flex items-center">
                  Xem dự án
                  <ArrowUpRight size={16} className="ml-1" />
                </Link>
              </CardFooter>
            </Card>

            {/* Project Category 2 */}
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Factory className="text-primary" />
                </div>
                <CardTitle>Hệ thống làm lạnh công nghiệp</CardTitle>
                <CardDescription>
                  Cho nhà máy sản xuất và chế biến
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Thiết kế và thi công hệ thống làm lạnh công nghiệp cho các nhà máy sản xuất, nhà máy chế biến thực phẩm và kho lạnh.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/projects/industrial" className="text-primary hover:text-accent flex items-center">
                  Xem dự án
                  <ArrowUpRight size={16} className="ml-1" />
                </Link>
              </CardFooter>
            </Card>

            {/* Project Category 3 */}
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="text-primary" />
                </div>
                <CardTitle>Hệ thống điều hòa đặc biệt</CardTitle>
                <CardDescription>
                  Cho bệnh viện, phòng sạch và phòng server
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Thiết kế và thi công hệ thống điều hòa không khí đặc biệt cho bệnh viện, phòng sạch, phòng server và các không gian đặc thù khác.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/projects/specialized" className="text-primary hover:text-accent flex items-center">
                  Xem dự án
                  <ArrowUpRight size={16} className="ml-1" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <h2 className="mb-8">Dự án nổi bật</h2>
          <div className="space-y-8">
            {/* Featured Project 1 */}
            <div className="border rounded-lg overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="h-60 md:h-auto bg-muted">
                  <img 
                    src="/placeholder.svg" 
                    alt="Tòa nhà Vincom Center" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Tòa nhà Vincom Center</h3>
                  <p className="text-sm text-muted-foreground mb-4">Hoàn thành: Tháng 6/2023</p>
                  <p className="mb-4">
                    Cung cấp và lắp đặt hệ thống điều hòa không khí trung tâm VRV cho tòa nhà Vincom Center với công suất 2000RT, bao gồm hệ thống điều khiển thông minh BMS.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-primary text-sm">Thương mại</span>
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-primary text-sm">Văn phòng</span>
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-primary text-sm">VRV System</span>
                  </div>
                  <Link to="/projects/vincom-center" className="text-primary hover:text-accent flex items-center">
                    Chi tiết dự án
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Featured Project 2 */}
            <div className="border rounded-lg overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="h-60 md:h-auto bg-muted">
                  <img 
                    src="/placeholder.svg" 
                    alt="Nhà máy thực phẩm ABC" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Nhà máy thực phẩm ABC</h3>
                  <p className="text-sm text-muted-foreground mb-4">Hoàn thành: Tháng 12/2022</p>
                  <p className="mb-4">
                    Thiết kế và thi công hệ thống làm lạnh công nghiệp cho nhà máy chế biến thực phẩm ABC với công suất 500RT, bao gồm các kho lạnh và dây chuyền đông lạnh.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-primary text-sm">Công nghiệp</span>
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-primary text-sm">Kho lạnh</span>
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-primary text-sm">Chiller</span>
                  </div>
                  <Link to="/projects/abc-food-factory" className="text-primary hover:text-accent flex items-center">
                    Chi tiết dự án
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Featured Project 3 */}
            <div className="border rounded-lg overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="h-60 md:h-auto bg-muted">
                  <img 
                    src="/placeholder.svg" 
                    alt="Bệnh viện XYZ" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Bệnh viện XYZ</h3>
                  <p className="text-sm text-muted-foreground mb-4">Hoàn thành: Tháng 9/2023</p>
                  <p className="mb-4">
                    Thiết kế và thi công hệ thống điều hòa không khí đặc biệt cho Bệnh viện XYZ, bao gồm phòng mổ, phòng cách ly và phòng ICU với tiêu chuẩn vệ sinh cao.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-primary text-sm">Y tế</span>
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-primary text-sm">Phòng sạch</span>
                    <span className="bg-primary/10 px-2 py-1 rounded-md text-primary text-sm">AHU</span>
                  </div>
                  <Link to="/projects/xyz-hospital" className="text-primary hover:text-accent flex items-center">
                    Chi tiết dự án
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-accent/10">
        <div className="container-custom">
          <h2 className="text-center mb-10">Thành tựu của chúng tôi</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Dự án đã hoàn thành</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">20+</div>
              <p className="text-muted-foreground">Năm kinh nghiệm</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Đối tác lớn</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <p className="text-muted-foreground">Kỹ sư & nhân viên</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="mb-6">Bạn có dự án cần tư vấn?</h2>
            <p className="text-muted-foreground mb-8">
              Hãy liên hệ với đội ngũ kỹ sư của chúng tôi để được tư vấn giải pháp tối ưu cho dự án của bạn. 
              VRC cam kết mang đến các giải pháp điện lạnh hiện đại, hiệu quả và tiết kiệm chi phí.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                Liên hệ tư vấn
              </Link>
              <Link to="/services" className="btn-outline">
                Xem dịch vụ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Projects;
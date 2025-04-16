import { Facebook, Twitter, Linkedin, Youtube, Mail } from 'lucide-react';
import AppLink from '@/components/ui/app-link';

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <div className="mb-4">
              <img 
                src="/lovable-uploads/0bd3c048-8e37-4775-a6bc-0b54ec07edbe.png" 
                alt="VRC - Tổng công ty Kỹ thuật lạnh Việt Nam" 
                className="h-16"
              />
            </div>
            <p className="text-gray-300 mb-6">
              Cung cấp giải pháp điện lạnh toàn diện cho mọi doanh nghiệp và công trình.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://youtube.com" className="text-gray-300 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2 */}
          <div>
            <h4 className="text-white font-semibold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2">
              <li><AppLink routeKey="ABOUT" className="footer-link">Giới thiệu</AppLink></li>
              <li><AppLink routeKey="PRODUCTS" className="footer-link">Sản phẩm</AppLink></li>
              <li><AppLink routeKey="SERVICES" className="footer-link">Dịch vụ</AppLink></li>
              <li><AppLink routeKey="NEWS" className="footer-link">Tin tức & sự kiện</AppLink></li>
              <li><AppLink routeKey="CONTACT" className="footer-link">Liên hệ</AppLink></li>
            </ul>
          </div>
          
          {/* Column 3 */}
          <div>
            <h4 className="text-white font-semibold mb-4">Dịch vụ</h4>
            <ul className="space-y-2">
              <li><AppLink routeKey="INSTALLATION" className="footer-link">Lắp đặt</AppLink></li>
              <li><AppLink routeKey="MAINTENANCE" className="footer-link">Bảo trì</AppLink></li>
              <li><AppLink routeKey="REPAIR" className="footer-link">Sửa chữa</AppLink></li>
              <li><AppLink routeKey="CONSULTING" className="footer-link">Tư vấn thiết kế</AppLink></li>
              <li><AppLink routeKey="SERVICE_SUPPORT" className="footer-link">Hỗ trợ kỹ thuật</AppLink></li>
            </ul>
          </div>
          
          {/* Column 4 */}
          <div>
            <h4 className="text-white font-semibold mb-4">Liên hệ</h4>
            <address className="not-italic text-gray-300 mb-4 space-y-2">
              <p>VRC - Tổng công ty kỹ thuật điện lạnh Việt Nam</p>
              <p>123 Nguyễn Văn Linh, Quận 7</p>
              <p>TP. Hồ Chí Minh, Việt Nam</p>
            </address>
            <a 
              href="mailto:info@vrc.com.vn" 
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <Mail size={16} className="mr-2" />
              info@vrc.com.vn
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} VRC - Tổng công ty kỹ thuật điện lạnh Việt Nam. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
            <AppLink routeKey="PRIVACY" className="footer-link">Chính sách bảo mật</AppLink>
            <AppLink routeKey="TERMS" className="footer-link">Điều khoản sử dụng</AppLink>
            <AppLink routeKey="COOKIES" className="footer-link">Chính sách cookie</AppLink>
            <AppLink routeKey="SITEMAP" className="footer-link">Sơ đồ trang</AppLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

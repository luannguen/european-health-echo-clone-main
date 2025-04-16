import React from 'react';
import { Link } from 'react-router-dom';

const Sitemap = () => {
  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-8">Sơ đồ trang</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Giới thiệu */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-primary">Giới thiệu</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">
                Giới thiệu
              </Link>
            </li>
          </ul>
        </div>

        {/* Sản phẩm */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-primary">Sản phẩm</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/products" className="text-gray-700 hover:text-primary transition-colors">
                Tất cả sản phẩm
              </Link>
            </li>
          </ul>
        </div>

        {/* Dự án */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-primary">Dự án</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/projects" className="text-gray-700 hover:text-primary transition-colors">
                Dự án đã thực hiện
              </Link>
            </li>
          </ul>
        </div>

        {/* Dịch vụ */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-primary">Dịch vụ</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/services" className="text-gray-700 hover:text-primary transition-colors">
                Tổng quan dịch vụ
              </Link>
            </li>
            <li>
              <Link to="/services/installation" className="text-gray-700 hover:text-primary transition-colors">
                Lắp đặt
              </Link>
            </li>
            <li>
              <Link to="/services/maintenance" className="text-gray-700 hover:text-primary transition-colors">
                Bảo trì
              </Link>
            </li>
            <li>
              <Link to="/services/repair" className="text-gray-700 hover:text-primary transition-colors">
                Sửa chữa
              </Link>
            </li>
            <li>
              <Link to="/services/consulting" className="text-gray-700 hover:text-primary transition-colors">
                Tư vấn thiết kế
              </Link>
            </li>
            <li>
              <Link to="/service-support" className="text-gray-700 hover:text-primary transition-colors">
                Hỗ trợ kỹ thuật
              </Link>
            </li>
          </ul>
        </div>

        {/* Tin tức & Sự kiện */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-primary">Tin tức & Sự kiện</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/news" className="text-gray-700 hover:text-primary transition-colors">
                Tin tức
              </Link>
            </li>
            <li>
              <Link to="/events" className="text-gray-700 hover:text-primary transition-colors">
                Sự kiện
              </Link>
            </li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-primary">Liên hệ</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">
                Thông tin liên hệ
              </Link>
            </li>
          </ul>
        </div>

        {/* Pháp lý */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-primary">Pháp lý</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/legal/privacy" className="text-gray-700 hover:text-primary transition-colors">
                Chính sách bảo mật
              </Link>
            </li>
            <li>
              <Link to="/legal/terms" className="text-gray-700 hover:text-primary transition-colors">
                Điều khoản sử dụng
              </Link>
            </li>
            <li>
              <Link to="/legal/cookies" className="text-gray-700 hover:text-primary transition-colors">
                Chính sách cookie
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;

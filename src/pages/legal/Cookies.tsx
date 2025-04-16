import React from 'react';

const Cookies = () => {
  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-8">Chính sách cookie</h1>
      
      <div className="prose max-w-none">
        <p className="mb-4">
          <strong>Cập nhật lần cuối:</strong> {new Date().toLocaleDateString('vi-VN')}
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Cookie là gì?</h2>
        <p>
          Cookie là các tệp nhỏ được lưu trữ trên máy tính hoặc thiết bị di động của quý khách khi 
          truy cập một website. Cookie cho phép website ghi nhớ các hành động và tùy chọn của quý khách 
          (như đăng nhập, ngôn ngữ, cỡ chữ và các tùy chọn hiển thị khác) trong một khoảng thời gian.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Cách chúng tôi sử dụng cookie</h2>
        <p>
          Website của VRC sử dụng cookie cho các mục đích sau:
        </p>
        <ul className="list-disc pl-6 my-4">
          <li>
            <strong>Cookie thiết yếu:</strong> Cần thiết cho hoạt động của website và không thể tắt trong hệ 
            thống của chúng tôi. Chúng thường chỉ được đặt để đáp ứng các hành động do quý khách thực hiện.
          </li>
          <li>
            <strong>Cookie phân tích/hiệu suất:</strong> Cho phép chúng tôi đếm số lượt truy cập và nguồn 
            lưu lượng truy cập để đo lường và cải thiện hiệu suất của website.
          </li>
          <li>
            <strong>Cookie chức năng:</strong> Giúp website ghi nhớ các lựa chọn của quý khách để cung cấp 
            trải nghiệm cá nhân hóa.
          </li>
          <li>
            <strong>Cookie tiếp thị:</strong> Được đặt thông qua website của chúng tôi bởi các đối tác 
            quảng cáo của chúng tôi. Chúng có thể được sử dụng để xây dựng hồ sơ về sở thích của quý khách 
            và hiển thị quảng cáo phù hợp.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Quản lý cookie</h2>
        <p>
          Quý khách có thể quản lý cookie thông qua cài đặt trình duyệt. Hầu hết các trình duyệt cho 
          phép quý khách từ chối tất cả cookie, chỉ chấp nhận cookie từ một số website cụ thể, hoặc xóa 
          cookie khi đóng trình duyệt. Tuy nhiên, việc từ chối cookie có thể khiến một số tính năng của 
          website không hoạt động đúng cách.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Cookie của bên thứ ba</h2>
        <p>
          Ngoài cookie do VRC đặt, chúng tôi cũng sử dụng cookie và công nghệ tương tự do bên thứ ba 
          đặt cho nhiều mục đích khác nhau, bao gồm phân tích và quảng cáo được nhắm mục tiêu. Các bên 
          thứ ba này có thể bao gồm Google Analytics, Facebook, và các nền tảng truyền thông xã hội khác.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Thay đổi chính sách</h2>
        <p>
          VRC có thể cập nhật Chính sách Cookie này theo thời gian. Chúng tôi khuyến khích quý khách 
          kiểm tra trang này định kỳ để biết bất kỳ thay đổi nào.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Liên hệ</h2>
        <p>
          Nếu quý khách có bất kỳ câu hỏi nào về Chính sách Cookie này, vui lòng liên hệ với chúng tôi qua:
        </p>
        <ul className="list-disc pl-6 my-4">
          <li>Email: privacy@vrc.com.vn</li>
          <li>Điện thoại: 028 1234 5678</li>
          <li>Địa chỉ: 123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh</li>
        </ul>
      </div>
    </div>
  );
};

export default Cookies;

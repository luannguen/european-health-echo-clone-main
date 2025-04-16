import React from 'react';

const Terms = () => {
  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-8">Điều khoản sử dụng</h1>
      
      <div className="prose max-w-none">
        <p className="mb-4">
          <strong>Cập nhật lần cuối:</strong> {new Date().toLocaleDateString('vi-VN')}
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Giới thiệu</h2>
        <p>
          Chào mừng quý khách đến với website của VRC - Tổng công ty kỹ thuật điện lạnh Việt Nam. 
          Khi truy cập vào website của chúng tôi, quý khách đồng ý tuân thủ các điều khoản và điều 
          kiện sử dụng được quy định dưới đây.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Sử dụng nội dung</h2>
        <p>
          Tất cả nội dung trên website của chúng tôi, bao gồm văn bản, hình ảnh, logo, biểu tượng, 
          video và các tài liệu khác là tài sản của VRC hoặc được sử dụng với sự cho phép của chủ 
          sở hữu. Quý khách không được sao chép, sửa đổi, phân phối hoặc sử dụng các nội dung này 
          cho mục đích thương mại mà không có sự đồng ý bằng văn bản của chúng tôi.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Tài khoản người dùng</h2>
        <p>
          Khi tạo tài khoản trên website của chúng tôi, quý khách có trách nhiệm bảo mật thông tin 
          đăng nhập và chịu trách nhiệm cho tất cả hoạt động diễn ra dưới tài khoản của mình. Quý 
          khách đồng ý thông báo ngay cho chúng tôi về bất kỳ hành vi sử dụng trái phép nào.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Giới hạn trách nhiệm</h2>
        <p>
          VRC không chịu trách nhiệm đối với bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, 
          đặc biệt hoặc hậu quả phát sinh từ việc sử dụng hoặc không thể sử dụng website của chúng tôi.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Liên kết đến website khác</h2>
        <p>
          Website của chúng tôi có thể chứa các liên kết đến các website của bên thứ ba. Các liên 
          kết này được cung cấp chỉ nhằm mục đích tham khảo. Chúng tôi không kiểm soát nội dung của 
          các website này và không chịu trách nhiệm về nội dung hoặc các thực hành bảo mật của họ.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Thay đổi điều khoản</h2>
        <p>
          Chúng tôi có quyền sửa đổi các điều khoản này vào bất kỳ lúc nào. Quý khách có trách 
          nhiệm kiểm tra định kỳ các thay đổi. Việc tiếp tục sử dụng website sau khi các thay đổi 
          được đăng tải đồng nghĩa với việc quý khách chấp nhận các điều khoản mới.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Liên hệ</h2>
        <p>
          Nếu quý khách có bất kỳ câu hỏi nào về Điều khoản Sử dụng này, vui lòng liên hệ với chúng tôi qua:
        </p>
        <ul className="list-disc pl-6 my-4">
          <li>Email: legal@vrc.com.vn</li>
          <li>Điện thoại: 028 1234 5678</li>
          <li>Địa chỉ: 123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh</li>
        </ul>
      </div>
    </div>
  );
};

export default Terms;

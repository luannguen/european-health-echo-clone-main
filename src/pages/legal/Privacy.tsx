import React from 'react';

const Privacy = () => {
  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-8">Chính sách bảo mật</h1>
      
      <div className="prose max-w-none">
        <p className="mb-4">
          <strong>Cập nhật lần cuối:</strong> {new Date().toLocaleDateString('vi-VN')}
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Thông tin chúng tôi thu thập</h2>
        <p>
          VRC - Tổng công ty kỹ thuật điện lạnh Việt Nam cam kết bảo vệ quyền riêng tư của quý khách. 
          Chúng tôi có thể thu thập các thông tin sau đây:
        </p>
        <ul className="list-disc pl-6 my-4">
          <li>Thông tin cá nhân: tên, email, số điện thoại, địa chỉ</li>
          <li>Thông tin công ty: tên công ty, vị trí, ngành nghề</li>
          <li>Thông tin kỹ thuật: địa chỉ IP, loại trình duyệt, thiết bị</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Cách chúng tôi sử dụng thông tin</h2>
        <p>Chúng tôi sử dụng thông tin thu thập được để:</p>
        <ul className="list-disc pl-6 my-4">
          <li>Cung cấp, duy trì và cải thiện dịch vụ của chúng tôi</li>
          <li>Liên hệ với quý khách về các yêu cầu, dịch vụ hoặc thông tin</li>
          <li>Gửi thông báo về các thay đổi đối với dịch vụ của chúng tôi</li>
          <li>Tùy chỉnh trải nghiệm của người dùng</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Bảo mật thông tin</h2>
        <p>
          Chúng tôi thực hiện các biện pháp bảo mật hợp lý để bảo vệ thông tin cá nhân của quý khách 
          khỏi việc truy cập, sử dụng hoặc tiết lộ trái phép. Tuy nhiên, không có phương thức truyền 
          qua internet hoặc phương thức lưu trữ điện tử nào là an toàn 100%.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Chia sẻ thông tin</h2>
        <p>
          Chúng tôi không bán, trao đổi hoặc chuyển nhượng thông tin cá nhân của quý khách cho bên thứ ba 
          mà không có sự đồng ý của quý khách, ngoại trừ khi cần thiết để cung cấp dịch vụ mà quý khách 
          yêu cầu hoặc khi pháp luật yêu cầu.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Liên hệ</h2>
        <p>
          Nếu quý khách có bất kỳ câu hỏi nào về Chính sách Bảo mật này, vui lòng liên hệ với chúng tôi qua:
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

export default Privacy;

import React from 'react';
import { Calculator, Thermometer, BarChart3, Settings, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Tools = () => {
  return (
    <div className="container-custom py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4">Công cụ tính toán & Thiết kế</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Sử dụng các công cụ tính toán và thiết kế để lựa chọn hệ thống điều hòa không khí phù hợp, 
          tối ưu hóa hiệu suất và ước tính chi phí vận hành dài hạn.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-muted rounded-lg p-8 border border-border">
          <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
            <Calculator className="text-primary w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Tính toán tải lạnh cho không gian</h3>
          <p className="text-muted-foreground mb-6">
            Công cụ tính toán tải lạnh giúp xác định công suất điều hòa phù hợp dựa trên kích thước 
            phòng, vị trí địa lý, lượng người sử dụng và các yếu tố khác.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              <span>Tính toán BTU cần thiết theo kích thước phòng</span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              <span>Điều chỉnh theo vị trí địa lý và khí hậu</span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              <span>Tính toán cho không gian thương mại và công nghiệp</span>
            </li>
          </ul>
          <Link to="/data/tools/cooling-load-calculator" className="inline-flex items-center px-5 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
            Sử dụng công cụ
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>

        <div className="bg-muted rounded-lg p-8 border border-border">
          <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
            <BarChart3 className="text-primary w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold mb-4">So sánh hiệu suất và chi phí</h3>
          <p className="text-muted-foreground mb-6">
            Công cụ so sánh hiệu suất năng lượng và chi phí vận hành giữa các hệ thống điều hòa khác nhau, 
            giúp lựa chọn giải pháp tối ưu.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              <span>So sánh chi phí đầu tư ban đầu</span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              <span>Ước tính chi phí vận hành hàng năm</span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              <span>Đánh giá ROI và thời gian hoàn vốn</span>
            </li>
          </ul>
          <Link to="/data/tools/efficiency-comparison" className="inline-flex items-center px-5 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
            Sử dụng công cụ
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-muted rounded-lg p-6 border border-border hover:border-primary transition-colors">
          <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mb-4">
            <Thermometer className="text-primary w-7 h-7" />
          </div>
          <h3 className="text-lg font-semibold mb-3">Phân tích tiết kiệm năng lượng</h3>
          <p className="text-muted-foreground mb-4">
            Công cụ tính toán lượng năng lượng tiết kiệm được khi thay thế hoặc nâng cấp hệ thống điều hòa hiện tại.
          </p>
          <Link to="/data/tools/energy-savings" className="inline-flex items-center text-primary hover:underline font-medium">
            Sử dụng công cụ
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>

        <div className="bg-muted rounded-lg p-6 border border-border hover:border-primary transition-colors">
          <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mb-4">
            <Settings className="text-primary w-7 h-7" />
          </div>
          <h3 className="text-lg font-semibold mb-3">Tư vấn lựa chọn giải pháp</h3>
          <p className="text-muted-foreground mb-4">
            Công cụ trợ giúp tìm giải pháp điều hòa phù hợp nhất dựa trên các yêu cầu cụ thể của không gian và ngân sách.
          </p>
          <Link to="/data/tools/solution-advisor" className="inline-flex items-center text-primary hover:underline font-medium">
            Sử dụng công cụ
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>

        <div className="bg-accent p-6 rounded-lg border border-accent text-white">
          <h3 className="text-lg font-semibold mb-3">Cần hỗ trợ tùy chỉnh?</h3>
          <p className="mb-4 text-white/90">
            Đội ngũ kỹ thuật của chúng tôi sẵn sàng hỗ trợ bạn với các yêu cầu tính toán và thiết kế phức tạp hơn.
          </p>
          <Link to="/contact" className="inline-flex items-center text-white hover:underline font-medium">
            Liên hệ ngay
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>

      <div className="bg-muted p-8 rounded-lg border border-border">
        <h2 className="text-2xl font-bold mb-4">Tài liệu tham khảo</h2>
        <p className="text-muted-foreground mb-6">
          Tham khảo các tài liệu hướng dẫn và tiêu chuẩn ngành để hiểu rõ hơn về quy trình tính toán và thiết kế hệ thống điều hòa không khí.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <Link to="/data/tools/standards" className="inline-flex items-center text-primary hover:underline font-medium">
            Tiêu chuẩn ngành HVAC
            <ArrowRight size={16} className="ml-2" />
          </Link>
          <Link to="/data/tools/guidelines" className="inline-flex items-center text-primary hover:underline font-medium">
            Hướng dẫn thiết kế hệ thống
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tools;

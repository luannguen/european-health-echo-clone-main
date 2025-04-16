import React from 'react';
import { LineChart, BarChart, PieChart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Statistics = () => {
  return (
    <div className="container-custom py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4">Dữ liệu & Thống kê năng lượng</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Truy cập dữ liệu phân tích và thống kê về hiệu suất năng lượng của các hệ thống điều hòa không khí, 
          chi phí vận hành và tác động môi trường của các công nghệ khác nhau.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-muted rounded-lg p-6 border border-border hover:border-primary transition-colors">
          <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
            <LineChart className="text-primary w-7 h-7" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Chỉ số hiệu suất năng lượng</h3>
          <p className="text-muted-foreground mb-4">
            Dữ liệu so sánh về các chỉ số EER/COP của các hệ thống điều hòa khác nhau theo công nghệ và thời gian.
          </p>
          <Link to="/data/statistics/energy-efficiency" className="inline-flex items-center text-primary hover:underline font-medium">
            Xem chi tiết
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>

        <div className="bg-muted rounded-lg p-6 border border-border hover:border-primary transition-colors">
          <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
            <BarChart className="text-primary w-7 h-7" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Chi phí vận hành và bảo trì</h3>
          <p className="text-muted-foreground mb-4">
            Thống kê chi phí vận hành và bảo trì trung bình theo loại hệ thống, công suất và môi trường sử dụng.
          </p>
          <Link to="/data/statistics/operating-costs" className="inline-flex items-center text-primary hover:underline font-medium">
            Xem chi tiết
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>

        <div className="bg-muted rounded-lg p-6 border border-border hover:border-primary transition-colors">
          <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
            <PieChart className="text-primary w-7 h-7" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Phân tích ROI và hoàn vốn</h3>
          <p className="text-muted-foreground mb-4">
            Dữ liệu về thời gian hoàn vốn đầu tư và ROI (Return on Investment) cho các hệ thống điều hòa hiện đại.
          </p>
          <Link to="/data/statistics/roi" className="inline-flex items-center text-primary hover:underline font-medium">
            Xem chi tiết
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>

      <div className="bg-accent/10 p-8 rounded-lg border border-border mb-12">
        <h2 className="text-2xl font-bold mb-6">Báo cáo tác động môi trường</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-3">Phát thải carbon theo công nghệ</h3>
            <p className="text-muted-foreground mb-4">
              So sánh lượng phát thải carbon trung bình hàng năm giữa các công nghệ điều hòa không khí khác nhau 
              dựa trên dữ liệu từ các nghiên cứu và dự án thực tế.
            </p>
            <Link to="/data/statistics/carbon-emissions" className="inline-flex items-center text-primary hover:underline font-medium">
              Xem báo cáo đầy đủ
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Tác động môi trường dài hạn</h3>
            <p className="text-muted-foreground mb-4">
              Phân tích tác động môi trường dài hạn của việc sử dụng các hệ thống HVAC khác nhau, 
              bao gồm cả quá trình sản xuất, vận hành và thải bỏ.
            </p>
            <Link to="/data/statistics/environmental-impact" className="inline-flex items-center text-primary hover:underline font-medium">
              Xem báo cáo đầy đủ
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Link to="/contact" className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
          Yêu cầu dữ liệu tùy chỉnh
        </Link>
      </div>
    </div>
  );
};

export default Statistics;

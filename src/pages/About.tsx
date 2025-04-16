const About = () => {
  return (
    <main className="flex-grow">
      <div className="bg-gradient-to-b from-primary/10 to-transparent py-12 md:py-20">
        <div className="container-custom">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6">Giới thiệu</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Tổng công ty Kỹ thuật lạnh Việt Nam (VRC) - Đơn vị tiên phong trong lĩnh vực kỹ thuật lạnh
            với hơn 20 năm kinh nghiệm, cung cấp giải pháp toàn diện trong lĩnh vực điện lạnh
            cho các công trình dân dụng và công nghiệp.
          </p>
        </div>
      </div>

      {/* Lịch sử phát triển */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Lịch sử phát triển</h2>
              <p className="mb-4">
                Được thành lập vào năm 2003, VRC đã trải qua hành trình phát triển dài hơn 20 năm, không ngừng 
                mở rộng quy mô và nâng cao chất lượng dịch vụ.
              </p>
              <p className="mb-4">
                Từ một đơn vị chuyên về lắp đặt và bảo dưỡng hệ thống điều hòa không khí, VRC đã phát triển 
                thành Tổng công ty hàng đầu trong lĩnh vực kỹ thuật lạnh tại Việt Nam với nhiều chi nhánh 
                trên toàn quốc.
              </p>
              <p>
                Ngày nay, VRC tự hào là đối tác tin cậy của nhiều tập đoàn lớn trong và ngoài nước, 
                cung cấp giải pháp điện lạnh toàn diện cho các công trình quy mô lớn.
              </p>
            </div>
            <div className="relative">
              <img 
                src="/lovable-uploads/0bd3c048-8e37-4775-a6bc-0b54ec07edbe.png" 
                alt="Lịch sử phát triển VRC" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-secondary p-4 rounded-lg shadow-lg">
                <p className="text-xl font-bold">20+</p>
                <p className="text-sm">Năm kinh nghiệm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tầm nhìn & Sứ mệnh */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                Tầm nhìn
              </h2>
              <p className="mb-4">
                Trở thành đơn vị hàng đầu trong lĩnh vực kỹ thuật lạnh tại Việt Nam và khu vực Đông Nam Á, 
                cung cấp những giải pháp tiên tiến, thân thiện với môi trường và hiệu quả năng lượng.
              </p>
              <p>
                Chúng tôi không ngừng đổi mới và ứng dụng công nghệ tiên tiến, hướng tới mục tiêu 
                phát triển bền vững và góp phần vào việc bảo vệ môi trường.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>
                Sứ mệnh
              </h2>
              <p className="mb-4">
                Cung cấp các giải pháp điện lạnh toàn diện, hiệu quả và tin cậy cho khách hàng, 
                đồng thời tạo ra môi trường làm việc chuyên nghiệp cho nhân viên và đóng góp tích cực 
                cho xã hội.
              </p>
              <p>
                Mang đến những không gian sống và làm việc thoải mái, an toàn và tiết kiệm năng lượng 
                thông qua các sản phẩm và dịch vụ chất lượng cao.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Giá trị cốt lõi */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-10 text-center">Giá trị cốt lõi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h18"></path><path d="M3 11h18"></path><path d="M3 15h14"></path><path d="M3 19h4"></path></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Chất lượng hàng đầu</h3>
              <p>
                Chúng tôi cam kết mang đến sản phẩm và dịch vụ chất lượng cao, đáp ứng và vượt trội 
                so với mong đợi của khách hàng.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="m17 5-5-3-5 3"></path><path d="m17 19-5 3-5-3"></path><path d="M2 12h20"></path><path d="m5 7-3 5 3 5"></path><path d="m19 7 3 5-3 5"></path></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Đổi mới sáng tạo</h3>
              <p>
                Không ngừng cải tiến và ứng dụng công nghệ tiên tiến để mang đến những giải pháp 
                hiệu quả và tiết kiệm năng lượng.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Khách hàng là trọng tâm</h3>
              <p>
                Luôn đặt nhu cầu và sự hài lòng của khách hàng lên hàng đầu, cung cấp dịch vụ 
                tận tâm và chuyên nghiệp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Đội ngũ lãnh đạo */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-10 text-center">Đội ngũ lãnh đạo</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                name: "Nguyễn Văn A",
                position: "Chủ tịch Hội đồng Quản trị",
                photo: "https://i.pravatar.cc/300?img=1"
              },
              {
                name: "Trần Thị B",
                position: "Tổng Giám đốc",
                photo: "https://i.pravatar.cc/300?img=5"
              },
              {
                name: "Lê Văn C",
                position: "Phó Tổng Giám đốc",
                photo: "https://i.pravatar.cc/300?img=3"
              },
              {
                name: "Phạm Thị D",
                position: "Giám đốc Tài chính",
                photo: "https://i.pravatar.cc/300?img=4"
              }
            ].map((leader, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <img 
                  src={leader.photo} 
                  alt={leader.name} 
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-primary">{leader.name}</h3>
                  <p className="text-muted-foreground">{leader.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thành tựu */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-10 text-center">Thành tựu nổi bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-full h-min">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 2v1"></path><path d="M12 7v1"></path><path d="M12 13v1"></path><path d="M12 19v1"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h1"></path><path d="M19 12h1"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Top 10 Doanh nghiệp Tiêu biểu ngành Cơ điện lạnh Việt Nam</h3>
                    <p className="text-muted-foreground">
                      Nhận giải thưởng uy tín từ Hiệp hội Cơ điện lạnh Việt Nam trong 5 năm liên tiếp (2020-2024)
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-full h-min">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Giải thưởng Chất lượng Quốc gia</h3>
                    <p className="text-muted-foreground">
                      Vinh dự nhận Giải thưởng Chất lượng Quốc gia về dịch vụ xuất sắc trong lĩnh vực kỹ thuật lạnh
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-full h-min">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M3 9h18"></path><path d="M9 21V9"></path><path d="m16 16-3-3 3-3"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Chứng nhận ISO 9001:2015</h3>
                    <p className="text-muted-foreground">
                      Đạt chứng nhận hệ thống quản lý chất lượng quốc tế ISO 9001:2015 cho toàn bộ hệ thống
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-full h-min">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">1000+ Dự án lớn hoàn thành</h3>
                    <p className="text-muted-foreground">
                      Thực hiện thành công hơn 1000 dự án lớn cho các công trình trọng điểm trên khắp cả nước
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-full h-min">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path><path d="M7 7h.01"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Chứng nhận Xanh</h3>
                    <p className="text-muted-foreground">
                      Được công nhận là đơn vị tiên phong trong việc áp dụng các giải pháp thân thiện với môi trường
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-full h-min">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">500+ Nhân viên</h3>
                    <p className="text-muted-foreground">
                      Đội ngũ hơn 500 kỹ sư, kỹ thuật viên và nhân viên chuyên nghiệp làm việc trên toàn quốc
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
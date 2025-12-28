
import { Language } from './types';

export const translations: Record<Language, any> = {
  vi: {
    nav: { home: 'Trang chủ', pricing: 'Bảng giá', affiliate: 'Đại lý', contact: 'Liên hệ', support: 'Hỗ trợ', login: 'Đăng nhập', register: 'Đăng ký' },
    gmailVerify: {
      title: 'XÁC THỰC GMAIL',
      sub: 'Vui lòng xác thực Gmail để bảo vệ tài khoản và nhận thông báo quan trọng.',
      labelEmail: 'ĐỊA CHỈ GMAIL',
      placeholderEmail: 'scardvip@gmail.com',
      btnSendOtp: 'GỬI MÃ OTP',
      labelOtp: 'MÃ XÁC THỰC OTP',
      placeholderOtp: '000000',
      btnVerify: 'XÁC NHẬN NGAY',
      resend: 'GỬI LẠI MÃ',
      success: 'XÁC THỰC THÀNH CÔNG!',
      errorEmail: 'EMAIL KHÔNG ĐÚNG ĐỊNH DẠNG GMAIL',
      errorOtp: 'MÃ OTP KHÔNG CHÍNH XÁC',
      logout: 'THOÁT TÀI KHOẢN'
    },
    dashboard: {
      title: 'Quản lý Proxy',
      balance: 'Số dư ví',
      createProxy: 'ĐẶT MUA PROXY',
      proxyList: 'DANH SÁCH PROXY',
      buyBtn: 'THANH TOÁN & KÍCH HOẠT',
      active: 'Hoạt động',
      expired: 'Hết hạn',
      refresh: 'Làm mới dữ liệu',
      copyAll: 'SAO CHÉP',
      downloadTxt: 'TẢI TXT',
      exportExcel: 'XUẤT EXCEL',
      status: 'TRẠNG THÁI',
      expiredAt: 'HẾT HẠN',
      quantity: 'SỐ LƯỢNG',
      navMain: 'Bảng điều khiển',
      navApi: 'Tích hợp API',
      logout: 'Đăng xuất',
      serverLocation: 'VỊ TRÍ SERVER',
      protocol: 'GIAO THỨC',
      duration: 'GÓI THỜI GIAN',
      promoLabel: '1000 VND / 1PROXY (KHUYẾN MÃI 20%)',
      totalPrice: 'TỔNG TIỀN',
      tableIp: 'IP:PORT',
      tableAccount: 'TÀI KHOẢN',
      tableLocation: 'VỊ TRÍ',
      apiTitle: 'Kết nối API hệ thống',
      apiSub: 'Sử dụng Token dưới đây để tích hợp Proxy vào các công cụ tự động của bạn.',
      apiTokenLabel: 'YOUR PERSONAL ACCESS TOKEN (JWT)',
      apiGuide: 'Hướng dẫn tích hợp'
    },
    hero: { label: 'Tự tạo Proxy IPv6 Online', title1: 'Proxy IPv6 Dân Cư', title2: 'Nhanh Chóng & Dễ Dàng', sub: 'Băng thông không giới hạn, hỗ trợ HTTP/HTTPS/SOCKS5.', promo: 'KHUYẾN MÃI:', promoDesc: 'Tặng 10,000 VND', priceLabel: 'Chỉ 500đ', unit: '/ 1 Proxy', btnStart: 'Tạo Proxy Ngay', btnPrice: 'Bảng Giá', feat1: '100Mbps+', feat2: 'SSL/TLS', feat3: '99.9% Uptime' },
    ctaHome: { title1: 'Sẵn Sàng Tạo', title2: 'Proxy Online?', sub: 'Liên hệ để được hỗ trợ', btnStart: 'Bắt Đầu', btnContact: '0813149999', feat1: '24/7', feat2: 'An toàn', feat3: 'Hoàn tiền' },
    features: { 
      title: 'Tại Sao Chọn ProxyNuoiNick?', 
      sub: 'Chúng tôi cung cấp giải pháp Proxy vượt trội về tốc độ và độ tin cậy.', 
      items: [
        { title: 'Tốc Độ 1Gbps', desc: 'Hạ tầng băng thông rộng đảm bảo kết nối mượt mà không bị nghẽn mạch.' }, 
        { title: 'Uptime 99.9%', desc: 'Hệ thống giám sát 24/7, đảm bảo Proxy luôn trong trạng thái sẵn sàng.' }, 
        { title: 'Kích Hoạt Tự Động', desc: 'Proxy được cấp phát ngay lập tức sau khi bạn hoàn tất thanh toán.' }, 
        { title: 'Bảo Mật SSL/TLS', desc: 'Mã hóa dữ liệu truyền tải, bảo vệ thông tin cá nhân và tài khoản của bạn.' },
        { title: 'IP Dân Cư Thật', desc: 'Tỷ lệ trust cao, hạn chế tối đa việc bị checkpoint hoặc khóa tài khoản.' },
        { title: 'Hỗ Trợ Tận Tâm', desc: 'Đội ngũ kỹ thuật trực chiến 24/7 qua Zalo và Telegram hỗ trợ mọi vấn đề.' }
      ] 
    },
    pricing: { 
      title: 'Bảng Giá', 
      highlight: 'Ưu Đãi', 
      sub: 'Lựa chọn gói phù hợp với nhu cầu của bạn, tiết kiệm đến 50%', 
      bestValue: 'TIẾT KIỆM NHẤT', 
      btnSelect: 'Chọn Gói Này', 
      featureLabels: {
        unlimited_proxy: 'Không giới hạn số lượng mua',
        unlimited_bandwidth: 'Băng thông không giới hạn',
        protocols: 'Hỗ trợ HTTP/HTTPS/SOCKS5',
        email_support: 'Hỗ trợ qua Email/Zalo',
        uptime_99: 'Uptime cam kết 99.9%',
        flexible: 'Gia hạn linh hoạt hàng tháng',
        priority_support: 'Hỗ trợ ưu tiên 24/7',
        api_access: 'Tích hợp API đầy đủ',
        save_30: 'Tiết kiệm 30% so với gói lẻ',
        support_247: 'Hỗ trợ kỹ thuật chuyên sâu',
        multi_region: 'Nhiều dải IP đa dạng',
        save_40: 'Tiết kiệm 40% chi phí',
        vip_support: 'Hỗ trợ VIP 1-1',
        api_premium: 'API tốc độ cao không giới hạn',
        custom: 'Tùy chỉnh cấu hình theo yêu cầu',
        save_50: 'Tiết kiệm tối đa 50%'
      },
      plans: { 
        '1-month': { name: 'Gói 1 Tháng', sub: 'Thử nghiệm & Linh hoạt' }, 
        '3-months': { name: 'Gói 3 Tháng', sub: 'Phổ biến cho cá nhân' }, 
        '6-months': { name: 'Gói 6 Tháng', sub: 'Tối ưu cho doanh nghiệp' }, 
        '12-months': { name: 'Gói 12 Tháng', sub: 'Dành cho chuyên gia MMO' } 
      } 
    },
    affiliate: { 
      title: 'Cơ Hội Hợp Tác', 
      highlight: 'Đại Lý', 
      sub: 'Gia nhập mạng lưới đại lý của chúng tôi và nhận mức hoa hồng cực khủng.', 
      commissionLabel: 'MỨC HOA HỒNG LÊN ĐẾN', 
      commissionValue: '40%', 
      pillars: [
        { title: 'Thu Nhập Thụ Động', desc: 'Nhận hoa hồng trọn đời cho mỗi đơn hàng từ khách hàng bạn giới thiệu.' }, 
        { title: 'Thanh Toán Nhanh', desc: 'Rút tiền nhanh chóng về tài khoản ngân hàng sau khi đạt hạn mức tối thiểu.' }, 
        { title: 'Công Cụ Chuyên Nghiệp', desc: 'Hệ thống Dashboard theo dõi realtime lượng click và chuyển đổi.' }
      ], 
      supportTitle: 'Quyền Lợi Đặc Biệt', 
      policies: [
        "Hỗ trợ tài liệu Marketing và Banner quảng cáo chuyên nghiệp", 
        "Cấp quyền Dashboard quản lý khách hàng chi tiết", 
        "Hỗ trợ kỹ thuật riêng biệt cho các đại lý lớn",
        "Chính sách cộng dồn hoa hồng theo doanh số tháng",
        "Tham gia các chương trình thưởng nóng cho đại lý xuất sắc",
        "Được ưu tiên trải nghiệm các dải IP mới nhất"
      ], 
      processTitle: 'QUY TRÌNH 3 BƯỚC ĐƠN GIẢN',
      processSteps: [
        { title: '1. Đăng ký', desc: 'Tạo tài khoản và liên hệ quản trị viên để kích hoạt quyền Đại lý.' },
        { title: '2. Chia sẻ', desc: 'Sử dụng link giới thiệu duy nhất của bạn để quảng bá dịch vụ.' },
        { title: '3. Nhận tiền', desc: 'Theo dõi doanh thu và rút hoa hồng bất cứ khi nào bạn muốn.' }
      ],
      ctaTitle: 'Sẵn Sàng Bắt Đầu?', 
      ctaSub: 'Đừng bỏ lỡ cơ hội gia tăng thu nhập bền vững cùng ProxyNuoiNick.', 
      ctaBtn: 'LIÊN HỆ KÍCH HOẠT NGAY', 
      contactInfo: 'Hotline/Zalo hỗ trợ Đại lý: 0813149999' 
    },
    faq: { title: 'FAQ', sub: 'Giải đáp nhanh', items: [{ question: 'Proxy là gì?', answer: 'Proxy là một máy chủ trung gian cho phép bạn kết nối Internet với một địa chỉ IP khác, giúp bảo mật và vượt qua các rào cản địa lý.' }] },
    footer: { desc: 'Giải pháp Proxy IPv6 hàng đầu Việt Nam.', services: 'Dịch vụ', serviceList: ['Proxy IPv6 Dân Cư', 'Proxy IPv4 Shared', 'Proxy IPv4 Private'], support: 'Hỗ trợ', supportList: [{ label: 'Hướng dẫn', tab: 'tutorials' }, { label: 'Liên hệ', tab: 'contact' }, { label: 'Điều khoản', tab: 'terms' }], newsletter: 'Bản tin', newsletterSub: 'Đăng ký nhận tin để không bỏ lỡ ưu đãi', newsletterPlaceholder: 'Nhập Email của bạn', newsletterBtn: 'Gửi', rights: 'Bản quyền thuộc về ProxyNuoiNick.com.' },
    tutorials: { title: 'Hướng dẫn', highlight: 'Sử dụng', sub: 'Các bước đơn giản để bắt đầu sử dụng Proxy', items: [{ title: 'Cách mua và sử dụng', steps: ['Đăng ký tài khoản', 'Nạp tiền vào ví', 'Chọn gói Proxy phù hợp', 'Nhận thông tin IP:Port và cấu hình vào tool'] }] },
    contact: { title: 'Liên hệ', highlight: 'Hỗ trợ', sub: 'Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7', zalo: '0813149999', telegram: '@baosamproxy', email: 'support@proxynuoinick.com', address: 'Tòa nhà Landmark 81, Quận Bình Thạnh, TP.HCM', workingHours: 'Thời gian làm việc: 24/7 kể cả ngày lễ' },
    terms: { title: 'Điều khoản', highlight: 'Dịch vụ', sub: 'Vui lòng đọc kỹ quy định trước khi sử dụng', sections: [{ title: 'Quy định sử dụng', content: 'Nghiêm cấm sử dụng Proxy cho các mục đích vi phạm pháp luật, tấn công mạng hoặc spam trái phép.' }] },
    auth: { loginTitle: 'Chào mừng trở lại', loginSub: 'Đăng nhập vào hệ thống', regTitle: 'Tạo tài khoản mới', regSub: 'Tham gia cùng cộng đồng ProxyNuoiNick ngay hôm nay', phone: 'Số điện thoại', pass: 'Mật khẩu', confirmPass: 'Xác nhận mật khẩu', fullName: 'Họ và tên', remember: 'Ghi nhớ đăng nhập', forgot: 'Quên mật khẩu?', btnLogin: 'Đăng nhập ngay', btnReg: 'Đăng ký tài khoản', or: 'Hoặc', noAccount: 'Chưa có tài khoản?', hasAccount: 'Đã có tài khoản?', backHome: 'Về trang chủ', terms: 'Tôi đồng ý với điều khoản sử dụng' }
  },
  en: {
    nav: { home: 'Home', pricing: 'Pricing', affiliate: 'Affiliate', contact: 'Contact', support: 'Support', login: 'Login', register: 'Register' },
    gmailVerify: {
      title: 'GMAIL VERIFICATION',
      sub: 'Please verify your Gmail to protect your account and receive important updates.',
      labelEmail: 'GMAIL ADDRESS',
      placeholderEmail: 'scardvip@gmail.com',
      btnSendOtp: 'SEND OTP CODE',
      labelOtp: 'VERIFICATION OTP',
      placeholderOtp: '000000',
      btnVerify: 'VERIFY NOW',
      resend: 'RESEND CODE',
      success: 'VERIFICATION SUCCESSFUL!',
      errorEmail: 'INVALID GMAIL FORMAT',
      errorOtp: 'INCORRECT OTP',
      logout: 'LOGOUT ACCOUNT'
    },
    dashboard: {
      title: 'Proxy Management',
      balance: 'Balance',
      createProxy: 'ORDER PROXY',
      proxyList: 'PROXY LIST',
      buyBtn: 'PAY & ACTIVATE',
      active: 'Active',
      expired: 'Expired',
      refresh: 'Refresh',
      copyAll: 'COPY',
      downloadTxt: 'DOWNLOAD TXT',
      exportExcel: 'EXPORT EXCEL',
      status: 'STATUS',
      expiredAt: 'EXPIRY',
      quantity: 'QUANTITY',
      navMain: 'Dashboard',
      navApi: 'API Integration',
      logout: 'Logout',
      serverLocation: 'SERVER LOCATION',
      protocol: 'PROTOCOL',
      duration: 'DURATION',
      promoLabel: '1000 VND / 1PROXY (20% OFF)',
      totalPrice: 'TOTAL',
      tableIp: 'IP:PORT',
      tableAccount: 'ACCOUNT',
      tableLocation: 'LOCATION',
      apiTitle: 'System API Connection',
      apiSub: 'Use the token below to integrate proxies into your tools.',
      apiTokenLabel: 'YOUR PERSONAL ACCESS TOKEN (JWT)',
      apiGuide: 'Integration Guide'
    },
    hero: { label: 'Create IPv6 Proxy Online', title1: 'Residential IPv6', title2: 'Fast & Easy', sub: 'Unlimited bandwidth, HTTP/HTTPS/SOCKS5 supported.', promo: 'PROMO:', promoDesc: 'Get 10,000 VND', priceLabel: 'Only 500đ', unit: '/ 1 Proxy', btnStart: 'Create Now', btnPrice: 'Pricing', feat1: '100Mbps+', feat2: 'SSL/TLS', feat3: '99.9% Uptime' },
    ctaHome: { title1: 'Ready to', title2: 'Create Online?', sub: 'Contact for support', btnStart: 'Start', btnContact: '0813149999', feat1: '24/7', feat2: 'Secure', feat3: 'Refund' },
    features: { 
      title: 'Why Choose Us?', 
      sub: 'The ultimate solution for your online privacy and performance.', 
      items: [
        { title: '1Gbps Speed', desc: 'High bandwidth infrastructure ensures no bottlenecks.' }, 
        { title: '99.9% Uptime', desc: '24/7 monitoring ensures your proxy is always active.' }, 
        { title: 'Auto Activation', desc: 'Instant delivery right after payment completion.' }, 
        { title: 'SSL/TLS Security', desc: 'Encrypted data transmission for your privacy.' },
        { title: 'Real Residential IP', desc: 'High trust score to prevent account checkpoints.' },
        { title: '24/7 Support', desc: 'Dedicated team available via Telegram for any assistance.' }
      ] 
    },
    pricing: { 
      title: 'Pricing', 
      highlight: 'Offers', 
      sub: 'Save up to 50% with our long-term plans', 
      bestValue: 'BEST VALUE', 
      btnSelect: 'Select Plan', 
      featureLabels: {
        unlimited_proxy: 'Unlimited proxy quantity',
        unlimited_bandwidth: 'Unlimited bandwidth',
        protocols: 'HTTP/HTTPS/SOCKS5 support',
        email_support: 'Email/Social support',
        uptime_99: '99.9% Uptime guarantee',
        flexible: 'Monthly flexible renewal',
        priority_support: '24/7 priority support',
        api_access: 'Full API access',
        save_30: 'Save 30% on subscription',
        support_247: 'Technical deep support',
        multi_region: 'Diverse IP ranges',
        save_40: 'Save 40% on subscription',
        vip_support: '1-1 VIP support',
        api_premium: 'High-speed premium API',
        custom: 'Custom configuration on request',
        save_50: 'Save up to 50%'
      },
      plans: { 
        '1-month': { name: '1 Month', sub: 'Flexible' }, 
        '3-months': { name: '3 Months', sub: 'Save more' }, 
        '6-months': { name: '6 Months', sub: 'Business' }, 
        '12-months': { name: '12 Months', sub: 'Optimal' } 
      } 
    },
    affiliate: { title: 'Become', highlight: 'Affiliate', sub: 'Join us', commissionLabel: 'Commission', commissionValue: '40%', pillars: [{ title: '40%', desc: 'Profit' }, { title: 'Infinite', desc: 'Clients' }, { title: 'Fast', desc: 'Payment' }], supportTitle: 'Support', policies: ["Docs", "Dashboard", "Tech"], ctaTitle: 'Register Now', ctaSub: 'Start today', ctaBtn: '0813149999', contactInfo: 'Hotline: 0813149999' },
    faq: { title: 'FAQ', sub: 'Quick answers', items: [{ question: 'What is proxy?', answer: 'IP service.' }] },
    footer: { desc: 'IPv6 solutions.', services: 'Services', serviceList: ['VNPT Proxy'], support: 'Support', supportList: [{ label: 'Guide', tab: 'tutorials' }], newsletter: 'Newsletter', newsletterSub: 'Subscribe', newsletterPlaceholder: 'Email', newsletterBtn: 'Go', rights: 'All rights reserved.' },
    tutorials: { title: 'Tutorials', highlight: 'Guide', sub: 'Simple steps', items: [{ title: 'Buy', steps: ['Register'] }] },
    contact: { title: 'Contact', highlight: 'Support', sub: '24/7 support', zalo: '0813149999', telegram: '@baosamproxy', email: 'support@proxynuoinick.com', address: 'HCM City', workingHours: '24/7' },
    terms: { title: 'Terms', highlight: 'Service', sub: 'Usage rules', sections: [{ title: 'Policy', content: 'No illegal acts.' }] },
    auth: { loginTitle: 'Welcome', loginSub: 'Login', regTitle: 'Sign Up', regSub: 'Create account', phone: 'Phone', pass: 'Password', confirmPass: 'Confirm', fullName: 'Full Name', remember: 'Remember', forgot: 'Forgot?', btnLogin: 'Login', btnReg: 'Join', or: 'Or', noAccount: 'No account?', hasAccount: 'Already have?', backHome: 'Home', terms: 'Agree' }
  },
  zh: {
    nav: { home: '首页', pricing: '价格', affiliate: '加盟', contact: '联系', support: '支持', login: '登录', register: '注册' },
    gmailVerify: {
      title: 'GMAIL 验证',
      sub: '请验证您的 Gmail 以保护您的帐户并接收重要更新。',
      labelEmail: 'GMAIL 地址',
      placeholderEmail: 'scardvip@gmail.com',
      btnSendOtp: '发送验证码',
      labelOtp: '验证码 (OTP)',
      placeholderOtp: '000000',
      btnVerify: '立即验证',
      resend: '重新发送',
      success: '验证成功！',
      errorEmail: 'GMAIL 格式不正确',
      errorOtp: '验证码错误',
      logout: '退出登录'
    }
  },
  ru: {
    nav: { home: 'Главная', pricing: 'Цены', affiliate: 'Партнерам', contact: 'Контакты', support: 'Поддержка', login: 'Вход', register: 'Регистрация' },
    gmailVerify: {
      title: 'ВЕРИФИКАЦИЯ GMAIL',
      sub: 'Пожалуйста, подтвердите ваш Gmail, чтобы защитить аккаунт и получать важные уведомления.',
      labelEmail: 'АДРЕС GMAIL',
      placeholderEmail: 'scardvip@gmail.com',
      btnSendOtp: 'ОТПРАВИТЬ КОД',
      labelOtp: 'КОД ВЕРИФИКАЦИИ (OTP)',
      placeholderOtp: '000000',
      btnVerify: 'ПОДТВЕРДИТЬ',
      resend: 'ПЕРЕОТПРАВИТЬ',
      success: 'УСПЕШНО!',
      errorEmail: 'НЕВЕРНЫЙ ФОРМАТ GMAIL',
      errorOtp: 'НЕВЕРНЫЙ КОД',
      logout: 'ВЫЙТИ ИЗ АККАУНТА'
    }
  }
};

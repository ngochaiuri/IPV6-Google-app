
import { Language } from './types';

export const translations: Record<Language, any> = {
  vi: {
    nav: { home: 'Trang chủ', pricing: 'Bảng giá', affiliate: 'Đại lý', contact: 'Liên hệ', support: 'Hỗ trợ', login: 'Đăng nhập', register: 'Đăng ký' },
    dashboard: {
      title: 'Quản lý Proxy',
      balance: 'Số dư ví',
      createProxy: 'Mua Proxy Online',
      proxyList: 'Danh sách Proxy đã mua',
      buyBtn: 'Thanh toán & Kích hoạt',
      active: 'Hoạt động',
      expired: 'Hết hạn',
      refresh: 'Làm mới dữ liệu',
      copyAll: 'Sao chép tất cả',
      status: 'Trạng thái',
      expiredAt: 'Ngày hết hạn',
      quantity: 'Số lượng mua'
    },
    hero: {
      label: 'Tự tạo Proxy IPv6 Online',
      title1: 'Proxy IPv6 Dân Cư',
      title2: 'Nhanh Chóng & Dễ Dàng',
      sub: 'Tạo và quản lý proxy IPv6 online của riêng bạn với băng thông không giới hạn, hỗ trợ HTTP/HTTPS/SOCKS5 chỉ trong vài phút',
      promo: 'KHUYẾN MÃI:',
      promoDesc: 'Tặng 10,000 VND khi đăng ký mới',
      priceLabel: 'Chỉ 500đ',
      unit: '/ 1 Proxy',
      btnStart: 'Tạo Proxy Online Ngay',
      btnPrice: 'Xem Bảng Giá',
      feat1: 'Tốc độ 100Mbps+',
      feat2: 'Bảo mật SSL/TLS',
      feat3: '99.9% Uptime'
    },
    ctaHome: {
      title1: 'Sẵn Sàng Tạo',
      title2: 'Proxy Online?',
      sub: 'Liên hệ với chúng tôi để được tư vấn và hỗ trợ',
      btnStart: 'Bắt Đầu Ngay',
      btnContact: 'Liên Hệ: 0813149999',
      feat1: 'Hỗ trợ 24/7',
      feat2: 'Thanh toán an toàn',
      feat3: 'Hoàn tiền trong 7 ngày'
    },
    features: {
      title: 'Tại Sao Nên Chọn ProxyNuoiNick?',
      sub: 'Chúng tôi cung cấp giải pháp proxy tối ưu nhất cho doanh nghiệp và cá nhân làm MMO tại Việt Nam.',
      items: [
        { title: 'Tốc độ 1Gbps', desc: 'Hạ tầng máy chủ mạnh mẽ, đảm bảo băng thông không giới hạn cho mọi tác vụ.' },
        { title: 'Ổn định 99.9%', desc: 'Hệ thống tự động phát hiện và khắc phục sự cố, duy trì kết nối liên tục.' },
        { title: 'Setup tự động', desc: 'Mua và nhận proxy ngay lập tức qua API hoặc Dashboard quản lý thông minh.' },
        { title: 'Hỗ trợ 24/7', desc: 'Đội ngũ kỹ thuật túc trực hỗ trợ khách hàng qua Zalo/Telegram bất cứ lúc nào.' }
      ]
    },
    pricing: {
      title: 'Bảng Giá',
      highlight: 'Ưu Đãi',
      sub: 'Càng dài hạn - Càng tiết kiệm! Khuyến mãi lên đến 50%',
      bestValue: 'Tiết Kiệm Nhất',
      btnSelect: 'Chọn Gói',
      plans: {
        '1-month': { name: '1 Tháng', sub: 'Gói ngắn hạn linh hoạt' },
        '3-months': { name: '3 Tháng', sub: 'Tiết kiệm hơn cho dự án vừa' },
        '6-months': { name: '6 Tháng', sub: 'Lựa chọn thông minh cho dài hạn' },
        '12-months': { name: '12 Tháng', sub: 'Tiết kiệm tối đa cho doanh nghiệp' }
      }
    },
    affiliate: {
      title: 'Trở Thành',
      highlight: 'Đại Lý',
      sub: 'Tham gia hệ thống đại lý của chúng tôi và nhận hoa hồng hấp dẫn',
      commissionLabel: 'Hoa hồng lên đến',
      commissionValue: '40% / Proxy',
      pillars: [
        { title: 'Hoa Hồng 40%', desc: 'Nhận ngay 40% lợi nhuận cho mỗi proxy bán được' },
        { title: 'Không Giới Hạn', desc: 'Không giới hạn số lượng khách hàng và proxy bán ra' },
        { title: 'Thanh Toán Nhanh', desc: 'Thanh toán hoa hồng nhanh chóng và minh bạch' }
      ],
      supportTitle: 'Chính Sách Hỗ Trợ Đại Lý',
      policies: [
        "Hỗ trợ tài liệu marketing và hướng dẫn bán hàng chuyên nghiệp",
        "Cung cấp dashboard quản lý khách hàng và đơn hàng riêng",
        "Đào tạo kiến thức về proxy và kỹ năng tư vấn khách hàng",
        "Hỗ trợ kỹ thuật 24/7 cho đại lý và khách hàng của đại lý",
        "Chính sách giá ưu đãi đặc biệt cho đại lý cấp cao",
        "Tặng gói proxy miễn phí để test và demo cho khách hàng"
      ],
      ctaTitle: 'Liên Hệ Đăng Ký Làm Đại Lý Ngay!',
      ctaSub: 'Bắt đầu kinh doanh và tạo nguồn thu nhập thụ động từ hôm nay',
      ctaBtn: 'Gọi Ngay: 0813149999 (Zalo)',
      contactInfo: 'Hotline: 0813149999 - Bảo Sâm (Hỗ trợ qua Zalo)'
    },
    faq: {
      title: 'Câu hỏi thường gặp',
      sub: 'Giải đáp nhanh các thắc mắc về dịch vụ Proxy IPv6',
      items: [
        { question: 'Proxy IPv6 là gì?', answer: 'Proxy IPv6 là giao thức internet thế hệ mới với dải IP khổng lồ và chi phí rẻ.' },
        { question: 'Làm thế nào để bắt đầu?', answer: 'Bạn chỉ cần đăng ký tài khoản, nạp tiền và chọn gói proxy phù hợp.' },
        { question: 'Có hỗ trợ SOCKS5 không?', answer: 'Có, hệ thống hỗ trợ đầy đủ HTTP/HTTPS và SOCKS5.' }
      ]
    },
    footer: {
      desc: 'Giải pháp Proxy IPv6 dân cư hàng đầu Việt Nam. Tốc độ cao, ổn định và bảo mật tuyệt đối.',
      services: 'Dịch vụ',
      serviceList: ['Proxy IPv6 VNPT', 'Proxy IPv6 FPT', 'Proxy IPv6 Viettel', 'Proxy Mobile'],
      support: 'Hỗ trợ',
      supportList: [
        { label: 'Hướng dẫn sử dụng', tab: 'tutorials' },
        { label: 'Liên hệ', tab: 'contact' },
        { label: 'Điều khoản', tab: 'terms' }
      ],
      newsletter: 'Bản tin',
      newsletterSub: 'Nhận thông tin khuyến mãi sớm nhất từ chúng tôi.',
      newsletterPlaceholder: 'Email của bạn',
      newsletterBtn: 'Đăng ký',
      rights: 'Đã đăng ký bản quyền.'
    },
    tutorials: {
      title: 'Hướng dẫn',
      highlight: 'Sử dụng',
      sub: 'Bắt đầu sử dụng ProxyNuoiNick chỉ với vài bước đơn giản.',
      items: [
        { title: 'Mua Proxy', steps: ['Đăng ký tài khoản', 'Nạp tiền vào ví', 'Chọn gói cần mua', 'Nhận thông tin Proxy'] },
        { title: 'Sử dụng', steps: ['Copy IP:Port:User:Pass', 'Dán vào tool nuôi nick', 'Kiểm tra trạng thái IP', 'Bắt đầu làm việc'] }
      ]
    },
    contact: {
      title: 'Liên hệ',
      highlight: 'Hỗ trợ',
      sub: 'Đội ngũ kỹ thuật luôn sẵn sàng hỗ trợ bạn 24/7.',
      zalo: '0813149999',
      telegram: '@baosamproxy',
      email: 'support@proxynuoinick.com',
      address: 'Thành phố Hồ Chí Minh, Việt Nam',
      workingHours: 'Hỗ trợ 24/7 tất cả các ngày trong tuần'
    },
    terms: {
      title: 'Điều khoản',
      highlight: 'Dịch vụ',
      sub: 'Vui lòng đọc kỹ các quy định khi sử dụng dịch vụ của chúng tôi.',
      sections: [
        { title: 'Quy định sử dụng', content: 'Nghiêm cấm sử dụng proxy cho các hoạt động vi phạm pháp luật.' },
        { title: 'Chính sách hoàn tiền', content: 'Hoàn tiền trong 24h nếu dịch vụ gặp lỗi kỹ thuật không thể khắc phục.' }
      ]
    },
    auth: {
      loginTitle: 'Chào mừng trở lại',
      loginSub: 'Đăng nhập để quản lý Proxy',
      regTitle: 'Tạo tài khoản',
      regSub: 'Bắt đầu ngay hôm nay',
      phone: 'Số điện thoại',
      pass: 'Mật khẩu',
      confirmPass: 'Xác nhận mật khẩu',
      fullName: 'Họ tên',
      remember: 'Ghi nhớ',
      forgot: 'Quên mật khẩu?',
      btnLogin: 'Đăng nhập',
      btnReg: 'Đăng ký',
      or: 'Hoặc',
      noAccount: 'Chưa có tài khoản?',
      hasAccount: 'Đã có tài khoản?',
      backHome: 'Trang chủ',
      terms: 'Đồng ý điều khoản'
    }
  },
  en: {
    nav: { home: 'Home', pricing: 'Pricing', affiliate: 'Affiliate', contact: 'Contact', support: 'Support', login: 'Login', register: 'Register' },
    dashboard: {
      title: 'Proxy Management',
      balance: 'Balance',
      createProxy: 'Buy Proxy Online',
      proxyList: 'Your Proxies',
      buyBtn: 'Pay & Activate',
      active: 'Active',
      expired: 'Expired',
      refresh: 'Refresh Data',
      copyAll: 'Copy All',
      status: 'Status',
      expiredAt: 'Expires At',
      quantity: 'Quantity'
    },
    hero: { title1: 'Residential', title2: 'IPv6 Proxy', label: 'Create Online', sub: 'Fast and secure proxy solutions.', btnStart: 'Start Now', btnPrice: 'Pricing' },
    footer: { desc: 'Premium Proxy Solutions.', services: 'Services', serviceList: ['IPv6 Proxy'], support: 'Support', supportList: [], newsletter: 'Newsletter', newsletterBtn: 'Sub', rights: 'All rights reserved.' },
    faq: { title: 'FAQ', sub: 'Frequently Asked Questions', items: [] },
    tutorials: { title: 'Tutorials', highlight: 'Guide', sub: 'How to use', items: [] },
    contact: { title: 'Contact', highlight: 'Us', sub: 'We are here', zalo: '0813149999' },
    terms: { title: 'Terms', highlight: 'Service', sub: 'Policies', sections: [] },
    pricing: { title: 'Pricing', highlight: 'Best', sub: 'Save more', bestValue: 'Best Value', btnSelect: 'Select', plans: { '1-month': { name: '1 Month' }, '3-months': { name: '3 Months' }, '6-months': { name: '6 Months' }, '12-months': { name: '12 Months' } } },
    auth: { loginTitle: 'Login', btnLogin: 'Login', btnReg: 'Register' }
  },
  zh: {
    nav: { home: '首页', pricing: '价格', affiliate: '加盟', contact: '联系我们', support: '支持', login: '登录', register: '注册' },
    dashboard: { title: '代理管理', balance: '余额', createProxy: '购买代理', proxyList: '列表', buyBtn: '激活' }
  },
  ru: {
    nav: { home: 'Главная', pricing: 'Цены', affiliate: 'Партнерам', contact: 'Контакты', support: 'Поддержка', login: 'Вход', register: 'Регистрация' },
    dashboard: { title: 'Управление', balance: 'Баланс', createProxy: 'Купить', proxyList: 'Список', buyBtn: 'Оплатить' }
  }
};

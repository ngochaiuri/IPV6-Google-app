
import { Language } from './types';

// Define translations for all supported languages to satisfy Record<Language, any>
export const translations: Record<Language, any> = {
  vi: {
    nav: { home: 'Trang chủ', pricing: 'Bảng giá', affiliate: 'Đại lý', contact: 'Liên hệ', support: 'Hỗ trợ', login: 'Đăng nhập', register: 'Đăng ký' },
    dashboard: {
      title: 'Bảng điều khiển',
      balance: 'Số dư tài khoản',
      createProxy: 'Tạo Proxy Mới',
      proxyList: 'Danh sách Proxy',
      buyBtn: 'Mua Proxy Ngay',
      active: 'Hoạt động',
      expired: 'Hết hạn'
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
    tutorials: {
      title: 'Trung tâm',
      highlight: 'Hướng dẫn',
      sub: 'Tất cả tài liệu hướng dẫn sử dụng Proxy trên các nền tảng phổ biến nhất.',
      items: [
        {
          title: 'Cách dùng Proxy trên Chrome/Edge',
          steps: [
            'Bước 1: Cài đặt tiện ích mở rộng Proxy SwitchyOmega.',
            'Bước 2: Chọn mục "New Profile" và đặt tên.',
            'Bước 3: Nhập IP, Cổng (Port) và Tài khoản/Mật khẩu được cấp.',
            'Bước 4: Nhấn "Apply Changes" và chọn Profile để sử dụng.'
          ]
        },
        {
          title: 'Cài đặt Proxy cho điện thoại Android/iOS',
          steps: [
            'Bước 1: Vào mục Cài đặt Wi-Fi đang kết nối.',
            'Bước 2: Chọn "Định cấu hình Proxy" -> "Thủ công".',
            'Bước 3: Nhập Máy chủ, Cổng và bật Xác thực (nếu có).',
            'Bước 4: Lưu cài đặt và truy cập web để kiểm tra IP.'
          ]
        }
      ]
    },
    contact: {
      title: 'Liên hệ',
      highlight: 'Hỗ trợ',
      sub: 'Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn 24/7.',
      zalo: '0813.14.9999 (Bao Sâm)',
      telegram: '@ProxyNuoiNick_Support',
      email: 'support@proxynuoinick.com',
      address: 'Tòa nhà Landmark 81, Quận Bình Thạnh, TP. Hồ Chí Minh',
      workingHours: 'Thời gian làm việc: 08:00 - 22:00 (Thứ 2 - Chủ Nhật)'
    },
    terms: {
      title: 'Điều khoản',
      highlight: 'Sử dụng',
      sub: 'Vui lòng đọc kỹ các quy định dưới đây trước khi bắt đầu sử dụng dịch vụ của chúng tôi.',
      sections: [
        { title: '1. Quy định về hoàn tiền', content: 'Hỗ trợ hoàn tiền trong 24h.' },
        { title: '2. Các hành vi bị nghiêm cấm', content: 'Nghiêm cấm tấn công mạng, lừa đảo.' }
      ]
    },
    faq: {
      title: 'Câu Hỏi Thường Gặp',
      sub: 'Mọi thắc mắc của bạn về dịch vụ sẽ được giải đáp tại đây',
      items: [
        { question: "Proxy là gì?", answer: "Máy chủ trung gian che giấu IP." }
      ]
    },
    footer: {
      desc: 'Giải pháp hạ tầng Proxy IPv6 chuyên nghiệp.',
      services: 'Dịch vụ',
      serviceList: ['Proxy IPv4', 'Proxy IPv6'],
      support: 'Hỗ trợ',
      supportList: [
        { label: 'FAQ', tab: 'support' },
        { label: 'Hướng dẫn', tab: 'tutorials' }
      ],
      newsletter: 'Bản tin',
      newsletterSub: 'Nhận cập nhật mã giảm giá.',
      newsletterPlaceholder: 'Email',
      newsletterBtn: 'Gửi',
      rights: 'Tất cả quyền được bảo lưu.'
    },
    auth: {
      loginTitle: 'Chào mừng trở lại',
      loginSub: 'Đăng nhập để quản lý Proxy',
      regTitle: 'Tạo tài khoản',
      regSub: 'Bắt đầu ngay',
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
      title: 'Dashboard',
      balance: 'Balance',
      createProxy: 'Create New Proxy',
      proxyList: 'Proxy List',
      buyBtn: 'Purchase Now',
      active: 'Active',
      expired: 'Expired'
    },
    hero: { label: 'Online IPv6 Proxy', title1: 'Residential IPv6', title2: 'Fast & Easy', sub: 'Manage proxies easily', promo: 'PROMO:', promoDesc: '10k VND gift', priceLabel: '500đ', unit: '/ Proxy', btnStart: 'Create Now', btnPrice: 'Pricing', feat1: '100Mbps+', feat2: 'SSL Secure', feat3: '99.9% Uptime' },
    ctaHome: { title1: 'Ready?', title2: 'Create Online', sub: 'Contact us', btnStart: 'Start', btnContact: '0813149999', feat1: '24/7', feat2: 'Safe', feat3: 'Refund' },
    features: { title: 'Why Us?', sub: 'Best solution', items: [{ title: '1Gbps', desc: 'Fast' }, { title: '99.9%', desc: 'Stable' }, { title: 'Auto', desc: 'Setup' }, { title: '24/7', desc: 'Support' }] },
    pricing: { title: 'Pricing', highlight: 'Offers', sub: 'Save more', bestValue: 'Best Value', btnSelect: 'Select', plans: { '1-month': { name: '1 Month', sub: 'Flexible' }, '3-months': { name: '3 Months', sub: 'Mid-term saving' }, '6-months': { name: '6 Months', sub: 'Smart long-term choice' }, '12-months': { name: '12 Months', sub: 'Max business saving' } } },
    affiliate: { title: 'Affiliate', highlight: 'Program', sub: 'Join us', commissionLabel: 'Up to', commissionValue: '40%', pillars: [{ title: '40%', desc: 'Profit' }, { title: 'Unlimited', desc: 'Scale' }, { title: 'Fast Pay', desc: 'Payouts' }], supportTitle: 'Policies', policies: ['Docs', 'Dashboard', 'Training', '24/7 Support', 'Special Price', 'Free Trial'], ctaTitle: 'Join Now', ctaSub: 'Passive income', ctaBtn: 'Contact Zalo', contactInfo: 'Hotline: 0813149999' },
    tutorials: { title: 'Help', highlight: 'Center', sub: 'Guides', items: [{ title: 'Chrome', steps: ['Step 1: Install SwitchyOmega', 'Step 2: New Profile', 'Step 3: Enter Details', 'Step 4: Apply'] }, { title: 'Mobile', steps: ['Step 1: WiFi Settings', 'Step 2: Manual Proxy', 'Step 3: Enter IP', 'Step 4: Save'] }] },
    contact: { title: 'Contact', highlight: 'Support', sub: '24/7 help', zalo: '0813.14.9999', telegram: '@ProxyNuoiNick', email: 'support@proxynuoinick.com', address: 'Landmark 81', workingHours: '08:00 - 22:00' },
    terms: { title: 'Terms', highlight: 'Usage', sub: 'Read carefully', sections: [{ title: 'Refund', content: '24h support' }, { title: 'Prohibited', content: 'No illegal acts' }] },
    faq: { title: 'FAQ', sub: 'Answers', items: [{ question: 'What is Proxy?', answer: 'Gateway.' }] },
    footer: { desc: 'IPv6 Solutions.', services: 'Services', serviceList: ['IPv4', 'IPv6'], support: 'Support', supportList: [{ label: 'FAQ', tab: 'support' }, { label: 'Guides', tab: 'tutorials' }], newsletter: 'Newsletter', newsletterSub: 'Get updates', newsletterPlaceholder: 'Email', newsletterBtn: 'Send', rights: 'Reserved.' },
    auth: { loginTitle: 'Welcome Back', loginSub: 'Manage proxies', regTitle: 'Sign Up', regSub: 'Join us', phone: 'Phone', pass: 'Pass', confirmPass: 'Confirm', fullName: 'Name', remember: 'Remember', forgot: 'Forgot?', btnLogin: 'Login', btnReg: 'Sign Up', or: 'Or', noAccount: 'No account?', hasAccount: 'Has account?', backHome: 'Home', terms: 'Agree' }
  },
  zh: {
    nav: { home: '首页', pricing: '价格', affiliate: '加盟', contact: '联系我们', support: '支持', login: '登录', register: '注册' },
    dashboard: { title: '控制面板', balance: '账户余额', createProxy: '创建新代理', proxyList: '代理列表', buyBtn: '立即购买', active: '活跃', expired: '已过期' },
    hero: { label: '在线创建 IPv6 代理', title1: '住宅 IPv6 代理', title2: '快速且简单', sub: '几分钟内即可在线创建和管理您自己的 IPv6 代理', promo: '促销：', promoDesc: '新注册赠送 10,000 越南盾', priceLabel: '仅 500đ', unit: '/ 1 代理', btnStart: '立即创建', btnPrice: '查看价格', feat1: '速度 100Mbps+', feat2: 'SSL/TLS 安全', feat3: '99.9% 正常运行' },
    ctaHome: { title1: '准备好', title2: '在线代理了吗？', sub: '联系我们', btnStart: '立即开始', btnContact: '0813149999', feat1: '24/7', feat2: '安全', feat3: '退款' },
    features: { title: '为什么选择我们？', sub: '最佳方案', items: [{ title: '1Gbps', desc: '快速' }, { title: '99.9%', desc: '稳定' }, { title: '自动', desc: '设置' }, { title: '24/7', desc: '支持' }] },
    pricing: { title: '价格', highlight: '优惠', sub: '越长越省', bestValue: '最佳价值', btnSelect: '选择', plans: { '1-month': { name: '1 个月', sub: '灵活' }, '3-months': { name: '3 个月', sub: '省钱' }, '6-months': { name: '6 个月', sub: '明智' }, '12-months': { name: '12 个月', sub: '企业' } } },
    affiliate: { title: '加盟', highlight: '项目', sub: '加入我们', commissionLabel: '佣金高达', commissionValue: '40%', pillars: [{ title: '40% 佣金', desc: '利润' }, { title: '无限制', desc: '规模' }, { title: '快速结算', desc: '结算' }], supportTitle: '政策', policies: ['资料', '面板', '培训', '24/7支持', '特惠', '试用'], ctaTitle: '立即加盟', ctaSub: '被动收入', ctaBtn: '联系 Zalo', contactInfo: '热线：0813149999' },
    tutorials: { title: '帮助', highlight: '中心', sub: '指南', items: [{ title: 'Chrome', steps: ['1: 安装', '2: 配置', '3: 输入', '4: 应用'] }] },
    contact: { title: '联系', highlight: '支持', sub: '24/7 帮助', zalo: '0813.14.9999', telegram: '@ProxyNuoiNick', email: 'support@proxynuoinick.com', address: 'Landmark 81', workingHours: '08:00 - 22:00' },
    terms: { title: '条款', highlight: '使用', sub: '阅读', sections: [{ title: '退款', content: '24h' }] },
    faq: { title: '常见问题', sub: '解答', items: [{ question: '代理是什么？', answer: '网关。' }] },
    footer: { desc: 'IPv6 方案', services: '服务', serviceList: ['IPv4', 'IPv6'], support: '支持', supportList: [{ label: '常见问题', tab: 'support' }], newsletter: '时事', newsletterSub: '更新', newsletterPlaceholder: '邮箱', newsletterBtn: '发送', rights: '保留所有。' },
    auth: { loginTitle: '欢迎回来', loginSub: '登录', regTitle: '注册', regSub: '开始', phone: '电话', pass: '密码', confirmPass: '确认', fullName: '姓名', remember: '记住', forgot: '忘记？', btnLogin: '登录', btnReg: '注册', or: '或', noAccount: '无账号？', hasAccount: '有账号？', backHome: '首页', terms: '同意' }
  },
  ru: {
    nav: { home: 'Главная', pricing: 'Цены', affiliate: 'Партнерам', contact: 'Контакты', support: 'Поддержка', login: 'Вход', register: 'Регистрация' },
    dashboard: { title: 'Панель', balance: 'Баланс', createProxy: 'Создать', proxyList: 'Список', buyBtn: 'Купить', active: 'Активен', expired: 'Истек' },
    hero: { label: 'IPv6 онлайн', title1: 'Резидентные IPv6', title2: 'Просто', sub: 'Создавайте прокси за минуты', promo: 'АКЦИЯ:', promoDesc: '10k VND', priceLabel: '500đ', unit: '/ Прокси', btnStart: 'Создать', btnPrice: 'Цены', feat1: '100Мбит+', feat2: 'SSL', feat3: '99.9%' },
    ctaHome: { title1: 'Готовы?', title2: 'Создать', sub: 'Свяжитесь', btnStart: 'Начать', btnContact: '0813149999', feat1: '24/7', feat2: 'Безопасно', feat3: 'Возврат' },
    features: { title: 'Почему мы?', sub: 'Решение', items: [{ title: '1Гбит', desc: 'Быстро' }, { title: '99.9%', desc: 'Стабильно' }, { title: 'Авто', desc: 'Настройка' }, { title: '24/7', desc: 'Помощь' }] },
    pricing: { title: 'Цены', highlight: 'Скидки', sub: 'Экономьте', bestValue: 'Выбор', btnSelect: 'Выбрать', plans: { '1-month': { name: '1 Месяц', sub: 'Гибко' }, '3-months': { name: '3 Месяца', sub: 'Экономно' }, '6-months': { name: '6 Месяцев', sub: 'Умно' }, '12-months': { name: '12 Месяцев', sub: 'Макс' } } },
    affiliate: { title: 'Партнерам', highlight: 'Программа', sub: 'К нам', commissionLabel: 'До', commissionValue: '40%', pillars: [{ title: '40%', desc: 'Прибыль' }, { title: 'Без лимитов', desc: 'Масштаб' }, { title: 'Выплаты', desc: 'Быстро' }], supportTitle: 'Поддержка', policies: ['Материалы', 'Панель', 'Обучение', '24/7', 'Цены', 'Демо'], ctaTitle: 'Регистрация', ctaSub: 'Доход', ctaBtn: 'Zalo', contactInfo: '0813149999' },
    tutorials: { title: 'Инфо', highlight: 'Центр', sub: 'Гайды', items: [{ title: 'Chrome', steps: ['1: Установка', '2: Профиль', '3: Данные', '4: Применить'] }] },
    contact: { title: 'Связь', highlight: 'Помощь', sub: '24/7', zalo: '0813.14.9999', telegram: '@ProxyNuoiNick', email: 'support@proxynuoinick.com', address: 'Landmark 81', workingHours: '08:00 - 22:00' },
    terms: { title: 'Условия', highlight: 'Правила', sub: 'Читайте', sections: [{ title: 'Возврат', content: '24ч' }] },
    faq: { title: 'FAQ', sub: 'Ответы', items: [{ question: 'Что это?', answer: 'Шлюз.' }] },
    footer: { desc: 'IPv6 решения', services: 'Услуги', serviceList: ['IPv4', 'IPv6'], support: 'Помощь', supportList: [{ label: 'FAQ', tab: 'support' }], newsletter: 'Инфо', newsletterSub: 'Скидки', newsletterPlaceholder: 'Email', newsletterBtn: 'Ок', rights: 'Права.' },
    auth: { loginTitle: 'Вход', loginSub: 'Прокси', regTitle: 'Регистрация', regSub: 'Начать', phone: 'Тел', pass: 'Пароль', confirmPass: 'Ок', fullName: 'Имя', remember: 'Запомнить', forgot: 'Забыли?', btnLogin: 'Войти', btnReg: 'Регистрация', or: 'Или', noAccount: 'Нет?', hasAccount: 'Есть?', backHome: 'Главная', terms: 'Ок' }
  }
};


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
      proxyList: 'Purchased Proxies',
      buyBtn: 'Pay & Activate',
      active: 'Active',
      expired: 'Expired',
      refresh: 'Refresh',
      copyAll: 'Copy All',
      status: 'Status',
      expiredAt: 'Expiry Date',
      quantity: 'Quantity'
    },
    hero: {
      label: 'Create IPv6 Proxy Online',
      title1: 'Residential IPv6 Proxy',
      title2: 'Fast & Easy',
      sub: 'Create and manage your own online IPv6 proxies with unlimited bandwidth, supporting HTTP/HTTPS/SOCKS5 in minutes.',
      promo: 'PROMO:',
      promoDesc: 'Get 10,000 VND on new registration',
      priceLabel: 'Only 500đ',
      unit: '/ 1 Proxy',
      btnStart: 'Create Proxy Now',
      btnPrice: 'View Pricing',
      feat1: '100Mbps+ Speed',
      feat2: 'SSL/TLS Security',
      feat3: '99.9% Uptime'
    },
    ctaHome: {
      title1: 'Ready to Create',
      title2: 'Proxies Online?',
      sub: 'Contact us for consultation and support',
      btnStart: 'Get Started',
      btnContact: 'Contact: 0813149999',
      feat1: '24/7 Support',
      feat2: 'Secure Payment',
      feat3: '7-Day Refund'
    },
    features: {
      title: 'Why Choose ProxyNuoiNick?',
      sub: 'We provide the most optimal proxy solutions for businesses and individuals doing MMO.',
      items: [
        { title: '1Gbps Speed', desc: 'Strong server infrastructure, ensuring unlimited bandwidth for all tasks.' },
        { title: '99.9% Stability', desc: 'Automatic system detects and fixes issues, maintaining continuous connection.' },
        { title: 'Auto Setup', desc: 'Buy and receive proxies instantly via API or smart management Dashboard.' },
        { title: '24/7 Support', desc: 'Technical team is available to support customers via Zalo/Telegram anytime.' }
      ]
    },
    pricing: {
      title: 'Pricing',
      highlight: 'Offers',
      sub: 'Longer term - More savings! Up to 50% discount',
      bestValue: 'Best Value',
      btnSelect: 'Select Plan',
      plans: {
        '1-month': { name: '1 Month', sub: 'Flexible short-term' },
        '3-months': { name: '3 Months', sub: 'More savings for mid-sized projects' },
        '6-months': { name: '6 Months', sub: 'Smart choice for long-term' },
        '12-months': { name: '12 Months', sub: 'Maximum savings for businesses' }
      }
    },
    affiliate: {
      title: 'Become an',
      highlight: 'Affiliate',
      sub: 'Join our affiliate system and receive attractive commissions',
      commissionLabel: 'Commission up to',
      commissionValue: '40% / Proxy',
      pillars: [
        { title: '40% Commission', desc: 'Get 40% profit for each proxy sold' },
        { title: 'Unlimited', desc: 'No limit on number of customers and proxies sold' },
        { title: 'Fast Payment', desc: 'Quick and transparent commission payments' }
      ],
      supportTitle: 'Affiliate Support Policy',
      policies: [
        "Professional marketing materials and sales guide",
        "Dedicated customer and order management dashboard",
        "Proxy knowledge and customer consulting skills training",
        "24/7 technical support for affiliates and their customers",
        "Special discounted pricing for high-level affiliates",
        "Free proxy packages for testing and customer demos"
      ],
      ctaTitle: 'Contact Us to Register as an Affiliate Now!',
      ctaSub: 'Start your business and create passive income from today',
      ctaBtn: 'Call Now: 0813149999 (Zalo)',
      contactInfo: 'Hotline: 0813149999 - Bao Sam (Zalo Support)'
    },
    faq: {
      title: 'FAQ',
      sub: 'Quick answers about IPv6 Proxy services',
      items: [
        { question: 'What is IPv6 Proxy?', answer: 'IPv6 Proxy is a next-generation internet protocol with a huge IP range and low cost.' },
        { question: 'How to start?', answer: 'Just register an account, top up your wallet, and choose a proxy plan.' },
        { question: 'Is SOCKS5 supported?', answer: 'Yes, the system fully supports HTTP/HTTPS and SOCKS5.' }
      ]
    },
    footer: {
      desc: 'Leading residential IPv6 Proxy solution. High speed, stable, and absolutely secure.',
      services: 'Services',
      serviceList: ['IPv6 Proxy VNPT', 'IPv6 Proxy FPT', 'IPv6 Proxy Viettel', 'Mobile Proxy'],
      support: 'Support',
      supportList: [
        { label: 'Tutorials', tab: 'tutorials' },
        { label: 'Contact', tab: 'contact' },
        { label: 'Terms', tab: 'terms' }
      ],
      newsletter: 'Newsletter',
      newsletterSub: 'Receive the latest promotion information from us.',
      newsletterPlaceholder: 'Your email',
      newsletterBtn: 'Subscribe',
      rights: 'All rights reserved.'
    },
    tutorials: {
      title: 'Tutorials',
      highlight: 'Guide',
      sub: 'Start using ProxyNuoiNick in just a few simple steps.',
      items: [
        { title: 'Buy Proxy', steps: ['Register account', 'Top up wallet', 'Choose package', 'Get Proxy info'] },
        { title: 'Usage', steps: ['Copy IP:Port:User:Pass', 'Paste into tool', 'Check IP status', 'Start working'] }
      ]
    },
    contact: {
      title: 'Contact',
      highlight: 'Support',
      sub: 'Our technical team is ready to support you 24/7.',
      zalo: '0813149999',
      telegram: '@baosamproxy',
      email: 'support@proxynuoinick.com',
      address: 'Ho Chi Minh City, Vietnam',
      workingHours: '24/7 support every day of the week'
    },
    terms: {
      title: 'Terms of',
      highlight: 'Service',
      sub: 'Please read our terms and conditions carefully.',
      sections: [
        { title: 'Usage Policy', content: 'It is strictly forbidden to use proxies for illegal activities.' },
        { title: 'Refund Policy', content: 'Refund within 24h if the service encounters an unfixable technical error.' }
      ]
    },
    auth: {
      loginTitle: 'Welcome back',
      loginSub: 'Login to manage Proxies',
      regTitle: 'Create Account',
      regSub: 'Get started today',
      phone: 'Phone Number',
      pass: 'Password',
      confirmPass: 'Confirm Password',
      fullName: 'Full Name',
      remember: 'Remember me',
      forgot: 'Forgot password?',
      btnLogin: 'Login',
      btnReg: 'Register',
      or: 'Or',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?',
      backHome: 'Back to Home',
      terms: 'Agree to terms'
    }
  },
  zh: {
    nav: { home: '首页', pricing: '价格', affiliate: '加盟', contact: '联系我们', support: '支持', login: '登录', register: '注册' },
    dashboard: { title: '代理管理', balance: '余额', createProxy: '购买代理', proxyList: '列表', buyBtn: '激活', active: '活跃', expired: '过期', refresh: '刷新', copyAll: '全部复制', status: '状态', expiredAt: '到期', quantity: '数量' },
    hero: { label: '在线创建', title1: '住宅 IPv6 代理', title2: '快速且简单', sub: '高性能代理解决方案。', promo: '促销:', promoDesc: '注册送 10,000 VND', priceLabel: '仅 500đ', unit: '/ 1 代理', btnStart: '现在开始', btnPrice: '价格', feat1: '100Mbps+', feat2: 'SSL 安全', feat3: '99.9% 运行时间' },
    ctaHome: { title1: '准备好', title2: '在线创建代理了吗？', sub: '联系我们获取支持', btnStart: '开始', btnContact: '联系方式', feat1: '24/7 支持', feat2: '安全支付', feat3: '7 天退款' },
    features: { title: '为什么选择我们？', sub: '顶级解决方案', items: [{ title: '快速', desc: '1Gbps 速度' }, { title: '稳定', desc: '99.9% 稳定' }, { title: '自动', desc: '即时交付' }, { title: '支持', desc: '24/7 客户服务' }] },
    pricing: { title: '价格方案', highlight: '特惠', sub: '节省更多', bestValue: '最佳价值', btnSelect: '选择', plans: { '1-month': { name: '1 个月', sub: '灵活' }, '3-months': { name: '3 个月', sub: '节省' }, '6-months': { name: '6 个月', sub: '智能' }, '12-months': { name: '12 个月', sub: '最大节省' } } },
    affiliate: { title: '成为', highlight: '代理商', sub: '加入我们的系统', commissionLabel: '佣金高达', commissionValue: '40%', pillars: [{ title: '佣金', desc: '高额回报' }, { title: '无限', desc: '无限制' }, { title: '快速', desc: '结算快' }], supportTitle: '支持政策', policies: ["专业培训", "管理后台", "24/7 技术支持"], ctaTitle: '现在加入', ctaSub: '开始赚钱', ctaBtn: '立即咨询', contactInfo: '联系人：Bao Sam' },
    faq: { title: '常见问题', sub: '快速解答', items: [{ question: '什么是 IPv6?', answer: '下一代互联网协议。' }] },
    footer: { desc: '顶级代理解决方案。', services: '服务', serviceList: ['IPv6 代理'], support: '支持', supportList: [{ label: '教程', tab: 'tutorials' }, { label: '联系', tab: 'contact' }, { label: '条款', tab: 'terms' }], newsletter: '订阅', newsletterSub: '获取最新优惠', newsletterPlaceholder: '您的邮箱', newsletterBtn: '订阅', rights: '版权所有。' },
    tutorials: { title: '教程', highlight: '指南', sub: '如何使用', items: [{ title: '购买', steps: ['注册', '充值'] }, { title: '使用', steps: ['复制信息', '粘贴到工具'] }] },
    contact: { title: '联系我们', highlight: '支持', sub: '24/7 为您服务', zalo: '0813149999', telegram: '@baosamproxy', email: 'support@proxynuoinick.com', address: '越南胡志明市', workingHours: '24/7 全年无休' },
    terms: { title: '服务', highlight: '条款', sub: '使用规则', sections: [{ title: '使用规则', content: '禁止违法活动。' }, { title: '退款政策', content: '24 小时内退款。' }] },
    auth: { loginTitle: '欢迎回来', loginSub: '登录管理', regTitle: '创建账号', regSub: '今天开始', phone: '手机号', pass: '密码', confirmPass: '确认密码', fullName: '姓名', remember: '记住我', forgot: '忘记密码？', btnLogin: '登录', btnReg: '注册', or: '或', noAccount: '没有账号？', hasAccount: '已有账号？', backHome: '返回首页', terms: '同意条款' }
  },
  ru: {
    nav: { home: 'Главная', pricing: 'Цены', affiliate: 'Партнерам', contact: 'Контакты', support: 'Поддержка', login: 'Вход', register: 'Регистрация' },
    dashboard: { title: 'Управление', balance: 'Баланс', createProxy: 'Купить', proxyList: 'Список', buyBtn: 'Оплатить', active: 'Активен', expired: 'Истек', refresh: 'Обновить', copyAll: 'Копировать все', status: 'Статус', expiredAt: 'До', quantity: 'Кол-во' },
    hero: { label: 'Создать онлайн', title1: 'Резидентные IPv6', title2: 'Быстро и Просто', sub: 'Высокопроизводительные прокси.', promo: 'АКЦИЯ:', promoDesc: '10,000 VND при регистрации', priceLabel: 'Всего 500đ', unit: '/ 1 прокси', btnStart: 'Начать', btnPrice: 'Цены', feat1: '100Mbps+', feat2: 'SSL Защита', feat3: '99.9% Uptime' },
    ctaHome: { title1: 'Готовы создать', title2: 'Прокси Онлайн?', sub: 'Свяжитесь с нами для поддержки', btnStart: 'Начать', btnContact: 'Контакты', feat1: '24/7 Поддержка', feat2: 'Безопасно', feat3: 'Возврат 7 дней' },
    features: { title: 'Почему мы?', sub: 'Лучшие решения', items: [{ title: 'Скорость', desc: '1Gbps' }, { title: 'Стабильность', desc: '99.9%' }, { title: 'Автоматика', desc: 'Мгновенно' }, { title: 'Поддержка', desc: '24/7' }] },
    pricing: { title: 'Цены', highlight: 'Скидки', sub: 'Экономьте больше', bestValue: 'Лучшая цена', btnSelect: 'Выбрать', plans: { '1-month': { name: '1 Месяц', sub: 'Гибко' }, '3-months': { name: '3 Месяца', sub: 'Выгодно' }, '6-months': { name: '6 Месяцев', sub: 'Умно' }, '12-months': { name: '12 Месяцев', sub: 'Максимум' } } },
    affiliate: { title: 'Стать', highlight: 'Партнером', sub: 'Присоединяйтесь', commissionLabel: 'Комиссия до', commissionValue: '40%', pillars: [{ title: 'Комиссия', desc: 'Высокая' }, { title: 'Без лимитов', desc: 'Любой объем' }, { title: 'Выплаты', desc: 'Быстро' }], supportTitle: 'Поддержка', policies: ["Материалы", "Личный кабинет", "24/7 Помощь"], ctaTitle: 'Регистрация', ctaSub: 'Начните зарабатывать', ctaBtn: 'Написать нам', contactInfo: 'Bao Sam (Zalo)' },
    faq: { title: 'FAQ', sub: 'Вопросы и ответы', items: [{ question: 'Что такое IPv6?', answer: 'Протокол нового поколения.' }] },
    footer: { desc: 'Лучшие прокси-решения.', services: 'Услуги', serviceList: ['IPv6 Прокси'], support: 'Поддержка', supportList: [{ label: 'Инструкции', tab: 'tutorials' }, { label: 'Контакты', tab: 'contact' }, { label: 'Условия', tab: 'terms' }], newsletter: 'Новости', newsletterSub: 'Подпишитесь на акции', newsletterPlaceholder: 'Email', newsletterBtn: 'Ок', rights: 'Все права защищены.' },
    tutorials: { title: 'Инструкции', highlight: 'Гайд', sub: 'Как пользоваться', items: [{ title: 'Покупка', steps: ['Регистрация', 'Баланс'] }, { title: 'Использование', steps: ['Копировать', 'Вставить'] }] },
    contact: { title: 'Контакты', highlight: 'Помощь', sub: 'Мы онлайн 24/7', zalo: '0813149999', telegram: '@baosamproxy', email: 'support@proxynuoinick.com', address: 'Хошимин, Вьетнам', workingHours: '24/7 без выходных' },
    terms: { title: 'Условия', highlight: 'Сервиса', sub: 'Правила использования', sections: [{ title: 'Использование', content: 'Запрещено для незаконных действий.' }, { title: 'Возврат', content: 'В течение 24 часов.' }] },
    auth: { loginTitle: 'С возвращением', loginSub: 'Войдите для управления', regTitle: 'Регистрация', regSub: 'Начните сегодня', phone: 'Телефон', pass: 'Пароль', confirmPass: 'Повтор', fullName: 'Имя', remember: 'Запомнить', forgot: 'Забыли?', btnLogin: 'Вход', btnReg: 'Регистрация', or: 'Или', noAccount: 'Нет аккаунта?', hasAccount: 'Есть аккаунт?', backHome: 'На главную', terms: 'Согласен с условиями' }
  }
};

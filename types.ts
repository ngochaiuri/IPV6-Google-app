
export type Language = 'vi' | 'en' | 'zh' | 'ru';

export interface ProxyPlan {
  id: string;
  name: string;
  price: number;
  unit: string;
  features: string[];
  recommended?: boolean;
  type: 'IPv4' | 'IPv6' | 'Residential' | 'SOCKS5';
}

export interface ProxyInstance {
  id: string;
  ip: string;
  port: number;
  username: string;
  password?: string;
  protocol: 'HTTP' | 'SOCKS5';
  location: string;
  createdAt: string;
  expiredAt: string;
  status: 'active' | 'expired';
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export type AppTab = 'home' | 'pricing' | 'support' | 'login' | 'register' | 'tutorials' | 'contact' | 'terms' | 'affiliate' | 'dashboard' | 'gmail-verify';

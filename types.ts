
export interface ProxyPlan {
  id: string;
  name: string;
  price: number;
  unit: string;
  features: string[];
  recommended?: boolean;
  type: 'IPv4' | 'IPv6' | 'Residential' | 'SOCKS5';
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface Course {
  id: string;
  title: string;
  category: 'Fundamentals' | 'HR' | 'Marketing' | 'Finance' | 'Management';
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  modules: number;
}

export interface ToolResult {
  id: string;
  type: string;
  content: string;
  date: Date;
}

export enum ToolType {
  BUSINESS_PLAN = 'Business Plan Generator',
  SWOT_ANALYSIS = 'SWOT Analysis',
  MARKETING_STRATEGY = 'Marketing Strategy Builder',
  MARKET_RESEARCH = 'Market Research Generator',
  EMAIL_DRAFTER = 'Professional Email Drafter'
}
export enum ViewState {
  HOME = 'HOME',
  DEMO = 'DEMO',
  ASSISTANT = 'ASSISTANT'
}

export interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface SimulationResult {
  iou: number;
  dice: number;
  f1: number;
  processingTime: number;
}
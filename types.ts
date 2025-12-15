import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export interface WheelOption {
  id: number;
  label: string;
  color: string;
  textColor: string;
}

export enum GameState {
  IDLE = 'IDLE',
  SPINNING = 'SPINNING',
  RESULT = 'RESULT',
}
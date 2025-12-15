import { WheelOption } from './types';

export const WHEEL_OPTIONS: WheelOption[] = [
  { id: 1, label: 'หมดแก้ว', color: '#ef4444', textColor: '#ffffff' }, // Red
  { id: 2, label: 'ครึ่งแก้ว', color: '#f97316', textColor: '#ffffff' }, // Orange
  { id: 3, label: '3 อึก', color: '#eab308', textColor: '#000000' }, // Yellow
  { id: 4, label: '5 อึก', color: '#84cc16', textColor: '#000000' }, // Lime
  { id: 5, label: 'เลือกคนดื่ม', color: '#06b6d4', textColor: '#ffffff' }, // Cyan
  { id: 6, label: 'ทุกคนดื่ม', color: '#3b82f6', textColor: '#ffffff' }, // Blue
  { id: 7, label: 'พักผ่อน', color: '#a855f7', textColor: '#ffffff' }, // Purple
  { id: 8, label: 'Truth or Dare', color: '#ec4899', textColor: '#ffffff' }, // Pink
];

export const APP_NAME = "เกมวงเหล้า";
export const TAGLINE = "สนุกได้ทุกวง ไม่ต้องโหลด";
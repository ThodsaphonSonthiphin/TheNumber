export interface ThaiColor {
  id: number;
  nameTh: string;
  nameEn: string;
  hex: string;
  emoji: string;
}

export const colorsData: ThaiColor[] = [
  { id: 1,  nameTh: 'เหลือง',   nameEn: 'Yellow', hex: '#FECA57', emoji: '🖍️' },
  { id: 2,  nameTh: 'แดง',      nameEn: 'Red',    hex: '#FF6B6B', emoji: '🖍️' },
  { id: 3,  nameTh: 'ม่วง',     nameEn: 'Purple', hex: '#A29BFE', emoji: '🖍️' },
  { id: 4,  nameTh: 'ส้ม',      nameEn: 'Orange', hex: '#FF9F43', emoji: '🖍️' },
  { id: 5,  nameTh: 'น้ำเงิน',   nameEn: 'Blue',   hex: '#0ABDE3', emoji: '🖍️' },
  { id: 6,  nameTh: 'ชมพู',     nameEn: 'Pink',   hex: '#FD79A8', emoji: '🖍️' },
  { id: 7,  nameTh: 'เขียว',    nameEn: 'Green',  hex: '#10AC84', emoji: '🖍️' },
  { id: 8,  nameTh: 'น้ำตาล',   nameEn: 'Brown',  hex: '#8B6914', emoji: '🖍️' },
  { id: 9,  nameTh: 'ดำ',       nameEn: 'Black',  hex: '#2d3436', emoji: '🖍️' },
  { id: 10, nameTh: 'ขาว',      nameEn: 'White',  hex: '#dfe6e9', emoji: '🖍️' },
];

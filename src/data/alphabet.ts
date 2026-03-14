export interface ThaiConsonant {
  id: number;
  letter: string;
  word: string;
  emoji: string;
  sound: string;
  color: string;
}

const colors = [
  '#FF6B6B', '#FF9F43', '#FECA57', '#48DBFB', '#0ABDE3',
  '#10AC84', '#EE5A24', '#A29BFE', '#FD79A8', '#6C5CE7',
];

export const alphabetData: ThaiConsonant[] = [
  { id: 1,  letter: 'ก', word: 'ไก่',     emoji: '🐔', sound: 'กุ๊กกุ๊กกุ๊ก',   color: colors[0] },
  { id: 2,  letter: 'ข', word: 'ไข่',     emoji: '🥚', sound: '',              color: colors[1] },
  { id: 3,  letter: 'ฃ', word: 'ขวด',    emoji: '🍶', sound: '',              color: colors[2] },
  { id: 4,  letter: 'ค', word: 'ควาย',   emoji: '🐃', sound: 'มอมอ',         color: colors[3] },
  { id: 5,  letter: 'ฅ', word: 'คน',     emoji: '🧑', sound: '',              color: colors[4] },
  { id: 6,  letter: 'ฆ', word: 'ระฆัง',   emoji: '🔔', sound: '',              color: colors[5] },
  { id: 7,  letter: 'ง', word: 'งู',      emoji: '🐍', sound: 'ซ่าซ่า',        color: colors[6] },
  { id: 8,  letter: 'จ', word: 'จาน',    emoji: '🍽️', sound: '',              color: colors[7] },
  { id: 9,  letter: 'ฉ', word: 'ฉิ่ง',    emoji: '🎶', sound: '',              color: colors[8] },
  { id: 10, letter: 'ช', word: 'ช้าง',   emoji: '🐘', sound: 'แปร๊น แปร๊น',  color: colors[9] },
  { id: 11, letter: 'ซ', word: 'โซ่',    emoji: '⛓️', sound: '',              color: colors[0] },
  { id: 12, letter: 'ฌ', word: 'เฌอ',   emoji: '🌳', sound: '',              color: colors[1] },
  { id: 13, letter: 'ญ', word: 'หญิง',   emoji: '👩', sound: '',              color: colors[2] },
  { id: 14, letter: 'ฎ', word: 'ชฎา',   emoji: '👑', sound: '',              color: colors[3] },
  { id: 15, letter: 'ฏ', word: 'ปฏัก',   emoji: '🏹', sound: '',              color: colors[4] },
  { id: 16, letter: 'ฐ', word: 'ฐาน',   emoji: '🏛️', sound: '',              color: colors[5] },
  { id: 17, letter: 'ฑ', word: 'มณโฑ',  emoji: '👸', sound: '',              color: colors[6] },
  { id: 18, letter: 'ฒ', word: 'ผู้เฒ่า',  emoji: '👴', sound: '',              color: colors[7] },
  { id: 19, letter: 'ณ', word: 'เณร',   emoji: '🧒', sound: '',              color: colors[8] },
  { id: 20, letter: 'ด', word: 'เด็ก',   emoji: '👦', sound: '',              color: colors[9] },
  { id: 21, letter: 'ต', word: 'เต่า',   emoji: '🐢', sound: '',              color: colors[0] },
  { id: 22, letter: 'ถ', word: 'ถุง',    emoji: '👜', sound: '',              color: colors[1] },
  { id: 23, letter: 'ท', word: 'ทหาร',  emoji: '💂', sound: '',              color: colors[2] },
  { id: 24, letter: 'ธ', word: 'ธง',     emoji: '🚩', sound: '',              color: colors[3] },
  { id: 25, letter: 'น', word: 'หนู',    emoji: '🐭', sound: 'จี๊ดจี๊ด',       color: colors[4] },
  { id: 26, letter: 'บ', word: 'ใบไม้',  emoji: '🍃', sound: '',              color: colors[5] },
  { id: 27, letter: 'ป', word: 'ปลา',   emoji: '🐟', sound: '',              color: colors[6] },
  { id: 28, letter: 'ผ', word: 'ผึ้ง',    emoji: '🐝', sound: 'หึ่งหึ่ง',       color: colors[7] },
  { id: 29, letter: 'ฝ', word: 'ฝา',    emoji: '🪟', sound: '',              color: colors[8] },
  { id: 30, letter: 'พ', word: 'พาน',   emoji: '🍵', sound: '',              color: colors[9] },
  { id: 31, letter: 'ฟ', word: 'ฟัน',    emoji: '🦷', sound: '',              color: colors[0] },
  { id: 32, letter: 'ภ', word: 'สำเภา',  emoji: '⛵', sound: '',              color: colors[1] },
  { id: 33, letter: 'ม', word: 'ม้า',    emoji: '🐴', sound: 'ฮี้ฮี้',         color: colors[2] },
  { id: 34, letter: 'ย', word: 'ยักษ์',   emoji: '👹', sound: '',              color: colors[3] },
  { id: 35, letter: 'ร', word: 'เรือ',   emoji: '🚤', sound: '',              color: colors[4] },
  { id: 36, letter: 'ล', word: 'ลิง',    emoji: '🐵', sound: 'เจี๊ยกเจี๊ยก',   color: colors[5] },
  { id: 37, letter: 'ว', word: 'แหวน',  emoji: '💍', sound: '',              color: colors[6] },
  { id: 38, letter: 'ศ', word: 'ศาลา',  emoji: '🏠', sound: '',              color: colors[7] },
  { id: 39, letter: 'ษ', word: 'ฤๅษี',   emoji: '🧙', sound: '',              color: colors[8] },
  { id: 40, letter: 'ส', word: 'เสือ',   emoji: '🐯', sound: 'โฮกกก',        color: colors[9] },
  { id: 41, letter: 'ห', word: 'หีบ',    emoji: '📦', sound: '',              color: colors[0] },
  { id: 42, letter: 'ฬ', word: 'จุฬา',   emoji: '🪁', sound: '',              color: colors[1] },
  { id: 43, letter: 'อ', word: 'อ่าง',   emoji: '🛁', sound: '',              color: colors[2] },
  { id: 44, letter: 'ฮ', word: 'นกฮูก',  emoji: '🦉', sound: 'ฮูกฮูก',        color: colors[3] },
];

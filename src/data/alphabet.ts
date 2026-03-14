export interface ThaiConsonant {
  id: number;
  letter: string;
  word: string;
  emoji: string;
  sound: string;
  color: string;
  image: string;
}

const colors = [
  '#FF6B6B', '#FF9F43', '#FECA57', '#48DBFB', '#0ABDE3',
  '#10AC84', '#EE5A24', '#A29BFE', '#FD79A8', '#6C5CE7',
];

const img = (keyword: string, lock: number) =>
  `https://loremflickr.com/400/300/${keyword}?lock=${lock}`;

export const alphabetData: ThaiConsonant[] = [
  { id: 1,  letter: 'ก', word: 'ไก่',     emoji: '🐔', sound: 'กุ๊กกุ๊กกุ๊ก',   color: colors[0], image: img('rooster', 1) },
  { id: 2,  letter: 'ข', word: 'ไข่',     emoji: '🥚', sound: '',              color: colors[1], image: img('egg', 2) },
  { id: 3,  letter: 'ฃ', word: 'ขวด',    emoji: '🍶', sound: '',              color: colors[2], image: img('bottle', 3) },
  { id: 4,  letter: 'ค', word: 'ควาย',   emoji: '🐃', sound: 'มอมอ',         color: colors[3], image: img('water+buffalo', 4) },
  { id: 5,  letter: 'ฅ', word: 'คน',     emoji: '🧑', sound: '',              color: colors[4], image: img('person', 5) },
  { id: 6,  letter: 'ฆ', word: 'ระฆัง',   emoji: '🔔', sound: '',              color: colors[5], image: img('bell', 6) },
  { id: 7,  letter: 'ง', word: 'งู',      emoji: '🐍', sound: 'ซ่าซ่า',        color: colors[6], image: img('snake', 7) },
  { id: 8,  letter: 'จ', word: 'จาน',    emoji: '🍽️', sound: '',              color: colors[7], image: img('plate', 8) },
  { id: 9,  letter: 'ฉ', word: 'ฉิ่ง',    emoji: '🎶', sound: '',              color: colors[8], image: img('cymbal', 9) },
  { id: 10, letter: 'ช', word: 'ช้าง',   emoji: '🐘', sound: 'แปร๊น แปร๊น',  color: colors[9], image: img('elephant', 10) },
  { id: 11, letter: 'ซ', word: 'โซ่',    emoji: '⛓️', sound: '',              color: colors[0], image: img('chain', 11) },
  { id: 12, letter: 'ฌ', word: 'เฌอ',   emoji: '🌳', sound: '',              color: colors[1], image: img('tree', 12) },
  { id: 13, letter: 'ญ', word: 'หญิง',   emoji: '👩', sound: '',              color: colors[2], image: img('woman', 13) },
  { id: 14, letter: 'ฎ', word: 'ชฎา',   emoji: '👑', sound: '',              color: colors[3], image: img('thai+crown', 14) },
  { id: 15, letter: 'ฏ', word: 'ปฏัก',   emoji: '🏹', sound: '',              color: colors[4], image: img('spear', 15) },
  { id: 16, letter: 'ฐ', word: 'ฐาน',   emoji: '🏛️', sound: '',              color: colors[5], image: img('pedestal', 16) },
  { id: 17, letter: 'ฑ', word: 'มณโฑ',  emoji: '👸', sound: '',              color: colors[6], image: img('thai+princess', 17) },
  { id: 18, letter: 'ฒ', word: 'ผู้เฒ่า',  emoji: '👴', sound: '',              color: colors[7], image: img('elderly+man', 18) },
  { id: 19, letter: 'ณ', word: 'เณร',   emoji: '🧒', sound: '',              color: colors[8], image: img('buddhist+monk', 19) },
  { id: 20, letter: 'ด', word: 'เด็ก',   emoji: '👦', sound: '',              color: colors[9], image: img('child', 20) },
  { id: 21, letter: 'ต', word: 'เต่า',   emoji: '🐢', sound: '',              color: colors[0], image: img('turtle', 21) },
  { id: 22, letter: 'ถ', word: 'ถุง',    emoji: '👜', sound: '',              color: colors[1], image: img('bag', 22) },
  { id: 23, letter: 'ท', word: 'ทหาร',  emoji: '💂', sound: '',              color: colors[2], image: img('soldier', 23) },
  { id: 24, letter: 'ธ', word: 'ธง',     emoji: '🚩', sound: '',              color: colors[3], image: img('flag', 24) },
  { id: 25, letter: 'น', word: 'หนู',    emoji: '🐭', sound: 'จี๊ดจี๊ด',       color: colors[4], image: img('mouse', 25) },
  { id: 26, letter: 'บ', word: 'ใบไม้',  emoji: '🍃', sound: '',              color: colors[5], image: img('leaf', 26) },
  { id: 27, letter: 'ป', word: 'ปลา',   emoji: '🐟', sound: '',              color: colors[6], image: img('fish', 27) },
  { id: 28, letter: 'ผ', word: 'ผึ้ง',    emoji: '🐝', sound: 'หึ่งหึ่ง',       color: colors[7], image: img('bee', 28) },
  { id: 29, letter: 'ฝ', word: 'ฝา',    emoji: '🪟', sound: '',              color: colors[8], image: img('door', 29) },
  { id: 30, letter: 'พ', word: 'พาน',   emoji: '🍵', sound: '',              color: colors[9], image: img('thai+tray', 30) },
  { id: 31, letter: 'ฟ', word: 'ฟัน',    emoji: '🦷', sound: '',              color: colors[0], image: img('teeth', 31) },
  { id: 32, letter: 'ภ', word: 'สำเภา',  emoji: '⛵', sound: '',              color: colors[1], image: img('sailing+ship', 32) },
  { id: 33, letter: 'ม', word: 'ม้า',    emoji: '🐴', sound: 'ฮี้ฮี้',         color: colors[2], image: img('horse', 33) },
  { id: 34, letter: 'ย', word: 'ยักษ์',   emoji: '👹', sound: '',              color: colors[3], image: img('giant+statue', 34) },
  { id: 35, letter: 'ร', word: 'เรือ',   emoji: '🚤', sound: '',              color: colors[4], image: img('boat', 35) },
  { id: 36, letter: 'ล', word: 'ลิง',    emoji: '🐵', sound: 'เจี๊ยกเจี๊ยก',   color: colors[5], image: img('monkey', 36) },
  { id: 37, letter: 'ว', word: 'แหวน',  emoji: '💍', sound: '',              color: colors[6], image: img('ring+jewelry', 37) },
  { id: 38, letter: 'ศ', word: 'ศาลา',  emoji: '🏠', sound: '',              color: colors[7], image: img('pavilion', 38) },
  { id: 39, letter: 'ษ', word: 'ฤๅษี',   emoji: '🧙', sound: '',              color: colors[8], image: img('hermit', 39) },
  { id: 40, letter: 'ส', word: 'เสือ',   emoji: '🐯', sound: 'โฮกกก',        color: colors[9], image: img('tiger', 40) },
  { id: 41, letter: 'ห', word: 'หีบ',    emoji: '📦', sound: '',              color: colors[0], image: img('treasure+chest', 41) },
  { id: 42, letter: 'ฬ', word: 'จุฬา',   emoji: '🪁', sound: '',              color: colors[1], image: img('kite+flying', 42) },
  { id: 43, letter: 'อ', word: 'อ่าง',   emoji: '🛁', sound: '',              color: colors[2], image: img('bathtub', 43) },
  { id: 44, letter: 'ฮ', word: 'นกฮูก',  emoji: '🦉', sound: 'ฮูกฮูก',        color: colors[3], image: img('owl', 44) },
];

export interface NumberData {
  id: number;
  digit: number;
  thai: string;
  english: string;
  emoji: string;
  color: string;
}

export const numbersData: NumberData[] = [
  { id: 1, digit: 1, thai: 'หนึ่ง', english: 'One', emoji: '⭐', color: '#FF6B6B' },
  { id: 2, digit: 2, thai: 'สอง', english: 'Two', emoji: '🌈', color: '#FF9F43' },
  { id: 3, digit: 3, thai: 'สาม', english: 'Three', emoji: '🌻', color: '#FECA57' },
  { id: 4, digit: 4, thai: 'สี่', english: 'Four', emoji: '🍀', color: '#48DBFB' },
  { id: 5, digit: 5, thai: 'ห้า', english: 'Five', emoji: '🦋', color: '#0ABDE3' },
  { id: 6, digit: 6, thai: 'หก', english: 'Six', emoji: '🐠', color: '#5F27CD' },
  { id: 7, digit: 7, thai: 'เจ็ด', english: 'Seven', emoji: '🍭', color: '#2bcbba' },
  { id: 8, digit: 8, thai: 'แปด', english: 'Eight', emoji: '🐙', color: '#1DD1A1' },
  { id: 9, digit: 9, thai: 'เก้า', english: 'Nine', emoji: '🎈', color: '#F368E0' },
  { id: 10, digit: 10, thai: 'สิบ', english: 'Ten', emoji: '🎪', color: '#EE5A24' },
];

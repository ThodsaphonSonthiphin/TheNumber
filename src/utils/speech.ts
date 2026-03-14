export const speakText = (text: string, lang: string, rate = 0.8): Promise<void> => {
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = 1.1;
    utterance.volume = 1;
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    speechSynthesis.speak(utterance);
  });
};

export const thaiCountingWords = [
  'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า',
  'หก', 'เจ็ด', 'แปด', 'เก้า', 'สิบ',
];

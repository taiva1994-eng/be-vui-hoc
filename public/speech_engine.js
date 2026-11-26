// speech_engine.js - Tự Động Nhận Diện Ngôn Ngữ & Phát Âm Chuẩn Cho Bé Vui Học
// Hỗ trợ tiếng Việt (vi-VN), tiếng Anh (en-US), tiếng Nhật (ja-JP), tiếng Hàn (ko-KR), tiếng Trung (zh-CN), tiếng Pháp (fr-FR)...

(function(global) {
  'use strict';

  // Ký tự dấu thanh tiếng Việt
  const VI_DIACRITICS = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

  // Từ vựng tiếng Việt không dấu phổ biến trong bài học mầm non
  const VI_NON_ACCENT_WORDS = new Set([
    'con','ca','me','ba','chu','tim','ban','co','gi','xe','mau','cam','sua','hoa','qua',
    'tay','chan','mat','mui','tai','nha','cay','la','nuoc','an','uong','di','ngoi','ngu',
    'hoc','choi','vui','be','em','anh','chi','ong','ba','vao','ra','len','xuong','tren','duoi',
    'trong','ngoai','mot','hai','ba','bon','nam','sau','bay','tam','chin','muoi','chao',
    'xin','day','la','cua','nay','kia','nao','sao','dung','sai','roi','chua','tot','gioi',
    'dep','yeu','thuong','khen','hay','xem','nhe','biet','khong','co','rat','qua','thay',
    'chon','hinh','buc','tranh','trai','giong','nhau','chuc','mung','hoan','ho','trai','bong',
    'troi','dat','trang','sao','chim','thu','rung','bien','song','nui','dong','dem','ngay'
  ]);

  // Bộ nhớ đệm danh sách giọng nói
  let cachedVoices = [];

  function refreshVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      cachedVoices = window.speechSynthesis.getVoices() || [];
    }
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    refreshVoices();
    window.speechSynthesis.onvoiceschanged = refreshVoices;
  }

  /**
   * Tự động nhận diện ngôn ngữ của một đoạn văn bản
   * @param {string} text 
   * @returns {string} Mã ngôn ngữ BCP-47 (vi-VN, en-US, ja-JP, ko-KR, zh-CN, fr-FR...)
   */
  function detectLanguage(text) {
    if (!text || typeof text !== 'string') return 'vi-VN';
    const clean = text.trim();
    if (!clean) return 'vi-VN';

    // 1. Tiếng Nhật (Hiragana, Katakana)
    if (/[\u3040-\u309F\u30A0-\u30FF]/.test(clean)) return 'ja-JP';

    // 2. Tiếng Hàn (Hangul)
    if (/[\uAC00-\uD7AF\u1100-\u11FF]/.test(clean)) return 'ko-KR';

    // 3. Tiếng Trung (Hán tự)
    if (/[\u4E00-\u9FFF]/.test(clean)) return 'zh-CN';

    // 4. Tiếng Nga / Cyrillic
    if (/[\u0400-\u04FF]/.test(clean)) return 'ru-RU';

    // 5. Tiếng Việt có dấu -> 100% tiếng Việt
    if (VI_DIACRITICS.test(clean)) return 'vi-VN';

    // 6. Kiểm tra các từ tiếng Việt không dấu
    const words = clean.toLowerCase().match(/[a-z]+/g) || [];
    if (words.length > 0) {
      let viScore = 0;
      for (const w of words) {
        if (VI_NON_ACCENT_WORDS.has(w)) viScore++;
      }
      if (viScore > 0 && viScore / words.length >= 0.4) {
        return 'vi-VN';
      }
    }

    // 7. Tiếng Pháp
    if (/[éèêëàâçîïôùûüœ]/.test(clean)) return 'fr-FR';

    // 8. Tiếng Tây Ban Nha
    if (/[ñ¿¡áéíóú]/.test(clean)) return 'es-ES';

    // 9. Mặc định cho chữ Latin chuẩn (không dấu tiếng Việt) là tiếng Anh (en-US)
    return 'en-US';
  }

  /**
   * Phân tích câu nói có thể chứa nhiều ngôn ngữ (song ngữ)
   * Ví dụ:
   *  "Apple - Quả Táo" -> ["Apple" (en-US), "Quả Táo" (vi-VN)]
   *  "Bé hãy tìm \"Cat\" nào!" -> ["Bé hãy tìm" (vi-VN), "Cat" (en-US), "nào!" (vi-VN)]
   *  "Dog: Chú Chó" -> ["Dog" (en-US), "Chú Chó" (vi-VN)]
   * @param {string} text 
   * @returns {Array<{text: string, lang: string}>}
   */
  function parseSpeechSegments(text) {
    if (!text || typeof text !== 'string') return [];
    
    // Bỏ emoji để tránh đọc mã biểu tượng
    let clean = text.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();
    if (!clean) return [];

    // Tách các đoạn nằm trong ngoặc kép "...", ngoặc đơn (...), ngoặc vuông [...], gạch ngang -, gạch chéo /, hai chấm :
    const parts = [];
    const regex = /["“]([^"”]+)["”]|[\(]([^\)]+)[\)]|[\[]([^\]]+)[\]]|([^\(\)\[\]"“”\n\r—–\-\/:]+)/g;
    let match;
    while ((match = regex.exec(clean)) !== null) {
      const raw = match[1] || match[2] || match[3] || match[4];
      if (raw && raw.trim()) {
        parts.push(raw.trim());
      }
    }

    if (parts.length <= 1) {
      return [{ text: clean, lang: detectLanguage(clean) }];
    }

    const rawSegments = parts.map(p => ({ text: p, lang: detectLanguage(p) }));

    // Gộp các đoạn liền kề có cùng ngôn ngữ để đọc liền mạch tự nhiên
    const merged = [];
    for (const seg of rawSegments) {
      if (merged.length > 0 && merged[merged.length - 1].lang === seg.lang) {
        merged[merged.length - 1].text += ' ' + seg.text;
      } else {
        merged.push({ ...seg });
      }
    }
    return merged;
  }

  /**
   * Tìm giọng đọc tốt nhất trong hệ điều hành / trình duyệt cho mã ngôn ngữ
   * @param {string} targetLang 
   * @returns {SpeechSynthesisVoice|null}
   */
  function findBestVoice(targetLang) {
    if (!cachedVoices || cachedVoices.length === 0) refreshVoices();
    if (!cachedVoices || cachedVoices.length === 0) return null;

    const prefix = targetLang.split('-')[0].toLowerCase();
    const full = targetLang.toLowerCase();

    function scoreVoice(v) {
      let score = 0;
      const vName = (v.name || '').toLowerCase();
      const vLang = (v.lang || '').replace('_', '-').toLowerCase();

      if (vLang === full) score += 60;
      else if (vLang.startsWith(prefix)) score += 35;
      else return -1; // Không khớp ngôn ngữ

      // Ưu tiên giọng tự nhiên, AI neural, Google, Apple Siri, Microsoft Natural
      if (vName.includes('natural') || vName.includes('neural')) score += 30;
      if (vName.includes('google')) score += 20;
      if (vName.includes('premium') || vName.includes('enhanced')) score += 15;
      if (vName.includes('siri') || vName.includes('linh') || vName.includes('hoaimy') || vName.includes('namminh') || vName.includes('jenny')) score += 15;
      if (v.default) score += 5;
      if (v.localService) score += 2;
      return score;
    }

    let best = null;
    let maxScore = -1;
    for (const v of cachedVoices) {
      const s = scoreVoice(v);
      if (s > maxScore) {
        maxScore = s;
        best = v;
      }
    }
    return best;
  }

  /**
   * Phát âm văn bản với tự động nhận diện ngôn ngữ
   * @param {string} text Nội dung cần đọc
   * @param {object} options Tùy chọn { rate, pitch, onEnd }
   */
  function speakAuto(text, options = {}) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    // Hủy các câu đang đọc dở để đọc câu mới ngay lập tức
    window.speechSynthesis.cancel();

    if (!text || typeof text !== 'string') return;
    const segments = parseSpeechSegments(text);
    if (segments.length === 0) return;

    segments.forEach((seg, index) => {
      const utter = new SpeechSynthesisUtterance(seg.text);
      const voice = findBestVoice(seg.lang);
      if (voice) {
        utter.voice = voice;
        utter.lang = voice.lang;
      } else {
        utter.lang = seg.lang;
      }

      // Tinh chỉnh tốc độ & cao độ thân thiện, ngọt ngào cho trẻ nhỏ
      if (seg.lang.startsWith('vi')) {
        utter.rate = options.rate || 0.88;
        utter.pitch = options.pitch || 1.1;
      } else if (seg.lang.startsWith('en')) {
        utter.rate = options.rate || 0.85; // Tiếng Anh đọc chậm vừa đủ để bé nghe rõ từng âm tiết
        utter.pitch = options.pitch || 1.05;
      } else if (seg.lang.startsWith('ja')) {
        utter.rate = options.rate || 0.88;
        utter.pitch = options.pitch || 1.1;
      } else {
        utter.rate = options.rate || 0.86;
        utter.pitch = options.pitch || 1.05;
      }

      if (index === segments.length - 1 && typeof options.onEnd === 'function') {
        utter.onend = options.onEnd;
      }

      window.speechSynthesis.speak(utter);
    });
  }

  function stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  // Xuất ra môi trường Browser hoặc Node.js
  const SpeechEngine = {
    detectLanguage,
    parseSpeechSegments,
    findBestVoice,
    speakAuto,
    stopSpeech,
    refreshVoices
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = SpeechEngine;
  } else {
    global.SpeechEngine = SpeechEngine;
    // Tự động gán hàm phát âm chính
    global.speakAuto = speakAuto;
    // Giữ bí danh tương thích ngược
    global.speakVietnamese = speakAuto;
  }
})(typeof window !== 'undefined' ? window : global);

// Hệ Thống Học Ngắt Quãng (Spaced Repetition) & Tự Động Tạo Câu Hỏi
const INTERVALS = {
  1: 1 * 24 * 60 * 60 * 1000,  // Cấp 1 (Hạt mầm): Ôn lại sau 1 ngày
  2: 3 * 24 * 60 * 60 * 1000,  // Cấp 2 (Cây con): Ôn lại sau 3 ngày
  3: 7 * 24 * 60 * 60 * 1000,  // Cấp 3 (Nở hoa): Ôn lại sau 7 ngày
  4: 14 * 24 * 60 * 60 * 1000  // Cấp 4 (Trĩu quả): Đã nhớ sâu, ôn lại sau 14 ngày
};

const STAGE_INFO = {
  1: { stage: 'seed', icon: '🌱', name: 'Hạt Mầm', desc: 'Mới nạp vào trí nhớ' },
  2: { stage: 'sprout', icon: '🌿', name: 'Cây Con', desc: 'Đang bắt đầu ghi nhớ' },
  3: { stage: 'flower', icon: '🌸', name: 'Nở Hoa', desc: 'Ghi nhớ khá tốt' },
  4: { stage: 'fruit', icon: '🍎', name: 'Trĩu Quả', desc: 'Trí nhớ dài hạn vững chắc' }
};

// Từ điển gợi ý biểu tượng cho giọng nói tiếng Việt của bé
const VOICE_EMOJI_DICT = {
  'chó': '🐶', 'cún': '🐶', 'mèo': '🐱', 'thỏ': '🐰', 'voi': '🐘', 'hổ': '🐯', 'khỉ': '🐵', 'gấu': '🐻',
  'chim': '🐦', 'vịt': '🦆', 'gà': '🐓', 'bò': '🐮', 'lợn': '🐷', 'heo': '🐷', 'ngựa': '🐴', 'cá': '🐟',
  'táo': '🍎', 'chuối': '🍌', 'dưa hấu': '🍉', 'dâu': '🍓', 'cam': '🍊', 'nho': '🍇', 'lê': '🍐',
  'ô tô': '🚗', 'xe hơi': '🚗', 'máy bay': '✈️', 'tàu hỏa': '🚂', 'thuyền': '⛵', 'xe đạp': '🚲',
  'mặt trời': '☀️', 'mặt trăng': '🌙', 'ngôi sao': '⭐', 'đám mây': '☁️', 'mưa': '🌧️', 'hoa': '🌸',
  'bóng bay': '🎈', 'quà': '🎁', 'gấu bông': '🧸', 'áo': '👕', 'mũ': '🧢', 'giày': '👟'
};

class MemoryGarden {
  constructor() {
    this.STORAGE_KEY = 'be_vui_hoc_lessons_v1';
    this.lessons = this.loadLessons();
    if (this.lessons.length === 0) {
      this.seedDefaultLessons();
    }
  }

  loadLessons() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveLessons() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.lessons));
    } catch (e) {
      console.error('Error saving lessons:', e);
    }
  }

  seedDefaultLessons() {
    const now = Date.now();
    this.lessons = [
      {
        id: 'seed_1',
        name: 'Bạn Cún Con',
        detail: 'Kêu gâu gâu vẫy đuôi',
        icon: '🐶',
        level: 1, // 🌱
        createdAt: now - 86400000,
        lastReviewed: now - 86400000,
        nextReview: now - 1000 // Đã đến hạn ôn tập ngay!
      },
      {
        id: 'seed_2',
        name: 'Quả Táo Đỏ',
        detail: 'Ngọt lịm giòn tan',
        icon: '🍎',
        level: 2, // 🌿
        createdAt: now - 3 * 86400000,
        lastReviewed: now - 86400000,
        nextReview: now + 86400000
      },
      {
        id: 'seed_3',
        name: 'Ông Mặt Trời',
        detail: 'Chiếu nắng ấm áp buổi sáng',
        icon: '☀️',
        level: 3, // 🌸
        createdAt: now - 7 * 86400000,
        lastReviewed: now - 86400000,
        nextReview: now + 3 * 86400000
      }
    ];
    this.saveLessons();
  }

  // 1. Thêm một kiến thức mới do bé nói / chụp ảnh
  addLesson(name, detail, icon, photoData = null) {
    // Nếu bé nói nhưng chưa có icon, tự động tra từ điển
    let matchedIcon = icon;
    if (!matchedIcon) {
      const lower = name.toLowerCase();
      for (const [key, em] of Object.entries(VOICE_EMOJI_DICT)) {
        if (lower.includes(key)) {
          matchedIcon = em;
          break;
        }
      }
      if (!matchedIcon) matchedIcon = '🌟';
    }

    const now = Date.now();
    const newLesson = {
      id: 'lesson_' + now,
      name: name,
      detail: detail || `Bài học khám phá của bé`,
      icon: matchedIcon,
      photo: photoData,
      level: 1, // Bắt đầu từ cấp 1 (Hạt mầm 🌱)
      createdAt: now,
      lastReviewed: null,
      nextReview: now // Có thể ôn ngay lập tức
    };

    this.lessons.unshift(newLesson);
    this.saveLessons();
    return newLesson;
  }

  // 2. Lấy danh sách các câu cần ôn tập hôm nay (theo Spaced Repetition)
  getDueLessons(forceAll = false) {
    const now = Date.now();
    if (forceAll) return [...this.lessons];
    return this.lessons.filter(l => !l.nextReview || l.nextReview <= now);
  }

  // 3. Thống kê cấp độ của Khu Vườn Trí Nhớ
  getGardenStats() {
    const stats = { 1: 0, 2: 0, 3: 0, 4: 0, total: this.lessons.length, dueCount: 0 };
    const now = Date.now();
    for (const l of this.lessons) {
      const lvl = l.level || 1;
      stats[lvl] = (stats[lvl] || 0) + 1;
      if (!l.nextReview || l.nextReview <= now) {
        stats.dueCount++;
      }
    }
    return stats;
  }

  // 4. Ghi nhận kết quả ôn bài và tính toán lịch ngắt quãng tiếp theo
  recordReviewResult(lessonId, isCorrect) {
    const lesson = this.lessons.find(l => l.id === lessonId);
    if (!lesson) return null;

    const now = Date.now();
    lesson.lastReviewed = now;

    if (isCorrect) {
      // Bé nhớ đúng: Nâng cấp cây (🌱 -> 🌿 -> 🌸 -> 🍎)
      lesson.level = Math.min(4, (lesson.level || 1) + 1);
    } else {
      // Bé quên: Trả về Hạt mầm 🌱 để củng cố lại vào ngày hôm sau
      lesson.level = 1;
    }

    const delay = INTERVALS[lesson.level] || INTERVALS[1];
    lesson.nextReview = now + delay;

    this.saveLessons();
    return lesson;
  }

  // 5. Tự động sinh câu hỏi trắc nghiệm từ một bài học của bé
  generateQuiz(lesson, fallbackPool = []) {
    // Thu thập danh sách các item khác để làm đáp án nhiễu
    const otherPool = [];
    for (const l of this.lessons) {
      if (l.id !== lesson.id) otherPool.push({ label: l.name, icon: l.icon });
    }
    if (fallbackPool && fallbackPool.length > 0) {
      for (const q of fallbackPool) {
        for (const opt of q.options) {
          if (opt.label !== lesson.name) otherPool.push(opt);
        }
      }
    }

    // Xáo trộn và chọn 2 đáp án gây nhiễu
    otherPool.sort(() => Math.random() - 0.5);
    const distractor1 = otherPool[0] || { label: 'Bông Hoa', icon: '🌸' };
    const distractor2 = otherPool[1] || { label: 'Ngôi Sao', icon: '⭐' };

    const correctOption = {
      label: lesson.name,
      icon: lesson.icon,
      photo: lesson.photo
    };

    const options = [correctOption, distractor1, distractor2].sort(() => Math.random() - 0.5);
    const correctIndex = options.findIndex(o => o.label === correctOption.label);

    const stage = STAGE_INFO[lesson.level || 1];

    return {
      id: 'quiz_' + lesson.id + '_' + Date.now(),
      lessonId: lesson.id,
      category: 'spaced_repetition',
      title: `Bé nhớ không: Đâu là "${lesson.name}" nhỉ?`,
      audioPrompt: `Bé hãy tìm "${lesson.name}" mà bé đã khám phá nào!`,
      options: options,
      correctIndex: correctIndex,
      hint: lesson.detail || `Bé đã lưu bài này trong Khu Vườn Trí Nhớ đó!`,
      stageInfo: stage
    };
  }
}

// Khởi tạo thực thể dùng chung
const memoryGarden = new MemoryGarden();

if (typeof module !== 'undefined') {
  module.exports = { MemoryGarden, memoryGarden, STAGE_INFO, INTERVALS, VOICE_EMOJI_DICT };
}

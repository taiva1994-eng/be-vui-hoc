// Quản lý các Bài Học có cấu trúc (Thẻ Học Flashcards thực tế -> Bộ Câu Đố)
const DEFAULT_LESSONS = [
  // ================= BÀI 1: MÀU SẮC KỲ DIỆU (ẢNH CHỤP THẬT) =================
  {
    id: 'lesson_colors',
    title: 'Các Màu Sắc Kỳ Diệu 🎨',
    category: 'color',
    desc: 'Bé nhận biết màu sắc qua đồ vật thực tế: Quả dâu đỏ, Quả chuối vàng, Biển xanh, Chiếc lá',
    badge: '4 Ảnh thật',
    cards: [
      {
        id: 'card_color_red',
        name: 'Màu Đỏ',
        icon: '🍓',
        photo: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&auto=format&fit=crop&q=80',
        themeColor: '#EF4444',
        bgLight: '#FEF2F2',
        audioPrompt: 'Đây là Màu Đỏ! Màu đỏ rực rỡ như quả dâu tây chín mọng và chiếc xe cứu hỏa!',
        exampleIcon: '🍓',
        exampleText: 'Quả dâu tây tươi mọng màu đỏ'
      },
      {
        id: 'card_color_yellow',
        name: 'Màu Vàng',
        icon: '🍌',
        photo: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80',
        themeColor: '#F59E0B',
        bgLight: '#FFFBEB',
        audioPrompt: 'Đây là Màu Vàng! Màu vàng tươi sáng của quả chuối ngọt thơm và bông hoa hướng dương!',
        exampleIcon: '🍌',
        exampleText: 'Quả chuối chín thơm màu vàng'
      },
      {
        id: 'card_color_blue',
        name: 'Màu Xanh Dương',
        icon: '🌊',
        photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
        themeColor: '#3B82F6',
        bgLight: '#EFF6FF',
        audioPrompt: 'Đây là Màu Xanh Dương! Màu xanh trong veo của bãi biển và bầu trời bao la!',
        exampleIcon: '🌊',
        exampleText: 'Bầu trời và bãi biển xanh biếc'
      },
      {
        id: 'card_color_green',
        name: 'Màu Xanh Lá',
        icon: '🍃',
        photo: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&auto=format&fit=crop&q=80',
        themeColor: '#10B981',
        bgLight: '#ECFDF5',
        audioPrompt: 'Đây là Màu Xanh Lá! Màu xanh mướt của những chiếc lá cây ngoài vườn mát lành!',
        exampleIcon: '🍃',
        exampleText: 'Chiếc lá cây xanh tươi mướt mắt'
      }
    ],
    quizzes: [
      {
        title: 'Đâu là Màu Đỏ như quả dâu tây chín mọng?',
        audioPrompt: 'Bé hãy tìm hình quả dâu tây Màu Đỏ nào!',
        correctIndex: 0,
        options: [
          { label: 'Màu Đỏ (Dâu tây)', icon: '🍓', photo: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&auto=format&fit=crop&q=80' },
          { label: 'Màu Vàng (Chuối)', icon: '🍌', photo: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&auto=format&fit=crop&q=80' },
          { label: 'Màu Xanh Dương (Biển)', icon: '🌊', photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80' }
        ],
        hint: 'Quả dâu tây tươi màu đỏ rực rỡ bé vừa xem đó!'
      },
      {
        title: 'Đâu là Màu Vàng của quả chuối ngọt thơm?',
        audioPrompt: 'Bé tìm quả chuối Màu Vàng óng ả nào!',
        correctIndex: 1,
        options: [
          { label: 'Màu Xanh Lá', icon: '🍃', photo: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=300&auto=format&fit=crop&q=80' },
          { label: 'Màu Vàng (Chuối)', icon: '🍌', photo: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&auto=format&fit=crop&q=80' },
          { label: 'Màu Đỏ (Dâu tây)', icon: '🍓', photo: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&auto=format&fit=crop&q=80' }
        ],
        hint: 'Quả chuối cong cong màu vàng óng ả bạn khỉ rất thích!'
      },
      {
        title: 'Đâu là Màu Xanh Dương của bầu trời và biển cả?',
        audioPrompt: 'Bé chỉ cho bố mẹ bãi biển Màu Xanh Dương nào!',
        correctIndex: 2,
        options: [
          { label: 'Màu Đỏ (Dâu tây)', icon: '🍓', photo: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&auto=format&fit=crop&q=80' },
          { label: 'Màu Vàng (Chuối)', icon: '🍌', photo: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&auto=format&fit=crop&q=80' },
          { label: 'Màu Xanh Dương (Biển)', icon: '🌊', photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80' }
        ],
        hint: 'Bãi biển mênh mông trong veo màu xanh dương!'
      },
      {
        title: 'Đâu là Màu Xanh Lá của chiếc lá cây tươi non?',
        audioPrompt: 'Bé tìm chiếc lá Màu Xanh mát mắt nào!',
        correctIndex: 0,
        options: [
          { label: 'Màu Xanh Lá', icon: '🍃', photo: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=300&auto=format&fit=crop&q=80' },
          { label: 'Màu Đỏ (Dâu tây)', icon: '🍓', photo: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&auto=format&fit=crop&q=80' },
          { label: 'Màu Xanh Dương (Biển)', icon: '🌊', photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80' }
        ],
        hint: 'Chiếc lá cây xanh tươi có giọt sương long lanh!'
      }
    ]
  },

  // ================= BÀI 2: BẠN ĐỘNG VẬT NGOÀI ĐỜI THẬT =================
  {
    id: 'lesson_animals',
    title: 'Những Người Bạn Động Vật 🐾',
    category: 'animal',
    desc: 'Khám phá hình ảnh chụp thật của: Chú cún, Bạn mèo, Chú voi, Bạn thỏ',
    badge: '4 Ảnh thật',
    cards: [
      {
        id: 'card_dog',
        name: 'Chú Cún Con',
        icon: '🐶',
        photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
        themeColor: '#D97706',
        bgLight: '#FFFBEB',
        audioPrompt: 'Đây là Chú Cún Con thật! Cún con sủa gâu gâu, đôi mắt sáng long lanh và rất ngoan ngoãn!',
        exampleIcon: '🐶',
        exampleText: 'Chú cún con thông minh, trung thành'
      },
      {
        id: 'card_cat',
        name: 'Bạn Mèo Mướp',
        icon: '🐱',
        photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80',
        themeColor: '#EA580C',
        bgLight: '#FFF7ED',
        audioPrompt: 'Đây là Bạn Mèo thật! Bạn mèo có bộ lông mềm mượt, mắt tròn xoe và kêu meo meo!',
        exampleIcon: '🐱',
        exampleText: 'Mèo con thích cuộn tròn sưởi nắng'
      },
      {
        id: 'card_elephant',
        name: 'Chú Voi To Lớn',
        icon: '🐘',
        photo: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600&auto=format&fit=crop&q=80',
        themeColor: '#475569',
        bgLight: '#F8FAFC',
        audioPrompt: 'Đây là Chú Voi thật ngoài đời! Chú voi có thân hình khổng lồ, tai to và vòi dài hút nước!',
        exampleIcon: '🐘',
        exampleText: 'Chú voi khổng lồ hiền lành trong rừng'
      },
      {
        id: 'card_rabbit',
        name: 'Bạn Thỏ Trắng',
        icon: '🐰',
        photo: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&auto=format&fit=crop&q=80',
        themeColor: '#E11D48',
        bgLight: '#FFF1F2',
        audioPrompt: 'Đây là Bạn Thỏ Trắng thật! Bạn thỏ có bộ lông trắng như tuyết, hai tai dài vểnh lên!',
        exampleIcon: '🐰',
        exampleText: 'Thỏ con đáng yêu ăn cỏ non'
      }
    ],
    quizzes: [
      {
        title: 'Đâu là Chú Cún Con sủa "Gâu gâu"?',
        audioPrompt: 'Bé hãy tìm ảnh Chú Cún Con nào!',
        correctIndex: 0,
        options: [
          { label: 'Chú Cún', icon: '🐶', photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&auto=format&fit=crop&q=80' },
          { label: 'Bạn Mèo', icon: '🐱', photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&auto=format&fit=crop&q=80' },
          { label: 'Bạn Thỏ', icon: '🐰', photo: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=300&auto=format&fit=crop&q=80' }
        ],
        hint: 'Cún con có đôi mắt long lanh sủa gâu gâu!'
      },
      {
        title: 'Bạn nào có chiếc vòi dài ơi là dài để hút nước?',
        audioPrompt: 'Đâu là ảnh Chú Voi to lớn?',
        correctIndex: 2,
        options: [
          { label: 'Bạn Mèo', icon: '🐱', photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&auto=format&fit=crop&q=80' },
          { label: 'Bạn Thỏ', icon: '🐰', photo: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=300&auto=format&fit=crop&q=80' },
          { label: 'Chú Voi', icon: '🐘', photo: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=300&auto=format&fit=crop&q=80' }
        ],
        hint: 'Chú voi khổng lồ có đôi tai to như quạt và chiếc vòi dài!'
      },
      {
        title: 'Bạn nhỏ có đôi tai dài và bộ lông trắng muốt?',
        audioPrompt: 'Bé tìm Bạn Thỏ Trắng xinh xắn nào!',
        correctIndex: 1,
        options: [
          { label: 'Chú Cún', icon: '🐶', photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&auto=format&fit=crop&q=80' },
          { label: 'Bạn Thỏ', icon: '🐰', photo: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=300&auto=format&fit=crop&q=80' },
          { label: 'Chú Voi', icon: '🐘', photo: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=300&auto=format&fit=crop&q=80' }
        ],
        hint: 'Bạn thỏ trắng có hai tai dài vểnh lên rất đáng yêu!'
      }
    ]
  },

  // ================= BÀI 3: QUẢ NGỌT THƠM THO NGOÀI ĐỜI THỰC =================
  {
    id: 'lesson_fruits',
    title: 'Những Quả Ngọt Hoa Thơm 🍎',
    category: 'fruit',
    desc: 'Nhận biết quả thật: Táo đỏ giòn ngọt, Chuối chín vàng óng, Dưa hấu mát lành',
    badge: '3 Ảnh thật',
    cards: [
      {
        id: 'card_apple',
        name: 'Quả Táo Đỏ',
        icon: '🍎',
        photo: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80',
        themeColor: '#DC2626',
        bgLight: '#FEF2F2',
        audioPrompt: 'Đây là Quả Táo Đỏ thật! Quả táo tròn xoe, vỏ đỏ bóng loáng, cắn vào giòn ngọt mát rượi!',
        exampleIcon: '🍎',
        exampleText: 'Quả táo đỏ ngon miệng giàu vitamin'
      },
      {
        id: 'card_banana',
        name: 'Quả Chuối Vàng',
        icon: '🍌',
        photo: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80',
        themeColor: '#CA8A04',
        bgLight: '#FEFCE8',
        audioPrompt: 'Đây là Nải Chuối Vàng thật! Những quả chuối cong cong màu vàng rực, bóc vỏ ra thơm lừng!',
        exampleIcon: '🍌',
        exampleText: 'Chuối vàng chín cây thơm ngọt'
      },
      {
        id: 'card_watermelon',
        name: 'Quả Dưa Hấu',
        icon: '🍉',
        photo: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80',
        themeColor: '#16A34A',
        bgLight: '#F0FDF4',
        audioPrompt: 'Đây là Miếng Dưa Hấu thật! Ruột màu đỏ thắm, nhiều hạt nhỏ xíu, cắn vào ngập tràn nước ngọt!',
        exampleIcon: '🍉',
        exampleText: 'Dưa hấu mát lạnh giải khát mùa hè'
      }
    ],
    quizzes: [
      {
        title: 'Đâu là Quả Táo Đỏ giòn ngọt bóng loáng?',
        audioPrompt: 'Bé chỉ cho bố mẹ Quả Táo Đỏ nào!',
        correctIndex: 0,
        options: [
          { label: 'Quả Táo', icon: '🍎', photo: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&auto=format&fit=crop&q=80' },
          { label: 'Quả Chuối', icon: '🍌', photo: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&auto=format&fit=crop&q=80' },
          { label: 'Dưa Hấu', icon: '🍉', photo: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&auto=format&fit=crop&q=80' }
        ],
        hint: 'Quả táo đỏ bóng loáng ăn giòn ngọt thơm lừng!'
      },
      {
        title: 'Quả nào vỏ vàng cong cong bóc ra thơm lừng?',
        audioPrompt: 'Đâu là Quả Chuối chín vàng?',
        correctIndex: 1,
        options: [
          { label: 'Dưa Hấu', icon: '🍉', photo: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&auto=format&fit=crop&q=80' },
          { label: 'Quả Chuối', icon: '🍌', photo: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&auto=format&fit=crop&q=80' },
          { label: 'Quả Táo', icon: '🍎', photo: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&auto=format&fit=crop&q=80' }
        ],
        hint: 'Quả chuối cong cong màu vàng óng!'
      }
    ]
  }
];

// ================= BỘ MÃ NGUỒN TỰ ĐỘNG TẠO BÀI HỌC TỪ CHỦ ĐỀ (AUTO LESSON GENERATOR) =================
const PRESET_TOPIC_TEMPLATES = {
  // 1. Phương tiện giao thông
  'phuong_tien': {
    title: 'Các Phương Tiện Giao Thông 🚗',
    desc: 'Bé nhận biết xe cộ ngoài đường: Xe cứu hỏa, Xe buýt, Máy bay, Tàu hỏa',
    cards: [
      {
        name: 'Xe Cứu Hỏa',
        icon: '🚒',
        photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80',
        audioPrompt: 'Đây là Xe Cứu Hỏa màu đỏ rực rỡ! Xe có còi kêu toe toa và vòi phun nước dập lửa!',
        exampleText: 'Xe cứu hỏa màu đỏ dũng cảm'
      },
      {
        name: 'Xe Buýt',
        icon: '🚌',
        photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
        audioPrompt: 'Đây là Xe Buýt lớn! Xe buýt chở nhiều hành khách đi khắp các con phố!',
        exampleText: 'Xe buýt to lớn chở mọi người'
      },
      {
        name: 'Máy Bay',
        icon: '✈️',
        photo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&auto=format&fit=crop&q=80',
        audioPrompt: 'Đây là Chiếc Máy Bay! Máy bay có đôi cánh khổng lồ bay vút trên mây xanh!',
        exampleText: 'Máy bay bay cao trên bầu trời'
      },
      {
        name: 'Tàu Hỏa',
        icon: '🚂',
        photo: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&auto=format&fit=crop&q=80',
        audioPrompt: 'Đây là Đoàn Tàu Hỏa! Tàu hỏa có nhiều toa dài, chạy trên đường ray xình xịch!',
        exampleText: 'Đoàn tàu hỏa chạy trên đường ray'
      }
    ]
  },

  // 2. Hình khối
  'hinh_khoi': {
    title: 'Bé Khám Phá Hình Khối 🔷',
    desc: 'Nhận biết các hình khối qua đồ vật thật: Quả bóng tròn, Bánh chưng vuông, Miếng pizza',
    cards: [
      {
        name: 'Hình Tròn',
        icon: '⚽',
        photo: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=600&auto=format&fit=crop&q=80',
        audioPrompt: 'Đây là Hình Tròn! Hình tròn lăn bon bon như quả bóng đá và bánh xe ô tô!',
        exampleText: 'Quả bóng tròn xoe lăn bon bon'
      },
      {
        name: 'Hình Tam Giác',
        icon: '🍕',
        photo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
        audioPrompt: 'Đây là Hình Tam Giác! Hình tam giác có 3 góc như mái nhà và miếng bánh pizza thơm ngon!',
        exampleText: 'Miếng bánh pizza hình tam giác'
      },
      {
        name: 'Hình Vuông',
        icon: '🎁',
        photo: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80',
        audioPrompt: 'Đây là Hình Vuông! Hình vuông có 4 cạnh bằng nhau như chiếc hộp quà xinh xắn!',
        exampleText: 'Hộp quà sinh nhật hình vuông'
      },
      {
        name: 'Hình Ngôi Sao',
        icon: '⭐',
        photo: 'https://images.unsplash.com/photo-1516683037151-9a17603a8dc7?w=600&auto=format&fit=crop&q=80',
        audioPrompt: 'Đây là Hình Ngôi Sao! Ngôi sao có 5 cánh lấp lánh như chú sao biển!',
        exampleText: 'Chú sao biển có 5 cánh xinh đẹp'
      }
    ]
  },

  // 3. Rau củ quả
  'rau_cu': {
    title: 'Vườn Rau Củ Xanh Mát 🥦',
    desc: 'Nhận biết các loại rau củ bổ dưỡng: Cà rốt, Cà chua, Bắp ngô, Bông cải',
    cards: [
      {
        name: 'Củ Cà Rốt',
        icon: '🥕',
        photo: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&auto=format&fit=crop&q=80',
        audioPrompt: 'Đây là Củ Cà Rốt màu cam! Cà rốt giòn ngọt bạn thỏ trắng rất thích ăn!',
        exampleText: 'Củ cà rốt màu cam giàu vitamin'
      },
      {
        name: 'Quả Cà Chua',
        icon: '🍅',
        photo: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
        audioPrompt: 'Đây là Quả Cà Chua màu đỏ mọng! Cà chua nấu canh chua rất thơm và bổ dưỡng!',
        exampleText: 'Cà chua tròn xoe màu đỏ thắm'
      },
      {
        name: 'Bắp Ngô Vàng',
        icon: '🌽',
        photo: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format&fit=crop&q=80',
        audioPrompt: 'Đây là Bắp Ngô Vàng! Bắp ngô có những hạt ngô vàng óng, luộc lên thơm ngọt lịm!',
        exampleText: 'Bắp ngô vàng ngọt bùi'
      },
      {
        name: 'Bông Cải Xanh',
        icon: '🥦',
        photo: 'https://images.unsplash.com/photo-1584270359816-7248f2191599?w=600&auto=format&fit=crop&q=80',
        audioPrompt: 'Đây là Bông Cải Xanh! Bông cải giống như một cái cây tí hon màu xanh mát lành!',
        exampleText: 'Bông cải xanh giòn ngon mát ruột'
      }
    ]
  },

  // 4. Sinh vật biển
  'sinh_vat_bien': {
    title: 'Khám Phá Đại Dương Xanh 🌊',
    desc: 'Làm quen các bạn nhỏ dưới biển: Cá heo, Rùa biển, Cua biển, Cá vàng',
    cards: [
      {
        name: 'Bạn Cá Heo',
        icon: '🐬',
        photo: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?w=600&auto=format&fit=crop&q=80',
        audioPrompt: 'Đây là Bạn Cá Heo! Cá heo rất thông minh, thích nhảy múa trên mặt nước mát!',
        exampleText: 'Cá heo thông minh thân thiện'
      },
      {
        name: 'Chú Rùa Biển',
        icon: '🐢',
        photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80',
        audioPrompt: 'Đây là Chú Rùa Biển! Chú rùa có chiếc mai cứng cáp và bơi lặn rất giỏi!',
        exampleText: 'Chú rùa biển bơi lội hiền hòa'
      },
      {
        name: 'Chú Cua Biển',
        icon: '🦀',
        photo: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=600&auto=format&fit=crop&q=80',
        audioPrompt: 'Đây là Chú Cua Biển! Chú cua có hai chiếc càng to và bò ngang vui nhộn!',
        exampleText: 'Chú cua biển có 2 chiếc càng to'
      },
      {
        name: 'Chú Cá Vàng',
        icon: '🐠',
        photo: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600&auto=format&fit=crop&q=80',
        audioPrompt: 'Đây là Chú Cá Vàng rực rỡ! Đôi vây bơi lượn uyển chuyển dưới làn nước trong veo!',
        exampleText: 'Cá vàng tung tăng bơi lội'
      }
    ]
  },

  // 5. Bộ phận cơ thể
  'co_the': {
    title: 'Các Bộ Phận Trên Cơ Thể Bé 👂',
    desc: 'Bé nhận biết: Đôi mắt, Đôi tai, Đôi bàn tay, Nụ cười',
    cards: [
      {
        name: 'Đôi Mắt Sáng',
        icon: '👀',
        photo: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&auto=format&fit=crop&q=80',
        audioPrompt: 'Đây là Đôi Mắt Sáng của bé! Đôi mắt giúp bé nhìn thấy bố mẹ và thế giới tươi đẹp xung quanh!',
        exampleText: 'Đôi mắt tinh anh để ngắm nhìn'
      },
      {
        name: 'Đôi Bàn Tay',
        icon: '🤲',
        photo: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=600&auto=format&fit=crop&q=80',
        audioPrompt: 'Đây là Đôi Bàn Tay nhỏ xinh! Bàn tay bé cầm đồ chơi, vỗ tay và ôm bố mẹ thật chặt!',
        exampleText: 'Bàn tay nhỏ xinh chăm chỉ khéo léo'
      },
      {
        name: 'Đôi Tai Nhỏ',
        icon: '👂',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
        audioPrompt: 'Đây là Đôi Tai Lắng Nghe! Đôi tai giúp bé nghe tiếng chim hót và lời hát ru của mẹ!',
        exampleText: 'Đôi tai để nghe những âm thanh vui nhộn'
      },
      {
        name: 'Nụ Cười Tươi',
        icon: '👄',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
        audioPrompt: 'Đây là Nụ Cười Xinh xắn! Khi bé cười, cả gia đình đều rộn rã niềm vui!',
        exampleText: 'Nụ cười rạng rỡ của bé'
      }
    ]
  },

  // 6. Các loài hoa
  'hoa': {
    title: 'Khu Vườn Các Loài Hoa 🌸',
    desc: 'Nhận biết các loài hoa rực rỡ: Hoa hướng dương, Hoa hồng đỏ, Hoa sen thanh khiết',
    cards: [
      {
        name: 'Hoa Hướng Dương',
        icon: '🌻',
        photo: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop&q=80',
        audioPrompt: 'Đây là Bông Hoa Hướng Dương! Bông hoa to tròn màu vàng rực rỡ luôn hướng về phía mặt trời!',
        exampleText: 'Hoa hướng dương vàng rực rỡ'
      },
      {
        name: 'Hoa Hồng Đỏ',
        icon: '🌹',
        photo: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
        audioPrompt: 'Đây là Bông Hoa Hồng Đỏ thắm! Những cánh hoa hồng xếp tầng thơm ngát!',
        exampleText: 'Hoa hồng đỏ thơm ngát'
      },
      {
        name: 'Bông Hoa Sen',
        icon: '🪷',
        photo: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
        audioPrompt: 'Đây là Bông Hoa Sen! Hoa sen nở trên mặt hồ với những cánh hoa hồng phớt dịu dàng!',
        exampleText: 'Bông hoa sen thanh tao mát lành'
      }
    ]
  }
};

class LessonManager {
  constructor() {
    this.STORAGE_KEY = 'be_vui_hoc_custom_lessons_v1';
    this.customLessons = this.loadCustomLessons();
  }

  loadCustomLessons() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveCustomLessons() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.customLessons));
    } catch (e) {
      console.error(e);
    }
  }

  getAllLessons() {
    return [...DEFAULT_LESSONS, ...this.customLessons];
  }

  addCustomLesson(lesson) {
    if (!lesson.quizzes || lesson.quizzes.length === 0) {
      lesson.quizzes = this.generateQuizzesFromCards(lesson.cards);
    }
    this.customLessons.unshift(lesson);
    this.saveCustomLessons();
    return lesson;
  }

  // TỰ ĐỘNG TẠO BÀI HỌC HOÀN CHỈNH TỪ CHỦ ĐỀ
  generateLessonFromTopic(topicInput) {
    const raw = (topicInput || '').trim().toLowerCase();

    let matchedKey = null;
    if (raw.includes('xe') || raw.includes('phương tiện') || raw.includes('giao thông') || raw.includes('tàu') || raw.includes('máy bay')) {
      matchedKey = 'phuong_tien';
    } else if (raw.includes('hình') || raw.includes('khối') || raw.includes('vuông') || raw.includes('tròn')) {
      matchedKey = 'hinh_khoi';
    } else if (raw.includes('rau') || raw.includes('củ') || raw.includes('cà rốt') || raw.includes('cà chua')) {
      matchedKey = 'rau_cu';
    } else if (raw.includes('biển') || raw.includes('nước') || raw.includes('cá') || raw.includes('cua') || raw.includes('đại dương')) {
      matchedKey = 'sinh_vat_bien';
    } else if (raw.includes('cơ thể') || raw.includes('mắt') || raw.includes('tai') || raw.includes('tay') || raw.includes('chân')) {
      matchedKey = 'co_the';
    } else if (raw.includes('hoa') || raw.includes('hồng') || raw.includes('sen') || raw.includes('hướng dương')) {
      matchedKey = 'hoa';
    }

    if (matchedKey && PRESET_TOPIC_TEMPLATES[matchedKey]) {
      const tpl = PRESET_TOPIC_TEMPLATES[matchedKey];
      const lesson = {
        id: 'ai_lesson_' + matchedKey + '_' + Date.now(),
        title: tpl.title,
        category: matchedKey,
        desc: tpl.desc,
        badge: `${tpl.cards.length} Ảnh thật`,
        cards: tpl.cards.map((c, i) => ({
          id: `ai_card_${i}_${Date.now()}`,
          name: c.name,
          icon: c.icon,
          photo: c.photo,
          themeColor: ['#EF4444', '#F59E0B', '#3B82F6', '#10B981'][i % 4],
          bgLight: ['#FEF2F2', '#FFFBEB', '#EFF6FF', '#ECFDF5'][i % 4],
          audioPrompt: c.audioPrompt,
          exampleIcon: c.icon,
          exampleText: c.exampleText
        }))
      };
      lesson.quizzes = this.generateQuizzesFromCards(lesson.cards);
      return lesson;
    }

    // Tự động suy luận thông minh cho bất kỳ chủ đề tự do nào khác
    const cleanTitle = topicInput.charAt(0).toUpperCase() + topicInput.slice(1);
    const genericCards = [
      {
        id: 'gen_card_1_' + Date.now(),
        name: `Khám phá 1: ${cleanTitle}`,
        icon: '🌟',
        photo: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&auto=format&fit=crop&q=80',
        themeColor: '#4F46E5',
        bgLight: '#EEF2FF',
        audioPrompt: `Bé cùng bố mẹ tìm hiểu về ${cleanTitle} nào! Đây là điều rất kỳ diệu và quen thuộc xung quanh bé!`,
        exampleIcon: '🌟',
        exampleText: `Hình ảnh đẹp về ${cleanTitle}`
      },
      {
        id: 'gen_card_2_' + Date.now(),
        name: `Đặc điểm của ${cleanTitle}`,
        icon: '🎨',
        photo: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
        themeColor: '#F59E0B',
        bgLight: '#FFFBEB',
        audioPrompt: `Bé hãy nhìn kỹ những màu sắc và hình dáng đáng yêu của ${cleanTitle} nhé!`,
        exampleIcon: '🎨',
        exampleText: `Màu sắc và hình dáng đặc biệt`
      },
      {
        id: 'gen_card_3_' + Date.now(),
        name: `Điều thú vị về ${cleanTitle}`,
        icon: '🎈',
        photo: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=600&auto=format&fit=crop&q=80',
        themeColor: '#10B981',
        bgLight: '#ECFDF5',
        audioPrompt: `Thật tuyệt vời! Bé đã ghi nhớ thật kỹ những điều thú vị về ${cleanTitle} rồi đó!`,
        exampleIcon: '🎈',
        exampleText: `Bé ghi nhớ thật giỏi`
      }
    ];

    const lesson = {
      id: 'ai_custom_' + Date.now(),
      title: `Bài Học: ${cleanTitle} ✨`,
      category: 'custom',
      desc: `Bài học khám phá tự động về chủ đề ${cleanTitle}`,
      badge: `3 Thẻ học`,
      cards: genericCards
    };
    lesson.quizzes = this.generateQuizzesFromCards(genericCards);
    return lesson;
  }

  generateQuizzesFromCards(cards) {
    if (!cards || cards.length === 0) return [];
    return cards.map((card, idx) => {
      const otherCards = cards.filter((_, i) => i !== idx);
      otherCards.sort(() => Math.random() - 0.5);
      const d1 = otherCards[0] || { name: 'Ngôi Sao', icon: '⭐', photo: null };
      const d2 = otherCards[1] || { name: 'Trái Tim', icon: '❤️', photo: null };

      const options = [
        { label: card.name, icon: card.icon, photo: card.photo },
        { label: d1.name, icon: d1.icon, photo: d1.photo },
        { label: d2.name, icon: d2.icon, photo: d2.photo }
      ].sort(() => Math.random() - 0.5);

      const correctIndex = options.findIndex(o => o.label === card.name);

      return {
        title: `Đâu là "${card.name}" mà bé vừa quan sát?`,
        audioPrompt: `Bé hãy tìm "${card.name}" nào!`,
        correctIndex: correctIndex,
        options: options,
        hint: card.exampleText || `Bé hãy nhớ lại chiếc thẻ ${card.name} vừa học nhé!`
      };
    });
  }
}

const lessonManager = new LessonManager();

if (typeof module !== 'undefined') {
  module.exports = { DEFAULT_LESSONS, PRESET_TOPIC_TEMPLATES, LessonManager, lessonManager };
}

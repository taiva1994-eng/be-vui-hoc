// Ngân hàng câu đố chuẩn cho trẻ 3-4 tuổi
const SAMPLE_QUESTIONS = [
  // ================= ĐỘNG VẬT =================
  {
    id: 'animal_1',
    category: 'animal',
    title: 'Đâu là chú cún con sủa "Gâu gâu"?',
    audioPrompt: 'Bé hãy tìm chú cún con gâu gâu nào!',
    options: [
      { label: 'Chú Cún', icon: '🐶' },
      { label: 'Mèo con', icon: '🐱' },
      { label: 'Vịt con', icon: '🦆' }
    ],
    correctIndex: 0,
    hint: 'Cún con có đôi tai vẫy vẫy và sủa gâu gâu đó bé!'
  },
  {
    id: 'animal_2',
    category: 'animal',
    title: 'Bạn Mèo kêu "Meo meo" ở đâu nhỉ?',
    audioPrompt: 'Đâu là bạn mèo kêu meo meo?',
    options: [
      { label: 'Gà trống', icon: '🐓' },
      { label: 'Bạn Mèo', icon: '🐱' },
      { label: 'Bò sữa', icon: '🐮' }
    ],
    correctIndex: 1,
    hint: 'Bạn mèo thích ăn cá và thích bắt chuột!'
  },
  {
    id: 'animal_3',
    category: 'animal',
    title: 'Bạn nào có cái vòi thật dài?',
    audioPrompt: 'Bạn nào có cái vòi dài ơi là dài?',
    options: [
      { label: 'Thỏ con', icon: '🐰' },
      { label: 'Bạn Hổ', icon: '🐯' },
      { label: 'Chú Voi', icon: '🐘' }
    ],
    correctIndex: 2,
    hint: 'Chú voi to lớn có vòi dài để hút nước!'
  },
  {
    id: 'animal_4',
    category: 'animal',
    title: 'Bạn Thỏ trắng có đôi tai dài ở đâu?',
    audioPrompt: 'Bé tìm bạn thỏ trắng thích ăn cà rốt nào!',
    options: [
      { label: 'Bạn Thỏ', icon: '🐰' },
      { label: 'Bạn Gấu', icon: '🐻' },
      { label: 'Bạn Khỉ', icon: '🐵' }
    ],
    correctIndex: 0,
    hint: 'Bạn thỏ có hai tai dài và thích ăn cà rốt!'
  },
  {
    id: 'animal_5',
    category: 'animal',
    title: 'Chú Vịt bơi dưới nước kêu cạp cạp?',
    audioPrompt: 'Đâu là chú vịt con bơi bơi dưới hồ?',
    options: [
      { label: 'Ngựa vằn', icon: '🦓' },
      { label: 'Vịt vàng', icon: '🦆' },
      { label: 'Cừu bông', icon: '🐑' }
    ],
    correctIndex: 1,
    hint: 'Vịt con có mỏ dẹt và bơi cạp cạp!'
  },

  // ================= HOA QUẢ =================
  {
    id: 'fruit_1',
    category: 'fruit',
    title: 'Đâu là quả Táo màu đỏ ngọt ngào?',
    audioPrompt: 'Bé chỉ cho bố mẹ quả táo màu đỏ nào!',
    options: [
      { label: 'Quả Táo', icon: '🍎' },
      { label: 'Quả Chuối', icon: '🍌' },
      { label: 'Quả Nho', icon: '🍇' }
    ],
    correctIndex: 0,
    hint: 'Quả táo tròn xoe màu đỏ thắm!'
  },
  {
    id: 'fruit_2',
    category: 'fruit',
    title: 'Quả Chuối màu vàng cong cong ở đâu?',
    audioPrompt: 'Đâu là quả chuối màu vàng bạn khỉ rất thích?',
    options: [
      { label: 'Dưa hấu', icon: '🍉' },
      { label: 'Quả Cam', icon: '🍊' },
      { label: 'Quả Chuối', icon: '🍌' }
    ],
    correctIndex: 2,
    hint: 'Quả chuối vỏ vàng có hình cong cong!'
  },
  {
    id: 'fruit_3',
    category: 'fruit',
    title: 'Quả Dưa Hấu ruột đỏ vỏ xanh là quả nào?',
    audioPrompt: 'Bé hãy chọn miếng dưa hấu mát lành nào!',
    options: [
      { label: 'Dâu tây', icon: '🍓' },
      { label: 'Dưa hấu', icon: '🍉' },
      { label: 'Quả Lê', icon: '🍐' }
    ],
    correctIndex: 1,
    hint: 'Dưa hấu ruột màu đỏ có nhiều hạt đen nhỏ!'
  },
  {
    id: 'fruit_4',
    category: 'fruit',
    title: 'Quả Dâu Tây nhỏ xinh màu đỏ?',
    audioPrompt: 'Đâu là quả dâu tây đỏ mọng?',
    options: [
      { label: 'Dâu tây', icon: '🍓' },
      { label: 'Quả Đào', icon: '🍑' },
      { label: 'Quả Dứa', icon: '🍍' }
    ],
    correctIndex: 0,
    hint: 'Dâu tây chua chua ngọt ngọt màu đỏ rực!'
  },

  // ================= MÀU SẮC & HÌNH KHỐI =================
  {
    id: 'color_1',
    category: 'color_shape',
    title: 'Đâu là Trái Tim màu đỏ yêu thương?',
    audioPrompt: 'Bé tìm hình trái tim màu đỏ tặng bố mẹ nào!',
    options: [
      { label: 'Trái tim đỏ', icon: '❤️' },
      { label: 'Hình vuông xanh', icon: '🟦' },
      { label: 'Hình tròn vàng', icon: '🟡' }
    ],
    correctIndex: 0,
    hint: 'Trái tim màu đỏ thắm như tình yêu của bố mẹ!'
  },
  {
    id: 'color_2',
    category: 'color_shape',
    title: 'Ngôi sao màu vàng lấp lánh ở đâu?',
    audioPrompt: 'Đâu là ngôi sao năm cánh màu vàng lấp lánh?',
    options: [
      { label: 'Hình tròn', icon: '🔴' },
      { label: 'Ngôi sao vàng', icon: '⭐' },
      { label: 'Kim cương', icon: '💎' }
    ],
    correctIndex: 1,
    hint: 'Ngôi sao có 5 cánh chiếu sáng trên bầu trời!'
  },
  {
    id: 'color_3',
    category: 'color_shape',
    title: 'Mặt trời tròn xoe tỏa nắng ấm áp?',
    audioPrompt: 'Bé chỉ vào ông mặt trời tròn xoe nào!',
    options: [
      { label: 'Đám mây', icon: '☁️' },
      { label: 'Mặt trăng', icon: '🌙' },
      { label: 'Mặt trời tròn', icon: '☀️' }
    ],
    correctIndex: 2,
    hint: 'Ông mặt trời màu vàng cam chiếu sáng ban ngày!'
  },

  // ================= TẬP ĐẾM =================
  {
    id: 'count_1',
    category: 'counting',
    title: 'Đâu là số "1" bạn gấu bông?',
    audioPrompt: 'Bé hãy tìm hình chỉ có một chú gấu bông duy nhất!',
    options: [
      { label: '1 Chú Gấu', icon: '🧸' },
      { label: '3 Chú Gấu', icon: '🧸🧸🧸' },
      { label: '5 Chú Gấu', icon: '🧸🧸🧸🧸🧸' }
    ],
    correctIndex: 0,
    hint: 'Chỉ có 1 bạn gấu đang đứng một mình thôi nhé!'
  },
  {
    id: 'count_2',
    category: 'counting',
    title: 'Đâu là "2" chiếc xe ô tô?',
    audioPrompt: 'Bé đếm xem đâu là hai chiếc xe ô tô bon bon?',
    options: [
      { label: '1 Chiếc xe', icon: '🚗' },
      { label: '2 Chiếc xe', icon: '🚗🚗' },
      { label: '4 Chiếc xe', icon: '🚗🚗🚗🚗' }
    ],
    correctIndex: 1,
    hint: 'Một, hai! Đúng hai chiếc xe ô tô luôn!'
  },
  {
    id: 'count_3',
    category: 'counting',
    title: 'Bé đếm xem đâu là "3" quả bóng bay?',
    audioPrompt: 'Đâu là ba quả bóng bay rực rỡ sắc màu?',
    options: [
      { label: '3 Quả bóng', icon: '🎈🎈🎈' },
      { label: '1 Quả bóng', icon: '🎈' },
      { label: '2 Quả bóng', icon: '🎈🎈' }
    ],
    correctIndex: 0,
    hint: 'Cùng đếm nhé: một, hai, ba quả bóng bay!'
  }
];

if (typeof module !== 'undefined') {
  module.exports = SAMPLE_QUESTIONS;
}

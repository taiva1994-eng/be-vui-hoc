const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { WebSocketServer } = require('ws');
const QRCode = require('qrcode');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// 1. Tìm IP mạng nội bộ (Wi-Fi gia đình)
function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        if (iface.address.startsWith('192.168.') || iface.address.startsWith('10.') || iface.address.startsWith('172.')) {
          return iface.address;
        }
      }
    }
  }
  return 'localhost';
}

const localIp = getLocalIp();
const accessUrl = `http://${localIp}:${PORT}`;

// 2. HTTP Server phục vụ file tĩnh
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';

  const filePath = path.join(PUBLIC_DIR, reqPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      });
      res.end(content, 'utf-8');
    }
  });
});

// 3. WebSocket Server đồng bộ 2 máy tức thì
const wss = new WebSocketServer({ server });
const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);

  ws.on('message', (message) => {
    // Phát tán gói tin cho tất cả các máy khác trong phòng
    for (const client of clients) {
      if (client !== ws && client.readyState === 1) { // 1 = OPEN
        client.send(message.toString());
      }
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
  });
});

// 4. Khởi động server & in mã QR
server.listen(PORT, '0.0.0.0', async () => {
  console.log('\n======================================================');
  console.log('   🌈 BÉ VUI HỌC - ỨNG DỤNG HỌC TẬP TƯƠNG TÁC 2 MÁY   ');
  console.log('======================================================\n');
  console.log(`✅ Máy chủ đang chạy tại:`);
  console.log(`   👉 Đường dẫn mở trên điện thoại: ${accessUrl}`);
  console.log('\n📱 QUÉT MÃ QR BẰNG CAMERA ĐIỆN THOẠI ĐỂ MỞ APP:\n');

  try {
    const qrString = await QRCode.toString(accessUrl, { type: 'terminal', small: true });
    console.log(qrString);
  } catch (err) {
    console.log('Không thể tạo mã QR ASCII:', err.message);
  }

  console.log('------------------------------------------------------');
  console.log('💡 HƯỚNG DẪN CÀI ĐẶT LÊN ĐIỆN THOẠI ANDROID:');
  console.log(`1. Dùng 2 điện thoại cùng bắt Wi-Fi, truy cập: ${accessUrl}`);
  console.log('2. Bấm "Cài đặt ứng dụng" (hoặc menu Chrome chọn "Thêm vào Màn hình chính")');
  console.log('3. Điện thoại 1 chọn "Bé Yêu" | Điện thoại 2 chọn "Bố Mẹ"');
  console.log('======================================================\n');
});

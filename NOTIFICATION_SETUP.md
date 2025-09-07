# Hướng dẫn thiết lập thông báo Zalo/Telegram

## Tổng quan
Hệ thống thông báo tự động sẽ gửi thông tin đơn hàng đến Zalo hoặc Telegram khi khách hàng thanh toán thành công.

## Cấu hình Telegram Bot

### Bước 1: Tạo Telegram Bot
1. Mở Telegram và tìm kiếm `@BotFather`
2. Gửi lệnh `/newbot`
3. Đặt tên cho bot (ví dụ: "Shop Premium Bot")
4. Đặt username cho bot (ví dụ: "shop_premium_bot")
5. BotFather sẽ cung cấp **Bot Token** (dạng: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Bước 2: Lấy Chat ID
1. Gửi tin nhắn cho bot vừa tạo
2. Truy cập: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
3. Tìm `"chat":{"id":` trong response để lấy Chat ID

### Bước 3: Cấu hình trong ứng dụng
Tạo file `.env` trong thư mục gốc với nội dung:
```env
VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here
VITE_TELEGRAM_CHAT_ID=your_chat_id_here
```

## Cấu hình Zalo Webhook

### Bước 1: Tạo Zalo App
1. Truy cập [Zalo Developers](https://developers.zalo.me/)
2. Tạo ứng dụng mới
3. Lấy **App ID** và **App Secret**

### Bước 2: Thiết lập Webhook
1. Tạo endpoint webhook để nhận thông báo
2. Cấu hình webhook URL trong Zalo App settings
3. Thêm vào file `.env`:
```env
VITE_ZALO_WEBHOOK_URL=https://your-webhook-url.com/zalo-webhook
```

## Cấu hình Webhook Endpoint (Tùy chọn)

Nếu bạn muốn tự tạo webhook endpoint, đây là ví dụ:

### Node.js/Express
```javascript
app.post('/zalo-webhook', (req, res) => {
  const { message, orderData } = req.body;
  
  // Gửi tin nhắn đến Zalo
  // Implementation depends on your Zalo integration
  
  res.json({ success: true });
});
```

### PHP
```php
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $message = $data['message'];
    $orderData = $data['orderData'];
    
    // Gửi tin nhắn đến Zalo
    // Implementation depends on your Zalo integration
    
    echo json_encode(['success' => true]);
}
?>
```

## Kiểm tra cấu hình

1. Khởi động ứng dụng với cấu hình đã thiết lập
2. Thực hiện một đơn hàng test
3. Kiểm tra Telegram/Zalo để xem thông báo có được gửi không

## Lưu ý bảo mật

- Không commit file `.env` vào git
- Sử dụng HTTPS cho webhook URLs
- Bảo mật bot token và chat ID
- Có thể thêm authentication cho webhook endpoints

## Troubleshooting

### Telegram không nhận được thông báo
- Kiểm tra bot token và chat ID
- Đảm bảo bot đã được start
- Kiểm tra console logs để xem lỗi

### Zalo webhook không hoạt động
- Kiểm tra webhook URL có thể truy cập được không
- Kiểm tra SSL certificate
- Xem logs của webhook endpoint

### Thông báo không được gửi
- Kiểm tra network connection
- Xem console logs trong browser
- Kiểm tra cấu hình environment variables

// Notification service for sending order notifications via Zalo/Telegram
export interface OrderData {
  orderId: string;
  customerName: string;
  customerZalo: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    credentials?: {
      email?: string;
      password?: string;
      twofa?: string;
    };
  }>;
  total: number;
  accountEmail?: string;
  accountPassword?: string;
  accountTwoFA?: string;
  timestamp: string;
  // Optional collaborator info
  collaboratorRef?: string;
  collaboratorName?: string;
  collaboratorEmail?: string;
  collaboratorPhone?: string;
}

export interface NotificationConfig {
  zaloWebhook?: string;
  telegramBotToken?: string;
  telegramChatId?: string;
}

class NotificationService {
  private config: NotificationConfig;

  constructor(config: NotificationConfig) {
    this.config = config;
  }

  // Format order data for notification
  private formatOrderMessage(orderData: OrderData): string {
    const { orderId, customerName, customerZalo, items, total, timestamp } = orderData;
    
    let message = `🛒 *ĐƠN HÀNG MỚI* 🛒\n\n`;
    message += `📋 Mã đơn hàng: *${orderId}*\n`;
    message += `👤 Khách hàng: *${customerName}*\n`;
    message += `📱 Zalo: *${customerZalo}*\n`;
    message += `🕐 Thời gian: *${timestamp}*\n\n`;
    if (orderData.collaboratorRef) {
      message += `🤝 *CỘNG TÁC VIÊN GIỚI THIỆU*\n`;
      message += `   Mã ref: ${orderData.collaboratorRef}\n`;
      if (orderData.collaboratorName) message += `   Tên: ${orderData.collaboratorName}\n`;
      if (orderData.collaboratorEmail) message += `   Email: ${orderData.collaboratorEmail}\n`;
      if (orderData.collaboratorPhone) message += `   SĐT: ${orderData.collaboratorPhone}\n`;
      message += `\n`;
    }
    
    message += `📦 *CHI TIẾT ĐƠN HÀNG:*\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Số lượng: ${item.quantity}\n`;
      message += `   Giá: ${this.formatCurrency(item.price)}\n\n`;
      if (item.credentials && (item.credentials.email || item.credentials.password || item.credentials.twofa)) {
        message += `   🔐 Tài khoản:\n`;
        if (item.credentials.email) message += `      Email: ${item.credentials.email}\n`;
        if (item.credentials.password) message += `      Mật khẩu: ${item.credentials.password}\n`;
        if (item.credentials.twofa) message += `      Mã 2FA: ${item.credentials.twofa}\n`;
        message += `\n`;
      }
    });
    
    message += `💰 *TỔNG TIỀN: ${this.formatCurrency(total)}*\n\n`;
    message += `✅ Đơn hàng đã được thanh toán thành công!\n`;
    message += `🚀 Vui lòng xử lý và giao hàng cho khách hàng.`;

    return message;
  }

  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat("vi-VN", { 
      style: "currency", 
      currency: "VND" 
    }).format(amount);
  }

  // Send notification to Zalo (via webhook)
  async sendZaloNotification(orderData: OrderData): Promise<boolean> {
    if (!this.config.zaloWebhook) {
      console.warn('Zalo webhook not configured');
      return false;
    }

    try {
      const message = this.formatOrderMessage(orderData);
      
      const response = await fetch(this.config.zaloWebhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          orderData: orderData
        }),
      });

      if (response.ok) {
        console.log('Zalo notification sent successfully');
        return true;
      } else {
        console.error('Failed to send Zalo notification:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error sending Zalo notification:', error);
      return false;
    }
  }

  // Send notification to Telegram
  async sendTelegramNotification(orderData: OrderData): Promise<boolean> {
    if (!this.config.telegramBotToken || !this.config.telegramChatId) {
      console.warn('Telegram bot not configured');
      return false;
    }

    try {
      const message = this.formatOrderMessage(orderData);
      const telegramApiUrl = `https://api.telegram.org/bot${this.config.telegramBotToken}/sendMessage`;
      
      const response = await fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.config.telegramChatId,
          text: message,
          parse_mode: 'Markdown'
        }),
      });

      if (response.ok) {
        console.log('Telegram notification sent successfully');
        return true;
      } else {
        console.error('Failed to send Telegram notification:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error sending Telegram notification:', error);
      return false;
    }
  }

  // Send notifications to all configured channels
  async sendOrderNotification(orderData: OrderData): Promise<{
    zalo: boolean;
    telegram: boolean;
  }> {
    // Send only Telegram (per current configuration)
    const telegram = await this.sendTelegramNotification(orderData);
    return { zalo: false, telegram };
  }
}

// Create notification service instance
// You can configure these values via environment variables or a config file
const notificationService = new NotificationService({
  // Configure these values based on your setup
  zaloWebhook: import.meta.env.VITE_ZALO_WEBHOOK_URL,
  telegramBotToken: import.meta.env.VITE_TELEGRAM_BOT_TOKEN,
  telegramChatId: import.meta.env.VITE_TELEGRAM_CHAT_ID,
});

export default notificationService;

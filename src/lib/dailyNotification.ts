import notificationService from './notification';

export interface ExpiringAccount {
  id: string;
  contactInfo: {
    name: string;
    email?: string;
    phone?: string;
    zalo?: string;
  };
  accountType: string;
  endDate: string;
  daysLeft: number;
}

class DailyNotificationService {
  private isRunning = false;
  private intervalId: NodeJS.Timeout | null = null;

  // Check for expiring accounts and send notification
  async checkExpiringAccounts(accounts: ExpiringAccount[]): Promise<void> {
    if (accounts.length === 0) {
      console.log('No expiring accounts found');
      return;
    }

    try {
      const message = this.formatExpiringAccountsMessage(accounts);
      
      // Send to Telegram
      const telegramSent = await notificationService.sendTelegramNotification({
        orderId: `EXPIRING_${Date.now()}`,
        customerName: 'System',
        customerZalo: 'N/A',
        items: accounts.map(account => ({
          name: `${account.accountType} - ${account.contactInfo.name}`,
          quantity: 1,
          price: 0,
        })),
        total: 0,
        timestamp: new Date().toLocaleString('vi-VN', {
          timeZone: 'Asia/Ho_Chi_Minh',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      }).catch(error => {
        console.error('Error sending Telegram notification:', error);
        return false;
      });

      if (telegramSent) {
        console.log(`Sent expiring accounts notification for ${accounts.length} accounts`);
      } else {
        console.error('Failed to send expiring accounts notification');
      }
    } catch (error) {
      console.error('Error sending expiring accounts notification:', error);
    }
  }

  private formatExpiringAccountsMessage(accounts: ExpiringAccount[]): string {
    let message = `⚠️ *CẢNH BÁO TÀI KHOẢN SẮP HẾT HẠN* ⚠️\n\n`;
    message += `📅 Ngày kiểm tra: ${new Date().toLocaleDateString('vi-VN')}\n`;
    message += `🔢 Số tài khoản sắp hết hạn: *${accounts.length}*\n\n`;
    
    message += `📋 *DANH SÁCH TÀI KHOẢN:*\n`;
    accounts.forEach((account, index) => {
      message += `${index + 1}. *${account.accountType}*\n`;
      message += `   👤 Khách hàng: ${account.contactInfo.name}\n`;
      if (account.contactInfo.email) {
        message += `   📧 Email: ${account.contactInfo.email}\n`;
      }
      if (account.contactInfo.zalo) {
        message += `   📱 Zalo: ${account.contactInfo.zalo}\n`;
      }
      message += `   📅 Hết hạn: ${new Date(account.endDate).toLocaleDateString('vi-VN')}\n`;
      message += `   ⏰ Còn lại: *${account.daysLeft} ngày*\n\n`;
    });
    
    message += `🚨 *HÀNH ĐỘNG CẦN THIẾT:*\n`;
    message += `• Liên hệ khách hàng để gia hạn\n`;
    message += `• Chuẩn bị tài khoản thay thế\n`;
    message += `• Cập nhật trạng thái trong hệ thống`;

    return message;
  }

  // Start daily check at 7:00 AM
  startDailyCheck(getAccountsCallback: () => ExpiringAccount[]): void {
    if (this.isRunning) {
      console.log('Daily notification service is already running');
      return;
    }

    this.isRunning = true;
    console.log('Starting daily notification service...');

    // Calculate time until next 7:00 AM
    const now = new Date();
    const next7AM = new Date();
    next7AM.setHours(7, 0, 0, 0);
    
    // If it's already past 7:00 AM today, schedule for tomorrow
    if (now >= next7AM) {
      next7AM.setDate(next7AM.getDate() + 1);
    }

    const timeUntilNext = next7AM.getTime() - now.getTime();
    
    // Set initial timeout
    setTimeout(() => {
      this.performDailyCheck(getAccountsCallback);
      
      // Then set interval for every 24 hours
      this.intervalId = setInterval(() => {
        this.performDailyCheck(getAccountsCallback);
      }, 24 * 60 * 60 * 1000); // 24 hours
    }, timeUntilNext);

    console.log(`Next daily check scheduled for: ${next7AM.toLocaleString()}`);
  }

  private async performDailyCheck(getAccountsCallback: () => ExpiringAccount[]): Promise<void> {
    console.log('Performing daily expiring accounts check...');
    
    try {
      const expiringAccounts = getAccountsCallback();
      await this.checkExpiringAccounts(expiringAccounts);
    } catch (error) {
      console.error('Error during daily check:', error);
    }
  }

  // Stop daily check
  stopDailyCheck(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    console.log('Daily notification service stopped');
  }

  // Manual check (for testing)
  async manualCheck(getAccountsCallback: () => ExpiringAccount[]): Promise<void> {
    console.log('Performing manual expiring accounts check...');
    const expiringAccounts = getAccountsCallback();
    await this.checkExpiringAccounts(expiringAccounts);
  }
}

// Create singleton instance
const dailyNotificationService = new DailyNotificationService();

export default dailyNotificationService;

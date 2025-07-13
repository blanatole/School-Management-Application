import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Simple data interfaces
interface RecentActivity {
  icon: string;
  title: string;
  time: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  // Recent activities data - loaded from backend
  recentActivities: RecentActivity[] = [];

  // Dynamic user count for demonstration
  private onlineUserCount: number = 24;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Initialize component
    this.loadRecentActivities();
    this.startUserCountAnimation();
  }

  private loadRecentActivities(): void {
    // In a real application, this would fetch data from a service
    // For now, we use the static data defined above
  }

  // Get current time for status display
  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // Get current date for header display
  getCurrentDate(): string {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Get online users count with dynamic variation
  getOnlineUsers(): number {
    return this.onlineUserCount;
  }

  // Simulate dynamic user count changes
  private startUserCountAnimation(): void {
    setInterval(() => {
      // Randomly vary the user count between 20-30 for demonstration
      const variation = Math.floor(Math.random() * 11) - 5; // -5 to +5
      this.onlineUserCount = Math.max(15, Math.min(35, 24 + variation));
    }, 30000); // Update every 30 seconds
  }

  // Navigation helper method (if needed for programmatic navigation)
  navigateTo(route: string): void {
    if (route) {
      this.router.navigate([route]);
    }
  }

  // Get formatted welcome message based on time of day
  getWelcomeMessage(): string {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Chào buổi sáng! Chúc bạn một ngày làm việc hiệu quả.';
    } else if (hour < 18) {
      return 'Chào buổi chiều! Hy vọng công việc của bạn đang suôn sẻ.';
    } else {
      return 'Chào buổi tối! Cảm ơn bạn đã dành thời gian cho hệ thống.';
    }
  }

  // Get system status color
  getSystemStatusColor(): string {
    // In a real application, this would check actual system health
    return 'success'; // 'success', 'warning', 'error'
  }

  // Format number with thousand separators
  formatNumber(num: number): string {
    return num.toLocaleString('vi-VN');
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../Services/student.service';
import { StandardService } from '../../Services/standard.service';

// Simple data interfaces
interface RecentActivity {
  icon: string;
  title: string;
  time: string;
}

interface HomepageStats {
  totalStudents: number;
  totalClasses: number;
  onlineUsers: number;
  systemStatus: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  // Recent activities data - loaded from backend
  recentActivities: RecentActivity[] = [];
  
  // Homepage statistics
  homepageStats: HomepageStats = {
    totalStudents: 0,
    totalClasses: 0,
    onlineUsers: 0,
    systemStatus: 'online'
  };
  
  isLoadingStats = true;

  // Dynamic user count for demonstration
  private onlineUserCount: number = 24;

  constructor(
    private router: Router,
    private studentService: StudentService,
    private standardService: StandardService
  ) { }

  ngOnInit(): void {
    console.log('Homepage component initialized');
    // Initialize component
    this.loadHomepageStats();
    this.loadRecentActivities();
    this.startUserCountAnimation();
  }

  private loadHomepageStats(): void {
    console.log('Loading homepage stats...');
    this.isLoadingStats = true;
    
    // Load students count
    this.studentService.GetStudents().subscribe({
      next: (students) => {
        console.log('Students loaded:', students.length);
        this.homepageStats.totalStudents = students.length;
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.homepageStats.totalStudents = 0;
        this.checkLoadingComplete();
      }
    });

    // Load standards/classes count
    this.standardService.getStandards().subscribe({
      next: (standards) => {
        console.log('Standards loaded:', standards.length);
        this.homepageStats.totalClasses = standards.length;
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error loading standards:', error);
        this.homepageStats.totalClasses = 0;
        this.checkLoadingComplete();
      }
    });
  }

  private checkLoadingComplete(): void {
    setTimeout(() => {
      this.isLoadingStats = false;
    }, 500);
  }

  private loadRecentActivities(): void {
    // In a real application, this would fetch data from a service
    this.recentActivities = [
      {
        icon: 'school',
        title: 'Hệ thống đã được khởi động và sẵn sàng phục vụ',
        time: this.getRandomTimeAgo()
      },
      {
        icon: 'people',
        title: 'Dữ liệu học sinh đã được đồng bộ thành công',
        time: this.getRandomTimeAgo()
      },
      {
        icon: 'class',
        title: 'Thông tin lớp học đã được cập nhật',
        time: this.getRandomTimeAgo()
      }
    ];
  }

  private getRandomTimeAgo(): string {
    const timeOptions = [
      'Vừa xong',
      '5 phút trước',
      '15 phút trước',
      '1 giờ trước',
      'Sáng nay'
    ];
    return timeOptions[Math.floor(Math.random() * timeOptions.length)];
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

  // Get total students count
  getTotalStudents(): number {
    return this.homepageStats.totalStudents;
  }

  // Get total classes count
  getTotalClasses(): number {
    return this.homepageStats.totalClasses;
  }

  // Get online users count with dynamic variation
  getOnlineUsers(): number {
    return this.onlineUserCount;
  }

  // Get student per class ratio
  getStudentPerClass(): number {
    if (this.homepageStats.totalClasses === 0) return 0;
    return Math.round(this.homepageStats.totalStudents / this.homepageStats.totalClasses);
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

  // Check if data is loading
  isStatsLoading(): boolean {
    return this.isLoadingStats;
  }
}

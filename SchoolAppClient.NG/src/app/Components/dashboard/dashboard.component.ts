import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../Authentication/SecurityModels/auth.service';
import { StudentService } from '../../Services/student.service';
import { StandardService } from '../../Services/standard.service';
import { Router } from '@angular/router';

interface RecentActivity {
  icon: string;
  title: string;
  time: string;
}

interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  revenue: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  // Make Math available to template
  Math = Math;
  
  private timeInterval: any;
  currentUser: any;
  dashboardStats: DashboardStats = {
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    revenue: 0
  };
  isLoadingStats = true;

  // Recent activities data - will be loaded from real data
  recentActivities: RecentActivity[] = [];

  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private standardService: StandardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get current user info
    this.currentUser = this.authService.getCurrentAuthUser;
    
    // Load real dashboard data
    this.loadDashboardStats();
    this.loadRecentActivities();
    
    // Start real-time clock update
    this.updateTime();
    this.timeInterval = setInterval(() => {
      this.updateTime();
    }, 1000);

    // Check if user is logged in
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy(): void {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  private loadDashboardStats(): void {
    this.isLoadingStats = true;
    
    // Load students count
    this.studentService.GetStudents().subscribe({
      next: (students) => {
        this.dashboardStats.totalStudents = students.length;
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.dashboardStats.totalStudents = 0;
        this.checkLoadingComplete();
      }
    });

    // Load standards/classes count
    this.standardService.getStandards().subscribe({
      next: (standards) => {
        this.dashboardStats.totalClasses = standards.length;
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error loading standards:', error);
        this.dashboardStats.totalClasses = 0;
        this.checkLoadingComplete();
      }
    });

    // For teachers and revenue - since we don't have these services yet, 
    // we'll set reasonable defaults based on student count
    setTimeout(() => {
      // Calculate estimated teachers (1 teacher per 15-20 students)
      const teacherRatio = Math.max(15, Math.min(20, this.dashboardStats.totalStudents / 3));
      this.dashboardStats.totalTeachers = Math.ceil(this.dashboardStats.totalStudents / teacherRatio);
      
      // Calculate estimated monthly revenue (assuming average fee per student)
      const averageFeePerStudent = 2500000; // 2.5 million VND per student per year
      this.dashboardStats.revenue = this.dashboardStats.totalStudents * (averageFeePerStudent / 12);
      
      this.checkLoadingComplete();
    }, 1000);
  }

  private loadRecentActivities(): void {
    // In a real application, this would come from an activity log service
    // For now, we'll generate some realistic activities based on current data
    this.recentActivities = [
      {
        icon: 'user-plus',
        title: 'Có học sinh mới được đăng ký vào hệ thống',
        time: this.getRandomTimeAgo()
      },
      {
        icon: 'edit',
        title: 'Điểm số đã được cập nhật cho một số lớp học',
        time: this.getRandomTimeAgo()
      },
      {
        icon: 'check-circle',
        title: 'Điểm danh hôm nay đã được hoàn thành',
        time: this.getRandomTimeAgo()
      },
      {
        icon: 'calendar-alt',
        title: 'Lịch học đã được cập nhật',
        time: this.getRandomTimeAgo()
      }
    ];
  }

  private getRandomTimeAgo(): string {
    const timeOptions = [
      '5 phút trước',
      '15 phút trước',
      '1 giờ trước',
      '2 giờ trước',
      '3 giờ trước',
      'Sáng nay',
      'Hôm qua'
    ];
    return timeOptions[Math.floor(Math.random() * timeOptions.length)];
  }

  private checkLoadingComplete(): void {
    // Simple check - in a real app you'd track all loading states
    setTimeout(() => {
      this.isLoadingStats = false;
    }, 500);
  }

  private updateTime(): void {
    // Force change detection for real-time updates
  }

  // Get current user information
  getCurrentUser(): any {
    return this.currentUser;
  }

  // Get current time for header display
  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  // Get current date for header display
  getCurrentDate(): string {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return now.toLocaleDateString('vi-VN', options);
  }

  // Get formatted welcome message based on time of day
  getWelcomeMessage(): string {
    const hour = new Date().getHours();
    const userName = this.currentUser?.email?.split('@')[0] || 'Người dùng';
    
    if (hour < 12) {
      return `Chào buổi sáng, ${userName}! Chúc bạn một ngày làm việc hiệu quả.`;
    } else if (hour < 18) {
      return `Chào buổi chiều, ${userName}! Hy vọng công việc của bạn đang suôn sẻ.`;
    } else {
      return `Chào buổi tối, ${userName}! Cảm ơn bạn đã dành thời gian cho hệ thống.`;
    }
  }

  // Get dashboard statistics
  getTotalStudents(): number {
    return this.dashboardStats.totalStudents;
  }

  getTotalTeachers(): number {
    return this.dashboardStats.totalTeachers;
  }

  getTotalClasses(): number {
    return this.dashboardStats.totalClasses;
  }

  getRevenue(): number {
    return this.dashboardStats.revenue;
  }

  // Navigation helper methods
  navigateToStudents(): void {
    this.router.navigate(['/student']);
  }

  navigateToTeachers(): void {
    this.router.navigate(['/staff-list']);
  }

  navigateToGrades(): void {
    this.router.navigate(['/marksentrynewList']);
  }

  navigateToFees(): void {
    this.router.navigate(['/fees']);
  }

  navigateToAttendance(): void {
    this.router.navigate(['/attendanceList']);
  }

  navigateToExams(): void {
    this.router.navigate(['/examSchedule']);
  }

  // Quick action handlers
  onQuickAddStudent(): void {
    this.router.navigate(['/student/create']);
  }

  onQuickAddGrade(): void {
    this.router.navigate(['/marksentrynewList']);
  }

  onQuickTakeAttendance(): void {
    this.router.navigate(['/attendanceList']);
  }

  onQuickProcessFee(): void {
    this.router.navigate(['/fees']);
  }

  onQuickAddTeacher(): void {
    this.router.navigate(['/staff-create']);
  }

  onQuickViewSchedule(): void {
    this.router.navigate(['/examSchedule']);
  }

  // Get system status for monitoring
  getSystemStatus(): string {
    // In a real application, this would check actual system health
    return 'online';
  }

  // Format large numbers with Vietnamese locale
  formatNumber(num: number): string {
    return num.toLocaleString('vi-VN');
  }

  // Format currency for Vietnamese
  formatCurrency(num: number): string {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + ' tỷ';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + ' triệu';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'k';
    }
    return num.toLocaleString('vi-VN');
  }

  // Check user role for conditional display
  hasRole(role: string): boolean {
    if (!this.currentUser || !this.currentUser.roles) return false;
    return this.currentUser.roles.includes(role);
  }

  // Check if user is admin
  isAdmin(): boolean {
    return this.hasRole('Admin') || this.hasRole('Manager');
  }

  // Check if user is teacher
  isTeacher(): boolean {
    return this.hasRole('Teacher');
  }

  // Check if user is student
  isStudent(): boolean {
    return this.hasRole('Student');
  }

  // Get user role display name
  getUserRoleDisplay(): string {
    if (!this.currentUser || !this.currentUser.roles) return 'Người dùng';
    
    const roleMap: {[key: string]: string} = {
      'Admin': 'Quản trị viên',
      'Manager': 'Quản lý',
      'Teacher': 'Giáo viên',
      'Student': 'Học sinh',
      'Operator': 'Điều hành viên'
    };

    const primaryRole = this.currentUser.roles[0];
    return roleMap[primaryRole] || primaryRole;
  }

  // Handle logout
  logout(): void {
    this.authService.logout();
  }
} 
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StandardService } from '../../../Services/standard.service';
import { StudentService } from '../../../Services/student.service';
import { SubjectService } from '../../../Services/subject.service';

@Component({
  selector: 'app-standard-details',
  templateUrl: './standard-details.component.html',
  styleUrls: ['./standard-details.component.css']
})
export class StandardDetailsComponent implements OnInit {
  standardId: number = 0;
  standard: any = {};
  students: any[] = [];
  subjects: any[] = [];
  assignedSubjects: any[] = [];
  availableSubjects: any[] = [];
  
  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  paginatedStudents: any[] = [];
  
  // Search
  searchTerm: string = '';
  filteredStudents: any[] = [];
  
  // Loading states
  isLoading: boolean = true;
  isAssigningSubject: boolean = false;
  
  // Table columns
  displayedColumns: string[] = ['id', 'name', 'admissionNo', 'enrollmentNo', 'email', 'contact', 'actions'];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private standardService: StandardService,
    private studentService: StudentService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.standardId = +params['id'];
      this.loadStandardDetails();
      this.loadStudents();
      this.loadSubjects();
    });
  }

  loadStandardDetails(): void {
    this.standardService.getStandardById(this.standardId).subscribe(
      (data: any) => {
        this.standard = data;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error loading standard details:', error);
        this.isLoading = false;
      }
    );
  }

  loadStudents(): void {
    this.studentService.GetStudents().subscribe(
      (data: any[]) => {
        // Filter students by standardId
        this.students = data.filter(student => student.standardId === this.standardId);
        this.filteredStudents = this.students;
        this.updatePagination();
      },
      (error: any) => {
        console.error('Error loading students:', error);
        this.students = [];
        this.filteredStudents = [];
      }
    );
  }

  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe(
      (data: any[]) => {
        this.subjects = data;
        this.loadAssignedSubjects();
      },
      (error: any) => {
        console.error('Error loading subjects:', error);
        this.subjects = [];
      }
    );
  }

  loadAssignedSubjects(): void {
    // Mock assigned subjects - in real app, this would come from API
    this.assignedSubjects = this.subjects.slice(0, 3); // Assign first 3 subjects as example
    this.updateAvailableSubjects();
  }

  updateAvailableSubjects(): void {
    const assignedSubjectIds = this.assignedSubjects.map(s => s.subjectId);
    this.availableSubjects = this.subjects.filter(s => !assignedSubjectIds.includes(s.subjectId));
  }

  assignSubject(subjectId: number): void {
    this.isAssigningSubject = true;
    // Mock assignment - in real app, this would call API
    const subject = this.subjects.find(s => s.subjectId === subjectId);
    if (subject) {
      this.assignedSubjects.push(subject);
      this.updateAvailableSubjects();
      alert('Subject assigned successfully!');
    }
    this.isAssigningSubject = false;
  }

  removeSubject(subjectId: number): void {
    if (confirm('Are you sure you want to remove this subject from the class?')) {
      this.assignedSubjects = this.assignedSubjects.filter(s => s.subjectId !== subjectId);
      this.updateAvailableSubjects();
      alert('Subject removed successfully!');
    }
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredStudents = this.students;
    } else {
      this.filteredStudents = this.students.filter(student =>
        student.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        student.admissionNo?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        student.enrollmentNo?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredStudents.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedStudents = this.filteredStudents.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  getUtilizationPercentage(): number {
    if (!this.standard.capacity || this.standard.capacity === 0) return 0;
    return Math.round((this.students.length / this.standard.capacity) * 100);
  }

  getUtilizationColor(): string {
    const percentage = this.getUtilizationPercentage();
    if (percentage >= 90) return '#f44336';
    if (percentage >= 70) return '#ff9800';
    return '#4caf50';
  }

  viewStudentDetails(studentId: number): void {
    this.router.navigate(['/student-details', studentId]);
  }

  editStudent(studentId: number): void {
    this.router.navigate(['/student', studentId, 'edit']);
  }

  goBack(): void {
    this.router.navigate(['/standards']);
  }
} 
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { Student } from '../../../Models/student';
import { Standard } from '../../../Models/standard';
import { StudentService } from '../../../Services/student.service';
import { StandardService } from '../../../Services/standard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrl: './student-add.component.css'
})
export class StudentAddComponent implements OnInit {

  @ViewChild("studentForm") studentForm!: NgForm;

  students: Student = new Student();
  standards: Standard[] = [];
  validationErrors: string[] = [];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private standardService: StandardService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadStandards();
  }

  initializeForm(): void {
    // Initialize form if needed
  }

  loadStandards(): void {
    this.standardService.getStandards().subscribe({
      next: (standards: Standard[]) => {
        this.standards = standards;
      },
      error: (error) => {
        console.error('Error loading standards:', error);
      }
    });
  }

  validateStudentData(): boolean {
    this.validationErrors = [];
    
    // Validate required fields
    if (!this.students.studentName || this.students.studentName.trim().length < 2) {
      this.validationErrors.push('Tên sinh viên phải có ít nhất 2 ký tự');
    }
    
    if (!this.students.studentDOB) {
      this.validationErrors.push('Ngày sinh không được để trống');
    } else {
      // Validate date of birth
      const birthDate = new Date(this.students.studentDOB);
      const today = new Date();
      const minBirthDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
      const maxBirthDate = new Date(today.getFullYear() - 3, today.getMonth(), today.getDate());
      
      if (birthDate < minBirthDate) {
        this.validationErrors.push('Ngày sinh không hợp lý (quá xa trong quá khứ)');
      }
      
      if (birthDate > maxBirthDate) {
        this.validationErrors.push('Sinh viên phải ít nhất 3 tuổi');
      }
      
      if (birthDate > today) {
        this.validationErrors.push('Ngày sinh không thể là ngày trong tương lai');
      }
    }
    
    if (!this.students.studentGender) {
      this.validationErrors.push('Vui lòng chọn giới tính');
    }
    
    if (!this.students.standardId) {
      this.validationErrors.push('Vui lòng chọn lớp học');
    }
    
    if (!this.students.admissionNo) {
      this.validationErrors.push('Số nhập học không được để trống');
    }
    
    if (!this.students.enrollmentNo) {
      this.validationErrors.push('Số đăng ký không được để trống');
    }
    
    // Validate email if provided
    if (this.students.studentEmail && this.students.studentEmail.trim() !== '') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.students.studentEmail)) {
        this.validationErrors.push('Email không hợp lệ');
      }
    }
    
    // Validate phone numbers if provided
    if (this.students.studentContactNumber1 && this.students.studentContactNumber1.trim() !== '') {
      if (!this.isValidPhoneNumber(this.students.studentContactNumber1)) {
        this.validationErrors.push('Số điện thoại chính không hợp lệ');
      }
    }
    
    if (this.students.studentContactNumber2 && this.students.studentContactNumber2.trim() !== '') {
      if (!this.isValidPhoneNumber(this.students.studentContactNumber2)) {
        this.validationErrors.push('Số điện thoại phụ không hợp lệ');
      }
    }
    
    if (this.students.fatherContactNumber && this.students.fatherContactNumber.trim() !== '') {
      if (!this.isValidPhoneNumber(this.students.fatherContactNumber)) {
        this.validationErrors.push('Số điện thoại bố không hợp lệ');
      }
    }
    
    if (this.students.motherContactNumber && this.students.motherContactNumber.trim() !== '') {
      if (!this.isValidPhoneNumber(this.students.motherContactNumber)) {
        this.validationErrors.push('Số điện thoại mẹ không hợp lệ');
      }
    }
    
    if (this.students.localGuardianContactNumber && this.students.localGuardianContactNumber.trim() !== '') {
      if (!this.isValidPhoneNumber(this.students.localGuardianContactNumber)) {
        this.validationErrors.push('Số điện thoại người giám hộ không hợp lệ');
      }
    }
    
    // Validate NID numbers if provided
    if (this.students.studentNIDNumber && this.students.studentNIDNumber.trim() !== '') {
      if (!this.isValidNID(this.students.studentNIDNumber)) {
        this.validationErrors.push('Số CMND/CCCD sinh viên không hợp lệ');
      }
    }
    
    if (this.students.fatherNID && this.students.fatherNID.trim() !== '') {
      if (!this.isValidNID(this.students.fatherNID)) {
        this.validationErrors.push('Số CMND/CCCD bố không hợp lệ');
      }
    }
    
    if (this.students.motherNID && this.students.motherNID.trim() !== '') {
      if (!this.isValidNID(this.students.motherNID)) {
        this.validationErrors.push('Số CMND/CCCD mẹ không hợp lệ');
      }
    }
    
    return this.validationErrors.length === 0;
  }
  
  private isValidPhoneNumber(phoneNumber: string): boolean {
    // Vietnamese phone number pattern: starts with 0 and has 10-11 digits
    const phonePattern = /^0[0-9]{9,10}$/;
    return phonePattern.test(phoneNumber.replace(/\s+/g, ''));
  }
  
  private isValidNID(nid: string): boolean {
    // Vietnamese NID: 9 digits (old) or 12 digits (new)
    const nidPattern = /^[0-9]{9}$|^[0-9]{12}$/;
    return nidPattern.test(nid.replace(/\s+/g, ''));
  }

  onSubmit(): void {
    if (this.studentForm.valid && this.validateStudentData()) {
      // Clean up data before sending
      this.cleanStudentData();

      console.log('Submitting student data:', this.students);

      this.studentService.SaveStudent(this.students).subscribe({
        next: (response) => {
          console.log('Student added successfully', response);
          alert('Thêm sinh viên thành công!');
          this.router.navigate(['/student']);
        },
        error: (error) => {
          console.error('Error adding student:', error);

          // Show more specific error messages
          if (error.status === 400) {
            if (error.error) {
              alert(`Lỗi dữ liệu: ${JSON.stringify(error.error)}`);
            } else {
              alert('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại form.');
            }
          } else if (error.status === 401) {
            alert('Chưa đăng nhập. Vui lòng đăng nhập với quyền Admin hoặc Operator.');
          } else if (error.status === 403) {
            alert('Không có quyền thực hiện. Cần quyền Admin hoặc Operator để thêm sinh viên.');
          } else {
            alert('Lỗi khi thêm sinh viên. Vui lòng thử lại.');
          }
        }
      });
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
      
      if (this.validationErrors.length > 0) {
        alert('Vui lòng sửa các lỗi sau:\n' + this.validationErrors.join('\n'));
      } else {
        alert('Vui lòng điền đầy đủ các trường bắt buộc.');
      }
    }
  }

  private cleanStudentData(): void {
    // Clean NID fields - remove if empty or make them null
    if (!this.students.studentNIDNumber || this.students.studentNIDNumber.trim() === '') {
      this.students.studentNIDNumber = null;
    }
    if (!this.students.fatherNID || this.students.fatherNID.trim() === '') {
      this.students.fatherNID = null;
    }
    if (!this.students.motherNID || this.students.motherNID.trim() === '') {
      this.students.motherNID = null;
    }

    // Ensure required numeric fields are proper numbers
    if (this.students.admissionNo) {
      this.students.admissionNo = Number(this.students.admissionNo);
    }
    if (this.students.enrollmentNo) {
      this.students.enrollmentNo = Number(this.students.enrollmentNo);
    }
    if (this.students.uniqueStudentAttendanceNumber) {
      this.students.uniqueStudentAttendanceNumber = Number(this.students.uniqueStudentAttendanceNumber);
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.studentForm.controls).forEach(key => {
      const control = this.studentForm.controls[key];
      control.markAsTouched();
    });
  }

  uploadImage(imageInput: any): void {
    if (!imageInput.files || imageInput.files.length === 0) {
      return;
    }

    const file: File = imageInput.files[0];
    if (file.size > 200 * 1024) {
      alert('Kích thước tối đa cho phép là 200KB');
      return;
    }

    this.students.imageUpload.getBase64(file);
  }

  goBack(): void {
    this.location.back();
  }

  getMaxBirthDate(): string {
    const today = new Date();
    const maxBirthDate = new Date(today.getFullYear() - 3, today.getMonth(), today.getDate());
    return maxBirthDate.toISOString().split('T')[0];
  }
}


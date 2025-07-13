import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarksListComponent } from './Components/marks/marks-list/marks-list.component';
import { MarksAddComponent } from './Components/marks/marks-add/marks-add.component';
import { MarksEditComponent } from './Components/marks/marks-edit/marks-edit.component';
import { MarksDeleteComponent } from './Components/marks/marks-delete/marks-delete.component';
import { AttendanceListComponent } from './Components/attendance/attendance-list/attendance-list.component';
import { AttendanceAddComponent } from './Components/attendance/attendance-add/attendance-add.component';
import { FeeListComponent } from './Components/fee/fee-list/fee-list.component';
import { FeeEditComponent } from './Components/fee/fee-edit/fee-edit.component';
import { FeeCreateComponent } from './Components/fee/fee-create/fee-create.component';
import { FeetypeListComponent } from './Components/feetype/feetype-list/feetype-list.component';
import { FeetypeEditComponent } from './Components/feetype/feetype-edit/feetype-edit.component';
import { FeetypeCreateComponent } from './Components/feetype/feetype-create/feetype-create.component';
import { MonthlypaymentListComponent } from './Components/monthlypayment/monthlypayment-list/monthlypayment-list.component';
import { MonthlypaymentEditComponent } from './Components/monthlypayment/monthlypayment-edit/monthlypayment-edit.component';
import { MonthlypaymentDetailsComponent } from './Components/monthlypayment/monthlypayment-details/monthlypayment-details.component';
import { MonthlypaymentCreatComponent } from './Components/monthlypayment/monthlypayment-create/monthlypayment-create.component';
import { StaffListComponent } from './Components/staff/staff-list/staff-list.component';
import { StaffCreateComponent } from './Components/staff/staff-create/staff-create.component';
import { StaffEditComponent } from './Components/staff/staff-edit/staff-edit.component';
import { StaffDetailsComponent } from './Components/staff/staff-details/staff-details.component';
import { StaffDeleteComponent } from './Components/staff/staff-delete/staff-delete.component';
import { DepartmentListComponent } from './Components/department/department-list/department-list.component';
import { DepartmentEditComponent } from './Components/department/department-edit/department-edit.component';
import { DepartmentCreateComponent } from './Components/department/department-create/department-create.component';
import { StaffSalaryListComponent } from './Components/staff-salary/staff-salary-list/staff-salary-list.component';
import { StaffSalaryCreateComponent } from './Components/staff-salary/staff-salary-create/staff-salary-create.component';
import { StaffSalaryEditComponent } from './Components/staff-salary/staff-salary-edit/staff-salary-edit.component';
import { ExamtypeListComponent } from './Components/examtype/examtype-list/examtype-list.component';
import { ExamtypeAddComponent } from './Components/examtype/examtype-add/examtype-add.component';
import { ExamtypeEditComponent } from './Components/examtype/examtype-edit/examtype-edit.component';
import { OtherpaymentListComponent } from './Components/other-payment/other-payment-list/other-payment-list.component';
import { OtherpaymentEditComponent } from './Components/other-payment/other-payment-edit/other-payment-edit.component';
import { OtherpaymentDetailsComponent } from './Components/other-payment/other-payment-details/other-payment-details.component';
import { OtherpaymentCreatComponent } from './Components/other-payment/other-payment-create/other-payment-create.component';
import { PaymentDetailsPerStudentComponent } from './Components/payment-details/payment-details-per-student/payment-details-per-student.component';
import { StandardListComponent } from './Components/standard/standard-list/standard-list.component';
import { StandardEditComponent } from './Components/standard/standard-edit/standard-edit.component';
import { StandardCreateComponent } from './Components/standard/standard-create/standard-create.component';
import { StandardDetailsComponent } from './Components/standard/standard-details/standard-details.component';
import { MarksnewEntryListComponent } from './Components/marks-new/marksnew-entry-list/marksnew-entry-list.component';
import { MarkEntryCreateComponent } from './Components/marks-new/marksnew-entry-create/marksnew-entry-create.component';
import { MarkEntryDetailsComponent } from './Components/marks-new/marksnew-entry-details/marksnew-entry-details.component';
import { MarksnewEntryDeleteComponent } from './Components/marks-new/marksnew-entry-delete/marksnew-entry-delete.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { MainComponent } from './Components/main/main.component';
import { ExamScheduleStandardsListComponent } from './Components/ExamScheduleStandards/exam-schedule-standards-list/exam-schedule-standards-list.component';
import { ExamScheduleStandardsEditComponent } from './Components/ExamScheduleStandards/exam-schedule-standards-edit/exam-schedule-standards-edit.component';
import { ExamScheduleStandardsCreateComponent } from './Components/ExamScheduleStandards/exam-schedule-standards-create/exam-schedule-standards-create.component';
import { ExamscheduleListComponent } from './Components/examschedule/examschedule-list/examschedule-list.component';
import { ExamscheduleEditComponent } from './Components/examschedule/examschedule-edit/examschedule-edit.component';
import { ExamscheduleAddComponent } from './Components/examschedule/examschedule-add/examschedule-add.component';
import { ListStudentComponent } from './Components/student/student-list/student-list.component';
import { StudentEditComponent } from './Components/student/student-edit/student-edit.component';
import { StudentDetailsComponent } from './Components/student/student-details/student-details.component';
import { StudentAddComponent } from './Components/student/student-add/student-add.component';
import { SubjectListComponent } from './Components/subject/subject-list/subject-list.component';
import { SubjectEditComponent } from './Components/subject/subject-edit/subject-edit.component';
import { SubjectAddComponent } from './Components/subject/subject-add/subject-add.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { RegistrationComponent } from './Authentication/SecurityComponents/registration/registration.component';
import { AssignRoleComponent } from './Authentication/SecurityComponents/assign-role/assign-role.component';
import { LoginComponent } from './Authentication/SecurityComponents/login/login.component';
import { RegisterComponent } from './Authentication/SecurityComponents/register/register.component';
import { ProfileComponent } from './Authentication/SecurityComponents/profile/profile.component';
import { RolesComponent } from './Authentication/SecurityComponents/roles/roles.component';
import { UsersComponent } from './Authentication/SecurityComponents/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'main', component: MainComponent },
  
  // Authentication routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'role-index', component: RolesComponent },
  { path: 'userlist', component: UsersComponent },
  { path: 'assignrole/:id', component: AssignRoleComponent },
  
  // Marks routes
  { path: 'marksList', component: MarksListComponent },
  { path: 'marks/add', component: MarksAddComponent },
  { path: 'marks/edit/:id', component: MarksEditComponent },
  { path: 'marks/delete/:id', component: MarksDeleteComponent },
  
  // Marks New routes
  { path: 'marksentrynewList', component: MarksnewEntryListComponent },
  { path: 'markNew-entry-create', component: MarkEntryCreateComponent },
  { path: 'markNew-entry-details/:id', component: MarkEntryDetailsComponent },
  { path: 'markNew-entry-delete/:id', component: MarksnewEntryDeleteComponent },
  
  // Attendance routes
  { path: 'attendanceList', component: AttendanceListComponent },
  { path: 'attendance/add', component: AttendanceAddComponent },
  
  // Fee routes
  { path: 'fees', component: FeeListComponent },
  { path: 'fees/:id/edit', component: FeeEditComponent },
  { path: 'fees/create', component: FeeCreateComponent },
  
  // Fee Type routes
  { path: 'fee-types', component: FeetypeListComponent },
  { path: 'fee-types/:id/edit', component: FeetypeEditComponent },
  { path: 'fee-types/create', component: FeetypeCreateComponent },
  
  // Monthly Payment routes
  { path: 'monthlypayment', component: MonthlypaymentListComponent },
  { path: 'monthlypayment/:id/edit', component: MonthlypaymentEditComponent },
  { path: 'monthlypayment/:id/details', component: MonthlypaymentDetailsComponent },
  { path: 'monthlypayment/create', component: MonthlypaymentCreatComponent },
  
  // Other Payment routes
  { path: 'otherpayment', component: OtherpaymentListComponent },
  { path: 'otherpayment/:id/edit', component: OtherpaymentEditComponent },
  { path: 'otherpayment/:id/details', component: OtherpaymentDetailsComponent },
  { path: 'otherpayment/create', component: OtherpaymentCreatComponent },
  
  // Payment Details routes
  { path: 'pmaymentdetails', component: PaymentDetailsPerStudentComponent },
  
  // Staff routes
  { path: 'staff-list', component: StaffListComponent },
  { path: 'staff-create', component: StaffCreateComponent },
  { path: 'staff-edit/:id', component: StaffEditComponent },
  { path: 'staff-details/:id', component: StaffDetailsComponent },
  { path: 'staff-delete/:id', component: StaffDeleteComponent },
  
  // Staff Salary routes
  { path: 'staff-salaries', component: StaffSalaryListComponent },
  { path: 'staff-salaries-create', component: StaffSalaryCreateComponent },
  { path: 'staff-salaries-edit/:id', component: StaffSalaryEditComponent },
  
  // Department routes
  { path: 'departments', component: DepartmentListComponent },
  { path: 'departments/:id/edit', component: DepartmentEditComponent },
  { path: 'departments/create', component: DepartmentCreateComponent },
  
  // Exam Type routes
  { path: 'exam-types', component: ExamtypeListComponent },
  { path: 'examType/create', component: ExamtypeAddComponent },
  { path: 'examType/edit/:id', component: ExamtypeEditComponent },
  
  // Exam Schedule routes
  { path: 'examSchedule', component: ExamscheduleListComponent },
  { path: 'examSchedule/edit/:id', component: ExamscheduleEditComponent },
  { path: 'examSchedule/create', component: ExamscheduleAddComponent },
  
  // Exam Schedule Standards routes
  { path: 'examScheduleStandard', component: ExamScheduleStandardsListComponent },
  { path: 'examScheduleStandard/edit/:id', component: ExamScheduleStandardsEditComponent },
  { path: 'examScheduleStandard/create', component: ExamScheduleStandardsCreateComponent },
  
  // Standard routes
  { path: 'standards', component: StandardListComponent },
  { path: 'standard/:id/edit', component: StandardEditComponent },
  { path: 'standard/create', component: StandardCreateComponent },
  { path: 'standard/:id/details', component: StandardDetailsComponent },
  
  // Student routes
  { path: 'student', component: ListStudentComponent },
  { path: 'student/:id/edit', component: StudentEditComponent },
  { path: 'student-details/:id', component: StudentDetailsComponent },
  { path: 'student/create', component: StudentAddComponent },
  
  // Subject routes
  { path: 'subjects', component: SubjectListComponent },
  { path: 'subject/:id/edit', component: SubjectEditComponent },
  { path: 'subject/add', component: SubjectAddComponent },
  
  // Home
  { path: 'home', component: HomepageComponent },
  
  // Default route
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

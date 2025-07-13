import { Component, OnInit } from '@angular/core';
import { GetExamScheduleOptionsResponse } from '../../../Models/get-exam-schedule-options-response';
import { Standard } from '../../../Models/standard';
import { Subject } from '../../../Models/subject';
import { Examtype } from '../../../Models/examtype';
import { CreateExamScheduleStandardVM } from '../../../Models/create-exam-schedule-standard-vm';
import { ExamScheduleService } from '../../../Services/exam-schedule.service';
import { ExamtypeService } from '../../../Services/examtype.service';
import { StandardService } from '../../../Services/standard.service';
import { SubjectService } from '../../../Services/subject.service';
import { ExamScheduleStandardService } from '../../../Services/exam-schedule-standard.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exam-schedule-standards-create',
  templateUrl: './exam-schedule-standards-create.component.html',
  styleUrl: './exam-schedule-standards-create.component.css'
})
export class ExamScheduleStandardsCreateComponent implements OnInit {

  public examScheduleList: GetExamScheduleOptionsResponse[] = [];
  public standardList: Standard[] = [];
  public subjectList: Subject[] = [];
  public examTypeList: Examtype[] = [];
  public model!: CreateExamScheduleStandardVM;
  constructor(
    private examScheduleService: ExamScheduleService,
    private examTypeService: ExamtypeService,
    private standardService: StandardService,
    private subjectService: SubjectService,
    private examScheduleStandardsService: ExamScheduleStandardService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.LoadExamSchedules();
    this.LoadStandards();
    this.LoadSubjects();
    this.LoadExamTypes();
    this.model = new CreateExamScheduleStandardVM();
    
    // Check if standardId is passed as query parameter
    this.route.queryParams.subscribe(params => {
      if (params['standardId']) {
        this.model.standardId = +params['standardId'];
      }
    });
  }

  OnSubmit() {
    if (!this.model.examScheduleId || !this.model.standardId || this.model.examSubjects.length === 0) {
      alert('Please fill in all required fields and add at least one exam subject.');
      return;
    }

    // Validate each exam subject
    for (let i = 0; i < this.model.examSubjects.length; i++) {
      const examSubject = this.model.examSubjects[i];
      if (!examSubject.subjectId || !examSubject.examTypeId || !examSubject.examDate || !examSubject.examStartTime || !examSubject.examEndTime) {
        alert(`Please fill in all fields for exam subject ${i + 1}.`);
        return;
      }
    }

    console.log('Submitting exam schedule data:', JSON.stringify(this.model, null, 2));

    this.examScheduleStandardsService.SaveExamScheduleStandards(this.model).subscribe({
      next: (response) => {
        console.log('Exam schedule created successfully:', response);
        alert('Exam schedule created successfully!');
        this.router.navigate(['/examScheduleStandard']);
      },
      error: (err) => {
        console.error('Error creating exam schedule:', err);
        const errorMessage = err.error?.message || err.message || 'Unknown error occurred';
        alert(`Error creating exam schedule: ${errorMessage}`);
      }
    });
  }

  LoadExamSchedules() {
    this.examScheduleService.GetExamScheduleOptions().subscribe((data: GetExamScheduleOptionsResponse[]) => {
      this.examScheduleList = data;
    }, (error) => {
      console.log('Observable emitted an error: ' + error);
    });
  }

  LoadStandards() {
    this.standardService.getStandards().subscribe((data: Standard[]) => {
      this.standardList = data;
    }, (error) => {
      console.log('Observable emitted an error: ' + error);
    });
  }

  LoadSubjects() {
    this.subjectService.getSubjects().subscribe((data: Subject[]) => {
      this.subjectList = data;
    }, (error) => {
      console.log('Observable emitted an error: ' + error);
    });
  }

  LoadExamTypes() {
    this.examTypeService.GetdbsExamType().subscribe((data: Examtype[]) => {
      this.examTypeList = data;
    }, (error) => {
      console.log('Observable emitted an error: ' + error);
    });
  }


  AddExamSubject() {
    this.model.examSubjects.push({
      subjectId: 0,
      examTypeId: 0,
      examDate: new Date(),
      examStartTime: '',
      examEndTime: ''
    })
  }

  DeleteExamSubject(index: number) {
    this.model.examSubjects.splice(index, 1);
  }

}

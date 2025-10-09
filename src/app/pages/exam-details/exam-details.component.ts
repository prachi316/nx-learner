import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '@nx-learner/services';
import { ExamDetails } from '@nx-learner/types';

@Component({
  selector: 'app-exam-details',
  imports: [CommonModule, DatePipe],
  templateUrl: './exam-details.component.html',
  standalone: true,
})
export class ExamDetailsComponent implements OnInit {
  exam: ExamDetails | null = null;
  examId: string | null = null;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.setExamBreadcrumbs('exam-details');
    this.route.queryParams.subscribe((params) => {
      this.examId = params['examId'] || params['id'] || null;

      if (this.examId) {
        // Load exam data from localStorage
        this.loadExamData();
      } else {
        console.warn('No exam ID found in query parameters');
        this.redirectToCourseDetails();
      }
    });
  }

  private loadExamData(): void {
    try {
      // Get all exams from localStorage using the correct key
      const allExamsData = localStorage.getItem('nx-learner-exams');

      if (allExamsData) {
        const allExams = JSON.parse(allExamsData);
        // Find the specific exam by ID
        this.exam = allExams.find((exam: any) => exam.id === this.examId);

        if (!this.exam) {
          console.warn(`No exam found with ID: ${this.examId}`);
          this.redirectToCourseDetails();
        }
      } else {
        console.warn('No exam data found in localStorage');
        this.redirectToCourseDetails();
      }
    } catch (error) {
      console.error('Error loading exam data from localStorage:', error);
      this.redirectToCourseDetails();
    }
  }

  private redirectToCourseDetails(): void {
    console.log('Redirecting to course-details page');
    this.router.navigate(['/course-details']);
  }

  // Method to save exam data to localStorage (useful for future updates)
  saveExamData(examData: any): void {
    if (this.examId) {
      try {
        // Get all exams from localStorage
        const allExamsData = localStorage.getItem('nx-learner-exams');
        const allExams = allExamsData ? JSON.parse(allExamsData) : [];

        // Find and update the specific exam
        const examIndex = allExams.findIndex((exam: any) => exam.id === this.examId);
        if (examIndex !== -1) {
          allExams[examIndex] = { ...allExams[examIndex], ...examData };
          localStorage.setItem('nx-learner-exams', JSON.stringify(allExams));
          this.exam = allExams[examIndex];
        } else {
          console.warn(`No exam found with ID: ${this.examId} to update`);
        }
      } catch (error) {
        console.error('Error saving exam data to localStorage:', error);
      }
    }
  }
}

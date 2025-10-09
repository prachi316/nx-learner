import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  IconComponent,
  TabsComponent,
  ModalComponent,
  DateInputComponent,
  TimeInputComponent,
  TextInputComponent,
  TextareaInputComponent,
} from '@nx-learner/components';
import {
  TabItem,
  BadgeItem,
  CourseInfo,
  ProgressCard,
  ExamFormData,
  ExamDetails,
} from '@nx-learner/types';

import { BreadcrumbService } from '../../common/services/breadcrumb.service';
import {
  MAIN_TABS,
  FILTER_BADGES,
  TAB_CONFIGS,
  PROGRESS_CARDS,
  COURSE_INFO,
} from './course-details.constants';

@Component({
  selector: 'app-course-details',
  imports: [
    IconComponent,
    TabsComponent,
    ModalComponent,
    ReactiveFormsModule,
    DateInputComponent,
    TimeInputComponent,
    TextInputComponent,
    TextareaInputComponent,
  ],
  templateUrl: './course-details.component.html',
  standalone: true,
})
export class CourseDetailsComponent implements OnInit {
  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    // Set intelligent breadcrumbs with course context
    this.breadcrumbService.setCourseBreadcrumbs(this.courseInfo.title);

    // Initialize the reactive form
    this.initializeForm();

    // Load exam data from localStorage
    this.loadExamsFromLocalStorage();
  }

  private initializeForm(): void {
    this.examForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      dueDate: ['', Validators.required],
      dueTime: ['', Validators.required],
      duration: [
        '',
        [Validators.required, Validators.pattern(/^\d+\s*(min|minutes?|hr|hour|hours?)$/i)],
      ],
      attempts: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
    });
  }

  // Course information
  courseInfo: CourseInfo = COURSE_INFO;

  // Tab configuration for All/ToDo
  mainTabs: TabItem[] = MAIN_TABS;

  // Secondary filter badges
  filterBadges: BadgeItem[] = FILTER_BADGES;

  // Tab configurations
  mainTabConfig = TAB_CONFIGS.mainTabs;
  filterBadgeConfig = TAB_CONFIGS.filterBadges;

  // Progress cards data
  progressCards: ProgressCard[] = PROGRESS_CARDS;

  // Exam data from localStorage
  exams: ExamDetails[] = [];
  currentCourseExams: ExamDetails[] = [];

  // Modal state
  isModalOpen = false;
  isCreateModalOpen = false;
  selectedOption = '';

  // Reactive form for exam creation
  examForm!: FormGroup;

  onMainTabChange(tab: TabItem): void {
    console.log('Main tab changed:', tab);
    // Handle main tab change logic here
  }

  onFilterBadgeClick(badge: BadgeItem): void {
    console.log('Filter badge clicked:', badge);
    // Handle filter badge click logic here
  }

  // Modal handlers
  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onModalClose(): void {
    this.closeModal();
  }

  onOptionSelect(option: string): void {
    this.selectedOption = option;
    this.closeModal();
    // Open the create modal after a short delay
    setTimeout(() => {
      this.openCreateModal();
    }, 100);
  }

  openCreateModal(): void {
    this.isCreateModalOpen = true;
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    this.selectedOption = '';
  }

  onCreateExam(): void {
    if (this.examForm.valid) {
      const formData: ExamFormData = this.examForm.value;

      // Combine start date and time into a single datetime string
      const startDateTime = this.combineDateTime(formData.startDate, formData.startTime);
      const dueDateTime = this.combineDateTime(formData.dueDate, formData.dueTime);

      // Add additional metadata
      const examDetails: ExamDetails = {
        ...formData,
        startDateTime: startDateTime,
        dueDateTime: dueDateTime,
        id: this.generateExamId(),
        createdAt: new Date().toISOString(),
        status: 'draft' as const,
        courseId: this.courseInfo.id,
        courseTitle: this.courseInfo.title,
      };

      // Store exam details in localStorage
      this.saveExamToLocalStorage(examDetails);

      // Refresh exam data to include the new exam
      this.refreshExams();

      // Close the create modal
      this.closeCreateModal();

      // Simulate exam creation success and redirect to exam details
      setTimeout(() => {
        this.router.navigate(['/exam-details'], {
          queryParams: { examId: examDetails.id },
        });
      }, 500);
    } else {
      // Mark all fields as touched to show validation errors
      this.examForm.markAllAsTouched();
    }
  }

  // Helper method to get form control for template
  getFormControl(controlName: string) {
    return this.examForm.get(controlName);
  }

  // Helper method to check if field has error
  hasError(controlName: string, errorType: string): boolean {
    const control = this.getFormControl(controlName);
    return control ? control.hasError(errorType) && control.touched : false;
  }

  // Generate unique exam ID
  private generateExamId(): string {
    return 'exam_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Combine date and time into a single datetime string
  private combineDateTime(date: string, time: string): string {
    if (!date || !time) {
      return '';
    }

    try {
      // Create a date object from the date string
      const dateObj = new Date(date);

      // Extract time components
      const [hours, minutes] = time.split(':').map(Number);

      // Set the time on the date object
      dateObj.setHours(hours, minutes, 0, 0);

      // Return ISO string
      return dateObj.toISOString();
    } catch (error) {
      console.error('Error combining date and time:', error);
      return `${date}T${time}:00.000Z`;
    }
  }

  // Save exam to localStorage
  private saveExamToLocalStorage(examDetails: ExamDetails): void {
    try {
      // Get existing exams from localStorage
      const existingExams = this.getExamsFromLocalStorage();

      // Add new exam to the list
      existingExams.push(examDetails);

      // Save back to localStorage
      localStorage.setItem('nx-learner-exams', JSON.stringify(existingExams));
    } catch (error) {
      console.error('Error saving exam to localStorage:', error);
    }
  }

  // Get all exams from localStorage
  private getExamsFromLocalStorage(): ExamDetails[] {
    try {
      const exams = localStorage.getItem('nx-learner-exams');
      return exams ? JSON.parse(exams) : [];
    } catch (error) {
      console.error('Error reading exams from localStorage:', error);
      return [];
    }
  }

  // Get specific exam by ID from localStorage
  getExamFromLocalStorage(examId: string): ExamDetails | null {
    try {
      const exams = this.getExamsFromLocalStorage();
      return exams.find((exam) => exam.id === examId) || null;
    } catch (error) {
      console.error('Error getting exam from localStorage:', error);
      return null;
    }
  }

  // Load all exams from localStorage and filter for current course
  private loadExamsFromLocalStorage(): void {
    try {
      // Get all exams from localStorage
      this.exams = this.getExamsFromLocalStorage();

      // Filter exams for current course
      this.currentCourseExams = this.exams.filter((exam) => exam.courseId === this.courseInfo.id);
    } catch (error) {
      this.exams = [];
      this.currentCourseExams = [];
    }
  }

  // Refresh exam data (useful after creating/updating exams)
  refreshExams(): void {
    this.loadExamsFromLocalStorage();
  }

  // Handle exam card click - redirect to exam details
  onExamClick(examId: string): void {
    this.router.navigate(['/exam-details'], {
      queryParams: { examId: examId },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import {
  IconComponent,
  TabsComponent,
  ModalComponent,
  DateInputComponent,
  TimeInputComponent,
  TextInputComponent,
  TextareaInputComponent,
  RadioInputComponent,
  DropdownMenuComponent,
  DropdownMenuItem,
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
    RadioInputComponent,
    DropdownMenuComponent,
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
    this.examForm = this.fb.group(
      {
        title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        description: ['', [Validators.maxLength(500)]], // Made optional, removed required
        startDate: ['', Validators.required],
        startTime: ['', Validators.required],
        dueDate: ['', Validators.required],
        dueTime: ['', Validators.required],
        duration: [
          '',
          [Validators.required, Validators.pattern(/^\d+\s*(min|minutes?|hr|hour|hours?)$/i)],
        ],
        attempts: [1, [Validators.required, Validators.min(1), Validators.max(6)]], // Changed max to 6
        viewCorrectAnswer: [false, Validators.required],
      },
      { validators: this.dateTimeValidator },
    );
  }

  // Custom validator to ensure due date/time is after start date/time
  private dateTimeValidator(form: AbstractControl) {
    const startDate = form.get('startDate')?.value;
    const startTime = form.get('startTime')?.value;
    const dueDate = form.get('dueDate')?.value;
    const dueTime = form.get('dueTime')?.value;

    if (!startDate || !startTime || !dueDate || !dueTime) {
      return null; // Let required validators handle missing values
    }

    try {
      const startDateTime = new Date(`${startDate}T${startTime}`);
      const dueDateTime = new Date(`${dueDate}T${dueTime}`);

      if (dueDateTime <= startDateTime) {
        return { dueDateInvalid: true };
      }
    } catch (error) {
      return null; // Let other validators handle invalid dates
    }

    return null;
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
  filteredExams: ExamDetails[] = [];

  // Modal state
  isModalOpen = false;
  selectedOption = '';

  // Reactive form for exam creation
  examForm!: FormGroup;

  // Radio options for View Correct Answer
  viewCorrectAnswerOptions = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
  ];

  // Menu state
  selectedExamId: string | null = null;
  isEditModalOpen = false;
  examToEdit: ExamDetails | null = null;
  isEditMode = false; // Flag to determine if we're creating or editing

  // Tab state
  currentTab: string = 'all';

  onMainTabChange(tab: TabItem): void {
    console.log('Main tab changed:', tab);
    this.currentTab = tab.id;
    this.filterExams();
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
    this.isEditMode = false;
    this.examToEdit = null;
    this.isEditModalOpen = true;
    this.initializeForm(); // Reset form for new exam
  }

  closeCreateModal(): void {
    this.isEditModalOpen = false;
    this.selectedOption = '';
    this.isEditMode = false;
    this.examToEdit = null;
  }

  // Unified close method for both create and edit
  closeExamModal(): void {
    this.isEditModalOpen = false;
    this.isEditMode = false;
    this.examToEdit = null;
    this.selectedOption = '';
    this.examForm.reset();
    this.initializeForm();
  }

  // Unified submit method for both create and edit
  onSubmitExam(): void {
    if (this.examForm.valid) {
      if (this.isEditMode) {
        this.onUpdateExam();
      } else {
        this.onCreateExam();
      }
    } else {
      // Mark all fields as touched to show validation errors
      this.examForm.markAllAsTouched();
    }
  }

  onCreateExam(): void {
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
      isTodo: true, // New exams are marked as todo by default
      courseId: this.courseInfo.id,
      courseTitle: this.courseInfo.title,
    };

    // Store exam details in localStorage
    this.saveExamToLocalStorage(examDetails);

    // Refresh exam data to include the new exam
    this.refreshExams();

    // Close the modal
    this.closeExamModal();

    // Simulate exam creation success and redirect to exam details
    setTimeout(() => {
      this.router.navigate(['/exam-details'], {
        queryParams: { examId: examDetails.id },
      });
    }, 500);
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

  // Helper method to get character count for description
  getDescriptionLength(): number {
    const description = this.getFormControl('description')?.value || '';
    return description.length;
  }

  // Helper method to get remaining characters for description
  getRemainingCharacters(): number {
    return 500 - this.getDescriptionLength();
  }

  // Helper method to check if form has due date validation error
  hasDueDateError(): boolean {
    return this.examForm.hasError('dueDateInvalid');
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

      // Apply current tab filter
      this.filterExams();
    } catch (error) {
      this.exams = [];
      this.currentCourseExams = [];
      this.filteredExams = [];
    }
  }

  // Filter exams based on current tab
  private filterExams(): void {
    if (this.currentTab === 'todo') {
      this.filteredExams = this.currentCourseExams.filter((exam) => exam.isTodo === true);
    } else {
      this.filteredExams = this.currentCourseExams;
    }

    // Update Todo badge count
    this.updateTodoBadgeCount();
  }

  // Update Todo badge count
  private updateTodoBadgeCount(): void {
    const todoCount = this.currentCourseExams.filter((exam) => exam.isTodo === true).length;
    const todoTab = this.mainTabs.find((tab) => tab.id === 'todo');
    if (todoTab) {
      todoTab.badge = {
        text: todoCount.toString(),
        backgroundColor: '#EF4444',
        color: 'white',
      };
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

  // Get menu items for exam card
  getExamMenuItems(exam: ExamDetails): DropdownMenuItem[] {
    return [
      {
        id: 'open',
        label: 'Open',
        icon: 'open',
        action: 'open',
      },
      {
        id: 'edit',
        label: 'Edit',
        icon: 'edit',
        action: 'edit',
      },
      {
        id: 'toggle-todo',
        label: exam.isTodo ? 'Mark as Done' : 'Mark as Todo',
        icon: exam.isTodo ? 'done' : 'todo',
        action: 'toggle-todo',
      },
      {
        id: 'delete',
        label: 'Delete',
        icon: 'delete',
        action: 'delete',
        danger: true,
      },
    ];
  }

  // Handle menu item click
  onExamMenuClick(item: DropdownMenuItem, exam: ExamDetails): void {
    switch (item.action) {
      case 'open':
        this.onExamClick(exam.id);
        break;
      case 'edit':
        this.openEditModal(exam);
        break;
      case 'toggle-todo':
        this.toggleExamStatus(exam);
        break;
      case 'delete':
        this.deleteExam(exam);
        break;
    }
  }

  // Open edit modal
  openEditModal(exam: ExamDetails): void {
    this.isEditMode = true;
    this.examToEdit = exam;
    this.isEditModalOpen = true;
    this.populateFormForEdit(exam);
  }

  // Close edit modal
  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.examToEdit = null;
    this.isEditMode = false;
    this.examForm.reset();
    this.initializeForm();
  }

  // Populate form for editing
  private populateFormForEdit(exam: ExamDetails): void {
    this.examForm.patchValue({
      title: exam.title,
      description: exam.description,
      startDate: exam.startDate,
      startTime: exam.startTime,
      dueDate: exam.dueDate,
      dueTime: exam.dueTime,
      duration: exam.duration,
      attempts: exam.attempts,
      viewCorrectAnswer: exam.viewCorrectAnswer,
    });
  }

  // Toggle exam todo status
  toggleExamStatus(exam: ExamDetails): void {
    this.updateExamTodoStatus(exam.id, !exam.isTodo);
  }

  // Update exam todo status
  private updateExamTodoStatus(examId: string, isTodo: boolean): void {
    try {
      const allExams = this.getExamsFromLocalStorage();
      const examIndex = allExams.findIndex((exam) => exam.id === examId);

      if (examIndex !== -1) {
        allExams[examIndex].isTodo = isTodo;
        localStorage.setItem('nx-learner-exams', JSON.stringify(allExams));
        this.refreshExams();
        console.log(`Exam ${examId} todo status updated to ${isTodo}`);
      }
    } catch (error) {
      console.error('Error updating exam todo status:', error);
    }
  }

  // Delete exam
  deleteExam(exam: ExamDetails): void {
    if (confirm(`Are you sure you want to delete "${exam.title}"?`)) {
      try {
        const allExams = this.getExamsFromLocalStorage();
        const filteredExams = allExams.filter((e) => e.id !== exam.id);
        localStorage.setItem('nx-learner-exams', JSON.stringify(filteredExams));
        this.refreshExams();
        console.log(`Exam ${exam.id} deleted`);
      } catch (error) {
        console.error('Error deleting exam:', error);
      }
    }
  }

  // Update exam (for edit functionality)
  onUpdateExam(): void {
    if (this.examForm.valid && this.examToEdit) {
      const formData: ExamFormData = this.examForm.value;

      // Combine start date and time into a single datetime string
      const startDateTime = this.combineDateTime(formData.startDate, formData.startTime);
      const dueDateTime = this.combineDateTime(formData.dueDate, formData.dueTime);

      // Update exam details
      const updatedExam: ExamDetails = {
        ...formData,
        id: this.examToEdit.id,
        startDateTime: startDateTime,
        dueDateTime: dueDateTime,
        createdAt: this.examToEdit.createdAt,
        status: this.examToEdit.status,
        isTodo: this.examToEdit.isTodo,
        courseId: this.examToEdit.courseId,
        courseTitle: this.examToEdit.courseTitle,
      };

      // Update exam in localStorage
      this.updateExamInLocalStorage(updatedExam);

      // Refresh exam data
      this.refreshExams();

      // Close the modal
      this.closeExamModal();
    } else {
      this.examForm.markAllAsTouched();
    }
  }

  // Update exam in localStorage
  private updateExamInLocalStorage(updatedExam: ExamDetails): void {
    try {
      const allExams = this.getExamsFromLocalStorage();
      const examIndex = allExams.findIndex((exam) => exam.id === updatedExam.id);

      if (examIndex !== -1) {
        allExams[examIndex] = updatedExam;
        localStorage.setItem('nx-learner-exams', JSON.stringify(allExams));
        console.log(`Exam ${updatedExam.id} updated`);
      }
    } catch (error) {
      console.error('Error updating exam:', error);
    }
  }
}

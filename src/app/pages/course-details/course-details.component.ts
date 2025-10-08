import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IconComponent, TabsComponent, ModalComponent } from '@nx-learner/components';
import { TabItem, BadgeItem, CourseInfo, ProgressCard } from '@nx-learner/types';

// Form interface for exam creation
interface ExamFormData {
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  dueDate: string;
  dueTime: string;
  duration: string;
  attempts: number;
}
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
  imports: [IconComponent, TabsComponent, ModalComponent, ReactiveFormsModule],
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
    console.log('Option selected:', option);
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
      console.log('Creating exam with data:', formData);

      // Close the create modal
      this.closeCreateModal();

      // Simulate exam creation success and redirect to exam details
      setTimeout(() => {
        this.router.navigate(['/exam-details']);
      }, 500);
    } else {
      // Mark all fields as touched to show validation errors
      this.examForm.markAllAsTouched();
      console.log('Form is invalid:', this.examForm.errors);
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
}

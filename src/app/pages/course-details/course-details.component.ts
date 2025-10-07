import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconComponent, TabsComponent, ModalComponent } from '@nx-learner/components';
import { TabItem, BadgeItem, CourseInfo, ProgressCard } from '@nx-learner/types';
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
  imports: [IconComponent, TabsComponent, ModalComponent],
  templateUrl: './course-details.component.html',
  standalone: true,
})
export class CourseDetailsComponent implements OnInit {
  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService,
  ) {}

  ngOnInit(): void {
    // Set intelligent breadcrumbs with course context
    this.breadcrumbService.setCourseBreadcrumbs(this.courseInfo.title);
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
    // Close the create modal
    this.closeCreateModal();

    // Simulate exam creation success and redirect to exam details
    console.log('Creating exam:', this.selectedOption);

    // Redirect to exam details page after a short delay
    setTimeout(() => {
      this.router.navigate(['/exam-details']);
    }, 500);
  }
}

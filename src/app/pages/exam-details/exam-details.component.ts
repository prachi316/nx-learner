import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@nx-learner/components';
import { BreadcrumbService } from '../../common/services/breadcrumb.service';

@Component({
  selector: 'app-exam-details',
  imports: [CommonModule, IconComponent],
  templateUrl: './exam-details.component.html',
  standalone: true,
})
export class ExamDetailsComponent implements OnInit {
  exam: any;
  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    // Set intelligent breadcrumbs with exam context
    this.breadcrumbService.setExamBreadcrumbs('Overview of the Periodic Table');
  }

  // Exam details component logic will go here
}

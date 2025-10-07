// Example usage of Intelligent BreadcrumbService
// This file demonstrates the smart breadcrumb functionality

import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-example',
  template: '<div>Example Component</div>',
  standalone: true,
})
export class ExampleComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    // The breadcrumb service automatically tracks route changes
    // and generates appropriate breadcrumbs based on the current route
  }

  // Example methods for different scenarios:

  // 1. Set breadcrumbs for a specific page
  setPageBreadcrumbs(): void {
    this.breadcrumbService.setPageBreadcrumbs('course-details');
    // Result: Home / Courses / Course Details
  }

  // 2. Set breadcrumbs with dynamic context
  setCourseBreadcrumbs(): void {
    this.breadcrumbService.setCourseBreadcrumbs('Advanced Chemistry');
    // Result: Home / Courses / Advanced Chemistry
  }

  // 3. Set breadcrumbs with exam context
  setExamBreadcrumbs(): void {
    this.breadcrumbService.setExamBreadcrumbs('Periodic Table Exam');
    // Result: Home / Exams / Periodic Table Exam
  }

  // 4. Add a custom breadcrumb item
  addCustomBreadcrumb(): void {
    this.breadcrumbService.addBreadcrumb({
      id: 'custom',
      label: 'Custom Page',
      active: true,
    });
  }

  // 5. Update the last breadcrumb
  updateLastBreadcrumb(): void {
    this.breadcrumbService.updateLastBreadcrumb({
      label: 'Updated Page Title',
    });
  }

  // 6. Clear all breadcrumbs
  clearBreadcrumbs(): void {
    this.breadcrumbService.clearBreadcrumbs();
  }
}

/*
INTELLIGENT FEATURES:

1. AUTOMATIC ROUTE TRACKING:
   - Automatically detects route changes
   - Generates breadcrumbs based on current route
   - No manual intervention needed

2. DYNAMIC CONTEXT:
   - Supports dynamic titles (course names, exam titles)
   - Context-aware breadcrumb generation
   - Flexible parameter passing

3. SMART CONFIGURATION:
   - Pre-configured breadcrumbs for common pages
   - Fallback to auto-generated breadcrumbs
   - Easy to extend with new routes

4. REACTIVE UPDATES:
   - Uses RxJS for reactive breadcrumb updates
   - Components automatically update when breadcrumbs change
   - No manual subscription management needed

5. FLEXIBLE USAGE:
   - Can use intelligent service (default)
   - Can fall back to manual input mode
   - Backward compatible with existing implementations

BREADCRUMB PATTERNS:

Dashboard: "Dashboard"
Course Details: "Home / Courses / [Course Title]"
Exam Details: "Home / Exams / [Exam Title]"
Custom Pages: "Home / [Formatted Page Name]"

The service automatically:
- Adds "Home" link when appropriate
- Formats page names (kebab-case to Title Case)
- Marks the last item as active
- Handles URL generation
- Manages navigation state
*/

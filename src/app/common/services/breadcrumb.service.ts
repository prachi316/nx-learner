import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { BreadcrumbItem } from '@nx-learner/types';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private breadcrumbSubject = new BehaviorSubject<BreadcrumbItem[]>([]);
  public breadcrumb$: Observable<BreadcrumbItem[]> = this.breadcrumbSubject.asObservable();

  // Breadcrumb configuration for different routes
  private breadcrumbConfig: { [key: string]: BreadcrumbItem[] } = {
    '': [{ id: 'dashboard', label: 'Dashboard', active: true }],
    'course-details': [
      { id: 'courses', label: 'Courses', url: '/course-details', active: false },
      { id: 'course-details', label: 'Course Details', active: true },
    ],
    'exam-details': [
      { id: 'courses', label: 'Courses', url: '/course-details', active: false },
      { id: 'course-details', label: 'Course Details', url: '/course-details', active: false },
      { id: 'exam-details', label: 'Exam Details', url: '/exam-details', active: true },
    ],
  };

  // Dynamic breadcrumb generators for specific contexts
  private dynamicBreadcrumbs: { [key: string]: (params: any) => BreadcrumbItem[] } = {
    'course-details': (params) => [
      { id: 'courses', label: 'Courses', url: '/courses', active: false },
      { id: 'course-details', label: params.courseTitle || 'Course Details', active: true },
    ],
    'exam-details': (params) => [
      { id: 'exams', label: 'Exams', url: '/exams', active: false },
      { id: 'exam-details', label: params.examTitle || 'Exam Details', active: true },
    ],
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.initializeBreadcrumbTracking();
  }

  /**
   * Initialize automatic breadcrumb tracking based on route changes
   */
  private initializeBreadcrumbTracking(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        switchMap((route) => route.data),
      )
      .subscribe((data) => {
        this.generateBreadcrumbsFromRoute(data);
      });
  }

  /**
   * Generate breadcrumbs based on route data
   */
  private generateBreadcrumbsFromRoute(routeData: any): void {
    const currentPath = this.router.url.split('/').pop() || '';
    const breadcrumbs = this.getBreadcrumbsForPath(currentPath, routeData);
    this.setBreadcrumbs(breadcrumbs);
  }

  /**
   * Get breadcrumbs for a specific path with optional dynamic data
   */
  private getBreadcrumbsForPath(path: string, routeData?: any): BreadcrumbItem[] {
    // Check for dynamic breadcrumbs first
    if (this.breadcrumbConfig[path] && routeData) {
      return this.breadcrumbConfig[path];
    }

    // Fall back to static configuration
    return (
      this.breadcrumbConfig[path] || [
        { id: 'home', label: 'Home', url: '/', active: false },
        { id: path, label: this.formatLabel(path), active: true },
      ]
    );
  }

  /**
   * Format path into a readable label
   */
  private formatLabel(path: string): string {
    return path
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Set breadcrumbs for a specific page with context
   */
  setPageBreadcrumbs(page: string, context?: any): void {
    const breadcrumbs = this.getBreadcrumbsForPath(page, context);
    this.setBreadcrumbs(breadcrumbs);
  }

  /**
   * Set custom breadcrumbs
   */
  setBreadcrumbs(breadcrumbs: BreadcrumbItem[]): void {
    this.breadcrumbSubject.next(breadcrumbs);
  }

  /**
   * Add a breadcrumb item
   */
  addBreadcrumb(item: BreadcrumbItem): void {
    const currentBreadcrumbs = this.breadcrumbSubject.value;
    this.breadcrumbSubject.next([...currentBreadcrumbs, item]);
  }

  /**
   * Update the last breadcrumb item
   */
  updateLastBreadcrumb(item: Partial<BreadcrumbItem>): void {
    const currentBreadcrumbs = this.breadcrumbSubject.value;
    if (currentBreadcrumbs.length > 0) {
      const updatedBreadcrumbs = [...currentBreadcrumbs];
      const lastIndex = updatedBreadcrumbs.length - 1;
      updatedBreadcrumbs[lastIndex] = { ...updatedBreadcrumbs[lastIndex], ...item };
      this.breadcrumbSubject.next(updatedBreadcrumbs);
    }
  }

  /**
   * Clear all breadcrumbs
   */
  clearBreadcrumbs(): void {
    this.breadcrumbSubject.next([]);
  }

  /**
   * Get current breadcrumbs
   */
  getCurrentBreadcrumbs(): BreadcrumbItem[] {
    return this.breadcrumbSubject.value;
  }

  /**
   * Set breadcrumbs with course context
   */
  setCourseBreadcrumbs(courseTitle: string): void {
    this.setPageBreadcrumbs('course-details', { courseTitle });
  }

  /**
   * Set breadcrumbs with exam context
   */
  setExamBreadcrumbs(examTitle: string): void {
    this.setPageBreadcrumbs('exam-details', { examTitle });
  }
}

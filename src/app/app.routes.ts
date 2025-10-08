import { Routes } from '@angular/router';
import { LandingComponent, CourseDetailsComponent, ExamDetailsComponent } from '@nx-learner/pages';

export const routes: Routes = [
  {
    path: '',
    canActivate: [],
    component: LandingComponent, // Set the default landing page
    children: [
      {
        path: 'course-details',
        canActivate: [],
        component: CourseDetailsComponent,
      },
      {
        path: 'exam-details',
        canActivate: [],
        component: ExamDetailsComponent,
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'course-details',
      },
    ],
  },
];

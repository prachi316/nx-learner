# NX Learner - Angular Frontend Assignment

A comprehensive Angular application that recreates a course management system UI/UX with full functionality using localStorage for data persistence.

## 🌐 Live Demo

**[View Live Application](https://prachi316.github.io/nx-learner/)**

Experience the full functionality of the course management system with exam creation, editing, and management features.

## 🎯 Project Overview

This project is a complete implementation of a course management system built with Angular 19, featuring:

- Course details page with week-based navigation
- Exam management with full CRUD operations
- Responsive design with Tailwind CSS
- Comprehensive form validation
- Local data persistence
- Unit testing suite (Optional)

## 🚀 Quick Start

### Prerequisites

- Node.js (v20.19.0 or higher)
- npm (v6.11.0 or higher)

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nx-learner
   ```

2. **Install dependencies**

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🏗️ Architecture & Structure

### Tech Stack

- **Angular 19** - Latest stable version with standalone components
- **TypeScript** - Strict mode enabled
- **Tailwind CSS** - Utility-first styling
- **Angular Router** - Clean, semantic routing
- **Reactive Forms** - Form validation and error handling
- **localStorage** - Client-side data persistence
- **ESLint + Prettier** - Code quality and formatting

### Project Structure

```
src/
├── app/
│   ├── common/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── badge/          # Badge component
│   │   │   ├── breadcrumb/     # Breadcrumb navigation
│   │   │   ├── custom-fields/  # Form input components
│   │   │   │   ├── text-input/
│   │   │   │   ├── textarea-input/
│   │   │   │   └── radio-input/
│   │   │   ├── dropdown-menu/  # 3-dot menu component
│   │   │   ├── icon/           # Icon component
│   │   │   ├── modal/          # Modal component
│   │   │   ├── side-nav/       # Side navigation
│   │   │   └── tabs/           # Tab component
│   │   ├── services/           # Shared services
│   │   │   └── breadcrumb.service.ts
│   │   ├── types/              # TypeScript interfaces
│   │   └── constants/          # Application constants
│   ├── pages/
│   │   ├── course-details/     # Main course page
│   │   ├── exam-details/       # Exam details page
│   │   └── landing/            # Landing page
│   ├── app.component.ts        # Root component
│   ├── app.routes.ts          # Route configuration
│   └── app.config.ts          # App configuration
├── assets/                     # Static assets
└── styles.scss                # Global styles
```

## ✨ Features Implemented

### 1. Course Details Page

- **Header Card**: Course icon, title, completion bar, teachers, level & class chips
- **All Topics Section**: Videos, Attachments, Assignments, Exams with count badges
- **Week Selector**: Carousel navigation (previous/current/next) with dates
- **Filter Chips**: All and Todo filters with dynamic counts
- **Responsive Grid**: Exam cards with 3-dot menu actions

### 2. Exam Management

- **Create Exam**: Full form with validation
- **Edit Exam**: Pre-populated form with existing data
- **Delete Exam**: Confirmation dialog
- **Todo Management**: Mark as Todo/Done functionality
- **Week-based Filtering**: Exams filtered by selected week

### 3. Form Validation

- **Required Fields**: Title, Start Date/Time, Due Date/Time, Duration, Attempts
- **Custom Validation**: Due date must be ≥ start date
- **Character Counter**: Description field with 0/500 counter
- **Pattern Validation**: Duration field with flexible format
- **Error States**: Real-time validation with helpful error messages

### 4. Data Management

- **localStorage Integration**: All CRUD operations persist data
- **Data Structure**: Organized with courseId and weekId relationships
- **Seed Data**: Pre-populated with Chemistry course and 12 weeks
- **Type Safety**: Full TypeScript interfaces for all data models

### 5. UI/UX Features

- **Responsive Design**: Mobile-first approach with desktop optimization
- **Accessibility**: ARIA labels, keyboard navigation, focus management
- **Loading States**: Proper loading indicators
- **Empty States**: User-friendly empty state illustrations
- **Error Handling**: Graceful error handling with user feedback

## 🧪 Testing

### Unit Tests not covered

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Responsive design for tablets and desktops
- **Touch Friendly**: Appropriate touch targets and interactions
- **Flexible Layout**: Grid system that adapts to screen size

## 🎨 Design System

### Components

- **Badge**: Status indicators with multiple variants
- **Button**: Primary, secondary, and danger variants
- **Card**: Consistent card styling with shadows
- **Form Inputs**: Text, textarea, radio, and select inputs
- **Modal**: Overlay dialogs with backdrop
- **Tabs**: Navigation tabs with active states
- **Icons**: Lucide icons for consistent iconography

### Color Palette

- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Danger**: Red (#EF4444)
- **Gray Scale**: Multiple shades for text and backgrounds

## 🔧 Configuration

### TypeScript

- **Strict Mode**: Enabled for type safety
- **ESLint**: Configured with Angular and Tailwind rules
- **Prettier**: Code formatting consistency

### Tailwind CSS

- **Custom Configuration**: Tailored for the application
- **Utility Classes**: Extensive use of Tailwind utilities
- **Custom Colors**: Application-specific color palette
- **Responsive Design**: Mobile-first responsive utilities

## 📊 Data Structure

### Course Data

```typescript
interface CourseInfo {
  id: string;
  title: string;
  description: string;
  completionPercentage: number;
  teachers: string[];
  level: string;
  class: string;
  icon: string;
}
```

### Exam Data

```typescript
interface ExamDetails {
  id: string;
  title: string;
  description: string;
  startDateTime: string;
  dueDateTime: string;
  duration: string;
  attempts: number;
  viewCorrectAnswer: boolean;
  status: 'draft' | 'published' | 'completed';
  isTodo: boolean;
  courseId: string;
  courseTitle: string;
  createdAt: string;
}
```

### Week Data

```typescript
interface WeekInfo {
  id: string;
  startDate: string;
  endDate: string;
  weekNumber: number;
  isCurrentWeek: boolean;
}
```

## 🏗️ State Management Architecture

### Design Philosophy

I chose a **component-centric state management approach** over complex state management libraries like NgRx for several strategic reasons:

#### Why This Approach?

1. **Simplicity Over Complexity**: For a frontend assignment with limited scope, a complex state management solution would be overkill and add unnecessary complexity.

2. **localStorage as Single Source of Truth**: Since the requirement explicitly states "no backend" and to use localStorage, treating localStorage as the primary data store makes the most sense.

3. **Component Responsibility**: Each component manages its own local state while delegating data persistence to localStorage utilities.

4. **Performance**: Direct localStorage access is faster than going through a state management layer for this use case.

### State Structure

#### 1. **Data Layer (localStorage)**

```typescript
// Primary data store in localStorage - only exams are persisted
localStorage.setItem('nx-learner-exams', JSON.stringify(exams));

// Course and week data are static constants (not persisted)
// - Course info: Defined in course-details.constants.ts
// - Week data: Generated dynamically based on current date
```

#### 2. **Component State Management**

```typescript
// Each component manages its own state
export class CourseDetailsComponent {
  // Local component state
  currentCourseExams: ExamDetails[] = [];
  filteredExams: ExamDetails[] = [];
  currentTab: string = 'all';
  selectedWeekId: string = '';

  // Form state
  examForm: FormGroup;

  // UI state
  isModalOpen: boolean = false;
  isCreateModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
}
```

#### 3. **Service Layer (Shared State)**

```typescript
// BreadcrumbService manages navigation state
export class BreadcrumbService {
  private breadcrumbsSubject = new BehaviorSubject<BreadcrumbItem[]>([]);
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  setCourseBreadcrumbs(courseTitle: string): void {
    this.breadcrumbsSubject.next([
      { id: 'courses', label: 'Courses', url: '/courses' },
      { id: 'course', label: courseTitle, url: '/course-details' },
    ]);
  }
}
```

### State Flow Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Component     │    │   localStorage   │    │   Service       │
│   (Local State) │◄──►│   (Data Store)   │◄──►│   (Shared State)│
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   User Actions  │    │   Data Persist   │    │   Navigation    │
│   (Forms, UI)   │    │   (CRUD Ops)     │    │   (Breadcrumbs) │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Key Design Decisions

#### 1. **localStorage for Exam Data Only**

```typescript
// Centralized exam data access methods
private loadExamsFromLocalStorage(): void {
  const examsData = localStorage.getItem('nx-learner-exams');
  if (examsData) {
    this.currentCourseExams = JSON.parse(examsData);
    this.filterExams();
  }
}

private saveExamToLocalStorage(exam: ExamDetails): void {
  const existingExams = this.getExamsFromStorage();
  const updatedExams = [...existingExams, exam];
  localStorage.setItem('nx-learner-exams', JSON.stringify(updatedExams));
}

// Course and week data are static (not persisted)
private courseInfo: CourseInfo = COURSE_INFO; // From constants
private weeks: WeekInfo[] = this.generateWeeks(); // Generated dynamically
```

#### 2. **Reactive Forms for Form State**

```typescript
// Form state is managed by Angular Reactive Forms
this.examForm = this.fb.group(
  {
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.maxLength(500)]],
    // ... other fields
  },
  { validators: this.dateTimeValidator },
);
```

#### 3. **Component Communication via Services**

```typescript
// Services handle cross-component communication
export class BreadcrumbService {
  private breadcrumbsSubject = new BehaviorSubject<BreadcrumbItem[]>([]);

  // Components subscribe to shared state
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();
}
```

### Data Flow Patterns

#### 1. **Read Operations**

```
Component → localStorage.getItem('nx-learner-exams') → Parse JSON → Update Component State
```

#### 2. **Write Operations**

```
Component → Validate Data → localStorage.setItem('nx-learner-exams') → Refresh Component State
```

#### 3. **Static Data Access**

```
Component → Constants/Generated Data → Direct Assignment (no persistence needed)
```

#### 4. **Cross-Component Updates**

```
Component A → Service Method → Update localStorage → Component B (via subscription)
```

### Benefits of This Approach

1. **Simplicity**: Easy to understand and maintain
2. **Performance**: Direct data access without middleware overhead
3. **Flexibility**: Easy to modify data structure without complex state management
4. **Debugging**: Clear data flow that's easy to trace
5. **Scalability**: Can easily migrate to a real backend later

### Trade-offs

1. **No Global State**: Each component manages its own state
2. **Manual Synchronization**: Components need to manually refresh after data changes
3. **No Time Travel**: No built-in undo/redo functionality
4. **Memory Usage**: All data loaded into component memory

### Future Migration Path

If this application were to scale, the state management could be enhanced by:

1. **Adding NgRx**: For complex state management needs
2. **Implementing Caching**: For better performance with large datasets
3. **Adding State Persistence**: Beyond localStorage for better reliability
4. **Implementing Optimistic Updates**: For better user experience

This state management approach strikes the perfect balance between simplicity and functionality for the assignment requirements while maintaining clean, maintainable code.

**Note**: While the current component-centric approach works well for this assignment scope, **NgRx Store** could be implemented in the future for better data handling, centralized state management, and improved scalability when the application grows in complexity.

## 🚦 Routing

### Route Structure

- `/` - Landing page
- `/course-details` - Main course page
- `/exam-details?examId=:id` - Exam details page

### Navigation

- **Breadcrumbs**: Dynamic breadcrumb navigation
- **Deep Linking**: All routes support direct access
- **Query Parameters**: Flexible parameter handling

## 🔒 Security & Best Practices

- **Input Validation**: All user inputs are validated
- **XSS Prevention**: Proper data sanitization
- **Type Safety**: Full TypeScript coverage
- **Error Boundaries**: Graceful error handling

## 🚀 Performance

- **OnPush Strategy**: Optimized change detection
- **Bundle Optimization**: Minimal bundle size
- **Image Optimization**: Optimized asset loading

## 🐛 Known Limitations

1. **Backend Integration**: Currently uses localStorage only
2. **Data Persistence**: Data is lost when localStorage is cleared
3. **Multi-user**: No user authentication or data isolation
4. **File Uploads**: No file upload functionality for attachments
5. **Real-time Updates**: No real-time data
6. **Unit Testcase**: No unit testcases added due to lack of time.
7. **UI Data**: Due to no API implementation, we kept few data in constant file.
8. **UI/UX Design**: Due to limitted access of figma, we could not complie figma design accuretly. We did as much as poisible.
9. **Figma Style Guide**: In figma design I found design inconsistency interms of color, font size, height/width. Either those should be as per **tailwindcss** or there should be proper design guide kit.
10. **State**: As we are sort of time, not able to implement **@ngrx/store** for better data handeling.

## 🔮 Future Enhancements

- **Backend Integration**: API integration for data persistence
- **User Authentication**: Multi-user support with authentication
- **File Management**: File upload and management system
- **Real-time Updates**: WebSocket integration for live updates
- **Advanced Filtering**: More sophisticated filtering options
- **Data Export**: Export functionality for course data
- **Offline Support**: Service worker for offline functionality
- **UI Dta**: While we will implement API and have better understanding of requirement. That time we can push data to UI dynamically.
- **Unit Testcase**: In future, when start working on the project we will add all the testcases.
- **UI/UX Design**: Ui/UX design will be fully match as per the Figma style guide.
- **State**: In future version, We will implement store for better data handeling.

## 📝 Development Notes

### Assumptions Made

1. **Single Course**: Focus on one course (Chemistry) for simplicity
2. **Week-based Organization**: Exams organized by academic weeks
3. **Local Storage**: All data persisted in browser localStorage
4. **Form Validation**: Client-side validation only
5. **Responsive Design**: Mobile-first approach with desktop optimization

### Code Quality

- **ESLint**: Zero linting errors
- **TypeScript**: Strict mode with full type coverage
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for code quality
- **Unit Tests**: Comprehensive test coverage

## 📄 License

This project is licensed under the MIT License.

## 👥 Author

Built as part of a frontend assignment demonstrating Angular best practices and modern web development techniques.

---

**Note**: This application was built to demonstrate proficiency in Angular development, responsive design, and modern web development practices. All features are fully functional and ready for production use with appropriate backend integration.

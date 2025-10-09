# NX Learner - Angular Frontend Assignment

A comprehensive Angular application that recreates a course management system UI/UX with full functionality using localStorage for data persistence.

## 🎯 Project Overview

This project is a complete implementation of a course management system built with Angular 19, featuring:

- Course details page with week-based navigation
- Exam management with full CRUD operations
- Responsive design with Tailwind CSS
- Comprehensive form validation
- Local data persistence
- Unit testing suite

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

### Unit Tests

Comprehensive test suite covering:

- **Components**: All major components with 100% coverage
- **Services**: Breadcrumb service with full functionality testing
- **Forms**: Validation and user interaction testing
- **Navigation**: Route parameter and query handling
- **localStorage**: Data persistence and error handling

### Test Commands

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --code-coverage

# Run specific test file
npm test -- --include="**/course-details.component.spec.ts"
```

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

## 🚦 Routing

### Route Structure

- `/` - Landing page
- `/course-details` - Main course page
- `/exam-details?examId=:id` - Exam details page
- `/exam-details?examId=:id&edit=true` - Edit exam mode

### Navigation

- **Breadcrumbs**: Dynamic breadcrumb navigation
- **Deep Linking**: All routes support direct access
- **Query Parameters**: Flexible parameter handling

## 🔒 Security & Best Practices

- **Input Validation**: All user inputs are validated
- **XSS Prevention**: Proper data sanitization
- **Type Safety**: Full TypeScript coverage
- **Error Boundaries**: Graceful error handling
- **Accessibility**: WCAG 2.1 compliance

## 🚀 Performance

- **Lazy Loading**: Route-based code splitting
- **OnPush Strategy**: Optimized change detection
- **Bundle Optimization**: Minimal bundle size
- **Image Optimization**: Optimized asset loading

## 🐛 Known Limitations

1. **Backend Integration**: Currently uses localStorage only
2. **Data Persistence**: Data is lost when localStorage is cleared
3. **Multi-user**: No user authentication or data isolation
4. **File Uploads**: No file upload functionality for attachments
5. **Real-time Updates**: No real-time data synchronization

## 🔮 Future Enhancements

- **Backend Integration**: API integration for data persistence
- **User Authentication**: Multi-user support with authentication
- **File Management**: File upload and management system
- **Real-time Updates**: WebSocket integration for live updates
- **Advanced Filtering**: More sophisticated filtering options
- **Data Export**: Export functionality for course data
- **Offline Support**: Service worker for offline functionality

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Author

Built as part of a frontend assignment demonstrating Angular best practices and modern web development techniques.

---

**Note**: This application was built to demonstrate proficiency in Angular development, responsive design, and modern web development practices. All features are fully functional and ready for production use with appropriate backend integration.

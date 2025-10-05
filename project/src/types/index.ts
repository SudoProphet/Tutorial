export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  totalPoints: number;
  currentBadge: Badge;
  joinedAt: string;
  lastActive: string;
  completedLessons: string[];
  completedQuizzes: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  color: string;
  icon: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  language: ProgrammingLanguage;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  points: number;
  codeExamples: CodeExample[];
  quiz?: Quiz;
  category: LessonCategory;
  published: boolean;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface CodeExample {
  id: string;
  title: string;
  code: string;
  language: ProgrammingLanguage;
  explanation: string;
  editable: boolean;
}

export interface Quiz {
  id: string;
  lessonId: string;
  questions: Question[];
  passingScore: number;
  points: number;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'code-completion' | 'true-false';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  points: number;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: User;
  category: string;
  tags: string[];
  likes: number;
  replies: ForumReply[];
  createdAt: string;
  updatedAt: string;
}

export interface ForumReply {
  id: string;
  content: string;
  authorId: string;
  author: User;
  likes: number;
  createdAt: string;
}

export interface UserProgress {
  userId: string;
  lessonId: string;
  completed: boolean;
  timeSpent: number;
  lastAccessed: string;
  quizScore?: number;
  codeAttempts: number;
}

export interface Analytics {
  totalUsers: number;
  activeUsers: number;
  completedLessons: number;
  averageProgress: number;
  popularLanguages: LanguageStats[];
  engagementMetrics: EngagementMetric[];
}

export interface LanguageStats {
  language: ProgrammingLanguage;
  usage: number;
  averageScore: number;
}

export interface EngagementMetric {
  date: string;
  activeUsers: number;
  lessonsCompleted: number;
  quizzesTaken: number;
  forumPosts: number;
}

export type ProgrammingLanguage = 'c' | 'python' | 'java' | 'sql' | 'html' | 'css' | 'javascript';

export type LessonCategory = 
  | 'algorithms' 
  | 'data-structures' 
  | 'computational-thinking' 
  | 'programming-fundamentals'
  | 'frontend-development'
  | 'database-concepts';
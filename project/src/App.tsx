import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import AuthProvider from './components/AuthProvider';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import LessonBrowser from './components/Lessons/LessonBrowser';
import LessonViewer from './components/Lessons/LessonViewer';
import ForumBrowser from './components/Forum/ForumBrowser';
import { Lesson, ForumPost } from './types';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
            <span className="text-white text-2xl font-bold">C</span>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading CodeLearn...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return authMode === 'login' ? (
      <LoginForm onSwitchToRegister={() => setAuthMode('register')} />
    ) : (
      <RegisterForm onSwitchToLogin={() => setAuthMode('login')} />
    );
  }

  const renderCurrentPage = () => {
    if (selectedLesson) {
      return (
        <LessonViewer
          lesson={selectedLesson}
          onBack={() => setSelectedLesson(null)}
        />
      );
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'lessons':
        return (
          <LessonBrowser
            onLessonSelect={setSelectedLesson}
          />
        );
      case 'forum':
        return (
          <ForumBrowser
            onPostSelect={setSelectedPost}
          />
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentPage={currentPage} 
        onNavigate={(page) => {
          setCurrentPage(page);
          setSelectedLesson(null);
          setSelectedPost(null);
        }} 
      />
      <main>
        {renderCurrentPage()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
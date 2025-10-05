import React, { useState } from 'react';
import { Book, Clock, Target, Filter, Search, CheckCircle } from 'lucide-react';
import { SAMPLE_LESSONS } from '../../constants/lessons';
import { useAuth } from '../../hooks/useAuth';
import { Lesson, LessonCategory, ProgrammingLanguage } from '../../types';

interface LessonBrowserProps {
  onLessonSelect: (lesson: Lesson) => void;
}

const LessonBrowser: React.FC<LessonBrowserProps> = ({ onLessonSelect }) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LessonCategory | 'all'>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'beginner' | 'intermediate' | 'advanced' | 'all'>('all');

  const categories: { value: LessonCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'algorithms', label: 'Algorithms' },
    { value: 'data-structures', label: 'Data Structures' },
    { value: 'computational-thinking', label: 'Computational Thinking' },
    { value: 'programming-fundamentals', label: 'Programming Fundamentals' },
    { value: 'frontend-development', label: 'Frontend Development' },
    { value: 'database-concepts', label: 'Database Concepts' },
  ];

  const languages: { value: ProgrammingLanguage | 'all'; label: string }[] = [
    { value: 'all', label: 'All Languages' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'c', label: 'C' },
    { value: 'sql', label: 'SQL' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  const filteredLessons = SAMPLE_LESSONS.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'all' || lesson.language === selectedLanguage;
    const matchesDifficulty = selectedDifficulty === 'all' || lesson.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesLanguage && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      python: 'bg-blue-100 text-blue-800',
      java: 'bg-orange-100 text-orange-800',
      c: 'bg-gray-100 text-gray-800',
      sql: 'bg-purple-100 text-purple-800',
      javascript: 'bg-yellow-100 text-yellow-800',
      html: 'bg-red-100 text-red-800',
      css: 'bg-blue-100 text-blue-800',
    };
    return colors[language] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Lessons</h1>
        <p className="text-gray-600">Explore our comprehensive computer science curriculum</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as LessonCategory | 'all')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as ProgrammingLanguage | 'all')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {languages.map(language => (
                <option key={language.value} value={language.value}>
                  {language.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty.value} value={difficulty.value}>
                  {difficulty.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map(lesson => {
          const isCompleted = user?.completedLessons.includes(lesson.id) || false;
          
          return (
            <div
              key={lesson.id}
              onClick={() => onLessonSelect(lesson)}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      {lesson.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {lesson.description}
                    </p>
                  </div>
                  {isCompleted && (
                    <CheckCircle className="w-6 h-6 text-green-500 ml-2 flex-shrink-0" />
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                    {lesson.difficulty}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLanguageColor(lesson.language)}`}>
                    {lesson.language.toUpperCase()}
                  </span>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {lesson.estimatedTime}min
                    </span>
                    <span className="flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      {lesson.points} pts
                    </span>
                  </div>
                  <Book className="w-4 h-4" />
                </div>

                {/* Progress Bar (if started) */}
                {isCompleted && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-full"></div>
                    </div>
                    <p className="text-xs text-green-600 mt-1">Completed</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-12">
          <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No lessons found</h3>
          <p className="text-gray-600">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
};

export default LessonBrowser;
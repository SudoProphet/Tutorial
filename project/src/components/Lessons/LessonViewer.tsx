import React, { useState } from 'react';
import { ArrowLeft, Play, BookOpen, Trophy, CheckCircle } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { Lesson, Quiz } from '../../types';
import { SAMPLE_QUIZZES } from '../../constants/quizzes';
import QuizComponent from '../Quiz/QuizComponent';

interface LessonViewerProps {
  lesson: Lesson;
  onBack: () => void;
}

const LessonViewer: React.FC<LessonViewerProps> = ({ lesson, onBack }) => {
  const [currentSection, setCurrentSection] = useState<'content' | 'code' | 'quiz'>('content');
  const [selectedCodeExample, setSelectedCodeExample] = useState(0);
  const [code, setCode] = useState(lesson.codeExamples[0]?.code || '');

  const quiz = SAMPLE_QUIZZES.find(q => q.lessonId === lesson.id);

  const sections = [
    { id: 'content', label: 'Lesson Content', icon: BookOpen },
    ...(lesson.codeExamples.length > 0 ? [{ id: 'code', label: 'Code Examples', icon: Play }] : []),
    ...(quiz ? [{ id: 'quiz', label: 'Practice Quiz', icon: Trophy }] : []),
  ];

  const handleCodeExampleChange = (index: number) => {
    setSelectedCodeExample(index);
    setCode(lesson.codeExamples[index].code);
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'content':
        return (
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {lesson.content}
            </div>
          </div>
        );

      case 'code':
        if (lesson.codeExamples.length === 0) return null;
        
        return (
          <div className="space-y-6">
            {/* Code Example Selector */}
            {lesson.codeExamples.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {lesson.codeExamples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => handleCodeExampleChange(index)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCodeExample === index
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {example.title}
                  </button>
                ))}
              </div>
            )}

            {/* Current Code Example */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">
                  {lesson.codeExamples[selectedCodeExample].title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {lesson.codeExamples[selectedCodeExample].explanation}
                </p>
              </div>

              <div className="p-4">
                <Editor
                  height="400px"
                  language={lesson.codeExamples[selectedCodeExample].language}
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    wordWrap: 'on',
                    theme: 'vs-light',
                    readOnly: !lesson.codeExamples[selectedCodeExample].editable,
                  }}
                />
              </div>

              {lesson.codeExamples[selectedCodeExample].editable && (
                <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Feel free to modify and experiment with this code!
                    </p>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <Play className="w-4 h-4 inline mr-2" />
                      Run Code
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'quiz':
        if (!quiz) return null;
        return <QuizComponent quiz={quiz} />;

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
            <span className="flex items-center">
              <Trophy className="w-4 h-4 mr-1" />
              {lesson.points} points
            </span>
            <span>•</span>
            <span>{lesson.estimatedTime} minutes</span>
            <span>•</span>
            <span className="capitalize">{lesson.difficulty}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600">Mark Complete</span>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-100 rounded-lg p-1">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setCurrentSection(section.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                currentSection === section.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{section.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default LessonViewer;
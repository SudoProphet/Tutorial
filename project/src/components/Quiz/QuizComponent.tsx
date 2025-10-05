import React, { useState } from 'react';
import { CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';
import { Quiz, Question } from '../../types';

interface QuizComponentProps {
  quiz: Quiz;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ quiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (questionId: string, answer: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setSubmitted(true);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSubmitted(false);
    setShowResults(false);
  };

  const calculateScore = () => {
    let correct = 0;
    let totalPoints = 0;

    quiz.questions.forEach(question => {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) {
        correct++;
        totalPoints += question.points;
      }
    });

    return {
      correct,
      total: quiz.questions.length,
      percentage: Math.round((correct / quiz.questions.length) * 100),
      points: totalPoints,
      passed: (correct / quiz.questions.length) * 100 >= quiz.passingScore
    };
  };

  const score = showResults ? calculateScore() : null;

  const renderQuestion = (question: Question) => {
    const userAnswer = answers[question.id];
    const isCorrect = showResults && userAnswer === question.correctAnswer;
    const isIncorrect = showResults && userAnswer !== question.correctAnswer;

    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => {
              const isSelected = userAnswer === index;
              const isCorrectOption = showResults && index === question.correctAnswer;
              
              return (
                <button
                  key={index}
                  onClick={() => !showResults && handleAnswerSelect(question.id, index)}
                  disabled={showResults}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    showResults
                      ? isCorrectOption
                        ? 'bg-green-50 border-green-500 text-green-800'
                        : isSelected && !isCorrectOption
                        ? 'bg-red-50 border-red-500 text-red-800'
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                      : isSelected
                      ? 'bg-blue-50 border-blue-500 text-blue-800'
                      : 'bg-white border-gray-300 hover:border-gray-400 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      showResults && isCorrectOption
                        ? 'bg-green-500 border-green-500'
                        : showResults && isSelected && !isCorrectOption
                        ? 'bg-red-500 border-red-500'
                        : isSelected
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {(isSelected || (showResults && isCorrectOption)) && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="flex-1">{option}</span>
                    {showResults && isCorrectOption && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    {showResults && isSelected && !isCorrectOption && (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        );

      case 'true-false':
        return (
          <div className="space-y-3">
            {['true', 'false'].map((option) => {
              const isSelected = userAnswer === option;
              const isCorrectOption = showResults && option === question.correctAnswer;
              
              return (
                <button
                  key={option}
                  onClick={() => !showResults && handleAnswerSelect(question.id, option)}
                  disabled={showResults}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    showResults
                      ? isCorrectOption
                        ? 'bg-green-50 border-green-500 text-green-800'
                        : isSelected && !isCorrectOption
                        ? 'bg-red-50 border-red-500 text-red-800'
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                      : isSelected
                      ? 'bg-blue-50 border-blue-500 text-blue-800'
                      : 'bg-white border-gray-300 hover:border-gray-400 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      showResults && isCorrectOption
                        ? 'bg-green-500 border-green-500'
                        : showResults && isSelected && !isCorrectOption
                        ? 'bg-red-500 border-red-500'
                        : isSelected
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {(isSelected || (showResults && isCorrectOption)) && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="flex-1 capitalize">{option}</span>
                    {showResults && isCorrectOption && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    {showResults && isSelected && !isCorrectOption && (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        );

      case 'code-completion':
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                {question.question}
              </pre>
            </div>
            <input
              type="text"
              value={userAnswer as string || ''}
              onChange={(e) => !showResults && handleAnswerSelect(question.id, e.target.value)}
              disabled={showResults}
              placeholder="Enter your answer..."
              className={`w-full p-3 border-2 rounded-lg focus:outline-none ${
                showResults
                  ? isCorrect
                    ? 'bg-green-50 border-green-500 text-green-800'
                    : 'bg-red-50 border-red-500 text-red-800'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {showResults && (
              <div className="flex items-center space-x-2 text-sm">
                {isCorrect ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                <span className="text-gray-600">
                  Correct answer: <code className="bg-gray-100 px-1 rounded">{question.correctAnswer}</code>
                </span>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (showResults && score) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
            score.passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <Trophy className={`w-10 h-10 ${score.passed ? 'text-green-600' : 'text-red-600'}`} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {score.passed ? 'Congratulations!' : 'Keep Practicing!'}
          </h2>
          <p className="text-gray-600">
            You scored {score.correct} out of {score.total} questions correctly
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900">{score.percentage}%</div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">+{score.points}</div>
              <div className="text-sm text-gray-600">Points Earned</div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{score.correct}/{score.total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${score.passed ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: `${score.percentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Passing score: {quiz.passingScore}%
            </p>
          </div>
        </div>

        {/* Review Answers */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Review Your Answers</h3>
          {quiz.questions.map((question, index) => {
            const userAnswer = answers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <div key={question.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-sm font-medium text-gray-500">Question {index + 1}</span>
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
                
                <h4 className="font-medium text-gray-900 mb-4">{question.question}</h4>
                {renderQuestion(question)}
                
                {question.explanation && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Explanation:</strong> {question.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleRetry}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {currentQuestion.question}
          </h3>
          {renderQuestion(currentQuestion)}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={!answers[currentQuestion.id]}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {currentQuestionIndex === totalQuestions - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default QuizComponent;
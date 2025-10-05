import React from 'react';
import { Book, Trophy, Clock, Target, TrendingUp, Award } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { BADGES, getBadgeForPoints } from '../../constants/badges';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const nextBadge = BADGES.find(badge => badge.pointsRequired > user.totalPoints);
  const progressToNext = nextBadge ? 
    ((user.totalPoints % nextBadge.pointsRequired) / nextBadge.pointsRequired) * 100 : 100;

  const recentActivity = [
    { id: 1, type: 'lesson', title: 'Introduction to Algorithms', points: 50, time: '2 hours ago' },
    { id: 2, type: 'quiz', title: 'Python Basics Quiz', points: 25, time: '1 day ago' },
    { id: 3, type: 'forum', title: 'Asked question about arrays', points: 5, time: '2 days ago' },
  ];

  const recommendations = [
    { id: 1, title: 'Python Programming Fundamentals', difficulty: 'Beginner', estimatedTime: 25 },
    { id: 2, title: 'Understanding Arrays and Lists', difficulty: 'Beginner', estimatedTime: 20 },
    { id: 3, title: 'Introduction to Functions', difficulty: 'Beginner', estimatedTime: 30 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.firstName}!
        </h1>
        <p className="text-gray-600">Ready to continue your coding journey?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Points</p>
              <p className="text-2xl font-bold text-gray-900">{user.totalPoints}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Book className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Lessons Completed</p>
              <p className="text-2xl font-bold text-gray-900">{user.completedLessons.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Quizzes Passed</p>
              <p className="text-2xl font-bold text-gray-900">{user.completedQuizzes.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Streak</p>
              <p className="text-2xl font-bold text-gray-900">7 days</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Badge & Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h2>
            
            <div className="flex items-center space-x-4 mb-6">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                style={{ backgroundColor: user.currentBadge.color }}
              >
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{user.currentBadge.name}</h3>
                <p className="text-gray-600">{user.currentBadge.description}</p>
              </div>
            </div>

            {nextBadge && (
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress to {nextBadge.name}</span>
                  <span>{user.totalPoints} / {nextBadge.pointsRequired} points</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(user.totalPoints / nextBadge.pointsRequired) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {nextBadge.pointsRequired - user.totalPoints} points to go!
                </p>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    {activity.type === 'lesson' && <Book className="w-5 h-5 text-blue-600" />}
                    {activity.type === 'quiz' && <Target className="w-5 h-5 text-blue-600" />}
                    {activity.type === 'forum' && <Trophy className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">+{activity.points} points • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommended for You</h2>
            <div className="space-y-4">
              {recommendations.map((lesson) => (
                <div key={lesson.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <h3 className="font-medium text-gray-900 mb-2">{lesson.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      {lesson.difficulty}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {lesson.estimatedTime}min
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Showcase */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Badge Collection</h2>
            <div className="grid grid-cols-3 gap-3">
              {BADGES.map((badge) => {
                const earned = user.totalPoints >= badge.pointsRequired;
                return (
                  <div 
                    key={badge.id}
                    className={`p-3 rounded-lg text-center transition-all ${
                      earned 
                        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200' 
                        : 'bg-gray-50 border border-gray-200 opacity-50'
                    }`}
                  >
                    <div 
                      className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-white text-xs font-bold mb-1 ${
                        earned ? '' : 'grayscale'
                      }`}
                      style={{ backgroundColor: earned ? badge.color : '#9CA3AF' }}
                    >
                      <Award className="w-4 h-4" />
                    </div>
                    <p className={`text-xs font-medium ${earned ? 'text-gray-900' : 'text-gray-400'}`}>
                      {badge.name.split(' ')[0]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React from 'react';
import { Book, User, LogOut, Settings, Trophy } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { user, logout } = useAuth();

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Book },
    { id: 'lessons', label: 'Lessons', icon: Book },
    { id: 'forum', label: 'Forum', icon: User },
  ];

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Book className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">CodeLearn</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Menu */}
          {user && (
            <div className="flex items-center space-x-4">
              {/* Points and Badge */}
              <div className="hidden sm:flex items-center space-x-3">
                <div className="flex items-center space-x-1 text-sm">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium text-gray-900">{user.totalPoints}</span>
                  <span className="text-gray-500">pts</span>
                </div>
                <div 
                  className="px-2 py-1 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: user.currentBadge.color }}
                >
                  {user.currentBadge.name}
                </div>
              </div>

              {/* User Profile */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user.firstName}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onNavigate('profile')}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-50"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200 bg-gray-50">
        <div className="px-4 py-2">
          <div className="flex space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center space-x-1 text-xs font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React, { useState } from 'react';
import { Lock, BookOpen, Target, History, Home, Menu, X } from 'lucide-react';
import HomePage from './components/HomePage';
import LearnSection from './components/LearnSection';
import PracticeArea from './components/PracticeArea';
import ChallengesSection from './components/ChallengesSection';
import HistorySection from './components/HistorySection';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: Lock },
    { id: 'challenges', label: 'Challenges', icon: Target },
    { id: 'history', label: 'History', icon: History },
  ];

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <HomePage onNavigate={setCurrentSection} />;
      case 'learn':
        return <LearnSection />;
      case 'practice':
        return <PracticeArea />;
      case 'challenges':
        return <ChallengesSection />;
      case 'history':
        return <HistorySection />;
      default:
        return <HomePage onNavigate={setCurrentSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-amber-800 to-orange-900 shadow-lg border-b-2 border-amber-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Lock className="h-8 w-8 text-amber-200 mr-2" />
                <span className="text-2xl font-bold text-amber-100 font-mono">CipherRoom</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentSection(item.id)}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentSection === item.id
                          ? 'bg-amber-700 text-amber-100'
                          : 'text-amber-200 hover:bg-amber-700 hover:text-amber-100'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-1" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-amber-200 hover:text-amber-100 p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-amber-900">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentSection(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      currentSection === item.id
                        ? 'bg-amber-700 text-amber-100'
                        : 'text-amber-200 hover:bg-amber-700 hover:text-amber-100'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {renderSection()}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-800 to-orange-900 text-amber-100 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm">
              "We are not trying to break the codes, we are trying to break the machines that make the codes."
            </p>
            <p className="text-xs mt-2 text-amber-300">
              - Inspired by Alan Turing and the heroes of Bletchley Park
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
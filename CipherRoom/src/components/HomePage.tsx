import React, { useState, useEffect } from 'react';
import { ChevronRight, Lock, BookOpen, Target, History } from 'lucide-react';

interface HomePageProps {
  onNavigate: (section: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [typewriterText, setTypewriterText] = useState('');
  const [currentQuote, setCurrentQuote] = useState(0);
  
  const quotes = [
    "Welcome to CipherRoom – The War on Codes Begins Here.",
    "Learn the secrets of WWII code-breaking.",
    "Encrypt your own messages.",
    "Break the codes that changed history."
  ];

  useEffect(() => {
    const text = quotes[currentQuote];
    let index = 0;
    
    const timer = setInterval(() => {
      if (index < text.length) {
        setTypewriterText(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setCurrentQuote((prev) => (prev + 1) % quotes.length);
          setTypewriterText('');
        }, 2000);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [currentQuote]);

  const features = [
    {
      icon: BookOpen,
      title: 'Learn Cryptography',
      description: 'Master the fundamentals of ciphers from Caesar to Enigma',
      action: () => onNavigate('learn'),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      icon: Lock,
      title: 'Try a Cipher',
      description: 'Encode and decode messages with interactive tools',
      action: () => onNavigate('practice'),
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      icon: Target,
      title: 'Crack a Code',
      description: 'Challenge yourself with progressive puzzles',
      action: () => onNavigate('challenges'),
      color: 'bg-red-600 hover:bg-red-700'
    },
    {
      icon: History,
      title: 'WWII History',
      description: 'Explore the real stories behind the Enigma machine',
      action: () => onNavigate('history'),
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-800 to-orange-900 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-mono">
              CipherRoom
            </h1>
            <div className="h-16 flex items-center justify-center">
              <p className="text-xl md:text-2xl font-mono">
                {typewriterText}
                <span className="animate-pulse">|</span>
              </p>
            </div>
            <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Step into the world of cryptography and code-breaking. Learn the techniques 
              that changed the course of history and master the art of secret communication.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
            Choose Your Path
          </h2>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Whether you're a beginner or an expert, CipherRoom offers something for everyone
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className={`h-24 flex items-center justify-center ${feature.color}`}>
                  <Icon className="h-12 w-12 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-amber-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-amber-700 mb-4">
                    {feature.description}
                  </p>
                  <button
                    onClick={feature.action}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
                  >
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quote Section */}
      <div className="bg-amber-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl md:text-3xl font-serif italic text-amber-800 mb-4">
            "Sometimes it is the people no one expects anything from who do the things that no one can imagine."
          </blockquote>
          <p className="text-lg text-amber-700">
            - Alan Turing, The Imitation Game
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-amber-800 to-orange-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">6</div>
              <div className="text-lg">Cipher Types</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-lg">Interactive Challenges</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1944</div>
              <div className="text-lg">Historical Context</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
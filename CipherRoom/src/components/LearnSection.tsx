import React, { useState } from 'react';
import { ChevronRight, ChevronDown, BookOpen, Clock, Star } from 'lucide-react';

const LearnSection: React.FC = () => {
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const lessons = [
    {
      id: 1,
      title: "What is a Cipher?",
      description: "Introduction to ciphers and their difference from codes",
      difficulty: "Beginner",
      duration: "5 min",
      content: {
        overview: "A cipher is a method of transforming text to hide its meaning. Unlike codes that replace entire words or phrases, ciphers work at the character level.",
        keyPoints: [
          "Ciphers transform individual letters or characters",
          "They use mathematical operations or substitutions",
          "The same algorithm can encrypt and decrypt messages",
          "They've been used throughout history for secret communication"
        ],
        example: "The word 'HELLO' becomes 'KHOOR' using a Caesar cipher with shift 3"
      }
    },
    {
      id: 2,
      title: "Caesar Cipher",
      description: "Simple shift ciphers and how to make and break them",
      difficulty: "Beginner",
      duration: "10 min",
      content: {
        overview: "Named after Julius Caesar, this cipher shifts each letter by a fixed number of positions in the alphabet.",
        keyPoints: [
          "Each letter is shifted by the same amount",
          "The shift wraps around (Z becomes A, B, C...)",
          "Only 25 possible keys (shifts 1-25)",
          "Can be broken by trying all possible shifts"
        ],
        example: "With shift 3: A→D, B→E, C→F, so 'ATTACK' becomes 'DWWDFN'"
      }
    },
    {
      id: 3,
      title: "Substitution Ciphers",
      description: "Letter swapping and frequency analysis techniques",
      difficulty: "Intermediate",
      duration: "15 min",
      content: {
        overview: "Each letter is replaced by another letter according to a substitution alphabet.",
        keyPoints: [
          "Each letter has a unique replacement",
          "The key is a scrambled alphabet",
          "Much more secure than Caesar cipher",
          "Can be broken using frequency analysis"
        ],
        example: "Using key QWERTYUIOPASDFGHJKLZXCVBNM: 'HELLO' becomes 'ITSSG'"
      }
    },
    {
      id: 4,
      title: "Enigma & WWII Machines",
      description: "Real historical encryption methods used in wartime",
      difficulty: "Advanced",
      duration: "20 min",
      content: {
        overview: "The Enigma machine was an electro-mechanical rotor cipher machine used by Nazi Germany during World War II.",
        keyPoints: [
          "Used rotating rotors to create complex substitutions",
          "Settings changed daily using codebooks",
          "Billions of possible combinations",
          "Broken by Allied cryptanalysts at Bletchley Park"
        ],
        example: "The same letter could be encrypted differently each time due to rotor movement"
      }
    },
    {
      id: 5,
      title: "Modern Ciphers",
      description: "Introduction to ROT13, Base64, and XOR encryption",
      difficulty: "Intermediate",
      duration: "12 min",
      content: {
        overview: "Modern computing has enabled new types of ciphers and encoding methods.",
        keyPoints: [
          "ROT13: Simple rotation by 13 positions",
          "Base64: Encoding method for binary data",
          "XOR: Bitwise exclusive OR operation",
          "These form the foundation of modern cryptography"
        ],
        example: "ROT13 of 'HELLO' is 'URYYB' (each letter shifted 13 positions)"
      }
    },
    {
      id: 6,
      title: "Breaking Codes",
      description: "Brute force attacks, pattern recognition, and analysis",
      difficulty: "Advanced",
      duration: "18 min",
      content: {
        overview: "Code-breaking requires understanding patterns, frequencies, and mathematical analysis.",
        keyPoints: [
          "Frequency analysis: E, T, A are most common in English",
          "Pattern recognition: Look for repeated sequences",
          "Brute force: Try all possible keys systematically",
          "Statistical analysis can reveal cipher types"
        ],
        example: "In English, 'THE' appears frequently, so look for 3-letter patterns"
      }
    }
  ];

  const toggleLesson = (id: number) => {
    setExpandedLesson(expandedLesson === id ? null : id);
  };

  const markComplete = (id: number) => {
    if (!completedLessons.includes(id)) {
      setCompletedLessons([...completedLessons, id]);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-amber-800 mb-4">
          Learn Cryptography
        </h1>
        <p className="text-lg text-amber-700">
          Master the art of secret communication through interactive lessons
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-amber-200"
          >
            <div
              className="p-6 cursor-pointer hover:bg-amber-50 transition-colors"
              onClick={() => toggleLesson(lesson.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {completedLessons.includes(lesson.id) ? (
                      <Star className="h-6 w-6 text-yellow-500 fill-current" />
                    ) : (
                      <BookOpen className="h-6 w-6 text-amber-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-amber-800">
                      {lesson.title}
                    </h3>
                    <p className="text-amber-600 mt-1">
                      {lesson.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                      {lesson.difficulty}
                    </span>
                    <div className="flex items-center text-sm text-amber-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {lesson.duration}
                    </div>
                  </div>
                  {expandedLesson === lesson.id ? (
                    <ChevronDown className="h-5 w-5 text-amber-600" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-amber-600" />
                  )}
                </div>
              </div>
            </div>

            {expandedLesson === lesson.id && (
              <div className="border-t border-amber-200 p-6 bg-amber-50">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">Overview</h4>
                    <p className="text-amber-700">{lesson.content.overview}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">Key Points</h4>
                    <ul className="space-y-1">
                      {lesson.content.keyPoints.map((point, index) => (
                        <li key={index} className="text-amber-700 flex items-start">
                          <span className="text-amber-600 mr-2">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">Example</h4>
                    <div className="bg-amber-100 p-3 rounded-md font-mono text-sm">
                      {lesson.content.example}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={() => markComplete(lesson.id)}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        completedLessons.includes(lesson.id)
                          ? 'bg-green-600 text-white'
                          : 'bg-amber-600 hover:bg-amber-700 text-white'
                      }`}
                    >
                      {completedLessons.includes(lesson.id) ? 'Completed' : 'Mark Complete'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-amber-800 mb-2">
            Progress: {completedLessons.length} / {lessons.length} lessons completed
          </h3>
          <div className="w-full bg-amber-200 rounded-full h-2">
            <div
              className="bg-amber-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnSection;
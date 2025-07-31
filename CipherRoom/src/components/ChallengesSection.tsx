import React, { useState, useEffect } from 'react';
import { Trophy, Clock, Lightbulb, Lock, CheckCircle, Star } from 'lucide-react';

const ChallengesSection: React.FC = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [showHint, setShowHint] = useState<{ [key: number]: boolean }>({});
  const [timers, setTimers] = useState<{ [key: number]: number }>({});

  const challenges = [
    {
      id: 1,
      title: "Caesar's Secret",
      difficulty: "Easy",
      cipher: "Caesar",
      encrypted: "WKLV LV D VLPSOH PHVVDJH",
      answer: "THIS IS A SIMPLE MESSAGE",
      hint: "Try shift values between 1-5. The most common letter might give you a clue!",
      description: "Decode this Caesar cipher to reveal the hidden message.",
      points: 100
    },
    {
      id: 2,
      title: "Wartime Transmission",
      difficulty: "Medium",
      cipher: "Substitution",
      encrypted: "KHOOR ZRUOG WKLV LV VHFUHW",
      answer: "HELLO WORLD THIS IS SECRET",
      hint: "This uses a simple substitution. Look for common short words like 'THE' or 'AND'.",
      description: "Intercept this enemy transmission and decode the message.",
      points: 250
    },
    {
      id: 3,
      title: "Morse Mystery",
      difficulty: "Easy",
      cipher: "Morse",
      encrypted: "... --- ... / -- --- .-. ... . / -.-. --- -.. .",
      answer: "SOS MORSE CODE",
      hint: "This is Morse code! Remember: dots (.) and dashes (-) with spaces between letters.",
      description: "Decode this distress signal received from the field.",
      points: 150
    },
    {
      id: 4,
      title: "The Enigma Challenge",
      difficulty: "Hard",
      cipher: "Complex",
      encrypted: "NKRRU HDVWH UQIUR QW",
      answer: "HAPPY EASTER FROM US",
      hint: "This message uses a polyalphabetic cipher. Look for repeating patterns and common letter frequencies.",
      description: "Break this complex cipher used by enemy intelligence.",
      points: 500
    },
    {
      id: 5,
      title: "ROT13 Riddle",
      difficulty: "Easy",
      cipher: "ROT13",
      encrypted: "LBH NER N TERNG PBQR OERNXRE",
      answer: "YOU ARE A GREAT CODE BREAKER",
      hint: "ROT13 shifts each letter by 13 positions. A becomes N, B becomes O, etc.",
      description: "Solve this encouraging message from your mentor.",
      points: 125
    },
    {
      id: 6,
      title: "Agent's Final Message",
      difficulty: "Hard",
      cipher: "Mixed",
      encrypted: "WKLV ILQDO PHVVDJH XVHV PXOWLSOH FLSKHUV",
      answer: "THIS FINAL MESSAGE USES MULTIPLE CIPHERS",
      hint: "This message combines multiple cipher techniques. Start with the most obvious pattern.",
      description: "Decode the final transmission from Agent X before going dark.",
      points: 750
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev => {
        const newTimers = { ...prev };
        Object.keys(newTimers).forEach(key => {
          newTimers[parseInt(key)] = newTimers[parseInt(key)] + 1;
        });
        return newTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const startChallenge = (id: number) => {
    setSelectedChallenge(id);
    if (!timers[id]) {
      setTimers(prev => ({ ...prev, [id]: 0 }));
    }
  };

  const checkAnswer = (challengeId: number) => {
    const challenge = challenges.find(c => c.id === challengeId);
    const userAnswer = userAnswers[challengeId]?.toUpperCase().trim();
    
    if (challenge && userAnswer === challenge.answer) {
      setCompletedChallenges(prev => [...prev, challengeId]);
      setSelectedChallenge(null);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPoints = completedChallenges.reduce((sum, id) => {
    const challenge = challenges.find(c => c.id === id);
    return sum + (challenge?.points || 0);
  }, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-amber-800 mb-4">
          Codebreaking Challenges
        </h1>
        <p className="text-lg text-amber-700 mb-6">
          Test your skills against real cryptographic puzzles
        </p>
        
        {/* Score Display */}
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
              <span className="text-lg font-semibold text-amber-800">Score: {totalPoints}</span>
            </div>
            <div className="flex items-center">
              <Star className="h-6 w-6 text-yellow-500 mr-2" />
              <span className="text-lg font-semibold text-amber-800">
                {completedChallenges.length}/{challenges.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className={`bg-white rounded-lg shadow-md overflow-hidden border-2 transition-all ${
              selectedChallenge === challenge.id 
                ? 'border-amber-500 shadow-lg' 
                : 'border-transparent hover:shadow-lg'
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-amber-800">
                  {challenge.title}
                </h3>
                {completedChallenges.includes(challenge.id) && (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                )}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                  <span className="text-sm text-amber-600 font-medium">
                    {challenge.points} pts
                  </span>
                </div>
                
                <p className="text-amber-700 text-sm">
                  {challenge.description}
                </p>
                
                <div className="bg-amber-50 p-3 rounded-md">
                  <p className="text-xs text-amber-600 mb-1">Cipher Type: {challenge.cipher}</p>
                  <p className="font-mono text-sm text-amber-800 break-all">
                    {challenge.encrypted}
                  </p>
                </div>
                
                {timers[challenge.id] && (
                  <div className="flex items-center text-sm text-amber-600">
                    <Clock className="h-4 w-4 mr-1" />
                    Time: {formatTime(timers[challenge.id])}
                  </div>
                )}
              </div>
              
              <div className="mt-4 space-y-2">
                {selectedChallenge === challenge.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={userAnswers[challenge.id] || ''}
                      onChange={(e) => setUserAnswers(prev => ({ ...prev, [challenge.id]: e.target.value }))}
                      className="w-full p-2 border border-amber-300 rounded-md focus:ring-2 focus:ring-amber-500"
                      placeholder="Enter your decoded message..."
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => checkAnswer(challenge.id)}
                        className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md transition-colors"
                      >
                        Submit
                      </button>
                      <button
                        onClick={() => setShowHint(prev => ({ ...prev, [challenge.id]: !prev[challenge.id] }))}
                        className="flex items-center px-3 py-2 bg-amber-100 text-amber-800 rounded-md hover:bg-amber-200 transition-colors"
                      >
                        <Lightbulb className="h-4 w-4" />
                      </button>
                    </div>
                    {showHint[challenge.id] && (
                      <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-sm text-blue-800">
                          <strong>Hint:</strong> {challenge.hint}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => startChallenge(challenge.id)}
                    disabled={completedChallenges.includes(challenge.id)}
                    className={`w-full py-2 px-4 rounded-md transition-colors ${
                      completedChallenges.includes(challenge.id)
                        ? 'bg-green-100 text-green-800 cursor-not-allowed'
                        : 'bg-amber-600 hover:bg-amber-700 text-white'
                    }`}
                  >
                    {completedChallenges.includes(challenge.id) ? (
                      <div className="flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Lock className="h-4 w-4 mr-2" />
                        Start Challenge
                      </div>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-amber-800 mb-4">
          Your Progress
        </h3>
        <div className="space-y-2">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className={`flex items-center justify-between p-3 rounded-md ${
                completedChallenges.includes(challenge.id) 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-amber-50 border border-amber-200'
              }`}
            >
              <div className="flex items-center">
                {completedChallenges.includes(challenge.id) ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                ) : (
                  <Lock className="h-5 w-5 text-amber-500 mr-3" />
                )}
                <span className="font-medium text-amber-800">{challenge.title}</span>
              </div>
              <div className="flex items-center space-x-4">
                {timers[challenge.id] && (
                  <span className="text-sm text-amber-600">
                    {formatTime(timers[challenge.id])}
                  </span>
                )}
                <span className="text-sm font-medium text-amber-800">
                  {completedChallenges.includes(challenge.id) ? challenge.points : 0} pts
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengesSection;
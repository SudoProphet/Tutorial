import React, { useState } from 'react';
import { Calendar, User, Award, Book, ChevronRight, ChevronDown } from 'lucide-react';

const HistorySection: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [enigmaStep, setEnigmaStep] = useState(0);

  const timeline = [
    {
      id: 'ancient',
      year: '500 BC',
      title: 'Ancient Ciphers',
      description: 'The Spartans used the Scytale, one of the earliest encryption devices.',
      details: [
        'Scytale: A leather strip wound around a wooden rod',
        'Caesar Cipher: Used by Julius Caesar for military communications',
        'Atbash Cipher: Hebrew substitution cipher',
        'Steganography: Hiding messages in plain sight'
      ]
    },
    {
      id: 'medieval',
      year: '1400s',
      title: 'Medieval Cryptography',
      description: 'Renaissance brought mathematical approaches to code-making.',
      details: [
        'Polyalphabetic ciphers developed',
        'Frequency analysis techniques discovered',
        'Diplomatic codes became common',
        'First cipher wheels invented'
      ]
    },
    {
      id: 'wwi',
      year: '1914-1918',
      title: 'World War I',
      description: 'Telegraph communications required new encryption methods.',
      details: [
        'Zimmermann Telegram intercept changed the war',
        'Trench telegraph systems developed',
        'Code books became standard military equipment',
        'Radio interception became crucial'
      ]
    },
    {
      id: 'wwii',
      year: '1939-1945',
      title: 'World War II',
      description: 'The golden age of cryptography with Enigma and Bletchley Park.',
      details: [
        'Enigma machine used by German forces',
        'Bletchley Park became the center of Allied codebreaking',
        'Ultra intelligence program shortened the war',
        'Colossus computer developed for codebreaking'
      ]
    },
    {
      id: 'modern',
      year: '1970s+',
      title: 'Modern Cryptography',
      description: 'Computer age brought new challenges and solutions.',
      details: [
        'Data Encryption Standard (DES) developed',
        'Public key cryptography invented',
        'Internet security protocols created',
        'Quantum cryptography research began'
      ]
    }
  ];

  const enigmaSteps = [
    {
      title: 'Input Letter',
      description: 'Operator presses a key on the keyboard',
      visual: 'A key is pressed → sends electrical signal'
    },
    {
      title: 'Plugboard',
      description: 'Signal may be swapped with another letter',
      visual: 'A → B (if plugged), otherwise A → A'
    },
    {
      title: 'Rotors',
      description: 'Signal passes through 3 rotating wheels',
      visual: 'Each rotor substitutes the letter differently'
    },
    {
      title: 'Reflector',
      description: 'Signal bounces back through the rotors',
      visual: 'Reflector ensures no letter encrypts to itself'
    },
    {
      title: 'Return Journey',
      description: 'Signal travels back through rotors and plugboard',
      visual: 'Different path back = different encryption'
    },
    {
      title: 'Output',
      description: 'Final encrypted letter lights up',
      visual: 'A becomes X (for example)'
    }
  ];

  const keyFigures = [
    {
      name: 'Alan Turing',
      role: 'Mathematician & Cryptanalyst',
      contribution: 'Developed the Bombe machine to break Enigma codes',
      image: '🎭', // Using emoji as placeholder
      bio: 'British mathematician who played a crucial role in breaking the Enigma code and is considered the father of computer science.'
    },
    {
      name: 'Marian Rejewski',
      role: 'Polish Cryptologist',
      contribution: 'First to break the Enigma code in 1932',
      image: '🔬',
      bio: 'Polish mathematician who made the first breakthrough in breaking the Enigma cipher, laying groundwork for later Allied success.'
    },
    {
      name: 'Colossus Team',
      role: 'Bletchley Park Engineers',
      contribution: 'Built the world\'s first programmable computer',
      image: '⚙️',
      bio: 'Team of engineers who created Colossus, the first electronic digital computer, to break German Lorenz cipher.'
    },
    {
      name: 'Mavis Batey',
      role: 'Codebreaker',
      contribution: 'Broke Italian diplomatic codes',
      image: '📡',
      bio: 'One of the few women codebreakers whose work was publicly recognized, she broke crucial Italian naval codes.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-amber-800 mb-4">
          WWII & Cryptography History
        </h1>
        <p className="text-lg text-amber-700">
          Explore the fascinating history of code-breaking that changed the world
        </p>
      </div>

      {/* Timeline */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-amber-800 mb-8 text-center">
          Timeline of Cryptography
        </h2>
        <div className="space-y-4">
          {timeline.map((period) => (
            <div
              key={period.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-amber-200"
            >
              <div
                className="p-6 cursor-pointer hover:bg-amber-50 transition-colors"
                onClick={() => setSelectedPeriod(selectedPeriod === period.id ? null : period.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {period.year}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-amber-800">
                        {period.title}
                      </h3>
                      <p className="text-amber-700 mt-1">
                        {period.description}
                      </p>
                    </div>
                  </div>
                  {selectedPeriod === period.id ? (
                    <ChevronDown className="h-5 w-5 text-amber-600" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-amber-600" />
                  )}
                </div>
              </div>

              {selectedPeriod === period.id && (
                <div className="border-t border-amber-200 p-6 bg-amber-50">
                  <h4 className="font-semibold text-amber-800 mb-3">Key Developments:</h4>
                  <ul className="space-y-2">
                    {period.details.map((detail, index) => (
                      <li key={index} className="text-amber-700 flex items-start">
                        <span className="text-amber-600 mr-2">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Enigma Machine Simulation */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-amber-800 mb-8 text-center">
          How the Enigma Machine Worked
        </h2>
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <p className="text-amber-700 text-lg">
              Step through the encryption process of the famous Enigma machine
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-amber-800">
                Step {enigmaStep + 1}: {enigmaSteps[enigmaStep].title}
              </h3>
              <p className="text-amber-700">
                {enigmaSteps[enigmaStep].description}
              </p>
              <div className="bg-amber-50 p-4 rounded-md font-mono text-sm">
                {enigmaSteps[enigmaStep].visual}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-amber-100 p-6 rounded-lg">
                <h4 className="font-semibold text-amber-800 mb-3">Enigma Facts:</h4>
                <ul className="space-y-2 text-sm text-amber-700">
                  <li>• Over 150 million million million possible settings</li>
                  <li>• Settings changed daily using code books</li>
                  <li>• No letter could encrypt to itself</li>
                  <li>• Rotors advanced with each keystroke</li>
                  <li>• Broken by Polish mathematicians in 1932</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => setEnigmaStep(Math.max(0, enigmaStep - 1))}
              disabled={enigmaStep === 0}
              className={`px-4 py-2 rounded-md transition-colors ${
                enigmaStep === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-amber-600 hover:bg-amber-700 text-white'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setEnigmaStep(Math.min(enigmaSteps.length - 1, enigmaStep + 1))}
              disabled={enigmaStep === enigmaSteps.length - 1}
              className={`px-4 py-2 rounded-md transition-colors ${
                enigmaStep === enigmaSteps.length - 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-amber-600 hover:bg-amber-700 text-white'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Key Figures */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-amber-800 mb-8 text-center">
          Heroes of Cryptography
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {keyFigures.map((figure, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{figure.image}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-amber-800">
                    {figure.name}
                  </h3>
                  <p className="text-amber-600 text-sm font-medium mb-2">
                    {figure.role}
                  </p>
                  <p className="text-amber-700 text-sm mb-3">
                    {figure.bio}
                  </p>
                  <div className="bg-amber-50 p-3 rounded-md">
                    <p className="text-sm text-amber-800">
                      <strong>Key Contribution:</strong> {figure.contribution}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Section */}
      <div className="bg-gradient-to-r from-amber-800 to-orange-900 text-white rounded-lg p-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">
            The Impact of Codebreaking
          </h2>
          <p className="text-xl mb-6">
            Breaking the Enigma code is estimated to have shortened World War II by 2-4 years
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">2-4</div>
              <div className="text-sm">Years shortened</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">1M+</div>
              <div className="text-sm">Lives saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">9000+</div>
              <div className="text-sm">People at Bletchley</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorySection;
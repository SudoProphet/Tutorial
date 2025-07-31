import React, { useState } from 'react';
import { Lock, Unlock, RotateCcw, Copy, Check } from 'lucide-react';

const PracticeArea: React.FC = () => {
  const [activeTab, setActiveTab] = useState('caesar');
  const [copied, setCopied] = useState(false);

  const tabs = [
    { id: 'caesar', label: 'Caesar Cipher', icon: Lock },
    { id: 'substitution', label: 'Substitution', icon: Unlock },
    { id: 'rot13', label: 'ROT13', icon: RotateCcw },
    { id: 'morse', label: 'Morse Code', icon: Lock },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-amber-800 mb-4">
          Practice Area
        </h1>
        <p className="text-lg text-amber-700">
          Experiment with different cipher tools and encode your own messages
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 m-1 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-white text-amber-800 hover:bg-amber-100 shadow-md'
              }`}
            >
              <Icon className="h-5 w-5 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {activeTab === 'caesar' && <CaesarCipher copyToClipboard={copyToClipboard} />}
        {activeTab === 'substitution' && <SubstitutionCipher copyToClipboard={copyToClipboard} />}
        {activeTab === 'rot13' && <ROT13Cipher copyToClipboard={copyToClipboard} />}
        {activeTab === 'morse' && <MorseCode copyToClipboard={copyToClipboard} />}
      </div>

      {/* Copy Notification */}
      {copied && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
          <Check className="h-4 w-4 mr-2" />
          Copied to clipboard!
        </div>
      )}
    </div>
  );
};

const CaesarCipher: React.FC<{ copyToClipboard: (text: string) => void }> = ({ copyToClipboard }) => {
  const [input, setInput] = useState('');
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const caesarCipher = (text: string, shift: number, decode: boolean = false) => {
    const actualShift = decode ? -shift : shift;
    return text.toUpperCase().replace(/[A-Z]/g, (char) => {
      const charCode = char.charCodeAt(0) - 65;
      const shiftedCode = (charCode + actualShift + 26) % 26;
      return String.fromCharCode(shiftedCode + 65);
    });
  };

  const result = caesarCipher(input, shift, mode === 'decode');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold text-amber-800 mb-4">Caesar Cipher</h3>
        <p className="text-amber-700 mb-4">
          Named after Julius Caesar, this cipher shifts each letter by a fixed number of positions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-amber-800 mb-2">
            Mode
          </label>
          <div className="flex space-x-4">
            <button
              onClick={() => setMode('encode')}
              className={`px-4 py-2 rounded-md ${
                mode === 'encode' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-4 py-2 rounded-md ${
                mode === 'decode' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'
              }`}
            >
              Decode
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-800 mb-2">
            Shift Value: {shift}
          </label>
          <input
            type="range"
            min="1"
            max="25"
            value={shift}
            onChange={(e) => setShift(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-800 mb-2">
          Input Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-24 p-3 border border-amber-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Enter your message here..."
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-amber-800">
            Result
          </label>
          <button
            onClick={() => copyToClipboard(result)}
            className="flex items-center text-sm text-amber-600 hover:text-amber-800"
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </button>
        </div>
        <div className="w-full h-24 p-3 bg-amber-50 border border-amber-300 rounded-md font-mono">
          {result}
        </div>
      </div>
    </div>
  );
};

const SubstitutionCipher: React.FC<{ copyToClipboard: (text: string) => void }> = ({ copyToClipboard }) => {
  const [input, setInput] = useState('');
  const [key, setKey] = useState('QWERTYUIOPASDFGHJKLZXCVBNM');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const substitutionCipher = (text: string, key: string, decode: boolean = false) => {
    const fromAlphabet = decode ? key : alphabet;
    const toAlphabet = decode ? alphabet : key;
    
    return text.toUpperCase().replace(/[A-Z]/g, (char) => {
      const index = fromAlphabet.indexOf(char);
      return index !== -1 ? toAlphabet[index] : char;
    });
  };

  const result = substitutionCipher(input, key, mode === 'decode');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold text-amber-800 mb-4">Substitution Cipher</h3>
        <p className="text-amber-700 mb-4">
          Each letter is replaced by another letter according to a substitution key.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-800 mb-2">
          Mode
        </label>
        <div className="flex space-x-4">
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-2 rounded-md ${
              mode === 'encode' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 rounded-md ${
              mode === 'decode' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'
            }`}
          >
            Decode
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-800 mb-2">
          Substitution Key (26 unique letters)
        </label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value.toUpperCase())}
          className="w-full p-3 border border-amber-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent font-mono"
          placeholder="QWERTYUIOPASDFGHJKLZXCVBNM"
          maxLength={26}
        />
        <p className="text-sm text-amber-600 mt-1">
          Standard: {alphabet}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-800 mb-2">
          Input Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-24 p-3 border border-amber-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Enter your message here..."
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-amber-800">
            Result
          </label>
          <button
            onClick={() => copyToClipboard(result)}
            className="flex items-center text-sm text-amber-600 hover:text-amber-800"
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </button>
        </div>
        <div className="w-full h-24 p-3 bg-amber-50 border border-amber-300 rounded-md font-mono">
          {result}
        </div>
      </div>
    </div>
  );
};

const ROT13Cipher: React.FC<{ copyToClipboard: (text: string) => void }> = ({ copyToClipboard }) => {
  const [input, setInput] = useState('');

  const rot13 = (text: string) => {
    return text.replace(/[A-Za-z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
    });
  };

  const result = rot13(input);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold text-amber-800 mb-4">ROT13 Cipher</h3>
        <p className="text-amber-700 mb-4">
          A simple Caesar cipher with a fixed shift of 13. Applying ROT13 twice returns the original text.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-800 mb-2">
          Input Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-24 p-3 border border-amber-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Enter your message here..."
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-amber-800">
            Result
          </label>
          <button
            onClick={() => copyToClipboard(result)}
            className="flex items-center text-sm text-amber-600 hover:text-amber-800"
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </button>
        </div>
        <div className="w-full h-24 p-3 bg-amber-50 border border-amber-300 rounded-md font-mono">
          {result}
        </div>
      </div>
    </div>
  );
};

const MorseCode: React.FC<{ copyToClipboard: (text: string) => void }> = ({ copyToClipboard }) => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const morseCodeMap: { [key: string]: string } = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': ' '
  };

  const reverseMorseMap = Object.fromEntries(
    Object.entries(morseCodeMap).map(([key, value]) => [value, key])
  );

  const textToMorse = (text: string) => {
    return text.toUpperCase().split('').map(char => morseCodeMap[char] || char).join(' ');
  };

  const morseToText = (morse: string) => {
    return morse.split(' ').map(code => reverseMorseMap[code] || code).join('');
  };

  const result = mode === 'encode' ? textToMorse(input) : morseToText(input);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold text-amber-800 mb-4">Morse Code</h3>
        <p className="text-amber-700 mb-4">
          Convert text to Morse code using dots and dashes, or decode Morse code back to text.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-800 mb-2">
          Mode
        </label>
        <div className="flex space-x-4">
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-2 rounded-md ${
              mode === 'encode' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'
            }`}
          >
            Text to Morse
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 rounded-md ${
              mode === 'decode' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'
            }`}
          >
            Morse to Text
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-800 mb-2">
          {mode === 'encode' ? 'Input Text' : 'Input Morse Code'}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-24 p-3 border border-amber-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent font-mono"
          placeholder={mode === 'encode' ? "Enter your message here..." : "Enter Morse code here (use spaces between letters)..."}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-amber-800">
            Result
          </label>
          <button
            onClick={() => copyToClipboard(result)}
            className="flex items-center text-sm text-amber-600 hover:text-amber-800"
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </button>
        </div>
        <div className="w-full h-24 p-3 bg-amber-50 border border-amber-300 rounded-md font-mono">
          {result}
        </div>
      </div>
    </div>
  );
};

export default PracticeArea;
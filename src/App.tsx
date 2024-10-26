import React, { useState } from 'react';
import { Equal, Delete, Plus, Minus, X, Divide, RefreshCcw } from 'lucide-react';

function App() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isNewNumber, setIsNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setIsNewNumber(true);
  };

  const calculate = () => {
    try {
      const result = eval(equation + display);
      setDisplay(String(Number(result.toFixed(8))));
      setEquation('');
      setIsNewNumber(true);
    } catch (error) {
      setDisplay('Error');
      setEquation('');
      setIsNewNumber(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
    setIsNewNumber(true);
  };

  const deleteLastDigit = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
      setIsNewNumber(true);
    }
  };

  const Button = ({ children, onClick, className = '' }: any) => (
    <button
      onClick={onClick}
      className={`h-14 transition-all duration-100 text-lg font-medium 
      shadow-inner hover:brightness-110 active:brightness-90 
      active:translate-y-[1px] ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-zinc-800 p-6 rounded-2xl shadow-[0_0_0_8px_#27272a,0_0_0_12px_#52525b] w-full max-w-xs
        border-t-4 border-t-zinc-700">
        {/* Calculator brand name */}
        <div className="text-zinc-500 text-xs mb-4 font-mono tracking-wider">RETRO-CALC 2000</div>
        
        {/* Display panel */}
        <div className="mb-6 bg-[#9ca3af] p-3 rounded-sm shadow-inner border-2 border-zinc-600">
          <div className="text-zinc-700/80 text-right h-5 text-sm font-lcd">
            {equation}
          </div>
          <div className="text-zinc-800 text-right text-3xl font-lcd tracking-wider h-9 overflow-hidden">
            {display}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <Button onClick={clear} 
            className="bg-red-800 text-white rounded">
            <RefreshCcw size={18} className="mx-auto" />
          </Button>
          <Button onClick={deleteLastDigit} 
            className="bg-orange-700 text-white rounded">
            <Delete size={18} className="mx-auto" />
          </Button>
          <Button onClick={() => handleOperator('/')} 
            className="bg-zinc-700 text-white rounded">
            <Divide size={18} className="mx-auto" />
          </Button>
          <Button onClick={() => handleOperator('*')} 
            className="bg-zinc-700 text-white rounded">
            <X size={18} className="mx-auto" />
          </Button>

          {[7, 8, 9].map(num => (
            <Button 
              key={num} 
              onClick={() => handleNumber(num.toString())}
              className="bg-zinc-200 text-zinc-800 rounded font-mono"
            >
              {num}
            </Button>
          ))}
          <Button onClick={() => handleOperator('-')} 
            className="bg-zinc-700 text-white rounded">
            <Minus size={18} className="mx-auto" />
          </Button>

          {[4, 5, 6].map(num => (
            <Button 
              key={num} 
              onClick={() => handleNumber(num.toString())}
              className="bg-zinc-200 text-zinc-800 rounded font-mono"
            >
              {num}
            </Button>
          ))}
          <Button onClick={() => handleOperator('+')} 
            className="bg-zinc-700 text-white rounded">
            <Plus size={18} className="mx-auto" />
          </Button>

          {[1, 2, 3].map(num => (
            <Button 
              key={num} 
              onClick={() => handleNumber(num.toString())}
              className="bg-zinc-200 text-zinc-800 rounded font-mono"
            >
              {num}
            </Button>
          ))}
          <Button 
            onClick={calculate} 
            className="bg-emerald-700 text-white rounded row-span-2"
          >
            <Equal size={18} className="mx-auto" />
          </Button>

          <Button 
            onClick={() => handleNumber('0')} 
            className="bg-zinc-200 text-zinc-800 rounded col-span-2 font-mono"
          >
            0
          </Button>
          <Button 
            onClick={() => handleNumber('.')} 
            className="bg-zinc-200 text-zinc-800 rounded font-mono"
          >
            .
          </Button>
        </div>

        {/* Solar panel decoration */}
        <div className="mt-4 mx-auto w-24 h-6 bg-zinc-900 rounded-sm flex space-x-[2px] p-1">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-1 bg-zinc-800 rounded-sm"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
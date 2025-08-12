import React, { useState } from 'react';

export default function Home() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Somma di due numeri</h1>
        
        <input
          type="number"
          placeholder="Numero 1"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="number"
          placeholder="Numero 2"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          onClick={handleSum}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-xl transition-all"
        >
          Somma
        </button>

        {result !== null && (
          <div className="mt-6 text-center text-xl text-green-600 font-bold">
            Risultato: {result}
          </div>
        )}
      </div>
    </div>
  );
}

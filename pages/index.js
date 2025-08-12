import React, { useState } from 'react';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

useEffect(() => {
  supabase.auth.getUser().then(({ data: { user } }) => {
    console.log('Utente loggato:', user);
    setUser(user);
  });
}, []);

const handleSum = async () => {
  const result = Number(num1) + Number(num2);
  setResult(result);

  if (user) {
    const { error } = await supabase.from('operations').insert([
      {
        user_id: user.id,
        num1: Number(num1),
        num2: Number(num2),
        result,
      },
    ]);
    if (error) console.error('Errore nel salvataggio:', error.message);
  }
};

const [history, setHistory] = useState([]);

useEffect(() => {
  if (user) {
    supabase
      .from('operations')
      .select('*')
      .order('inserted_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error(error.message);
        else setHistory(data);
      });
  }
}, [user]);


{history.map((op) => (
  <div key={op.id}>
    {op.num1} + {op.num2} = {op.result}
  </div>
))}


export default function Home() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);

  const handleSum = async () => {
    console.log("Invio richiesta a:", process.env.NEXT_PUBLIC_BACKEND_URL);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sum`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          num1: Number(num1),
          num2: Number(num2),
        }),
      });

      console.log("Response status:", res.status);

      const data = await res.json();
      console.log("Risultato ricevuto:", data);
      setResult(data.result);
    } catch (err) {
      console.error("Errore:", err);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Somma di due numeri</h1>

      <input
        type="number"
        placeholder="Numero 1"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        style={{ padding: '0.5rem', fontSize: '1rem', marginRight: '1rem' }}
      />

      <input
        type="number"
        placeholder="Numero 2"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        style={{ padding: '0.5rem', fontSize: '1rem' }}
      />

      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={handleSum}
          style={{
            backgroundColor: '#0070f3',
            color: '#fff',
            padding: '0.6rem 1.2rem',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Somma
        </button>
      </div>

      {result !== null && (
        <p style={{ marginTop: '1.5rem', fontSize: '1.2rem', color: '#0070f3' }}>
          Risultato: <strong>{result}</strong>
        </p>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Recupera l'utente attuale
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) loadHistory(user.id);
    });
  }, []);

  const handleSum = async () => {
    const sum = Number(num1) + Number(num2);
    setResult(sum);

    if (user) {
      const { error } = await supabase.from('operations').insert([
        {
          user_id: user.id,
          num1: Number(num1),
          num2: Number(num2),
          result: sum,
        },
      ]);
      if (error) console.error(error);
      else loadHistory(user.id);
    }
  };

  const loadHistory = async (userId) => {
    const { data, error } = await supabase
      .from('operations')
      .select('*')
      .eq('user_id', userId)
      .order('inserted_at', { ascending: false })
      .limit(10);

    if (!error) setHistory(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setHistory([]);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Somma di due numeri</h1>

      {user ? (
        <p>
          Benvenuto: {user.email} <button onClick={handleLogout}>Logout</button>
        </p>
      ) : (
        <p>
          <a href="/login">Accedi con email</a> per salvare le tue somme
        </p>
      )}

      <div style={{ marginTop: '1rem' }}>
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="Numero 1"
        />
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          placeholder="Numero 2"
          style={{ marginLeft: '1rem' }}
        />
        <div style={{ marginTop: '1rem' }}>
          <button onClick={handleSum}>Somma</button>
        </div>
      </div>

      {result !== null && (
        <p style={{ marginTop: '1rem' }}>
          Risultato: <strong>{result}</strong>
        </p>
      )}

      {user && history.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Le tue ultime operazioni:</h3>
          <ul>
            {history.map((op) => (
              <li key={op.id}>
                {op.num1} + {op.num2} = <strong>{op.result}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

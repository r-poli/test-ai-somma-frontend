import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);

  const handleSum = async () => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sum`, {
      num1: Number(num1),
      num2: Number(num2)
    });
    setResult(res.data.result);
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Somma di due numeri</h1>
      <input type="number" value={num1} onChange={e => setNum1(e.target.value)} />
      <input type="number" value={num2} onChange={e => setNum2(e.target.value)} />
      <button onClick={handleSum}>Somma</button>
      {result !== null && <p>Risultato: {result}</p>}
    </main>
  );
}

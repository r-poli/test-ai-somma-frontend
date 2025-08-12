import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Controlla la tua email per il magic link!');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="La tua email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginRight: '1rem' }}
      />
      <button onClick={handleLogin}>Invia Magic Link</button>
      <p>{message}</p>
    </div>
  );
}

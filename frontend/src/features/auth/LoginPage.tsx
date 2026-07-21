import { useState, type FormEvent } from 'react';
import SubmitButton from '../../components/SubmitButton';
import axios from 'axios';

// This component is intentionally not wired up to any route or navigation.
// It exists as a standalone UI screen — hook it up (routing, auth state,
// API call, validation, etc.) as part of the exercise.

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true)
       const response = await axios.get('/api/auth/login', {
        headers: { 'Content-Type': 'application/json' },    
      })
    }catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }

  };


  if(isLoading) return (
    <div>Loading...</div>
  )
  
  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Log in</h2>

        <p className="login-subtitle">Welcome back to Idea Tracker.</p>
         {error && <div>{error}</div>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <SubmitButton type="submit">Log in</SubmitButton>
      </form>
    </div>
  );
}

export default LoginPage;

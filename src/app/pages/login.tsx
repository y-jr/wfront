import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../../services/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await login(email, password);
      localStorage.setItem('token', token);
      router.push('/dashboard');
    } catch (err) {
      alert('Credenciais inválidas');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
      <button type="submit">Entrar</button>
    </form>
  );
}

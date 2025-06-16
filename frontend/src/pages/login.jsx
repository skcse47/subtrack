import { useState } from 'react';
import api from '../services/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // const { user, isAuthenticated, logout } = useContext(AuthContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/login', { email, password });
      alert('Login successful!');
        navigate('/subscribe'); // Adjust the path as needed

    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <form className="max-w-sm mx-auto mt-20 space-y-4" onSubmit={handleLogin}>
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default Login;

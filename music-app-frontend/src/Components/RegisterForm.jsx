import { useState } from 'react';
import { register } from '../api';

export default function RegisterForm() {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert('Registered!');
    } catch (err) {
        console.error(err); // for debugging
        alert('Registration failed.');
      }
      
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" onChange={handleChange} placeholder="Username" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
}

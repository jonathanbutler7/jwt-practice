import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('password');
  const history = useHistory();

  async function submit(e) {
    e.preventDefault();
    const url = `${process.env.SERVER}/login/getToken`;
    const body = { email, password };
    try {
      const response = await axios.post(url, body);
      localStorage.setItem('cool-jwt', response.data);
      history.push('/protected');
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <div>
      <h5>Login</h5>
      <form onSubmit={(e) => submit(e)}>
        <label htmlFor='email'>
          email
          <input
            type='text'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor='password'>
          password
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type='submit'>submit</button>
      </form>
    </div>
  );
}

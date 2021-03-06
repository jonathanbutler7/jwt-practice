import React, { useState } from 'react';
import axios from 'axios';

export default function SignUp() {
  const [email, setEmail] = useState('jonathan@jonathan.com');
  const [password, setPassword] = useState('jonathan');

  async function submit(e) {
    e.preventDefault();
    const url = `${process.env.SERVER}/login/seedUser`;
    const body = { email, password };
    try {
      const response = await axios.post(url, body);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h5>Sign up</h5>
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

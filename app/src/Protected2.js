import React from 'react';
import { useHistory } from 'react-router-dom';
export default function Protected() {
  const history = useHistory();

  function removeToken() {
    localStorage.removeItem('cool-jwt');
    history.push('/login');
  }

  return (
    <div>
      <h1>i am protected again</h1>
      <button onClick={(e) => removeToken()}>log out</button>
    </div>
  );
}

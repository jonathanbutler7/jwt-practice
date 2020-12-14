import React from 'react';

export default function Protected() {
  function removeToken() {
    localStorage.removeItem('cool-jwt');
    window.location.href = '/login';
  }
  return (
    <div>
      <h1>i am protected</h1>
      <button onClick={(e) => removeToken()}>log out</button>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
export default function Nav() {
  return (
    <nav
      style={{
        display: 'flex',
        width: '100%',
        border: '1px solid red',
        justifyContent: 'space-evenly',
      }}
    >
      <h1>
        <Link to='/'>Home</Link>
      </h1>
      <h1>
        <Link to='/signup'>Sign up</Link>
      </h1>
      <h1>
        <Link to='/login'>Log in</Link>
      </h1>
      <h1>
        <Link to='/protected'>Protected</Link>
      </h1>
    </nav>
  );
}

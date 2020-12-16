import React, { useEffect, useState } from 'react';
import { getJwt } from './helpers';
import axios from 'axios';

export default function AuthF(props) {
  const [user, setUser] = useState(undefined);
  const jwt = getJwt();

  useEffect(() => {
    if (!jwt) {
      window.location.href = '/login';
      alert('please log in to access /protected');
    }
    getUser();
  });

  async function getUser() {
    var config = {
      method: 'get',
      url: 'http://localhost:9000/login/getUser',
      headers: {
        Authorization: `bearer ${jwt}`,
      },
    };
    try {
      const response = await axios(config);
      setUser(response.data.email);
    } catch (error) {
      console.error('frig', error);
    }
  }
  return (
    <>
      {user === undefined ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div>{props.children}</div>
      )}
    </>
  );
}

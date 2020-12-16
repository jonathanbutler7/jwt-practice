import axios from 'axios';
import React, { Component } from 'react';
import { getJwt } from './helpers';
import { withRouter } from 'react-router-dom';

class AuthenticatedComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
    };
  }

  async componentDidMount() {
    const jwt = getJwt();
    if (!jwt) {
      this.props.history.push('/login');
      alert('please log in to access');
    }

    var config = {
      method: 'get',
      url: 'http://localhost:9000/login/getUser',
      headers: {
        Authorization: `bearer ${jwt}`,
      },
    };
    try {
      const response = await axios(config);
      this.setState({ user: response.data.email });
    } catch (error) {
      console.error('frig', error);
    }
  }
  render() {
    console.log(this.state.user);
    if (this.state.user === undefined) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(AuthenticatedComponent);

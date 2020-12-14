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

  componentDidMount() {
    const jwt = getJwt();
    if (!jwt) {
      this.props.history.push('/login');
    }

    // Axios.get('/getUser', { headers: { Authorization: `bearer ${jwt}` } })
    //   .then((res) => res.setState({ user: res.data }))
    //   .catch((err) => {
    //     localStorage.removeItem('cool-jwt');
    //     this.props.history.push('/login');
    //     console.error('your frig up is', err);
    //   });

    var config = {
      method: 'get',
      url: 'http://localhost:5000/getUser',
      headers: {
        Authorization: `bearer ${jwt}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        localStorage.removeItem('cool-jwt');
        this.props.history.push('/login');
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
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

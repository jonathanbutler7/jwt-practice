import React, { PureComponent } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: 'test@test.com',
      password: 'password',
    };
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submit(e) {
    e.preventDefault();
    console.log('submitting');

    var qs = require('qs');
    var data = qs.stringify({
      email: this.state.email,
      password: this.state.password,
    });
    var config = {
      method: 'post',
      url: 'http://localhost:5000/getToken',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        localStorage.setItem('cool-jwt', response.data);
        window.location.href = '/protected';
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <form onSubmit={(e) => this.submit(e)}>
          <label htmlFor='email'>
            email
            <input
              type='text'
              name='email'
              value={this.state.email}
              onChange={this.change}
            />
          </label>
          <label htmlFor='password'>
            password
            <input
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.change}
            />
          </label>
          <button type='submit'>submit</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);

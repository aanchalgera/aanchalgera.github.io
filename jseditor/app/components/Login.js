import React from 'react';
import {Link} from 'react-router';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: null,
      password: null
    };
  }
  userHandler(error, userData) {
    if (error) {
      console.log("Error creating user:", error);
    } else {
      console.log("Successfully created user account with uid:", userData.uid);
    }
  }
  authHandler(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      //window.location = '/';
      console.log("Authenticated successfully with payload:", authData);
    }
  }
  onTwiiterLogin(){
    this.props.base.authWithOAuthPopup("twitter", this.authHandler);
  }
  onGoogleLogin(){
    this.props.base.authWithOAuthPopup("google", this.authHandler);
  }
  onFacebookLogin(){
    this.props.base.authWithOAuthPopup("facebook", this.authHandler);
  }
  onGithubLogin(){
    this.props.base.authWithOAuthPopup("github", this.authHandler);
  }
  handleEmailChange(){}
  handlePasswordChange(){}
  onLogin() {
    let email = this.refs.email.getDOMNode().value;
    let password = this.refs.password.getDOMNode().value;

    if (email != '' && password != '') {
      this.props.base.authWithPassword({
        email    : email,
        password : password
      }, this.authHandler);
    } else {
      alert("Can't be null");
    }
  }
  createNewUser(e) {
    e.preventDefault();
    this.props.base.createUser({
      email: 'arpit@firebase.com',
      password: 'weasdzxc'
    }, this.userHandler);
  }
  render () {
    return (
      <div>
        <h2>Login</h2>
        <Link to="/login" className="btn btn-primary" onClick={this.onTwiiterLogin.bind(this)}>Twitter Login</Link>
        <Link to="/login" className="btn btn-primary" onClick={this.onFacebookLogin.bind(this)}>Facebook Login</Link>
        <Link to="/login" className="btn btn-primary" onClick={this.onGoogleLogin.bind(this)}>Google Login</Link>
        <Link to="/login" className="btn btn-primary" onClick={this.onGithubLogin.bind(this)}>Github Login</Link>
        <a href="#" className='btn btn-primary' onClick={this.createNewUser.bind(this)}>Create New User</a>
        <div className="container">
          <form className="form-signin">
            <h2 className="form-signin-heading">Please sign in</h2>
            <label for="inputEmail" className="sr-only">Email address</label>
            <input type="email" value={this.state.email} onChange={this.handleEmailChange.bind(this)} ref="email" id="inputEmail" className="form-control" placeholder="Email address" required />
            <label for="inputPassword" className="sr-only">Password</label>
            <input type="password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)} ref="password" id="inputPassword" className="form-control" placeholder="Password" required />
            <div className="checkbox">
              <label><input type="checkbox" value="remember-me" /> Remember me </label>
            </div>
            <button className="btn btn-lg btn-primary btn-block" onClick={this.onLogin.bind(this)} type="submit">Sign in</button>
          </form>
        </div>
      </div>
    )
  }
}

Login.contextTypes = {
  router: React.PropTypes.func.isRequired
};
export default Login;

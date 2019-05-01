import React from 'react';

class Login extends React.Component {

    login = (e) =>{
      e.preventDefault()
        this.props.setUsername(e.target.username.value)
    }
  render(){
  return (
    <div className="login">
      <form onSubmit={this.login}>
      <lable>UserName :</lable><br/>
      <input type="text" id="username" /><br/>
      <input type="submit" value="Log IN"/>
      </form>
    </div>
  );
}
}

export default Login;

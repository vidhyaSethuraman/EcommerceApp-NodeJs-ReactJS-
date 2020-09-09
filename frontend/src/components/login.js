import React from 'react';
import '../styles/login.css';
const axios = require('axios').default;


class Login extends React.Component
{


    constructor() 
    { 
      super(); 
      this.state = { 
         emailError : null,
         passwordError: null
        }; 

        this.LoginHandler = this.LoginHandler.bind(this)
    } 
    


    updateError(emailError,passwordError)
    {
        console.log("inside update error");
        this.setState({emailError,passwordError});
    }

    LoginHandler = e => 
    {
        e.preventDefault();
        var a = this.refs.email.value;
        var b = this.refs.password.value;
        console.log(a,b);
       var results =axios.post('http://localhost:8000/login', {
            email: a,
            password: b
        })
        .then(function (response) {
            console.log("Login handlerrrr" +response.data);
            localStorage.setItem('jwt',response.data.jwt);
            window.location.href="/";
        })
        .catch(function (err) {
            let error =err.response.data.errors;
            return error;
        });

        results.then(values => { 
            console.log(values.password); 
            this.updateError(values.email,values.password);
        });
    }

    SignBtnHandler = () =>
    {
        window.location.href ='/signup';
    }


  render()
  {
    return (
        <>
            <div class="container">

                <form>
                    <h3>Login</h3>
                    
                    <input type="text" ref="email" placeholder="Email" />
                    <div>{this.state.emailError}</div>
                    
                    <input type="password" ref="password" placeholder="Password" />
                    <div>{this.state.passwordError}</div>

                    <button onClick={this.LoginHandler}>login</button>
                </form>

                
                    <h3>New here?</h3>
                    <button type="submit" onClick={this.SignBtnHandler} >Create Account</button>
                

            </div>
        </>
    );
  }
}



export default Login;

import React from 'react';
import '../styles/login.css';
import M from 'materialize-css';
const axios = require('axios').default;


class SignUp extends React.Component
{


    constructor() 
    {
        super();
        this.state = { 
            emailError:null,
            passwordError:null
          }; 
        this.SignUpHandler = this.SignUpHandler.bind(this)
    } 


    updateError(emailError,passwordError)
    {
        console.log("inside update error");
        this.setState({emailError,passwordError});
    }
    SignUpHandler = e => 
    {
        e.preventDefault();
        var a = this.refs.email.value;
        var b = this.refs.password.value;
        //console.log(a,b);
       var results =axios.post('http://localhost:8000/signup', {
            email: a,
            password: b
        })
        .then(function (response) {
            console.log("signup handlerrrr" +response.data);
            console.log(response.data);
           
            localStorage.setItem('jwt',response.data.jwt);
             window.location.href="/";
            
        })
        .catch(function (err) {
            //alert("ERROR");
            let error =err.response.data.errors;
            return error;

        });

        results.then(values => { 
            console.log(values.password); 
            this.updateError(values.email,values.password);
        });
        
       
    }

    LoginBtnHandler = () =>
    {
        window.location.href ='/login';
    }


  render()
  {
    return (
        <>
            <div class="container">

                <form>
                    <h2>Sign Up</h2>
                    
                    <input type="text" ref="email" placeholder="Email" />
                    <div>{this.state.emailError}</div>
                    <input type="password" ref="password" placeholder="Password" />
                    <div>{this.state.passwordError}</div>
                    <button onClick={this.SignUpHandler}>Sign Up</button>
                </form>

                
                    <h2>One Of Us?</h2>
                    <button type="submit" onClick={this.LoginBtnHandler} >Log In</button>
                

            </div>

            <br/>
            <br/>
            
        </>
    );
  }
}



export default SignUp;

import React from 'react';
import './App.css';
const axios = require('axios').default;


class App extends React.Component
{

  constructor(props) 
  { 
      super(props); 
      this.state = { age:21, name:"vidhya"}; 
  } 

  /*clickHandler = () =>
  {
    //this.setState({name:"Vidhya Sethuraman"})
      axios.get('http://localhost:8000/login')
      .then(function (response) {
        // handle success
        console.log(response.data.message);
        alert("hellooo");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        alert("bye");
      })
    //var a =this.refs.email.value;
    //var b= this.refs.pw.value
  }*/

  clickHandler = () => {
    axios.post('http://localhost:8000/login', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
    .then(function (response) {
      console.log(response.data.message);
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  render()
  {
    return (
      <>
        <h1>{this.state.name}</h1>
        EMAIL: <input type="text"  ref="email" />
        <br/>
        PASSWORD: <input type="text" ref="pw" />
        <br/>
        <button onClick={this.clickHandler}>Log In Nowss</button>
      </>
    );
  }
}



export default App;

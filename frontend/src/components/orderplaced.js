import React from 'react';
import '../styles/orderplaced.css';
import { Link} from 'react-router-dom';


const axios = require('axios').default;


class OrderPlaced extends React.Component
{
    
   constructor() 
    { 
        super(); 
        this.state = { 
            delivary_date:null
            }; 
    
        this.componentWillMount = this.componentWillMount.bind(this)
    } 


   
  componentWillMount()
  {
    let jwt =localStorage.getItem('jwt');
    var abc = axios.get('http://localhost:8000/order/placed',{params: {jwt}})
    .then(function (response) 
    {
        this.setState({delivary_date: response.data.delivary_date});

    }.bind(this))
    .catch(function (error) 
    {
        console.log(error);
        alert("error");
    })
   
  }

   


  render()
  {
    return (
        <>
           <div class="order-placed">
                <h2>Payment Successfull</h2>
                <h3>Order Placed</h3>
                <h4>Expected Delivary Date : {this.state.delivary_date}</h4>
                <p>Hope You Enjoyed the Shopping Expirience! :)</p>
                <Link to='/'><button>Home Page</button></Link>    
            </div> 
        </>
    );
  }
}



export default OrderPlaced;

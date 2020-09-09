import React from 'react';
import '../styles/cart.css';
import CartItem from './CartItem';

//images
import dress1 from '../images/dress1.jpg';
import dress2 from '../images/dress2.jpg';
import dress3 from '../images/dress3.jpg';
import dress4 from '../images/dress4.jpg';
import dress5 from '../images/dress5.jpg';
import dress6 from '../images/dress6.jpg';
import dress7 from '../images/dress7.jpg';
import dress8 from '../images/dress8.jpg';

const axios = require('axios').default;

class Cart extends React.Component
{

    constructor() 
    { 
      super(); 
      this.state = { 
         productdetails:[],
         products:[],
         totalamt:null,
         noOfItems:null,
         images:[dress1,dress2,dress3,dress4,dress5,dress6,dress7,dress8],
         user:null
        }; 

        this.componentWillMount = this.componentWillMount.bind(this)
    } 


    updatestate(a,b,c,d)
    {
        console.log("HELOOOOOOOOOOOOOOOOOOOOOOO");
        this.setState({products: a,noOfItems:c,totalamt:b,user:d}, () => {
            console.log("UPDATED STATEEEEEEEEEEEEEEEEEE " +this.state.products);
            console.log(this.state.products);
        }); 
        var productdetails=[];
        for (var i=0;i<this.state.products.length;i++)
        {
            let details = this.state.products[i];
            let idp = details.id-1;
            //console.log(details);
            var pd= <CartItem  collectionName = {details.collectionName}  name ={details.name} price= {details.price}  id = {details.id} img = {this.state.images[idp]} />
            //console.log(pd);
            productdetails.push(pd);
            //console.log(productdetails);
        }

        this.setState({productdetails});
        
    }

    
        
    componentWillMount()
    {
        var a,b,c,d;
        let jwt =localStorage.getItem('jwt');
        console.log(jwt);
        var abc = axios.get('http://localhost:8000/cart',{params: {jwt}})
        .then(function (response) 
        {
            a = response.data.prodet;
            b = response.data.totalamt;
            c = response.data.items; //no of items
            d = response.data.user;
            this.updatestate(a,b,c,d);

            console.log(a);

            if(d===false)
            {
                window.localation.href="/login";
            }

        }.bind(this))
        .catch(function (error) {
        // handle error
        console.log(error);
        alert("bye");
        })
    
    }


    proceedbtn = e => 
    {
        let jwt =localStorage.getItem('jwt');
       axios.get('http://localhost:8000/checkout',{params: {jwt}})
        .then(function (response) {
           
            console.log(response.data.addr);
            if(response.data.addr===false)
            {
                window.location.href="/checkout/address/form"
            }
            else
            {
                console.log("Address present ppau");
                window.location.href="/checkout/address/conformation";
            }
            
        })
        .catch(function (error) {
            console.log("SERVER ERRORRRRRR " + error);
        });

    }


  render()
  {
    return (
        <>
            <div class="cart-box">
                <center>
                    <div class="cart-header">
                        <div>My Shopping Cart ({this.state.noOfItems})</div>
                        <div>Total Price:&#8377; {this.state.totalamt}</div>
                    </div>

                    <br/>
                
                    {this.state.productdetails}
        
                    
                    <button onClick={this.proceedbtn} class="buy-btn">Proceed to Buy</button>
                    
                </center>
            </div>

        </>
    );
  }
}



export default Cart;

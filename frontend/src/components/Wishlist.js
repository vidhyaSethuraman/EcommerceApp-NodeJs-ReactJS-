import React from 'react';
import '../styles/cart.css';
import WishListItem from './wishlistItems';

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

class Wishlist extends React.Component
{

    constructor() 
    { 
      super(); 
      this.state = { 
         productdetails:[],
         products:[],
         noOfItems:null,
         images:[dress1,dress2,dress3,dress4,dress5,dress6,dress7,dress8],
         user:null
        }; 

        this.componentWillMount = this.componentWillMount.bind(this)
    } 


    updatestate(a,c,d)
    {
        console.log("HELOOOOOOOOOOOOOOOOOOOOOOO");
        this.setState({products: a,noOfItems:c,user:d}, () => {
            console.log("UPDATED STATEEEEEEEEEEEEEEEEEE " +this.state.products);
            console.log(this.state.products);
        }); 
        var productdetails=[];
        for (var i=0;i<this.state.products.length;i++)
        {
            let details = this.state.products[i];
            let idp = details.id-1;
            //console.log(details);
            var pd= <WishListItem  collectionName = {details.collectionName}  name ={details.name} price= {details.price}  id = {details.id} img = {this.state.images[idp]} />
            //console.log(pd);
            productdetails.push(pd);
            //console.log(productdetails);
        }

        this.setState({productdetails});
        
    }

    
        
    componentWillMount()
    {
        var a,c,d;
        let jwt =localStorage.getItem('jwt');
        //console.log(jwt);
        var abc = axios.get('http://localhost:8000/wishlist',{params: {jwt}})
        .then(function (response) 
        {
            a = response.data.prodet;
            c = response.data.items; //no of items
            d = response.data.user;
            
            this.updatestate(a,c,d);

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


  

  render()
  {
    return (
        <>
            <div class="cart-box">
                <center>
                    <div class="cart-header">
                        <div>My Wishlist ({this.state.noOfItems})</div>
                    </div>

                    <br/>
                
                    {this.state.productdetails}
                    
                </center>
            </div>
        </>
    );
  }
}


export default Wishlist;

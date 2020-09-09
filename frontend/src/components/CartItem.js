import React from 'react';

import '../styles/cart.css';

const axios = require('axios').default;


class CartItem extends React.Component
{

    DeleteItem = e =>
    {
        e.preventDefault();
        let jwt =localStorage.getItem('jwt');
        console.log("ITEM TO BE DELTED ID  : " +this.props.id);
        let abc =axios.get('http://localhost:8000/cartdelete' + this.props.id,{params: {jwt}})
        .then(function (response) 
        {
            console.log(response);
            //alert("Item removed from cart");
            window.location.href="/cart";

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
            <div class="cart-items">

                <div style={{flexGrow: 1}}><img class="productImage" src={this.props.img} height="200px"/></div>
                <div style={{flexGrow: 10}}>
                    <h5 >{this.props.collectionName} </h5>
                    <h6 > {this.props.name} </h6>
                    <p class="price">Price: &#8377; {this.props.price}</p>

                    <br/>
                    <form >
                        <button onClick={this.DeleteItem}>delete</button>
                    </form>
                    
                    <form>
                        <button>Move to Wishlist</button>
                    </form>
                </div>
                    
            </div>
        </>
    );
  }
}



export default CartItem;

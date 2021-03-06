import React from 'react';
import '../styles/productcard.css';
import M from 'materialize-css';

const axios = require('axios').default;


class ProductCard extends React.Component
{

  handleCartButton = e =>
  {
    e.preventDefault();
    let jwt =localStorage.getItem('jwt');
    let abc =axios.get('http://localhost:8000/addtocart' + this.props.id ,{params: {jwt}})
    .then(function (response) 
    {
      console.log(response.data.cart);
        if(response.data.cart===true)
        {
          //M.toast({html: 'Added To cart'})
            window.location.href='/';
        }
        else
        {
            window.location.href = '/login';
        }

    }.bind(this))
    .catch(function (error) {
      // handle error
      console.log(error);
      alert("bye");
    })
  }


  handleWishButton= e =>
  {
    e.preventDefault();
    let jwt =localStorage.getItem('jwt');
    let abc =axios.get('http://localhost:8000/addtowishlist' + this.props.id ,{params: {jwt}})
    .then(function (response) 
    {
      console.log(response.data.user);
        if(response.data.user===true)
        {
          //M.toast({html: 'Added to WishList!'})
          window.location.href='/';
        }
        else
        {
            window.location.href = '/login';
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
            <div className="product-item"> 
            <div class="product-image"><img src= {this.props.img} alt="dresss" height="392px" width="280px" /></div>
                <div class="product-details"> 
                    <h5>{ this.props.collectionName }</h5>
                    <h6>{ this.props.name}</h6>
                    <p>Price: &#8377;{ this.props.price }</p>
                    <button  class="cart" onClick={this.handleCartButton}>Add to cart</button>
                    <button  class="wishlist" onClick={this.handleWishButton} >Add to Wishlist</button>
                </div>
            </div>
        </>
    );
  }
}



export default ProductCard;

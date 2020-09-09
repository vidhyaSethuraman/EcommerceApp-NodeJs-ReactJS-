import React from 'react';
import '../styles/main.css';
import ProductCard from './ProductCard';
import { Link} from 'react-router-dom';


import logo from '../images/logo.jpeg';
import dress1 from '../images/dress1.jpg';
import dress2 from '../images/dress2.jpg';
import dress3 from '../images/dress3.jpg';
import dress4 from '../images/dress4.jpg';
import dress5 from '../images/dress5.jpg';
import dress6 from '../images/dress6.jpg';
import dress7 from '../images/dress7.jpg';
import dress8 from '../images/dress8.jpg';

const axios = require('axios').default;



class Main extends React.Component
{

   constructor() 
  { 
      super(); 
      this.state = { 
          products :[],
          CartnoOfItems:null,
          WLnoOfItems:null,
          user:null,
          productdetails:[],
          images:[dress1,dress2,dress3,dress4,dress5,dress6,dress7,dress8]
        }; 

        this.componentWillMount = this.componentWillMount.bind(this)
  } 

    updatestate(a,b,c,d)
    {
        
        this.setState({products: a,CartnoOfItems:b,user:c,WLnoOfItems:d}, () => {
            console.log("UPDATED STATEEEEEEEEEEEEEEEEEE " +this.state.products);
            console.log(this.state.user);
        }); 
        var productdetails=[];
        for (var i=0;i<this.state.products.length;i++)
        {
            let details = this.state.products[i];
            //console.log(details);
            var pd= <ProductCard  collectionName = {details.collectionName}  name ={details.name} price= {details.price}  id = {details.id} img = {this.state.images[i]} />
            //console.log(pd);
            productdetails.push(pd);
            //console.log(productdetails);
        }
        console.log(productdetails);
        this.setState({productdetails});
        
    }

    


  componentWillMount()
  {
    
      var a,b,c,d;
      let jwt =localStorage.getItem('jwt');
      console.log("JWT VALUE : " +jwt);
    var abc = axios.get('http://localhost:8000/',{params: {jwt}})
    .then(function (response) 
    {
        a = response.data.prodet;
        b = response.data.CartnoOfItems;
        c = response.data.user;
        d= response.data.WLnoOfItems;
        console.log(b,d);
        this.updatestate(a,b,c,d);

    }.bind(this))
    .catch(function (error) 
    {
        console.log(error);
        alert("error");
    })
   
  }

  logoutHandler()
  {
      localStorage.removeItem('jwt');
  }


  renderUserButton()
  {

    console.log("user state : " + this.state.user);
    if(this.state.user===false) 
    {
        
    return (

        <a href="">
            <form action="/login" method="GET">
                <button type="submit">Log In</button>
            </form>
        </a>);
        
    } else { 
    return(
        <a href="">
            <form>
            <button type="submit" onClick={this.logoutHandler}>Log Out</button>
            </form>
        </a> );
    }
  }



  render()
  {
    return (
      <>
        <nav>
            <div>
                <h3><img src={logo} alt="camilla miller" height="100px" width="170px" /></h3>
            </div>
            <div >
                <input type="text" placeholder="Search.." name="search"/>
                <button className="searchButton" type="submit"><i className="fa fa-search" style={{color:"goldenrod"}}></i></button>
            </div>
            <div>   
                <div className="dropdown">
                    <i className='fas fa-user-alt profile' style={{marginTop: 0.5 + 'rem'}}></i>
                <h6>Profile</h6>
                    <div className="dropdown-content">
                    <a href="">Profile Info</a>
                    <a href="">
                        <form action="/order/tracking" method="GET">
                            <button>Orders</button>
                        </form>
                    </a>
                    
                        
                    {this.renderUserButton()}
                    
                    
                    </div>
                </div> 
            </div>

            <div>
                <form action="/wishlist" method="GET">
                    <button>
                        <Link to='/wishlist'>
                            <i className="fas fa-heart" style={{fontSize: 2.3+'rem'}}></i>
                            <h6>WishList {this.state.WLnoOfItems}</h6>
                        </Link>
                    </button>
                </form>
            </div>
            <div> 
                <form>
                <button type="submit">
                    <Link to='/cart'>
                        <i className="fa fa-shopping-cart" style={{fontSize: 2.3+'rem'}}></i>
                        <h6>Cart {this.state.CartnoOfItems}</h6>
                    </Link>
                </button>
                </form>
            </div>

        </nav>
        <br/>
        <br/>
        <center><h3 class="collectionHeading">Check Out Our New Summer Collection</h3></center>

        <div class="product-card">
            {this.state.productdetails}
        </div>

      </>
    );
  }
}



export default Main;

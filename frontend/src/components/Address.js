import React from 'react';
import '../styles/address.css';
import AddressDetail from './addressdetails';
const axios = require('axios').default;


class Address extends React.Component
{    

    constructor() 
    { 
        super(); 
        this.state = { 
            selectedaddr:null,
            useraddress:[]
          }; 
  
          this.componentWillMount = this.componentWillMount.bind(this)
          this.selectedAddress = this.selectedAddress.bind(this)
          this.HandleProceedBtn = this.HandleProceedBtn.bind(this)
    } 
  
  updatestate(a)
  {
      console.log("yayyyyyyyyyyyyyyy");
      var addressdetails=[];
      for (var i =0 ;i<a.length;i++)
      {
        let details = a[i];
        //console.log(details);
        var pd= <AddressDetail   name ={details.name} price= {details.price}  id = {details._id} mobileno={details.mobileno} details={details.details}  city={details.city} state={details.state} pincode={details.pincode} selectedAddr={this.selectedAddress}/>
        //console.log(pd);
        addressdetails.push(pd);
      }

      this.setState({useraddress:addressdetails});
  }

 selectedAddress(a)
  {
      this.setState({selectedaddr:a}, () => {
        console.log("SELECTED ADDRESS IS " + this.state.selectedaddr);
    }); 
  }
      
    componentWillMount()
    {
        var a;
        let jwt =localStorage.getItem('jwt');
        console.log(jwt);
        var abc = axios.get('http://localhost:8000/checkout/address/conformation',{params: {jwt}})
        .then(function (response) 
        {
            a = response.data.useraddress;
            this.updatestate(a);

        }.bind(this))
        .catch(function (error) 
        {
            console.log(error);
            alert("error");
        })

    }

    HandleProceedBtn()
    {
        var addr = this.state.selectedaddr;
        let jwt =localStorage.getItem('jwt');
       axios.post('http://localhost:8000/checkout/address/save?jwt=' + jwt, {
        selectedaddr: addr
        })
        .then(function (response) {
           
            console.log(response.data);
            window.location.href="/checkout/payment";
           
        })
        .catch(function (error) {
            console.log("SERVER ERRORRRRRR " + error);
        });
    }

    HandleNewAddrBtn()
    {
        window.location.href='/checkout/address/form';
    }



      render()
      {
        return (
            <>
                <center className="addr-container">
                    <div class="addr-checkout-header">Select Address</div>
                    <br/>

                    {this.state.useraddress}

                    <button type="submit" class="buy-btn" onClick={this.HandleProceedBtn}>Proceed to payment</button> 

                    <button class="buy-btn" onClick={this.HandleNewAddrBtn}>Add new Address</button>

                </center>
            </>
        );
      }
    
}



export default Address;

import React from 'react';
import '../styles/addressform.css';
const axios = require('axios').default;


class AddressForm extends React.Component
{    
   NewAddressHandler = e => 
    {
        console.log("HEREEEEEEEEEEEEEee");
        e.preventDefault();
        var name = this.refs.name.value;
        var mobileno = this.refs.mobileno.value;
        var pincode =this.refs.pincode.value;
        var details =this.refs.details.value;
        var landmark =this.refs.landmark.value;
        var city = this.refs.city.value;
        var state =this.refs.state.value;
        var defaulta =this.refs.defaulta.value;
        var addrHome =this.refs.addrHome.value;
        var addrOffice =this.refs.addrOffice.value;
        console.log(name,defaulta);
        let jwt =localStorage.getItem('jwt');
        //console.log(a,b);
       axios.post('http://localhost:8000/checkout/address?jwt=' +jwt, {
           name, mobileno,pincode,details,landmark,city,state,addrHome,addrOffice,defaulta,jwt
        })
        .then(function (response) {
            console.log(response.data);

            window.location.href="/checkout/address/conformation";
            
        })
        .catch(function (error) {
            console.log(error);
        });

    }



  render()
  {
    return (
        <>
          <form  class="container-address">
            <center>
                <h1>Contact Details</h1>
                <input type="text" ref="name" placeholder="Name" required />
                <input type="text" ref="mobileno" placeholder="Mobile No" required />
                <h1>Address</h1>
                <input type="text" ref="pincode" placeholder="Pincode" required />
                <input type="text" ref="details" placeholder="Address (House No, Building, Street, Area)*" required />
                <input type="text" ref="landmark" placeholder="Landmark" />
                <input type="text" ref="city" placeholder="City / District" required />
                <input type="text" ref="state" placeholder="State" required />
                <br />
                <span>Save address  </span>
                &nbsp;<input type="radio" ref="addrHome" /> Home
                &nbsp;<input type="radio" ref="addrOffice" /> Office
                <br /><br/>
                <input type="checkbox" ref="defaulta" /> <span> &nbsp;Make this my Default Address</span>  <br /><br />
                <button type="submit" onClick={this.NewAddressHandler}>Proceed</button> 
            </center>
        </form>  
        </>
    );
  }
}



export default AddressForm;

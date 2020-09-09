const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Customer = require("../models/customers");

const authorize = (req, res, next) => {
 console.log("in authooooo");
  //const token = req.cookies.jwt;
  var token = req.query.jwt;
  console.log("AUTO TOKENNN " +token);
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'camilla miller webapp', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.auth = null;
        //res.redirect('/login');
        next();
      } else {
        //console.log(decodedToken);
        res.locals.auth = true;
        res.locals.jwt = jwt;
        next();
      }
    });
  } else {
    res.locals.auth = null;
    //res.redirect('/login');
    next();
  }
};


const checkUser = async(req, res, next) => {
  console.log("IN CHECK USERRRRRRRR");
  //const token = req.cookies.jwt;
  const token = req.query.jwt;
  var mtc = req.query.mtc;
  res.locals.mtc =mtc;
  //console.log("REq paramsss " + token );
  //console.log(token);
  if (token) {
    jwt.verify(token, 'camilla miller webapp', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await Customer.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { authorize, checkUser };
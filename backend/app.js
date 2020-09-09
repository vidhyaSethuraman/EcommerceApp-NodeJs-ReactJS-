const express = require('express');
const mongoose = require('mongoose');
const appRoutes = require('./routes/appRoutes');

var cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors())



mongoose.connect('mongodb+srv://test:test@cluster0.wdsct.mongodb.net/ecommerceApp?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true })
.then(function(){
    try{
    app.listen(8000);
    }
    catch(err)
    {
        console.log(err);
    }
})
.catch(function(err){console.log(err);});


app.use(appRoutes);




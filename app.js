const express = require("express");
const app = express();
const path=require("path");
const mongoose = require('mongoose');
const bodyparser=require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 8000;
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  concern: String,
  
})
const contact = mongoose.model('contact', contactSchema);

app.use(express.static(path.join(__dirname, "views")));

 
app.get("/home", function(req, res){ 
    console.log(req.url);
    console.log(path.join(__dirname,"views","index.html"))
    res.status(200).sendFile(path.join(__dirname,"/views","index.html"));
   
});
 
app.get("/about",(req, res)=>{ 
    console.log(req.url);
    res.status(200).sendFile(path.join(__dirname,"views","about.html"));
   
});
app.get("/contacts",(req, res)=>{ 
    console.log(req.url);
    res.status(200).sendFile(path.join(__dirname,"views","contacts.html"));
   
});
app.get("/btn",(req, res)=>{ 
    console.log(req.url);
    res.status(200).sendFile(path.join(__dirname,"views","btn.html"));
   
});
app.post('/', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
  })
  })






app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

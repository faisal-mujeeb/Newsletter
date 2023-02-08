const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html" );
}); 

app.post("/", function(req,res){
      var firstName =req.body.fname;
      var lastName= req.body.lname;
      var email = req.body.email;

    //   console.log(firstName,lastName ,email );
    const data = {
        members: [
            {
                email_address:email,
                status: "subscribed",

                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName

                }
                 
            }
        ]
    };

    const jsonData = JSON .stringify(data);
    const url = "https://us4.api.mailchimp.com/3.0/lists/4bcf3cbb34";

    const options = {
        method: "POST",
        auth: "faisal:26fd6550f2d404fde97ecfcd511e3e7-us21 "
    }

    const request =  https.request(url,option, function(response){
        if(response.statusCode ==200){
            res.sendFile(__dirname + "/success.html");
         } else{
               res.sendFile(__dirname + "/failure.html");
            }
        
     response.on("data",function(data){
        console.log(JSON.parse(data));
     }) 
    })
    request.write(jsonData); 

});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});




//API KEYS
//26fd6550f2d404fde97ecfcd511e3e7-us21
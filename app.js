const express=require("express");
const app=express();
const request=require("request");
const bodyParser=require("body-parser");
const multer=require("multer");
const https=require("https");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
//res.sendFile(__dirname+"/styles.css");
  res.sendFile(__dirname+"/signup.html");

});
app.post("/",function(req,res){
  const n1=req.body.first;
  const n2=req.body.last;
  const n3=req.body.second;
  const data={
    members:[
      {
        email_address: n3,
        status: "subscribed",
        merge_fields:{
          FNAME: n1,
          LNAME: n2
        }
      }
    ]
  };
  const jsondata=JSON.stringify(data);
  const url="https://us14.api.mailchimp.com/3.0/lists/f8fd6f7b94";
  const options ={
    method: "POST",
    auth: "sajal:4c88902163d4c13f3f1f3a12f80b7d70-us14"
  }
const request=  https.request(url,options,function(response){
  if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html");
  }
  else{
    res.sendFile(__dirname+"/failure.html");
  }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });
request.write(jsondata);
request.end();




});
app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(3000,function(){
  console.log("server started");
});
//4c88902163d4c13f3f1f3a12f80b7d70-us14
//f8fd6f7b94.

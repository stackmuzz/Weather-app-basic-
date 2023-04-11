const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const https=require("https");
app.use(bodyParser.urlencoded({extended: true}));
require('dotenv').config();



app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");




});


app.post("/",function(req,res){
    
    const query=req.body.cityName;
    const app_id=process.env.APP_ID;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid="+app_id;
        https.get(url,function(response){
            console.log(response.statusCode);
    
    response.on("data",function(data){
       const weatherData=JSON.parse(data);

    const temp1= weatherData.main.temp;

    console.log(temp1);
    const weatherDescription=weatherData.weather[0].description;
    console.log(weatherDescription);
    const icon=weatherData.weather[0].icon;
    const imgURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";
    res.write("<p>Currently the weather is :"+weatherDescription+"</p>");
    res.write("<h1>The temperature in "+query+" is "+temp1+" degrees celsius</h1>");
    res.write("<img src="+imgURL+">");
    res.send();
    });
    
        });
});


app.listen(process.env.PORT||3000,function(){
    console.log("server started at port 3000");
});
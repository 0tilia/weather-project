const { response } = require("express");
const express = require("express");

const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {


    res.sendFile(__dirname + "/index.html")

});

app.post("/", function(req, res){ 

    // console.log(req.body.cityName);

    const query = req.body.cityName;
    const apiKey = "acf1f982221f0613c31c89c85a5c3f12";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units=" + units;

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on('data', function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.feels_like
            console.log(temp);
            const description = weatherData.weather[0].description
            console.log(description);
            res.write("<p>The weather is currently " + description + "</p>");
            res.write("<h1>The temparature in " + query + " is " + temp + " degrees Celcius.");
            res.send()
        })    
    })

})





app.listen(3000, function() {
    console.log("Console is running on port 3000.")
})
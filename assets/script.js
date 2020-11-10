$(document).ready(function () {

    if (navigator.geolocation) { // device can return its location
        navigator.geolocation.getCurrentPosition(function (position) {

            lat = position.coords.latitude;
            lon = position.coords.longitude;

            console.log(lat);
            console.log(lon);
            searchWeather(lat, lon);
        });
    }



    $(".button").on("click", function () {
        console.log("show btn click")

    });

    function searchWeather(lat, lon) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=92f752c6db223987cf5c4bb3937d6b85&units=imperial",
            dataType: "json",
        }).then(function (data) {
            console.log(data);

            $("#today").empty()

            // creating a card for appending weather data
            var title = $("<h3>").addClass("card-title").text(data.name);
            var card = $("<div>").addClass("card");
            var wind = $("<p>").addClass("card-text").text("Wind Speed: " + (data.wind.speed).toFixed(1) + " MPH");
            var humidity = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
            var temp = $("<p>").addClass("card-text").text("Temperature: " + (data.main.temp).toFixed(1) + " \u00B0F");
            var cardBody = $("<div>").addClass("card-body");

            cardBody.append(title, wind, humidity, temp);
            card.append(cardBody);
            $("#today").append(card);
        });
    };





    // event that occurs when you click on CLICK HERE
    // event that occurs when you click on DIY/RECREATIONAL/SOCIAL/
    //          EDUCATIONAL/BUSYWORK/COOKING/RELAXATION/CHARITY/MUSIC
    //





















});
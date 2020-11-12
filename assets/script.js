$(document).ready(function () {

    $("#myModal").modal('show');

    // ask user for permission to get location
    if (navigator.geolocation) { // device can return its location
        navigator.geolocation.getCurrentPosition(function (position) {

            lat = position.coords.latitude;
            lon = position.coords.longitude;

            // console.log(lat);
            // console.log(lon);
            searchWeather(lat, lon);
        });
    };



    // function to search weather given latitude and longitude coordinates
    function searchWeather(lat, lon) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=92f752c6db223987cf5c4bb3937d6b85&units=imperial",
            dataType: "json",
        }).then(function (data) {
            console.log(data);

            $("#today").empty()

            // creating a card for appending weather data
            var title = $("<h4>").addClass("card-title, weatherCity").text(data.name);
            var card = $("<div>").addClass("card, weatherCard");
            // var wind = $("<p>").addClass("card-text").text("Wind Speed: " + (data.wind.speed).toFixed(1) + " MPH");
            // var humidity = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
            var main = $("<h6>").addClass("card-text, forecast").text(data.weather[0].main);
            var temp = $("<h5>").addClass("card-text, cityTemp").text((data.main.temp).toFixed(1) + " \u00B0F");
            var cardBody = $("<div>").addClass("card-body");

            cardBody.append(title, temp, main);
            card.append(cardBody);
            $(".weatherWidget").append(card);
        });
    };

    // $("[type ='button']").on("click", function () {

    // });


    // function to select activity user clicked on
    function activityPick(activityType) {
        $.ajax({
            type: "GET",
            url: "http://www.boredapi.com/api/activity?type=" + activityType,
            dataType: "json",
        }).then(function (data) {
            console.log(data);

            $(".modal-title").empty();
            $(".modal-body").empty();

            type = $("<h5>").text(data.type);
            activity = $("<h3>").addClass("activity").text("Activity: " + data.activity);
            participants = $("<p>").addClass("participants").text("Participants: " + data.participants);

            $(".modal-title").append(type);
            $(".modal-body").append(activity, participants);
        });
    }


    $("[type ='button']").on("click", function () {
        if ($(this).attr("id") === "fortune") {
            fortuneCookie();
        } else activityType = $(this).attr("id");
        // console.log("activityType")
        activityPick(activityType);
    });


    function fortuneCookie() {
        $.ajax({
            type: "GET",
            url: "https://type.fit/api/quotes",
            dataType: "json",
        }).then(function (data) {
            var fortuneData = data;
            var author;
            var quote;
            console.log(fortuneData);

            randomNumber = Math.floor(Math.random() * fortuneData.length);
            console.log("randomNumber: ", randomNumber);

            author = fortuneData[randomNumber].author;
            quote = fortuneData[randomNumber].text;
            console.log(author, quote);

            $(".modal-title").empty();
            $(".modal-body").empty();

            $(".modal-title").append(author);
            $(".modal-body").append("\"" + quote.italics() + "\"");


        });
    }


    // $("[type ='button']").on("click", function () {
    //     if ($(this).attr("id") === save) {
    //         saveActivity();
    //     }
    // });

    // function saveActivity() {


    // }


    // event that occurs when you click on CLICK HERE
    // event that occurs when you click on DIY/RECREATIONAL/SOCIAL/
    //          EDUCATIONAL/BUSYWORK/COOKING/RELAXATION/CHARITY/MUSIC
    //

});
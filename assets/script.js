$(document).ready(function () {

    $("#myModal").modal('show');

    $(function () {
        $('.whatAmI').popover({
            container: 'body'
        })
    })

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
            url: "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=92f752c6db223987cf5c4bb3937d6b85&units=imperial",
            dataType: "json",
        }).then(function (data) {
            // console.log(data);

            $("#today").empty()

            // creating a card for appending weather data
            var title = $("<h4>").addClass("card-title, weatherCity").text(data.name);
            var card = $("<div>").addClass("card, weatherCard");
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
            url: "https://www.boredapi.com/api/activity?type=" + activityType,
            dataType: "json",
        }).then(function (data) {
            // console.log(data);

            $(".modal-title").empty();
            $(".modal-body").empty();
            $("#fortune").show();
            $("#save").show();
            $("#next").show();
            $(".goodTime").hide();

            if (activityType === "diy") {
                outsideLink = "https://diyprojects.com/diy-craft-sites/#diyprojects"
            } else if (activityType === "relaxation") {
                outsideLink = "https://www.helpguide.org/articles/stress/relaxation-techniques-for-stress-relief.htm"
            } else if (activityType === "social") {
                outsideLink = "https://www.facebook.com/"
            } else if (activityType === "education") {
                outsideLink === "https://www.khanacademy.org/"
            } else if (activityType === "busywork") {
                outsideLink === "https://www.lifehack.org"
            } else if (activityType === "cooking") {
                outsideLink === "https://www.allrecipes.com/"
            } else if (activityType === "recreational") {
                outsideLink === "https://www.usa.gov/recreation"
            } else if (activityType === "charity") {
                outsideLink === "https://www.charitynavigator.org/"
            } else if (activityType === "music") {
                outsideLink === "https://www.spotify.com"
            }

            type = $("<h5>").text(data.type);
            activity = $("<h3>").addClass("activity").text("Activity: " + data.activity);
            // participants = $("<p>").addClass("participants").text("Participants: " + data.participants);
            link = $("<a>").attr("href", outsideLink).attr("target", "_blank").text("Go Explore!")

            $(".modal-title").append(type);
            $(".modal-body").append(activity, link);
        });
    }


    $("[type ='button']").on("click", function () {
        console.log("buttonclicked");
        if ($(this).attr("id") === "save") {
            console.log("buttonclicksave");
            saveActivity();
        } else if ($(this).attr("id") === "fortune") {
            console.log("buttonclickfortune");
            fortuneCookie();
        } else if (activityType = $(this).attr("id")) {
            console.log("activityType");
            activityPick(activityType);
        }
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
            // console.log(fortuneData);

            randomNumber = Math.floor(Math.random() * fortuneData.length);
            // console.log("randomNumber: ", randomNumber);

            author = fortuneData[randomNumber].author;
            quote = fortuneData[randomNumber].text;
            // console.log(author, quote);

            $(".modal-title").empty();
            $(".modal-body").empty();
            $("#fortune").hide();
            $("#save").hide();
            $("#next").hide();

            var haveFun = $("<button>").addClass("goodTime").text("Have Fun!!");
            $(haveFun).attr("data-dismiss", "modal");

            $(".modal-footer").append(haveFun);
            $(".modal-title").append(author);
            $(".modal-body").append("\"" + quote.italics() + "\"");
        });
    }


    // $("[type ='button']").on("click", function () {
    //     // if ($(this).attr("id") === save) {
    //     //     saveActivity();
    //     // }
    // });

    function saveActivity() {
        title = $("#staticBackdropLabel").text();
        body = $("#body-text").text();
        console.log(title, body);
        localStorage.setItem(title, body);

    }


    // event that occurs when you click on CLICK HERE
    // event that occurs when you click on DIY/RECREATIONAL/SOCIAL/
    //          EDUCATIONAL/BUSYWORK/COOKING/RELAXATION/CHARITY/MUSIC
    //

});
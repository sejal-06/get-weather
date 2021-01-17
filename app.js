// "use strict";

$(function () {
    var getData = function (request, response) {
        $.getJSON(
            "https://gd.geobytes.com/AutoCompleteCity?callback=?&fulltext=true&key=7c756203dbb38590a66e01a5a3e1ad96&q=" + request.term,
            function (data) {
                if (data[0] == "%s" || data[0] == "") {
                    //response();
                } else {
                    response(data);
                }
                //console.log(data);

            });
    };

    // var selectItem = function (event, ui) {
    //     $("#city").val(ui.item.value);
    //     return false;
    // }

    $("#city").autocomplete({
        source: getData,
        //select: selectItem,
        //minLength: 2,
        //autofocus: true,
        // change: function () {
        //     $("#city").val("").css("display", 2);
        // }
    });
});

searchButton.addEventListener('click', searchWeather);

function searchWeather() {
    loadingText.style.display = 'block';
    weatherBox.style.display = 'none';
    var fullName = searchCity.value;
    var cityName = fullName.split(',')[0];
    //var stateCode = fullName.split(',')[1];
    //var countryName = fullName.split(',')[2];

    if (fullName.trim().length == 0) {
        loadingText.style.display = 'none';
        return alert('Please enter a City Name');
    }
    // var http = new XMLHttpRequest();
    // var apiKey = '1f5b2b3ae6038c7bd37f2b67d715d33b';
    // var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + ',' + stateCode + ',' + countryName + '&appid=' + apiKey;
    // var method = 'GET';

    // http.open(method, url);
    // http.onreadystatechange = function () {
    //     if (http.readyState == XMLHttpRequest.DONE && http.status === 200) {
    //         var data = JSON.parse(http.responseText);
    //         var weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
    //         weatherData.temperature = data.main.temp;
    //         updateWeather(weatherData);
    //     } else if (http.readyState === XMLHttpRequest.DONE) {
    //         alert('Something went wrong!');
    //     }
    // };
    // http.send();


    var apiKey = '1f5b2b3ae6038c7bd37f2b67d715d33b';
    //var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + ',' + stateCode + ',' + countryName + '&appid=' + apiKey;
    $.ajax({
        type: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey,
        success: function (result) {
            var data = result;
            var weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
            weatherData.temperature = data.main.temp;
            console.log(weatherData.temperature);
            updateWeather(weatherData);
        }
    });
}


function updateWeather(weatherData) {
    $('button').on('mouseover', function () {
        $('span').slideDown(900);
    });
    $('#weather').fadeIn(500);

    weatherCity.textContent = weatherData.cityName;
    weatherDescription.textContent = weatherData.description;
    weatherTemperature.textContent = weatherData.temperature;


    $("body").css("background-image", "url('./images/" + weatherData.description + ".jpg')");

    loadingText.style.display = 'none';
    weatherBox.style.display = 'block';
}

$('#weatherTemperature').tooltip({
    classes: {
        "ui-tooltip": "highlight"
    },
    content: "click to change temperature",
    track: true,
    // show: {
    //     effect: "highlight",
    //     duration: 1000
    // }
    // hide: {
    //     effect: "bounce",
    //     duration: 1000
    // }

});

weatherTemperature.addEventListener('click', changeUnit);
function changeUnit() {
    var leng = weatherTemperature.textContent.length;

    if (weatherTemperature.textContent.charAt(leng - 1) == 'K') {
        weatherTemperature.textContent = (val - 273.15).toFixed(0) + ' °C';
    } else {
        weatherTemperature.textContent = val + ' K';
    }
}
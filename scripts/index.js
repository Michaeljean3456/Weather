"use strict";
const cityList = document.getElementById("cityList");
const tableInput = document.getElementById("tableInput");
const tableOutput =document.getElementById("tableOutput");

window.onload = function() {
    populateCityList();
    hidetableOutput();
    ShowtableOutput();
    cityList.onchange = addItemInInput;

    
};

function populateCityList() {
    for (let city of cities) {
        let option = document.createElement("option");
        option.text = city.name;
        option.value = city.name;
        cityList.appendChild(option);
    }
}

function addItemInInput() {
    let selectedLocation = cityList.value;
    let location = cities.filter(
        city => city.name === selectedLocation);

    if (location.length > 0) {
        selectedLocation = location[0];
        let locate = selectedLocation.latitude + "," + selectedLocation.longitude;
        let theUrl = "https://api.weather.gov/points/" + locate;

        fetch(theUrl)
            .then(response => response.json())
            .then(info => {
                let forecastUrl = info.properties.forecast;
                fetchForecast(forecastUrl);
            });
    }
}

function fetchForecast(forecastUrl) {
    fetch(forecastUrl)
        .then(response => response.json())
        .then(forecastData => {
            let periods = forecastData.properties.periods;
            weatherInfo(periods);
        });
}

function weatherInfo(periods) {
    tableInput.innerHTML = ""; 
    for (let period of periods) {
        let newRow = tableInput.insertRow(-1);
        let cell1 = newRow.insertCell(0);
        cell1.textContent = period.name;

        let cell2 = newRow.insertCell(1);
        cell2.textContent = period.temperature;

        let cell3 = newRow.insertCell(2);
        cell3.textContent = period.detailedForecast;
    }
}

function ShowtableOutput(){
    tableOutput.style.display = 'block';
}

function hidetableOutput(){
    tableOutput.style.display = 'none';
}
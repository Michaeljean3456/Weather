"use strict";
const cityList = document.getElementById("cityList");
const tableInput = document.getElementById("tableInput");

window.onload = function() {
    populateCityList();
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
                let apiArray = info.properties.periods;
                console.log(apiArray)
                weatherInfo(apiArray);
            });
    }
}

function weatherInfo(apiArray) {
    for (let rowData of apiArray) {
        let newRow = tableInput.insertRow(-1);
        let cell1 = newRow.insertCell(0);
        cell1.textContent = rowData.name;

        let cell2 = newRow.insertCell(1);
        cell2.textContent = rowData.temperature;

        let cell3 = newRow.insertCell(2);
        cell3.textContent = rowData.detailedForecast;
    }
}

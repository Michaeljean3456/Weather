"use strict";
const cityList = document.getElementById("cityList");
const submitBtn = document.getElementById("submitBtn");
const tableInput = document.getElementById("tableInput");

window.onload = function(){
    populateCityList()
}

function populateCityList(){
    for(let city of cities){
        let option = document.createElement("option");
        option.text = city.name;
        option.value = city.name;
        cityList.appendChild(option);
    }
}


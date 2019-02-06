"use strict";

function getImages(inputText){
    console.log("getImages ran");
    fetch(`https://dog.ceo/api/breed/${inputText}/images/random`)
    .then(response => response.json())
    .then(responseJson => displayImages(responseJson))
    .catch(error => alert ("Sorry, something went wrong!. Try again later."));
    
}

function displayImages(responseJson){
    console.log("displayImages ran");
    console.log(responseJson);
    
    if (responseJson.status == "success"){

        $(".displayed-content").replaceWith(`<img class="displayed-content" src="${responseJson.message}">`);
        console.log(responseJson.message);
        $(".images-section").removeClass("js-hidden");

    } else {

        $(".displayed-content").replaceWith(`<h3 class="displayed-content">${responseJson.message}</h3>`);
        $(".images-section").removeClass("js-hidden");
    }

    

        
}

function watchForm(){
    console.log("watchForm ran");
    $("form").submit(event => {
        event.preventDefault();
        let inputText = document.getElementById("input-text").value;
        console.log(inputText);
        getImages(inputText);
    })
}

$(function loadApp(){
    console.log("loadApp ran");
    watchForm();
});
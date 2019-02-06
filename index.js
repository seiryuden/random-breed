"use strict";

let counter = {count : 0};

function getImages(inputText){
    console.log("getImages ran");
    console.log(`searching for ${inputText}`);
    fetch(`https://dog.ceo/api/breed/${inputText}/images/random`)
    .then(response => response.json())
    .then(responseJson => responseHandler(responseJson))
    .catch(error => alert ("Sorry, something went wrong!. Check your internet connection or try again later."));
    
}

function responseHandler(responseJson){
    console.log(responseJson);
    console.log("responseHandler ran");
    
    if (responseJson.status == "success"){

        displayImages(responseJson);
        counter.count = 0;

    } else if (responseJson.status == "error" && counter.count == 0){
        console.log("No matches. Trying inserting dash in the middle of input text");
        let splitInput = document.getElementById("input-text").value.split(" ");
        let dashedInput= splitInput.join("-");
        getImages(dashedInput);
        
        counter.count++;
        console.log(counter);

    } else if (responseJson.status == "error" && counter.count == 1){
        console.log("No matches. Trying reversing word order of input text");
        let splitInput = document.getElementById("input-text").value.split(" ");
        let reorderedInput= splitInput.reverse().join("-");
        getImages(reorderedInput);
        counter.count++;

    } else {
        displayNotFound(responseJson);
        counter.count = 0;
    }     
}

function displayImages(succesfulResponse){
    $(".displayed-content").replaceWith(`<img class="displayed-content" src="${succesfulResponse.message}">`);
        console.log(succesfulResponse.message);
        $(".images-section").removeClass("js-hidden");
}

function displayNotFound(responseJson){
    console.log("Breed not found message");
    $(".displayed-content").replaceWith(`<h3 class="displayed-content">${responseJson.message}</h3>`);
    $(".images-section").removeClass("js-hidden");
    
}

function watchForm(){
    console.log("watchForm ran");
    $("form").submit(event => {
        event.preventDefault();
        let rawInput = document.getElementById("input-text").value;
        let inputText= rawInput.replace(/\s/g, "");
        console.log(`input: ${inputText}`);
        getImages(inputText);
    })
}

$(function loadApp(){
    console.log("loadApp ran");
    watchForm();
});
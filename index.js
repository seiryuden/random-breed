"use strict";

let counter = {count : 0};

function getImages(inputText){
    console.log("getImages ran");
    fetch(`https://dog.ceo/api/breed/${inputText}/images/random`)
    .then(response => response.json())
    .then(responseJson => displayImages(responseJson))
    .catch(error => alert ("Sorry, something went wrong!. Try again later."));
    
}

function displayImages(responseJson){
    console.log(responseJson);
    console.log("displayImages ran");
    
    if (responseJson.status == "success"){

        $(".displayed-content").replaceWith(`<img class="displayed-content" src="${responseJson.message}">`);
        console.log(responseJson.message);
        $(".images-section").removeClass("js-hidden");
        counter.count = 0;

    } else if (responseJson.status == "error" && counter.count == 0){
        console.log("trying inserting dash in the middle");
        let splitInput = document.getElementById("input-text").value.split(" ");
        let dashedInput= splitInput.join("-");
        console.log(`searching for ${dashedInput}`);
        getImages(dashedInput);
        
        counter.count++;
        console.log(counter);

    } else if (responseJson.status == "error" && counter.count == 1){
        console.log("trying reversing word order");
        let splitInput = document.getElementById("input-text").value.split(" ");
        let reorderedInput= splitInput.reverse().join("-");
        console.log(`searching for ${reorderedInput}`);
        getImages(reorderedInput);
        counter.count++;

    } else {
        console.log("breed not found message");
        $(".displayed-content").replaceWith(`<h3 class="displayed-content">${responseJson.message}</h3>`);
        $(".images-section").removeClass("js-hidden");
        counter.count = 0;
    }     
}

function watchForm(){
    console.log("watchForm ran");
    $("form").submit(event => {
        event.preventDefault();
        let rawInput = document.getElementById("input-text").value;
        let inputText= rawInput.replace(/\s/g, "");
        console.log(inputText);
        getImages(inputText);
    })
}

$(function loadApp(){
    console.log("loadApp ran");
    watchForm();
});
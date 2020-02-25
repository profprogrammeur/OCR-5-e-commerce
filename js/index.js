"use strict";

// var response = "";
let response = "";

function setRequest(callback) {
    let exportResp 
    const request = new XMLHttpRequest();
    request.onload = function  () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            response = JSON.parse(this.responseText);
            response.forEach(product => createProductList(product.name));
            exportResp = response
            console.log(exportResp)
            callback(response)
        }

    };
    request.open("GET", "http://localhost:3000/api/cameras/");
    request.send();
    

    return "exportResp"
}

let resp = setRequest(afficheResponse);

function afficheResponse () {console.log(response)}

function openProductPage() {
    const numero = Array.from(event.target.parentNode.children).indexOf(event.target);
    const _id = response[numero]._id;
    location.href = "product.html" + "?_id=" + _id;
}

function createProductList(productName) {
    const listGroup = document.getElementById("listGroup");
    const anchorElement = document.createElement("a");
    anchorElement.classList.add(
        "mx-auto",
        "w-50",
        "text-center",
        "list-group-item",
        "list-group-item-action",
        "list-group-item-info"
    );
    anchorElement.addEventListener("click", openProductPage);
    anchorElement.appendChild(document.createTextNode(productName)); //makes text from input field the li text
    listGroup.appendChild(anchorElement); //adds li to ul
}





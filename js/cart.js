////get product number from URL
"use strict"
let url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const _id = params.get("_id");
let option = params.get("option");

const para = document.getElementById("para");


let ul = document.getElementById("ul");
// let response = "";
let orderId = 0;
let order = {};
const result = document.getElementById("result");
result.style.color = "red";


//STORAGE
let cart = JSON.parse(localStorage.getItem("cart"));
let requests = new Array(cart.length);

// affichage et calcul du total

const loop = () => {
    const totalDiv = document.getElementById("totalDiv");
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        const url2 = "http://localhost:3000/api/cameras/" + cart[i]._id;
        requests[i] = new XMLHttpRequest();
        requests[i].open("GET", url2);
        requests[i].onload = function () {
            const data = JSON.parse(requests[i].responseText);
            option = cart[i].option;
            createListElement(data);
            totalPrice += data.price;
            totalDiv.textContent = totalPrice + " €";
        };
        requests[i].send();
    }
};
loop();

//////////////////
//////////////////////////////////////////
////////////////////////////////
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const adress = document.getElementById("adress");
const city = document.getElementById("city");
const email = document.getElementById("email");

function send() {
    let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    };
    let products = [];
    // let products = ["5be9c4c71c9d440000a730e9", "5be1ed3f1c9d44000030b061"];

    let body = { contact, products };
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/api/cameras/order");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(body));
    request.onload = function () {
        orderId = JSON.parse(request.response).orderId;
        // console.log(request.response);
        // console.log(JSON.parse(request.response))
        // console.log(orderId)
        order = {
            orderId: orderId,
            total: totalPrice
        };
        let order_json = JSON.stringify(order);
        localStorage.setItem("order", order_json);
        location.href = "order.html"
    };
}
////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////

function createListElement(el) {
    let li = document.createElement("li");
    let h6 = document.createElement("h6");
    let small = document.createElement("small");
    let div = document.createElement("div");
    let span = document.createElement("span");
    let button = document.createElement("button");
    button.classList.add("btn", "btn-secondary", "btn-sm");
    button.textContent = "supprimer";
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "lh-condensed")
    h6.classList.add("my-0");
    small.classList.add("text-muted");
    span.classList.add("text-muted", "d-flex", "flex-column");
    h6.textContent = el.name;
    small.textContent = el.lenses[option];
    span.textContent = el.price + " €";
    div.appendChild(h6);
    div.appendChild(small);
    li.appendChild(div);
    li.appendChild(span);
    ul.appendChild(li);
    span.appendChild(button);
    removeButtonListener(button, li);

}
function removeButtonListener(button, li) {
    button.addEventListener("click", function () {
        //get index of product in the list
        let indexOfProduct = Array.from(li.parentNode.children).indexOf(li);
        li.parentNode.removeChild(li);
        cart.splice(indexOfProduct, 1);
        let cart_json = JSON.stringify(cart);
        localStorage.setItem("cart", cart_json);
    });
}


////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////
const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    send();
    // location.href = "order.html"
});

const regexName = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
const regexAddress = /^[\w'\-,.][^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;


function fieldValidation(field, regex) {
    field.addEventListener("change", function () {
        if (regex.test(field.value)) {
            result.textContent = "";
            field.style.color = "black";
        } else {
            result.textContent = "Donnée invalide";
            field.style.color = "red";
        }
    });
}

fieldValidation(firstName, regexName);
fieldValidation(lastName, regexName);
fieldValidation(city, regexName);
fieldValidation(address, regexAddress);
fieldValidation(email, regexAddress);



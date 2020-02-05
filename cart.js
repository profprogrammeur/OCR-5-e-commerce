////get nproduct number from URL
let url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const _id = params.get("_id");
let option = params.get("option");
const h2num = document.getElementById("h2num");
let count = -1;
const para = document.getElementById("para");
const totalDiv = document.getElementById("totalDiv");
let totalPrice = 0;
let ul = document.getElementById("ul");
var response = "";
const pics = document.getElementById("pics");
let cart = JSON.parse(localStorage.getItem("cart"));
var data;
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const adress = document.getElementById("adress");
const city = document.getElementById("city");
const email = document.getElementById("email");
let orderId =0;
let order={};
const result = document.getElementById("result");
result.style.color = "red";
requests = new Array(cart.length);

// function loop () {
const loop = () => {
  for (let i = 0; i < cart.length; i++) {
    var url2 = "http://localhost:3000/api/cameras/" + cart[i]._id;
    requests[i] = new XMLHttpRequest();
    requests[i].open("GET", url2);
    requests[i].onload = function() {
      data = JSON.parse(requests[i].responseText);
      console.log(data);
      count = i;
      option = cart[i].option;
      createListElements(data);
      totalPrice += data.price;
      console.log(totalPrice);
      totalDiv.textContent =  totalPrice + " €";
    };
    requests[i].send();
  }
};
loop();

//////////////////
//////////////////////////////////////////
////////////////////////////////
function send() {
  var contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value
  };

  var products = ["5be9c4c71c9d440000a730e9", "5be1ed3f1c9d44000030b061"];
  var body = { contact, products };
  var request = new XMLHttpRequest();
  
  console.log(body);
  request.open("POST", "http://localhost:3000/api/cameras/order");

  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(body));
  request.onreadystatechange = function() {
    orderId = JSON.parse(request.response).orderId

  
    console.log("response : " + request.response);
    result.textContent = "orderId : " + orderId ;
    result.style.color = "green";
    order = {
      orderId: orderId,
      total: totalPrice
    };
    console.log(order);
    
    let order_json = JSON.stringify(order);
    localStorage.setItem("order", order_json);
      location.href = "order.html"

  };
  
}
// }
////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////

function createListElements(el) {
    createListElement(el);

  // createListElement(el.name);
  // createListElement(el.lenses[option]);
  // createListElement(el.price + " €");
  // createListElement("request n° : " + count);
  // createListElement("-----------------");
}

function createListElement(el) {
  var li = document.createElement("li"); 
  let h6 = document.createElement("h6");
  let small = document.createElement("small");
  let div = document.createElement("div");
  let span = document.createElement("span");
  let button = document.createElement("button");
  button.classList.add("btn", "btn-secondary","btn-sm");
  button.textContent= "supprimer";
  li.classList.add("list-group-item" ,"d-flex" ,"justify-content-between","lh-condensed")
  h6.classList.add("my-0");
  small.classList.add("text-muted");
  span.classList.add("text-muted","d-flex","flex-column");
  h6.textContent = el.name;
  small.textContent = el.lenses[option];
  span.textContent = el.price + " €";
  div.appendChild(h6);
  div.appendChild(small);
  li.appendChild(div);
  li.appendChild(span);
  ul.appendChild(li);
  span.appendChild(button);
  button.addEventListener("click", function () { 
    //get index of product in the list
    let indexOfProduct = Array.from(li.parentNode.children).indexOf(li);
    li.parentNode.removeChild(li);
    cart.splice(indexOfProduct,1);
    let cart_json = JSON.stringify(cart);
    localStorage.setItem("cart", cart_json);
  
  });

}


////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////
const form = document.querySelector("form");
form.addEventListener("submit", function(e) {
  e.preventDefault();
  send();
  // location.href = "order.html"
});

const regexName = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
const regexAddress = /^[\w'\-,.][^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;


function fieldValidation(field, regex) {
  console.log("field : " + field.name);
  field.addEventListener("change", function() {
    console.log("field : " + field.name);
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



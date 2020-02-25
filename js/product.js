let url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const _id = params.get("_id");
let numOption = 0;
let response = "";
let request = new XMLHttpRequest();
const productPic = document.getElementById("productPic");
let form = document.getElementById("form");

request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        response = JSON.parse(this.responseText);
        displayProduct(response);
        //Get the first key name of a javascript object = option
        const options = response[Object.keys(response)[0]];
        options.forEach(item => createListElement(item));
    }
};
request.open("GET", "http://localhost:3000/api/cameras/" + _id);
request.send();

function displayProduct(response) {
    productPic.src = response.imageUrl;
    productPic.style.height = "200px";
    productName.textContent = response.name;
    productDescr.textContent = response.description;
    productPrice.textContent = response.price + " €";
}

function createListElement(el) {
    const select = document.getElementById("select");
    let option = document.createElement("option");
    option.text = el;
    select.add(option);
}

form.onsubmit = function () {
    event.preventDefault();
    let url = new URL("http://127.0.0.1:5500/cart.html");
    let params = new URLSearchParams(url.search);
    params.append("_id", _id);
    params.append("option", select.selectedIndex);
    location.href = url + "?" + params.toString();
    numOption = select.selectedIndex;
    let cart = [];
    if (localStorage.getItem("cart") !== null) {
        cart = JSON.parse(localStorage.getItem("cart"));
    }
    let item = {
        _id: _id,
        option: numOption
    };
    cart.push(item);
    let cart_json = JSON.stringify(cart);
    localStorage.setItem("cart", cart_json);
};

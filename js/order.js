
const totalDiv = document.getElementById("totalOrderDiv");
const orderIdDiv = document.getElementById("orderIdDiv");

const cart = JSON.parse(localStorage.getItem("order"));

if (cart.orderId === undefined) {
    location.href = "home.html"
}

totalDiv.textContent = globalNumberWithSpaces(cart.total) ;
orderIdDiv.textContent = cart.orderId;
////get nproduct number from URL

const totalDiv = document.getElementById("totalDiv");
const orderIdDiv = document.getElementById("orderIdDiv");

const cart = JSON.parse(localStorage.getItem("order"));
totalDiv.textContent= cart.total  + " €";
orderIdDiv.textContent = cart.orderId ;
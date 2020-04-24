////get product number from URL
"use strict"
const reset = () => {
    if (localStorage.cart === "[]") {
    location.href = "home.html"
}
}
reset();
// Model manages the data, the storage of the app
/////////////////////////////////////////////////////
class Model {
    /////////////////////////////////////
    constructor() {
        this.result = [];
        this.cart = JSON.parse(localStorage.getItem("cart"));
    }
    getProducts = globalGetProducts

    //STORAGE
    getCart() {
        let cart = JSON.parse(localStorage.getItem("cart"));
        return cart
    }
    calculateTotal(prices) {
        let total = 0;
        prices.forEach(el => total += parseInt(this.numberWithoutSpace(el.innerText)))
        // console.log(total)
        this.storeTotal(total)
        return total
    }
    storeTotal(total) {
        let order = {
            total: total
        };
        localStorage.setItem("order", JSON.stringify(order));
    }
    sendForm(contact) {

        let products = [];
        // console.log(data)
        let body = { contact, products };
        fetch("http://localhost:3000/api/cameras/order", {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((data) => {
                let orderId = data.orderId;
                let order = JSON.parse(localStorage.getItem("order"))
                order.orderId = orderId
                localStorage.setItem("order", JSON.stringify(order));
                location.href = "order.html"
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }
    deleteItem(item) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        let indexOfProduct = Array.from(item.parentNode.children).indexOf(item);
        item.parentNode.removeChild(item);
        cart.splice(indexOfProduct, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        app.view.renderTotal(app.model.numberWithSpaces(app.model.calculateTotal(app.view.getPrices())))
        reset();
    }
    ///////////REGEX///////////////
    fieldValidation() {
        const regexName = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/;
        const regexAddress = /^[\w'\-,.][^_!¡?÷?¿/\\+=#$%ˆ&*(){}|~<>;:[\]]{1,}$/;

        function fieldWarning(formItem, regex) {
            if (regex.test(formItem.value)|| formItem.value=="" ) {
                formItem.style.color = "black";
            } else {
                formItem.style.color = "red";
            }
        }
        fieldWarning(firstName, regexName);
        fieldWarning(lastName, regexName);
        fieldWarning(city, regexName);
        fieldWarning(address, regexAddress);
        fieldWarning(email, regexAddress);
    }
    numberWithSpaces = globalNumberWithSpaces
    numberWithoutSpace(x) {
        return parseInt(x.replace(/\s+/g, ''));
    }

}


// VIEW cares about the DOM, attach user events, change the state of the screenview
///////////////////////////////////
class View {
    /////////////////////////////////////
    constructor() {
        this.ul = document.getElementById("ul");
        this.form = document.getElementById("form");
        this.firstName = document.getElementById("firstName");
        this.lastName = document.getElementById("lastName");
        this.adress = document.getElementById("adress");
        this.city = document.getElementById("city");
        this.email = document.getElementById("email");
        this.listItems = document.querySelectorAll(".list-item")
        this.submitButton = document.querySelector("#submitButton")
        this.formInputs = this.form.querySelectorAll("input")
    }
    renderCart(cart, createCartList) {
        cart.forEach(el => { createCartList(el) })

    };
    createCartListEl(product, option) {

        const listGroup = document.getElementById("listGroup");
        const markup = `
        <div class="row ">

            <div class="col-6 border">                 
            <h6 class="my-0 t" style="white-space: nowrap">${product.name}</h6>
            <small class="text-muted option">${product.lenses[option]}</small>
            </div>

            <div class="col-4 text-muted border  ">
            <p class="price text-right" style="">${product.price}</p>
            </div>
                 
            <div class="col-1 " style="">
            <button class="delete-button border btn btn-sm text-center mt-2" style="">X</button>
            </div>
        </div>
            `;
        this.ul.insertAdjacentHTML('beforeend', markup);
    };
    getPrices() {
        const prices = document.querySelectorAll('.price')
        return prices
    }
    renderTotal(total) {
        const totalDiv = document.getElementById("totalDiv");
        totalDiv.textContent = total ;
    }
    getData() {
        let contactData = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value
        };
        return contactData
    }
    bindSubmitForm(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            const contact = this.getData()
            handler(contact)
            console.log("submited")
        }
        )
    }
    bindDeleteItem(handler) {
        this.ul.addEventListener('click', event => {
            if (event.target.className === 'delete-button border btn btn-sm text-center mt-2') {
                const listItem = event.target.parentElement.parentElement;
                handler(listItem);
            }
        })
    }
    bindFieldValidation(handler) {
        this.form.addEventListener('change', event => {
            const formItem = event.target;
            // handler(formItem);
            handler();
            this.enableSubmit(form);
            // this.bindEnableSubmit(form,enabler);
        }
        )
    }
    enableSubmit(form) {
        const fieldsColor = [];
        this.formInputs.forEach(el => fieldsColor.push(el.style.color))
        if (fieldsColor.includes("red")) {
            submitButton.setAttribute("disabled", "");
        } else {
            submitButton.removeAttribute("disabled");
        }
    }
}

//CONTROLLER handles events and is the mediator between the VIEW and the MODEL/data
////////////////////////////////////////
class Controller {
    ///////////////////////////////////////
    constructor(model, view) {
        this.model = model
        this.view = view

        //Display list of products
        model.getCart().forEach(el => {

                model.getProducts(el._id)
                .then(product => {
                    product.price = model.numberWithSpaces(product.price)
                    view.createCartListEl(product, el.option);
                    view.renderTotal(model.numberWithSpaces(model.calculateTotal(view.getPrices())))
                });
            
        })
        view.bindSubmitForm(model.sendForm)
        view.bindDeleteItem(model.deleteItem )
        view.bindFieldValidation(model.fieldValidation)
    }

}


const app = new Controller(new Model(), new View())

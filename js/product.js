"use strict";

// ////////////////////////////////////////////////////
class Model {
    ///////////////////////////////////////
    getProductId() {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        const _id = params.get("_id");
        this._id = _id;
        if (_id ===null) {
            location.href = "home.html"
        }

        return _id
    }
    getProducts = globalGetProducts

    pushToLocalstorage(numOption) {
        let cart = [];
        if (localStorage.getItem("cart") !== null) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        let item = {
            _id: app.model._id,
            option: numOption
        };
        cart.push(item);
        let cart_json = JSON.stringify(cart);
        localStorage.setItem("cart", cart_json);
        app.model.goToCart(numOption)
    }
    goToCart() {
        // let url = new URL("http://127.0.0.1:5500/cart.html");
        // let params = new URLSearchParams(url.search);
        // location.href = url ;
        location.href = "cart.html";

    }
     numberWithSpaces=globalNumberWithSpaces
}



// ///////////////////////////////////
class View {
    ///////////////////////////////////////
    constructor() {
        this.card = document.getElementById("card");
        this.select = document.getElementById("select");
        this.form = document.getElementById("form");
    }
    renderProductCard(product) {
        console.log(product)
        const markup = `
            <img src=${product.imageUrl} class="card-img-top h-100 img-fluid" alt="appareil photo">
                <div class="card-body">
                    <h2 class="card-title" id="productName">${product.name}</h2>
                    <p class="card-text text-justify" id="productDescr">
                       ${product.description}
                    </p>
                    <a href="#" class="btn btn-info" id="productPrice">${product.price}</a>
                </div>
            `;
        this.card.insertAdjacentHTML('beforeend', markup);
        const options = product[Object.keys(product)[0]];
        options.forEach(el => {
            const option = `<option>${el}</option>`;
            select.insertAdjacentHTML('beforeend', option);
        })
    }
    bindChooseOption(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            handler(select.selectedIndex)
        }
        )
    }
}

////////////////////////////////////////
class Controller {
    ///////////////////////////////////////
    constructor(model, view) {
        this.model = model
        this.view = view
        model.getProducts(model.getProductId())
            .then(products => {
                products.price = model.numberWithSpaces(products.price)
                view.renderProductCard(products)
            });
        view.bindChooseOption(model.pushToLocalstorage)
    }
}


const app = new Controller(new Model(), new View())





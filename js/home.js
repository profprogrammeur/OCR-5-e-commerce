"use strict";

// MODEL manages the data, the storage of the app
/////////////////////////////////////////////////////
class Model {
    /////////////////////////////////////
//get a list of product from the API
    getProducts = globalGetProducts

    goToProductPage(num) {
        const _id = app.model.result[num]._id;
        location.href = "product.html" + "?_id=" + _id;
    }
}


// VIEW cares about the DOM, attach user events, change the state of the screenview
///////////////////////////////////
class View {
    /////////////////////////////////////
    constructor() {
        this.listGroup = document.getElementById("listGroup");
    }
    createProductList(products) {
        products.forEach(productName => {
            const listGroup = document.getElementById("listGroup");
            const markup = `
            <a class="mx-auto w-50 text-center list-group-item 
            list-group-item-action list-group-item-info">
            ${productName.name}
            </a>  
            `;
            this.listGroup.insertAdjacentHTML('beforeend', markup);
        });
    }
//get ansd handle the rank of the clicked item (same as rank of product in the list from the API)
    bindChooseProduct(goToProductPage) {
        this.listGroup.addEventListener('click', event => {
            const itemNumber = Array.from(event.target.parentNode.children).indexOf(event.target);
            goToProductPage(itemNumber)
        })
    }
}



//CONTROLLER handles events and connects the VIEW and the MODEL/data
////////////////////////////////////////
class Controller {
///////////////////////////////////////
    constructor(model, view) {
        this.model = model
        this.view = view
        //Display list of products
        model.getProducts()
            .then(products => {
                view.createProductList(products)
            });
        view.bindChooseProduct(this.model.goToProductPage)
    }
}





const app = new Controller(new Model(), new View())







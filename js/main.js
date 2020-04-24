const header = document.getElementById("header")
const pageName = header.dataset.pagename
function renderHeader() {
    const markup =
        `<div>
            <div class="row container-fluid justify-content-end ">
                <nav class="navbar navbar-expand-lg navbar-light " >
                    <button class="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon small "></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <ul class="navbar-nav  mt-2 ">
                            <a class=" nav-link home " href="home.html">ACCUEIL</a>
                            <a class=" nav-link " href="product.html">PRODUIT</a>
                            <a class=" nav-link" href="cart.html">PANIER</a>
                            <a class=" nav-link" href="order.html">COMMANDE</a>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
        <div>
            <a class="navbar-brand ml-3 " href="home.html">
                <img class="rounded" src="img/logo.jpg" style="height:35px;" alt="logo" class="logo">
            </a>
        </div>
        `
    header.insertAdjacentHTML('beforeend', markup);
    const navLink = document.querySelectorAll(".nav-link")
    navLink.forEach(el => {
        if (el.href.includes(pageName)) { el.classList.add("active") }
    })
}
renderHeader();

 async function globalGetProducts (id) { 

    let url = "http://localhost:3000/api/cameras/";
    if (id) {url += id}
    await fetch(url)
        .then((resp) => resp.json())
        .then(data => {
            this.result = data;
// redirect if it returns an error message :
            if (data.message) {
            location.href = "home.html"
            }
        })
    return this.result
}

function globalNumberWithSpaces (x) {
    return (x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €");
}



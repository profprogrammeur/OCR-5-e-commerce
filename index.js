var response = "";
var request = new XMLHttpRequest();
const pics = document.getElementById("pics");
request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        response = JSON.parse(this.responseText);
        console.log(response);
        // response.forEach(item => createListElement(item.name));
        response.forEach(item => createListElement2(item.name));
        // pics.src = response.imageUrl;
        // pics.style.height="100px"
    }
};
// request.open("GET", "http://localhost:3000/api/cameras/5be1ed3f1c9d44000030b061");

request.open("GET", "http://localhost:3000/api/cameras/");

request.send();
const para = document.getElementById("para");
const ul = document.getElementById("ul");
const form = document.getElementById("form");


document.getElementById("listGroup");
function createListElement2(el) {
    var a = document.createElement("a"); // creates an element "li"
    a.classList.add("mx-auto", "w-50", "text-center", "list-group-item", "list-group-item-action", "list-group-item-info")
    a.appendChild(document.createTextNode(el)); //makes text from input field the li text
    listGroup.appendChild(a); //adds li to ul
    a.onclick = function () {
        const numero = Array.from(a.parentNode.children).indexOf(a);
        console.log(Array.from(a.parentNode.children).indexOf(a));
        const _id = response[numero]._id;
        const queryStr = "_id=" + _id;
        // console.log(queryStr);
        location.href = "product.html" + "?" + queryStr;
        console.log(response);
    };
}


// para.textContent = response[0];

//https://codepen.io/JohnPaulFich/pen/MXmzzM
// function createListElement(el) {
//     var li = document.createElement("li"); // creates an element "li"
//     li.appendChild(document.createTextNode(el)); //makes text from input field the li text
//     ul.appendChild(li); //adds li to ul
//     // input.value = ""; //Reset text input field
//     li.onclick = function () {
//         //index of product in list
//         const numero = Array.from(li.parentNode.children).indexOf(li);
//         console.log(Array.from(li.parentNode.children).indexOf(li));
//         const _id = response[numero]._id;
//         const queryStr = "_id=" + _id;
//         console.log(queryStr);
//         location.href = "product.html" + "?" + queryStr;
//         // form.submit();

//     };
// }





    // li.addEventListener("click", select);
    //     function select() {
    //         // li.classList.toggle("done");
    //     }
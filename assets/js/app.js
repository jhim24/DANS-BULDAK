/*==========================================================
  DAN'S CHEESY BULDAK
  APP.JS
==========================================================*/

const products = [

{
    id:1,
    category:"original",
    name:"Original Cheesy Carbonara Buldak",
    price:149,
    image:"assets/images/products/original.jpg"
},

{
    id:2,
    category:"double",
    name:"Double Cheese Carbonara Buldak",
    price:169,
    image:"assets/images/products/double-cheese.jpg"
},

{
    id:3,
    category:"extreme",
    name:"Extreme Spicy Carbonara Buldak",
    price:159,
    image:"assets/images/products/extreme.jpg"
}

];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const grid = document.querySelector(".product-grid");
const badge = document.querySelector(".badge");

renderProducts(products);
updateBadge();

/*==========================================================
RENDER PRODUCTS
==========================================================*/

function renderProducts(list){

if(!grid) return;

grid.innerHTML="";

list.forEach(product=>{

grid.innerHTML += `

<div class="product-card">

<img src="${product.image}" alt="${product.name}">

<div class="product-info">

<h3>${product.name}</h3>

<div class="price">

₱${product.price}

</div>

<button
class="add-cart"
onclick="addToCart(${product.id})">

Add To Cart

</button>

</div>

</div>

`;

});

}

/*==========================================================
ADD TO CART
==========================================================*/

function addToCart(id){

const item = products.find(p=>p.id===id);

const existing = cart.find(c=>c.id===id);

if(existing){

existing.qty++;

}else{

cart.push({

...item,

qty:1

});

}

saveCart();

updateBadge();

showToast("Added to Cart");

}

/*==========================================================
SAVE CART
==========================================================*/

function saveCart(){

localStorage.setItem(

"cart",

JSON.stringify(cart)

);

}

/*==========================================================
BADGE
==========================================================*/

function updateBadge(){

if(!badge) return;

const total = cart.reduce(

(sum,item)=>sum+item.qty,

0

);

badge.textContent = total;

}

/*==========================================================
CATEGORY FILTER
==========================================================*/

const buttons = document.querySelectorAll(".categories button");

buttons.forEach(btn=>{

btn.addEventListener("click",()=>{

buttons.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

const text = btn.textContent.toLowerCase();

if(text==="all"){

renderProducts(products);

return;

}

const filtered = products.filter(product=>{

return product.category.includes(text);

});

renderProducts(filtered);

});

});

/*==========================================================
TOAST
==========================================================*/

function showToast(message){

const toast = document.createElement("div");

toast.className="toast";

toast.innerHTML=message;

document.body.appendChild(toast);

setTimeout(()=>{

toast.classList.add("show");

},100);

setTimeout(()=>{

toast.remove();

},2500);

}

/*==========================================================
REGISTER SERVICE WORKER
==========================================================*/

if("serviceWorker" in navigator){

window.addEventListener("load",()=>{

navigator.serviceWorker.register("sw.js")

.then(()=>{

console.log("Service Worker Registered");

})

.catch(err=>{

console.log(err);

});

});

}
/*=========================
HERO SLIDER
=========================*/

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;

function showSlide(index){

    slides.forEach((slide)=>{
        slide.classList.remove("active");
    });

    dots.forEach((dot)=>{
        dot.classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");

}

function nextSlide(){

    currentSlide++;

    if(currentSlide >= slides.length){

        currentSlide = 0;

    }

    showSlide(currentSlide);

}

setInterval(nextSlide,4000);
/*=========================
CLICKABLE DOTS
=========================*/

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        currentSlide = index;

        showSlide(currentSlide);

    });

});

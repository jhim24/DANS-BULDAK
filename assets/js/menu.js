/* ==========================================================
   DAN'S CHEESY BULDAK
   MENU.JS
========================================================== */

/*==========================
MENU DATA
==========================*/

const products = [

{
id:1,
name:"Original Cheesy Carbonara Buldak",
category:"buldak",
price:149,
image:"assets/images/menu/original-cheesy-carbonara.jpg",
description:"Creamy. Cheesy. Irresistible."
},

{
id:2,
name:"Double Cheese Carbonara Buldak",
category:"buldak",
price:169,
image:"assets/images/menu/double-cheese-carbonara.jpg",
description:"Twice the cheese. Twice the satisfaction."
},

{
id:3,
name:"Extreme Spicy Carbonara Buldak",
category:"buldak",
price:159,
image:"assets/images/menu/extreme-spicy-carbonara.jpg",
description:"Extra spicy. Extra good."
},

{
id:4,
name:"Egg",
category:"addons",
price:20,
image:"assets/images/menu/egg.jpg",
description:"Add-on"
},

{
id:5,
name:"Spam",
category:"addons",
price:45,
image:"assets/images/menu/spam.jpg",
description:"Add-on"
},

{
id:6,
name:"Hotdog",
category:"addons",
price:35,
image:"assets/images/menu/hotdog.jpg",
description:"Add-on"
},

{
id:7,
name:"Seaweed",
category:"addons",
price:20,
image:"assets/images/menu/seaweed.jpg",
description:"Add-on"
}

];
/*==========================
ELEMENTS
==========================*/

const productGrid=document.getElementById("productGrid");
const searchInput=document.getElementById("searchInput");
const categoryButtons=document.querySelectorAll(".categories button");

/*==========================
RENDER PRODUCTS
==========================*/

function renderProducts(list){

productGrid.innerHTML="";

list.forEach(product=>{

productGrid.innerHTML+=`

<div class="product-card">

<img src="${product.image}" alt="${product.name}">

<div class="product-info">

<h3>${product.name}</h3>

<p>${product.description}</p>

<div class="price">₱${product.price}</div>

<button
class="add-cart"
onclick="addToCart(${product.id})">

Add to Cart

</button>

</div>

</div>

`;

});

}

renderProducts(products);

/*==========================
CATEGORY FILTER
==========================*/

categoryButtons.forEach(button=>{

button.addEventListener("click",()=>{

categoryButtons.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

const category=button.dataset.category;

if(category==="all"){

renderProducts(products);

return;

}

const filtered=products.filter(product=>product.category===category);

renderProducts(filtered);

});

});

/*==========================
SEARCH
==========================*/

searchInput.addEventListener("keyup",()=>{

const keyword=searchInput.value.toLowerCase();

const filtered=products.filter(product=>

product.name.toLowerCase().includes(keyword)

);

renderProducts(filtered);

});

/*==========================
CART
==========================*/

function addToCart(id){

let cart=JSON.parse(localStorage.getItem("cart"))||[];

const product=products.find(item=>item.id===id);

cart.push(product);

localStorage.setItem("cart",JSON.stringify(cart));

updateBadge();

alert(product.name+" added to cart.");

}

/*==========================
BADGE
==========================*/

function updateBadge(){

const cart=JSON.parse(localStorage.getItem("cart"))||[];

const badge=document.getElementById("cartBadge");

if(badge){

badge.textContent=cart.length;

}

}

updateBadge();

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
name:"Original Cheesy Buldak",
category:"buldak",
price:199,
image:"assets/images/menu/buldak1.jpg",
description:"Creamy Korean Carbonara."
},

{
id:2,
name:"Double Cheese Buldak",
category:"buldak",
price:239,
image:"assets/images/menu/buldak2.jpg",
description:"Extra mozzarella cheese."
},

{
id:3,
name:"Extreme Spicy Buldak",
category:"buldak",
price:229,
image:"assets/images/menu/buldak3.jpg",
description:"Extra hot Korean flavor."
},

{
id:4,
name:"Kimchi Ramen",
category:"ramen",
price:169,
image:"assets/images/menu/ramen1.jpg",
description:"Classic Korean ramen."
},

{
id:5,
name:"Cheese Ramen",
category:"ramen",
price:179,
image:"assets/images/menu/ramen2.jpg",
description:"Creamy ramen."
},

{
id:6,
name:"Bulgogi Rice",
category:"rice",
price:199,
image:"assets/images/menu/rice1.jpg",
description:"Korean beef rice."
},

{
id:7,
name:"Chicken Rice",
category:"rice",
price:189,
image:"assets/images/menu/rice2.jpg",
description:"Crispy chicken meal."
},

{
id:8,
name:"Iced Tea",
category:"drinks",
price:59,
image:"assets/images/menu/drink1.jpg",
description:"Refreshing drink."
},

{
id:9,
name:"Korean Soda",
category:"drinks",
price:79,
image:"assets/images/menu/drink2.jpg",
description:"Sparkling soda."
},

{
id:10,
name:"Extra Cheese",
category:"addons",
price:35,
image:"assets/images/menu/addon1.jpg",
description:"Mozzarella topping."
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

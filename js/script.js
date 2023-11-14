const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');


if (bar) {
    bar.addEventListener('click', (e) => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

// store-cart-in-storage
let carsts = document.querySelectorAll('.add-cart-store');

const products = new Array();
let obj = new Object();

for (let i = 0; i < carsts.length; i++) {

    image = document.getElementsByClassName('pro').item(i).children[0].getAttribute('src');

    const name = document.getElementsByClassName('pro').item(i).children[1].children[1].innerHTML;

    prise = document.getElementsByClassName('pro').item(i).children[1].children[2].children[5].innerHTML;
    let obj = new Object();
    obj.img = image;
    obj.nam = name;
    obj.pri = prise;
    obj.incart = 0;
    obj.id = i;
    products.push(obj);
}

for (let i = 0; i < carsts.length; i++) {
    console.log("I am running.");
    carsts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}


function cartNumbers(products) {

    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
    } else {
        localStorage.setItem('cartNumbers', 1);
    }
    setItem(products);
}

function setItem(products) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);


    if (cartItems != null) {
        if (cartItems[products.nam] == undefined) {
            cartItems = {
                ...cartItems,
                [products.nam]: products
            }
        }
        cartItems[products.nam].incart += 1;

    } else {
        products.incart = 1;
        cartItems = {
            [products.nam]: products
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let money = product.pri.replace("$", "");
    money = parseFloat(money);
    let preCost = localStorage.getItem('totalCost');

    if (preCost != null) {
        preCost = parseInt(preCost);
        localStorage.setItem('totalCost', preCost + money);
    } else {
        localStorage.setItem('totalCost', money);
    }
}


// AddProductInformationInCartPage

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.add-cart-in-table');
    if (cartItems && productContainer) {



        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <tr>
            <td>
            <a href="#"><span onClick='deleteItem(${item.id})' class="deleteItem material-symbols-outlined">
            close_small
            </span></a>
            </td>
            <td><img src="${item.img}" alt=""></td>
            <td>${item.nam}</td>
            <td>${item.pri}</td>
            <td>${item.incart}</td>
            </tr>
            `
        });
    }

    let preCost = localStorage.getItem('totalCost');
    let productContaine = document.querySelector('.totalamount');
    if (preCost && productContaine) {
        productContaine.innerHTML = '';
        productContaine.innerHTML += `
            <span>$${preCost}</span>
            `
    }
    let roductContaine = document.querySelector('.totalmoney');
    if (preCost && roductContaine) {
        roductContaine.innerHTML = '';
        roductContaine.innerHTML += `
            <span>$${preCost}</span>
            `
    }
}


displayCart();

// DeleteTheCart

function deleteItem(id) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let newCartItems = new Array();
    // let newCart = cartItems.filter((item)=>item.id != id);
    let changeamount = 0;
    let mone;
    Object.values(cartItems).map(item => {
        if (item.id != id) {
            newCartItems.push(item);
            mone = item.pri.replace("$", "");
            console.log(mone);
            mone = parseFloat(mone);
            changeamount += mone;
        }
    });
    localStorage.setItem('productsInCart', JSON.stringify(newCartItems));
    localStorage.setItem('totalCost', changeamount.toFixed(2));
    displayCart();
}





















// testing
// let x=document.getElementsByClassName('pro').item(0).children[0].getAttribute('src');
// let y=document.getElementsByClassName('pro').item(0).children[1].children[0].innerHTML;
// let z=document.getElementsByClassName('pro').item(0).children[1].children[2].children[5].innerHTML;

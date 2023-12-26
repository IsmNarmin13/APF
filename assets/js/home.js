let cart = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = () =>{
  cart.classList.toggle('active');
  login.classList.remove('active');
  navbar.classList.remove('active');
}

let login = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () =>{
  login.classList.toggle('active');
  cart.classList.remove('active');
  navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
  navbar.classList.toggle('active');
  cart.classList.remove('active');
  login.classList.remove('active');
}

window.onscroll = () =>{
  if (cart) {
    cart.classList.remove('active');
}
if (login) {
    login.classList.remove('active');
}
if (navbar) {
    navbar.classList.remove('active');
}
}




// const cards = document.querySelectorAll('.cards')

// cards.forEach((el, idx)=>{
//   console.dir(el)
//   const btn = el.childNodes[7]
//   const title = el.childNodes[1].innerText
//   const price = el.childNodes[3].innerText

//   btn.addEventListener("click", () => {
//     const cartStorage = localStorage.getItem("cart") || '[]'
//     const cart = JSON.parse(cartStorage)
//     const card = { title, price }
//     localStorage.setItem("cart", JSON.stringify([...cart, card]))
//   })
// })



let addToCartBtns = document.querySelectorAll(".cart-button");
let basketCount = document.getElementById("basketCount");
addToCartBtns.forEach(btn=>{
  btn.addEventListener("click", function(e){
    e.preventDefault();
    let id = btn.parentNode.parentNode.getAttribute("data-id");
    if(localStorage.getItem("basket")==null){
      localStorage.setItem("basket", JSON.stringify([]))
    }
    let arr = JSON.parse(localStorage.getItem("basket"))
    let exisProduct = arr.find(pro=>pro.id==id);
    if (exisProduct == undefined){
      arr.push({
        id: id,
        imgUrl: btn.closest('.box').querySelector('img').getAttribute('src'),
        name: btn.closest('.box').querySelector('h3').innerText,
        price: btn.closest('.box').querySelector('.price').innerText,
        count: 1
    });
    
    
        } else {
            exisProduct.count++;
        }

        localStorage.setItem("basket", JSON.stringify(arr));
        CalcBasketCount();
    })
})



function CalcBasketCount(){
    if(localStorage.getItem("basket")!=null){
        let sum;
        let arr = JSON.parse(localStorage.getItem("basket"));
        
             sum = arr.reduce((prev,next)=>{
                return prev+next.count;
            },0);
        basketCount.innerText = sum;
    }
}
CalcBasketCount();
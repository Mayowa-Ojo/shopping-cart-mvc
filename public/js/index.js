window.onload = () => {
  console.log('loaded!');
}

/* global variables */
const { log } = console;

/* select all required DOM elements in real time */
function selectElements() {
  const addButton = document.querySelectorAll('.product-qty button');
  const cart_qty = document.querySelector('.cart-qty p:nth-child(2)');
  const cart = document.querySelector('.product-cart hr');
  const cart_item_images = document.querySelectorAll('.cart-item img');
  const deleteButton = document.querySelectorAll('.cart-row button');
  const deleteButtonChild = document.querySelectorAll('.fa-trash-alt');
  const increaseQuantityButton = document.querySelectorAll('.cart-qty i');

  // return an object containing each DOM element
  return ({
    addButton,
    cart_qty,
    cart,
    cart_item_images,
    deleteButton,
    deleteButtonChild,
    increaseQuantityButton
  });
}

/* delete item from cart functionality */

function removeCartItem(e) {
  if(e.target.nodeName == 'I') {
    const parentElement = e.target.parentElement.parentElement.parentElement;
    e.stopPropagation();
    parentElement.remove();
  } else if(e.target.nodeName == 'BUTTON') {
    const parentElement = e.target.parentElement;
    e.stopPropagation();
    parentElement.remove();
  }
}

/* add product to cart functionality */
function addItemToCart({ target }) {
  // stores current product selected
  const cart_state = [];

  // grab product details from DOM
  const quantity = target.parentElement.querySelector('input').value;
  const image = target.parentElement.parentElement.querySelector('.product-image img').src;
  const price = target.parentElement.parentElement.querySelector('.product-price p:nth-child(2)').textContent;
  
  // store current product in cart state
  cart_state.push({
    quantity,
    image,
    price
  });

  // check if item exists in cart
  const cart_images = selectElements().cart_item_images;

  for(let i = 0; i < cart_images.length; i++) {
    if(cart_images[i].src == cart_state[0].image) {
      alert('This item is in your cart');
      return;
    }
  }
  // create cart row if the condition returns false
  if(quantity == '') {
    // add a class to indicate empty field
    target.parentElement.querySelector('input').classList.add('warning');
    // alert user
    alert('Please specify the quantity')
  } else {
    createCartRow(cart_state[0]);
    target.parentElement.querySelector('input').classList.remove('warning');

  }
  // add event listener to created DOM node
  selectElements().deleteButton.forEach(btn => btn.addEventListener('click', removeCartItem));
  selectElements().deleteButtonChild.forEach(btn => btn.addEventListener('click', removeCartItem));
  selectElements().increaseQuantityButton.forEach(btn => btn.addEventListener('click', populateCartItem));
}

/* create a cart row */
function createCartRow(cart_item) {
  const cart_row_content = `
      <div class="cart-item">
        <p>Item</p>
        <img src=${cart_item.image} alt="">
      </div>
      <div class="cart-price">
        <p>Price</p>
        <p>${cart_item.price}</p>
      </div>
      <div class="cart-qty">
        <p>Quantity</p>
        <p contenteditable='true'>${cart_item.quantity}</p>
        <i class="fas fa-plus-circle"></i>
      </div>
      <button>
        <a href="#"><i class="fas fa-trash-alt"></i></a>
      </button>`;

  const cart_row = document.createElement('div');
  cart_row.classList.add('cart-row');
  cart_row.innerHTML = cart_row_content;
  selectElements().cart.before(cart_row);
}

function populateCartItem({ target }) {
  const quantity = target.parentElement.querySelector('.cart-qty p:nth-child(2)');
  const value = quantity.textContent;
  // console.log(value);
  quantity.textContent = `${parseInt(value) + 1}`;
}

/* event handlers */
selectElements().addButton.forEach(btn => btn.addEventListener('click', addItemToCart));
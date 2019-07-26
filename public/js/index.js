window.onload = () => {
  console.log('loaded!');
}

function selectElements() {
  const addButton = document.querySelectorAll('.product-qty button');
  const cart_qty = document.querySelector('.cart-qty p:nth-child(2)');

  return ({
    addButton,
    cart_qty
  });
}

function addItemToCart({ target }) {
  console.log(target.innerHTML);
  const qty = selectElements().cart_qty.textContent;
  selectElements().cart_qty.textContent = (parseInt(qty) + 1).toString();
}

/* event handlers */
selectElements().addButton.forEach(btn => btn.addEventListener('click', addItemToCart));
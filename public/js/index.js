window.onload = () => {
  console.log('loaded!')
}

const element = document.querySelector('.product-qty > p')

element.addEventListener('click', (e) => {
  console.log(e.target.innerText)
})
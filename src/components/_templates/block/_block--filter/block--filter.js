let block_product = document.querySelector('.content_products')
function filtersProduct(block){
  let block_tabs = block.querySelectorAll('.js-tabs ')
  let block_not_found = block_product.querySelector('.block--not-found')

  let cards = block_product.querySelectorAll('.card');

  function applyFilters() {
    let selectedType = block.querySelector('.button[data-type].is_active')
      if(selectedType){
        selectedType = selectedType.dataset.type;
      }

    let selectedAge = block.querySelector('.button[data-age].is_active')
    if (selectedAge){
      selectedAge = selectedAge.dataset.age;
    }

    cards.forEach(card => {
      let cardType = card.getAttribute('data-type');
      let cardAge = card.getAttribute('data-age');

      let typeMatch = selectedType === '' || cardType === selectedType;
      let ageMatch = selectedAge === '' || cardAge === selectedAge;

      if (typeMatch && ageMatch) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }

    });
  }
  function cards_sort(){
    let cards_not_hidden = block_product.querySelectorAll('.card:not(.hidden)')
    for (let i = 6;  i < cards_not_hidden.length ; i++){
      cards_not_hidden[i].classList.add('hidden')
    }
    if (block_product.querySelectorAll('.card:not(.hidden)').length < 1){
      block_product.querySelector('.block--pagination').classList.add('hidden')
      block_not_found.classList.add('show')
    } else {
      block_product.querySelector('.block--pagination').classList.remove('hidden')
      block_not_found.classList.remove('show')
    }
  }
  // cards_sort()
  block_tabs.forEach( tabs =>{
    let buttons = tabs.querySelectorAll('.button')
    buttons.forEach(btn=>{
      btn.addEventListener("click", (e) =>{
        buttons.forEach(t =>{
          t === e.currentTarget ? t.classList.add('is_active')  : t.classList.remove('is_active')
        })
        applyFilters()
        cards_sort()

      })
    })
    window.addEventListener('load', () => {
      buttons[0].click()
    })
  })
  let btn_reset = document.querySelector('.js-reset')
  btn_reset.addEventListener('click',(e)=>{
    block_tabs.forEach( block =>{
      block.querySelector(".button").click()
    })
  })

}

filtersProduct(block_product)


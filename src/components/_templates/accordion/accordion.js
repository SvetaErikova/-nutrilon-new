
// Accordion
let activateAccordion = (block) => {
  let accordionItems = block.querySelectorAll(".accordion");
  accordionItems.forEach(item => {
    let active_items = item.querySelectorAll('a')

    active_items.forEach(i => {
      i.addEventListener("click", (e)=>{
        e.stopPropagation()
      })
    })

    item.addEventListener("click", function(e){

      accordionItems.forEach(it => {
        it !== e.currentTarget ? it.classList.remove('is_open') : it.classList.toggle('is_open')
      });

    })
  })
}

activateAccordion(document)



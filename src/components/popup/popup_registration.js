
PopupManager.register('popup_for_filters', {
    additional_close_controls: false,
    is_block_scroll: true,
  },
  {
    on_open: (popup_element, params) => {
      filtersProduct(popup_element)
    },
    on_close: (popup_element, params) => {

    }
  }
);

// Add event Listeners to open Popups
// Элемент (data-openpopup=""), где data-openpopup = popup.name

let open_popup_buttons = document.querySelectorAll('[data-openpopup]');
function activatePopupButtons(buttons){
  buttons.forEach(b => {

    b.addEventListener('click', (e)=>{
      e.preventDefault();

        PopupManager.open(b.dataset.openpopup);
    })

  });
}

activatePopupButtons(open_popup_buttons)


/* Open popup after page loaded*/
window.addEventListener('load', ()=>{
  // PopupManager.open('popup_for_cookies')
  // PopupManager.open('popup_for_form')
})

/* Open popup after page loaded 1 time per session */
window.addEventListener('load', ()=>{
  if ( localStorage.getItem('popState') !== 'shown' ) {

  //   localStorage.setItem('popState','shown')
  }
})

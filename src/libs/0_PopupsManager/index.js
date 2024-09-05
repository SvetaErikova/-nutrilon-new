
(()=>{
  class PopupsManager{
    popups = [];

    register(name, options, hooks) {

      let popup = {
        name: name,
        dom_el: document.querySelector('[data-popup="'+ name +'"]'),
        options: {...options},
        hooks: {...hooks},
      }

      this.popups[name] = popup;
    }


    open(name, params = null) {

      if ( !this.popups[name] ) {
        console.error('PopupManager: No popup registered')
        return  false;
      }
      if ( !this.popups[name].dom_el ) {
        console.error('PopupManager: No html element for popup with that name exist')
        return  false;
      }

      let dom_el = this.popups[name].dom_el;

      //options
      this.popups[name].options.is_block_scroll ? document.documentElement.classList.add('noscroll') : false;

      //hooks on opening
      if ( this.popups[name].hooks.hasOwnProperty('on_open') )
        this.popups[name].hooks.on_open(dom_el, params);

      // Показать попап - класс active
        dom_el.classList.add('is_active')


      //Listeners for close
      if ( !this.popups[name].close_controls ) {
        // Закрытие на клик вне контента
        dom_el.addEventListener("click", function (e) {
          if ( e.target.closest('.popup--content') === null ) {
            window.PopupManager.close(name)
          }
        });

        // Закрытие на кнопку Esc
        window.addEventListener("keydown", function (e) {
          if (e.code === "Escape") {
            window.PopupManager.close(name)
          }
        }, {once: true});
      }

      // Найти все кнопки закрытия и добавить EventListener
      let close_buttons = dom_el.querySelectorAll('[data-closepopup]');

      close_buttons.forEach(b => {
        b.addEventListener('click', (e)=>{
          window.PopupManager.close(name)
        }, {once: true})
      });
    }


    close(name, params = null) {
      if (this.popups[name]) {
        let dom_el = this.popups[name].dom_el;

        if (this.popups[name].hooks.hasOwnProperty('on_close'))
          this.popups[name].hooks.on_close(dom_el, params);

        dom_el.classList.remove('is_active');

        this.popups[name].options.is_block_scroll ? document.documentElement.classList.remove('noscroll') : false;

      }
    }
  }

  window.PopupManager = new PopupsManager();

})( typeof window !== "undefined" ? window : null);


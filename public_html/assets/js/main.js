window.addEventListener('load', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`)

  if ( window.matchMedia('(min-width: 1024px)').matches ) {
    let scrollbar_width = window.innerWidth - document.documentElement.clientWidth
    document.documentElement.style.setProperty('--scrollbarWidth', `${scrollbar_width}px`)
  }

  let header_height = document.querySelector('header').getBoundingClientRect().height
  document.documentElement.style.setProperty('--headerHeight', `${header_height}px`)

  // function handleIntersect(entries, observer) {
  //   entries.forEach((entry) => {
  //     if (entry.isIntersecting) {
  //       document.getElementById('booking_button').classList.add('visible')
  //     } else {
  //       document.getElementById('booking_button').classList.remove('visible')
  //     }
  //   });
  // }
  //
  //
  // let observer = new IntersectionObserver(handleIntersect, {
  //   root: null,
  //   rootMargin: '20px',
  //   threshold: 0.01
  // });
  //
  // observer.observe(document.querySelector('#booking_anchor'));
});

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`)
})



Inputmask({
  mask: "+7 999 999 99 99",
  inputmode: 'numeric',
  showMaskOnFocus: true,
  "clearIncomplete": true,
  clearMaskOnLostFocus: true,
  greedy: false,
  nullable: true,
}).mask("input[type='tel']");


function validateInputs(inputs) {
  inputs.forEach(i => {
    let error_text = parent.querySelector('.form__input-error')
    let parent = i.closest('.form__input');

    i.addEventListener('blur', ()=>{

      if ( !i.checkValidity() ) {
        i.setAttribute("invalid", '');
        i.removeAttribute("valid", '');

        parent ? parent.classList.add('error') : null;
        error_text ? error_text.textContent = "Данное поле не заполнено или заполнено неверно" : "";
      }
      else {

        i.removeAttribute("invalid", '');
        i.setAttribute("valid", '');

        parent ? parent.classList.remove('error') : null;
        error_text ? error_text.textContent = "Данное поле не заполнено или заполнено неверно" : "";
      }
    })

  })
}

let inputs = document.querySelectorAll('input[name]:not([type="hidden"])')
inputs.forEach(input => {
  input.addEventListener('change', ()=>{
    validateInputs(input)
  })
})
function validateForm(form){
  form.reportValidity()
}


/* Скролл хедера */

let last_scroll = 0;


window.addEventListener('scroll', (e) => {
  document.documentElement.scrollTop > 0 ? document.querySelector('header').classList.add('is_scrolled') : document.querySelector('header').classList.remove('is_scrolled')
})

window.addEventListener('load', (e) => {
  document.documentElement.scrollTop > 0 ? document.querySelector('header').classList.add('is_scrolled') : document.querySelector('header').classList.remove('is_scrolled')
})



let HOTELS_PHOTO = {
  1: {
    image: ["/assets/img/slider1.jpg","/assets/img/slider1.jpg"],
  },
  2: {
    image: ["/assets/img/slider2.jpg","/assets/img/slider2.jpg"],
  },
}
function activatePopupSchemeSlider(block){
  let slider_controls = document.createElement('div');
  slider_controls.classList.add('slider_controls');

  let swiper_nav_prev = document.createElement('div');
  swiper_nav_prev.classList.add('swiper-button-prev');
  slider_controls.append(swiper_nav_prev);

  let swiper_nav_next = document.createElement('div');
  swiper_nav_next.classList.add('swiper-button-next');
  slider_controls.append(swiper_nav_next);

  let swiper_pagination = document.createElement('div');
  swiper_pagination.classList.add('swiper_pagination');
  slider_controls.append(swiper_pagination);

  let image_wrapper = document.querySelector('.popup--hotel .popup--image')

  const swiper = new Swiper( block , {
    createElements: true,
    slideClass: 'img-slide',
    slidesPerView: 1,
    spaceBetween: 20,
    grabCursor: true,
    simulateTouch: true,
    freeMode: false,
    allowTouchMove: true,
    uniqueNavElements: true,
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      nextEl: swiper_nav_next,
      prevEl: swiper_nav_prev,
    },
    pagination: {
      el: swiper_pagination

    },
  });


  // if (swiper.slides.length <= 1) {
  //   swiper.disable()
  // }

  image_wrapper.append(slider_controls);
}


PopupManager.register('popup_for_form', {
    close_controls: true,
    is_block_scroll: false,
  },
  {
    on_close: (popup_element, params) => {
      popup_element.querySelector('form').reset();
    }
  }
);

PopupManager.register('popup_menu',{
    is_block_scroll: true,
    close_controls: false,
  },
  {
    on_close: (popup_element, params) => {
      let accordions = popup_element.querySelectorAll('.js-openAccordion')
      accordions.forEach( a => {
        setTimeout(()=>{
          a.classList.contains('active') ? a.classList.remove('active') : false;
        }, 140)

      })
    }
  }
);
PopupManager.register('popup_for_hotel', {
      close_controls: true,
      is_block_scroll: false,
    },
    {
      on_open: (popup_element, params) => {
        console.log(params)
        let image = popup_element.querySelector('.popup--image')
        // popup_element.querySelector('img').src = params.querySelector('img').src
        popup_element.querySelector('.popup--content-title').innerHTML = params.querySelector('.card--title').innerHTML
        clone_content = params.querySelector('.card-for-popup').cloneNode(true)
        popup_element.querySelector('.popup--content-text').appendChild(clone_content);


        let images = HOTELS_PHOTO[params.id] ? HOTELS_PHOTO[params.id] : HOTELS_PHOTO[0]

        for (let i = 0; i < images.image.length; i++){
          img = document.createElement('img')
          img.classList.add('img-slide')
          img.src = images.image[i];
          image.append(img);
        }

        activatePopupSchemeSlider(popup_element.querySelector(' .popup--image'))
      },
      on_close: (popup_element, params) => {
        popup_element.querySelector('.popup--content-text').innerHTML = "";
        popup_element.querySelector('.popup--image').innerHTML = "";
      }
    }
);
PopupManager.register('popup_for_confirmation',
  {
    is_block_scroll: true,
    close_controls: true,
  },
  {
    on_open: (popup_element, params) => {
      let message_box = popup_element.querySelector('.popup__text');
      message_box.textContent = params.text;
    },
  }
);

// Add event Listeners to open Popups
// Элемент (data-openpopup=""), где data-openpopup = popup.name

let open_popup_buttons = document.querySelectorAll('[data-openpopup]');

function activatePopupButtons(buttons){
  buttons.forEach(b => {

    b.addEventListener('click', (e)=>{
      e.preventDefault();
     if ( b.dataset.openpopup === "popup_for_hotel" ) {

        PopupManager.open(b.dataset.openpopup, b)
      }

      else {
        PopupManager.open(b.dataset.openpopup);
      }

    })

  });
}

activatePopupButtons(open_popup_buttons)


/* Open popup after page loaded*/
window.addEventListener('load', ()=>{
  // PopupManager.open('popup_for_cookie')
  // PopupManager.open('popup_for_form')
})

/* Open popup after page loaded 1 time per session */
window.addEventListener('load', ()=>{
  // if ( localStorage.getItem('popState') !== 'shown' ) {
  //   active_manager.openPopup('popup_for_welcoming')
  //   localStorage.setItem('popState','shown')
  // }
})

let swiper_block = document.querySelectorAll('.block_list-slider');

swiper_block.forEach(swiper_item => {

  let slides_per_view = 3, slides_per_view_pad = 0, slides_per_view_mobile = 1;

  switch( true ){
    case swiper_item.classList.contains('content_case'):
      slides_per_view = 2;
      slides_per_view_pad = 2.2 ;
      slides_per_view_mobile = 1.2;
      break;
    case swiper_item.classList.contains('content_reviews'):
      slides_per_view = 1;
      slides_per_view_pad = 1;
      slides_per_view_mobile = 1;
      break;

  }


  let slider_controls = document.createElement('div');
  slider_controls.classList.add('slider_controls');


  let swiper_nav_prev = document.createElement('div');
  swiper_nav_prev.classList.add('swiper-button-prev');
  slider_controls.append(swiper_nav_prev);

  let swiper_pagination = document.createElement('div');
  swiper_pagination.classList.add('swiper_pagination');



  let swiper_nav_next = document.createElement('div');
  swiper_nav_next.classList.add('swiper-button-next');
  slider_controls.append(swiper_nav_next);


  const swiper = new Swiper(swiper_item.querySelector('.block--elements'), {
    createElements: true,
    slideClass: 'card',
    slidesPerView: slides_per_view,
    grabCursor: true,
    simulateTouch: true,
    freeMode: false,
    allowTouchMove: true,
    uniqueNavElements: true,
    // centeredSlides: true,
    focusableElements: 'input, select, option, textarea, button, video, label, a, button, .card__image_slide',
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      nextEl: swiper_nav_next,
      prevEl: swiper_nav_prev,
    },
    pagination: {
      el: swiper_pagination
    },
    breakpoints: {
      240: {
        spaceBetween: 8,
        slidesPerView: slides_per_view_mobile,
        // slidesOffsetBefore: 16,
        // slidesOffsetAfter: 16,
      },
      768: {
        spaceBetween: 28,
        slidesPerView: slides_per_view_pad,
        // slidesOffsetBefore: 16,
        // slidesOffsetAfter: 16,
      },
      1024: {
        spaceBetween: 28,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        slidesPerView: slides_per_view,
      },

    },
  });

  if (swiper.slides.length <= 1) {
    swiper.navigation.nextEl.classList.add('hidden')
    swiper.navigation.prevEl.classList.add('hidden')
    swiper.disable()
  }

  swiper.el.append(slider_controls);

  swiper.el.append(swiper_pagination);
})


let marqueeSwiper = document.querySelector('.js-marquee')
if(marqueeSwiper){

  const marquee = new Swiper(marqueeSwiper, {
    createElements: true,
    speed: 6000,
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 30,
    freeMode: true,
    uniqueNavElements: true,
    centeredSlides: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false // или сделать так, чтобы восстанавливался autoplay после взаимодействия
    },
  });
}

/* Input type file */

let inputs_file = document.querySelectorAll(".js-input_file")

inputs_file.forEach(input => {

  let file_text = input.parentElement.querySelector(".js-changeDescriptionText")
  let changeFileButton = input.parentElement.querySelector(".js-clearFile")

  input.addEventListener("change", function(){
    file_text.textContent = input.files.item(0).name;
    input.parentElement.classList.add("loaded");
  })

  changeFileButton.addEventListener("click", function(e){
    e.stopPropagation()
    e.preventDefault()

    input.value = ""
    input.parentElement.classList.remove("loaded")
    file_text.innerHTML = "<span>Выберите файл</span> с резюме или перетащите его в поле (doc, pdf, до 10мб)"
  })

})


let map = document.getElementById('map')
let block_with_map = document.querySelector('.content_contacts')

if ( block_with_map && map ) {
  ymaps.ready(init);

  function init() {
    var map = new ymaps.Map("map", {
      center: [55.687350, 37.615069],
      zoom: 16,
      controls: [],
    });
    map.behaviors.disable('scrollZoom');

    let placemark = new ymaps.GeoObjectCollection({}, {
      iconLayout: 'default#image',
      iconImageHref: '../assets/img/icons/placemark.svg',
      iconImageSize: [40, 54],
      iconImageOffset: [-20, -37],
    })

    placemark.add(new ymaps.Placemark([55.687350, 37.615069]));
    map.geoObjects.add(placemark);

  }
}

// Accordion

let initAccordionItems = (block) => {
  let accordion_items = block.querySelectorAll(".accordion");

  accordion_items.forEach(item => {

    item.addEventListener("click", function(e){

      accordion_items.forEach(it => {
        it !== e.currentTarget ? it.classList.remove('is_open') : it.classList.toggle('is_open')
      });

    })
  })
}

initAccordionItems(document)


Fancybox.bind(' *[data-fancybox]', {
  infinite: false,
  groupAll: true
})

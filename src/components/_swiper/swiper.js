
function activateSliderReviews(block){
    let block_head = block.querySelector('.block--head')

    let slider_controls = document.createElement('div');
    slider_controls.classList.add('slider_controls');

    let swiper_nav_prev = document.createElement('div');
    swiper_nav_prev.classList.add('swiper-button-prev');
    slider_controls.append(swiper_nav_prev);

    let swiper_nav_next = document.createElement('div');
    swiper_nav_next.classList.add('swiper-button-next');
    slider_controls.append(swiper_nav_next);

    const swiper = new Swiper(block.querySelector('.block--elements'), {
      createElements: true,
      slidesPerView: 1.1,
      grabCursor: true,
      simulateTouch: true,
      freeMode: false,
      allowTouchMove: true,
      autoHeight: true,
      spaceBetween: 8,
      mousewheel: {
        forceToAxis: true,
      },
      slideClass: 'card',
      navigation: {
        nextEl: swiper_nav_next,
        prevEl: swiper_nav_prev,
      },
      breakpoints: {
        675: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1240: {
          slidesPerView: 3,
          spaceBetween: 20,
        }
      },
    });
  block_head.append(slider_controls);
}
let block_reviews = document.querySelectorAll('.block_list-slider.content_rewiews ')
block_reviews.forEach(block =>{
  activateSliderReviews(block)
})

// slider in card product
function initProductCardsImages(){
  let card_room_slider = document.querySelectorAll('.content_products .card .card--image')

  card_room_slider.forEach(slider => {

    let room_images = slider.querySelectorAll('img')

    if (room_images.length > 0) {
      const card_room_slider = new Swiper(slider, {
        createElements: true,
        slidesPerView: 1,
        grabCursor: true,
        // simulateTouch: true,
        freeMode: false,
        allowTouchMove: true,
        loop: false,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        mousewheel: {
          forceToAxis: true,
        },
        slideClass: 'card__image_slide',
        navigation: false,
        pagination: true,
        on: {
          init: function(swiper){
            let area = document.createElement('div');
            area.classList.add('room_images_hover')
            swiper.el.appendChild(area);
            swiper.slides.forEach(sl => {
              let slide_area = document.createElement('div');
              slide_area.classList.add('room_images_hover_item')
              area.appendChild(slide_area);
            })
          }
        }
      });
      let room_images_hover_item = slider.querySelectorAll('.room_images_hover_item')
      if ( window.matchMedia('(min-width:1024px)').matches ){
        room_images_hover_item.forEach((item, index )=> {
          item.addEventListener('mouseover', (e)=>{
            card_room_slider.slideTo(index)
          })
        })
      }

    }
  })
}

initProductCardsImages()






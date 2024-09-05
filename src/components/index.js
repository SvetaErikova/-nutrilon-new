let block_reviews_cards = document.querySelectorAll('.content_rewiews .review-video')
block_reviews_cards.forEach(card =>{
  card.addEventListener('click', (e)=>{
  let video = card.querySelector('video')
    console.log(video)
    if(e.currentTarget === card){
      if (!video.paused){
        video.pause()
      } else {
        video.play()
      }
    } else{
      video.pause()
    }
  })
})







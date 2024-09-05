gsap.registerPlugin ( ScrollTrigger ) ;

if (document.querySelector('.content_animation')) {
  if (window.matchMedia("(min-width: 998px)").matches) {

    let tl = gsap.timeline({
      defaults: {ease: "none"},
      scrollTrigger: {
        trigger: ".block_animation-title ",
        start: "center 30%",
        end: `+=${window.innerHeight * 0.7}`,
        scrub: 2,
        markers: false,
        duration: 2,
      }
    })

    tl.fromTo(".block_animation-title", {
      scale: 1,
      y: 0,
      opacity: 1,
    },{
      scale: 0.5,
      opacity: 0,
      y: -400,
      duration: 2,
      ease: "power1.inOut",
    })

    tl.fromTo(".content_animation .image--big-flare", {
      top: '30%',
      scale: 1,
      opacity: 0.3,
    }, {
      opacity: 1,
      scale: 0.5,
      top: '-20%',
      duration: 2,
      ease: "Power1.easeOut",

    },"<")

    tl.fromTo(".content_animation .image--circle-lens", {
      left: '-30%',
      opacity: 0,
    },{
      left: '0',
      opacity: '0.5',
      duration: 2,
      ease: "power1.inOut",
    })


    tl.fromTo(".content_animation .image--blick", {
      y: 0,
    },{
      y: '80%',
      duration: 2,
      ease: "power1.inOut",
    },"<")
    tl.fromTo(".content_advantages .image--helix", {
      top: '-20%',
      opacity: 0,
    }, {
      top: '50%',
      duration: 2,
      opacity: 1,
      ease: "Power1.easeOut",
    },'<')



    let tt = gsap.timeline({
      defaults: {ease: "none"},
      scrollTrigger: {
        trigger: ".content_advantages",
        // pinnedContainer: ".content_animation",
        pin: ".content_animation",
        start: "45% center",
        end: `+=${window.innerHeight * 5} ` ,
        scrub: 0.5,
        markers: false,
        // duration: 20,
        pinSpacing: true,
      },
    })

    tt.fromTo(".content_animation .image--lens", {
      opacity: 0.2,
      left: '50%',
    }, {
      left: '30%',
      opacity: 1,
      duration: 2,
      ease: "Power3.easeOut",
    })

    tt.fromTo(".content_advantages .advantages", {
      scale: 0,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      ease: "Power3.easeOut",
      duration: 2,
    })


    // Появление текста под малекулами
    tt.fromTo(".content_advantages .advantages .item:nth-child(1) .item--content", {
      opacity:0,
    }, {
      opacity: 1,
      ease: "power1.inOut",
    })
    tt.fromTo(".content_advantages .advantages .item:nth-child(2) .item--content", {
      opacity:0,
    }, {
      opacity: 1,
      ease: "power1.inOut",
    },'<')
    tt.fromTo(".content_advantages .advantages .item:nth-child(3) .item--content", {
      opacity:0,
    }, {
      opacity: 1,
      ease: "power1.inOut",
    },'<')
    tt.fromTo(".content_advantages .advantages .item:nth-child(4) .item--content", {
      opacity:0,
    }, {
      opacity: 1,
      ease: "Power1.easeOut",
    },'<')
    //

    tt.addLabel("stop", '+=0.5');
    tt.fromTo(".content_advantages .block--content .advantages", {
      scale: 1,
      opacity: 1,
    }, {
      scale: 0,
      opacity: 0,
      duration: 2,
      ease: "Power3.easeInOut",
    },"stop")



    tt.to(".content_advantages .image--helix", {
      scale: 0,
      opacity: 0,
      duration: 3,
      ease: "Power3.easeInOut",
    },"stop")

    tt.to(".content_animation .image--lens", {
      left: '0',
      scale: 0.5,
      opacity: 0,
      duration: 3,
      ease: "Power3.easeOut",
    },"stop")

    tt.to(".content_advantages .block--image", {
      scale: 0.7,
      duration: 3,
      ease: "Power3.easeOut",
    },'stop')

    tt.addLabel("flash", '<1');
    tt.fromTo(".content_advantages .image--flash", {
      opacity: 0,
    }, {
      opacity: 1,
      ease: "power1.inOut",
      duration: 0.4,
    },"flash+=0.4")
    tt.to(".content_advantages .block--image", {
      opacity: 0,
      ease: "Power3.easeOut",
    },"flash+=0.2")
    tt.fromTo(".content_advantages .image--flash", {
      opacity: 1,
      scale: 2,
    }, {
      duration: 1,
      opacity: 0,
      ease: "power1.inOut",
    },"flash+=0.6")


    // Начала анимации второго блока
    tt.fromTo(".content_advantages-1 .advantages", {
      opacity: 0,
    }, {
      opacity: 1,
      ease: "power1.inOut",
    },'<=')

    tt.addLabel("myLabel", '+=1');
    tt.fromTo(".content_advantages-1 .advantages--image img", {
      x: "55%",
    }, {
      x: 0,
      duration: 1,
      ease: "power1.inOut",
    },'myLabel')
    tt.to(".content_animation .image--blick", {
      y: '50%',
      ease: "power1.inOut",
    })
    tt.fromTo(".content_advantages-1 .advantages .item:nth-child(1)", {
      opacity:0,
      x: "-50%",
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
    })
    tt.fromTo(".content_advantages-1 .advantages .item:nth-child(2)", {
      opacity:0,
      x: "-50%",
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
    })
    tt.fromTo(".content_advantages-1 .advantages .item:nth-child(3)", {
      opacity:0,
      x: "-50%",
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
    })
    tt.fromTo(".content_advantages-1 .advantages .item:nth-child(4)", {
      opacity:0,
      x: "-50%",
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "Power1.easeOut",
    })
    tt.fromTo(".content_advantages-1 .advantages--note", {
      opacity:0,
      y: "-20%",
    }, {
      duration: 2,
      y: 0,
      opacity: 1,
      ease: "Power1.easeOut",
    })
  }

}


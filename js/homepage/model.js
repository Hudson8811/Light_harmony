const $animationToggle = $("#animation");
let animationOption = getCookie('option-animate');

if (animationOption && animationOption === '0') {
	$animationToggle.prop('checked', false);
	$('.intro__anim img').show();
  $('[data-js="renderModel"]').remove()
} else {
	$animationToggle.prop('checked', true);
	$('.intro__anim img').hide();
	initAnimation();
}

$animationToggle.on("change", function () {
	if ($animationToggle.is(":checked")) {
		$('.intro__anim img').hide();
		initAnimation();
		uncheckAndTriggerChange('#orangeTheme');
		setCookie('option-animate','1',90);
	} else {
		$('.intro__anim img').show();
    $('[data-js="renderModel"]').remove()
		setCookie('option-animate','0',90);
		$('.js-reset-options').addClass('active');
	}
});

function initAnimation() {
  const modelblock = document.querySelector('[data-js="modelBlock"]');
  
  if(!modelblock) return
  
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if(scrollTop > 0 && scrollTop < modelblock.offsetHeight + 100) {
    window.scrollTo(0,0)
  }
  
  if(window.innerWidth >= 300) {
  
    gsap.registerPlugin(ScrollTrigger);
  
    //стартовый кадр
    const startImageIndex = 1;
  
    //колличество кадров
    const imagesCount = 101;
    let targetImagesCount = Math.floor(imagesCount / 2)
  
    let canvasWidth = 760
    let canvasHeight = 760
    
    let ww = window.innerWidth;
  
    if(ww < 640) {
      canvasWidth = 270
      canvasHeight = 270
    } else if (ww < 1200) {
      canvasWidth = 570
      canvasHeight = 570
    } else if (ww < 1800) {
      canvasWidth = 620
      canvasHeight = 620
    }
  
    //Модель
    //const canvasModel = modelblock.querySelector('[data-js="renderModel"]');
    const canvasModel = document.createElement('canvas')
    canvasModel.classList.add('intro__model')
    canvasModel.setAttribute('data-js', 'renderModel')
    modelblock.appendChild(canvasModel)
    const contextModel = canvasModel.getContext("2d");
    canvasModel.width = canvasWidth;
    canvasModel.height = canvasHeight;
  
    const imagesArr = []
  
    function renderModel(thisFrame, thisProgress = false) {
      contextModel.clearRect(0, 0, canvasModel.width, canvasModel.height);
      if(thisProgress !== false) {
        let currentFrame = Math.floor((imagesCount - targetImagesCount) * thisProgress + targetImagesCount)
        if(currentFrame > imagesCount - 1) {
          currentFrame = imagesCount - 1
        }
        if(currentFrame < 0) {
          currentFrame = 0
        }
        contextModel.drawImage(imagesArr[currentFrame], 0, 0, canvasWidth, canvasHeight);  
      } else {
        contextModel.drawImage(imagesArr[Math.floor(thisFrame)], 0, 0, canvasWidth, canvasHeight);
      }
    }
  
    const frameModel = (index) => (
        `../Light_harmony/models/${(index + startImageIndex).toString()}.png`
        //`../models/${(index + startImageIndex).toString()}.png`
    );
  
    // Загружаем все картинки
    for (let i = 0; i < imagesCount; i++) {
      const img = new Image();
      img.src = frameModel(i);
      imagesArr.push(img);
    }
  
   const anim = {
     frame: 0
    };
  
    const modelAnim = gsap.timeline({
      paused: true
    });
  
    imagesArr[0].addEventListener('load', () => {
  
      let scrollTop1 = window.pageYOffset || document.documentElement.scrollTop;
  
      if(scrollTop1 > 0 && scrollTop1 < modelblock.offsetHeight + 100) {
        window.scrollTo(0,0)
      }
  
      renderModel(anim.frame);
      const preloader = document.querySelector('[data-js="preloader"]');
  
      let checkPreloader = setInterval(function() {
        let visibility = window.getComputedStyle(preloader).visibility;
        if(visibility == 'hidden') {
          clearInterval(checkPreloader)
   
          let scrollTop2 = window.pageYOffset || document.documentElement.scrollTop;
  
          if(scrollTop2 > 0) {
            modelAnim.to(anim, {
              frame: imagesCount,
              snap: "frame"
            });
          } else {
            if(!$('#headerOptions').hasClass('show')) {
              $("body").addClass("side-hide");
              checkBodyScrollbar();
              $("body").addClass("overflow-hidden");
            }
            let count2 = Math.round(targetImagesCount / 5);
            let count1 = targetImagesCount - count2;

            let startAnim = setInterval(function() {
              renderModel(anim.frame)
              anim.frame = anim.frame + 1
    
              if(anim.frame > count1) {
                clearInterval(startAnim)
                if(!$('#headerOptions').hasClass('show')) {
                  $("body").removeClass("side-hide");
                  checkBodyScrollbar();
                  $("body").removeClass("overflow-hidden");
                }
                modelAnim.to(anim, {
                  frame: imagesCount,
                  snap: "frame"
                });
              }
    
            }, 1600 / count1)

            let startAnim2 = setInterval(function() {
              renderModel(anim.frame)
              anim.frame = anim.frame + 1
    
              if(anim.frame > targetImagesCount) {
                clearInterval(startAnim2)
                if(!$('#headerOptions').hasClass('show')) {
                  $("body").removeClass("side-hide");
                  checkBodyScrollbar();
                  $("body").removeClass("overflow-hidden");
                }
                modelAnim.to(anim, {
                  frame: imagesCount,
                  snap: "frame"
                });
              }
    
            }, 500 / count2)
          }
  
        }
      }, 100)
  
    })
  
    const st = ScrollTrigger.create({
        trigger: '[data-js="intro"]',
        start: "top top",
        end: "+100%",
        animation: modelAnim,
        scrub: 1.5,
        onUpdate: self => {
          setTimeout(() => {
            renderModel(anim.frame, self.progress);
          }, 1500)
        }
    })
  
  }
}



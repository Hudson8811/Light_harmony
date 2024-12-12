document.addEventListener('DOMContentLoaded', function() {
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

      let canvasWidth = modelblock.offsetWidth * 1.3
      let canvasHeight = canvasWidth 

      //Модель
      const canvasModel = modelblock.querySelector('[data-js="renderModel"]');
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
              $("body").addClass("side-hide");
              checkBodyScrollbar();
              $("body").addClass("overflow-hidden");
              let startAnim = setInterval(function() {
                renderModel(anim.frame)
                anim.frame = anim.frame + 1
      
                if(anim.frame > targetImagesCount) {
                  clearInterval(startAnim)
                  $("body").removeClass("side-hide");
                  checkBodyScrollbar();
                  $("body").removeClass("overflow-hidden");
                  modelAnim.to(anim, {
                    frame: imagesCount,
                    snap: "frame"
                  });
                }
      
              }, 2000 / targetImagesCount)
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
            renderModel(anim.frame, self.progress);
          }
      })

    }
})
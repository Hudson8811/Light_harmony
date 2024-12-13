document.addEventListener('DOMContentLoaded', function() {
    const modelblock = document.querySelector('[data-js="modelBlock"]');

    if(!modelblock) return

    if(window.innerWidth >= 300) {
  
      //gsap.registerPlugin(ScrollTrigger);
  
      //стартовый кадр
      const startImageIndex = 1;

      //колличество кадров
      const imagesCount = 101;
      let centerImagesCount = Math.floor(imagesCount / 2)

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
      const canvasModel = modelblock.querySelector('[data-js="renderModel"]');
      const contextModel = canvasModel.getContext("2d");
      canvasModel.width = canvasWidth;
      canvasModel.height = canvasHeight;
  
      const imagesArr = []

      const frameModel = (index) => (
        //`../Light_harmony/models/${(index + startImageIndex).toString()}.png`
        `../models/${(index + startImageIndex).toString()}.png`
      );
  
      // Загружаем все картинки
      for (let i = 0; i < imagesCount; i++) {
        if(i == 0) {
          const mainImg = new Image();
          mainImg.src = frameModel(centerImagesCount);
          imagesArr.push(mainImg);
        }
        if(i != centerImagesCount) {
          const img = new Image();
          img.src = frameModel(i);
          imagesArr.push(img);
        }
      }

      imagesArr[centerImagesCount].addEventListener('load', () => {
        renderModel(centerImagesCount);
        let crossPosInPercent = centerImagesCount

        document.addEventListener('mousemove', function(e) {
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          let modelHeight = modelblock.offsetHeight
          
          if(scrollTop > modelHeight * 1.2) return

          let currentPosInPercent = Math.round(e.clientX / (ww / 100))

          if(currentPosInPercent > crossPosInPercent) {
            for(let i = crossPosInPercent; i <= currentPosInPercent; i++) {
              setTimeout(() => {renderModel(i)}, 1)
            }
          }

          if(currentPosInPercent < crossPosInPercent) {
            for(let i = crossPosInPercent; i >= currentPosInPercent; i--) {
              setTimeout(() => {renderModel(i)}, 1)
            }
          }

          crossPosInPercent = currentPosInPercent

        })
      })

      function renderModel(thisFrame, thisProgress = false) {
        contextModel.clearRect(0, 0, canvasModel.width, canvasModel.height);
        if(thisProgress !== false) {
          let currentFrame = Math.floor((imagesCount - centerImagesCount) * thisProgress + centerImagesCount)
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

    }
})
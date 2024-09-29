var galleryThumbs = new Swiper(".gallery-thumbs", {
  slidesPerView: 8,
  spaceBetween: 15,
  breakpoints: {
    639: {
      spaceBetween: 20,
    },
  },
});
var galleryTop = new Swiper(".gallery-top", {
  loop: true,
  thumbs: {
    swiper: galleryThumbs,
  },
});
Fancybox.bind("[data-fancybox='gallery']", {});

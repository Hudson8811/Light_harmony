var buttons = new Swiper(".swiper-suppliers", {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: {
        el: ".suppliers__swiper-arrows-pagination .suppliers-swiper-pagination",
        clickable: true
    },
    navigation: {
        nextEl: ".suppliers__swiper-arrows-pagination .swiper-arrow-next",
        prevEl: ".suppliers__swiper-arrows-pagination .swiper-arrow-prev"
    },
    breakpoints: {
        639: {
            slidesPerView: 2,
            spaceBetween: 0
        }
    }
});
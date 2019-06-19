import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

export let swiperConfig: SwiperConfigInterface = {
  a11y: true,
  direction: 'horizontal',
  slidesPerView: 5,
  keyboard: true,
  scrollbar: false,
  navigation: true,
  pagination: false,
  allowTouchMove: true,
  roundLengths: true,
  touchMoveStopPropagation: false,
  spaceBetween: 15,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    900: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 10
    },
    1500: {
      slidesPerView: 4,
      spaceBetween: 10
    },
  }
};

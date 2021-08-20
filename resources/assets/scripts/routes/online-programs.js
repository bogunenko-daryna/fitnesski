import initGrid from '../partials/grid-init'
import testimonialsSliderInit from '../partials/testimonials-slider'
import Swiper from 'swiper/swiper-bundle';

export default {
  init() {
    //eslint-disable-next-line no-unused-vars
    var swiper = new Swiper('.swiper-container', {
      fadeEffect: {
        crossFade: false,
      },
    });

    initGrid();
    testimonialsSliderInit();

  },

  // JavaScript to be fired on all pages, after page specific JS is fired
  finalize() {
  },
};

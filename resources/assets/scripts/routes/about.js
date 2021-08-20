import initGrid from '../partials/grid-init'
import testimonialsSliderInit from '../partials/testimonials-slider'

export default {
    init() {

        initGrid();
        testimonialsSliderInit();

    },

    // JavaScript to be fired on all pages, after page specific JS is fired
    finalize() {
    },
};


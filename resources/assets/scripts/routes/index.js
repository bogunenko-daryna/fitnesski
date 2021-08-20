import 'ion-rangeslider'
import initGrid from '../partials/grid-init'
import testimonialsSliderInit from '../partials/testimonials-slider'

import 'jquery-mask-plugin/dist/jquery.mask.min'

export default {
    init() {
      $('.js-range-slider').each(function () {
        var max, min, from, to;
        if (typeof $(this).data('max') !== 'undefined') {
          max = $(this).data('max');
        } else {
          max = 100;
        }
        if (typeof $(this).data('min') !== 'undefined') {
          min = $(this).data('min');
        } else {
          min = 0;
        }
        if (typeof $(this).data('from') !== 'undefined' && $(this).data('from')) {
          from = $(this).data('from');
        } else {
          from = min;
        }
        if (typeof $(this).data('to') !== 'undefined' && $(this).data('to')) {
          to = $(this).data('to');
        } else {
          to = max;
        }
        $(this).ionRangeSlider({
          type: 'double',
          min: min,
          max: max,
          from: from,
          to: to,
          prefix: '$',
        });
      });

      $('#time').mask('00:00', {placeholder: '18:30'});

        initGrid();
        testimonialsSliderInit();
    },

    // JavaScript to be fired on all pages, after page specific JS is fired
    finalize() {
    },
};


import 'jquery-mask-plugin/dist/jquery.mask.min'
import LazyLoad from 'vanilla-lazyload';

export default {
  init() {
    $('.btn-toggle').click(function () {
      /*$('.filter').slideToggle(400);*/
      $('.filter').slideToggle(400);
    });
    $('.filter__label').click(function () {
      if ($(this).hasClass('click')) {
        $(this).next().slideToggle('fast');
      }
    });
    $('.select-checkbox label').click(function () {
      $('.big-light-btn').show(400);
      if ($(this).hasClass('all')) {
        if (!$(this).prev().is(':checked')) {
          $(this).parent().parent().find($('input:not(.all)')).prop('checked', true);
        } else {
          $(this).parent().parent().find($('input:not(.all)')).prop('checked', false);
        }
      }
    });
    $('.select-checkbox label').click(function () {
      if ($(this).hasClass('hide')) {
        if (!$(this).prev().is(':checked')) {
          $(this).parent().parent().find($('input:not(.all)')).prop('checked', false);
        }
      }
    });
    $('.filter__label').click(function () {
      $(this).toggleClass('close')
    });

    $('#time').mask('00:00', {placeholder: '18:30'});

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

    //forms
    var timeout;
    $(document).on('change', '.filter-form', function () {
      var form = $(this);

      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(function () {
        $(form).submit();
      }, 1000);
    });

    $(document).on('submit', '.filter-form', function (e) {
      e.preventDefault();
      var form = $(this);
      var content_holder = $(form).closest('div.content').find('.content__boxes');
      var button = $(content_holder).find('button');
      var offset = $(form).find('input[name="offset"]');
      offset.val(0);
      var values = $(form).serializeArray();

      $(content_holder).find('.full-box').each(function () {
        $(this).toggle(200, function () {
          $(this).remove();
        });

      });

      //set offset 4
      offset.val(4);


      load_posts(values, button);
    });

    $(document).on('click', '.big-light-btn', function (e) {
      e.preventDefault();

      var button = $(this);
      var content_holder = $(button).closest('.content');
      var form = $(content_holder).find('.filter-form');
      var values = $(form).serializeArray();
      var offset = $(form).find('input[name="offset"]');

      //set offset + 4
      offset.val(parseInt(offset.val()) + 4);

      load_posts(values, button);
    });

    function load_posts(args, button) {
      $.ajax({
        url: '/wp-admin/admin-ajax.php',
        type: 'POST',
        data: {'action': 'ajax_load_products', 'form': args},
        dataType: 'html',
      })
        .done(function (response) {
          if ( $(response).length < 4 ) {
            $(button).hide();
          } else {
            $(button).show();
          }
          if ( response ) {
            $(button).before(response);

            //image lazy load
            window._lazy = new LazyLoad({
              elements_selector: '.lazy',
            });
          }
        })
        .fail(function (response) {
          console.log(response);
        });
    }

  },

  // JavaScript to be fired on all pages, after page specific JS is fired
  finalize() {
  },
};

import Headroom from 'headroom.js'
import Swiper from 'swiper/swiper-bundle';
export default {
  init() {
    var headroom  = new Headroom(document.querySelector('header'));
    headroom.init();
    //eslint-disable-next-line no-unused-vars
    var swiper = new Swiper('.swiper-container', {
      fadeEffect: {
        crossFade: false,
      },
    });
    //Burger Actions
    $('.header__burger').click (function () {
      $('.mobile-menu').addClass('open-mobile');
      $('.header__burger').hide();
      $('.header__nav').addClass('header-bg');
      $('.shadow').addClass('show');
      $('body').addClass('overflow-hidden');
      $('.burger-light').addClass('light-show');
      $('.logo-light').addClass('light-show');
      $('.burger-dark').addClass('dark-hide');
      $('.logo-dark').addClass('dark-hide');
      $('.logo-light-contact').addClass('light-show');
      $('.logo-dark-contact').addClass('dark-hide');
    });
    $('.header__link li').click (function () {
      $('.header__menu').show(400);
    });
    $(document).mouseup(function (e){
      var div = $('.open-mobile');
      if (!div.is(e.target) // если клик был не по нашему блоку
        && div.has(e.target).length === 0) { // и не по его дочерним элементам
        $('.mobile-menu').removeClass('open-mobile');
        $('.shadow').removeClass('show');
        $('.header__burger').show();
        $('.header__nav').removeClass('header-bg');
        $('body').removeClass('overflow-hidden');
        $('.burger-light').removeClass('light-show');
        $('.logo-light').removeClass('light-show');
        $('.burger-dark').removeClass('dark-hide');
        $('.logo-dark').removeClass('dark-hide');
        $('.logo-light-contact').removeClass('light-show');
        $('.logo-dark-contact').removeClass('dark-hide');
      }
    });
    $(function(){
      $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        var sc = $(this).attr('href'),
          dn = $(sc).offset().top;
        $('html, body').animate({scrollTop: dn}, 1000);
        $('.mobile-menu').removeClass('open-mobile');
        $('.shadow').removeClass('show');
        $('.header__burger').show();
        $('.header__nav').removeClass('header-bg');
        $('body').removeClass('overflow-hidden');
        $('.burger-light').removeClass('light-show');
        $('.logo-light').removeClass('light-show');
        $('.burger-dark').removeClass('dark-hide');
        $('.logo-dark').removeClass('dark-hide');
        $('.logo-light-contact').removeClass('light-show');
        $('.logo-dark-contact').removeClass('dark-hide');

      });
    });

    //modal
    $('.sign-in-out').click( function (e) {
      e.preventDefault();
      $('.wrapper').toggleClass('open');
    });

    $(document).on('click', '#toggle-sign-in', function (e) {
      e.preventDefault();
      $('.sign-in').each(function () {
        $(this).toggle();
      });
    });

    $(document).on('submit', '.login-from', function (e) {
      e.preventDefault();
      var form = $(this);
      var values = $(this).serializeArray();

      $.ajax({
        url: '/wp-admin/admin-ajax.php',
        type: 'POST',
        data: values,
        dataType: 'json',
      })
        .done(function (response) {
          var message = '';
          if( isset( response.register ) ) {
            if ( response.register == false ) {
              message = response.message;
            } else if( isset( response.login ) && response.login == false ) {
              message = response.message
            }
          }

          if ( isset( response.login ) ) {
            if ( response.login == false ) {
              message = response.message;
            }
          }

          if ( message ) {
            $(form).find('#error_message').text(message);
            $(form).find('#error_message').parent().show();
          } else {
            location.reload();
          }
        })
        .fail(function (response) {

          console.log(response);
        });

    });

    $('.show').click( function () {
      if ($(this).prev().attr('type') === 'password') {
        $(this).prev().attr('type', 'text');
      } else {
        $(this).prev().attr('type', 'password');
      }
    });

    $(function($){
      $(document).mouseup(function (e){
        var div = $('.sign-in');
        if (!div.is(e.target)
          && div.has(e.target).length === 0) {
          $('.wrapper').removeClass('open')
        }
      });
    });

    $('.close').click( function () {
      $('.wrapper').removeClass('open')
    })


    $(document).on('click', 'label[for="search"]', function (e) {
      e.preventDefault();
      var s = $('#search').val();
      $('.search-results').html();
      $('.search-results').show();

      $.ajax({
        url: '/wp-admin/admin-ajax.php',
        type: 'POST',
        data: {'action': 'search', 's': s},
        dataType: 'html',
      })
        .done(function (response) {
          $('.search-results').html(response);
        })
        .fail(function (response) {
          console.log(response);
        });

    });

    $(document).on('click', '.mobile-menu__search img', function (e) {
      e.preventDefault();
      var s = $('#mobile_search').val();
      $('.search-results_mob').html();
      $('.search-results_mob').show();

      $.ajax({
        url: '/wp-admin/admin-ajax.php',
        type: 'POST',
        data: {'action': 'search', 's': s},
        dataType: 'html',
      })
        .done(function (response) {
          $('.search-results_mob').html(response);
        })
        .fail(function (response) {
          console.log(response);
        });

    });

    $(document).mouseup(function (e){
      var div = $('.search-results');
      if (!div.is(e.target)
        && div.has(e.target).length === 0) {
        $('.search-results').hide();
      }
    });


    function isset () {
      var a = arguments,
        l = a.length,
        i = 0,
        undef;

      if (l === 0) {
        throw new Error('Empty isset');
      }

      while (i !== l) {
        if (a[i] === undef || a[i] === null) {
          return false;
        }
        i++;
      }
      return true;
    }

  },

  // JavaScript to be fired on all pages, after page specific JS is fired
  finalize() {
  },
};


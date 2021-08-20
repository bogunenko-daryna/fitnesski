//eslint-disable-next-line no-unused-vars
import Swiper, { EffectFade } from 'swiper/swiper-bundle';

export default function testimonialsSliderInit() {

    //eslint-disable-next-line no-unused-vars
    var swiper = new Swiper('.swiper-container', {
      /*effect: 'fade',*/
    });
    $('.card-detail__small-img').click (function () {
        let index = $(this).attr('data-id');
        swiper.slideTo ( index );
    });
}


document.querySelector('.page').classList.add('loaded');


//карусель-слайдер на странице услуги

$(document).ready(function() {
    if ($('.capabilities').length) {
        let owl = $('.capabilities .owl-carousel');
        if (owl.length) {
            owl.owlCarousel({
                items: 1,
                margin: 25,
                mouseDrag: false,
                nav: false,
                dots: false,
            });

            $('.capabilities__arrow_next').click(function () {
                owl.trigger('next.owl.carousel');
            });

            $('.capabilities__arrow_prev').click(function () {
                owl.trigger('prev.owl.carousel', [300]);
            });
        }
    }
});
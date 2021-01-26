
document.querySelector('.page').classList.add('loaded');

let burgerInput = document.getElementById('burger');
let lists = document.querySelector('.header').querySelectorAll('ul');
let toScroll = document.querySelectorAll('.toScroll');

for(let i = 0; i < toScroll.length; i++) {
    if (toScroll[i].offsetTop > document.documentElement.scrollTop + 0.8 * document.documentElement.clientHeight) {
        toScroll[i].classList.add('hidden');
    }
}

function scrollCheck() {
    for(let i = 0; i < toScroll.length; i++) {
        if (toScroll[i].offsetTop <= document.documentElement.scrollTop + 0.8 * document.documentElement.clientHeight) {
            toScroll[i].classList.add('visible');
            toScroll[i].classList.remove('hidden');
        }
    }
}

window.addEventListener('scroll', scrollCheck);

//скролл при нажатии на пункт меню

function closeBurger() {
    burgerInput.checked = false;
}

for (let i = 0; i < lists.length; i++) {
    let links = lists[i].querySelectorAll('a');

    let _loop = function _loop(i) {
        links[i].addEventListener('click', function (event) {
            event.preventDefault();

            if (toScroll[i]) {
                toScroll[i].scrollIntoView({
                    behavior: 'smooth'
                });
                closeBurger();
            }
        });
    };

    for (let i = 0; i < links.length; i++) {
        _loop(i);
    }
}

//форма

//phone mask

"use strict";

function mask(event) {
    let matrix = "+7 (___) ___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
    if (def.length >= val.length) val = def;
    this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
    });

    if (event.type === "blur") {
        if (this.value.length === 2) this.value = "";
    }
}

let phones = document.querySelectorAll("._phone");
for (let i = 0; i < phones.length; i++) {
    phones[i].addEventListener("input", mask, false);
    phones[i].addEventListener("focus", mask, false);
    phones[i].addEventListener("blur", mask, false);
}

// validation

function formSend(form) {
    let error = formValidate(form);

    if (error === 0) {
        //отправка формы
        return true;
    }

    return false;
}

function formValidate(form) {
    let error = 0;
    let formReq = form.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
        let input = formReq[index];
        input.classList.remove('_error');

        if (input.classList.contains('_phone')) {
            if (input.value.length < 18) {
                input.classList.add('_error');
                error++;
            }
        } else {
            if (input.value.length < 3 || input.value.length > 32) {
                input.classList.add('_error');
                error++;
            }
        }
    }

    return error;
}

//всплывающее окно

if ($('.popup-callback-bg').length) {

    let popupCallbackBackground = document.querySelector('.popup-callback-bg');
    let popupCallbackOpenBtns = document.querySelectorAll('.popup-callback-open-btn');
    let popupCallbackCloseBtn = popupCallbackBackground.querySelector('.popup-callback__close');
    let popupCallbackForm = popupCallbackBackground.querySelector('.popup-callback__form');
    let popupThanksBackground = document.querySelector('.popup-thanks-bg');
    let popupThanksCloseBtns = popupThanksBackground.querySelectorAll('.popup-thanks__close');
    popupCallbackForm.addEventListener('submit', function (event) {
        event.preventDefault();
        let isSend = formSend(popupCallbackForm);

        if (isSend) {
            popupThanksBackground.classList.add('popup-thanks-bg-visible');
            popupCallbackBackground.classList.remove('popup-callback-bg-visible');
        }
    });
    for (let i = 0; i < popupCallbackOpenBtns.length; i++) {
        popupCallbackOpenBtns[i].addEventListener('click', function () {
            popupCallbackBackground.classList.add('popup-callback-bg-visible');
        });
    }
    popupCallbackBackground.addEventListener('click', function (event) {
        if (event.target === popupCallbackBackground) {
            popupCallbackBackground.classList.remove('popup-callback-bg-visible');
        }
    });
    popupCallbackCloseBtn.addEventListener('click', function () {
        popupCallbackBackground.classList.remove('popup-callback-bg-visible');
    });
    popupThanksBackground.addEventListener('click', function (event) {
        if (event.target === popupThanksBackground) {
            popupThanksBackground.classList.remove('popup-thanks-bg-visible');
        }
    });
    for (let i = 0; i < popupThanksCloseBtns.length; i++) {
        popupThanksCloseBtns[i].addEventListener('click', function () {
            popupThanksBackground.classList.remove('popup-thanks-bg-visible');
        });
    }
}

//переворачивающиеся блоки


if ($('.benefit').length) {
    let rotatingBlocksParent = document.querySelector('.benefit');
    let rotatingBlocks = rotatingBlocksParent.querySelectorAll('.benefit__item');

    rotatingBlocks.forEach(block => {
        block.addEventListener('click', () => {
            block.classList.add('benefit__item-active');
        })
    })
    document.addEventListener('click', (event) => {
        let isOnBlocks = false;
        rotatingBlocks.forEach(block => {
            if (block.contains(event.target) || block === event.target) {
                isOnBlocks = true;
            }
        })
        if (!isOnBlocks) {
            rotatingBlocks.forEach(block => {
                block.classList.remove('benefit__item-active');
            })
        }
    })
}
//карусель-слайдер на странице услуги

$(document).ready(function() {
    if ($('.capabilities').length) {
        let owl = $('.capabilities .owl-carousel');
        if (owl.length) {
            owl.owlCarousel({
                items: 1,
                margin: 25,
                mouseDrag: false,
                loop: true,
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
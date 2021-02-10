
document.querySelector('.page').classList.add('loaded');

//замена шрифта шапки при скролле

let conditions = document.querySelector('.conditions');
let conditionsLine = conditions.querySelector('.conditions__line');
let conditionsCircle = conditionsLine.querySelector('span');

function isRollingCircle() {
    if (conditions.offsetTop <= document.documentElement.scrollTop && document.documentElement.scrollWidth > 767) {
        conditionsCircle.classList.add('running');
    }
}

function showBlocks(i) {
    for (let j = i; j >= 0; j--) {
        toScroll[j].classList.add('visible');
        toScroll[j].classList.remove('hidden');
    }
}

function showCurrentBlock() {
    for(let i = 0; i < toScroll.length; i++) {
        if (toScroll[i].offsetTop <= document.documentElement.scrollTop + 0.8 * document.documentElement.clientHeight) {
            toScroll[i].classList.add('visible');
            toScroll[i].classList.remove('hidden');
        }
    }
}

//появление элементов при скролле

let burgerInput = document.getElementById('burger');
let lists = document.querySelector('.header').querySelectorAll('ul');
let toScroll = document.querySelectorAll('.toScroll');
let indexOfCurrentBlock = 0;

for(let i = 0; i < toScroll.length; i++) {
    if (toScroll[i].offsetTop > document.documentElement.scrollTop + 0.8 * document.documentElement.clientHeight) {
        toScroll[i].classList.add('hidden');
    }
    if (toScroll[i].offsetTop <= document.documentElement.scrollTop) {
        indexOfCurrentBlock = i;
    }
}

toScroll[indexOfCurrentBlock].scrollIntoView({
    behavior: 'smooth'
});

isRollingCircle();

window.addEventListener('scroll', showCurrentBlock);

window.addEventListener('mousewheel', function (event) {
    if (event.deltaY > 0 && indexOfCurrentBlock + 1 !== toScroll.length) {
        toScroll[++indexOfCurrentBlock].scrollIntoView({
            behavior: 'smooth'
        });
    } else if (event.deltaY < 0 && indexOfCurrentBlock !== 0) {
        toScroll[--indexOfCurrentBlock].scrollIntoView({
            behavior: 'smooth'
        });
    }
    isRollingCircle();
    showBlocks();
});

//скролл при нажатии на пункт меню

function closeBurger() {
    burgerInput.checked = false;
}

let _loop = function _loop(links, i) {
    links[i].addEventListener('click', function (event) {
        event.preventDefault();

        if (toScroll[i+1]) {
            indexOfCurrentBlock = i+1;
            toScroll[indexOfCurrentBlock].scrollIntoView({
                behavior: 'smooth'
            });
            closeBurger();
            isRollingCircle();
            showBlocks(indexOfCurrentBlock);
        }
    });
};

for (let i = 0; i < lists.length; i++) {
    let links = lists[i].querySelectorAll('a');

    for (let i = 0; i < links.length; i++) {
        _loop(links, i);
    }
}

let logo = document.querySelector('.header__logo').querySelector('a');

logo.addEventListener('click', function (event) {
    event.preventDefault();
    indexOfCurrentBlock = 0;
    toScroll[indexOfCurrentBlock].scrollIntoView({
        behavior: 'smooth'
    });
    closeBurger();
})

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

    let _loop = function _loop(i) {
        rotatingBlocks[i].addEventListener('click', function () {
            rotatingBlocks[i].classList.add('benefit__item-active');
        });
    };

    for (let i = 0; i < rotatingBlocks.length; i++) {
        _loop(i);
    }

    document.addEventListener('click', function (event) {
        let isOnBlocks = false;

        for (let _i = 0; _i < rotatingBlocks.length; _i++) {
            if (rotatingBlocks[_i].contains(event.target) || rotatingBlocks[_i] === event.target) {
                isOnBlocks = true;
            }
        }

        if (!isOnBlocks) {
            for (let _i2 = 0; _i2 < rotatingBlocks.length; _i2++) {
                rotatingBlocks[_i2].classList.remove('benefit__item-active');
            }
        }
    });
}

//двигающиеся блоки

/*
if ($('.advantages').length) {
    let items = document.querySelector('.advantages').querySelectorAll('.advantages__item');

    let _loop = function _loop(i) {
        let image = items[i].querySelector('img');
        let x = void 0,
            y = void 0;
        items[i].addEventListener('mouseenter', function (event) {
            let heightOfItem = items[i].offsetHeight;
            let widthOfItem = items[i].offsetWidth;
            let xPossible = (image.scrollWidth - widthOfItem) / 2;
            let yPossible = (image.scrollHeight - heightOfItem) / 2;

            if (document.documentElement.scrollWidth > 767) {
                x = event.pageX - items[i].offsetLeft;
                y = event.pageY - items[i].offsetTop;
                image.style.transform = "translate(-50%,-50%) translate(".concat((widthOfItem / 2 - x) * xPossible / (widthOfItem / 2), "px,").concat((heightOfItem / 2 - y) * yPossible / (heightOfItem / 2), "px)");
                setTimeout(function () {
                    image.style.transition = 'transform 0.05s ease';
                }, 200);
            }
        });
        items[i].addEventListener('mousemove', function (event) {
            let heightOfItem = items[i].offsetHeight;
            let widthOfItem = items[i].offsetWidth;
            let xPossible = (image.scrollWidth - widthOfItem) / 2;
            let yPossible = (image.scrollHeight - heightOfItem) / 2;

            if (document.documentElement.scrollWidth > 767) {
                x = event.pageX - items[i].offsetLeft;
                y = event.pageY - items[i].offsetTop;
                image.style.transform = "translate(-50%,-50%) translate(".concat((widthOfItem / 2 - x) * xPossible / (widthOfItem / 2), "px,").concat((heightOfItem / 2 - y) * yPossible / (heightOfItem / 2), "px)");
            }
        });
        items[i].addEventListener('mouseleave', function () {
            image.style.transition = 'transform 0.2s ease';
            image.style.transform = 'translate(-50%,-50%)';
        });
    };

    for (let i = 0; i < items.length; i++) {
        _loop(i);
    }
}

*/
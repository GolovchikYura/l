document.addEventListener("DOMContentLoaded", function() {
    const burgerBtn = document.querySelector(".icon-menu");
    const body = document.body;
    const html = document.documentElement;
    const menuBody = document.querySelector('.menu__body');

    burgerBtn.addEventListener("click", function() {
        if (!html.classList.contains("menu-open")) {
            html.classList.add("menu-open");
            body.classList.add("lock");
        } else {
            html.classList.remove("menu-open");
            body.classList.remove("lock");
        }
    });

    document.addEventListener('click', function(event) {
        const header = document.querySelector('header');
        const isClickInsideMenu = menuBody.contains(event.target);
        const isClickInsideHeader = header.contains(event.target);
      
        if (!isClickInsideHeader || isClickInsideMenu) {
            html.classList.remove("menu-open");
            body.classList.remove("lock");
        } 
    });

    // Обработчик для тегов <a> внутри меню
    const menuLinks = menuBody.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            html.classList.remove("menu-open");
            body.classList.remove("lock");
        });
    });
});
//----------------------------------------------------//

document.addEventListener("DOMContentLoaded", function() {
    const header = document.getElementById("header");
    let lastScrollY = window.scrollY;

    function handleScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 0) {
            // Прокрутка вниз
            header.style.top = "-120px"; // скрываем заголовок (можно настроить значение в зависимости от высоты заголовка)
            header.classList.add("scroll-down");
            header.classList.remove("scroll-up");
        } else if (currentScrollY === 0) {
            // Достигнут верх страницы
            header.style.top = "0"; // показываем заголовок
            header.classList.remove("scroll-down");
            header.classList.remove("scroll-up");
        } else if (currentScrollY < lastScrollY) {
            // Прокрутка вверх
            header.style.top = "0"; // показываем заголовок
            header.classList.add("scroll-up");
            header.classList.remove("scroll-down");
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", function() {
        window.requestAnimationFrame(handleScroll);
    });
});
//--------------------------------------------//

document.getElementById('formName').addEventListener('input', function (e) {
    const value = e.target.value;
    e.target.value = value.replace( /[^a-zA-ZА-Яа-яЁё]/g, '');
});

//----------------------------------------//

function handleFormSubmit(formId) {
    const form = document.getElementById(formId);
    
    // Проверяем, существует ли форма
    if (!form) {
        return; // Если формы нет на странице, выходим из функции
    }

    const result = document.getElementById('result');
    const popupBody = document.getElementById("popup-body");
    const closePopupBtnn = document.getElementById('closePopupBtn');
    const popup = document.getElementById('popup');
    const success = document.getElementById("success");

    if (closePopupBtnn && popupBody && success) {
        closePopupBtnn.addEventListener('click', function() {
            popupBody.classList.remove('success');
            success.classList.remove('popup-success');
        });

        window.addEventListener('click', (event) => {
            if (event.target === popup) {
                popupBody.classList.remove('success');
                success.classList.remove('popup-success');
            }
        });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) { 
                    result.innerHTML = 'Erfolgreich gesendet';
                    if (popupBody && success) {
                        popupBody.classList.add('success');
                        success.classList.add('popup-success');
                    }
                } else {
                    console.log(response);
                    result.innerHTML = 'Fehler beim Senden';
                }
            })
            .catch(error => {
                console.log(error);
                result.innerHTML = "Fehler beim Senden";
            })
            .then(function() {
                form.reset();
                setTimeout(() => {
                    result.innerHTML = "";
                }, 3000);
            });
    });
}

// Обработка форм
document.addEventListener('DOMContentLoaded', () => {
    handleFormSubmit('form1'); // Для первой формы на главной
    handleFormSubmit('form2'); // Для второй формы на главной
    handleFormSubmit('form3'); // Для формы на другой странице
});


//-------------------------------------------------------------------------//

document.addEventListener('DOMContentLoaded', () => {
    const openPopupBtn = document.getElementById('openPopupBtn');
    const closePopupBtn = document.getElementById('closePopupBtn');
    // const openMobilePopupBtn = document.getElementById('openMobilePopupBtn');
    const popup = document.getElementById('popup');
    const body = document.body

    openPopupBtn.addEventListener('click', () => {
        popup.style.display = 'flex';
        body.classList.add('lock-popup');
    });
    closePopupBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        body.classList.remove('lock-popup');
    });

    // Закрытие popup при клике вне его
    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
            body.classList.remove('lock-popup');
        }
    });
});
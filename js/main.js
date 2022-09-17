$(document).ready(function () {
    
	//Мобильное меню
    const toggleMenu = document.querySelector('.toggle-menu'); // иконка gamburger
    const mobMenu = document.querySelector('.mobile-menu'); // mobile menu
    const overlay = document.querySelector('#overlay'); // overlay
    const bodyEl = document.body;

    // Прослушивание события клик по гамбургеру
    toggleMenu.addEventListener('click', function(){
        this.classList.toggle('active');
        mobMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        bodyEl.classList.toggle('noscroll');
    });

    // Прослушивание события клик по моб.меню
    mobMenu.addEventListener('click', function(){
        this.classList.remove('active');
        toggleMenu.classList.remove('active');
        overlay.classList.remove('active');
        bodyEl.classList.remove('noscroll');
    });

    // Прослушивание события клик по overlay
    overlay.addEventListener('click', function(){
        this.classList.remove('active');
        toggleMenu.classList.remove('active');
        mobMenu.classList.remove('active');
        bodyEl.classList.remove('noscroll');
    });

    // Фильтрация проектов
    // let containerEl = document.querySelector('#portfolio-projects');

    // let mixer = mixitup(containerEl, {
    //     classNames: {
    //         block: ""
    //     }
    // });

    // form placeholder
	const formItems = document.querySelectorAll('.form-field');
	
	for(let item of formItems){
		const thisParent = item.closest('.form-item');
		const thisPlaceholder = thisParent.querySelector('.fake-placeholder');
		// Если инпут в фокусе		
		item.addEventListener('focus', function(){
			thisPlaceholder.classList.add('active');
		});

		// Если инпут теряет фокус
		item.addEventListener('blur', function(){

			if(item.value.length > 0){
				thisPlaceholder.classList.add('active');
			}
			else{
				thisPlaceholder.classList.remove('active');
			}
		});
	}

    //FORM VALIDATE
	$('.contact-form').validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			subject: {
				required: true
			},
			message: {
				required: true
			}
		},
		messages: {
			email: {
				required: 'Введите email',
				email: 'Отсутсвует символ @'
			},
			subject: {
				required: 'Введите тему сообщения'
			},
			message: {
				required: 'Введите текст сообщения'
			}
		},
		submitHandler: function (form) {
			ajaxFormSubmit();
		}

	});

	// Nav page
	// $('#page-nav').onePageNav({
	// 	currentClass: 'active',
	// 	changeHash: false,
	// 	scrollSpead: 750,
	// 	scrollThreshold: 0.5,
	// 	filter: '',
	// 	easing: 'swing',
	// 	begin: function () {},
	// 	end: function () {},
	// 	scrollChange: function ($currentListItem) {}
	// });

	if($('#page-nav')){
		$('#page-nav').onePageNav({
			currentClass: 'active',
			changeHash: false,
			scrollSpead: 750,
			scrollThreshold: 0.5,
			filter: '',
			easing: 'swing',
			begin: function () {},
			end: function () {},
			scrollChange: function ($currentListItem) {}
		})
	};

    // Функция AJAX запрса на сервер

	function ajaxFormSubmit() {

		let string = $(".contact-form").serialize(); // Соханяем данные введенные в форму в строку.

		//Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string

			// Функция если все прошло успешно
			success: function (html) {
				$(".contact-form").slideUp(800);
				$('#answer').html(html);
			}
		});
		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
		return false;
	}

	//Параллакс движения за мышкой
	let prxScene = document.querySelector('.contacts');
	let prxItem = document.querySelectorAll('.move-quot');
	prxScene.addEventListener('mousemove', function(e) {
		let x = e.clientX / window.innerWidth;
		let y = e.clientY / window.innerHeight;
		for (let item of prxItem) {
			item.style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
		}
	});

	//Отображение/скрытие карточек проектов по загрузке страницы
	if($(window).width() <1200){
		$('.project-card.hide-card').hide();
		$('.show-project-cards').on('click', function(){
			$('.project-card.hide-card').fadeIn();
			$(this).hide();
		});
	}
	else{
		$('.project-card.hide-card').fadeIn();
		$('.show-project-cards').hide();
	}


	// Отображение карточки проектов и скрытие "Смотреть дальше"
	// $(window).width() <768
	// 	$('.project-card.hide-card').fadeIn();
	// 	$('.show-project-cards').fadeIn();

	// Отображение/скрытие карточек проектов при ресайзе страницы
	$(window).on('resize', function(){
		if($(window).width() <1200){
			$('.project-card.hide-card').hide();
			$('.show-project-cards').fadeIn();

			$('.show-project-cards').on('click', function(){
				$('.project-card.hide-card').fadeIn();
				$(this).css('display', 'none');
			});
		}
		else{
			$('.project-card.hide-card').fadeIn();
			$('.show-project-cards').hide();
		}
	});
});
$(function() {
	//=========MENU===========

	$('.header__burger').on('click', function() {
		//$(this).toggleClass('active');
		$('.header__menu').toggleClass('active');
   });
   
   $('.header__link').on('click', function() {
		$('.header__menu').removeClass('active');
   });

   $('.menu-close').on('click', function() {
		$('.header__menu').removeClass('active');
   });
   
   $('.enter-header__img').on('click', function() {
		$('.enter-header__body').toggleClass('active');
   });

	//=======================

	$('.video-feedback').slick({
         infinite: true,
         arrows: true,
			dots: false,
			slidesToShow: 3,
         slidesToScroll: 1,
         appendArrows: $('.video-feedback__arrows'),
         prevArrow: $('.feedback-arrows__prev'),
         nextArrow: $('.feedback-arrows__next'),
			responsive: [
				{
					breakpoint: 1100,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						infinite: true
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: true
					}
				},
			]
      });
   
      //===============================

      $(".block-questions__question").on('click', function(){
         $(this).toggleClass('active');
         var ansver = $(this).next();
         $(".block-questions__ansver:visible").not(ansver).slideUp(400);
         $(".block-questions__question").not($(this)).removeClass('active');
         ansver.slideToggle(400);         
      });

      
});

//===========animation===============

const animItems = document.querySelectorAll('.anim-items');

if(animItems.length > 0){	
	window.addEventListener('scroll', animOnScroll);
		function animOnScroll() {
			for (var i = 0; i < animItems.length; i++) {
				const animItem = animItems[i];
				const animItemHeight = animItem.offsetHeight; //высота элемента
				const animItemOffset = offset(animItem).top; // позиция элемента от верха
				const animStart = 4; //старт анимации

				let animItemPoint = window.innerHeight - animItemHeight / animStart;
				if (animItemHeight > window.innerHeight) {
					animItemPoint = window.innerHeight - window.innerHeight / animStart;
				}

				if (pageYOffset > (animItemOffset - animItemPoint) &&  pageYOffset < (animItemOffset + animItemHeight)){
					animItem.classList.add('_active');
				} else {
					if(!animItem.classList.contains('anim-no-hide')){
						animItem.classList.remove('_active');
					}
				}
			}
		}
	}	
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop =  window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }	
	}
	setTimeout( function() {
		animOnScroll();
	}, 300);

//==================video========

const videos = document.querySelectorAll('.video');

// generate video url
let generateUrl = function (id) {
	let query = '?rel=0&showinfo=0&autoplay=1';
	return 'https://www.youtube.com/embed/' + id + query;
};

// creating iframe
let createIframe = function (id) {
	let iframe = document.createElement('iframe');
	iframe.setAttribute('allowfullscreen', '');
	iframe.setAttribute('allow', 'autoplay; encrypted-media');
	iframe.setAttribute('src', generateUrl(id));
   return iframe;
};

// main code
videos.forEach(function(el) {
	let videoHref = el.getAttribute('data-video');
	let deletedLength = 'https://youtu.be/'.length;
   let videoId = videoHref.substring(deletedLength, videoHref.length);   
   let youtubeImgSrc = 'https://i.ytimg.com/vi/' + videoId + '/maxresdefault.jpg';
   
   let createImg = function () {
      let image = document.createElement('img');
      image.setAttribute('src', youtubeImgSrc);
      return image;
   };
   
   el.appendChild(createImg());

	el.addEventListener('click', function(e) {
      e.preventDefault();

         let iframe = createIframe(videoId);
         el.querySelector('img').remove();
         el.appendChild(iframe);
         el.classList.add('video__bg');
         el.querySelector('.video-feedback__btn').remove();     
	});
});



//=============popup=====================

const closeBtn = document.querySelectorAll('.popup__form_close');
const popups = document.querySelectorAll('.popup-link');

if (popups.length > 0) {
   popups.forEach(function(popup) {
      popup.addEventListener('click', function(e){
         const popupAttr = popup.dataset.name;
         const curentPopup = document.querySelector('.popup-' + popupAttr);
         popupOpen(curentPopup);
         e.preventDefault();
      });
   });
}

function popupOpen(curentPopup) {  
   if (curentPopup) {
		const popupActive = document.querySelector('.popup._active');
		if (popupActive) {
         popupClose(popupActive);
      }
      curentPopup.classList.add('_active');
      curentPopup.addEventListener("click", function (e) {
         if (!e.target.closest('.popup__content')) {
            popupClose(e.target.closest('.popup'));
         }
      });
	} 
};

closeBtn.forEach(function(el) {
   el.addEventListener('click', function(e){
      popupClose(e.target.closest('.popup'));
   });
});

function popupClose(popupActive) {
   popupActive.classList.remove('_active');
};

//=========enter registr===========
const enter = document.querySelector('.enter-header__enter');

enter.addEventListener('click', function () {
   let regUser = document.querySelector('.registr-header');
   let enterUser = document.querySelector('.enter-header');
   let heroBtn = document.querySelector('.hero__btn2');

   regUser.style.display = 'flex';
   enterUser.style.display = 'none';
   heroBtn.style.display = 'inline-block';
})


//============Validate==========

let inputTel = document.querySelector('input[name="phone"]');
let im = new Inputmask('+7 (999) 999-99-99');
im.mask(inputTel);

let validateForms = function(selector, rules, successModal, yaGoal) {
	new window.JustValidate(selector, {
      rules: {
         name: {
            required: true,
            minLength: 3
         },
         email: {
           required: true,
           email: true
         }
      },   
		submitHandler: function(form) {
         
         let regUser = document.querySelector('.registr-header');
         let enterUser = document.querySelector('.enter-header');
         let heroBtn = document.querySelector('.hero__btn2');

         regUser.style.display = 'none';
         enterUser.style.display = 'flex';
         heroBtn.style.display = 'none';

         form.reset(); 
         popupClose(form.closest('.popup'));     
      }
      
   });
   
}

validateForms('.popup__form', { name: {required: true, minLength: 3}, email: {required: true, email: true} }, '.thanks-popup', 'send goal');
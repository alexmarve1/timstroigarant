document.addEventListener('DOMContentLoaded', () =>{
  // header start

  $('.hamburger').on('click', function(){

    if($(this).hasClass('is-active')) {
      $(this).removeClass('is-active');
      $('.header__mobile__wrap').slideUp(500);
    }
    else {$(this).addClass('is-active');
    $('.header__mobile__wrap').slideDown(500);
  }





  })



});
const swiper = new Swiper('.banner-swiper', {
  // Optional parameters
  loop: true,
  centeredSlides: true,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
      dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },


  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

$(document).ready(function(){
    $('.slider').slick({
      
      centralMode: true,
      dots:false,
      arrows:false,
      adaptiveHeight:true,
      slidesToShow:3,
      slidesToScroll:1,
      dots: true,
      arrows:true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });

    $('a[href^="#"]').click(function(){
      let target = $(this).attr('href');
      $('html, body').animate({
        scrollTop: $(target).offset().top
      },500);
    })
})

document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);


  async function formSend(event) {
    event.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0){
      form.classList.add('_sending');
      let response = await fetch('sendmail.php', {
        method: 'post',
        body: formData
      });
      if(response.ok) {
          let result = await response.json();
          alert(result.message);
          formPreview.innerHTML = '';
          form.reset();
          form.classList.remove('_sending');
      }else{
        alert('Ошибка');
        form.classList.remove('_sending');
      }
    }
    else {
      alert('Заполните обязательные поля');
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for(let index = 0; index < formReq.length; index++) {
      const input = formReq[index]; 
      formRemoveError(input);

        if (input.classList.contains('_email')) {
          if (emailTest(input)) {
              formAddError(input);
              error++;
        }        
      } else if(input.getAttribute("type") === "checkbox" && input.checked === false) {
        formAddError(input);
        error++;
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }


  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
});




$(document).ready(function() {
    setTimeout(function() {
      $('#container').addClass('loaded');
      // Once the container has finished, the scroll appears
      if ($('#container').hasClass('loaded')) {
        // It is so that once the container is gone, the entire preloader section is deleted
        $('#preloader').delay(9000).queue(function() {
          $(this).remove();
        });}
    }, 3000);});
  

var tl = gsap.timeline({ repeat: -1 });
tl.to("h1", 30, { backgroundPosition: "-960px 0" });


const element = document.querySelector('.my-element');
element.classList.add('animate__animated', 'animate__bounceOutLeft');

element.addEventListener('animationend', () => {
  // do something
});





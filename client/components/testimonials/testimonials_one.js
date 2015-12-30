$(document).ready( function(){
  'use strict';

  $('.testimonials .owl-carousel').owlCarousel({
    items: 1,
    nav: true,
    autoHeight: true,
    navText: [
      '<i class=\'fa fa-angle-left\'></i>',
      '<i class=\'fa fa-angle-right\'></i>'
    ],
    loop: true,
    dots: true
  });
});
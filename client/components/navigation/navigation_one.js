$(document).ready( function(){
  'use strict';

  (function() {

    var docElem = document.documentElement,
      header = document.querySelector( '.navbar-fixed-top' ),
      didScroll = false,
      changeHeaderOn = 300;

    function init() {
      window.addEventListener( 'scroll', function( event ) {
        if( !didScroll ) {
          didScroll = true;
          setTimeout( scrollPage, 250 );
        }
      }, false );
    }

    function scrollPage() {
      var sy = scrollY();
      if ( sy >= changeHeaderOn ) {
        classie.remove( header, 'navbar-expanded' );
      }
      else {
        classie.add( header, 'navbar-expanded' );
      }
      didScroll = false;
    }

    function scrollY() {
      return window.pageYOffset || docElem.scrollTop;
    }

    init();

  })();
});
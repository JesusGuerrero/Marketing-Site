window.initGoogleMap = function(){
  'use strict';
  try{
    var $latitude = 36.850596,
    //Please visit http://www.latlong.net/convert-address-to-lat-long.html you can easily generate.
      $longitude = -121.396988,
      $mapZoom = 16; /* ZOOM SETTING */

    //google map custom marker icon - .png fallback for IE11
    var isInternetExplorer11 = navigator.userAgent.toLowerCase().indexOf('trident') > -1;
    var $markerUrl = (isInternetExplorer11) ? '/assets/img/icon-map-marker.png' : '/assets/img/icon-map-marker.svg';

    //set google map options
    var mapOptions = {
      center: new google.maps.LatLng($latitude, $longitude),
      zoom: $mapZoom,
      panControl: true,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false
    };
    //inizialize the map
    var map = new google.maps.Map(document.getElementById( 'map' ), mapOptions);
    //add a custom marker to the map
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng($latitude, $longitude),
      map: map,
      visible: true,
      icon: $markerUrl
    });
  }catch(e){}
};

$(document).ready( function(){
  'use strict';
  if( $('#map').length ) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' + 'libraries=places&'+'callback=initGoogleMap';
    document.body.appendChild(script);
  }
});
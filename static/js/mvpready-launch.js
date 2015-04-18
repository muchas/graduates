/* ========================================================
*
* MVP Ready - Lightweight & Responsive Admin Template
*
* ========================================================
*
* File: mvpready-launch.js
* Theme Version: 2.0.0
* Bootstrap Version: 3.3.2
* Author: Jumpstart Themes
* Website: http://mvpready.com
*
* ======================================================== */

var mvpready_launch = function () {

  "use strict"

  var initVegasBg = function () {
    $.vegas ({
      src:'./img/bg/bg.jpg'
      , fade: 1000
    })

    $.vegas ('overlay', {
      src:'./img/vegas/13.png'
    })
  }

  var initCountdown = function () {
    $('.countdown').downCount ({
      date: '05/03/2015 12:00:00'
    })
  }    

  return {
    init: function () {
      initVegasBg ()
      initCountdown ()
      mvpready_helpers.initTooltips ()
    }
  }

} ()

$(function () {
  mvpready_launch.init ()
})

$(window).load (function () {
  $('.mask').fadeOut ('fast', function ()  { $(this).remove () } )
})
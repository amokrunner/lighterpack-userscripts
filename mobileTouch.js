// ==UserScript==
// @name         LighterPack Mobile Touch Fix
// @namespace    https://lighterpack.com/
// @version      0.12
// @description  Upgrades for lighterpack!
// @author       amokrunner
// @match        https://lighterpack.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if (window.location.pathname.split(/[/r ]+/).pop().length) { return; }
    if ($('body').hasClass('modTouch')) { return; }
    $('body').addClass('modTouch');
    $.getScript('https://cdn.rawgit.com/furf/jquery-ui-touch-punch/master/jquery.ui.touch-punch.min.js');
/*     $('#listContainer').after('<section id="modeContainer"><h2>Mode:&nbsp<a id="modeEdit" class="lpHref">Edit</a>&nbsp|&nbsp<a id="modeDrag" class="lpHref">Drag</a></section>');
    $('#modeDrag').click(function(){
        $('.lpCategories').toggleClass('ui-sortable');
        $('.lpItems').toggleClass('ui-sortable');
        
    }); */
    $('head').append(`
      <style>
  @media only screen and (max-device-width : 1024px) {
  
      .lpItemsHeader {
        min-height: 4em;
      } 
        .lpHandleCell { 
        width: 4em;
        min-height:4em;
        position: absolute;
        right:0;
        }
       .lpItem .lpHandle, .lpItemsHeader .lpHandle { 
        width: 100%;
        min-height: 3.5em;
        margin-top: 0.25em;
        }
        .lpItem, .lpItemsHeader {
            min-height: 4em;
            padding-right: 4em;
        }
        .lpItems .lpHandle {
        visibility: visible;
        }
}
      </style>
    `);
})();

// ==UserScript==
// @name         LighterPack Image Height Fix
// @namespace    https://lighterpack.com/
// @version      1.1
// @description  Upgrades for lighterpack!
// @author       amokrunner
// @match        https://lighterpack.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if ($('body').hasClass('modImageHeight')) { return; }
    $('body').addClass('modImageHeight');

    $('head').append(`
      <style>
        .lpImageCell{ text-align: center !important; }
        .lpItemImage { 
            object-fit: cover; 
            min-width:48px; 
            max-height:48px; 
        }
      </style>
    `);
    
    setInterval(function(){ 
        $('.lpItemImage').each(function(){
            var url = $(this).attr('src');
            if (url.indexOf('https://i.imgur.com/') >=0 ) {
                $(this).attr('src',url.replace('s.jpg','t.jpg'));
            }
        });
    },2000);
})();
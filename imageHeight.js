// ==UserScript==
// @name         LighterPack Image Height Fix
// @namespace    https://lighterpack.com/
// @version      1.11
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
        $(".lpItemImage[src*='imgur'][src*='s.jpg']").each(function(){
            $(this).attr('src',$(this).attr('src').replace('s.jpg','t.jpg'));
        });
    },1000);
})();
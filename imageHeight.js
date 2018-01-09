// ==UserScript==
// @name         LighterPack Image Height Fix
// @namespace    https://lighterpack.com/
// @version      1.02
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
width:4em; 
height:4em; 
}


        @media only screen and (max-width: 720px) {
            .lpShowImages .lpItem.lpItemHasImage {
                min-height: 4em !important;
                padding-left: 60px !important;
            }
            .lpShowImages .lpItem.lpItemHasImage .lpImageCell {
                height: 4em !important;
                width: 4em !important;
            }
        }
      </style>
    `);
})();
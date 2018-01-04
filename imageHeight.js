// ==UserScript==
// @name         LighterPack Image Height Fix
// @namespace    https://lighterpack.com/
// @version      1.0
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
        .lpItemImage { max-height: 4em !important; }
      </style>
    `);
})();
// ==UserScript==
// @name         LighterPack Mobile Touch Fix
// @namespace    https://lighterpack.com/
// @version      0.1
// @description  Upgrades for lighterpack!
// @author       amokrunner
// @match        https://lighterpack.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if ($('body').hasClass('modTouch')) { return; }
    $('body').addClass('modTouch');
    $.getScript('https://cdn.rawgit.com/furf/jquery-ui-touch-punch/master/jquery.ui.touch-punch.min.js');
    
    $('head').append(`
      <style>
        .lpHandleCell { 
        width: 80px;
        position: absolute;
        }
        .lpHandle { 
        width: 100%;
        }
      </style>
    `);
})();
// ==UserScript==
// @name         LighterPack Mods
// @namespace    https://lighterpack.com/
// @version      1.02
// @description  Upgrades for lighterpack!
// @author       amokrunner
// @match        https://lighterpack.com/*
// @grant        none
// ==/UserScript==

(function(){
    if ($('body').hasClass('modAll')) { return; }
    $('body').addClass('modAll');
    
    $.getScript('https://rawgit.com/amokrunner/lighterpack-userscripts/master/activeFilter.js');
    $.getScript('https://rawgit.com/amokrunner/lighterpack-userscripts/master/checkList.js');
    $.getScript('https://rawgit.com/amokrunner/lighterpack-userscripts/master/imageHeight.js');

})();
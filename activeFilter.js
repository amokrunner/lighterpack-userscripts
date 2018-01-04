// ==UserScript==
// @name         LighterPack Active Filter
// @namespace    https://lighterpack.com/
// @version      1.0
// @description  Upgrades for lighterpack!
// @author       amokrunner
// @match        https://lighterpack.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if ($('body').hasClass('modActiveFilter')) { return; }
    $('body').addClass('modActiveFilter');

    $('#librarySearch').before('<div><input type="checkbox" id="librarySearchFilter" name="librarySearchFilter" /><label for="librarySearchFilter">Include Active Items</label></div>');
    $('#library').addClass('lpHideActive');
    $("#librarySearchFilter").change(function(){
        if($(this).prop('checked')){
             $("#library").removeClass('lpHideActive');
        } else {
             $("#library").addClass('lpHideActive');
        }
    });
    $('head').append(`
      <style>
        .lpHideActive .lpLibraryItem:not(.lpItemNotInList){ display:none !important;}
      </style>
    `);
})();
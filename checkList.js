// ==UserScript==
// @name         LighterPack Checklist
// @namespace    https://lighterpack.com/
// @version      0.2
// @description  Upgrades for lighterpack!
// @author       amokrunner
// @match        https://lighterpack.com/r/*
// @grant        none
// ==/UserScript==

var lpCheckLists = {
    currentId: window.location.pathname.split(/[/ ]+/).pop(),
    data: {},
};

$.getScript('https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js');

(function() {
    'use strict';

    setTimeout(function(){
    // add checkboxes
    $('.lpItem').each(function(){
        $(this).prepend('<input type="checkbox"/>');
    });

    $('.lpItem input[type="checkbox"]').change(function(){
        lpCheckLists.data[lpCheckLists.currentId][$(this).parent().prop('id')] = $(this).prop('checked');
        Cookies.set('lpCheckLists.' + lpCheckLists.currentId,JSON.stringify(lpCheckLists.data[lpCheckLists.currentId]), { expires: 10 });
        if($(this).prop('checked')) {
            $(this).parent().addClass('lpItemChecked');
        } else {
            $(this).parent().removeClass('lpItemChecked');
        }
    });

    $('.lpItem').click(function(){
        if ($(this).find('input[type="checkbox"]').prop('checked')) {
            $(this).find('input[type="checkbox"]').prop('checked',false);
        } else {
            $(this).find('input[type="checkbox"]').prop('checked',true);
        }
        $(this).find('input[type="checkbox"]').change();
    });


    // load data:
    var cookie = Cookies.get('lpCheckLists.' + lpCheckLists.currentId);
    if (cookie!==undefined) {
        lpCheckLists.data[lpCheckLists.currentId] = JSON.parse(cookie);
        console.log(lpCheckLists.data);
    } else {
        lpCheckLists.data = {};
    }
    if (lpCheckLists.data[lpCheckLists.currentId]===undefined) {
        lpCheckLists.data[lpCheckLists.currentId] = {};
    } else {
        Object.keys(lpCheckLists.data[lpCheckLists.currentId]).forEach(function(key) {
            $('.lpItem[id="'+key+'"] input[type="checkbox"]').prop('checked',true);
            $('.lpItem[id="'+key+'"]').addClass('lpItemChecked');
        });
    }


    },250);

    $('head').append(`
      <style>
        .lpItemChecked{ color:gray !important; }
      </style>
    `);

})();
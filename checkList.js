// ==UserScript==
// @name         LighterPack Checklist
// @namespace    https://lighterpack.com/
// @version      0.1
// @description  Upgrades for lighterpack!
// @author       amokrunner
// @match        https://lighterpack.com/r/*
// @grant        none
// ==/UserScript==

var lpCheckLists = {
    currentId: window.location.pathname.split(/[/ ]+/).pop(),
    data: {},
}
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
        Cookies.set('lpCheckLists.data',JSON.stringify(lpCheckLists.data), { expires: 10 });
    });
    
    // load data:
    var cookie = Cookies.get('lpCheckLists.data');
    if (cookie!==undefined) {
        lpCheckLists.data = JSON.parse(cookie);
        console.log(lpCheckLists.data);
    } else {
        lpCheckLists.data = {};
    }
    if (lpCheckLists.data[lpCheckLists.currentId]===undefined) {
        lpCheckLists.data[lpCheckLists.currentId] = {};
    } else {
        Object.keys(lpCheckLists.data[lpCheckLists.currentId]).forEach(function(key) {
            $('.lpItem[id="'+key+'"] input[type="checkbox"]').prop('checked',true);
        });
    }
   
    
    },250);
    
    
})();
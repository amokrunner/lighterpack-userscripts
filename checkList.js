// ==UserScript==
// @name         LighterPack Checklist
// @namespace    https://lighterpack.com/
// @version      0.6
// @description  Upgrades for lighterpack!
// @author       amokrunner
// @match        https://lighterpack.com/*
// @grant        none
// ==/UserScript==

var lpCheckLists;

(function() {
    'use strict';
    if ($('body').hasClass('modCheckList')) { return; }
    $('body').addClass('modCheckList');
    
    lpCheckLists = {
        currentId: window.location.pathname.split(/[/r ]+/).pop(),
        data: {},
    };
    
    if (!lpCheckLists.currentId.length) {
        // must be homepage:
        $('#share').children().first().html($('#share').children().first().html().replace('Share','Actions'));
        $('#csvUrl').after('<a id="checkListUrl" class="lpHref" href="'+$('#shareUrl').val()+'#checklist">CheckList</a>');
        $('#share').mouseover(function(){
            setTimeout(function(){
                $('#checkListUrl').attr('href',$('#shareUrl').val()+'#checklist');
            },200);
        });
    } else {
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

        $.getScript(
            'https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js',
            function(){
                // load data:
                var cookie = Cookies.get('lpCheckLists.' + lpCheckLists.currentId);
                if (cookie!==undefined) {
                    lpCheckLists.data[lpCheckLists.currentId] = JSON.parse(cookie);
                } else {
                    lpCheckLists.data = {};
                }
                if (lpCheckLists.data[lpCheckLists.currentId]===undefined) {
                    lpCheckLists.data[lpCheckLists.currentId] = {};
                } else {
                    Object.keys(lpCheckLists.data[lpCheckLists.currentId]).forEach(function(key) {
                        if(lpCheckLists.data[lpCheckLists.currentId][key]){
                            $('.lpItem[id="'+key+'"] input[type="checkbox"]').prop('checked',true);
                            $('.lpItem[id="'+key+'"]').addClass('lpItemChecked');
                        }
                    });
                }
            }
        );
    }
    if (lpCheckLists.currentId.length) {
        $('head').append(`
          <style>
            .lpItemChecked {
                color:gray;
                font-style: italic;
            }
            .lpItemChecked .lpItemImage {
                filter: grayscale(100%);
                opacity: 0.5;
            }
            #csvUrl {
                display: block;
                margin-top: 15px;
            }
          </style>
        `);
    }

})();
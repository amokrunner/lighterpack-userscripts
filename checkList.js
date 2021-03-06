// ==UserScript==
// @name         LighterPack Checklist
// @namespace    https://lighterpack.com/
// @version      0.80
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
        $('#csvUrl').after('<a id="checkListUrl" class="lpHref" href="'+$('#shareUrl').val()+'#checklist"><b>&#10003</b>CheckList</a>');
        $('#share').mouseover(function(){
            setTimeout(function(){
                $('#checkListUrl').attr('href',$('#shareUrl').val()+'#checklist');
            },200);
        });
    } else {
        if(window.location.hash == '#checklist'){
            $('.lpCategories').before('<div id="checkListInstructions">Checklist Enabled.&nbsp;<a id="checkListAll" class="lpHref">Select all.</a>&nbsp;<a id="checkListNone" class="lpHref">Select none.</a>&nbsp;<a id="checkListExit" class="lpHref">Exit.</a></div>');
            function checkListCheckAll(){
                $('.lpItem').each(function(){
                    lpCheckLists.data[lpCheckLists.currentId][$(this).prop('id')] = $(this).hasClass('lpItemChecked');
                });
                Cookies.set('lpCheckLists.' + lpCheckLists.currentId,JSON.stringify(lpCheckLists.data[lpCheckLists.currentId]), { expires: 10 });
            }
            $('#checkListAll').click(function(){
                $('.lpItem').addClass('lpItemChecked');
                checkListCheckAll();
            });
            $('#checkListNone').click(function(){
                $('.lpItem').removeClass('lpItemChecked');
                checkListCheckAll();
            });
            $('#checkListExit').click(function(){
                window.location.href = 'https://lighterpack.com/r/'+lpCheckLists.currentId;
            });
        
            $('.lpItem').click(function(){
                $(this).toggleClass('lpItemChecked');
                lpCheckLists.data[lpCheckLists.currentId][$(this).prop('id')] = $(this).hasClass('lpItemChecked');
                Cookies.set('lpCheckLists.' + lpCheckLists.currentId,JSON.stringify(lpCheckLists.data[lpCheckLists.currentId]), { expires: 10 });
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
                                $('.lpItem[id="'+key+'"]').addClass('lpItemChecked');
                            }
                        });
                    }
                }
            );
        } else {
            $('.lpCategories').before('<div id="checkListInstructions">Checklist disabled.&nbsp;<a id="checkListEnable" class="lpHref">Enable.</a></div>');
            $('#checkListEnable').click(function(){
                window.location.href = 'https://lighterpack.com/r/'+lpCheckLists.currentId+'#checklist';
                location.reload();
            });
        }
    }
    if (lpCheckLists.currentId.length) {
        $('head').append(`
          <style>
            .lpItemChecked {
                color:gray;
                font-style: italic;
                text-decoration: line-through;
            }
            .lpItemChecked:before {
                content: "\\2713  ";
                white-space: pre;
                text-decoration: none;
            }
            .lpItemChecked .lpItemImage {
                filter: grayscale(100%);
                opacity: 0.5;
            }
            #csvUrl {
                display: block;
                margin-top: 15px;
            }
            #checkListInstructions {
                font-weight: bold;
                padding: 1em;
            }
            #checkListUrl {
                padding-top: 1em;
            }
          </style>
        `);
    }

})();
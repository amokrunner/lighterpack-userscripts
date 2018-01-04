(function(){
    if ($('body').hasClass('modAll')) { return; }
    $('body').addClass('modAll');
    
    $.getScript('https://rawgit.com/amokrunner/lighterpack-userscripts/master/activeFilter.js');
    $.getScript('https://rawgit.com/amokrunner/lighterpack-userscripts/master/checkList.js');
    $.getScript('https://rawgit.com/amokrunner/lighterpack-userscripts/master/imageHeight.js');

})();
function createBSZ() {
    var postBody = document.getElementById('postBody');
    if (postBody){
        postBody.insertAdjacentHTML('afterend','<div id="busuanzi_container_page_pv" style="display:none;float:left;margin-top:8px;font-size:small;">本文浏览量<span id="busuanzi_value_page_pv"></span>次</div>');
    }
    var runday = document.getElementById('runday');
    if (runday) {
        runday.insertAdjacentHTML('afterend', '<div id="busuanzi_container_site_pv" style="display:none;">总浏览量<span id="busuanzi_value_site_pv"></span>次 • </div>');
    }
}

function loadBSZScript() {
    var element = document.createElement('script');
    element.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
    document.head.appendChild(element);
}

document.addEventListener("DOMContentLoaded", function() {
    createBSZ();
    const activate = function(){
        if (typeof requestIdleCallback === 'function') {
            requestIdleCallback(loadBSZScript, { timeout: 2000 });
        } else {
            setTimeout(loadBSZScript, 800);
        }
    };

    if ('IntersectionObserver' in window) {
        var trigger = document.getElementById('postBody') || document.body;
        var io = new IntersectionObserver(function(entries) {
            if (entries.some(function(entry){return entry.isIntersecting;})) {
                io.disconnect();
                activate();
            }
        }, { rootMargin: '300px' });
        io.observe(trigger);
    } else {
        activate();
    }
});

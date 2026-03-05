function createVercount() {
    var postBody = document.getElementById('postBody');
    if (postBody){
        postBody.insertAdjacentHTML('afterend','<div id="busuanzi_container_page_pv" style="display:none;float:left;margin-top:8px;font-size:small;">本文浏览量<span id="busuanzi_value_page_pv"></span>次</div>');
    }
    var runday = document.getElementById('runday');
    if (runday) {
        runday.insertAdjacentHTML('afterend', '<span id="busuanzi_container_site_pv" style="display:none">总浏览量<span id="busuanzi_value_site_pv"></span>次 • </span>');
    }
}

function loadVercountScript() {
    var element = document.createElement('script');
    element.src = 'https://vercount.one/js';
    document.head.appendChild(element);
}

document.addEventListener("DOMContentLoaded", function() {
    createVercount();
    const activate = function(){
        if (typeof requestIdleCallback === 'function') {
            requestIdleCallback(loadVercountScript, { timeout: 2000 });
        } else {
            setTimeout(loadVercountScript, 800);
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

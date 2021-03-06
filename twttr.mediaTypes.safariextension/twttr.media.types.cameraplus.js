/*

 The MIT License

 Copyright (c) 2010-2011 Norio Nomura

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 */

(function () {
    if (typeof twttr.mediaType !== 'undefined' &&
        typeof twttr.media.types.cameraplus === 'undefined') {
        twttr.mediaType('cameraplus', {
            icon : 'photo', favicon : 'http://taptaptap.com/img/icons/cameraplus.png',
            flaggable : true, domain : 'http://campl.us/', matchers : {
                tinyUrl : /^#{optional_protocol}?campl\.us\/(.+)$/i
            },
            process : function (finished) {
                this.data.path = this.slug;
                finished();
            },
            render : function (dom) {
                this.request(this.data.path);
                var t = '<a id="{path}" class="cameraplus" href="http://campl.us/{path}" target="_blank"></a>';
                $(dom).append(twttr.util.supplant(t, this.data));
            }
        }).methods({
                request : function (path) {
                    var evt = window.document.createEvent('CustomEvent');
                    evt.initCustomEvent('twttr.media.types.cameraplus', false, false, path);
                    window.document.dispatchEvent(evt);
                }
            });
    }
})();
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
        typeof twttr.media.types.twipple === 'undefined') {
        twttr.mediaType('twipple', {
            icon :'photo',
            flaggable : true, domain : 'http://p.twipple.jp/', matchers : {
                standardUrl : /^#{optional_protocol}?p\.twipple\.jp\/([^\/]+)\/?$/i
            },
            process : function (finished) {
                this.data.id = this.slug;
                this.data.path = this.slug.match(/./g).join('/');
                finished();
            },
            render : function(dom) {
                var t = '<div class="twipple"><a class="inline-media-image" data-inline-type="twipple" href="http://p.twipple.jp/{id}" target="_blank"><img src="http://p.twipple.jp/data/{path}.jpg"/></a></div>';
                $(dom).append(twttr.util.supplant(t, this.data));
            }
        });
    }
})();

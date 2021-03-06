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
        typeof twttr.media.types.togetter === 'undefined') {
        twttr.mediaType('togetter', {
            icon :'generic',
            flaggable : true, domain : 'http://togetter.com', matchers : {
                standardUrl : /^#{optional_protocol}?togetter\.com\/li\/(\d+)\/?/i
            },
            process : function (finished) {
                this.data.id = this.slug;
                finished();
            },
            render : function(dom) {
                var t = '<iframe width="100%" height="480px" src="http://togetter.com/iframe/{id}?bc=7FC6BC"></iframe>';
                $(dom).append(twttr.util.supplant(t, this.data));
            }
        });
    }
})();

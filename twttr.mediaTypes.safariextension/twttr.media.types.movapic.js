/*

The MIT License

Copyright (c) 2010 Norio Nomura

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
    if (typeof(twttr.mediaType) !== 'undefined'){
        if (typeof(twttr.media.types.movapic) === 'undefined') {
            twttr.mediaType('twttr.media.types.movapic', {
                icon :'photo', favicon : 'http://assets.movapic.com/image/parts/favicon.gif',
                domain : 'http://movapic.com', matchers: {
                    standardUrl: /^#{optional_protocol}?movapic\.com\/pic\/(\w+)/g
                },
                process : function (A) {
                    this.data.id = this.slug;
                    A();
                },
                render : function(B){
                    var A = '<div class="movapic"><a class="inline-media-image" data-inline-type="movapic" href="http://movapic.com/pic/{id}" target="_blank"><img src="http://image.movapic.com/pic/m_{id}.jpeg"/></a></div>';
                    $(B).append(twttr.supplant(A, this.data));
                }
            });
        }
    }
})();

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

(function(){
    if (typeof(twttr.mediaType) !== 'undefined'){
        if (typeof(twttr.media.types.mobypicture) === 'undefined'){
            twttr.mediaType('twttr.media.types.mobypicture', {
                icon : 'photo', favicon : 'http://mobypicture.s3.amazonaws.com/layout/v1/favicon.ico',
                domain : 'http://www.mobypicture.com/', matchers : {
                    standardUrl: /^#{optional_protocol}?www\.mobypicture\.com\/user\/(?:[^\/]+)\/view\/(\S+)$/g
                },
                process : function (A) {
                    var C = this;
                    C.data.href = C.url;
                    $.ajax({
                        url: 'http://api.mobypicture.com/oEmbed',
                        data: {
                            url: C.data.href,
                            format: 'json'
                        },
                        dataType: 'jsonp',
                        success: function (D) {
                            C.data.title = D.title;
                            C.data.author_name = D.author_name;
                            C.data.author_url = D.author_url;
                            C.data.provider = D.provider;
                            C.data.provider_url = D.provider_url;
                            C.data.url = D.url;
                            if (typeof(D.html) !== 'undefined') {
                                C.data.html = D.html;
                            }
                            A();
                        }
                    })
                },
                render : function (B) {
                    if (typeof(this.data.html) !== 'undefined') {
                        $(B).append(this.data.html);
                    } else {
                        var A='<a href="{href}" target="_blank" title="{title}"><img width="100%" src="{url}" alt="{title}" /></a>';
                        $(B).append(twttr.supplant(A, this.data));
                    }
                }
            });
        }
    }
})();

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

(function() {
    if (typeof twttr.mediaType !== 'undefined' &&
        typeof twttr.media.types.mobypicture === 'undefined') {
        twttr.mediaType('mobypicture', {
            icon : 'photo', favicon : 'http://mobypicture.s3.amazonaws.com/layout/v1/favicon.ico',
            flaggable : true, domain : 'http://www.mobypicture.com/', matchers : {
                standardUrl : /^#{optional_protocol}?www\.mobypicture\.com\/user\/(?:[^\/]+)\/view\/(\S+)$/i
            },
            process : function (finished) {
                var that = this;
                that.data.href = that.url;
                twttr.sandboxedAjax.send({
                    url : 'http://api.mobypicture.com/oEmbed',
                    data : {
                        url : that.data.href,
                        format : 'json'
                    },
                    dataType : 'jsonp',
                    success : function (resp) {
                        that.data.title = resp.title;
                        that.data.author_name = resp.author_name;
                        that.data.author_url = resp.author_url;
                        that.data.provider = resp.provider;
                        that.data.provider_url = resp.provider_url;
                        that.data.url = resp.url;
                        if (typeof resp.html !== 'undefined') {
                            that.data.html = resp.html;
                        }
                        finished();
                    }
                })
            },
            render : function (dom) {
                if (typeof this.data.html !== 'undefined') {
                    $(dom).append(this.data.html);
                } else {
                    var t = '<a href="{href}" target="_blank" title="{title}"><img width="100%" src="{url}" alt="{title}" /></a>';
                    $(dom).append(twttr.util.supplant(t, this.data));
                }
            }
        });
    }
})();

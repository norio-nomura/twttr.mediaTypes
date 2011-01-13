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
        if (typeof(twttr.media.types.withings) === 'undefined'){
            twttr.mediaType('twttr.media.types.withings', {
                icon : 'generic',
                domain : 'http://www.withings.com', matchers : {
                    standardUrl: /^#{optional_protocol}?www\.withings\.com\/[^\?]+\?(?:userid=(\d+)&?|publickey=([^&]+)&?|massUnit=(\w+)&?){3}$/g
                },
                process : function (A) {
                    var match = this.constructor.re.lang.exec(this.url);
                    if (match) {
                        this.data.lang = match[1];
                    }
                    match = this.constructor.re.userid.exec(this.url);
                    if (match) {
                        this.data.userid = match[1];
                    }
                    match = this.constructor.re.publickey.exec(this.url);
                    if (match) {
                        this.data.publickey = match[1];
                    }
                    match = this.constructor.re.massUnit.exec(this.url);
                    if (match) {
                        this.data.massUnit = match[1];
                    }
                    A();
                },
                render : function (B) {
                    var A = '<iframe src="http://www.withings.com/{lang}/utils/graphwidget?userid={userid}&publickey={publickey}&massUnit={massUnit}" width="260" height="400" scrolling="no" style="border:0;">';
                    console.log(this.data);
                    console.log(this.url);
                    $(B).append(twttr.util.supplant(A, this.data));
                }
            }).statics({
                re : {
                    lang : /www\.withings\.com\/(\w+)\//i,
                    userid : /userid=(\d+)/i,
                    publickey : /publickey=(\w+)/i,
                    massUnit : /massUnit=(\w+)/i
                }
            });
        }
    }
})();

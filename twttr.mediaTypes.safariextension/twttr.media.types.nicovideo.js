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
        typeof twttr.media.types.nicovideo === 'undefined') {
        twttr.mediaType('nicovideo', {
            icon : function (url) {
                if (/^(sm|nm)?\d+$/.test(this.slug)) {
                    return 'video';
                } else if (/^lv\d+$/.test(this.slug)) {
                    return 'video';
                } else if (/^im\d+$/.test(this.slug)) {
                    return 'photo';
                } else if (/^co\d+$/.test(this.slug)) {
                    return 'generic';
                } else {
                    return 'generic';
                }
            },
            flaggable : true, domain : 'http://www.nicovideo.jp', matchers : {
                tinyUrl : /^#{optional_protocol}?nico\.ms\/(?:l\/)?((?:sm|lv|nm|im|co)?\d+)(?:#.*)?$/i,
                standardUrl : /^#{optional_protocol}?(?:www|live|seiga|com)\.nicovideo\.jp\/(?:watch|seiga|community)\/((?:sm|lv|nm|im|co)?\d+)\/?(?:#.*)?$/i
            },
            process : function (finished) {
                this.data.id = this.slug;
                if (/^(sm|nm)?\d+$/.test(this.data.id)) {
                    this.data.type = 'sm';
                } else if (/^lv\d+$/.test(this.data.id)) {
                    this.data.type = 'lv';
                } else if (/^im\d+$/.test(this.data.id)) {
                    this.data.type = 'im';
                } else if (/^co\d+$/.test(this.data.id)) {
                    this.data.type = 'co';
                }
                finished();
            },
            render : function (dom) {
                if (this.data.type) {
                    $(dom).append(twttr.util.supplant(this.constructor.templates[this.data.type], this.data));
                }
            }
        }).statics({
                templates : {
                    sm : '<iframe width="312" height="176" src="http://ext.nicovideo.jp/thumb/{id}" scrolling="no" style="border:solid 1px #CCC;" frameborder="0"></iframe>',
                    lv : '<iframe width="312" height="176" src="http://live.nicovideo.jp/embed/{id}" scrolling="no" style="border:solid 1px #CCC;" frameborder="0"></iframe>',
                    im : '<iframe width="312" height="176" src="http://ext.seiga.nicovideo.jp/thumb/{id}" scrolling="no" style="border:solid 1px #888;" frameborder="0"></iframe>',
                    co : '<iframe width="312" height="176" src="http://ext.nicovideo.jp/thumb_community/{id}" scrolling="no" style="border:solid 1px #CCC;" frameborder="0"></iframe>'
                }
            });
    }
})();

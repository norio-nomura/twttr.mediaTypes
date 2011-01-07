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

if (typeof(handlers) === 'undefined') {
    var handlers = {};
}

handlers['twttr.media.types.cloudapp'] = function (id, response) {
    var regImg = /(\.png|\.jpg|\.gif|\.tiff)$/i;
    $.ajax({
        url: 'http://cl.ly/'+id,
        dataType: 'json',
        success: function (D) {
            var innerHTML;
            switch (D.item_type) {
                case 'image':
                    innerHTML = '<a href="' + D.url + '" title="' + (D.name || D.url) + '" target="_blank"><img src="' + D.content_url.replace(/^https?:/,'') + '" alt="' + (D.name || D.url) + '"/></a>';
                    break;
                case 'bookmark':
                    if (regImg.test(D.redirect_url)) {
                        innerHTML = '<a href="' + D.redirect_url + '" target="_blank"><img src="' + D.redirect_url + '" alt="' + (D.name || D.redirect_url) + '[' + D.redirect_url + ']"/></a>';
                    } else {
                        innerHTML = '<a href="' + D.redirect_url + '" title="' + D.redirect_url + '" target="_blank"><img src="' + D.icon.replace(/^https?:/,'') + '" alt="' + D.redirect_url + '"/>' + (D.name || D.redirect_url) + '</a>';
                    }
                    break;
                default:
                    innerHTML = '<a href="' + D.url + '" title="' + D.url + '" target="_blank"><img src="' + D.icon.replace(/^https?:/,'') + '" alt="' + D.url + '"/>"' + (D.name || D.url) + '</a>';
            };
            response({id: id, innerHTML: innerHTML});
        }
    });
};

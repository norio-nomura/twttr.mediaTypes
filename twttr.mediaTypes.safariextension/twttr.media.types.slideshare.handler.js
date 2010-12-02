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

handlers['twttr.media.types.slideshare'] = function (url, response) {
    var ts = (Date.now()/1000|0).toString();
    $.ajax({
	    type: 'GET',
        url: 'http://www.slideshare.net/api/2/get_slideshow',
        data: {
            api_key: '3TCRod5p',
            slideshow_url: url,
            ts: ts,
            hash: CybozuLabs.SHA1.calc('ZLDJRpda'+ts)
        },
        dataType: 'xml',
        success: function (data, textStatus, xhr) {
            var innerHTML = $('Embed', xhr.responseXML)[0].textContent;
            innerHTML = innerHTML.replace(/(width)(="|:)425/g,'$1$2321');
            innerHTML = innerHTML.replace(/(height)(="|:)355/g,'$1$2268');
            response({
                id: url,
                innerHTML: innerHTML
            });
        }
    });
};

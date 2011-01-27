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

if (typeof(handlers) === 'undefined') {
    var handlers = {};
}

handlers['twttr.media.types.posterous'] = function (id, response) {
	$.ajax({
	    type: 'POST',
	    url: 'http://posterous.com/api/getpost',
	    data: {
	        id: id
	    },
	    dataType: 'xml',
	    complete: function (xhr, textStatus) {
            var element = $(xhr.responseXML).find('body');
            if (element && element.length) {
                var innerHTML = element[0].textContent;
                innerHTML = innerHTML.replace(/(<(?:img|object|embed)[^>]*)(height\s*=\s*"[^"]+")/g,'$1');
                innerHTML = innerHTML.replace(/(<(?:img|object|embed)[^>]*)(width\s*=\s*"[^"]+")/g,'$1');
                response({id: id, innerHTML: innerHTML});
            } else {
                response({id: id, innerHTML: textStatus});
            }
	    }
	});
};

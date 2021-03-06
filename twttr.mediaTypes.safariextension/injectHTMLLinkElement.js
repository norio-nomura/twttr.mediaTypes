/*

 The MIT License

 Copyright (c) 2010-2011 Norio Nomura

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the 'Software'), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 */

if (window.top === window) {
    (function (cssFileName) {
        var cssFileNames;
        if (typeof cssFileName === 'string') {
            cssFileNames = [cssFileName];
        } else if (typeof cssFileName === 'object' && Array.isArray(cssFileName)) {
            cssFileNames = cssFileName;
        }
        if (Array.isArray(cssFileNames)) {
            if (typeof safari !== 'undefined') {
                for (var i = 0; i < cssFileNames.length; i++) {
                    var link = window.document.createElement('link');
                    link.rel = 'stylesheet';
                    link.type = 'text/css';
                    link.media = 'screen';
                    link.href = safari.extension.baseURI + cssFileNames[i];
                    window.document.head.insertBefore(link, window.document.head.firstChild);
                }
            } else if (typeof chrome !== 'undefined') {
                for (var i = 0; i < cssFileNames.length; i++) {
                    var link = window.document.createElement('link');
                    link.rel = 'stylesheet';
                    link.type = 'text/css';
                    link.media = 'screen';
                    link.href = chrome.extension.getURL(cssFileNames[i]);
                    window.document.head.insertBefore(link, window.document.head.firstChild);
                }
            }
        }
    })([
        'twttr.media.types.dribbble.css'
    ]);
}
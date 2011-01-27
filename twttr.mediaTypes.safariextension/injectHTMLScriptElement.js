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

    window.twttr = {
        mediaTypes : {
            getObjectFromGlobal : function (message) {
                var a = function (countDown) {
                    var div = window.document.getElementById(message.id);
                    if (div) {
                        div.innerHTML = message.innerHTML;
                        delete a;
                    } else if (countDown === 0) {
                        delete a;
                    } else {
                        window.setTimeout(a, 100, --countDown);
                    }
                };
                a(10);
            }
        }
    };

    if (typeof(safari) !== 'undefined') {
        window.twttr.mediaTypes.safariMessageHandlers = {
            'injectHTMLScriptElement' : function (message) {
                var script = window.document.createElement('script');
                script.src = safari.extension.baseURI + message.scriptFilename;
                window.document.head.appendChild(script);
            }
        };
        safari.self.addEventListener('message', function (eventMessage) {
            var handler = window.twttr.mediaTypes.safariMessageHandlers[eventMessage.name];
            if (handler) {
                handler.call(eventMessage, eventMessage.message);
            } else {
                window.twttr.mediaTypes.getObjectFromGlobal.call(eventMessage, eventMessage.message);
            }
        }, false);
    }

    (function (scriptFileName) {
        var handleLoad = function (evt) {
            if (evt.target.nodeName === 'SCRIPT') {
                if (/^https?:.*\/phoenix\.bundle\.js/.test(evt.target.src)) {
                    window.document.removeEventListener("load", handleLoad, true);
                    var scriptFileNames;
                    if (typeof(scriptFileName) === 'string') {
                        scriptFileNames = [scriptFileName];
                    } else if (typeof(scriptFileName) === 'object' && Array.isArray(scriptFileName)) {
                        scriptFileNames = scriptFileName;
                    }
                    if (Array.isArray(scriptFileNames)) {
                        if (typeof(safari) !== 'undefined') {
                            scriptFileNames.forEach(function (scriptFilename) {
                                safari.self.tab.dispatchMessage('injectHTMLScriptElement', scriptFilename);
                            });
                        } else if (typeof(chrome) !== 'undefined') {
                            var port = chrome.extension.connect({'name': 'injectHTMLScriptElement'});
                            port.onMessage.addListener(function (message) {
                                var script = window.document.createElement('script');
                                script.src = chrome.extension.getURL(message.scriptFilename);
                                window.document.head.appendChild(script);
                            });
                            scriptFileNames.forEach(function (scriptFilename) {
                                port.postMessage(scriptFilename);
                            });
                        }
                    }
                    delete handleLoad;
                }
            }
        };
        window.document.addEventListener("load", handleLoad, true);
    })([
        'twttr.media.types.cameraplus.js',
        'twttr.media.types.cloudapp.js',
        'twttr.media.types.dribbble.js',
        'twttr.media.types.imgly.js',
        'twttr.media.types.mobypicture.js',
        'twttr.media.types.movapic.js',
        'twttr.media.types.nicovideo.js',
        'twttr.media.types.posterous.js',
        'twttr.media.types.sexypeek.js',
        'twttr.media.types.togetter.js',
        'twttr.media.types.twitcasting.js',
        'twttr.media.types.twitlonger.js',
        'twttr.media.types.withings.js',
        'twttr.streams.Stream.highlightItem.js'
    ]);
}

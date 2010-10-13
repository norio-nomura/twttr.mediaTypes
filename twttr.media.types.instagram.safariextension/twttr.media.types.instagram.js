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

function getObjectFromGlobal(message) {
	var a = function(countDown) {
		var div = document.getElementById(message.id);
		if (div) {
			div.innerHTML = message.innerHTML;
			delete a;
		} else if (countDown == 0) {
			delete a;
		} else setTimeout(a,100,--countDown);
	};a(10);
}

var port;   // This is used by Chrome.
var sendObjectToGlobal;

if (typeof(safari) != "undefined") {
    sendObjectToGlobal = function(obj) {
            safari.self.tab.dispatchMessage("twttr.media.types.instagram", obj);
        };
    safari.self.addEventListener("message", function(eventMessage) {
            getObjectFromGlobal(eventMessage.message);
        }, false);
} else if (typeof(chrome) != "undefined") {
    var port = chrome.extension.connect({"name":"twttr.media.types.instagram"});
    port.onMessage.addListener(getObjectFromGlobal);
    sendObjectToGlobal = function(obj) {
            port.postMessage(obj);
        };
}

(function(){var script = document.createElement("script");
script.type = "text/javascript";
script.text = "{\n\
function requestInstagram(path) {\n\
	var evt = document.createEvent(\"CustomEvent\");\n\
	evt.initCustomEvent(\"twttr.media.types.instagram\",false,false,path);\n\
	document.dispatchEvent(evt);\n\
}\n\
var dispatchTimeoutEvent = function() {\n\
	var evt = document.createEvent(\"CustomEvent\");\n\
	evt.initCustomEvent(\"twttr.media.types.comGitHubNorioNomura\",false,true);\n\
	document.dispatchEvent(evt);\n\
};\n\
var instagramListener = function(evt){\n\
	if (typeof(twttr.mediaType) != \"undefined\"){\n\
		twttr.mediaType(\"twttr.media.types.instagram\").matcher(/\\b(?:http\\:\\/\\/)?instagr.am\\/(.*)$/g).icon(\"photo\").favicon(\"http://instagr.am/static/images/logoCamera.png\").url(\"http://instagr.am\").process(function(B,A){this.data.path=B;A()}).methods({html:function(A){requestInstagram(this.data.path);var B='<a id=\"{path}\" class=\"instagram\" href=\"http://instagr.am/{path}\" target=\"_blank\"></a>';A(twttr.supplant(B,this.data))}});\n\
		document.removeEventListener(\"twttr.media.types.comGitHubNorioNomura\", instagramListener, true);\n\
		delete dispatchTimeoutEvent;\n\
		delete instagramListener;\n\
	} else {setTimeout(dispatchTimeoutEvent,500);}\n\
};\n\
document.addEventListener(\"twttr.media.types.comGitHubNorioNomura\", instagramListener, true);\n\
setTimeout(dispatchTimeoutEvent,500);\n\
}";
document.head.appendChild(script);})();

function handleCustomEvent(evt) {
	sendObjectToGlobal(evt.detail);
}

document.addEventListener("twttr.media.types.instagram",handleCustomEvent,true);
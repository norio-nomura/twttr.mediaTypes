// ==UserScript==
// @name		twttr.media.types.movapic
// @namespace	http://norio-nomura.github.com/twttr.media.types.movapic/
// @description	Show preview image from movapic.com on #NewTwitter.
// @include		http://twitter.com/*
// @include		https://twitter.com/*
// @copyright	2010, Norio Nomura (http://norio-nomura.github.com/twttr.media.types.movapic/)
// @license		MIT License
// @version		1.2
// ==/UserScript==

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

(function(){var script = document.createElement("script");
script.type = "text/javascript";
script.text = "{\n\
var dispatchTimeoutEvent = function() {\n\
	var evt = document.createEvent(\"CustomEvent\");\n\
	evt.initCustomEvent(\"twttr.media.types.comGitHubNorioNomura\",false,true);\n\
	document.dispatchEvent(evt);\n\
};\n\
var movapicListener = function(evt){\n\
	if (typeof(twttr.mediaType) != \"undefined\"){\n\
		twttr.mediaType(\"twttr.media.types.movapic\").matcher(/\\b(?:http\\:\\/\\/)?movapic\\.com\\/pic\\/(\\w+)/g).icon(\"photo\").favicon(\"http://assets.movapic.com/image/parts/favicon.gif\").url(\"http://movapic.com\").process(function(B,A){B=B.replace(/\\/$/,\"\");this.data.id=B;A()}).methods({html:function(A){var B='<div class=\"movapic\"><a class=\"inline-media-image\" data-inline-type=\"movapic\" href=\"http://movapic.com/pic/{id}\" target=\"_blank\"><img src=\"http://image.movapic.com/pic/m_{id}.jpeg\"/></a></div>';A(twttr.supplant(B,this.data))}});\n\
		document.removeEventListener(\"twttr.media.types.comGitHubNorioNomura\", movapicListener, true);\n\
		delete dispatchTimeoutEvent;\n\
		delete movapicListener;\n\
	} else {setTimeout(dispatchTimeoutEvent,500);}\n\
};\n\
document.addEventListener(\"twttr.media.types.comGitHubNorioNomura\", movapicListener, true);\n\
setTimeout(dispatchTimeoutEvent,500);\n\
}";
document.head.appendChild(script);})();


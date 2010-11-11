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

if (window.top === window) {
    (function(){var script = document.createElement("script");
    script.type = "text/javascript";
    script.text = "(function(){\n\
    var dispatchTimeoutEvent = function() {\n\
        var evt = document.createEvent(\"CustomEvent\");\n\
        evt.initCustomEvent(\"twttr.media.types.comGitHubNorioNomura\", false, true);\n\
        document.dispatchEvent(evt);\n\
    };\n\
    var movapicListener = function(evt){\n\
        if (typeof(twttr.mediaType) != \"undefined\"){\n\
            if (typeof(twttr.media.types.movapic) == \"undefined\") {\n\
                twttr.mediaType(\"twttr.media.types.movapic\", {\n\
                    title: \"movapic\", icon :\"photo\", favicon : \"http://assets.movapic.com/image/parts/favicon.gif\", domain : \"http://movapic.com\", matchers:{\n\
                        standardUrl: /^#{optional_protocol}?movapic\\.com\\/pic\\/(\\w+)/g\n\
                    },\n\
                    process : function(A){\n\
                        this.data.id = this.slug;\n\
                        A()\n\
                    },\n\
                    render : function(B){\n\
                        var A = '<div class=\"movapic\"><a class=\"inline-media-image\" data-inline-type=\"movapic\" href=\"http://movapic.com/pic/{id}\" target=\"_blank\"><img src=\"http://image.movapic.com/pic/m_{id}.jpeg\"/></a></div>';\n\
                        $(B).append(twttr.supplant(A, this.data))\n\
                    }\n\
                });\n\
            }\n\
            document.removeEventListener(\"twttr.media.types.comGitHubNorioNomura\", movapicListener, true);\n\
            delete dispatchTimeoutEvent;\n\
            delete movapicListener;\n\
        } else {setTimeout(dispatchTimeoutEvent, 500);}\n\
    };\n\
    document.addEventListener(\"twttr.media.types.comGitHubNorioNomura\", movapicListener, true);\n\
    setTimeout(dispatchTimeoutEvent, 500);\n\
    })();";
    document.head.appendChild(script);})();
}
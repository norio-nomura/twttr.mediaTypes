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
    
    (function(){var script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = "(function(){\n\
    var dispatchTimeoutEvent = function() {\n\
        var evt = document.createEvent(\"CustomEvent\");\n\
        evt.initCustomEvent(\"twttr.media.types.comGitHubNorioNomura\", false, true);\n\
        document.dispatchEvent(evt);\n\
    };\n\
    var twttrstreamsStreamhighlightItemListener = function(evt){\n\
        if (typeof(twttr.app) != \"undefined\" && \n\
            typeof(twttr.app.currentPage()) != \"undefined\" && \n\
            typeof(twttr.app.currentPage().streamManager.streams.current.__proto__.__proto__.__proto__.highlightItem) != \"undefined\"){\n\
            twttr.app.currentPage().streamManager.streams.current.__proto__.__proto__.__proto__.highlightItem = function (A) {\n\
                var B = this.getCurrentlyHighlightedItem();\n\
                if (B) {\n\
                    B.removeClass(\"hovered-stream-item\")\n\
                }\n\
                this.highlightedItemId = A.attr(\"data-item-id\");\n\
                A.addClass(\"hovered-stream-item\")\n\
                var C = this.getCurrentlyFocusedItem();\n\
                if (C) {\n\
                    this.unfocusItem(C);\n\
                    var D = this.$find(\".stream-item[data-item-id=\" + this.highlightedItemId + \"]\");\n\
                    this.focusItem(D);\n\
                    twttr.app.currentPage().focusStreamItem(D);\n\
                }\n\
            };\n\
            twttr.currentUser.showAllInlineMedia = function(H){\n\
                H.success({show_all_inline_media:true});\n\
            };\n\
            document.removeEventListener(\"twttr.media.types.comGitHubNorioNomura\", twttrstreamsStreamhighlightItemListener, true);\n\
            delete dispatchTimeoutEvent;\n\
            delete twttrstreamsStreamhighlightItemListener;\n\
        } else {setTimeout(dispatchTimeoutEvent, 500);}\n\
    };\n\
    document.addEventListener(\"twttr.media.types.comGitHubNorioNomura\", twttrstreamsStreamhighlightItemListener, true);\n\
    setTimeout(dispatchTimeoutEvent, 500);\n\
    })();";
    document.head.appendChild(script);})();

}

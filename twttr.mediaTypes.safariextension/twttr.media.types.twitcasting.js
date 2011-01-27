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
    if (typeof(twttr.mediaType) !== 'undefined'){
        if (typeof(twttr.media.types.twitcasting) === 'undefined') {
            twttr.mediaType('twttr.media.types.twitcasting', {
                icon :'video',
                domain : 'http://twitcasting.tv', matchers: {
                    standardUrl: /^#{optional_protocol}?twitcasting\.tv\/([^\/]+)\/?/g
                },
                process : function (A) {
                    this.data.id = this.slug;
                    A();
                },
                render : function(B){
                    var A = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="320" height="198" id="livestreamer" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /><param name="flashVars" value="user={id}&lang=ja&mute=0&cupdate=0&offline=" /><param name="movie" value="http://twitcasting.tv/swf/livestreamer.swf" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" /><embed src="http://twitcasting.tv/swf/livestreamer.swf" quality="high" bgcolor="#ffffff" width="320" height="198" name="livestreamer" id="livestreamderembed" align="middle" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer" flashVars="user={id}&lang=ja&mute=0&cupdate=0&offline=" ></object><br/><a href="airflick://play-media?MediaLocation=http%3A%2F%2Ftwitcasting.tv%2F{id}%2Fmetastream.m3u8%2F%3Fvideo%3D1">send to AirFlick!</a>';
                    $(B).append(twttr.util.supplant(A, this.data));
                }
            });
        }
    }
})();

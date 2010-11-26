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

(function(){
    if (typeof(twttr.mediaType) !== 'undefined'){
        if (typeof(twttr.media.types.dribbble) === 'undefined'){
            twttr.mediaType('twttr.media.types.dribbble', {
                icon : 'photo', favicon : 'http://dribbble.com/favicon.ico',
                domain : 'http://dribbble.com', matchers : {
                    standardUrl: /^#{optional_protocol}?dribbble\.com\/shots\/(\d+)\S*$/g
                },
                process : function (A) {
                    var C = this;
                    $.ajax({
                        url: 'http://api.dribbble.com/shots/'+C.slug,
                        dataType: 'jsonp',
                        success: function (D) {
                            C.data.id=D.id;
                            C.data.title=D.title;
                            C.data.url=D.url;
                            C.data.image_teaser_url=D.image_teaser_url;
                            C.data.width=D.width;
                            C.data.height=D.height;
                            C.data.pixels=(D.width*D.height).toLocaleString();
                            C.data.created_at=D.created_at;
                            C.data.likes_count=D.likes_count;
                            C.data.comments_count=D.comments_count;
                            C.data.views_count=D.views_count;
                            C.data.player_url=D.player.url;
                            C.data.player_username=D.player.username;
                            C.data.player_avatar_url=D.player.avatar_url;
                            C.data.player_name=D.player.name;
                            A();
                        }
                    })
                },
                render : function (B) {
                    var A='<ol class="dribbbles"><li id="screenshot-{id}" class="group"><div class="dribbble"><div class="dribbble-shot"><div class="dribbble-img"><a href="{url}" class="dribbble-link" target="_blank"><img alt="{teaser_base_name}" src="{image_teaser_url}" /></a><a href="{url}" class="dribbble-over" target="_blank" ><strong>{title}</strong><span class="dim">{width} &#215; {height} ({pixels} pixels)</span><em>{created_at}</em></a></div><ul class="tools group"><li class="fav"><a href="{url}/fans" title="See fans of this screenshot" target="_blank">{likes_count}</a></li><li class="cmnt"><a href="{url}#comments" title="View comments on this screenshot" target="_blank">{comments_count}</a></li><li class="views">\n{views_count}\n</li></ul></div></div><h2><a href="{player_url}" class="url" rel="contact" target="_blank"><img alt="{player_username}" class="photo fn" src="{player_avatar_url}" />{player_name}</a></h2></li></ol>';
                    $(B).append(twttr.supplant(A, this.data));
                }
            });
        }
    }
})();

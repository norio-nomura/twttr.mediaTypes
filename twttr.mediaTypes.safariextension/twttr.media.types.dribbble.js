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

(function() {
    if (typeof twttr.mediaType !== 'undefined' &&
        typeof twttr.media.types.dribbble === 'undefined') {
        twttr.mediaType('dribbble', {
            icon : 'photo',
            flaggable : true, domain : 'http://dribbble.com', matchers : {
                standardUrl : /^#{optional_protocol}?dribbble\.com\/shots\/(\d+)\S*$/i
            },
            process : function (finished) {
                var that = this;
                twttr.sandboxedAjax.send({
                    url : 'http://api.dribbble.com/shots/' + that.slug,
                    dataType : 'jsonp',
                    success : function (resp) {
                        that.data.id = resp.id;
                        that.data.title = resp.title;
                        that.data.url = resp.url;
                        that.data.image_teaser_url = resp.image_teaser_url;
                        that.data.width = resp.width;
                        that.data.height = resp.height;
                        that.data.pixels = (resp.width * resp.height).toLocaleString();
                        that.data.created_at = resp.created_at;
                        that.data.likes_count = resp.likes_count;
                        that.data.comments_count = resp.comments_count;
                        that.data.views_count = resp.views_count;
                        that.data.player_url = resp.player.url;
                        that.data.player_username = resp.player.username;
                        that.data.player_avatar_url = resp.player.avatar_url;
                        that.data.player_name = resp.player.name;
                        finished();
                    }
                })
            },
            render : function (dom) {
                var t = '<ol class="dribbbles"><li id="screenshot-{id}" class="group"><div class="dribbble"><div class="dribbble-shot"><div class="dribbble-img"><a href="{url}" class="dribbble-link" target="_blank"><img alt="{teaser_base_name}" src="{image_teaser_url}" /></a><a href="{url}" class="dribbble-over" target="_blank" ><strong>{title}</strong><span class="dim">{width} &#215; {height} ({pixels} pixels)</span><em>{created_at}</em></a></div><ul class="tools group"><li class="fav"><a href="{url}/fans" title="See fans of this screenshot" target="_blank">{likes_count}</a></li><li class="cmnt"><a href="{url}#comments" title="View comments on this screenshot" target="_blank">{comments_count}</a></li><li class="views">\n{views_count}\n</li></ul></div></div><h2><a href="{player_url}" class="url" rel="contact" target="_blank"><img alt="{player_username}" class="photo fn" src="{player_avatar_url}" />{player_name}</a></h2></li></ol>';
                $(dom).append(twttr.util.supplant(t, this.data));
            }
        });
    }
})();

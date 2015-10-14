(function($) {
    //图片滚动 调用方法 imgscroll({speed: 30,amount: 1,dir: "up"});
    $.fn.imgscroll = function(o) {
        var defaults = {
            speed: 40,
            amount: 0,
            width: 1,
            dir: "left"
        };
        o = $.extend(defaults, o);

        return this.each(function() {
            var _li = $("li", this);
            _li.parent().parent().css({overflow: "hidden", position: "relative"}); //div
            _li.parent().css({margin: "0", padding: "0", overflow: "hidden", position: "relative", "list-style": "none"}); //ul
            _li.css({position: "relative", overflow: "hidden"}); //li
            if (o.dir == "left")
                _li.css({float: "left"});

            //初始大小
            var _li_size = 0;
            for (var i = 0; i < _li.size(); i++)
                _li_size += o.dir == "left" ? _li.eq(i).outerWidth(true) : _li.eq(i).outerHeight(true);

            //循环所需要的元素
            if (o.dir == "left")
                _li.parent().css({width: (_li_size * 3) + "px"});
            _li.parent().empty().append(_li.clone()).append(_li.clone()).append(_li.clone());
            _li = $("li", this);

            //滚动
            var _li_scroll = 0;
            function goto() {
                _li_scroll += o.width;
                if (_li_scroll > _li_size)
                {
                    _li_scroll = 0;
                    _li.parent().css(o.dir == "left" ? {left: -_li_scroll} : {top: -_li_scroll});
                    _li_scroll += o.width;
                }
                _li.parent().animate(o.dir == "left" ? {left: -_li_scroll} : {top: -_li_scroll}, o.amount);
            }

            //开始
            var move = setInterval(function() {
                goto();
            }, o.speed);
            _li.parent().hover(function() {
                clearInterval(move);
            }, function() {
                clearInterval(move);
                move = setInterval(function() {
                    goto();
                }, o.speed);
            });
        });
    };
})(jQuery);

/**
 * 自动设置图片大小
 * by kamon 20140310
 * @example $('#news-list img').imageAutoSize(207, 72);
 */
(function() {
    $.fn.imageAutoSize = function(w, h, t) {
        var _obj = $(this);
        var _set = function(o, w, h, t) {
            var _w = o.width();
            var _h = o.height();
            var _funcs = {
                reWidth: function() {
                    if (_w > w) {
                        h = w / _w * _h;
                        o.css({'width': w + 'px', 'height': h + 'px'});
                    }
                },
                reHeight: function() {
                    if (_h > h) {
                        w = h / _h * _w;
                        o.css({'width': w + 'px', 'height': h + 'px'});
                    }
                }
            };
            switch (t) {
                case 'w':
                    _funcs.reWidth();
                    break;
                case 'h':
                    _funcs.reHeight();
                    break;
                default:
                    _funcs.reWidth();
                    _funcs.reHeight();
                    break;
            }
        };
        if (_obj.is('img')) {
            _obj.length ? $.browser.msie ? _set(_obj, w, h, t) : _obj.load(function() {
                _set(_obj, w, h, t);
            }) : null;
        }
    };
})(jQuery);

$(function() {

});

//设为首页
function SetHome(obj, url) {
    try {
        obj.style.behavior = 'url(#default#homepage)';
        obj.setHomePage(url);
    } catch (e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
            }
        } else {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【" + url + "】设置为首页。");
        }
    }
}

//收藏本站
function AddFavorite(title, url) {
    try {
        window.external.addFavorite(url, title);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        }
        catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}
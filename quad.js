$(document).ready(function(){
	var windowHeight = window.innerHeight;
	var windowWidth = window.innerWidth;
	$('.quad_main_btn').css('top', windowHeight/2).css('left', windowWidth/2);
	$('.quad_item_btn').css('top', windowHeight/2).css('left', windowWidth/2 + 40);

	$('.quad_item_btn').bind('click', function(){
		var left = parseInt($(this).css('left')) + 20;
		console.log(left);
	//	$(this).css('left', left + 20);
	//	$(this).css('-webkit-transition', 'all 2s ease-out');
		$(this).animate({"left" : "+=50px", "top" : "+=50px"}, 500, function(){
			$(this).animate({"left" : "-=20px", "top": "-=20px"}, 500, function() {
				$(this).animate({"left" :"+=10px", "top": "+=10px"}, 500, function() { 
					console.log('finish!');
				});
			});
		});

		$('.quad_main_btn').animate({"left" : "+=50px", "top" : "+=50px"}, 700, function(){
			$('.quad_main_btn').animate({"left" : "-=20px", "top": "-=20px"}, 700, function() {
				$('.quad_main_btn').animate({"left" :"+=10px", "top": "+=10px"}, 700, function() { 
					console.log('finish!');
				});
			});
		});
	});
});


(function(window, document, undefined) {
	var h;

	var QuadCurveMenuItem = function(
	

	window.QuadCurveMenuItem = QuadCurveMenuItem;
})(window, document)


(function(window, document, undefined) {
	var h; // helper

	var QuadCurveMenu = function(id, options, values) {
		var self = this, 
					init,
					touchesBegan,
					quadCurveMenuItemTouchesBegan,
					quadCurveMenuItemTouchesEnd,
					setMenusArray,
					_setMenu,
					setExpanding,
					_expand,
					_close,
					_blowupAnimationAtPoint,
					_shrinkAnimationAtPoint;
		this.menuContainer = document.getElementById(id);
		var menus = [];
		var attributes = {
			image:					'default_img.png',
			highlightedImage:	    'highlighted_img.png',
			contentImage:			'content_img.png',
			highlightedContentImage:'highlightedcontent_img.png',
			// 
			nearRadius:				100,
			endRadius:				110,
			farRadius:				120,
			startPoint:				{x: 100, y:100},
			timeOffset:				0.01,
			rotateAngle:			Math.PI,
			menuWholeAngle:			Math.PI,
			expanding:				false
		}; 
					


	}; 


h = {
    /*
    * Cross browser getElementsByClassName, which uses native
    * if it exists. Modified version of Dustin Diaz function:
    * http://www.dustindiaz.com/getelementsbyclass
    */
    getByClass: (function() {
        if (document.getElementsByClassName) {
            return function(searchClass,node,single) {
                if (single) {
                    return node.getElementsByClassName(searchClass)[0];
                } else {
                    return node.getElementsByClassName(searchClass);
                }
            };
        } else {
            return function(searchClass,node,single) {
                var classElements = [],
                    tag = '*';
                if (node == null) {
                    node = document;
                }
                var els = node.getElementsByTagName(tag);
                var elsLen = els.length;
                var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
                for (var i = 0, j = 0; i < elsLen; i++) {
                    if ( pattern.test(els[i].className) ) {
                        if (single) {
                            return els[i];
                        } else {
                            classElements[j] = els[i];
                            j++;
                        }
                    }
                }
                return classElements;
            };
        }
    })(),
    /* (elm, 'event' callback) Source: http://net.tutsplus.com/tutorials/javascript-ajax/javascript-from-null-cross-browser-event-binding/ */
    addEvent: (function( window, document ) {
        if ( document.addEventListener ) {
            return function( elem, type, cb ) {
                if ((elem && !(elem instanceof Array) && !elem.length && !h.isNodeList(elem) && (elem.length !== 0)) || elem === window ) {
                    elem.addEventListener(type, cb, false );
                } else if ( elem && elem[0] !== undefined ) {
                    var len = elem.length;
                    for ( var i = 0; i < len; i++ ) {
                        h.addEvent(elem[i], type, cb);
                    }
                }
            };
        }
        else if ( document.attachEvent ) {
            return function ( elem, type, cb ) {
                if ((elem && !(elem instanceof Array) && !elem.length && !h.isNodeList(elem) && (elem.length !== 0)) || elem === window ) {
                    elem.attachEvent( 'on' + type, function() { return cb.call(elem, window.event); } );
                } else if ( elem && elem[0] !== undefined ) {
                    var len = elem.length;
                    for ( var i = 0; i < len; i++ ) {
                        h.addEvent( elem[i], type, cb );
                    }
                }
            };
        }
    })(this, document),
    /* (elm, attribute) Source: http://stackoverflow.com/questions/3755227/cross-browser-javascript-getattribute-method */
    getAttribute: function(ele, attr) {
        var result = (ele.getAttribute && ele.getAttribute(attr)) || null;
        if( !result ) {
            var attrs = ele.attributes;
            var length = attrs.length;
            for(var i = 0; i < length; i++) {
                if (attr[i] !== undefined) {
                    if(attr[i].nodeName === attr) {
                        result = attr[i].nodeValue;
                    }
                }
            }
        }
        return result;
    }
};


})(window, document)
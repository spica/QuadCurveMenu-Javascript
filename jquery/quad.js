/**
 * QuadCurveMenu-Javascript ver 0.0.1 
 * Author : Myunkyu Park (spica@wafflestudio.com) 
 * Git : https://github.com/spica/QuadCurveMenu-Javascript 
 * Created at : 2012.06.21 
 * Dependency : jQuery, jQuery-css-transform, jQuery-animate-css-rotate-scale 
 */
(function(window, document, undefined) {

	// default css style for new item and menu
	var default_style = {
		position: 'absolute',
		opacity: 0,
		cursor: 'pointer',
		zindex: 999,
	  display: 'none'
	} 
	
	function quadCurveExpandAnimation(target, farPoint, nearPoint, lastPoint, duration, easing) {
		target.show();
		target.animate({"left" : farPoint['x'], "top": farPoint['y'], "opacity": 0.4, rotate: '+=180deg'}, duration * 0.4, function() { 
			target.animate({"left" : nearPoint['x'], "top": nearPoint['y'], "opacity": 0.8, rotate: '+=180deg'}, duration * 0.4 , function() {
					target.animate({"left" : lastPoint['x'], "top": lastPoint['y'], "opacity": 1}, duration * 0.2, easing)
			})  
		}); 
	}

	function quadCurveShrinkAnimation(target, endPoint, duration) {
		target.animate({left: endPoint['x'], top: endPoint['y'], rotate: '+=360deg', opacity: 0}, duration, function() {
			target.hide();	
		});
	}

	function quadCurveBlowupAnimation(target, endPoint, duration) {
		target.animate({scale: '1.4', opacity: 0}, duration, function(){
			// move target to start position 
			target.animate({scale: '1.0', left: endPoint['x'], top: endPoint['y']});
			target.hide();
		});
	}

	function calQuadCoordinateX(startX, radius, centerAngle) {
		return parseInt(startX) + radius * Math.sin(centerAngle);
	}
	function calQuadCoordinateY(startY, radius, centerAngle) {
		return parseInt(startY) - radius * Math.cos(centerAngle);
	}

	var QuadCurveMenuItem = function(options) {
		var self = this; 

		this.defaults = {
			image: 'test.png',
			startPoint: {'x' : 0, 'y': 0},
			endPoint: {'x' :0, 'y' : 0},
			nearPoint: {'x' : 0, 'y': 0},
			farPoint: {'x' : 0, 'y': 0},
			bindFunc: function(target) {console.log(target);},
		};

		this.itemContainer;

		this.menu;

		this.init = function(options) {
			this.attributes = $.extend(this.defaults, options);
			
			var item = $('<img />').css(default_style).attr('src', this.attributes.image);

			this.itemContainer = item;
			
			this.itemContainer.bind('click', function(){
				  self.blowUp(300);
					self.attributes['bindFunc'](item);
			});
		};

		this.setTargetMenu = function(target, menu) {
			target.parent().append(self.itemContainer);
			this.menu = menu;
		}

		this.setStartPnt = function(x, y) {
			this.attributes['startPoint']['x'] = x;
			this.attributes['startPoint']['y'] = y;
			this.itemContainer.css({top: y, left: x});
		};

		this.setEndPnt = function(x, y) {
			this.attributes['endPoint']['x'] = x;
			this.attributes['endPoint']['y'] = y;
		};

		this.setNearPnt = function(x, y) {
			this.attributes['nearPoint']['x'] = x;
			this.attributes['nearPoint']['y'] = y;
		};

		this.setFarPnt = function(x, y) {
			this.attributes['farPoint']['x'] = x;
			this.attributes['farPoint']['y'] = y;
		}

		this.expand = function(duration, easing) {
			quadCurveExpandAnimation(this.itemContainer, this.attributes['farPoint'], this.attributes['nearPoint'], this.attributes['endPoint'], duration, easing);
		};

		this.close = function(duration, easing) {
			quadCurveShrinkAnimation(this.itemContainer, this.attributes['startPoint'], duration);
		};

		this.blowUp = function(duration) {
			quadCurveBlowupAnimation(this.itemContainer, this.attributes['startPoint'], duration);
			this.menu._close();
		}

		this.init(options);
	};

	var QuadCurveMenu = function(options) {
		var self = this; 

		this.menuContainer;

		this.attributes;

		this.defaults = {
			image:					'default_img.png',
			highlightedImage:	    'highlighted_img.png',
			contentImage:			'content_img.png',
			highlightedContentImage:'highlightedcontent_img.png',
			timeOffset: 	    50,
			nearRadius:				80,
			endRadius:				100,
			farRadius:				120,
			startPoint:				{x: -1, y:-1},
			expandDuration:			300,
			closeDuration: 			300,
			easing:					'easeOutBack',
			rotateAngle:			180,
			menuWholeAngle:			2 * Math.PI / 3,
			expanding:				false,
			menuItemOptions: [],
			menuItems:				[]
		};

		this.init = function(options) {
			this.attributes = $.extend(this.defaults, options);
		};

		this.addQuadCurveMenu = function(target) {
			this.menuContainer = target;
	
			this.menuContainer.bind('click', function() {
				self.setClick();
			});

			if (this.attributes['startPoint']['x'] == -1 && this.attributes['startPoint']['y'] == -1)
			{
				var	startY = this.menuContainer.offset()['top'] - this.menuContainer.height() / 2;
				var startX = this.menuContainer.offset()['left'] + this.menuContainer.width() / 2;
				var startPnt = {'x' : startX, 'y': startY};
				this.attributes['startPoint'] = startPnt;
			}

			self._setMenu();
			return self;
		}

		this._setMenu = function() {
			var startPnt = this.attributes['startPoint'];
			var startX = startPnt['x'];
			var startY = startPnt['y'];
			var count = this.attributes.menuItemOptions.length;
			for (var i=0; i<count; i++) {
				var item = new QuadCurveMenuItem(this.attributes.menuItemOptions[i]);
				item.setTargetMenu(this.menuContainer, self);
				item.setStartPnt(startX, startY);
				var endX = calQuadCoordinateX(startX, this.attributes['endRadius'], i * this.attributes['menuWholeAngle'] / count);
				var endY = calQuadCoordinateY(startY, this.attributes['endRadius'], i * this.attributes['menuWholeAngle'] / count);
				item.attributes['endPoint']['y'] = endY;
				var nearX = calQuadCoordinateX(startX, this.attributes['nearRadius'], i * this.attributes['menuWholeAngle'] / count);		
				var nearY = calQuadCoordinateY(startY, this.attributes['nearRadius'], i * this.attributes['menuWholeAngle'] / count);		
				var farX = calQuadCoordinateX(startX, this.attributes['farRadius'],i * this.attributes['menuWholeAngle'] / count);		
				var farY = calQuadCoordinateY(startY, this.attributes['farRadius'],  i * this.attributes['menuWholeAngle'] / count);		
				item.setEndPnt(endX, endY);
				item.setNearPnt(nearX, nearY);
				item.setFarPnt(farX, farY);
				this.attributes.menuItems.push(item);
			}
		};

		this.isExpanding = function() {
			return this.attributes['expanding'];
		};	

		this._expand = function() {
			if (!this.isExpanding()) {
				this.menuContainer.animate({rotate: '+=' + this.attributes['rotateAngle']});
				var count = this.attributes.menuItems.length;
				for (var i=0; i<count; i++) {
					function item_expand(item, duration, easing, timeout) {
						setTimeout( function() {
							item.expand(duration, easing);
						}, timeout);
					}
					var item = this.attributes.menuItems[i];
					item_expand(item, self.attributes['expandDuration'], self.attributes['easing'], i * this.attributes['timeOffset']);
				}
				this.attributes['expanding'] = true;
			}
		};

		this._close = function() {
			if (this.isExpanding()) {
				this.menuContainer.animate({rotate: '-=' + this.attributes['rotateAngle']})
				var count = this.attributes.menuItems.length;
				for (var i=0; i<count; i++) {
					function item_shrink(item, duration, timeout) {
						setTimeout( function() {
							item.close(duration);
						}, timeout);
					}
					var item = this.attributes.menuItems[i];
					item_shrink(item, self.attributes['closeDuration'], i * this.attributes['timeOffset']);
				}
				this.attributes['expanding'] = false;
			}
		};

		this.setClick = function() {
			if (this.isExpanding()) {
				self._close();
			} else {
				self._expand();
			}
		};
				
		this.init(options);
	}; 

	window.QuadCurveMenuItem = QuadCurveMenuItem;
	window.QuadCurveMenu = QuadCurveMenu;

})(window, document)

$.fn.addQuadCurveMenu = function(opts){
	this.each(function() {
		var $this = $(this),
				data = $this.data();
		if (opts !== false && !data.quadcurve) {
			data.quadcurve = new QuadCurveMenu(opts).addQuadCurveMenu($this);
		}
	});
	return $(this);
};

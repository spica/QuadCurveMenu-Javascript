(function(window, document, undefined) {

	var default_style = {
		position: 'absolute',
		opacity: 0,
		cursor: 'pointer',
		zindex: 999
	}

	function dampedPendulemAnimation(target, farPoint, nearPoint, lastPoint, decay_time, k) {
		var pow2 = Math.pow(2, k);
		var duration = decay_time / pow2;
		//console.log(pow2);
		/*
		
		console.log(duration);
		if (duration < 50) {
			return setTimeout(function(){ target.animate({"left": lastPoint['x'], "top": lastPoint['y']});}, 50);
		}

		var offsetX, offsetY;

		if (k % 2 == 0 ) {
			// up 
			offsetX = (farPoint['x'] - target.offset()['left']);
			offsetY = (farPoint['y'] - target.offset()['top']);
			//target.animate({"left" : target.offset()['left'] + offsetX, "top" : target.offset()['top'] + offsetY}, duration); 
		} else {
			offsetX = (nearPoint['x'] - target.offset()['left']);
			offsetY = (nearPoint['y'] - target.offset()['top']);
		}
		target.animate({"left" : target.offset()['left'] + offsetX, "top" : target.offset()['top'] + offsetY}, duration, function(){
			dampedPendulemAnimation(target, farPoint, nearPoint, lastPoint, decay_time, ++k); 
		}); */ 

		target.animate({"left" : farPoint['x'], "top": farPoint['y'], "opacity": 0.4}, duration * 0.4, function() { 
			target.animate({"left" : nearPoint['x'], "top": nearPoint['y'], "opacity": 0.8}, duration * 0.4 , function() {
					target.animate({"left" : lastPoint['x'], "top": lastPoint['y'], "opacity": 1}, duration * 0.2, 'easeOutBounce')
			})  
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
			id: 'quad_curve_menu_item',
			image: 'test.png',
			startPoint: {'x' : 0, 'y': 0},
			endPoint: {'x' :0, 'y' : 0},
			menuId: '',
			nearPoint: {'x' : 0, 'y': 0},
			farPoint: {'x' : 0, 'y': 0},
			bindFunc: function(target) {console.log(target);},
			target: ''
		};

		this.itemContainer;

		this.init = function(options) {
			this.attributes = $.extend(this.defaults, options);
			
			var item = $('<img />').css(default_style).attr('src', this.attributes.image);

			this.itemContainer = item;
			
			this.itemContainer.bind('click', function(){
					self.attributes['bindFunc'](item);
			});
		};

		this.setTargetMenu = function(target) {
			target.append(self.itemContainer);
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
			this.itemContainer.show();
			dampedPendulemAnimation(this.itemContainer, this.attributes['farPoint'], this.attributes['nearPoint'], this.attributes['endPoint'], duration, 0);
		};

		this.close = function(duration, easing) {
			this.itemContainer.animate({"left" : this.attributes['startPoint']['x'] , "top" : this.attributes['startPoint']['y'], "opacity": 0}, duration, easing);
			this.itemContainer.hide(duration);
		};

		this.init(options);
	};

	var QuadCurveMenu = function(options) {
		var self = this; 

		this.menuContainer;

		this.menus = [];

		this.attributes;

		this.closeButtonContainer;

		this.defaults = {
			image:					'default_img.png',
			highlightedImage:	    'highlighted_img.png',
			contentImage:			'content_img.png',
			highlightedContentImage:'highlightedcontent_img.png',
			nearRadius:				80,
			endRadius:				100,
			farRadius:				120,
			startPoint:				{x: -1, y:0},
			expandDuration:			300,
			closeDuration: 			300,
			easing:					'easeOutBack',
			rotateAngle:			Math.PI,
			menuWholeAngle:			2 * Math.PI / 3,
			closeButtonImg:			'',
			closeButtonId:    		'quad_curve_menu_close',
			closeButtonEndPoint: 	{x: 0, y:0},
			closeButtonNearPoint: 	{x: 0, y:0},
			closeButtonFarPoint: 	{x: 0, y:0},
			expanding:				false,
			menuItemOptions: [],
			menuItems:				[]
		};

		this.init = function(options) {
			this.attributes = $.extend(this.defaults, options);
		};

		this.quadcurve = function(target) {
			this.menuContainer = target;
	
			this.menuContainer.bind('click', function() {
				self.setClick();
			});

			var closeButton;
			
			if (this.attributes['closeButtonImg'] == '')
			{
				closeButton = $('<span />').css(default_style);
				closeButton.html('x');
			} else {
				closeButton = $('<img />').css(default_style).attr('src', this.attributes['closeButtonImg']);
			}

			closeButton.bind('click', function() {
				self._close();
			});

			this.menuContainer.append(closeButton);

			this.closeButtonContainer = closeButton;

			if (this.attributes['startPoint']['x'] == -1)
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
				item.setTargetMenu(this.menuContainer);
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
			// close Button 수정. 
			this.closeButtonContainer.css('top', startY).css('left', startX);
			this.attributes['closeButtonEndPoint']['x'] = calQuadCoordinateX(startX, 1.3 *  this.attributes['endRadius'], this.attributes['menuWholeAngle'] / 2);		
			this.attributes['closeButtonEndPoint']['y'] = calQuadCoordinateY(startY, 1.3 *  this.attributes['endRadius'], this.attributes['menuWholeAngle'] / 2);		
			this.attributes['closeButtonNearPoint']['x'] = calQuadCoordinateX(startX, 1.3 *  this.attributes['nearRadius'], this.attributes['menuWholeAngle'] / 2);		
			this.attributes['closeButtonNearPoint']['y'] = calQuadCoordinateY(startY, 1.3 *  this.attributes['nearRadius'], this.attributes['menuWholeAngle'] / 2);		
			this.attributes['closeButtonFarPoint']['x'] = calQuadCoordinateX(startX, 1.3 *  this.attributes['farRadius'], this.attributes['menuWholeAngle'] / 2);		
			this.attributes['closeButtonFarPoint']['y'] = calQuadCoordinateY(startY, 1.3 *  this.attributes['farRadius'], this.attributes['menuWholeAngle'] / 2);		
		};

		this.isExpanding = function() {
			return this.attributes['expanding'];
		};	

		this._expand = function() {
			if (!this.isExpanding()) {
				var count = this.attributes.menuItems.length;
				for (var i=0; i<count; i++) {
					var item = this.attributes.menuItems[i];
					item.expand(this.attributes['expandDuration'], this.attributes['easing']);
				}
				this.closeButtonContainer.show();
				dampedPendulemAnimation(this.closeButtonContainer, this.attributes['closeButtonFarPoint'], this.attributes['closeButtonNearPoint'], this.attributes['closeButtonEndPoint'], this.attributes['closeDuration'], 0);
				this.attributes['expanding'] = true;
			}
		};

		this._close = function() {
			if (this.isExpanding()) {
				var count = this.attributes.menuItems.length;
				for (var i=0; i<count; i++) {
					var item = this.attributes.menuItems[i];
					item.close(this.attributes['closeDuration']);
				}
				this.closeButtonContainer.animate({"left" : this.attributes['startPoint']['x'] , "top" : this.attributes['startPoint']['y'], "opacity": 0}, this.attributes['closeDuration']);
				this.closeButtonContainer.hide(this.attributes['closeDuration']);
				this.attributes['expanding'] = false;
			}
		};

		this.setClick = function() {
			if (!this.isExpanding()) {
				self._expand();
			} else {
				self._close();
			}
		};
				
		this.init(options);
	}; 

	window.QuadCurveMenuItem = QuadCurveMenuItem;
	window.QuadCurveMenu = QuadCurveMenu;

})(window, document)

$.fn.quadcurve = function(opts){
	this.each(function() {
		var $this = $(this),
				data = $this.data();
		if (opts !== false && !data.quadcurve) {
			console.log('new quadcurve');
			data.quadcurve = new QuadCurveMenu(opts).quadcurve($this);
		}
	});
	return $(this);
};

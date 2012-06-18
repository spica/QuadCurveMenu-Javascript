(function(window, document, undefined) {

	var default_style = {
		position: 'absolute',
		opacity: 0,
		cursor: 'pointer',
		z-index: 999
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

		this.bind_func;

		this.init = function(options) {
			this.attributes = $.extend(this.defaults, options);
			
			var item = $('<img />').css(default_style).attr('src', img);
			console.log(item);
			$('body').append(item);
			this.itemContainer = item;

			//this.itemContainer.css('z-index', 10000);
			
			this.itemContainer.bind('click', function(){
					self.attributes['bindFunc'](item);
			});
		};

		this.setStartPnt = function(startPnt) {
			this.attributes['startPoint'] = startPnt;
			this.itemContainer.css({top: this.attributes['startPoint']['y'], left: this.attributes['startPoint']['x']});
			//this.itemContainer.css('left', this.attributes['startPoint']['x']);
		};

		this.setEndPnt = function(endPnt) {
			this.attributes['endPoint'] = endPnt;
		};

		this.expand = function(duration, easing) {
			this.itemContainer.show();
			this.itemContainer.animate({"left" : this.attributes['endPoint']['x'] , "top" : this.attributes['endPoint']['y'], "opacity": 1}, duration, easing);
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
			id: 'quad_curve_menu',
			image:					'default_img.png',
			highlightedImage:	    'highlighted_img.png',
			contentImage:			'content_img.png',
			highlightedContentImage:'highlightedcontent_img.png',
			nearRadius:				100,
			endRadius:				100,
			farRadius:				120,
			startPoint:				{x: -1, y:0},
			timeOffset:				0.01,
			expandDuration:			300,
			closeDuration: 			300,
			easing:					'easeOutBack',
			rotateAngle:			Math.PI,
			menuWholeAngle:			2 * Math.PI / 3,
			closeButtonImg:			'',
			closeButtonId:    		'quad_curve_menu_close',
			closeButtonEndPoint: 	{x: 0, y:0},
			expanding:				false,
			menuItemOptions: [],
			menuItems:				[]
		};

		this.init = function(options) {
			this.attributes = $.extend(this.defaults, options);
		};

		this.quadcurve = function(target) {
			this.menuContainer = target;

		//	this.menuContainer = $('#' + this.attributes['id']);
	
			this.menuContainer.bind('click', function() {
				self.setClick();
			});

			var closeButton;
			
			if (this.attributes['closeButtonImg'] == '')
			{
				closeButton = '<span id="' + this.attributes['closeButtonId'] + '" style="position:absolute; opacity:0; cursor: pointer;">x</span>';
				closeButton = $('<span />').css(default_style);
			} else {
				closeButton = '<img id="' + this.attributes['closeButtonId'] + '" src="' + this.attributes['closeButtonImg'] + '" style="position:absolute; opacity:0; cursor:pointer;">';
				closeButton = $('<img />').css(default_style).attr('src', this.attributes['closeButtonImg']);
			}
			//var closeButton = '<span id="' + this.attributes['closeButtonId'] + '" style="position:absolute; opacity:0; cursor: pointer;">x</span>';
			
			closeButton.bind('click', function() {
				self._close();
			});

			this.menuContainer.append(closeButton);

			this.closeButtonContainer = closeButton;


	//		$('#' + this.attributes['closeButtonId']).bind('click', function(){
	//			self._close();
	//		});

		//	this.menuContainer.css('cursor', 'pointer').css('color', '#2B4CCF');

			if (this.attributes['startPoint']['x'] == -1)
			{
				var	startY = this.menuContainer.offset()['top'] - this.menuContainer.height() / 2;
				var startX = this.menuContainer.offset()['left'] + this.menuContainer.width() / 2;
				var startPnt = {'x' : startX, 'y': startY};
				this.attributes['startPoint'] = startPnt;
			}

		}

		this._setMenu = function() {
			var startPnt = this.attributes['startPoint'];
			var startX = startPnt['x'];
			var startY = startPnt['y'];
			var count = this.menus.length;
			for (var i=0; i<count; i++) {
				var item = this.menus[i];
				item.setStartPnt(startPnt);
				item.attributes['menuId'] = this.attributes['id'];
				item.attributes['endPoint']['x'] = parseInt(startX) + this.attributes['endRadius'] * Math.sin(i * this.attributes['menuWholeAngle'] / count);
				var endY = parseInt(startY) - this.attributes['endRadius'] * Math.cos(i * this.attributes['menuWholeAngle'] / count);
				item.attributes['endPoint']['y'] = endY;
			}
			// close Button 수정. 
			this.closeButtonConatiner.css('top', startY).css('left', startX);
			this.attributes['closeButtonEndPoint']['x'] = parseInt(startX) + 1.4 *  this.attributes['endRadius'] * Math.sin(this.attributes['menuWholeAngle'] / 2);		
			this.attributes['closeButtonEndPoint']['y'] = parseInt(startY) - 1.4 *  this.attributes['endRadius'] * Math.cos(this.attributes['menuWholeAngle'] / 2);		
		};

		this.isExpanding = function() {
			return this.attributes['expanding'];
		};	

		this._expand = function() {
			if (!this.isExpanding()) {
				var count = this.menus.length;
				for (var i=0; i<count; i++) {
					var item = this.menus[i];
					item.expand(this.attributes['expandDuration'], this.attributes['easing']);
				}
				this.closeButtonContainer.show();
				this.closeButtonConatiner.animate({"left" : this.attributes['closeButtonEndPoint']['x'] , "top" : this.attributes['closeButtonEndPoint']['y'], "opacity": 1}, this.attributes['expandDuration'], this.attributes['easing']);
				this.attributes['expanding'] = true;
			}
		};

		this._close = function() {
			if (this.isExpanding()) {
				var count = this.menus.length;
				for (var i=0; i<count; i++) {
					var item = this.menus[i];
					item.close(this.attributes['closeDuration']);
				}
				this.closeButtonContainer.animate({"left" : this.attributes['startPoint']['x'] , "top" : this.attributes['startPoint']['y'], "opacity": 0}, this.attributes['closeDuration']);
				this.closeButtonContainer.hide(this.attributes['closeDuration']);
				this.attributes['expanding'] = false;
			}
		};

		this.setClick = function() {
			if (!this.isExpanding()) {
				self._setMenu();
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

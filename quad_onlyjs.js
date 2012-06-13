(function(window, document, undefined) {

  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl(tag, prop) {
    var el = document.createElement(tag || 'div');
    var n;

    for(n in prop) {
      el[n] = prop[n];
		}

    return el;
  }

  /**
   * Appends children and returns the parent.
   */
  function insertChild(parent /* child1, child2, ...*/) {
    for (var i=1, n=arguments.length; i<n; i++) {
      parent.appendChild(arguments[i]);
    }
    return parent;
  }

  /**
   * Sets multiple style properties at once.
   */
  function css(el, prop) {
    for (var n in prop) {
      el.style[vendor(el, n)||n] = prop[n];
    }
    return el;
  }

  /**
   * Fills in default values.
   */
  function merge(obj) {
    for (var i=1; i < arguments.length; i++) {
      var def = arguments[i];
      for (var n in def) {
        if (obj[n] === undefined) obj[n] = def[n];
      }
    }
    return obj;
  }
		function quadCurveAnimation(target, endPointX, endPointY, duration, isExpanding) {
			console.log('endpoint x =');
			console.log(endPointX);
			console.log('endpoint y = ');
			console.log(endPointY);
			offsetX = endPointX - parseFloat(target.style.left); 
			offsetY = endPointY - parseFloat(target.style.top);
			var dOpacity = -0.01;
			if (isExpanding) {
				target.style.display = 'block';
				dOpacity = 0.01;
			}
			var i=0;	
			function doMove(target, offsetX, offsetY, dOpacity, timeout) {
				setTimeout( function() {
					target.style.opacity = parseFloat(target.style.opacity) + dOpacity;
					target.style.top = (parseFloat(target.style.top) + offsetY / 100) + 'px';
					target.style.left = (parseFloat(target.style.left) + offsetX / 100) + 'px';
				}, timeout);
			};
			//doMove(0);
			var time = 0;
			while(i++<100) {
					time += duration / 100
					doMove(target, offsetX, offsetY, dOpacity, time);	
			}
			if (!isExpanding) {
				console.log('disappear');
				target.style.display = 'none';
			}
	}


	var QuadCurveMenuItem = function(options) {
		var self = this; 

		this.attributes = {
			id: 'quad_curve_menu_item',
			imageSrc: 'test.png',
			startPoint: {'x' : 0, 'y': 0},
			endPoint: {'x' :0, 'y' : 0},
			menuId: '',
			nearPoint: {'x' : 0, 'y': 0},
			farPoint: {'x' : 0, 'y': 0},
			bindFunc: function() {console.log('zz');}, // 되려나..
			target: ''
		};

		this.itemContainer;

		this.bind_func;

		this.init = function(options) {
			// initialize function
			if (options.imgSrc != undefined) this.attributes['imageSrc'] = options.imgSrc;

			if (options.bindFunc != undefined) {
				this.attributes['bindFunc'] = options.bindFunc;
			} 
			
			var item = document.createElement('img');
			item.style.position = 'absolute';
			item.style.display = 'none';
			item.style.opacity = 0;
			item.style.cursor = 'pointer';
			item.src = self.attributes['imageSrc'];
			item.onclick = self.attributes['bindFunc'];
			self.itemContainer = item;  
		};

		this.setTargetMenu = function(target) {
			target.appendChild(self.itemContainer);
		}


		this.bindingFunc = function() {
			//var target = $('#'+ this.attributes['menuId']);
			self.bind_func(this.attributes.target);
		}

		this.setStartPnt = function(startPnt) {
			self.attributes['startPoint'] = startPnt;
			self.itemContainer.style.top = self.attributes['startPoint']['y'] + 'px';
			self.itemContainer.style.left = self.attributes['startPoint']['x'] + 'px';
		};

		this.setEndPnt = function(endPnt) {
			self.attributes['endPoint'] = endPnt;
		};

		this.expand = function(duration) {
			quadCurveAnimation(self.itemContainer, self.attributes['endPoint']['x'], self.attributes['endPoint']['y'], duration, true);
		};

		this.close = function(duration) {
			quadCurveAnimation(self.itemContainer, this.attributes['startPoint']['x'], this.attributes['startPoint']['y'], duration, false);
		};

		this.init(options);
	};

	var QuadCurveMenu = function(options) {
		var self = this; 

		this.menuContainer;

		//this.menus = [];

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
			expandDuration:			500,
			closeDuration: 			300,
			easing:					'easeOutBack',
			rotateAngle:			Math.PI,
			menuWholeAngle:			2 * Math.PI / 3,
			closeButtonImgSrc:			'',
			closeButtonId:    		'quad_curve_menu_close',
			closeButtonEndPoint: 	{x: 0, y:0},
			expanding:				false,
			menuItemOptions: [],
			menuItems:	[]
		};

		this.init = function(options) {
			self.attributes = $.extend(this.defaults, options);
		};

		this.quadcurve = function(target) {
			this.menuContainer = target;
			this.menuContainer.onclick = self.setClick;
			this.menuContainer.style.cursor = 'pointer';
			this.menuContainer.style.color = '#2B4CFF';

			if (this.attributes['startPoint']['x'] == -1)
			{
				var	startY = parseFloat(this.menuContainer.offsetTop) - parseFloat(this.menuContainer.offsetHeight) / 2;
				var startX = parseFloat(this.menuContainer.offsetLeft) + parseFloat(this.menuContainer.offsetWidth) / 2;
				var startPnt = {'x' : startX, 'y': startY};
				this.attributes['startPoint'] = startPnt;
			}

			if (target.id != undefined) this.attributes['id'] = target.id;

			this.attributes['closeButtonId'] = this.attributes['id'] + '_close';

			var closeButton = document.createElement('span');
			closeButton.id = this.attributes['closeButtonId'];
			closeButton.style.position = 'absolute';
			closeButton.style.display = 'none';
			closeButton.style.opacity = 0;
			closeButton.style.cursor = 'pointer';
			closeButton.onclick = self._close;

			if (this.attributes['closeButtonImgSrc'] == '')
			{
				closeButton.innerHTML = 'x'
			} else {
				var closeButtonImg = document.createElement('img');
				closeButtonImg.id = self.attributes['closeButtonId'] + '_image';
				closeButtonImg.src = self.attributes['closeButtonImgSrc'];
				closeButton.appendChild(closeButtonImg);
			}
			this.closeButtonContainer = closeButton;

			this.menuContainer.appendChild(closeButton);

			self._setMenu();
		};

		this._setMenu = function() {
			var startPnt = this.attributes['startPoint'];
			var startX = startPnt['x'];
			var startY = startPnt['y'];
			var count = self.attributes.menuItemOptions.length;
			for (var i=0; i<count; i++) {
				var item = new QuadCurveMenuItem(self.attributes.menuItemOptions[i]);
				item.setTargetMenu(self.menuContainer);
				item.setStartPnt(startPnt);
				var endX = parseInt(startX) + self.attributes['endRadius'] * Math.sin(i * self.attributes['menuWholeAngle'] / count);
				var endY = parseInt(startY) - self.attributes['endRadius'] * Math.cos(i * self.attributes['menuWholeAngle'] / count);
				var endPnt = {x: endX, y:endY};
				item.setEndPnt(endPnt);
				self.attributes.menuItems.push(item);
			}
			console.log(self.attributes.menuItems);
			// close Button 수정. 
			self.closeButtonContainer.style.top = startY + 'px';
			self.closeButtonContainer.style.left = startX + 'px';
			this.attributes['closeButtonEndPoint']['x'] = parseInt(startX) + 1.4 *  this.attributes['endRadius'] * Math.sin(this.attributes['menuWholeAngle'] / 2);		
			this.attributes['closeButtonEndPoint']['y'] = parseInt(startY) - 1.4 *  this.attributes['endRadius'] * Math.cos(this.attributes['menuWholeAngle'] / 2);		
		};

		this.isExpanding = function() {
			return this.attributes['expanding'];
		};	

		this._expand = function() {
			if (!this.isExpanding()) {
				var count = this.attributes.menuItems.length;
				for (var i=0; i<count; i++) {
					var item = this.attributes.menuItems[i];
					item.expand(this.attributes['expandDuration']);
				}
				quadCurveAnimation(self.closeButtonContainer, this.attributes['closeButtonEndPoint']['x'], this.attributes['closeButtonEndPoint']['y'], this.attributes['expandDuration'], true);
				this.attributes['expanding'] = true;
			}
		};

		this._close = function() {
			if (self.isExpanding()) {
				var count = self.attributes.menuItems.length;
				for (var i=0; i<count; i++) {
					var item = self.attributes.menuItems[i];
					item.close(self.attributes['closeDuration']);
				}
				quadCurveAnimation(self.closeButtonContainer, this.attributes['startPoint']['x'], this.attributes['startPoint']['y'], this.attributes['expandDuration'], false);
				this.attributes['expanding'] = false;
			}
		};

		this.setClick = function() {
			if (!self.isExpanding()) {
				//self._setMenu();
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

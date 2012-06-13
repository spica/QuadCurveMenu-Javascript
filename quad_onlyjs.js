(function(window, document, undefined) {

		function quadCurveAnimation(target, endPointX, endPointY, duration, isExpanding) {
			console.log('endpoint x =');
			console.log(endPointX);
			console.log('endpoint y = ');
			console.log(endPointY);
			offsetX = endPointX - parseFloat(target.style.left); 
			offsetY = endPointY - parseFloat(target.style.top);
			if (isExpanding) {
				target.style.display = 'block';
			}
			function doMove(i) {
				//console.log(this.itemContainer.style.top);
				if (i < 100) {
				  target.style.opacity = parseFloat(target.style.opacity) + 1.0 / 100;
					target.style.top = (parseFloat(target.style.top) + offsetY / 100) + 'px';
					target.style.left = (parseFloat(target.style.left) + offsetX / 100) + 'px';
					setTimeout(function(){ doMove(++i)}, duration / 100);
				} else {
					if (!isExpanding) {
						target.style.display = 'none';
					}
					return;
				}
			};
			doMove(0);
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
//			var item = '<img src="' + img + '" id="' + this.attributes['id'] + '" style="position:absolute; opacity:0; cursor: pointer;">';
	//		$('body').append(item);
	//		this.itemContainer = $('#' + this.attributes['id']);

	//		this.itemContainer.css('z-index', 10000);
			
	//		this.itemContainer.bind('click', function(){
//					self.bindingFunc();
//			});
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
			//this.itemContainer.css('top', this.attributes['startPoint']['y']);
			self.itemContainer.style.top = self.attributes['startPoint']['y'] + 'px';
			//this.itemContainer.css('left', this.attributes['startPoint']['x']);
			self.itemContainer.style.left = self.attributes['startPoint']['x'] + 'px';
		};

		this.setEndPnt = function(endPnt) {
			self.attributes['endPoint'] = endPnt;
		};

		this.expand = function(duration, easing) {
			//this.itemContainer.show();
			//this.itemContainer.animate({"left" : this.attributes['endPoint']['x'] , "top" : this.attributes['endPoint']['y'], "opacity": 1}, duration, easing);
			quadCurveAnimation(self.itemContainer, self.attributes['endPoint']['x'], self.attributes['endPoint']['y'], duration, true);
		};

		this.close = function(duration, easing) {
			//this.itemContainer.animate({"left" : this.attributes['startPoint']['x'] , "top" : this.attributes['startPoint']['y'], "opacity": 0}, duration, easing);
			//this.itemContainer.hide(duration);
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
			//this.menus = options.menus;
			/*
			this.menuContainer = $('#' + this.attributes['id']);
	
			this.menuContainer.bind('click', function() {
				self.setClick();
			});
			*/

			/*
			this.menuContainer.css('cursor', 'pointer').css('color', '#2B4CCF');

			if (this.attributes['startPoint']['x'] == -1)
			{
				var	startY = this.menuContainer.offset()['top'] - this.menuContainer.height() / 2;
				var startX = this.menuContainer.offset()['left'] + this.menuContainer.width() / 2;
				var startPnt = {'x' : startX, 'y': startY};
				this.attributes['startPoint'] = startPnt;
			}  */
		};

		this.quadcurve = function(target) {
			this.menuContainer = target;
			this.menuContainer.onclick = self.setClick;
		  /*
			this.menuContainer.bind('click', function() {
				self.setClick();
			});  */
			this.menuContainer.style.cursor = 'pointer';
			this.menuContainer.style.color = '#2B4CFF';
			//this.menuContainer.css('cursor', 'pointer').css('color', '#2B4CCF');

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
			//closeButton.setAttribute('id', this.attributes['closeButtonId']);
			closeButton.id = this.attributes['closeButtonId'];
			closeButton.style.position = 'absolute';
			closeButton.style.opacity = 0;
			closeButton.style.cursor = 'pointer';
			closeButton.onclick = self._close;
			//closeButton.setAttributes('onclick', self._close);

			//closeButton.setAttribute('style', 'position:absolute; opacity:0; cursor:pointer;');

			if (this.attributes['closeButtonImgSrc'] == '')
			{
				//closeButton.appendChild(document.createTextNode('x'));
				closeButton.innerHTML = 'x'
				//closeButton = '<span id="' + this.attributes['closeButtonId'] + '" style="position:absolute; opacity:0; cursor: pointer;">x</span>';
			} else {
				var closeButtonImg = document.createElement('img');
				//closeButtonImg.setAttribute('id', this.attributes['closeButtonId'] + '_image');
				closeButtonImg.id = self.attributes['closeButtonId'] + '_image';
				//closeButtonImg.setAttribute('src', this.attributes['closeButtonImgSrc']);
				closeButtonImg.src = self.attributes['closeButtonImgSrc'];
				closeButton.appendChild(closeButtonImg);
				//closeButton = '<img id="' + this.attributes['closeButtonId'] + '" src="' + this.attributes['closeButtonImg'] + '" style="position:absolute; opacity:0; cursor:pointer;">';
			}
			//var closeButton = '<span id="' + this.attributes['closeButtonId'] + '" style="position:absolute; opacity:0; cursor: pointer;">x</span>';
			
			//$('body').append(closeButton);

			this.closeButtonContainer = closeButton;

			this.menuContainer.appendChild(closeButton);
			/*
			$('#' + this.attributes['closeButtonId']).bind('click', function(){
				self._close();
			}); */
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
				//item.attributes['menuId'] = this.attributes['id'];
				var endX = parseInt(startX) + self.attributes['endRadius'] * Math.sin(i * self.attributes['menuWholeAngle'] / count);
				var endY = parseInt(startY) - self.attributes['endRadius'] * Math.cos(i * self.attributes['menuWholeAngle'] / count);
				var endPnt = {x: endX, y:endY};
				item.setEndPnt(endPnt);
				//item.attributes['endPoint']['y'] = endY;
				self.attributes.menuItems.push(item);
			}
			// close Button 수정. 
			//this.closeButtonContainer.setAttribute('style', this.closeButtonConatiner.style + 'top: ' + startY + '; left:' + startX + ';');
			self.closeButtonContainer.style.top = startY + 'px';
			self.closeButtonContainer.style.left = startX + 'px';
			//$('#'+this.attributes['closeButtonId']).css('top', startY).css('left', startX);
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
					item.expand(this.attributes['expandDuration'], this.attributes['easing']);
				}
				//$('#'+this.attributes['closeButtonId']).show();
				//this.closeButtonContainer.style.opacity = 1;
				//
				var offsetX = this.attributes['closeButtonEndPoint']['x'] - parseFloat(this.closeButtonContainer.style.left);
				var offsetY = this.attributes['closeButtonEndPoint']['y'] - parseFloat(this.closeButtonContainer.style.top);
				var i = 0
				function doMove() {
					//console.log(offsetX);
					//console.log(self.closeButtonContainer.style);
					if (i < 100) {
						//console.log(self.closeButtonContainer.style.opacity);
						self.closeButtonContainer.style.opacity = parseFloat(self.closeButtonContainer.style.opacity) + 1.0 / 100;
						self.closeButtonContainer.style.top = (parseFloat(self.closeButtonContainer.style.top) + offsetY / 100) + 'px';
						self.closeButtonContainer.style.left = (parseFloat(self.closeButtonContainer.style.left) +offsetX / 100) + 'px';
						i += 1
						setTimeout(doMove, 0.1);
						} else {
							return;
						}
				};

				doMove();
				//$('#'+this.attributes['closeButtonId']).animate({"left" : this.attributes['closeButtonEndPoint']['x'] , "top" : this.attributes['closeButtonEndPoint']['y'], "opacity": 1}, this.attributes['expandDuration'], this.attributes['easing']);
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
				$('#'+this.attributes['closeButtonId']).animate({"left" : this.attributes['startPoint']['x'] , "top" : this.attributes['startPoint']['y'], "opacity": 0}, this.attributes['closeDuration']);
				$('#'+this.attributes['closeButtonId']).hide(this.attributes['closeDuration']);
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

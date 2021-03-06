/**
 *	QuadCurveMenu Javascript Ver 0.0.1 
 *  Author: Myunkyu Park (spica@wafflestudio.com)
 *  Git: https://github.com/spica/QuadCurveMenu-Javascript 
 *  Created at : 2012.06.21 
 *  MIT Licensed
 *  Copyright (C) 2012 MyunkyuPark, spica@wafflestudio.com`
 */

(function(window, document, undefined) {
  /**
   * Fills in default values.
   */
  function merge(obj, def) {
  	for (var n in def) {
  		obj[n] = def[n];
  	}
    return obj;
  }

  /**
   * QuadCurveMenu Animation function 
   * target : js dom object. target object of animation 
   * endPointX : absolute coordinate of destination's x 
   * endPointY : absolute coordinate of destination's y
   * duration : animation duration 
   * isExpanding : boolean. true if expand animation 
   */
  function quadCurveAnimation(target, endPointX, endPointY, duration, isExpanding) {

  	function doMove(target, offsetX, offsetY, dOpacity, frame, timeout) {
  		setTimeout( function() {
  			target.style.opacity = parseFloat(target.style.opacity) + dOpacity;
  			target.style.top = (parseFloat(target.style.top) + offsetY / frame) + 'px';
  			target.style.left = (parseFloat(target.style.left) + offsetX / frame) + 'px';
  		}, timeout);
  	}

  	function makeDisappear(target, timeout) {
  		setTimeout( function() {
  			target.style.display = 'none';
  		}, timeout);
  	}

  	var offsetX = endPointX - parseFloat(target.style.left); 
  	var offsetY = endPointY - parseFloat(target.style.top);
  	var frame = 100; // frame of animation 
  	var dOpacity = -(1.0 / frame);
  	var timeoutms = 0; // milli seconds
  	var i=0;	

  	//duration should bigger than 0 
  	if (duration <= 0) duration = 5;

  	if (isExpanding) {
  		target.style.display = 'block';
  		dOpacity = 1.0 / frame;
  	} else {
  		makeDisappear(target, duration + 50);
  	}

  	//exec animation 
  	while(i++<frame) {
  			timeoutms += duration / frame
  			doMove(target, offsetX, offsetY, dOpacity, frame, timeoutms);	
  	}
  }

	/** 
  * @constructor
  */
  function QuadCurveMenuItem(options) {
  	var self = this; 

  	this.defaults = {
  		img: 'test.png',
  		startPoint: {'x' : 0, 'y': 0},
  		endPoint: {'x' :0, 'y' : 0},
  		bindFunc: function(target) {console.log(target);}, // 되려나..
  		target: ''
  	};

  	this.attributes;

  	this.itemContainer;

  	this.init = function(options) {
  		// initialize function
  		self.attributes = merge(this.defaults, options);
  		
  		var item = document.createElement('img');
  		item.style.position = 'absolute';
  		item.style.display = 'none';
  		item.style.opacity = 0;
  		item.style.cursor = 'pointer';
  		item.src = self.attributes['img'];
  		item.onclick = function() { self.attributes['bindFunc'](item);};
  		self.itemContainer = item;  
  	};

  	this.setTargetMenu = function(target) {
  		//target.appendChild(self.itemContainer);
			target.parentNode.appendChild(self.itemContainer);
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
  		quadCurveAnimation(self.itemContainer, self.attributes['startPoint']['x'], self.attributes['startPoint']['y'], duration, false);
  	};

  	this.init(options);
  };

/** 
  * @constructor
  */
  function QuadCurveMenu (options) {
  	var self = this; 

  	this.menuContainer;

  	this.attributes;

  	this.defaults = {
  		endRadius:				100,
  		startPoint:				{x: -1, y:0},
  		expandDuration:			300,
  		closeDuration: 			300,
  		menuWholeAngle:			2 * Math.PI / 3,
  		expanding:				false,
  		menuItemOptions: [],
  		menuItems:	[]
  	};

  	this.init = function(options) {
  		self.attributes = merge(this.defaults, options);
  	};

  	this.addQuadCurveMenu = function(target) {
  		this.menuContainer = target;
  		this.menuContainer.onclick = self.setClick;
  		this.menuContainer.style.cursor = 'pointer';

  		if (self.attributes['startPoint']['x'] == -1)
  		{
  			var	startY = parseFloat(this.menuContainer.offsetTop) - parseFloat(this.menuContainer.offsetHeight) / 2;
  			var startX = parseFloat(this.menuContainer.offsetLeft) + parseFloat(this.menuContainer.offsetWidth) / 2;
  			var startPnt = {'x' : startX, 'y': startY};
  			self.attributes['startPoint'] = startPnt;
  		}

  		self._setMenu();
  	};

  	this._setMenu = function() {
  		var startPnt = self.attributes['startPoint'];
  		var startX = startPnt['x'];
  		var startY = startPnt['y'];
  		var count = self.attributes.menuItemOptions.length;
  		for (var i=0; i<count; i++) {
  			var item = new QuadCurveMenuItem(self.attributes.menuItemOptions[i]);
  			item.setTargetMenu(self.menuContainer);
  			item.setStartPnt(startPnt);
  			var endX = parseInt(startX, 10) + self.attributes['endRadius'] * Math.sin(i * self.attributes['menuWholeAngle'] / count);
  			var endY = parseInt(startY, 10) - self.attributes['endRadius'] * Math.cos(i * self.attributes['menuWholeAngle'] / count);
  			var endPnt = {x: endX, y:endY};
  			item.setEndPnt(endPnt);
  			self.attributes.menuItems.push(item);
  		}
  	};

  	this.isExpanding = function() {
  		return self.attributes['expanding'];
  	};	

  	this.setExpanding = function(isExpanding) {
  		self.attributes['expanding'] = isExpanding;
  	}

  	this._expand = function() {
  		if (!self.isExpanding()) {
  			var count = self.attributes.menuItems.length;
  			for (var i=0; i<count; i++) {
  				var item = self.attributes.menuItems[i];
  				item.expand(self.attributes['expandDuration']);
  			}
  			self.setExpanding(true);
  		}
  	};

  	this._close = function() {
  		if (self.isExpanding()) {
  			var count = self.attributes.menuItems.length;
  			for (var i=0; i<count; i++) {
  				var item = self.attributes.menuItems[i];
  				item.close(self.attributes['closeDuration']);
  			}
  			self.setExpanding(false);
  		}
  	};

  	this.setClick = function() {
  		if (self.isExpanding()) {
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

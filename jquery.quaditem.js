(function($) {
	$.fn.quadCurveMenuItem = function(options) {

		this.each(function() {
			alert("item");
		});
		return this;
	};

	$.extend($.fn.quadCurveMenuItem.prototype, {

		images: {
			// images file name with path. 
			image:					'img.png',
			highlightedImage:	    'himg.png',
			contentImage:			'cimg.png',
			highlightedContentImage:'hcimg.png',
		},

		attributes: {
			className:				'quadCurveMenuItem'
		},
			
		// default points 
		points: {
			startPoint:				{x: 100, y:100},
			endPoint:				{x: 150, y:150},
			nearPoint:				{x: 130, y:130},
			farPoint:				{x: 160, y:160}
		}, 
		//mouse down  
		touchsBegan: function() {
			alert("touch began!");
		},
		//mouse up 
		touchsEnd:	function() {
			alert("touch end!");
		},
		// Create a menu item. 
		create: function(imgs, attr) {
			if (imgs != undefined)
			{
				$.expand(this.images, imgs);
			}

			if (attr != undefined)
			{
				$.expand(this.attributes, attr);
			}
			
		},
		
		setPoints: function(pts) {
			if (pts != undefined)
			{
				$.expand(this.points, pts);
			}
		}
	});

	$.quadCurveMenuItem.images = $.fn.quadCurveMenuItem.prototype.images;
	$.quadCurveMenuItem.attributes = $.fn.quadCurveMenuItem.prototype.attributes;
	$.quadCurveMenuItem.points = $.fn.quadCurveMenuItem.prototype.points;
})(jQuery);
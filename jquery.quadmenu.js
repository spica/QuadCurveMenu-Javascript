(function($) {
	$.fn.quadCurveMenu = function(options) {
		this.attirubtes = $.extend($.fn.quadCurveMenu.prototype.attributes, options);

		this.each(function() {
			alert("testset");
		});
		return this;
	};

	$.extend($.fn.quadCurveMenu.prototype, {
			
		// default attributes 
		attributes: {
			// images 
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
		}, 
		
		menus: [], //Array of menu items 
		
	});



})(jQuery);
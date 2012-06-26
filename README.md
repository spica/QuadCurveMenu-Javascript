####QuadCurveMenu-Javascript Ver 0.0.1

## Intro
QuadCurveMenu-Javascript is a javascript library for make quadcurve menu like levey's AwesomeMenu(https://github.com/levey/AwesomeMenu). 


## How to 
Include JS files:

	<script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
	<script src="lib/jquery.easing.1.3.js" type="text/javascript"></script>
	<script src="lib/jquery-css-transform.js" type="text/javascript"></script>
	<script src="lib/jquery-animate-css-rotate-scale.js" type="text/javascript"></script>
	<script src="js/quad.js" type="text/javascript"></script>
	

Set up menu item options:

	/* 
		 callback function. Called when item clicked. 
		 target : quadCurveMenuItem's javascript dom object ( jquery dom object in jquery version). 
	*/
	var bind_func = function(target) {
		alert(target.innerHTML); // javscript version
		alert(target.html()); // jquery version
	}

	var star_item1 = {img: '/images/star.png', bindFunc: bind_func};
	var star_item2 = {img: '/images/start.png', bindFunc: bind_func};
	var menu_item_options = new Array();

	menu_item_options.push(star_item1);
	menu_item_options.push(star_item2);

Then, setup the menu and options:

	/* this is default options. */
	var menu_options = {
		timeOffset: 50, // ms
		nearRadius: 80,
		endRadius: 100,
		farRadius: 120,
		expandDuration: 300, //ms
		closeDuration: 300, //ms
		easing: 'easeOutBack', // see jquery.easing plugin (http://gsgd.co.uk/sandbox/jquery/easing)
		rotateAngle: 180, //degree
		menuWholeAngle: 2 * Math.PI / 3, // radian
		menuItemOptions: menu_item_options // same with javascript version 
	}
	
	$('#target_id').addQuadCurveMenu(menu_options);
	// or 
	$('.target_class').addQuadCurveMenu(menu_options);


You can also use js-only(no need additional library) version: 

	/* this is default options. */
	var menu_options = {
		endRadius: 100,
		expandDuration: 300, //ms 
		closeDuration: 300, //ms
		menuWholeAngle: 2 * Math.PI / 3 // radian. 
		menuItemOptions: menu_item_options // above menu_item_options
	};

	var target = document.getElementById('target_id');
	new QuadCurveMenu(menu_options).addQuadCurveMenu(target);

## License
MIT licensed

Copyright (C) 2012 Myunkyu Park, spica@wafflestudio.com

Twitter: @MyunkyuPark

Email: spica@wafflestudio.com

####QuadCurveMenu-Javascript Ver 0.0.1
####Author : Myunkyu Park 
####Created at : 2012.6.12


### 0. Intro
QuadCurveMenu-Javascript is a javascript library for make quadcurve menu like levey's AwesomeMenu(https://github.com/levey/AwesomeMenu). 


### 1. How to 
Set up menu item options:

	var bind_func = function(target) {
		alert(target.innerHTML); // callback function.  
	}

	var star_item1 = {img: '../images/star.png', bindFunc: bind_func};
	var star_item2 = {img: '../images/start.png', bindFunc: bind_func};
	var menu_item_options = new Array();

	menu_item_options.push(star_item1);
	menu_item_options.push(star_item2);

Then, setup the menu and options:

	/* this is default options. */
	var menu_options = {
		endRadius: 100,
		expandDuration: 300, //ms 
		closeDuration: 300, //ms
		menuWholeAngle: 2 * Math.PI / 3 // radian. 
		menuItemOptions: menu_item_options // above menu_item_options
	};

	var target = document.getElementById('target_id');
	new QuadCurveMenu(menu_options).quadcurve(target);


You can also use jquery version: 

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
	
	$('#target_id').quadcurve(menu_options);
	
Twitter: @MyunkyuPark

Email: spica@wafflestudio.com

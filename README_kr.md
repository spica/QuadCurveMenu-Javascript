####QuadCurveMenu-Javascript Ver 0.0.1 

## 요약 
QuadCurveMenu-Javascript는 
levey의 AwesomeMenu (https://github.com/levey/AwesomeMenu/) 를 자바스크립트 버젼으로 포팅한 것으로, jQuery 버젼과 javascript 버젼을 제공합니다. 
jQuery 버젼은 jQuery 및 jquery-css-transform(https://github.com/zachstronaut/jquery-css-transform), jquery-animate-css-rotate-scale(https://github.com/zachstronaut/jquery-animate-css-rotate-scale), jquery.easing plugin(https://gsgd.co.uk/sandbox/jquery/easing/)을 필요로 합니다. 
javascript 버젼은 별다른 추가 라이브러리 없이 바로 사용 하실 수 있습니다. 대신 jQuery 버젼보다 애니메이션 부분이 조금 부족합니다. 


## 사용법
#### 1) javascript 버젼 
우선 Menu item을 생성하기 위해, item 옵션을 설정해 줍니다 : 

  item 옵션 : img, func
	img : 해당 아이템으로 보일 이미지 경로
	func : 해당 아이템을 클릭했을 때 발생할 function (function은 해당 아이템의 javascript domelement를 인자로 받음. 없어도 상관없음) 

	//bind func example 
	var bind_func = function(target) {
		alert(target.innerHTML);
	}

	var search_item = {img: '../images/search.png', bindFunc: bind_func}; 
  var blog_item = {img: '../images/blog.png', bindFunc: bind_func};
  // 아이템 옵션을 다 설정해 줬으면, 해당 아이템들을 array에 넣습니다. 이 array는 Menu를 만들때 옵션으로 들어갑니다. 
  var menu_item_options = new Array();
	menu_item_options.push(search_item);
	menu_item_options.push(blog_item);

Menu item 옵션을 정했으면, Menu 옵션을 설정하고 QuadCurveMenu를 만들어 줍니다 : 
	
	var menu_options = {
		endRadius:			100,
		expandDuration: 300, // 300ms animation 시간 
		closeDuration:  300, // ms 
		menuWholeAngle:	2 * Math.PI / 3, // radian, expand될 때 맨 처음 아이템과 맨 마지막 아이템사이의 최대 중심각. 
		menuItemOptions: menu_item_options // 위의 menu_item_options
	}
	
	var elements = document.getElementsByClassName('class_name');
	for(var i=0;i<elements.length; i++) {
		var ele = elements.item(i);
		new QuadCurveMenu(menu_options).addQuadCurveMenu(ele);
	}

	// or 
	var target = document.getElementById('specific_id');
	new QuadCurveMenu(menu_options).addQuadCurveMenu(target);

해당 옵션 외에, 설정할 수 있는 값들의 기본값은 다음과 같습니다: 

 var default_options = {
		endRadius:				100, //px
		startPoint:				{x: -1, y:-1},  //따로 설정하지 않으면, 해당 target의 중간으로 맞춰집니다. 
		expandDuration:			300,  //ms
		closeDuration: 			300,  //ms
		menuWholeAngle:			2 * Math.PI / 3, //radian
 }

#### 2) jQuery 버젼 
Menu Item을 생성하기 위한 옵션은 javascript 버젼과 같습니다. 다만, bind_func에서 사용되는 인자가 javascript dom object가 아니라 jQuery object 입니다. 
target.innerHTML -> target.html() 과 같이 jquery 메소드를 사용하시면 됩니다. 

Menu를 생성할때, javascript 버젼보다 몇 가지 사항이 더 추가됩니다 :

	var default_options = {
			timeOffset: 	    50, // ms, 각 메뉴가 퍼질때 메뉴아이템별 시간간격 
			nearRadius:				80, // expand animation중 원점에 가장 가까운 거리
			endRadius:				100, // expand animation 최종 거리 
			farRadius:				120, // expand animation에서 가장 먼 거리 
			startPoint:				{x: -1, y:-1}, //메뉴 아이템 시작점 
			expandDuration:			300, //ms, expand animation 총 시간
			closeDuration: 			300, //ms, shrink animatino 총 시간 
			easing:					'easeOutBack', //easing, expand animation 최종 효과. jquery.easing plugin 에서 정의된 것만 사용 가능. 
			rotateAngle:			180, // degree. expand 중일 때 해당 menu가 rotate 될 각도 
			menuWholeAngle:			2 * Math.PI / 3, // radian, expand될 때 맨 처음 아이템과 맨 마지막 아이템사이의 최대 중심각. 
	}

  // quadcurve menu 바인딩은 다음과 같이 하면 됩니다. 
	$('#target_id').addQuadCurveMenu(options); 
	// or
	$('.target_class').addQuadCurveMenu(options);

## License
MIT License
Copyright (C) 2012 MyunkyuPark, spica@wafflestudio.com

Twitter: @MyunkyuPark
Email: spica@wafflestudio.com 

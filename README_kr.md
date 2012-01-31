QuadCurveMenu-Javascript는 
levey의 QuadCurveMenu (https://github.com/levey/QuadCurveMenu)를 자바스크립트 버젼으로 포팅한 겁니다. 

QuadCurveMenuItem 클래스와 QuadCurveMenu 클래스를 제공합니다.

사용하기 위해선 jQuery가 필요하며, 추가적인 animate 옵션중 easing을 사용하려면 jquery.easing plugin을 사용하시면 됩니다. (http://gsgd.co.uk/sandbox/jquery/easing/) 


QuadCurveMenuItem은 해당 item으로 쓸 이미지 파일 경로, 아이디값, 클릭시 실행될 바인드 함수를 인자로 받습니다. 
바인드 함수는 인자로 아이템을 호출한 QuadCurveMenu 객체의 jQuery object를 인자로 받게 됩니다. 

QuadCurveMenu는 인자로 아이디값, 각종 옵션, 그리고 QuadCurveMenuItem객체의 리스트를 인자로 받습니다. 
아이디 값은 QuadCurveMenu를 적용시킬 html element의 id값이며, 
옵션은 현재 
var default_options = {
			endRadius:			100,
			startPoint:			{x: 100, y:100},
			timeOffset:			0.01,
			expandDuration:			500,
			closeDuration: 			300,
			easing:				'easeOutBack', //jquery.easing plugin 필요
			rotateAngle:			Math.PI,
			menuWholeAngle:			2 * Math.PI / 3,
			closeButtonImg:			''
			}
이 기본값이며, 수정하고 싶을땐 

var options = {
		endRadius: 150,
		expandDuration: 300,
		closeButtonImg:	'../images/close_button.png'
		}
처럼 수정하고 싶은 부분만 옵션값으로 주시면 됩니다. closeButtonImg옵션 값이 없을 경우에는 x 텍스트로 들어갑니다. 



사용법 : 
	/sample/sample.html 파일 참고.. 

	var bind_func = function(target) {
		alert(target.html());
	}
	var searchItem = new QuadCurveMenuItem('../images/search_big.png', 'search_item', bind_func);
	var imageItem = new QuadCurveMenuItem('../images/image_big.png', 'image_item', bind_func);
	var shoppingItem = new QuadCurveMenuItem('../images/shopping_big.png', 'shopping_item', bind_func);
	var mapItem = new QuadCurveMenuItem('../images/map_big.png', 'map_item', bind_func);
	var blogItem = new QuadCurveMenuItem('../images/blog_big.png', 'blog_item', bind_func);
	var menus = new Array();

	menus.push(searchItem);
	menus.push(imageItem);
	menus.push(shoppingItem);
	menus.push(mapItem);
	menus.push(blogItem);

	var options = {
			endRadius:				100,
			startPoint:				{x: 100, y:100},
			timeOffset:				0.01,
			expandDuration:			500,
			closeDuration: 			300,
			easing:					'easeOutBack', //jquery.easing plugin 필요
			rotateAngle:			Math.PI,
			menuWholeAngle:			2 * Math.PI / 3,
			closeButtonImg:			'quad_curve_close_button.png'
			}
	
	//함수 바인딩
	$('.dynamic_search').each(function() {
		var id = $(this).attr('id');
		new QuadCurveMenu(id, options, menus);
	});


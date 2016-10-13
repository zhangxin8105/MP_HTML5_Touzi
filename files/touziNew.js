var TIMES_Array = new Array();

function touziStartCom(index, clickMax, run) {
	if (!TIMES_Array[index]) {
		TIMES_Array[index] = {};
	}
	if (typeof (TIMES_Array[index].count) == "undefined") {
		TIMES_Array[index].count = 0;
	}

	TIMES_Array[index].count++;
	if (TIMES_Array[index].count >= clickMax) {
		TIMES_Array[index].count = 0;

		if (TIMES_Array[index].timeout) {
			clearTimeout(TIMES_Array[index].timeout);
		}
		TIMES_Array[index].timeout = null;

		run();
	} else {
		if (TIMES_Array[index].timeout) {
			clearTimeout(TIMES_Array[index].timeout);
		}
		TIMES_Array[index].timeout = setTimeout(function() {
			TIMES_Array[index].count = 0;
			TIMES_Array[index].timeout = null;
		}, 1500);
	}
}

function touziStart2() {
	touziStartCom(2, 2, touzi_Start2);
}

function touzi_Start2() {
	var html = [];
	for (var i = 0; i < TZNUM; i++) {
		html.push('<div class="touzi" onclick="touziClick(this)"></div>');
	}
	$('touziTable').innerHTML = html.join('');

	var obj = $('touziTable').getElementsByTagName('div');
	TZDELAY = 30;
	$('touziRound').innerHTML = '第 ' + TZROUND + ' 轮';
	TZROUND++;
	touziAni2(obj);
	setTimeout(function() {
		$('rollMp3').src = 'touzi/img/roll.mp3';
		$('rollMp3').play();
	}, 50);
}

function touziAni2(obj) {
	var K = [ '1', '2', '3', '4', '5', '6', 'a', 'b', 'c', 'd', 'e', 'f' ];

	var index = -1;
	if (TZDELAY > 200) {
		K = [ '1', '2', '3', '4', '5', '6' ];
		aniIng = 0;
		index = rand(0, K.length - 1);
	} else {
		aniIng = 1;
		setTimeout(function() {
			touziAni2(obj);
			TZDELAY += 5;
		}, TZDELAY);
	}

	for (var i = 0; i < obj.length; i++) {
		if (index == -1) {
			touziSetting(obj[i], K[rand(0, K.length - 1)]);
		} else {
			touziSetting(obj[i], K[index]);
		}
	}
}

function touziStart3() {
	touziStartCom(3, 2, touzi_Start3);
}

function touzi_Start3() {
	var html = [];
	for (var i = 0; i < TZNUM; i++) {
		html.push('<div class="touzi" onclick="touziClick(this)"></div>');
	}
	$('touziTable').innerHTML = html.join('');

	var obj = $('touziTable').getElementsByTagName('div');
	var K = [ '1', '2', '3', '4', '5', '6' ];
	var index = rand(0, K.length - 1);
	for (var i = 0; i < obj.length; i++) {
		touziSetting(obj[i], K[index]);
	}
}

function touziStart4() {
	touziStartCom(4, 2, touzi_Start4);
}

function touzi_Start4() {
	var html = [];
	for (var i = 0; i < TZNUM; i++) {
		html.push('<div class="touzi" onclick="touziClick(this)"></div>');
	}
	$('touziTable').innerHTML = html.join('');

	var obj = $('touziTable').getElementsByTagName('div');
	var K = [ '1', '2', '3', '4', '5', '6' ];
	var index = rand(0, K.length - 1);
	for (var i = 0; i < obj.length; i++) {
		touziSetting(obj[i], K[rand(0, K.length - 1)]);
	}

	for (var i = 0; i < 6; i++) {
	}
}

function touziStart5() {
	touziStartCom(5, 2, touzi_Start5);
}

function touzi_Start5() {
	var myDate = new Date();
	var html = [];
	for (var i = 0; i < TZNUM; i++) {
		html.push('<div class="touzi" onclick="touziClick(this)"></div>');
	}
	$('touziTable').innerHTML = html.join('');

	var obj = $('touziTable').getElementsByTagName('div');
	var K = [ '1', '2', '3', '4', '5', '6' ];
	var myDate = new Date()
	var index = Math.floor((myDate.getTime() / 1000 / 60) % 6);

	var Tindex = new Array(obj.length);
	// var count = Math.ceil((obj.length + 1) / 2);
	var count = Math.floor((obj.length + rand(0, 1)) / 2);

	for (var i = 0; i < count; i++) {
		var ri = rand(0, obj.length - 1);
		if (Tindex[ri] != null) {
			i--;
		} else {
			Tindex[ri] = index;
		}
	}
	// console.log(Tindex);
	for (var i = 0; i < Tindex.length; i++) {
		if (Tindex[i] == null) {
			Tindex[i] = rand(0, K.length - 1);
		}
		touziSetting(obj[i], K[Tindex[i]]);
	}
	// console.log(Tindex);
}

var isCanTouziClick = false;

function touziClick(obj) {
	if (isCanTouziClick) {
		var index = obj.className.substring(obj.className.length - 1);
		index = index % 6 + 1;
		touziSetting(obj, index);
	}
}

var touziClickStartTimeout = null;
function touziClickStart() {
	isCanTouziClick = true;
	// alert("zhangxin");
	if (touziClickStartTimeout != null) {
		clearTimeout(touziClickStartTimeout);
	}
	touziClickStartTimeout = setTimeout(function() {
		isCanTouziClick = false;
	}, 10000);
}

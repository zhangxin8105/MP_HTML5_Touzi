
function touziStart2() {
	// if(aniIng==1)return;

	TZTIMES++;
	if (TZTIMES >= 2) {

		TZTIMES = 0;
		if (TZTIMER) {
			clearTimeout(TZTIMER);
		}
		TZTIMER = null;

		touzi_Start2();
	} else {
		if (TZTIMER) {
			clearTimeout(TZTIMER);
		}
		TZTIMER = setTimeout(function() {
			TZTIMES = 0;
			TZTIMER = null;
		}, 2000);
	}
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

var TZTIMES_3 = 0, TZTIMER_3 = null;
function touziStart3() {
	// if(aniIng==1)return;
	TZTIMES_3++;
	if (TZTIMES_3 >= 2) {

		TZTIMES_3 = 0;
		if (TZTIMER_3) {
			clearTimeout(TZTIMER_3);
		}
		TZTIMER_3 = null;

		touzi_Start3();
	} else {
		if (TZTIMER_3) {
			clearTimeout(TZTIMER_3);
		}
		TZTIMER_3 = setTimeout(function() {
			TZTIMES_3 = 0;
			TZTIMER_3 = null;
		}, 2000);
	}
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

var TZTIMES_4 = 0, TZTIMER_4 = null;
function touziStart4() {
	// if(aniIng==1)return;
	TZTIMES_4++;
	if (TZTIMES_4 >= 2) {

		TZTIMES_4 = 0;
		if (TZTIMER_4) {
			clearTimeout(TZTIMER_4);
		}
		TZTIMER_4 = null;

		touzi_Start4();
	} else {
		if (TZTIMER_4) {
			clearTimeout(TZTIMER_4);
		}
		TZTIMER_4 = setTimeout(function() {
			TZTIMES_4 = 0;
			TZTIMER_4 = null;
		}, 2000);
	}
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

var TZTIMES_5 = 0, TZTIMER_5 = null;
function touziStart5() {
	// if(aniIng==1)return;
	TZTIMES_5++;
	if (TZTIMES_5 >= 2) {

		TZTIMES_5 = 0;
		if (TZTIMER_5) {
			clearTimeout(TZTIMER_5);
		}
		TZTIMER_5 = null;

		touzi_Start5();
	} else {
		if (TZTIMER_5) {
			clearTimeout(TZTIMER_5);
		}
		TZTIMER_5 = setTimeout(function() {
			TZTIMES_5 = 0;
			TZTIMER_5 = null;
		}, 2000);
	}
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

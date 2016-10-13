// ==============================

function touziNum(n) {
	TZNUM += n;
	if (TZNUM < 1)
		TZNUM = 1;
	$('touziNumSpan').innerHTML = TZNUM + '个';
}

var TZTIMES = 0, TZTIMER = null;
function touziStart() {

	if (aniIng == 1) {
		return;
	}

	if (confirm("确定要开始投骰子吗？")) {
		touzi_Start();
	}

	/*
	 * TZTIMES++; if(TZTIMES>=3){
	 * 
	 * TZTIMES = 0; clearTimeout(TZTIMER); TZTIMER=null;
	 * 
	 * touzi_Start(); }else{ if(TZTIMER){ clearTimeout(TZTIMER); } TZTIMER =
	 * setTimeout(function(){ TZTIMES = 0; TZTIMER=null; },1000); }
	 */
}

var TZDELAY = 30, TZROUND = 1, aniIng = 0;
function touzi_Start() {
	var html = [];
	for (var i = 0; i < TZNUM; i++) {
		html.push('<div class="touzi" onclick="touziClick(this)"></div>');
	}
	$('touziTable').innerHTML = html.join('');

	var obj = $('touziTable').getElementsByTagName('div');
	TZDELAY = 30;
	$('touziRound').innerHTML = '第 ' + TZROUND + ' 轮';
	TZROUND++;
	touziAni(obj);
	setTimeout(function() {
		$('rollMp3').src = 'touzi/img/roll.mp3';
		$('rollMp3').play();
	}, 50);
}

function touziAni(obj) {
	var K = [ '1', '2', '3', '4', '5', '6', 'a', 'b', 'c', 'd', 'e', 'f' ];

	if (TZDELAY > 200) {
		K = [ '1', '2', '3', '4', '5', '6' ];
		aniIng = 0;
	} else {
		aniIng = 1;
		setTimeout(function() {
			touziAni(obj);
			TZDELAY += 5;
		}, TZDELAY);
	}

	for (var i = 0; i < obj.length; i++) {
		obj[i].className = 'touzi touzi' + K[rand(0, K.length - 1)];
	}
}

function touziSetting(obj, index) {
	obj.className = 'touzi touzi' + index;
}
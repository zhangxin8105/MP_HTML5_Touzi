function $(id) {
	return document.getElementById(id);
}
function toggle(id) {
	$(id).style.display = ($(id).style.display == 'none' ? 'block' : 'none');
}
function getajaxHttp() {
	var xmlHttp;
	try {
		// Firefox, Opera 8.0+, Safari
		xmlHttp = new XMLHttpRequest();
	} catch (e) {
		// Internet Explorer
		try {
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				alert("您的浏览器不支持AJAX！");
				return false;
			}
		}
	}
	return xmlHttp;
}

function ajax(url, functionName) {
	tips.show('正在处理中...');
	var xmlhttp = getajaxHttp();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			tips.hide();
			functionName(xmlhttp.responseText);
		}
	};
	url += (url.indexOf('?') != -1 ? '&' : '?') + 'ajax=1';

	xmlhttp.open('get', url, true);
	xmlhttp.send('');
}

function joinRoom() {
	var joinroomid = $('joinroomid').value, joinroomname = $('joinroomname').value;

	if (joinroomid == '' || joinroomname == '') {
		alert('请输入房间号和昵称');
		return;
	}

	store.set('joinroomid', joinroomid);
	store.set('joinroomname', joinroomname);

	ajax('./?app=wodi.function&act=join&id=' + joinroomid + '&name='
			+ joinroomname, function(d) {
		location.reload();
	});
}

function joinOnload() {
	if (store.get('joinroomid')) {
		$('joinroomid').value = store.get('joinroomid');
	}
	if (store.get('joinroomname')) {
		$('joinroomname').value = store.get('joinroomname');
	}
}

function f5member() {
	ajax('./?app=wodi.function&act=f5cy', function(d) {
		$('join_cylist').innerHTML = d;
	});
}

function creatfmtContent(d) {
	var html = [];
	if (d.length == 0) {
		html = '无任何玩家加入..';
	} else {
		for (var i = 0; i < d.length; i++) {
			html
					.push('<li onclick="creatDel(\'' + d[i][0] + '\')">'
							+ d[i][0] + '（身份词：<font color="'
							+ [ '#33FF00', '#ff0000' ][d[i][2]] + '">'
							+ d[i][1]
							+ '</font>） <font color=red>×</font></li>');
		}
		html = html.join('');
	}
	$('creatol').innerHTML = html;
}

function creatDel(name) {
	if (confirm("确定要将 " + name + " 移除游戏吗？")) {
		ajax('./?app=wodi.function&act=cdel&name=' + name, function(d) {
			d = eval('(' + d + ')');
			creatfmtContent(d);
		});
	}
}

function creatF5() {
	ajax('./?app=wodi.function&act=f5md', function(d) {
		d = eval('(' + d + ')');
		creatfmtContent(d);
	});
}
function creatSFC() {
	if (confirm("确定要重新分配关键词吗？")) {
		ajax('./?app=wodi.function&act=f5wd', function(d) {
			if (d.indexOf('error') != -1) {
				alert(d);
				return;
			}
			d = eval('(' + d + ')');
			creatfmtContent(d);
		});
	}
}
function f5MyWord() {
	ajax('./?app=wodi.function&act=f5mw', function(d) {
		$('joinmyword').innerHTML = d;
	});
}

function joinOut() {
	if (confirm("确定要退出房间吗？")) {
		ajax('./?app=wodi.function&act=jout', function(d) {
			location.reload();
		});
	}
}

function creatOut() {
	if (confirm("确定要销毁房间吗？")) {
		ajax('./?app=wodi.function&act=cout', function(d) {
			location.href = './?app=wodi.main';
		});
	}
}

var tips = {
	show : function(html) {
		if (!$('tips')) {
			var node = document.createElement("span");
			node.id = 'tips';
			document.body.appendChild(node);
		}
		$('tips').innerHTML = html;
	},
	hide : function() {
		if ($('tips'))
			$('tips').style.display = 'none';
	}
};

// ==============================

function touziNum(n) {
	TZNUM += n;
	if (TZNUM < 1)
		TZNUM = 1;
	$('touziNumSpan').innerHTML = TZNUM + '个';
}

var TZTIMES = 0, TZTIMER = null;

function touziStart() {

	if (aniIng == 1)
		return;
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

function rand(Min, Max) {
	var Range = Max - Min;
	var Rand = Math.random();
	return (Min + Math.round(Rand * Range));
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
	var count = Math.floor((obj.length + 1) / 2);

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

function touziSetting(obj, index) {
	obj.className = 'touzi touzi' + index;
}

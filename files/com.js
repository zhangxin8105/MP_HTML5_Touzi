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

//==============================
function rand(Min, Max) {
	var Range = Max - Min;
	var Rand = Math.random();
	return (Min + Math.round(Rand * Range));
}


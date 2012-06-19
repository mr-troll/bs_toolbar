"use strict";
// Мы не можем просто задать событие window.onload=function(), потому что это пожет сломать скрипты пользователя.
// Функция отсюда http://javascript.ru/tutorial/events/crossbrowser
function addEvent( obj, type, fn ) {
	if(obj.attachEvent){
		obj['e'+type+fn] = fn;
		obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
		obj.attachEvent('on'+type, obj[type+fn]);
	}
	else
		obj.addEventListener(type, fn, false);
}

// Список стабильных версий браузеров, которые мы хотим проверить
if(!stable_browsers)
	var stable_browsers={'Explorer':8,'Firefox':12,'Opera':11,'Chrome':10};

var t142_gif_path='http://2s.ru/2012/t142_browser_suggest/browser_logos-32.gif';
var t142_png_path='http://2s.ru/2012/t142_browser_suggest/browser_logos-32.png';

var browser_toolbar_init=function(){
	// Если не в списке - не проверяем
	if(!stable_browsers[BrowserDetect.browser] || stable_browsers[BrowserDetect.browser]<=BrowserDetect.version)
		return;

	// Определяем размеры viewport
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;

	// Нужно задать стили root элемента (<html>) чтобы вся вёрстка пользователя опустилась вниз, при этом не затрагивая его стили body
	// Таким образом, вёрстка основанная на технике "футер всегда внизу" - не сломается.
	// В ie6 работает только padding для root элемента
	document.documentElement.style.paddingTop='28px';
	document.documentElement.style.height=(y-28)+"px";
	// It is just div, but via javascript we can create any element, even in ie6, it's like html5shiv
	// so, we must be certain that the page hasnt anything style for this element already.
	var toolbar = document.createElement("browser");
	toolbar.style.display='block';

	toolbar.style.position='absolute';
	toolbar.style.top='28px';
	// Чтобы растянуть блок по ширине в нормальных браузерах используем такую конструкцию
	toolbar.style.left='0';
	toolbar.style.right='0';
 	if(x < 1024){
		toolbar.style.overflow='hidden';
	}


	// Увы, старый IE её не понимает. Приходится задавать принудительно.
	if(BrowserDetect.browser=='Explorer' && BrowserDetect.version<=7)
		toolbar.style.width=(x-20)+'px';
	toolbar.style.padding="0 10px";
	toolbar.style.height='28px';
	toolbar.style.zIndex='42'; // Ответ на главный вопрос жизни, вселенной и всего такого
	toolbar.style.font='14px/28px Tahoma,Arial,sans-serif';

	toolbar.style.marginTop='-28px';
	toolbar.style.backgroundImage="url(data:image/gif;base64,R0lGODlhAQAfAMQAAPP19/X3+PT2+Onu8Ovu8ent8GZmZvH09u7y9OHm6tfe4+Po6+bs7/L19vP29+zw8t/k6OXp7efr7u3w8+/y9PH09eXr7tjf5Nrh5ejt8Orv8d3j5+vv8u3x8/Dz9QAAACH5BAAAAAAALAAAAAABAB8AQAUZYPBcRZUlh4No1hZNhtB4HTcwCgYtEkEBIQA7)";

	if(BrowserDetect.browser=='Explorer' && BrowserDetect.version<=7){
		toolbar.style.backgroundColor="#d7dee3";
		toolbar.style.filter="progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffd8d9', endColorstr='#ff8844')";
	}

	var style = document.createElement('style'),
		rules = document.createTextNode('.browser_suggest_icon {background:url('+t142_png_path+');-background-image:url('+t142_gif_path+');display:inline-block;width:35px;height:32px;vertical-align:top;text-decoration:none;}');
	style.type = 'text/css';
	if(style.styleSheet)
		style.styleSheet.cssText = rules.nodeValue;
	else style.appendChild(rules);
	document.getElementsByTagName('head')[0].appendChild(style);

	// Стили для иконок
	var chrome_icon='<a title="Chrome" class="browser_suggest_icon" href="https://www.google.com/chrome?hl=ru" >&nbsp;</a> ',
		firefox_icon='<a title="Firefox" class="browser_suggest_icon" href="http://www.mozilla.org/ru/firefox/fx/" style="background-position:-35px 0;">&nbsp;</a> ',
		opera_icon='<a title="Opera" class="browser_suggest_icon" href="http://www.opera.com/download/" style="background-position:-70px 0;">&nbsp;</a> ',
		safari_icon='<a title="Safari" class="browser_suggest_icon" href="http://www.mozilla.org/" style="background-position:-105px 0;">&nbsp;</a> ',
		ie_icon='<a title="IE 9" class="browser_suggest_icon" href="http://www.microsoft.com/en-us/download/default.aspx" style="background-position:-140px 0;">&nbsp;</a> ';

	if(BrowserDetect.browser=='Explorer' || stable_browsers[BrowserDetect.browser]<=BrowserDetect.version){
		var windows=''
		if(navigator.userAgent.indexOf("Windows NT 5.0")>0 || navigator.userAgent.indexOf("windows NT 2000")>0)
			windows='2000';
		else if(navigator.userAgent.indexOf("Windows NT 5.1")>0)
			windows='xp';
		else if(navigator.userAgent.indexOf("Windows NT 6.0")>0)
			windows='vista';
		else if(navigator.userAgent.indexOf("Windows NT 6.1")>0)
			windows='seven';
		else return;

		if(windows=='xp' || windows=='2000'){
			toolbar.innerHTML='<span style="display:inline-block;height:30px;">Your browser - '+ie_icon+BrowserDetect.browser+" "+BrowserDetect.version+' is out of date! It doesn\'t reach speed of modern browsers. Please consider to download one of this: '+chrome_icon+firefox_icon+ opera_icon+'</span>';
		}
		else if(windows=='seven' || windows=='vista'){
  			toolbar.innerHTML='<span style="display:inline-block;height:30px;">Update your browser - '+ie_icon+BrowserDetect.browser+" "+BrowserDetect.version+' to latest version '+stable_browsers[BrowserDetect.browser]+'. You can use Windows Update or <a href="http://www.microsoft.com/en-us/download/default.aspx">Microsoft</a> download link. Or try one of modern browsers: '+chrome_icon+ firefox_icon+ opera_icon+'</span>';
		}
	}
	else if(BrowserDetect.browser=='Chrome'){
  		toolbar.innerHTML='<span style="display:inline-block;height:30px;">Update your browser - '+chrome_icon+BrowserDetect.browser+" "+BrowserDetect.version+' to latest version '+stable_browsers[BrowserDetect.browser]+'. Use browser menu  "About Google Chrome" or <a href="https://www.google.com/chrome?hl=ru">Google</a> download link. </span>';
	}
	else if(BrowserDetect.browser=='Safari'){
  		toolbar.innerHTML='<span style="display:inline-block;height:30px;">Please, update your browser - '+safari_icon+BrowserDetect.browser+" "+BrowserDetect.version+', to version '+stable_browsers[BrowserDetect.browser]+'. </span>';
	}
	else if(BrowserDetect.browser=='Firefox'){
		toolbar.innerHTML='<span style="display:inline-block;height:30px;">We recommend you to update your browser, '+firefox_icon+BrowserDetect.browser+" "+BrowserDetect.version+' to latest version '+stable_browsers[BrowserDetect.browser]+'. Use browser menu "Help » About Firefox". Or  <a href="http://www.mozilla.org/ru/firefox/fx/">Mozilla</a> download link. </span>';
	}
	else if(BrowserDetect.browser=='Opera'){
		toolbar.innerHTML='<span style="display:inline-block;height:30px;">Update your browser - '+opera_icon+BrowserDetect.browser+" "+BrowserDetect.version+', to latest version '+stable_browsers[BrowserDetect.browser]+'. Use browser menu "Help » Check for updates" or <a href="http://www.opera.com/download/">Opera Software</a> download link.  </span>';
	}
	else{
  		toolbar.innerHTML='<span style="display:inline-block;height:30px;">Please, update your browser, '+BrowserDetect.browser+" "+BrowserDetect.version+', to version '+stable_browsers[BrowserDetect.browser]+', that is more suitable for this site. </span>';
	}

	if(BrowserDetect.browser=='Explorer' && BrowserDetect.version<=7){
		var theFirstChild = document.body.firstChild;
		document.body.insertBefore(toolbar, theFirstChild);
	}
	else {
		// Чтобы все абсолютно позиционированные элементы - не сломались
		document.body.style.position='relative';
		// Добавляем тулбар в <html>, а не в body, чтобы максимально не трогать вёрстку пользователя
		// Кроме того у body может быть задан margin, padding и прочее... а <html> обычно чист
		document.documentElement.insertBefore(toolbar, document.body);
		// Можно писать и document.documentElement.appendChild(toolbar);
	}
};

// By PPK - http://www.quirksmode.org/js/detect.html
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion) || "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{string: navigator.userAgent,subString: "Chrome",identity: "Chrome"},
		{string: navigator.userAgent,subString: "OmniWeb",versionSearch: "OmniWeb/",identity: "OmniWeb"},
		{string: navigator.vendor,subString: "Apple",identity: "Safari",versionSearch: "Version"},
		{prop: window.opera,identity: "Opera",versionSearch: "Version"},
		{string: navigator.vendor,subString: "iCab",identity: "iCab"},
		{string: navigator.vendor,subString: "KDE",identity: "Konqueror"},
		{string: navigator.userAgent,subString: "Firefox",identity: "Firefox"},
		{string: navigator.vendor,subString: "Camino",identity: "Camino"},
		// for newer Netscapes (6+)
		{string: navigator.userAgent,subString: "Netscape",identity: "Netscape"},
		{string: navigator.userAgent,subString: "MSIE",identity: "Explorer",versionSearch: "MSIE"},
		{string: navigator.userAgent,subString: "Gecko",identity: "Mozilla",versionSearch: "rv"},
		// for older Netscapes (4-)
		{string: navigator.userAgent,subString: "Mozilla",identity: "Netscape",versionSearch: "Mozilla"}
	],
	dataOS : [
		{string: navigator.platform,subString: "Win",identity: "Windows"},
		{string: navigator.platform,subString: "Mac",identity: "Mac"},
		{string: navigator.userAgent,subString: "iPhone",identity: "iPhone/iPod"},
		{string: navigator.platform,subString: "Linux",identity: "Linux"}
	]

};
BrowserDetect.init();

// If we run this script from Bookmark menu, then window.onload already fired.
if (document.readyState == "complete") {
	browser_toolbar_init();
}
else {
	// Normally attaching event
	addEvent( window, 'load',function(){
		browser_toolbar_init();
	});
}

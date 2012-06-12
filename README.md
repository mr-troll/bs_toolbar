Hi,
=

This script is a Avesome_Browser_Detection_And_Suggestion_Toolbar_Script, short is bs_toolbar. It checks version of browser, shows toolbar if version is outdated.
____

1. English 
=


Demo
==========

* http://2s.ru/2012/t142_browser_suggest/demo1_en.html
* http://2s.ru/2012/t142_browser_suggest/demo2_en.html
* http://2s.ru/2012/t142_browser_suggest/demo_bookmark_en.html - demo with bookmark, which you can add to browser bar, and test every site with it

Usage:
==========
    
Just place the script in your html code, like this:
    
    <script>
    // this is High browser versions for demo. By default script use ie8, ff4,opera11 and chrome 10
    var stable_browsers={'Explorer':10,'Firefox':20,'Opera':12,'Chrome':22};
    </script>
    <script type="text/javascript" src="http://2s.ru/2012/t142_browser_suggest/browser_suggest_en.js"></script>
___

2. Russian
==========

Данный скрипт создаёт на странице Тулбар, который будет показывать пользователю предложение обновить браузер, если у него старое говно.

Demo
==========

* http://2s.ru/2012/t142_browser_suggest/demo1_ru.html — обычная страница с body margin:10px; и border-top. Можно видеть что тулбар не влияет на все внутренние отступы у body.
* http://2s.ru/2012/t142_browser_suggest/demo2_ru.html — demo, с футером, который всегда внизу =)
* http://2s.ru/2012/t142_browser_suggest/demo_bookmark_ru.html — демо, где вы можете добавить букмарк, на панель закладок и с её помощью примерить тулбар на любой сайт.

Использование:
==========

Просто добавьте в html код страницы ссылку:

    <script>
    // В скрипте, для примера сейчас список стабильных версий специально завышен. Чтобы сейчас любом браузере можно посмотреть результат, в качестве стабильных в demo используются версии:
    // this is High browser versions for demo. By default script use ie8, ff4,opera11 and chrome 10
    var stable_browsers={'Explorer':10,'Firefox':20,'Opera':12,'Chrome':22};
    </script>
    <script charset="windows-1251" type="text/javascript" src="http://2s.ru/2012/t142_browser_suggest/browser_suggest_ru.js"></script>

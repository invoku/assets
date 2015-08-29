//ias
(function(b){b.ias=function(d){var m=b.extend({},b.ias.defaults,d);var c=new b.ias.util();var j=new b.ias.paging();var h=(m.history?new b.ias.history():false);var f=this;r();function r(){j.onChangePage(function(x,v,w){if(h){h.setPage(x,w)}m.onPageChange.call(this,x,w,v)});s();if(h&&h.havePage()){q();pageNum=h.getPage();c.forceScrollTop(function(){if(pageNum>1){l(pageNum);curTreshold=p(true);b("html,body").scrollTop(curTreshold)}else{s()}})}return f}function s(){n();b(window).scroll(g)}function g(){scrTop=b(window).scrollTop();wndHeight=b(window).height();curScrOffset=scrTop+wndHeight;if(curScrOffset>=p()){t(curScrOffset)}}function q(){b(window).unbind("scroll",g)}function n(){b(m.pagination).hide()}function p(v){el=b(m.container).find(m.item).last();if(el.size()==0){return 0}treshold=el.offset().top+el.height();if(!v){treshold+=m.tresholdMargin}return treshold}function t(w,v){urlNextPage=b(m.next).attr("href");if(!urlNextPage){return q()}j.pushPages(w,urlNextPage);q();o();e(urlNextPage,function(y,x){result=m.onLoadItems.call(this,x);if(result!==false){b(x).hide();curLastItem=b(m.container).find(m.item).last();curLastItem.after(x);b(x).fadeIn()}b(m.pagination).replaceWith(b(m.pagination,y));k();s();m.onRenderComplete.call(this,x);if(v){v.call(this)}})}function e(w,x){var v=[];b.get(w,null,function(y){b(m.container,y).find(m.item).each(function(){v.push(this)});if(x){x.call(this,y,v)}},"html")}function l(v){curTreshold=p(true);if(curTreshold>0){t(curTreshold,function(){q();if((j.getCurPageNum(curTreshold)+1)<v){l(v);b("html,body").animate({scrollTop:curTreshold},400,"swing")}else{b("html,body").animate({scrollTop:curTreshold},1000,"swing");s()}})}}function u(){loader=b(".ias_loader");if(loader.size()==0){loader=b("<div class='ias_loader'>"+m.loader+"</div>");loader.hide()}return loader}function o(v){loader=u();el=b(m.container).find(m.item).last();el.after(loader);loader.fadeIn()}function k(){loader=u();loader.remove()}};function a(c){if(window.console&&window.console.log){window.console.log(c)}}b.ias.defaults={container:"#container",item:".item",pagination:"#pagination",next:".next",loader:'<img src="images/loader.gif"/>',tresholdMargin:0,history:true,onPageChange:function(){},onLoadItems:function(){},onRenderComplete:function(){},};b.ias.util=function(){var d=false;var f=false;var c=this;e();function e(){b(window).load(function(){d=true})}this.forceScrollTop=function(g){b("html,body").scrollTop(0);if(!f){if(!d){setTimeout(function(){c.forceScrollTop(g)},1)}else{g.call();f=true}}}};b.ias.paging=function(){var e=[[0,document.location.toString()]];var h=function(){};var d=1;j();function j(){b(window).scroll(g)}function g(){scrTop=b(window).scrollTop();wndHeight=b(window).height();curScrOffset=scrTop+wndHeight;curPageNum=c(curScrOffset);curPagebreak=f(curScrOffset);if(d!=curPageNum){h.call(this,curPageNum,curPagebreak[0],curPagebreak[1])}d=curPageNum}function c(k){for(i=(e.length-1);i>0;i--){if(k>e[i][0]){return i+1}}return 1}this.getCurPageNum=function(k){return c(k)};function f(k){for(i=(e.length-1);i>=0;i--){if(k>e[i][0]){return e[i]}}return null}this.onChangePage=function(k){h=k};this.pushPages=function(k,l){e.push([k,l])}};b.ias.history=function(){var d=false;var c=false;e();function e(){c=!!(window.history&&history.pushState&&history.replaceState);c=false}this.setPage=function(g,f){this.updateState({page:g},"",f)};this.havePage=function(){return(this.getState()!=false)};this.getPage=function(){if(this.havePage()){stateObj=this.getState();return stateObj.page}return 1};this.getState=function(){if(c){stateObj=history.state;if(stateObj&&stateObj.ias){return stateObj.ias}}else{haveState=(window.location.hash.substring(0,7)=="#/page/");if(haveState){pageNum=parseInt(window.location.hash.replace("#/page/",""));return{page:pageNum}}}return false};this.updateState=function(g,h,f){if(d){this.replaceState(g,h,f)}else{this.pushState(g,h,f)}};this.pushState=function(g,h,f){if(c){history.pushState({ias:g},h,f)}else{hash=(g.page>0?"#/page/"+g.page:"");window.location.hash=hash}d=true};this.replaceState=function(g,h,f){if(c){history.replaceState({ias:g},h,f)}else{this.pushState(g,h,f)}}}})(jQuery);
//timeago
!function(a){"function"===typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){function d(){if(!a.contains(document.documentElement,this))return a(this).timeago("dispose"),this;var c=e(this),d=b.settings;return isNaN(c.datetime)||(0==d.cutoff||Math.abs(g(c.datetime))<d.cutoff)&&a(this).text(f(c.datetime)),this}function e(c){if(c=a(c),!c.data("timeago")){c.data("timeago",{datetime:b.datetime(c)});var d=a.trim(c.text());b.settings.localeTitle?c.attr("title",c.data("timeago").datetime.toLocaleString()):!(d.length>0)||b.isTime(c)&&c.attr("title")||c.attr("title",d)}return c.data("timeago")}function f(a){return b.inWords(g(a))}function g(a){return(new Date).getTime()-a.getTime()}a.timeago=function(b){return f(b instanceof Date?b:"string"===typeof b?a.timeago.parse(b):"number"===typeof b?new Date(b):a.timeago.datetime(b))};var b=a.timeago;a.extend(a.timeago,{settings:{refreshMillis:6e4,allowPast:!0,allowFuture:!1,localeTitle:!1,cutoff:0,strings:{prefixAgo:null,prefixFromNow:null,suffixAgo:"ago",suffixFromNow:"from now",inPast:"any moment now",seconds:"less than a minute",minute:"about a minute",minutes:"%d minutes",hour:"about an hour",hours:"about %d hours",day:"a day",days:"%d days",month:"about a month",months:"%d months",year:"about a year",years:"%d years",wordSeparator:" ",numbers:[]}},inWords:function(b){function k(d,e){var f=a.isFunction(d)?d(e,b):d,g=c.numbers&&c.numbers[e]||e;return f.replace(/%d/i,g)}if(!this.settings.allowPast&&!this.settings.allowFuture)throw"timeago allowPast and allowFuture settings can not both be set to false.";var c=this.settings.strings,d=c.prefixAgo,e=c.suffixAgo;if(this.settings.allowFuture&&b<0&&(d=c.prefixFromNow,e=c.suffixFromNow),!this.settings.allowPast&&b>=0)return this.settings.strings.inPast;var f=Math.abs(b)/1e3,g=f/60,h=g/60,i=h/24,j=i/365,l=f<45&&k(c.seconds,Math.round(f))||f<90&&k(c.minute,1)||g<45&&k(c.minutes,Math.round(g))||g<90&&k(c.hour,1)||h<24&&k(c.hours,Math.round(h))||h<42&&k(c.day,1)||i<30&&k(c.days,Math.round(i))||i<45&&k(c.month,1)||i<365&&k(c.months,Math.round(i/30))||j<1.5&&k(c.year,1)||k(c.years,Math.round(j)),m=c.wordSeparator||"";return void 0===c.wordSeparator&&(m=" "),a.trim([d,l,e].join(m))},parse:function(b){var c=a.trim(b);return c=c.replace(/\.\d+/,""),c=c.replace(/-/,"/").replace(/-/,"/"),c=c.replace(/T/," ").replace(/Z/," UTC"),c=c.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"),c=c.replace(/([\+\-]\d\d)$/," $100"),new Date(c)},datetime:function(c){var d=a(c).attr(b.isTime(c)?"datetime":"title");return b.parse(d)},isTime:function(b){return"time"===a(b).get(0).tagName.toLowerCase()}});var c={init:function(){var c=a.proxy(d,this);c();var e=b.settings;e.refreshMillis>0&&(this._timeagoInterval=setInterval(c,e.refreshMillis))},update:function(c){var e=b.parse(c);a(this).data("timeago",{datetime:e}),b.settings.localeTitle&&a(this).attr("title",e.toLocaleString()),d.apply(this)},updateFromDOM:function(){a(this).data("timeago",{datetime:b.parse(a(this).attr(b.isTime(this)?"datetime":"title"))}),d.apply(this)},dispose:function(){this._timeagoInterval&&(window.clearInterval(this._timeagoInterval),this._timeagoInterval=null)}};a.fn.timeago=function(a,b){var d=a?c[a]:c.init;if(!d)throw new Error("Unknown function name '"+a+"' for timeago");return this.each(function(){d.call(this,b)}),this},document.createElement("abbr"),document.createElement("time")});
//Cookie
!function(a){"use strict";var b=function(){this.destroy=function(a){return this.write(a,"",-1)},this.read=function(a){var b=new RegExp("(^|; )"+encodeURIComponent(a)+"=(.*?)($|;)"),c=document.cookie.match(b);return c?decodeURIComponent(c[2]):null},this.write=function(a,b,c,d,e,f){var g=new Date;return c&&"number"==typeof c?g.setTime(g.getTime()+1e3*c):c=null,document.cookie=encodeURIComponent(a)+"="+encodeURIComponent(b)+(c?"; expires="+g.toGMTString():"")+"; path="+(d?d:"/")+(e?"; domain="+e:"")+(f?"; secure":"")}};a.cookie=new b}(jQuery);

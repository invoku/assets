;
(function($,g,h,i)
	{
	var j='sharrre',defaults=
		{
		className:'sharrre',share:
			{
			googlePlus:false,facebook:false,twitter:false,digg:false,delicious:false,stumbleupon:false,linkedin:false,pinterest:false
		}
		,shareTotal:0,template:'',title:'',url:h.location.href,text:h.title,urlCurl:'sharrre.php',count:
			{
		}
		,total:0,shorterTotal:true,enableHover:true,enableCounter:true,enableTracking:false,hover:function()
			{
		}
		,hide:function()
			{
		}
		,click:function()
			{
		}
		,render:function()
			{
		}
		,buttons:
			{
			googlePlus:
				{
				url:'',urlCount:false,size:'medium',lang:'en-US',annotation:''
			}
			,facebook:
				{
				url:'',urlCount:false,action:'like',layout:'button_count',width:'',send:'false',faces:'false',colorscheme:'',font:'',lang:'en_US'
			}
			,twitter:
				{
				url:'',urlCount:false,count:'horizontal',hashtags:'',via:'',related:'',lang:'en'
			}
			,digg:
				{
				url:'',urlCount:false,type:'DiggCompact'
			}
			,delicious:
				{
				url:'',urlCount:false,size:'medium'
			}
			,stumbleupon:
				{
				url:'',urlCount:false,layout:'1'
			}
			,linkedin:
				{
				url:'',urlCount:false,counter:''
			}
			,pinterest:
				{
				url:'',media:'',description:'',layout:'horizontal'
			}
		}
	}
	,urlJson=
		{
		googlePlus:"",facebook:"https://graph.facebook.com/fql?q=SELECT%20url,%20normalized_url,%20share_count,%20like_count,%20comment_count,%20total_count,commentsbox_count,%20comments_fbid,%20click_count%20FROM%20link_stat%20WHERE%20url=%27
			{
			url
		}
		%27&callback=?",twitter:"http://cdn.api.twitter.com/1/urls/count.json?url=
			{
			url
		}
		&callback=?",digg:"http://services.digg.com/2.0/story.getInfo?links=
			{
			url
		}
		&type=javascript&callback=?",delicious:'http://feeds.delicious.com/v2/json/urlinfo/data?url=
			{
			url
		}
		&callback=?',stumbleupon:"",linkedin:"http://www.linkedin.com/countserv/count/share?format=jsonp&url=
			{
			url
		}
		&callback=?",pinterest:""
	}
	,loadButton=
		{
		googlePlus:function(b)
			{
			var c=b.options.buttons.googlePlus;
			$(b.element).find('.buttons').append('<div class="button googleplus"><div class="g-plusone" data-size="'+c.size+'" data-href="'+(c.url!==''?c.url:b.options.url)+'" data-annotation="'+c.annotation+'"></div></div>');
			g.___gcfg=
				{
				lang:b.options.buttons.googlePlus.lang
			};
			var d=0;
			if(typeof gapi==='undefined'&&d==0)
				{
				d=1;
				(function()
					{
					var a=h.createElement('script');
					a.type='text/javascript';
					a.async=true;
					a.src='//apis.google.com/js/plusone.js';
					var s=h.getElementsByTagName('script')[0];
					s.parentNode.insertBefore(a,s)
				}
				)()
			}
			else
				{
				gapi.plusone.go()
			}
		}
		,facebook:function(c)
			{
			var e=c.options.buttons.facebook;
			$(c.element).find('.buttons').append('<div class="button facebook"><div id="fb-root"></div><div class="fb-like" data-href="'+(e.url!==''?e.url:c.options.url)+'" data-send="'+e.send+'" data-layout="'+e.layout+'" data-width="'+e.width+'" data-show-faces="'+e.faces+'" data-action="'+e.action+'" data-colorscheme="'+e.colorscheme+'" data-font="'+e.font+'" data-via="'+e.via+'"></div></div>');
			var f=0;
			if(typeof FB==='undefined'&&f==0)
				{
				f=1;
				(function(d,s,a)
					{
					var b,fjs=d.getElementsByTagName(s)[0];
					if(d.getElementById(a))
						{
						return
					}
					b=d.createElement(s);
					b.id=a;
					b.src='//connect.facebook.net/'+e.lang+'/all.js#xfbml=1';
					fjs.parentNode.insertBefore(b,fjs)
				}
				(h,'script','facebook-jssdk'))
			}
			else
				{
				FB.XFBML.parse()
			}
		}
		,twitter:function(b)
			{
			var c=b.options.buttons.twitter;
			$(b.element).find('.buttons').append('<div class="button twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-url="'+(c.url!==''?c.url:b.options.url)+'" data-count="'+c.count+'" data-text="'+b.options.text+'" data-via="'+c.via+'" data-hashtags="'+c.hashtags+'" data-related="'+c.related+'" data-lang="'+c.lang+'">Tweet</a></div>');
			var d=0;
			if(typeof twttr==='undefined'&&d==0)
				{
				d=1;
				(function()
					{
					var a=h.createElement('script');
					a.type='text/javascript';
					a.async=true;
					a.src='//platform.twitter.com/widgets.js';
					var s=h.getElementsByTagName('script')[0];
					s.parentNode.insertBefore(a,s)
				}
				)()
			}
			else
				{
				$.ajax(
					{
					url:'//platform.twitter.com/widgets.js',dataType:'script',cache:true
				}
				)
			}
		}
		,digg:function(a)
			{
			var b=a.options.buttons.digg;
			$(a.element).find('.buttons').append('<div class="button digg"><a class="DiggThisButton '+b.type+'" rel="nofollow external" href="http://digg.com/submit?url='+encodeURIComponent((b.url!==''?b.url:a.options.url))+'"></a></div>');
			var c=0;
			if(typeof __DBW==='undefined'&&c==0)
				{
				c=1;
				(function()
					{
					var s=h.createElement('SCRIPT'),s1=h.getElementsByTagName('SCRIPT')[0];
					s.type='text/javascript';
					s.async=true;
					s.src='//widgets.digg.com/buttons.js';
					s1.parentNode.insertBefore(s,s1)
				}
				)()
			}
		}
		,delicious:function(a)
			{
			if(a.options.buttons.delicious.size=='tall')
				{
				var b='width:50px;
				',cssCount='height:35px;
				width:50px;
				font-size:15px;
				line-height:35px;
				',cssShare='height:18px;
				line-height:18px;
				margin-top:3px;
				'
			}
			else
				{
				var b='width:93px;
				',cssCount='float:right;
				padding:0 3px;
				height:20px;
				width:26px;
				line-height:20px;
				',cssShare='float:left;
				height:20px;
				line-height:20px;
				'
			}
			var c=a.shorterTotal(a.options.count.delicious);
			if(typeof c==="undefined")
				{
				c=0
			}
			$(a.element).find('.buttons').append('<div class="button delicious"><div style="'+b+'font:12px Arial,Helvetica,sans-serif;
			cursor:pointer;
			color:#666666;
			display:inline-block;
			float:none;
			height:20px;
			line-height:normal;
			margin:0;
			padding:0;
			text-indent:0;
			vertical-align:baseline;
			">'+'<div style="'+cssCount+'background-color:#fff;
			margin-bottom:5px;
			overflow:hidden;
			text-align:center;
			border:1px solid #ccc;
			border-radius:3px;
			">'+c+'</div>'+'<div style="'+cssShare+'display:block;
			padding:0;
			text-align:center;
			text-decoration:none;
			width:50px;
			background-color:#7EACEE;
			border:1px solid #40679C;
			border-radius:3px;
			color:#fff;
			">'+'<img src="http://www.delicious.com/static/img/delicious.small.gif" height="10" width="10" alt="Delicious" /> Add</div></div></div>');
			$(a.element).find('.delicious').on('click',function()
				{
				a.openPopup('delicious')
			}
			)
		}
		,stumbleupon:function(b)
			{
			var c=b.options.buttons.stumbleupon;
			$(b.element).find('.buttons').append('<div class="button stumbleupon"><su:badge layout="'+c.layout+'" location="'+(c.url!==''?c.url:b.options.url)+'"></su:badge></div>');
			var d=0;
			if(typeof STMBLPN==='undefined'&&d==0)
				{
				d=1;
				(function()
					{
					var a=h.createElement('script');
					a.type='text/javascript';
					a.async=true;
					a.src='//platform.stumbleupon.com/1/widgets.js';
					var s=h.getElementsByTagName('script')[0];
					s.parentNode.insertBefore(a,s)
				}
				)();
				s=g.setTimeout(function()
					{
					if(typeof STMBLPN!=='undefined')
						{
						STMBLPN.processWidgets();
						clearInterval(s)
					}
				}
				,500)
			}
			else
				{
				STMBLPN.processWidgets()
			}
		}
		,linkedin:function(b)
			{
			var c=b.options.buttons.linkedin;
			$(b.element).find('.buttons').append('<div class="button linkedin"><script type="in/share" data-url="'+(c.url!==''?c.url:b.options.url)+'" data-counter="'+c.counter+'"></script></div>');
			var d=0;
			if(typeof g.IN==='undefined'&&d==0)
				{
				d=1;
				(function()
					{
					var a=h.createElement('script');
					a.type='text/javascript';
					a.async=true;
					a.src='//platform.linkedin.com/in.js';
					var s=h.getElementsByTagName('script')[0];
					s.parentNode.insertBefore(a,s)
				}
				)()
			}
			else
				{
				g.IN.init()
			}
		}
		,pinterest:function(b)
			{
			var c=b.options.buttons.pinterest;
			$(b.element).find('.buttons').append('<div class="button pinterest"><a href="http://pinterest.com/pin/create/button/?url='+(c.url!==''?c.url:b.options.url)+'&media='+c.media+'&description='+c.description+'" class="pin-it-button" count-layout="'+c.layout+'">Pin It</a></div>');
			(function()
				{
				var a=h.createElement('script');
				a.type='text/javascript';
				a.async=true;
				a.src='//assets.pinterest.com/js/pinit.js';
				var s=h.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(a,s)
			}
			)()
		}
	}
	,tracking=
		{
		googlePlus:function()
			{
		}
		,facebook:function()
			{
			fb=g.setInterval(function()
				{
				if(typeof FB!=='undefined')
					{
					FB.Event.subscribe('edge.create',function(a)
						{
						_gaq.push(['_trackSocial','facebook','like',a])
					}
					);
					FB.Event.subscribe('edge.remove',function(a)
						{
						_gaq.push(['_trackSocial','facebook','unlike',a])
					}
					);
					FB.Event.subscribe('message.send',function(a)
						{
						_gaq.push(['_trackSocial','facebook','send',a])
					}
					);
					clearInterval(fb)
				}
			}
			,1000)
		}
		,twitter:function()
			{
			tw=g.setInterval(function()
				{
				if(typeof twttr!=='undefined')
					{
					twttr.events.bind('tweet',function(a)
						{
						if(a)
							{
							_gaq.push(['_trackSocial','twitter','tweet'])
						}
					}
					);
					clearInterval(tw)
				}
			}
			,1000)
		}
		,digg:function()
			{
		}
		,delicious:function()
			{
		}
		,stumbleupon:function()
			{
		}
		,linkedin:function()
			{
			function LinkedInShare()
				{
				_gaq.push(['_trackSocial','linkedin','share'])
			}
		}
		,pinterest:function()
			{
		}
	}
	,popup=
		{
		googlePlus:function(a)
			{
			g.open("https://plus.google.com/share?hl="+a.buttons.googlePlus.lang+"&url="+encodeURIComponent((a.buttons.googlePlus.url!==''?a.buttons.googlePlus.url:a.url)),"","toolbar=0, status=0, width=900, height=500")
		}
		,facebook:function(a)
			{
			g.open("http://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent((a.buttons.facebook.url!==''?a.buttons.facebook.url:a.url))+"&t="+a.text+"","","toolbar=0, status=0, width=900, height=500")
		}
		,twitter:function(a)
			{
			g.open("https://twitter.com/intent/tweet?text="+encodeURIComponent(a.text)+"&url="+encodeURIComponent((a.buttons.twitter.url!==''?a.buttons.twitter.url:a.url))+(a.buttons.twitter.via!==''?'&via='+a.buttons.twitter.via:''),"","toolbar=0, status=0, width=650, height=360")
		}
		,digg:function(a)
			{
			g.open("http://digg.com/tools/diggthis/submit?url="+encodeURIComponent((a.buttons.digg.url!==''?a.buttons.digg.url:a.url))+"&title="+a.text+"&related=true&style=true","","toolbar=0, status=0, width=650, height=360")
		}
		,delicious:function(a)
			{
			g.open('http://www.delicious.com/save?v=5&noui&jump=close&url='+encodeURIComponent((a.buttons.delicious.url!==''?a.buttons.delicious.url:a.url))+'&title='+a.text,'delicious','toolbar=no,width=550,height=550')
		}
		,stumbleupon:function(a)
			{
			g.open('http://www.stumbleupon.com/badge/?url='+encodeURIComponent((a.buttons.delicious.url!==''?a.buttons.delicious.url:a.url)),'stumbleupon','toolbar=no,width=550,height=550')
		}
		,linkedin:function(a)
			{
			g.open('https://www.linkedin.com/cws/share?url='+encodeURIComponent((a.buttons.delicious.url!==''?a.buttons.delicious.url:a.url))+'&token=&isFramed=true','linkedin','toolbar=no,width=550,height=550')
		}
		,pinterest:function(a)
			{
			g.open('http://pinterest.com/pin/create/button/?url='+encodeURIComponent((a.buttons.pinterest.url!==''?a.buttons.pinterest.url:a.url))+'&media='+encodeURIComponent(a.buttons.pinterest.media)+'&description='+a.buttons.pinterest.description,'pinterest','toolbar=no,width=700,height=300')
		}
	};
	function Plugin(a,b)
		{
		this.element=a;
		this.options=$.extend(true,
			{
		}
		,defaults,b);
		this.options.share=b.share;
		this._defaults=defaults;
		this._name=j;
		this.init()
	};
	Plugin.prototype.init=function()
		{
		var c=this;
		if(this.options.urlCurl!=='')
			{
			urlJson.googlePlus=this.options.urlCurl+'?url=
				{
				url
			}
			&type=googlePlus';
			urlJson.stumbleupon=this.options.urlCurl+'?url=
				{
				url
			}
			&type=stumbleupon';
			urlJson.pinterest=this.options.urlCurl+'?url=
				{
				url
			}
			&type=pinterest'
		}
		$(this.element).addClass(this.options.className);
		if(typeof $(this.element).data('title')!=='undefined')
			{
			this.options.title=$(this.element).attr('data-title')
		}
		if(typeof $(this.element).data('url')!=='undefined')
			{
			this.options.url=$(this.element).data('url')
		}
		if(typeof $(this.element).data('text')!=='undefined')
			{
			this.options.text=$(this.element).data('text')
		}
		$.each(this.options.share,function(a,b)
			{
			if(b===true)
				{
				c.options.shareTotal++
			}
		}
		);
		if(c.options.enableCounter===true)
			{
			$.each(this.options.share,function(a,b)
				{
				if(b===true)
					{
					try
						{
						c.getSocialJson(a)
					}
					catch(e)
						{
					}
				}
			}
			)
		}
		else if(c.options.template!=='')
			{
			this.options.render(this,this.options)
		}
		else
			{
			this.loadButtons()
		}
		$(this.element).hover(function()
			{
			if($(this).find('.buttons').length===0&&c.options.enableHover===true)
				{
				c.loadButtons()
			}
			c.options.hover(c,c.options)
		}
		,function()
			{
			c.options.hide(c,c.options)
		}
		);
		$(this.element).click(function()
			{
			c.options.click(c,c.options);
			return false
		}
		)
	};
	Plugin.prototype.loadButtons=function()
		{
		var c=this;
		$(this.element).append('<div class="buttons"></div>');
		$.each(c.options.share,function(a,b)
			{
			if(b==true)
				{
				loadButton[a](c);
				if(c.options.enableTracking===true)
					{
					tracking[a]()
				}
			}
		}
		)
	};
	Plugin.prototype.getSocialJson=function(c)
		{
		var d=this,count=0,url=urlJson[c].replace('
			{
			url
		}
		',encodeURIComponent(this.options.url));
		if(this.options.buttons[c].urlCount===true&&this.options.buttons[c].url!=='')
			{
			url=urlJson[c].replace('
				{
				url
			}
			',this.options.buttons[c].url)
		}
		if(url!=''&&d.options.urlCurl!=='')
			{
			$.getJSON(url,function(a)
				{
				if(typeof a.count!=="undefined")
					{
					var b=a.count+'';
					b=b.replace('\u00c2\u00a0','');
					count+=parseInt(b,10)
				}
				else if(a.data&&a.data.length>0&&typeof a.data[0].total_count!=="undefined")
					{
					count+=parseInt(a.data[0].total_count,10)
				}
				else if(typeof a.shares!=="undefined")
					{
					count+=parseInt(a.shares,10)
				}
				else if(typeof a[0]!=="undefined")
					{
					count+=parseInt(a[0].total_posts,10)
				}
				else if(typeof a[0]!=="undefined")
					{
				}
				d.options.count[c]=count;
				d.options.total+=count;
				d.renderer();
				d.rendererPerso()
			}
			).error(function()
				{
				d.options.count[c]=0;
				d.rendererPerso()
			}
			)
		}
		else
			{
			d.renderer();
			d.options.count[c]=0;
			d.rendererPerso()
		}
	};
	Plugin.prototype.rendererPerso=function()
		{
		var a=0;
		for(e in this.options.count)
			{
			a++
		}
		if(a===this.options.shareTotal)
			{
			this.options.render(this,this.options)
		}
	};
	Plugin.prototype.renderer=function()
		{
		var a=this.options.total,template=this.options.template;
		if(this.options.shorterTotal===true)
			{
			a=this.shorterTotal(a)
		}
		if(template!=='')
			{
			template=template.replace('
				{
				total
			}
			',a);
			$(this.element).html(template)
		}
		else
			{
			$(this.element).html('<div class="box"><a class="count" href="#">'+a+'</a>'+(this.options.title!==''?'<a class="share" href="#">'+this.options.title+'</a>':'')+'</div>')
		}
	};
	Plugin.prototype.shorterTotal=function(a)
		{
		if(a>=1e6)
			{
			a=(a/1e6).toFixed(2)+"M"
		}
		else if(a>=1e3)
			{
			a=(a/1e3).toFixed(1)+"k"
		}
		return a
	};
	Plugin.prototype.openPopup=function(a)
		{
		popup[a](this.options);
		if(this.options.enableTracking===true)
			{
			var b=
				{
				googlePlus:
					{
					site:'Google',action:'+1'
				}
				,facebook:
					{
					site:'facebook',action:'like'
				}
				,twitter:
					{
					site:'twitter',action:'tweet'
				}
				,digg:
					{
					site:'digg',action:'add'
				}
				,delicious:
					{
					site:'delicious',action:'add'
				}
				,stumbleupon:
					{
					site:'stumbleupon',action:'add'
				}
				,linkedin:
					{
					site:'linkedin',action:'share'
				}
				,pinterest:
					{
					site:'pinterest',action:'pin'
				}
			};
			_gaq.push(['_trackSocial',b[a].site,b[a].action])
		}
	};
	Plugin.prototype.simulateClick=function()
		{
		var a=$(this.element).html();
		$(this.element).html(a.replace(this.options.total,this.options.total+1))
	};
	Plugin.prototype.update=function(a,b)
		{
		if(a!=='')
			{
			this.options.url=a
		}
		if(b!=='')
			{
			this.options.text=b
		}
	};
	$.fn[j]=function(b)
		{
		var c=arguments;
		if(b===i||typeof b==='object')
			{
			return this.each(function()
				{
				if(!$.data(this,'plugin_'+j))
					{
					$.data(this,'plugin_'+j,new Plugin(this,b))
				}
			}
			)
		}
		else if(typeof b==='string'&&b[0]!=='_'&&b!=='init')
			{
			return this.each(function()
				{
				var a=$.data(this,'plugin_'+j);
				if(a instanceof Plugin&&typeof a[b]==='function')
					{
					a[b].apply(a,Array.prototype.slice.call(c,1))
				}
			}
			)
		}
	}
}
)(jQuery,window,document);

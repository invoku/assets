/**
 * TabIt jQuery Plugin
 * 
 * Application Type: Content-Tansformer
 * Author: Julian Burr
 * Version: 1.0
 * Date: 27/05/2015
 *
 * Description:
 * 		Transforms selected elements into nice tab slider
 *		Lets you configure animations and more
 **/

(function ( $ ) {
 
    $.fn.tabIt = function( options ) {
 
 		//General settings
        var settings = $.extend({
			get_tab_label : getTabLabel,
			tab_label_attr : "data-tab-title",
			open_tab_animation : "fly",
			animation_duration : 300,
			auto_open_tab : null
        }, options );
		
		var id = null,
			first_element = this.first(),
			wrap_all = null,
			wrap_tabs = null,
			wrap_contents = null,
			tab_cnt = 0;
			
		function getTabLabel(element){
			//Default function to get the label for tab section
			//Can be overwritten in setting get_tab_label
			var label = element.attr(settings.tab_label_attr);
			return label;
		}
		
		function init(){
			//Initializes tab group
			
			//Create unique group id by counting existing groups and increasing by one
			id = $(".wrap-tabgroup").length + 1;
			
			//Add new groups wrap elements before first element that should be tabbed
			first_element.before("<div class='wrap-tabgroup' id='tabgroup-" + id + "'><div class='wrap-tabs'><div class='wrap-tabs-overlay-left'></div><div class='wrap-tabs-overlay-right'></div><div class='tabs'></div></div><div class='wrap-tab-contents'><div class='tab-contents'></div></div></div>");
			
			//Set up global selectors for this tabgroup
			wrap_all = $("#tabgroup-" + id);
			wrap_tabs = $("#tabgroup-" + id + " .tabs");
			wrap_contents = $("#tabgroup-" + id + " .tab-contents");
		}
		
		function initTabs(){
			//Initialize tabs for the currently set type of animation
			wrap_all.find(".wrap-tab-contents").width(wrap_all.find(".wrap-tab-contents").width()).css({ "overflow":"hidden" });
			switch(settings.open_tab_animation){
				case "slide" :
					//Create slide show container
					wrap_all.find(".tab-content").each(function(){ $(this).width($(this).width()).css({ "float":"left" }); });
					wrap_all.find(".tab-contents").width(wrap_all.find(".tab-content").width() * wrap_all.find(".tab-content").length);
					break;
				case "fly" : //use default structure
				case "fade" : //use default structure
				case "none" : //use default structure
				default :
					//Default setup
					wrap_all.find(".tab-content").each(function(){ $(this).width($(this).width()).css({ "float":"left" }).hide(); });
					break;
			}
			
			//Bind click event to tabs
			wrap_all.on("click", ".tab", function(){
				if($(this).hasClass("tab-active")){
					//Tab already active
					//=> do nothing (to avoid unneccessary animations)
					return;
				}
				openTab($(this).attr("rel"));
			});
			
			if(settings.auto_open_tab){
				//If tab to be opened is defined in the settings, open this tab
				openTab(settings.auto_open_tab);
			} else {
				//Otherwise open first tab
				openTab(wrap_all.find(".tab").first().attr("rel"));
			}
		}
		
		function openTab(id){
			//Open tab 
			//=> just a handler that refers to the animation from the settings
			switch(settings.open_tab_animation){
				case "slide" : openTabSlide(id); break;
				case "fly" : openTabFly(id); break;
				case "fade" : openTabFade(id); break;
				default : openTabPlain(id); break;
			}
		}
		
		function openTabSlide(id){
			//Open tab as a slideshow
			//Determine objects
			var tabobj = $(".tab[rel=" + id + "]");
			var contentobj = $("#" + id);
			//If no content object found, return without doing anything
			if(contentobj.length < 1) return;
			//Remove active class from currently active tab
			wrap_all.find(".tab").removeClass("tab-active");
			//Add to destination tab
			tabobj.addClass("tab-active");
			//Animate content wrapper to destinate position to show requested tab
			wrap_all.find(".tab-contents").animate({ "margin-left":"-" + contentobj.position().left + "px" });
		}
		
		function openTabFly(id){
			//Open tab flying in from the side
			//Determine objects
			var tabobj = $(".tab[rel=" + id + "]");
			var contentobj = $("#" + id);
			var activeobj = getCurrentTabContent();
			//Remove active class from currently active tab
			wrap_all.find(".tab").removeClass("tab-active");
			//Add to destination tab
			tabobj.addClass("tab-active");
			//Slide active content out of sight
			if(activeobj.length > 0){
				activeobj.animate({ "margin-left":"-" + activeobj.width() + "px" }, settings.animation_duration, function(){
					//And fly requested content in afterwards
					activeobj.hide().css({ "margin-left":"" });
					contentobj.css({ "margin-left":contentobj.width() + "px" }).show().animate({ "margin-left":0 }, settings.animation_duration);
					
				});
			} else {
				contentobj.css({ "margin-left":contentobj.width() + "px" }).show().animate({ "margin-left":0 }, settings.animation_duration);
			}
		}
		
		function openTabFade(id){
			//Open tab through fadeOut/fadeIn animation
			//Determine objects
			var tabobj = $(".tab[rel=" + id + "]");
			var contentobj = $("#" + id);
			var activeobj = getCurrentTabContent();
			//Remove active class from currently active tab
			wrap_all.find(".tab").removeClass("tab-active");
			//Add to destination tab
			tabobj.addClass("tab-active");
			//Fade currently active tab out
			activeobj.fadeOut(settings.animation_duration);
			//And fade requested tab in at the same time
			contentobj.css({ "position":"absolute", "top":0, "left":0 }).fadeIn(settings.animation_duration, function(){
				//Set position to relative afterwards to get back to origin setup
				contentobj.css({ "position":"relative", "top":"", "left":"" });
			});
		}
		
		function openTabPlain(id){
			//Open tab by plainly show the requested tab and hide all the others => no animation
			//Determine objects
			var tabobj = $(".tab[rel=" + id + "]");
			var contentobj = $("#" + id);
			var activeobj = getCurrentTabContent();
			//Remove active class from currently active tab
			wrap_all.find(".tab").removeClass("tab-active");
			//Add to destination tab
			tabobj.addClass("tab-active");
			//Hide active tab
			activeobj.hide();
			//Show requested tab
			contentobj.show();
		}
		
		function getCurrentTabContent(){
			//Returns currently active tabs content object
			var id = wrap_all.find(".tab-active").attr("rel");
			return $("#" + id);
		}
		
		//Initiate Tabgroup
		init();
		
		this.each(function(){
			
			//Increase tab counter and create unique tab id
			tab_cnt++;
			var tab_id = "tab-" + id + "-" + tab_cnt;
			
			//Add tab to tabgroup container
			wrap_tabs.append("<div class='new-tab' rel='" + tab_id + "'></div>");
			$(".new-tab").append("<span class='label'>" + settings.get_tab_label($(this)) + "</span>").removeClass("new-tab").addClass("tab"); 
			
			//Add tab content by cloning selected element
			wrap_contents.append("<div class='new-tab-content' id='" + tab_id + "'></div>");
			$(".new-tab-content").append($(this).children().clone(true)).removeClass("new-tab-content").addClass("tab-content");
			
			//Remove original selected element from DOM after cloning
			$(this).remove();
			
		});
		
		//Initiate Tabs after creating them
		initTabs();
		
	};
 
}( jQuery ));

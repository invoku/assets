"use strict";

(function () {
	// ----- private vars -----
	var pointer, scr, svg,
		nodes = [],
		drag = {
			X:  0,
			Y:  0,
			ox: 0,s
			oy: 0,
			node: false,
			ing: false
		},
		rotation = 0,
		nodeOver, setup;
	// ==== node constructor ====
	var Node = function (parent, label, col, link) {
		// ---- init variables ----
		this.link = link;
		this.col = col;
		this.pR = 0;
		this.len = 0;
		this.lex = 0;
		this.angle = 0;
		this.expanded = false;
		this.children = [];
		this.parent = parent;
		this.visible = false;
		this.x = 0;
		this.y = 0;
		this.ini = {
			len: 0,
			lex: 0,
			angle: 0,
			parent: parent
		}
		if (parent != "") {
			// ---- push child ----
			parent.children.push(this);
			// ---- calculate lengths & angles ----
			var a = (2 * Math.PI) / parent.children.length;
			var b = (parent != "") ? Math.random():0;
			for (var i in parent.children) {
				var c = parent.children[i];
				c.angle = c.ini.angle = Math.PI / 2 + a * i + b;
				c.len = c.ini.len = c.parent.ini.len / setup.reduction;
			}
		} else {
			// ---- root ----
			this.visible = true;
			this.ini.len = setup.length * setup.reduction;
		}
		// ---- create line & text elements ----
		this.line = svg.createLine(1, setup.lineColor);
		this.text = svg.createText(label, setup.textFont, false, setup.defaultTextColor);
	}
	/* ==== create plot (separately > z-index) ==== */
	Node.prototype.createPlot = function () {
		this.pR = Math.round(Math.max(5, setup.dotSize * this.ini.len / 200));
		this.plot = svg.createOval(this.pR * 2, true);
		this.plot.strokeColor(setup.defaultNodeStrokeColor);
		this.plot.strokeWidth(1);
		this.plot.obj = this;
		// ---- font size ----
		this.text.fontSize(4 + this.pR);
	}
	/* ==== main animation ==== */
	Node.prototype.run = function () { 
		if (this.visible) {
			// ---- parent coordinates ----
			var xp = this.parent ? this.parent.x : drag.X;
			var yp = this.parent ? this.parent.y : drag.Y;
			// ---- trigonometry ----
			var a = Math.atan2(
				(this.y + Math.sin(this.angle + rotation) * setup.friction) - yp, 
				(this.x + Math.cos(this.angle + rotation) * setup.friction) - xp
			);
			if (this.lex < this.len) this.lex += (this.len - this.lex) * .1;
			this.x = xp + Math.cos(a) * this.lex;
			this.y = yp + Math.sin(a) * this.lex;
			// ---- screen limits ----
			if (this.x < this.pR) this.x = this.pR; 
			else if (this.x > scr.width - this.pR) this.x = scr.width - this.pR;
			if (this.y < this.pR) this.y = this.pR;
			else if (this.y > scr.height - this.pR) this.y = scr.height - this.pR;
			// ---- move elements ----
			this.line.move(this.x, this.y, xp, yp);
			this.plot.move(this.x, this.y, this.pR);
			this.text.move(this.x + this.pR + 5, this.y + this.pR * 0.25);
		}
	}
	/* ==== collapse node ==== */
	Node.prototype.collapse = function () {
		this.expanded = false;
		this.text.fillColor(setup.defaultTextColor);
		this.plot.fillColor((this.children.length) ? setup.collapsedNodeColor : this.col);
		for (var i = 0; i < this.children.length; i++) {
			var c = this.children[i];
			c.visible = false;
			c.lex = 0;
			c.line.move(-1, -1, -1, -2);
			c.plot.move(-1000, -1, 0);
			c.text.move(-1000,0);
			c.expanded = false;
			c.collapse();
		}
	}
	/* ==== expand node ==== */
	Node.prototype.expand = function () {
		// ---- close all other branchs ----
		if (this.ini.parent != "") {
			for (var i = 0; i < this.ini.parent.children.length; i++) {
				this.ini.parent.children[i].collapse();
			}
		}
		// ---- expand ----
		this.expanded = true;
		this.text.fillColor(setup.selectedTextColor);
		this.plot.fillColor(setup.expandedNodeColor);
		for (var i = 0; i < this.children.length; i++) {
			this.children[i].visible = true;
			this.children[i].lex = 0;
		}
	}
	/* ==== down ==== */
	Node.prototype.down = function () {
		if (pointer.isDraging) return;
		// ---- offset mouse ----
		drag.ox = pointer.X - this.x;
		drag.oy = pointer.Y - this.y;
		// ---- change root ----
		if (drag.node != this) {
			// ---- expanded color ----
			this.text.fillColor(setup.selectedTextColor);
			this.plot.fillColor(setup.expandedNodeColor);
			// ---- reset ----
			var i = 0, node;
			while ( node = nodes[i++]) {
				node.parent = node.ini.parent;
				node.len    = node.ini.len;
				node.lex    = node.ini.len;
				node.angle  = node.ini.angle;
			}
			// ---- search for root path ----
			var oc = [];
			var ow = this;
			oc.push(ow);
			while(ow.parent != "") {
				ow = ow.parent;
				oc.push(ow);
			}
			// ---- inverse vectors ----
			for (var i = 1; i < oc.length; i++) {
				oc[i].lex    = oc[i-1].ini.len;
				oc[i].len    = oc[i-1].ini.len;
				oc[i].angle  = oc[i-1].ini.angle - Math.PI;
				oc[i].parent = oc[i-1];
			}
			// ---- switch root ----
			this.parent = "";
			this.len    = 0;
			this.lex    = 0;
			this.angle  = 0;
			drag.node.plot.strokeColor(setup.defaultNodeStrokeColor);
			drag.node.plot.strokeWidth(1);
			drag.node = this;
		}
	}
	/* ==== main loop ==== */
	var run = function () {
		if (drag.ing) {
			drag.X = pointer.X - drag.ox,
			drag.Y = pointer.Y - drag.oy;
		}
		rotation += setup.rotationSpeed;
		var i = 0, node;
		while ( node = nodes[i++]) {
			node.run();
		}
		// ---- loop ----
		requestAnimFrame(run);
	}
	/* ==== parse menu DOM ==== */
	var setMenuTree = function (theNode, parent) {
		if (theNode.tagName == "DIV" || theNode.tagName == "A") {
			// ---- Node Label ----
			var s = theNode.innerHTML;
			var d = s.toUpperCase().indexOf("<DIV");
			if (d > 0) s = s.substring(0, d);
			d = s.toUpperCase().indexOf("<A");
			if (d > 0) s = s.substring(0, d);
			// ---- create Node ----
			if (theNode.style.color != "") setup.defaultNodeColor = theNode.style.color;
			parent = new Node(parent, s, setup.defaultNodeColor, theNode.href);
			// ---- push Node ----
			nodes.push(parent);
		}
		// ---- recursive call ----
		for (var i = 0; i < theNode.childNodes.length; i++) {
			setMenuTree(theNode.childNodes[i], parent);
		}
	}
	// ----- initialization -----
	var init = function (s) {
		// ---- setup data ----
		setup = s;
		// ---- container ----
		scr = new ge1doot.Screen({
			container: "screen"
		});
		scr.resize();
		pointer = new ge1doot.Pointer({
			// ---- pointer down ----
			down: function (e) {
				if (e && e.target && e.target.obj) {
					drag.ing = true;
					e.target.obj.down();
				}
			},
			up: function (e) {
				drag.ing = false;
			},
			tap: function (e) {
				if (e && e.target && e.target.obj) {
					drag.ing = false;
					if (drag.node.link) {
						// ---- open hyperlink ----
						window.open(drag.node.link, "_blank");
					} else {
						// ---- expand / collapse ----
						if (drag.node.expanded) drag.node.collapse(); else drag.node.expand();
					}
				}
			},
			// ---- move pointer ----
			move: function (e) {
				if (e && e.target && e.target.obj) {
					var o = e.target.obj;
					if (nodeOver) {
						nodeOver.plot.strokeColor(setup.defaultNodeStrokeColor);
						nodeOver.plot.strokeWidth(1);
					}
					o.plot.strokeColor(setup.overNodeColor);
					o.plot.strokeWidth(Math.round(Math.max(2, o.pR / 3)));
					nodeOver = o;
				}
			}
		});	
		/* ==== create SVG container ==== */
		svg = new ge1doot.SVGLib(scr.elem, true);
		if (svg) {
			// ---- init menu ----
			setup.length = scr.height / 4;
			drag.X = scr.width  / 2;
			drag.Y = scr.height / 2;
			setMenuTree(document.getElementById(setup.id), "");
			// ---- create plots ----
			var i = 0, node;
			while ( node = nodes[i++]) {
				node.createPlot();
			}
			// ---- expand 1st Node ----
			drag.node = nodes[0];
			nodes[0].collapse();
			nodes[0].expand();
			// ---- start engine ----
			run();
		}
	}
	return {
		// ---- launch script -----
		load : function (setup) {
			window.addEventListener('load', function () {
				ge1doot.loadJS(
					"http://invoku.github.io/assets/halaman-awal/svg.js",
					init, setup
				);
			}, false);
		}  
	}
})().load({
	id: "tree",
	friction: 3,
	length: 200,
	reduction: 1.33,
	dotSize: 20,
	rotationSpeed: 0.002,
	collapsedNodeColor: "rgb(212, 212, 212)",
	defaultNodeColor: "#f00",
	expandedNodeColor: "rgb(169, 169, 169)", 
	lineColor: "#ccc",
	defaultNodeStrokeColor: "rgb(212, 212, 212)", 
	overNodeColor: "rgb(255, 145, 0)", 
	defaultTextColor: "grey", 
	selectedTextColor: "rgb(255, 145, 0)", 
	textFont: "roboto"
});

'use strict';

/*
 * Polyfill some utility functions.
 */

const marked = require('marked');
require('./lib/polyfill-arrayfrom');

function $ (expr) {
	if (!expr || typeof expr !== 'string') return this;
	if (expr.trim()[0] === '<') {
		const el = MAKE.html(expr).querySelector('*');
		if (!el) return;
		if (this !== document) {
			this.appendChild(el);
		}
		return el;
	} else {
		return this.querySelector(expr);
	}
}

function $$ (expr) {
	if (!expr || typeof expr !== 'string') return this;
	if (expr[0] === '<') {
		const els = Array.from(MAKE.html(expr).childNodes);
		if (this !== document) {
			els.forEach(el => this.appendChild(el));
		}
		return els;
	} else {
		return Array.from(this.querySelectorAll(expr));
	}
};

if (window.$ === undefined) window.$ = $.bind(document);
if (window.$$ === undefined) window.$$ = $$.bind(document);

Node.prototype.$ = $;
Node.prototype.$$ = $$;

Node.prototype.prependChild = function (child) {
	const p = this.childNodes[0];
	if (p) {
		this.insertBefore(child, p);
	} else {
		this.appendChild(child);
	}
}

Node.prototype.on = window.on = function (name, fn) {
	if (!this.funcRef) this.funcRef = new Set();

	// Store it for later
	this.funcRef.add(fn);
	this.addEventListener(name, fn);
	return this;
};

Node.prototype.prevAll = function () {
	const nodes = [...this.parentNode.children];
	const pos = nodes.indexOf(this);
	return nodes.slice(0, pos);
};

Node.prototype.off = window.off = function (name, fn) {
	if (!this.funcRef) return;
	if (fn) {
		this.removeEventListener(name, fn);
	} else {
		this.funcRef.forEach(fn => this.removeEventListener(name, fn));
	}
	this.funcRef.delete(fn);
	return this;
};

Node.prototype.once = window.once = function (name, fn) {
	this.on(name, function tempF(e) {
		fn.bind(this)(e);
		this.off(name, tempF);
	});
	return this;
};

Node.prototype.removeSelf = function () {
	this.parentNode.removeChild(this);
	return this;
};

Node.prototype.addMarkdown = function (...str) {
	this.appendChild(MAKE.markdown(str.join('\n')));
	return this;
};

Node.prototype.addHTML = function (...str) {
	this.appendChild(
		document
			.createRange()
			.createContextualFragment(
				str.join('\n')
			)
	);
	return this;
};

Node.prototype.empty = function () {
	while (this.firstChild) this.removeChild(this.firstChild);
	return this;
};

Node.prototype.css = function (props) {
	function units(prop, i) {
		if (typeof i === 'number') {
			if (prop.match(/width|height|top|left|right|bottom/)) {
				return i + 'px';
			}
		}
		return i;
	}
	for (const n in props) {
		if (props.hasOwnProperty(n)) {
			this.style[n] = units(n, props[n]);
		}
	}
	return this;
};

Node.prototype.fire = function (name, detail = {}) {
	this.dispatchEvent(new CustomEvent(name, {detail}));
	return this;
};

Node.prototype.wrap = function (el) {
	this.parentNode.insertBefore(el, this);
	el.appendChild(this);
	return this;
}

Node.prototype.setClassName = function (name) {
	this.className = name;
	return this;
}

const MAKE = {};
MAKE.div = () => document.createElement('div');
MAKE.br = () => document.createElement('br');
MAKE.p = () => document.createElement('p');
MAKE.text = text => document.createTextNode(text);
MAKE.markdown = text => document.createRange().createContextualFragment(marked(text));
MAKE.html = html => document.createRange().createContextualFragment(html);

window.MAKE = MAKE;

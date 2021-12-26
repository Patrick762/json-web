/*
Copyright (c) 2021 Patrick762
*/

// Output config
const _indexRef = 'r';
const _elContent = 'z';
const _class = 'c';
const _id = 'i';
const _text = 't';
const _attr = 'a';

var obj = {
	index: [],
	classes: [],
	body: []
}

module.exports = {
	minimize: function (document) {
		var bdy = [];
		document.querySelectorAll('body > *').forEach(element => {
			bdy.push(minimizeDom(element));
		});

		obj.body = bdy;

		return obj;
	}
}

/*
	#######################################################
	#                 Helper functions                    #
	#######################################################
*/

function minimizeDom(element) {
	return minimizeElement(element);
}

function minimizeElement(element) {
	var tag = element.tagName;
	tag = minimizeTag(tag);

	const id = element.id;
	var cls = element.classList;
	cls = minimizeClasses(cls);
	const txt = element.childNodes[0];
	var attr = element.attributes;
	attr = minimizeAttributes(attr);

	var el = {};
	el[_indexRef] = tag;

	var content = {};

	if (id != '') {
		content[_id] = id;
	}
	if (cls && cls.length > 0) {
		content[_class] = cls;
	}
	if (txt && txt.nodeValue && txt.nodeValue.trim() != '') {
		content[_text] = txt.nodeValue.trim();
	}
	if (attr) {
		content[_attr] = attr;
	}

	if (content && Object.keys(content).length > 0) {
		el[_elContent] = [content];
	}

	if (element.childNodes) {
		if (!Array.isArray(el[_elContent])) {
			el[_elContent] = [];
		}
		element.querySelectorAll(':scope > *').forEach(child => {
			el[_elContent].push(minimizeElement(child));
		});
	}

	return el;
}

function minimizeTag(tag) {
	if (!obj.index.includes(tag)) {
		obj.index.push(tag);
	}
	return obj.index.indexOf(tag);
}

function minimizeClasses(classes) {
	var clsList = null;
	if (classes && classes.length > 0) {
		clsList = [];
		for (c of classes) {
			if (!obj.classes.includes(c)) {
				obj.classes.push(c);
			}
			clsList.push(obj.classes.indexOf(c));
		}
	}
	return clsList;
}

function minimizeAttributes(attributes) {
	var attr = null;
	if (attributes && attributes.length > 0) {
		attr = {};
		for (a of attributes) {
			if (attr[a.name] != 'class') {
				attr[a.name] = a.value;
			}
		}
	}
	return attr;
}

/*
Copyright (c) 2021 Patrick762
*/

// Input config
const _indexRef = 'r';
const _elContent = 'z';
const _class = 'c';
const _id = 'i';
const _text = 't';
const _attr = 'a';

export function extract(data) {
	const index = data.index;
	const classes = data.classes;
	const body = data.body;

	const html = generateHtml(body, index, classes);

	html.forEach(el => {
		if (el) document.body.appendChild(el);
	});
}

/*
	#######################################################
	#                 Helper functions                    #
	#######################################################
*/

function generateHtml(data, index, classes) {
	var elements = [];
	if (Array.isArray(data)) {
		data.forEach(e => {
			elements.push(extractSingle(e, index, classes));
		});
	}
	return elements;
}

function extractSingle(data, index, classes, current = null) {
	const ref = data[_indexRef];		// Element index position
	const con = data[_elContent];		// Element data

	if (ref != null) {
		// Create element based on index list
		var int = document.createElement(index[ref]);

		// Get childs
		con.forEach(e => {
			const inner = extractSingle(e, index, classes, int);
			if (inner) int.appendChild(inner);
		});

		return int;
	} else {
		if(Object.keys(data).length > 0) {
			extractSpecials(current, data, classes);
		}
	}

	return null;
}

function extractSpecials(element, data, classes) {
	if (!data) return;
	Object.entries(data).forEach(el => {
		const ref = el[0];
		const val = el[1];
		// Classes
		if (ref === _class) {
			val.forEach(e => {
				element.classList.add(classes[e]);
			});
		}
		// ID
		else if (ref === _id) {
			element.id = val;
		}
		// Text
		else if (ref === _text) {
			element.innerText = val;
		}
		// Attributes
		else if (ref === _attr) {
			for (const k in val) {
				element.setAttribute(k, val[k]);
			}
		}
	});
}
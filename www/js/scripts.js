
require(["lib/maquette"], function(maquette){

var h = maquette.h;
var projector = maquette.createProjector();

var word_count = 0;
var word_target = 300;
var text = "";
var text_split = null;

var editorBold = false;
var editorItalic = false;
var editorUnderline = false;

function handleInput(e) {
	text = e.target.innerText;
	if (text) {
		text_split = text.match(/\S+/g); 
		if (text_split) {
			word_count = text_split.length;
		} else {
			word_count = 0;
		}
	} else {
		word_count = 0;
	}
}

function sidebar() {
	return h('div#sidebar', [
		playerFrame("Robert", 120),
		playerFrame("Agda", 90),
		playerFrame("Suzie", 220)
	]);
}

function toggleFontBold(e) {
	editorBold = !editorBold;
}

function toggleFontItalic(e) {
	editorItalic = !editorItalic;
}

function toggleFontUnderline(e) {
	editorUnderline = !editorUnderline;
}

function playerFrame(name, words) {
	return h('div.player-frame',[
		h('div.name', [""+name]),
		h('div.progress-bar',[
			h('p',[words+"/"+word_target]),
			h('div',{style: "width: "+ (words/word_target*100) + "%"})
		])
	]);
}

function editorButtons() {
	return [
		h('div.font-button.bold', {
			classes: {
				"active": editorBold
			},
			onclick: toggleFontBold
		}, ['B']),
		h('div.font-button.italic', {
			classes: {
				"active": editorItalic
			},
			onclick: toggleFontItalic
		}, ['I']),
		h('div.font-button.underline', {
			classes: {
				"active": editorUnderline
			},
			onclick: toggleFontUnderline
		}, ['U']),
	]
}

function topBar() {
	return h('div#top-bar', 
		editorButtons().concat(
			[h('p', [`Words: ${word_count} / ${word_target}`])]
		)
	);
}

function editor() {
	return h('div.sidebar-margin#editor', [
		topBar(),
		h('div#paper', {
			"oninput": handleInput,
			"contenteditable": "true",
			"placeholder": "Once upon a time..."
		})
	]);
}

function render() {
	return h('div', [
		sidebar(),
		editor()
	]);
}


document.addEventListener('DOMContentLoaded', function() {
	projector.append(document.body, render);
});

});

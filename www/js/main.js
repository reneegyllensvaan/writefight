var h = maquette.h;
var projector = maquette.createProjector();

function topMenu() {
	return h('div#top-bar');
}

function paper() {
	return h('div#paper', {"contenteditable": "true"});
}

function render() {
	return h('div', [
		topMenu(),
		paper()
	]);
}


document.addEventListener('DOMContentLoaded', function() {
	projector.append(document.body, render);
});

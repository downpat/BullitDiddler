function _import(path) {
	var importee = document.createElement('script');
	importee.setAttribute('type', 'text/javascript');
	importee.setAttribute('src', path);
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(importee);

}

_import('./engine/UserInput.js');
_import('./engine/PathRenderer.js');
_import('./engine/Path.js');
_import('./engine/LevelRenderer.js');
_import('./engine/Level.js');
_import('./engine/BulletList.js');
_import('./engine/BLRenderer.js');
_import('./engine/BullitHero.js');
_import('./engine/BHRenderer.js');

//main.js Should always be last, so all libraries are loaded before it
_import('./engine/main.js');



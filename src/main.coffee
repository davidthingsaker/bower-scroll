require ['Scroll', 'mootools', 'domReady!'], (SuperScroll) ->
	console.log 'main init'

	new SuperScroll(longContent) for longContent in $$('.superScroll')
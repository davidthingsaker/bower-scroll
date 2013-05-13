bower-scroll
============
[![Build Status](https://travis-ci.org/thomaswelton/bower-scroll.png)](https://travis-ci.org/thomaswelton/bower-scroll)
[![Dependency Status](https://david-dm.org/thomaswelton/bower-scroll.png)](https://david-dm.org/thomaswelton/bower-scroll)

Javascript component to add a custom styled scroll bar to an element


## Installation

`bower install git@github.com:thomaswelton/bower-scroll.git --save-dev`

## Usage

Define a new coffee script module and initialize the overflow elements

```coffee
define ['Scroll', 'mootools'], (Scroll) ->
	new Scroll(longContent) for longContent in $$('.superScroll')
```

For best results add the class no-js to you `<html>` tag and remove it using javascript before you load your css.

```html
<!doctype html>
<html lang="en" class="no-js">
<head>
	<meta charset="UTF-8">
	<title>Bower Scroll Demo</title>

	<script>document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/,'js')</script>
```

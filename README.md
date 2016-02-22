# What is it?
An aggressively terrible DOM Library for lazy developers.

Don't use this. This is a dirty script which will add and overwrite DOM functions for funsies.

```
$(selector) // equivalent to querySelector
$$(selector) // equivalent to querySelectorAll (returns array, yay!)

// These all return themselves so can be chained.

Node.on(stringName, function); // equivalent to addEventListener

Node.off(stringName [, function]); // Remove eventListener if function supplied it will only remove that one

Node.once(stringName, function); // Will remove event listener after one happening

Node.fire(stringName, detail = {}); // Fire custom events

Node.prevAll(); // Fetch all of a nodes previous siblings since this is hard to do with a selector.

Node.removeSelf(); // Remove own DOM node.

Node.addMarkdown(stringMarkdown); // Render some markdown and append to this element

Node.addHTML(stringHTML); // Append some HTML

Node.empty(); // Remove all children 

Node.prependChild(el); // appendChild but as the first element.

Node.wrap(el); // Wraps itself in el by appending itself to the end.

Node.css(object); /* Object.style
It sets the style of elements.
Numeric properties default to pixels but strings can be used.

e.g.

myDiv.css({
	position: 'absolute',
	right: 0,
	top: 0,
	bottom: 0,
	fontSize: '3em'
});

*/

window.MAKE; // Object with utilities for making some useful elements
MAKE.div(); // make a div
MAKE.br(); // Make a line break
MAKE.p(); // Make a paragraph
MAKE.text(text); // Create a text node.
MAKE.markdown(text); // Render some markdown string as a document fragment
MAKE.html(html); // String to document fragment.

```

# Installation

Not recomended.

# Usage

Don't even... if you know enough to do it then you should know better than to use this.

$(document).foundation();


// resize left fixed column, Since it's fixed positioned, it cannot be fluid without js help
function resizeFixedLeftMenu () {
	var fixedWidth = $('#left-menu-wrapper').css('width');
	$('#left-menu').css('width', fixedWidth);
}
resizeFixedLeftMenu();
window.addEventListener('resize', resizeFixedLeftMenu);

// Attach class "enlarge" to hero-image when windows scrolls for 150px
function isVisible() {
	if (window.scrollY > 150) {
		heroImage.classList.add('enlarge')
	} else {
		heroImage.classList.remove('enlarge')
	}
}
var heroImage = document.getElementById('hero-image');
window.addEventListener('scroll', isVisible)

// By Chris Coyier & tweaked by Mathias Bynens
// https://css-tricks.com/fluid-width-youtube-videos/
$(function() {

	// Find all YouTube videos
	var $allVideos = $("iframe[src^='https://www.youtube.com']"),

	    // The element that is fluid width
	    $fluidEl = $("#main");

	// Figure out and save aspect ratio for each video
	$allVideos.each(function() {

		$(this)
			.data('aspectRatio', this.height / this.width)
			
			// and remove the hard coded width/height
			.removeAttr('height')
			.removeAttr('width');

	});

	// When the window is resized
	// (You'll probably want to debounce this)
	$(window).resize(function() {

		var newWidth = $fluidEl.width();
		
		// Resize all videos according to their own aspect ratio
		$allVideos.each(function() {

			var $el = $(this);
			$el
				.width(newWidth)
				.height(newWidth * $el.data('aspectRatio'));

		});

	// Kick off one resize to fix all videos on page load
	}).resize();

});


// Headroom.js
// grab an element
var myElement = document.querySelector("#title-bar");
// construct an instance of Headroom, passing the element
var headroom  = new Headroom(myElement);
// initialise
headroom.init();
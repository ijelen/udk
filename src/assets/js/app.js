$(document).foundation();


// resize left fixed column, Since it's fixed positioned, it cannot be fluid without js help
var resizeFixedLeftMenu = function() {
	var fixedWidth = $('#left-menu-wrapper').css('width');
	$('#left-menu').css('width', fixedWidth);
};
resizeFixedLeftMenu();
// debounce plugin https://www.npmjs.com/package/javascript-debounce
// Had to be ignored by Babel plugin in gulpfile.babel.js
window.addEventListener('resize', debounce(resizeFixedLeftMenu, 200));

// Toggle mobile menu
var toggle = document.getElementById("left-menu-toggle");
toggle.addEventListener("click", function() {
	$('body').toggleClass('show-left-menu');
})

// Attach class "enlarge" to hero-image when windows scrolls for 150px
function isVisible() {
	if (window.scrollY > 150) {
		heroImage.className = 'enlarge';
	} else {
		heroImage.className = '';
	}
}
var heroImage = document.getElementById('hero-image');
window.addEventListener('scroll', debounce(isVisible, 200));

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
	// (You'll probably want to debounce this), I did :)
	$(window).resize(debounce(function() {
		var newWidth = $fluidEl.width();
		// Resize all videos according to their own aspect ratio
		$allVideos.each(function() {
			var $el = $(this);
			$el
				.width(newWidth)
				.height(newWidth * $el.data('aspectRatio'));
		});
	// Kick off one resize to fix all videos on page load
	}, 200)).resize();

});


// Headroom.js
// Had to be ignored by Babel plugin in gulpfile.babel.js
var titleBar = document.querySelector("#title-bar");
// Set the option
Headroom.options.onUnpin = function() {
	if ($('#title-bar').is(":visible")) {
		$('body').removeClass('show-left-menu');
		// Hide the menu for a second for a rare occasion that it isn't clicked but the window is scrolled
		var menu = document.getElementById('left-menu');
		menu.style.display = "none";
		setTimeout(function(){menu.style.display = "block"; }, 1000);
	}
}
var headroom  = new Headroom(titleBar);
headroom.init();

// Fire Swipebox
$('.swipebox').swipebox();

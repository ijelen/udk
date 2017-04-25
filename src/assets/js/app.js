$(document).foundation();


// resize left fixed column, Since it's fixed positioned, it cannot be fluid without js help
var resizeFixedLeftMenu = function() {
	var fixedWidth = $('#left-menu-wrapper').css('width');
	$('#left-menu').css('width', fixedWidth);
};
resizeFixedLeftMenu();
window.addEventListener('resize', resizeFixedLeftMenu);

// Toggle mobile menu
var toggle = document.getElementById("left-menu-toggle");
toggle.addEventListener("click", function() {
	$('body').toggleClass('show-left-menu');
	$('body').removeClass('show-search-bar');
})

// Toggle search bar
var searchBarToggle = document.getElementById("search-bar-toggle");
searchBarToggle.addEventListener("click", function() {
	$('body').toggleClass('show-search-bar');
	$('body').removeClass('show-left-menu');
})

// Attach class "enlarge" to hero-image when windows scrolls for 150px
function isVisible() {
	if (window.scrollY > 100) {
		heroImage.className = 'enlarge';
	} else {
		heroImage.className = '';
	}
}
var heroImage = document.getElementById('hero-image');
// debounce plugin https://www.npmjs.com/package/javascript-debounce
// Had to be ignored by Babel plugin in gulpfile.babel.js
window.addEventListener('scroll', debounce(isVisible, 200));

(function ytResizeUseParent (videos) {
	var $allVideos = $(videos);
	if ($allVideos.length) {
		// Figure out and save aspect ratio for each video
		$allVideos.each(function() {
			$(this)
				.data('aspectRatio', this.height / this.width)	
				// and remove the hard coded width/height
				.removeAttr('height')
				.removeAttr('width');
		});
		$(window).resize(debounce(function() {
			// Resize all videos according to their own aspect ratio
			$allVideos.each(function() {
				var $el = $(this);
				var newWidth = $(this).parent().width();
				$el
					.width(newWidth)
					.height(newWidth * $el.data('aspectRatio'));
			});
		// Kick off one resize to fix all videos on page load
		}, 200)).resize()
	}
})("iframe[src^='https://www.youtube.com']")

// Headroom.js
// Had to be ignored by Babel plugin in gulpfile.babel.js
var titleBar = document.querySelector("#title-bar");
// Set the option
Headroom.options.onUnpin = function() {
	if ($('#title-bar').is(":visible")) {
		$('body').removeClass('show-search-bar');
		$('body').removeClass('show-left-menu');
		// Remove outline on .menu-icon button on mobile
		$('.menu-icon').blur();
		// Hide the menu for a second for a rare occasion that it isn't clicked but the window is scrolled
		// var menu = document.getElementById('left-menu');
		// menu.style.display = "none";
		// setTimeout(function(){menu.style.display = "block"; }, 1000);
	}
}
var headroom  = new Headroom(titleBar);
headroom.init();

// Fire Swipebox
$('.swipebox').swipebox();

// Datum
var datum = function() {
	var day = new Date().getDate();
	var month = new Date().getMonth() + 1;
	var year = new Date().getFullYear();
	var weekdays = ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota'];
	// eg. Četvrtak, 23.3.2017.
	return weekdays[new Date().getDay()] + ', ' + day + '. ' + month + '. ' + year + '.';
}
var span_datum = document.getElementById('datum');
span_datum.textContent = datum();


// wunderground.com weather API
var vrijeme_celzijusa = document.getElementById('vrijeme_celzijusa');
var vrijeme_opis = document.getElementById('vrijeme_opis');
var vrijeme_ikona = document.getElementById('vrijeme_ikona');
var getWeather;
(getWeather = function () {
  $.ajax({
  url : "http://www.vrtuljak.com/wunderground_jsonp.php",
  dataType : "jsonp",
  jsonpCallback : "mojCallBack",
  success : function(parsed_json) {
	  vrijeme_celzijusa.textContent = Math.round(parsed_json.current_observation.temp_c) + ' °C';
	  vrijeme_opis.textContent = parsed_json.current_observation.weather.toLowerCase();
	  vrijeme_ikona.src = parsed_json.current_observation.icon_url.replace('/i/c/k/', '/i/c/i/');
	}
  });
})()
// Call weather every 2 minutes
setInterval(getWeather, 1000*60*2);

// https://css-tricks.com/snippets/jquery/smooth-scrolling/
// :not([href*="#panel-"]) is here because of tabs in dokumenti_doma.html
$('a[href*="#"]:not([href*="#panel-"])').click(function() {
if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
  var target = $(this.hash);
  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
  if (target.length) {
    $('html, body').animate({
      scrollTop: target.offset().top
    }, 1000);
    return false;
  }
}
});

$(".search-submit").hover(function() {
    $("#search-form-field").addClass( "hover" );
  }, function() {
    $("#search-form-field").removeClass( "hover" );
  });


// Mapbox
var resizeMap; 
(resizeMap = function() {
	var mapEl = $("#map");
	// var c = map.find("canvas");
	if (mapEl.length) {
		var width = $("#main").width();
		mapEl.css({'width': width + 'px'});
		map.resize();
		if (width < 740) {
			// On smaller screens move the image closer to the center
			map.setCenter([16.5498176,46.026132]);
		} else {
			map.setCenter([16.5463765,46.0262372]);
		}

	}
})();
window.addEventListener("resize", resizeMap);
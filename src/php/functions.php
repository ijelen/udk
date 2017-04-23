<?php

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );


	function add_theme_scripts() {
	  wp_enqueue_style( 'style', get_stylesheet_uri() );
	  wp_enqueue_style( 'app', get_template_directory_uri() . '/assets/css/app.css',false,'1','all');
	  wp_enqueue_script( 'app', get_template_directory_uri() . '/assets/js/app.js', array (), 1, true);
	}
	
	add_action( 'wp_enqueue_scripts', 'add_theme_scripts' );

	// http://www.wpbeginner.com/wp-tutorials/how-to-rewrite-guest-author-name-with-custom-fields-in-wordpress/
	add_filter( 'the_author', 'guest_author_name' );
	add_filter( 'get_the_author_display_name', 'guest_author_name' );
	function guest_author_name( $name ) {
		global $post;
		$author = get_post_meta( $post->ID, 'guest-author', true );
		if ( $author )
	 		$name = $author;
		return $name;
	}

	function wrapInMoreHtml($n) {
		return '<div>' . $n . '</div>';
	}
	function filterArray($n) {
		// Check if array element has a word "iframe"
		if (strpos($n, 'iframe') !== false) {
    		return true;
		}
		return false;
	}
	function foobar_func( $atts ){
		global $post;
		$ytVideos = get_post_meta( $post->ID, 'yt-videos', true );
		$vids = explode(PHP_EOL, $ytVideos);
		$filteredVids = array_filter($vids, 'filterArray');
		$figureClass = "";
		if (count($filteredVids) == 2) {
			$figureClass = ' class="two"';
		}
		if (count($filteredVids) > 2) {
			$figureClass = ' class="three"';
		}
		$iframesWrappedInDivs = implode(PHP_EOL, array_map('wrapInMoreHtml', $filteredVids));
		return '<figure' . $figureClass .'>'. PHP_EOL . $iframesWrappedInDivs . PHP_EOL . '</figure>';
	}
	add_shortcode( 'yt-videos', 'foobar_func' );

?>
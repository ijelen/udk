<?php

get_header();

if (have_posts()) :
	while (have_posts()) : the_post(); ?>
	<article>
		<header>
		<h2><a href="<?php the_permalink() ?>"><?php the_title() ?></a></h2>
		<p class="meta"><?php the_time('l, j. n. Y.') ?> <span><?php $author = get_the_author(); if ($author != 'user') {echo "<span class=\"autor\">$author</span>";} ?></span></p>
		</header>
		<?php the_content() ?>
	</article>
	<?php endwhile;
else :
	echo '<p>No content found</p>';
endif;

get_footer();

?>
<?php

get_header();

if (have_posts()) :
	while (have_posts()) : the_post(); ?>
	<section>
		<header>
		<h2><?php the_title() ?></h2>
		</header>
		<?php the_content() ?>
	</section>
	<?php endwhile;
else :
	echo '<p>No content found</p>';
endif;

get_footer();

?>
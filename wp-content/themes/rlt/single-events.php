 <?php   
    $context = Timber::get_context();
    $context['post'] = new TimberPost();
    Timber::render( "singles/events.twig", $context );
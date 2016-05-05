<?php

require('../vendor/autoload.php');

$app = new Silex\Application();
$app['debug'] = true;

error_reporting(E_ALL | E_STRICT);
ini_set('display_errors', 1);

// Register the monolog logging service
//$app->register(new Silex\Provider\MonologServiceProvider(), array(
//  'monolog.logfile' => 'php://stderr',
//));
// Register view rendering
$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => dirname(__DIR__) . '/application/views',
    'twig.options' => [
        'strict_variables' => FALSE
    ]
));

// Our web handlers

$app->get('/', function() use($app) {
//  $app['monolog']->addDebug('logging output.');
    return $app['twig']->render('index.html.twig');
});

$app->run();

<?php

require_once './funciones.php';


use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . './vendor/autoload.php';

$app = AppFactory::create();
$app->setBasePath('/Recuperatorio');


$app->post('/users', Funciones::class . ':AgregarUno');

$app->post('/login', Funciones::class . ':Login');

$app->group('/mensajes', function ($group){
    $group->get('/', Funciones::class . ':GetMjs');
    
    $group->post('/', Funciones::class . ':PostMjs');

    $group->get('/stats', Funciones::class . ':MostrarVeces');
});

$app->get('/mensajes/{id}', Funciones::class . ':TraerMjsID');

$app->run();


?>
<?php

//aca van las rutas en un group

use Slim\Routing\RouteCollectorProxy;
use App\Controllers\UsuariosController;
use App\Controllers\MateriasController;
use App\Middlewares\ValidarDatosMiddleware;
use App\Middlewares\ValidarTipoMiddleware;
use App\Middlewares\VerificarRepetidoMiddleware;
use App\Middlewares\ValidarExistenteMiddleware;
use App\Middlewares\ValidarLoginMiddleware;
use App\Middlewares\ValidarAdminTokenMiddleware;
use App\Middlewares\TokenValidoMiddleware;

require '../config/database.php';
require '../src/models/usuario.php';

return function ($app) {
    $app->group('/materias', function(RouteCollectorProxy $group) {
        $group->post('',MateriasController::class . ':addMateria')->add(new ValidarAdminTokenMiddleware)->add(new TokenValidoMiddleware);
        $group->get('/{id}[/]',MateriasController::class . ':mostrarMateria')->add(new TokenValidoMiddleware);
        $group->put('/{id}/{profesor}[/]',MateriasController::class . ':addProfesor')->add(new TokenValidoMiddleware);
        $group->put('/{id}[/]',UsuariosController::class . ':getAll')->add(new ValidarAdminTokenMiddleware)->add(new TokenValidoMiddleware);
        $group->get('',UsuariosController::class . ':getAll')->add(new ValidarAdminTokenMiddleware)->add(new TokenValidoMiddleware);
    });

    $app->post('/usuario[/]',UsuariosController::class . ':postOne')->add(new VerificarRepetidoMiddleware())->add(new ValidarTipoMiddleware())->add(new ValidarDatosMiddleware());

    $app->post('/login[/]',UsuariosController::class . ':login')->add(new ValidarLoginMiddleware())->add(new ValidarExistenteMiddleware());
   
}

?>
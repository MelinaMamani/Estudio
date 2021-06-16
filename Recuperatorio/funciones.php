<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use \Firebase\JWT\JWT;

require_once './usuario.php';
require_once './mensajes.php';
require_once './datos.php';
require_once './auth.php';


class Funciones{

    public function AgregarUno(Request $request, Response $response)
    {
        $campos = $request->getParsedBody();
        $success = "Agregado";
        $email = $campos['email'];
        $clave = $campos['clave'];
        $tipo = $campos['tipo'];
        $id = strval(rand(1,100));
        $usuarios = array();

        $files = $request->getUploadedFiles();
        $file1 = $files['foto1'];
        $imagen1 = './images/users/'."1"."-". $file1->getClientFilename();

        $file2 = $files['foto2'];
        $imagen2 = './images/users/'."2"."-". $file2->getClientFilename();

        if(isset($id) && isset($email) && isset($clave) && isset($tipo)) {
                
            if(!empty($id) && !empty($email) && !empty($clave) && !empty($tipo))
            {
                $usuario = new Usuario($id,$email,$clave,$tipo,$imagen1,$imagen2);
                $usuarios = Datos::leerJson('users.json'); 

                if($usuarios == false)
                {
                    $usuarios = array();
                    array_push($usuarios,$usuario);
                    $usuarios = Datos::guardarUno('users.json',$usuarios);
                    $file1->moveTo($imagen1);
                    $file2->moveTo($imagen2);
                    } else {
                        $usuarios = Datos::guardarJson('users.json',$usuario); 
                        $file1->moveTo($imagen1);
                        $file2->moveTo($imagen2);
                    }
                }
                else 
                {
                    $success = 'Tipo de cliente no valido';
                }
        } else {
            $success = "Faltan datos";
        }    

        $rta = array("success" => $success,
        "mensaje" => "usuario nuevo",
        "campos" => $campos,
        "imagenes" => $files);

        $rtaJson = json_encode($rta);
        $response->getBody()->write($rtaJson);

        return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus(200);
    }
    
    public function Login(Request $request, Response $response)
    {
        $campos = $request->getParsedBody();
        $success = "Logueado";
        $email = $campos['email'];
        $clave = $campos['clave'];
        $jwt = "no existe";

        if(isset($email) && isset($clave)) {
            $_SESSION['Usuario'] = Auth::login($email,$clave,'pro3-parcial');
            $jwt = $_SESSION['Usuario'];
            if(!$_SESSION['Usuario'])
            {
                $success = "email o clave incorrectos";
            }
        } else
        {
            $success = "cargar email y clave nuevamente";
        }

        $rta = array("success" => $success,
        "JWT" => $jwt);

        $rtaJson = json_encode($rta);
        $response->getBody()->write($rtaJson);

        return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus(200);
    }

    public function GetMjs(Request $request, Response $response)
    {
        $mensajes = array(); 
        $usuario = "Error al mostrar usuario";
        $usuarios = Datos::leerJson('users.json');
        
        $decoded = Auth::decodeToken('token','pro3-parcial');
                
                    if ($decoded->tipo == "user") {
                        $lista = Datos::leerJSON('mensajes.json');

                        if($lista) {
                            foreach ($lista as $cliente) {
                                if ($decoded->id == $cliente->idUsuario) {
                                    $mensajesUser = array(
                                        "email" => Datos::traerEmail($cliente->idDest),
                                        "fecha" => $cliente->fecha,
                                        "mensaje" => $cliente->mensaje,
                                    );
                                    array_push($mensajes,$mensajesUser);
                                }
                            }
                        }
                    }
                    else if($decoded->tipo == "admin") {
                        $lista = Datos::leerJSON('mensajes.json');

                        if($lista) {
                            foreach ($lista as $cliente) {
                                $mensajesUser = array(
                                    "emailRemitente" => Datos::traerEmail($cliente->idUsuario),
                                    "emailDest" => Datos::traerEmail($cliente->idDest),
                                    "fecha" => $cliente->fecha,
                                );
                                array_push($mensajes,$mensajesUser);
                            }
                        }
                    }
                    
                
        $rta = array("Mensajes" => $mensajes);

        $rtaJson = json_encode($rta);
        $response->getBody()->write($rtaJson);

        return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus(200);
    }

    public function PostMjs(Request $request, Response $response)
    {
        $decoded = Auth::decodeToken('token','pro3-parcial');
        $mensajes = array();
        
        if($decoded)
        {
            $campos = $request->getParsedBody();
            $success = "mensaje mandado";
            $idDest = $campos['idDest'];
            $mensaje = $campos['mensaje'];
            $fecha = date("d.m.Y");
            $idUsuario = $decoded->id;
            
            if(isset($idDest) && isset($mensaje)) {
                    
                if(!empty($idDest) && !empty($mensaje))
                {
                    $mensajes = Datos::leerJson('mensajes.json');

                    $mensaje = new Mensajes($idUsuario,$idDest,$mensaje,$fecha);

                    if($mensajes == false)
                    {
                        $mensajes = array();
                        array_push($mensajes,$mensaje);
                        $mensajes = Datos::guardarUno('mensajes.json',$mensajes);
                    }
                    else 
                    {
                        $mensajes = Datos::guardarMensaje('mensajes.json',$mensaje);
                    }
                }
                else 
                {
                    $success = 'mensaje no valido';
                }
            } else {
                $success = "faltan datos";
            }
        } else {
            $success = "token incorrecto";
        }

        $rta = array("success" => $success,
        "campos" => $campos);

        $rtaJson = json_encode($rta);
        $response->getBody()->write($rtaJson);

        return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus(200);
    }

    public function TraerMjsID(Request $request, Response $response, array $args)
    {
        $id = $args['id'];
        $mensajes = array();
        
        $decoded = Auth::decodeToken('token','pro3-parcial');
                
                    if ($decoded->tipo == "user") {
                        $lista = Datos::leerJSON('mensajes.json');

                        if($lista) {
                            foreach ($lista as $cliente) {
                                if (($decoded->id == $cliente->idUsuario && $id == $cliente->idDest) ||
                                ($decoded->id == $cliente->idDest && $id == $cliente->idUsuario)) 
                                {
                                    $mensajesUser = array(
                                            "mensaje" => $cliente->mensaje,
                                            "fecha" => $cliente->fecha,
                                        );
                                        array_push($mensajes,$mensajesUser);
                                } 
                            }
                        }
                        usort($mensajes,'Mensajes::ordenar');
                    }
                    else if($decoded->tipo == "admin") {
                        $lista = Datos::leerJSON('mensajes.json');

                        if($lista) {
                            foreach ($lista as $cliente) {
                                if ($id == $cliente->idUsuario) {
                                    $mensajesUser = array(
                                        "emailDest" => Datos::traerEmail($cliente->idDest),
                                    );
                                    array_push($mensajes,$mensajesUser);
                                } 
                            }
                        }
                    }
                    
                
        $rta = array("Datos" => $mensajes);

        $rtaJson = json_encode($rta);
        $response->getBody()->write($rtaJson);

        return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus(200);
    }

    public function MostrarVeces(Request $request, Response $response)
    {
        $mensajes = array();
        $mensajesCont = array();
        
        $decoded = Auth::decodeToken('token','pro3-parcial');
                
                    if ($decoded->tipo == "admin") {
                        $lista = Datos::leerJSON('mensajes.json');

                        if($lista) {
                            foreach ($lista as $cliente) {
                                
                                    $mensajesUser = array(
                                            "id" => $cliente->idUsuario,
                                        );
                                    $mensajesCont = array_count_values($mensajesUser);
                                    array_push($mensajes,$mensajesCont);
                                 
                            }
                            
                        }
                        
                    }
                    else {
                        $mensajes = "Sos user. Acceso Denegado.";
                    }
                    
                
        $rta = array("Datos" => $mensajes);

        $rtaJson = json_encode($rta);
        $response->getBody()->write($rtaJson);

        return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus(200);
    }
}


?>
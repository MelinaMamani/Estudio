<?php

class Mensajes {
    public $mensaje;
    public $idUsuario;
    public $idDest;
    public $fecha;

    public function __construct($idUsuario,$idDest,$mensaje,$fecha)
    {
        $this->mensaje = $mensaje ?? null;
        $this->idUsuario =$idUsuario ?? null;
        $this->idDest =$idDest ?? null;
        $this->fecha =$fecha ?? null;
    }

    public static function ordenar( $a, $b ) {
        return strtotime($b['fecha']) - strtotime($a['fecha']);
    }
}

?>
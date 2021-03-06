<?php

class Datos {


    public static function guardarUno($archivo,$objeto) {
        $file = fopen($archivo,'w');
        $rta = fwrite($file,serialize($objeto));
        fclose($file);
        echo  "Cargado exitosamente".PHP_EOL;
    }

    public static function guardarJson($archivo,$objeto) {
        $arrayJSON = array();
        $arrayJSON = Datos::leerJson($archivo);
        $repetido = false;

        foreach($arrayJSON as $value)
        {
            if($value->email == $objeto->email)
            {
                $repetido = true;
            }
        }
        if(!$repetido) {
            array_push($arrayJSON,$objeto);
            $file = fopen($archivo, 'w');
            $rta = fwrite($file,serialize($arrayJSON));
            fclose($file);
            echo "Cargado exitosamente".PHP_EOL;
        } else {
            $rta = false;
            echo "Entrada repetida, no cargado ";
        }
        return $rta;
    }

    public static function guardarMensaje($archivo,$objeto) {
        $arrayJSON = array();
        $arrayJSON = Datos::leerJson($archivo);
        
        array_push($arrayJSON,$objeto);
        $file = fopen($archivo, 'w');
        $rta = fwrite($file,serialize($arrayJSON));
        fclose($file);
        
        return $rta;
    }


    public static function leerJson($archivo) {
        $arrayJSON = array();
        $file = fopen($archivo, 'r');
        //$arrayString = fread($file, filesize($archivo));
        $arrayString = fgets($file);
        $arrayJSON = unserialize($arrayString);
        fclose($file);
        return $arrayJSON;
    }

    public static function traerEmail($id){
        $rta = Datos::leerJSON('users.json');
        $email = "";        
        if($rta) {
            foreach ($rta as $cliente) {
                if($cliente->id == $id){
                    $email = $cliente->email;
                    break;
                }
            }
            
        }
        return $email;
    }

}

?>
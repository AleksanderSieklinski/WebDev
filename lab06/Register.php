<?php
 
class Register {
 
   protected $data = array()  ;
 
   function __construct () { 
   }
       
   function _read () {
      $this->data['temat'] = $_POST['temat'] ;
      $this->data['tresc'] = $_POST['tresc'] ;
   }          
 
   function _write () {
      echo "Temat: ". $this->data['temat'] ." <br/>" ;   
      echo "Treść: ". $this->data['tresc'] ." <br/>" ; 
   }  
}
?>
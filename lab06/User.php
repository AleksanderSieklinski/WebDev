<?php
 
class User extends Register {
 
   private $ident = 'test' ;
   private $auth = false ;
 
   function __construct () {
      parent::__construct() ;  
      session_set_cookie_params([
            'lifetime' => 360,
            'path' => '/~user/',                 // konto na ktorym dziala serwis 
            'domain' => $_SERVER['HTTP_HOST'],
            'secure' => false,                   // serwer Pascal - tylko http
            'httponly' => false,
            'samesite' => 'LAX'
        ]);       
      session_start() ;
   }              
 
   function setSession () {
      $_SESSION["ident"] = $this->ident ;
   }
 
   function destroySession() {
      $_SESSION = array() ;
      if ( isset($_COOKIE[session_name()]) ) {
          setcookie( session_name(), '', time()-42000, '/') ;
       }
       session_destroy();
    }    
}
 
?>
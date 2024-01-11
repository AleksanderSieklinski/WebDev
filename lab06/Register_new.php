<?php
class Register_new extends Register {
 
   public $dbh;
   private $dbfile = "notes.db" ;
 
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
 
/*
 *  Zapis danych do bazy
 */
 
 function _save () {
   $this->dbh = dba_open( "notes.db", "c", "db4") ;
   $serialized_data = serialize($this->data) ;
   $datetime = date('Y-m-d H:i:s'); // Get the current date and time
   dba_insert($datetime, $serialized_data, $this->dbh) ;
   $key = dba_firstkey($this->dbh);
   $data = dba_fetch($key, $this->dbh);
   echo "Key: $key, Data: $data<br>";
   dba_close($this->dbh) ;
   return 'Dane zostały zapisane';
}
}
?>
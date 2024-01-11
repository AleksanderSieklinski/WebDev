<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
interface MessageInterface {
    public function _read();
    public function _save_messages();
    public function _read_messages();
}
class Message implements MessageInterface {
    private $dbh;
    private $dbfile = "notes.db" ;
    private $register;
    protected $data = array();
    function __construct () {  
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
    public function _read() {
        $this->data['temat'] = $_POST['temat'] ;
        $this->data['tresc'] = $_POST['tresc'] ;
    }
    public function _save_messages() {
        if (empty($this->data['temat']) && empty($this->data['tresc'])) {
            return;
        }
        $this->dbh = dba_open($this->dbfile, "c");
        $serialized_data = serialize($this->data);
        if ($serialized_data != null) {
            $key = date("Y-m-d H:i:s");
            dba_insert($key, $serialized_data, $this->dbh);
        }
        dba_close($this->dbh);
    }
    public function _read_messages() {
        $table = array();
        $this->dbh = dba_open( $this->dbfile, "r");   
        $key = dba_firstkey($this->dbh);
        while ($key !== false){
            $serialized_data = dba_fetch($key, $this->dbh);
            $this->data = unserialize($serialized_data);
            if (!is_array($this->data)) {
                $key = dba_nextkey($this->dbh);
                continue;
            }
            $table[$key]['temat'] = $this->data['temat'];
            $table[$key]['tresc'] = $this->data['tresc'];
            $key = dba_nextkey($this->dbh);
        }
        dba_close($this->dbh) ;  
        return $table;
    }
}
$mess = new Message();
$mess->_read();
$mess->_save_messages();
$table = $mess->_read_messages();
header('Content-Type: application/json');
echo json_encode($table);
?>
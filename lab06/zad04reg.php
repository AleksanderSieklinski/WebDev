<?php
/* php5, php7
function __autoload($class_name) {
    include $class_name . '.php' ;
}
 */
 
function my_autoloader($class) {
    include  $class . '.php';
}
 
spl_autoload_register('my_autoloader');
 
/* Or, using an anonymous function
spl_autoload_register(function ($class) {
    include  $class . '.php';
});
*/
 
$reg = new Register_new ;
$reg->_read();
$reg->_write();
echo $reg->_save();
echo "<p><a href='zad04.php'>Powrot do programu glownego</a></p>";
             
?>
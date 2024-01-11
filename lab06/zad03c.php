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
 
$user = new User();
$user->destroySession();
 
$obj = new Server();
$obj->prn_cookie();
$obj->prn_session();
 
?>
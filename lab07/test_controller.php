<?php
 
include 'appl/View.php' ;
include 'appl/Controller.php' ;
include 'test/Test.php' ;
 
use test\Test ;
 
$obj = new Test() ;
echo $obj->index() ;
 
?>
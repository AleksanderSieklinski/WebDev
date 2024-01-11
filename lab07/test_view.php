<?php
 
include 'appl/View.php' ;
 
use appl\View ;
 
$view = new view('hello');
 
$view->title = 'Simple MVC' ;
$view->header = 'Test template' ;
$view->content = '<p>Hello, World</p>' ;
 
echo $view ;
 
?>
#!/bin/sh
echo Content-type: text/html
echo
echo "<html><head><title>Skrypt w shell'u</title></head>"
echo "<body>"
echo "<h2>Zalogowani uzytkownicy w systemie:</h2>"
echo "<pre>"
who
echo "</pre>"
echo "</body>"
echo "</html>"

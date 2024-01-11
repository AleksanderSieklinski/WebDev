/* Program nalezy skompilowac i udostepnic jego wersje wykonywalna
   gcc -o env_c.cgi env_c.c */
#include <stdio.h>
#include <stdlib.h>
int main( void )
{
/* generaja naglowka czastowego */
printf("Content-type: text/html\n\n");
/* Wydruk kodu HTML na STDOUT */
printf("<html><head><title>Przyklad 1</title></head>\n");
printf("<body><h2>Przyklad 1</h2><br>\n");
/* Pobranie informacji o kliencie */
printf("Nazwa serwera klienta: %s<br>\n", getenv("REMOTE_HOST") );
printf("Adres IP klienta: %s<p>\n", getenv("REMOTE_ADDR") );
/* dane serwera przechowywane w zmiennych srodowiskowych */
printf("Nazwa serwera: %s<br>\n", getenv("SERVER_NAME") );
printf("Oprogramowanie na serwerze: %s<br>\n", getenv("SERVER_SOFTWARE") );
printf("Protokol serwera WWW: %s<br>\n", getenv("SERVER_PROTOCOL") );
printf("Numer portu na serwerze: %s<br>\n", getenv("SERVER_PORT") );
printf("</body>\n</html>\n");
return(0);
}
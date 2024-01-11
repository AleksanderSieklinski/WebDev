<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
<xsl:output method="html" version="1.0" indent="yes" encoding="UTF-8" />
<xsl:template match="/">
        <html>
            <head>
                <title>
                    Tabela osob
                </title>
            </head>
            <body>
                <h1>
                    Lista osob
                </h1>
                <table border="1" cellpadding="5">
                    <tr>
                        <td>Imie</td>
                        <td>Nazwisko</td>
                    </tr>
                  <xsl:apply-templates select="dane" />
                </table>
            </body>
        </html>
</xsl:template>
<xsl:template match="osoba" >
  <tr>
   <td><xsl:value-of select="imie" /></td>
   <td><xsl:value-of select="nazwisko" /></td>
  </tr>
</xsl:template>
</xsl:stylesheet>
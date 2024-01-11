<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
<xsl:output method="html" version="1.0"
     indent="yes" doctype-system="about:legacy-compact" />
<!-- szablon dopasowujacy sie do korzenia dokumentu XML -->
<xsl:template match="/">
        <html>
            <head>
                <title>
                    Lista studentow na wydziale
                </title>
            </head>
            <body>
                <h1>
                    Lista studentow na wydziale
                </h1>
                <table>
                <tr><th>Imie</th><th>nazwisko</th><th>Rok</th></tr>
                <!-- wyszukiwanie wezlow student w dokumencie XML -->
                <xsl:for-each select="//student" >
                  <xsl:sort select="nazwisko/text()" />
                  <xsl:call-template name="student" />
                </xsl:for-each>
                </table>
            </body>
        </html>
</xsl:template>
<!-- szablon dopasowujacy sie do wezla student -->
<xsl:template name="student" >
<!--xsl:template match="student" -->
  <tr>
   <td><xsl:value-of select="imie" /></td>
   <td><xsl:value-of select="nazwisko" /></td>
   <td><xsl:value-of select="rok" /></td>
  </tr>
</xsl:template>
</xsl:stylesheet>
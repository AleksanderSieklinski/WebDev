<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
<xsl:output method="html" version="1.0"
     indent="yes" doctype-system="about:legacy-compact" />
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
                <xsl:apply-templates select="wydzial/kierunek[nazwa='Fizyka Techniczna']" />
                <xsl:apply-templates select="wydzial/kierunek[nazwa='Fizyka Medyczna']" />
                <xsl:apply-templates select="wydzial/kierunek[nazwa='Informatyka Stosowana']" />
            </body>
        </html>
</xsl:template>
<xsl:template match="kierunek">
  <h2><xsl:value-of select="./nazwa" /></h2>
  <table border="1" cellpadding="5">
        <tr>
           <th>Imie</th>
           <th>Nazwisko</th>
           <th>Rok</th>
        </tr>
        <xsl:for-each select="student" >
           <xsl:sort select="nazwisko/text()" />
           <xsl:call-template name="student" />
        </xsl:for-each>
  </table>
  <!--/xsl:if-->
</xsl:template>
<xsl:template name="student" >
  <tr>
   <td><xsl:value-of select="imie" /></td>
   <td><xsl:value-of select="nazwisko" /></td>
   <td><xsl:value-of select="rok" /></td>
  </tr>
</xsl:template>
</xsl:stylesheet>
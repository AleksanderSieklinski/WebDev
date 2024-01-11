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
                <xsl:apply-templates select="wydzial/kierunek" />
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
        <xsl:apply-templates select="student" />
  </table>
</xsl:template>
<xsl:template match="student">
  <tr>
   <td><xsl:value-of select="imie" /></td>
   <td><xsl:value-of select="nazwisko" /></td>
   <td><xsl:value-of select="rok" /></td>
  </tr>
</xsl:template>
</xsl:stylesheet>
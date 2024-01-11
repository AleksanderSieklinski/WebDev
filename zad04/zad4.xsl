<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
<xsl:output method="html" version="1.0" indent="yes" doctype-system="about:legacy-compact" />
  
<xsl:template match="/">
        <html>
            <head>
                <title>
                    Laboratorium 4 - ćwiczenia
                </title>
                <link rel="stylesheet" type="text/css" href="zad4.css" />
            </head>
            <body>
                <h1 id="h1o">
                  Laboratorium 4 - ćwiczenia
                </h1>
                <ul>
                  <li id= "desc"><xsl:value-of select="labs/lab[title='Ćwiczenie 1 - lista wszystkich studentów ']/title" /></li>
                  <li id= "desc"><xsl:value-of select="labs/lab[title='Ćwiczenie 2 - posortowana lista studentów ']/title" /></li>
                  <li id= "desc"><xsl:value-of select="labs/lab[title='Ćwiczenie 3 - posortowana lista studentów po roku studiów, nazwisku i imieniu']/title" /></li>
                  <li id= "desc"><xsl:value-of select="labs/lab[title='Ćwiczenie 4 - lista studentów na poszczególnych kierunkach']/title" /></li>
                </ul>
                <xsl:apply-templates select="labs/lab[title='Ćwiczenie 1 - lista wszystkich studentów ']" />
                <xsl:apply-templates select="labs/lab[title='Ćwiczenie 2 - posortowana lista studentów ']" />
                <xsl:apply-templates select="labs/lab[title='Ćwiczenie 3 - posortowana lista studentów po roku studiów, nazwisku i imieniu']" />
                <xsl:apply-templates select="labs/lab[title='Ćwiczenie 4 - lista studentów na poszczególnych kierunkach']" />
            </body>
        </html>
</xsl:template>
<xsl:template match="lab">
  <h2 id= "h1o"><xsl:value-of select="./title" /></h2>
  <p id= "desc"><xsl:value-of select="./description" /></p>
  <pre id= "frame"><xsl:value-of select="./code" /></pre>
</xsl:template>
</xsl:stylesheet>

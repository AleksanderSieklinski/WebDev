<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes" encoding="UTF-8"/>
  <xsl:param name="sortby" select="'name'"/>
  <xsl:template match="/">
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="../zad05/zad5.css"/>
      </head>
      <body>
        <h1>Inventory Report</h1>
        <table>
          <tr>
            <th>Group</th>
            <th>Lp.</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          <xsl:for-each select="products/group"> <!--error here-->
            <xsl:sort select="@name"/>
              <xsl:if test="$sortby = 'name'">
                <xsl:for-each select="product">
                  <xsl:sort select="@name" order="ascending" data-type="text" />
                  <tr>
                    <xsl:if test="position() = 1">
                      <td rowspan="{count(../product)}">
                        <xsl:value-of select="../@namegrp"/>
                      </td>
                    </xsl:if>
                    <td><xsl:value-of select="@lp"/></td>
                    <td><xsl:value-of select="@name"/></td>
                    <td><xsl:value-of select="@quantity"/></td>
                    <td><xsl:value-of select="@price"/></td>
                  </tr>
                </xsl:for-each>
              </xsl:if>
              <xsl:if test="$sortby = 'price'">
                <xsl:for-each select="product">
                  <xsl:sort select="@price" order="ascending" data-type="number" />
                  <tr>
                    <xsl:if test="position() = 1">
                      <td rowspan="{count(../product)}">
                        <xsl:value-of select="../@namegrp"/>
                      </td>
                    </xsl:if>
                    <td><xsl:value-of select="@lp"/></td>
                    <td><xsl:value-of select="@name"/></td>
                    <td><xsl:value-of select="@quantity"/></td>
                    <td><xsl:value-of select="@price"/></td>
                  </tr>
                </xsl:for-each>
              </xsl:if>
              <xsl:if test="$sortby = 'quantity'">
                <xsl:for-each select="product">
                  <xsl:sort select="@quantity" order="ascending" data-type="number" />
                  <tr>
                    <xsl:if test="position() = 1">
                      <td rowspan="{count(../product)}">
                        <xsl:value-of select="../@namegrp"/>
                      </td>
                    </xsl:if>
                    <td><xsl:value-of select="@lp"/></td>
                    <td><xsl:value-of select="@name"/></td>
                    <td><xsl:value-of select="@quantity"/></td>
                    <td><xsl:value-of select="@price"/></td>
                  </tr>
                </xsl:for-each>
              </xsl:if>
              <xsl:if test="$sortby = 'lp'">
                <xsl:for-each select="product">
                  <xsl:sort select="@lp" order="ascending" data-type="number" />
                  <tr>
                    <xsl:if test="position() = 1">
                      <td rowspan="{count(../product)}">
                        <xsl:value-of select="../@namegrp"/>
                      </td>
                    </xsl:if>
                    <td><xsl:value-of select="@lp"/></td>
                    <td><xsl:value-of select="@name"/></td>
                    <td><xsl:value-of select="@quantity"/></td>
                    <td><xsl:value-of select="@price"/></td>
                  </tr>
                </xsl:for-each>
              </xsl:if>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
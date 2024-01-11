#!/usr/bin/python3 
from lxml import etree
import os 
print ("Content-type: text/html")
print ()
xmlfile = open('../zad05/zad5.xml')
xslfile = open('../zad05/zad5.xsl')
xmldom = etree.parse(xmlfile)
xsldom = etree.parse(xslfile)
transform = etree.XSLT(xsldom)
result = transform(xmldom, sortby="'quantity'") # name,lp,price,quantity
print (result)
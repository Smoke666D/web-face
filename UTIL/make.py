#*******************************************************************************
#*******************************************************************************
#*******************************************************************************
import os
import codecs
import sys
sys.path.append('F:/PROJ/190729_ERGAN/SOFTWARE/embSite/UTIL/rcssmin-1.0.6')
from rcssmin import cssmin
sys.path.append('F:/PROJ/190729_ERGAN/SOFTWARE/embSite/UTIL/rjsmin-1.1.0')
from rjsmin import jsmin
#*******************************************************************************
def removeLink(string, name, type):
    index = string.find(name)
    if (index > 0):
        stIndex = -1
        i = 1;
        while (stIndex < 0):
            stIndex = string.find('<',index-i,index)
            i = i+1
        if (type == 'css'):
            enIndex = string.find('>',index)
        elif (type == 'js'):
            enIndex = string.find('</script>',index) + 9
    return  string[:stIndex] + string[enIndex+1:]
#*******************************************************************************
def minifyCss(css):
    return cssmin(css, keep_bang_comments=True)
#*******************************************************************************
def  minifyJs(js):
    out = jsmin(js, keep_bang_comments=False)
    return out
#*******************************************************************************
def minifyHtml(html):
    index = 1
    out = html
    fl = 0
    while (index > 0):
        index = out.find(">",index+1)
        if (index > 0):
            subindex = out.find("<",index)
            line = out[(index + 1):subindex]
            flag = 1
            for i in range(0,len(line)):
                if ((line[i] != " ") and (line[i] != "\n") and (line[i] != "\t") and (line[i] != "\r") and (ord(line[i]) != 0x0A)):
                    flag = 0
            if (flag == 1):
                out = out[:(index + 1)] + out[subindex:]
    index = 1
    subindex = 1
    while (index > 0):
        index = out.find("<!--",index+1)
        if(index > 0):
            subindex = out.find("-->", index) + 3
            out = out[:index] + out[subindex:]
    return out
#*******************************************************************************
def compilNex( text ):
    f = open("html.h","w+")
    f.write("#ifndef INC_HTML_H_\n");
    f.write("#define INC_HTML_H_\n");
    f.write("/*----------------------- Includes -------------------------------------*/\n");
    f.write("#include\t\"stm32f2xx_hal.h\"\n")
    f.write("/*------------------------ Define --------------------------------------*/\n")
    f.write("#define\t\tHTML_LENGTH\t\t" + str( len( text ) ) + "U\t\t//" + str( len( text ) / 1024 )  +  " Kb\n")
    f.write("static const unsigned char data__index_html[HTML_LENGTH] = {\n")

    length = len( text ) / 16;
    last = len( text ) - length * 16
    for i in range( 0, length ):
        f.write("\t\t")
        for j in range( 0, 16 ):
            f.write( hex(ord(text[i*16 + j])) + ", ")
        f.write("\n")
    if (last > 0):
        f.write("\t\t")
        for i in range( 0, last ):
            f.write( hex(ord(text[len( text ) - last + i]))+ ", " )
    f.write("};\n" )
    f.write("#endif /* INC_INDEX_H_ */")
    f.close()
    return
#*******************************************************************************
def make():
    # Get paths to html, css and js files
    localPath = os.getcwd()
    htmlPath  = os.path.split(localPath)[0]
    jsPath    = os.path.join(htmlPath,"js")
    cssPath   = os.path.join(htmlPath,"css")
    htmlPath  = os.path.join(htmlPath,"index.html")
    # Get lists of js and css files
    for root, dirs, files in os.walk(jsPath):
        jsFiles = files
    for root, dirs, files in os.walk(cssPath):
        cssFiles = files
    # Read html file
    htmlFile = open(htmlPath,"r")
    htmlText = minifyHtml(htmlFile.read())
    # Remove links to the css and js files from html file
    for cssFile in cssFiles:
        htmlText = removeLink(htmlText, cssFile,'css')
    for jsFile in jsFiles:
        htmlText = removeLink(htmlText, jsFile,'js')
    # Add css section
    index = htmlText.find("</head>")

    htmlText = htmlText[:index] + "<style>" + htmlText[index:]
    index = index + 7
    for cssFile in cssFiles:
        cssLink = os.path.join(cssPath,cssFile)
        cssText = minifyCss(open(cssLink,"r").read())
        htmlText = htmlText[:index] + cssText + htmlText[index:]
        index = index + len(cssText)
    htmlText = htmlText[:index] + "</style>" + htmlText[index:]
    # Add js section
    index = htmlText.find("</body>")
    stIndex = -1
    i = 0
    while (stIndex < 0):
        stIndex = htmlText.find("</div>",index-i,index)
        i = i + 1
    index = stIndex + 6
    htmlText = htmlText[:index] + "<script>" + htmlText[index:]
    index = index + 8
    for jsFile in jsFiles:
        jsLink = os.path.join(jsPath,jsFile)
        jsText = minifyJs(open(jsLink,"r").read())
        htmlText = htmlText[:index] + " " + jsText + htmlText[index:]
        index = index + len(jsText) + 1  #
    htmlText = htmlText[:index] + "</script><s" + htmlText[index:]
    # Write output file
    output = open("index_make.html","w+")
    output.write(htmlText)
    output.close()

    compilNex(htmlText)
#*******************************************************************************
make()
#*******************************************************************************

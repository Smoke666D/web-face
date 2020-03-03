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
    return jsmin(js, keep_bang_comments=False)
#*******************************************************************************
def minifyHtml(html):
    index = 1
    out = html
    fl = 0
    while (index > 0):
        index = out.find(">",index+1)
        comm = 0
        if (index > 0):
            subindex = out.find("<",index)
            if (out[subindex+1] == '!'):
                comm = 0
                comIndex = out.find(">",subindex)
            line = out[index+1:subindex]
            flag = 1
            for i in range(0,len(line)):
                if ((line[i] != " ") and (line[i] != "\n") and (line[i] != "\t") and (line[i] != "\r") and (ord(line[i]) != 0x0A)):
                    flag = 0
            if (flag == 1):
                if (comm == 1):
                    subindex = comIndex+1
                out = out[:index+1]+out[subindex:]
    return out
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
#*******************************************************************************
make()

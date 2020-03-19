#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
import os
import codecs
import sys
from rjsmin import jsmin
import gzip
try:
    from StringIO import StringIO   ## for Python 2
except ImportError:
    from io import StringIO         ## for Python 3
import base64
sys.path.append('F:/PROJ/190729_ERGAN/SOFTWARE/embSite/UTIL/rcssmin-1.0.6')
from rcssmin import cssmin
#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
def removeLink(string, name, type):
    result = 1
    out    = string
    index  = string.find(name)
    if (index > 0):
        stIndex = -1
        enIndex = -1
        i = 1;
        while (stIndex < 0):
            stIndex = string.find('<',index-i,index)
            i = i+1
        if (type == 'css'):
            enIndex = string.find('>',index)
        elif (type == 'js'):
            enIndex = string.find('</script>',index) + 8
        out = string[:stIndex] + string[enIndex+1:]
    else:
        result = 0
    return  [out, result]
#-------------------------------------------------------------------------------
def minifyCss(css):
    return cssmin(css, keep_bang_comments=True)
#-------------------------------------------------------------------------------
def cleanCss(css, html):
    cssOut = css
    cssCleaner(cssOut, html)
    return cssOut
#-------------------------------------------------------------------------------
def  minifyJs(js):
    out = jsmin(js, keep_bang_comments=False)
    return out
#-------------------------------------------------------------------------------
def encodeImg(imgPath):
    with open(imgPath, "rb") as f:
        data = f.read()
        return 'data:image/png;base64,' + data.encode("base64")
#-------------------------------------------------------------------------------
def compressString(string):
    out = StringIO.StringIO()
    with gzip.GzipFile(fileobj=out, mode="w") as f:
        f.write(string)
        string = out.getvalue()
    return len(string)
#-------------------------------------------------------------------------------
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
#-------------------------------------------------------------------------------
def compilHex( path, text, compressed ):
    f = open(path,"w+")
    f.write("#ifndef INC_HTML_H_\n");
    f.write("#define INC_HTML_H_\n");
    f.write("/*----------------------- Includes -------------------------------------*/\n");
    f.write("#include\t\"stm32f2xx_hal.h\"\n")
    f.write("/*------------------------ Define --------------------------------------*/\n")
    f.write("#define\t\tHTML_LENGTH\t\t\t" + str( len( text ) ) + "U\t\t//" + str( len( text ) / 1024 )  +  " Kb\n")
    cmpr = " "
    if ( compressed == 0 ):
        cmpr = "0U"
    else:
        cmpr = "1U"
    f.write("#define\t\tHTML_ENCODING\t\t" + cmpr + "\n")
    f.write("static const unsigned char data__index_html[HTML_LENGTH] = {\n")

    length = len( text ) / 16;
    last = len( text ) - length * 16
    for i in range( 0, length ):
        f.write("\t\t")
        for j in range( 0, 16 ):
            f.write( hex(ord(text[i*16 + j])) + ",\t")
        f.write("\n")
    if (last > 0):
        f.write("\t\t")
        for i in range( 0, last ):
            f.write( hex(ord(text[len( text ) - last + i]))+ ",\t" )
    f.write("};\n" )
    f.write("#endif /* INC_INDEX_H_ */")
    f.close()
    return ( len( text ) / 1024)
#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
def make(  minifyHTML = True, optimCSS = True, minifyCSS = True, minifyJS = True, compress = True, outPath = "D:/PROJECTS/ENERGAN/energan_enb/eth/site/index.h"):
    print("****************************************************")
    if (minifyHTML == True):
        print("HTML mimnfy   : On")
    else:
        print("HTML mimnfy   : Off")
    if (minifyCSS == True):
        print("CSS mimnfy    : On")
    else:
        print("CSS mimnfy    : Off")
    if (minifyJS == True):
        print("JS mimnfy     : On")
    else:
        print("JS mimnfy     : Off")
    if (optimCSS == True):
        print("CSS cleaner   : On")
    else:
        print("CSS cleaner   : Off")
    if (compress == True):
        print("Compression   : On")
    else:
        print("Compression   : Off")
    #------------ Get paths to html, css, js and img files -----------
    localPath = os.getcwd()
    htmlPath  = os.path.split(localPath)[0]
    jsPath    = os.path.join(htmlPath,"js")
    cssPath   = os.path.join(htmlPath,"css")
    imgPath   = os.path.join(htmlPath,"img")
    htmlPath  = os.path.join(htmlPath,"index.html")
    #------------- Get lists of js, css and image files --------------
    for root, dirs, files in os.walk(jsPath):
        jsFiles = files
    for root, dirs, files in os.walk(cssPath):
        cssFiles = files
    for root, dirs, files in os.walk(imgPath):
        imgFiles = files
    #------------------------- Read html file ------------------------
    htmlFile = open(htmlPath,"r")
    if (minifyHTML == True):
        htmlText = minifyHtml(htmlFile.read())
    else:
        htmlText = htmlFile.read()
    #------- Remove links to the css and js files from html file -----
    valid = []
    for i in range(0, len(cssFiles)):
        [htmlText, res] = removeLink(htmlText, cssFiles[i],'css')
        if (res == 0):
            valid.append(0)
        else:
            valid.append(1)
    for i in range(0, len(valid)):
        if (valid[i] == 0):
            del cssFiles[i]
    #del cssFiles[i]
    valid = []
    for i in range(0, len(jsFiles)):
        [htmlText, res] = removeLink(htmlText, jsFiles[i],'js')
        if (res == 0):
            valid.append(0)
        else:
            valid.append(1)
    for i in range(0, len(valid)):
        if (valid[i] == 0):
            del jsFiles[i]
    for file in jsFiles:
        print("include       : " + file)
    for file in cssFiles:
        print("include       : " + file)
    #------------------------ Encode favicon -------------------------
    length = len('<link rel="shortcut icon" href="')
    index  = htmlText.find('<link rel="shortcut icon" href="')
    if (index > 0):
        nameSt = htmlText.find('/',index) + 1
        nameEn = htmlText.find('">', nameSt)
        favName = htmlText[nameSt:nameEn]
        for name in imgFiles:
            if (name == favName):
                imgStr = encodeImg(os.path.join(imgPath,favName))
                htmlText = htmlText[:(index+length)] + imgStr + htmlText[nameEn:]
                sizeA = len(imgStr)/1024
                sizeB = compressString(imgStr)/1024
                delta = (sizeA - sizeB) * 100 / sizeA
                print("Favicon size  : from {} Kb to {} Kb ({}%)".format(sizeA,sizeB,delta))
    else:
        print("There is no favicon")
    #------------------------- Encode images -------------------------
    counter = 1
    for img in imgFiles:
        index = htmlText.find(img)
        if (index > 0):
            nameSt = htmlText.rfind('"',0,index)+1
            nameEn = htmlText.find('"',index)
            imgStr = encodeImg(os.path.join(imgPath,img))
            htmlText = htmlText[:nameSt] + imgStr + htmlText[nameEn:]
            sizeA = len(imgStr)/1024
            sizeB = compressString(imgStr)/1024
            delta = (sizeA - sizeB) * 100 / sizeA
            print("Image {}       : from {} Kb to {} Kb ({}%)".format(counter,sizeA,sizeB,delta))
            counter = counter + 1;
    #------------------------ Add css section ------------------------
    index = htmlText.find("</head>")
    htmlText = htmlText[:index] + "<style>" + htmlText[index:]
    index = index + 7
    for cssFile in cssFiles:
        cssLink = os.path.join(cssPath,cssFile)
        cssText = open(cssLink,"r").read()
        #if (optimCSS == True):
            #
            #
            #cssText = cleanCss(cssText, htmlText)
            #
            #
        if (minifyCSS == True):
            startSize = len(cssText)/1024
            cssText = minifyCss(cssText)
            finishSize = len(cssText)/1024
            delta = (startSize-finishSize)*100/startSize
            print("CSS mimnfy    : {} - from {} Kb to {} Kb ({}%)".format(cssFile,startSize,finishSize,delta))
        htmlText = htmlText[:index] + cssText + htmlText[index:]
        index = index + len(cssText)
    htmlText = htmlText[:index] + "</style>" + htmlText[index:]
    #------------------------ Add js section -------------------------
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
        jsText = open(jsLink,"r").read()
        if (minifyJS == True):
            startSize = len(jsText)/1024
            jsText = minifyJs(jsText)
            finishSize = len(jsText)/1024
            delta = (startSize-finishSize)*100/startSize
            print("JS mimnfy     : {} - from {} Kb to {} Kb ({}%)".format(jsFile,startSize,finishSize,delta))
        else:
            jsText = open(jsLink,"r").read()
        htmlText = htmlText[:index] + " " + jsText + htmlText[index:]
        index = index + len(jsText) + 1  #
    htmlText = htmlText[:index] + "</script>" + htmlText[index:]
    #------------------------- Compress file -------------------------
    if compress == True:
        startSize = len(htmlText)/1024

        out = StringIO.StringIO()
        with gzip.GzipFile(fileobj=out, mode="w") as f:
            f.write(htmlText)
        htmlCompress = out.getvalue()

        finishSize = len(htmlCompress)/1024
        delta = (startSize-finishSize)*100/startSize
        print("Compression   : from {} Kb to {} Kb ({}%)".format(startSize,finishSize,delta))
    #----------------------- Write output files -----------------------
    output = open("index.html","w+")
    output.write(htmlText)
    output.close()
    if (compress == True):
        size = compilHex(outPath, htmlCompress, 1)
    else:
        size = compilHex(outPath, htmlText, 0)
    print("Outut HEX     : " + outPath)
    print("HEX file      : " + str(size) + " Kb")
    print("Done!")
    print("****************************************************")
#*******************************************************************************
make(minifyHTML = False, optimCSS = True, minifyCSS = True, minifyJS = True, compress = True)
#*******************************************************************************

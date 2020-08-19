#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
from time import gmtime, strftime
import os;
import time;
import codecs;
import sys;
import gzip;
try:
    from StringIO import StringIO;   ## for Python 2
except ImportError:
    from io import StringIO;         ## for Python 3
import base64;
sys.path.append( 'rcssmin-1.0.6' );
from rcssmin import cssmin;
sys.path.append( 'rjsmin-1.1.0' );
from rjsmin import jsmin;
#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
def removeLink( string, name, type ):
    result  = 1;
    out     = string;
    index   = string.find( name );
    stIndex = 0;
    if index > -1:
        stIndex = out.rfind( '<', 0, index );
        enIndex = out.find( '>', index ) + 1;
        if type == 'css':
            enIndex = string.find( '>', index ) + 1;
        elif type == 'js':
            enIndex = string.find( '</script>', index ) + 9;
        out = string[:stIndex] + string[enIndex:];
    else:
        result = 0;
    return  [out, result, stIndex];
#-------------------------------------------------------------------------------
def addJsSection( jsLink, htmlText, index, minifyJS ):
    jsFile = jsLink[(jsLink.rfind("\\", 0) + 1 ) : len(jsLink) ]
    out    = htmlText;
    jsText = open( jsLink, "r" ).read();
    if ( jsLink.find( 'filesaver' ) == -1 ):
        jsText = removeElectronFromJS( jsText );
    smallFile = 0;
    if ( minifyJS == True ) and ( jsFile.find(".min.") == -1 ):
        if len( jsText ) < 1024:
            startSize = len( jsText );
            smallFile = 1;
        else:
            startSize = len( jsText ) / 1024;
        jsText = minifyJs( jsText );
        if (smallFile == 1):
            finishSize = len( jsText );
        else:
            finishSize = len( jsText ) / 1024;
        delta = ( startSize - finishSize ) * 100 / startSize;
        if smallFile == 0:
            print( "JS mimnfy     : {} - from {} Kb to {} Kb ({}%)".format( jsFile, startSize, finishSize, delta ) );
        else:
            print("JS mimnfy     : {} - from {} byte to {} byte ({}%)".format( jsFile, startSize, finishSize, delta ) );
    out   = out[:index] + "<script>" + jsText + "</script>" + out[index:];
    return out;
#-------------------------------------------------------------------------------
def addCssSection( cssLink, htmlText, index, minifyCSS, optimCSS ):
    out     = htmlText;
    cssText = open( cssLink, "r" ).read();
    cssFile = cssLink[( cssLink.rfind("\\") + 1 ):len(cssLink)];
    smallFile = 0;
    if ( optimCSS == True ):
        if len( cssText ) < 1024:
            startSize = len( cssText );
            smallFile = 1;
        else:
            startSize = len( cssText ) / 1024;
        cssText = cleanCss( cssText, htmlText )
        if smallFile == 1:
            finishSize = len( cssText );
        else:
            finishSize = len( cssText ) / 1024;
        delta = ( startSize - finishSize ) * 100 / startSize;
        if smallFile == 0:
            print( "CSS clean     : {} - from {} Kb to {} Kb ({}%)".format( cssFile, startSize, finishSize, delta ) );
        else:
            print( "CSS clean     : {} - from {} byte to {} byte ({}%)".format( cssFile, startSize, finishSize, delta ) );


    smallFile = 0;
    if minifyCSS == True:
        if len( cssText ) < 1024:
            startSize = len( cssText );
            smallFile = 1;
        else:
            startSize = len( cssText ) / 1024;
        if ( cssFile.find( ".min." ) == -1 ):
            cssText = minifyCss( cssText );
        if smallFile == 1:
            finishSize = len( cssText );
        else:
            finishSize = len( cssText ) / 1024;
        delta = ( startSize - finishSize ) * 100 / startSize;
        if smallFile == 0:
            print( "CSS mimnfy    : {} - from {} Kb to {} Kb ({}%)".format( cssFile, startSize, finishSize, delta ) );
        else:
            print( "CSS mimnfy    : {} - from {} byte to {} byte ({}%)".format( cssFile, startSize, finishSize, delta ) );
    out = out[:index] + "<style>" + cssText  + "</style>\n" + out[index:];
    return out
#-------------------------------------------------------------------------------
def minifyCss( css ):
    delList = ["  ", "\n", "\r"];
    spacesPlace =  ["; }", ": "," {", "} }", ", ", " !", "' ", " > ", " - ", " + ", " ~ ", "{ }"];
    replacePlace = [";}" , ":" ,"{" , "}}" , "," , "!" , "'" , ">"  , "-"  , "+"  , "~"  , "{}" ];
    indexStr = 0;
    indexEnd = 0;

    index    = 1;
    subindex = 1;
    while index > -1:
        index = css.find( "/*", index + 1 );
        if index > -1:
            subindex = css.find( "*/", index ) + 2;
            css      = css[:index] + css[subindex:];

    for delItem in delList:
        css = css.replace( delItem, "" );
    for i in range( 0, len( spacesPlace ) ):
        css = css.replace( spacesPlace[i], replacePlace[i] );

    return css;
#-------------------------------------------------------------------------------
def cleanCss( css, html ):
    cssOut    = css;
    htmlBuf   = html;
    classList = [];
    indexStr  = 0;
    indexEnd  = 0;
    #---------------------------------------------------------------------------
    while( indexStr > -1 ):
        indexStr = htmlBuf.find( 'class="', ( indexStr + 1 ) );
        if ( indexStr > -1 ):
            indexEnd = htmlBuf.find( '"', ( indexStr + 7 ) ) + 1;
            classes = htmlBuf[ ( indexStr + 7 ) : ( indexEnd - 1 ) ];
            classes = classes.split();
            for cl in classes:
                classList.append( cl );
            htmlBuf = htmlBuf[:indexStr] + htmlBuf[indexEnd:]
    classList = list( dict.fromkeys( classList ) );
    #---------------------------------------------------------------------------
    indexStr = 0;
    indexEnd = 0;
    indexCut = 0;
    while ( indexStr > -1 ):
        indexStr = cssOut.find(".", ( indexStr + 1 ) );
        if ( indexStr > -1 ):
            indexEnd = cssOut.find( "{",indexStr );
            indexCut = cssOut.find("}",indexStr);
            if ( indexCut > indexEnd ):
                used    = 0;
                subStr  = cssOut[ indexStr : indexEnd ];
                for item in classList:
                    subList = subStr.split();
                    for subItem in subList:
                        if ( subItem[0] == '.' ):
                            subItem = subItem[1:];
                            if ( subItem == item ):
                                used = 1;
                if ( used == 0 ):
                    cssOut = cssOut[:indexStr] + cssOut[indexCut+1:];
                else:
                    indexStr = indexCut + 1;
    cssOut = cssOut.replace("\n\n","")
    cssOut = cssOut.replace("\n  \n","")
    #---------------------------------------------------------------------------
    return cssOut;
#-------------------------------------------------------------------------------
def  minifyJs( js ):
    js = js.replace( "return;", "" );
    out = jsmin( js, keep_bang_comments = False );
    return out;
#-------------------------------------------------------------------------------
def encodeImg( imgPath ):
    with open( imgPath, "rb" ) as f:
        data = f.read();
        try:
            return 'data:image/png;base64,' + str( base64.b64encode( data ), "utf-8" );
        except:
            return 'data:image/png;base64,' + data.encode( "base64" );
#-------------------------------------------------------------------------------
def compressString( string ):
    try:
        out = StringIO.StringIO();
    except:
        out = StringIO();
    with gzip.GzipFile( fileobj = out, mode = "w" ) as f:
        f.write( string );
        string = out.getvalue();
    return len( string );
#-------------------------------------------------------------------------------
def removeElectronFromHTML( html ):
    index = 1;
    out   = html;
    while index > -1:
        index = out.find( "electron", index + 1 );
        if index > -1:
            startIndex = out.rfind( "<", 0, index );
            endIndex   = out.find( ">", index ) + 1;
            divCounter = 1;
            i = endIndex;
            while True:
                i = out.find( "<", i );
                if (out[i+1] != '!'):
                    if (out[i + 1] != '/'):
                        divCounter += 1;
                    else:
                        divCounter -= 1;
                i += 1;
                if divCounter == 0:
                    break;
            endIndex = out.find( ">", i ) + 1;
            out = out[:startIndex] + out[endIndex:];
    index      = out.find( "require", 0 );
    startIndex = 0;
    endIndex   = 0;
    if index > 0:
        startIndex = out.rfind( "<script>", 0, index );
        endIndex   = out.find( "</script>", index ) + 9;
        out        = out[:startIndex] + out[endIndex:];
    return out;
#-------------------------------------------------------------------------------
def removeElectronFromJS( js ):
    index = 0;
    out   = js;
    #------------------ Module exports ------------------
    while index > -1:
        index = out.find( "module.exports.", index + 1 );
        if index > -1:
            startIndex = index;
            endIndex   = out.find(";", startIndex) + 1;
            out        = out[:startIndex] + out[endIndex:];
    #--------------------- require ----------------------
    index = 0;
    while index > -1:
        index = out.find( 'require(', index + 1 );
        if index > -1:
            startIndex = out.rfind( 'const', 0, index );
            endIndex   = out.find( ';', index ) + 1;
            if startIndex > -1 and endIndex > -1:
                out = out[:startIndex] + out[endIndex:];
    #----------------------------------------------------
    return out;
#-------------------------------------------------------------------------------
def minifyHtml( html ):
    index = 1;
    out   = html;
    fl    = 0;
    while index > -1:
        index = out.find( ">", index + 1 );
        if index > -1:
            subindex = out.find( "<", index );
            line     = out[( index + 1 ):subindex];
            flag     = 1;
            for i in range( 0, len( line ) ):
                if ( ( line[i] != " " ) and ( line[i] != "\n" ) and ( line[i] != "\t" ) and ( line[i] != "\r" ) and ( ord( line[i] ) != 0x0A ) ):
                    flag = 0;
            if (flag == 1):
                out = out[:( index + 1 )] + out[subindex:];
    index    = 1;
    subindex = 1;
    while index > -1:
        index = out.find( "<!--", index + 1 );
        if index > -1:
            subindex = out.find( "-->", index ) + 3;
            out      = out[:index] + out[subindex:];
    return out;
#-------------------------------------------------------------------------------
def compilEWA( path, data ):
    crc = 0;
    f   = open( path, "w+" );
    for byte in data:
        f.write( format( ord( byte ), 'x' ) + ' ' );
        crc = crc + ord( byte );
    crc = crc & 0xFF;
    f.write( format( crc, 'x' ) );
    f.close();
    return;
#-------------------------------------------------------------------------------
def compilHex( path, text, compressed ):
    f = open(path,"w+");
    f.write( "#ifndef INC_HTML_H_\n" );
    f.write( "#define INC_HTML_H_\n" );
    f.write( "/*----------------------- Includes -------------------------------------*/\n" );
    f.write( "#include\t\"stm32f2xx_hal.h\"\n" );
    f.write( "/*------------------------ Define --------------------------------------*/\n" );
    f.write( "#define\t\tHTML_LENGTH\t\t\t" + str( len( text ) ) + "U\t\t//" + str( len( text ) / 1024 )  +  " Kb\n" );
    cmpr = " ";
    if compressed == 0:
        cmpr = "0U";
    else:
        cmpr = "1U";
    f.write( "#define\t\tHTML_ENCODING\t\t" + cmpr + "\n" );
    f.write( "static const unsigned char data__index_html[HTML_LENGTH] = {\n" );
    length = len( text ) / 16;
    last   = len( text ) - length * 16;
    for i in range( 0, length ):
        f.write( "\t\t" );
        for j in range( 0, 16 ):
            f.write( hex( ord( text[i*16 + j] ) ) + ",\t" );
        f.write( "\n" );
    if last > 0:
        f.write( "\t\t" );
        for i in range( 0, last ):
            f.write( hex( ord( text[len( text ) - last + i] ) ) + ",\t" );
    f.write( "};\n" );
    f.write( "#endif /* INC_INDEX_H_ */" );
    f.close();
    return len( text );
#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
def make(  minifyHTML = False, optimCSS = False, minifyCSS = False, minifyJS = False, compress = True, outPath = "C:/PROJECTS/ENERGAN/energan_enb/eth/site/index.h"):
    print( "****************************************************" )
    if minifyHTML == True:
        print( "HTML mimnfy   : On" );
    else:
        print( "HTML mimnfy   : Off" );
    if minifyCSS == True:
        print( "CSS mimnfy    : On" );
    else:
        print( "CSS mimnfy    : Off" );
    if minifyJS == True:
        print( "JS mimnfy     : On" );
    else:
        print( "JS mimnfy     : Off" );
    if optimCSS == True:
        print( "CSS cleaner   : On" );
    else:
        print( "CSS cleaner   : Off" );
    if compress == True:
        print( "Compression   : On" );
    else:
        print( "Compression   : Off" );
    #------------ Get paths to html, css, js and img files -----------
    localPath = os.getcwd();
    path      = os.path.split( localPath )[0];
    jsPath    = os.path.join( path,"js" );
    cssPath   = os.path.join( path,"css" );
    imgPath   = os.path.join( path,"img" );
    htmlPath  = os.path.join( path,"index.html" );
    #------------- Get lists of js, css and image files --------------
    for root, dirs, files in os.walk( jsPath ):
        jsFiles = files;
    for root, dirs, files in os.walk( cssPath ):
        cssFiles = files;
    for root, dirs, files in os.walk( imgPath ):
        imgFiles = files;
    #------------------------- Remove key.js -------------------------
    for i in range( 0, ( len( jsFiles ) - 1 ) ):
        if jsFiles[i] == 'key.js':
            del jsFiles[i];
    #------------------------- Read html file ------------------------
    try:
        htmlFile = open( htmlPath, encoding="utf-8" );
    except:
        htmlFile = open( htmlPath, "r" );
    htmlText = htmlFile.read();
    htmlText = removeElectronFromHTML( htmlText );
    if minifyHTML == True:
        htmlText = minifyHtml( htmlText );
    #----------- Remove links and add css files from html file --------
    valid = [];
    for cssFile in cssFiles:
        [htmlText, res, index] = removeLink( htmlText, cssFile, 'css' );
        if res == 0:
            valid.append( 0 );
        else:
            valid.append( 1 );
            htmlText = addCssSection( os.path.join( cssPath, cssFile ), htmlText, index, minifyCSS, optimCSS );
    buffer = [];
    for i in range( 0, len( valid ) ):
        if valid[i] == 1:
            buffer.append( cssFiles[i] );
    cssFiles = buffer;
    #----------- Remove links and add js files and to html file --------
    valid = [];
    for i in range( 0, len( jsFiles ) ):
        [htmlText, res, index] = removeLink( htmlText, jsFiles[i], 'js' );
        if res == 0:
            valid.append( 0 );
        else:
            valid.append( 1 );
            htmlText = addJsSection( os.path.join( jsPath, jsFiles[i] ), htmlText, index, minifyJS );   # Add js section
    buffer = []
    for i in range( 0, len( valid ) ):
        if valid[i] == 1:
            buffer.append( jsFiles[i] );
    jsFiles = buffer;
    #------------------ Reset ElectronApp flag ----------------------
    startIndex = htmlText.find( "var electronApp = " );
    endIndex   = htmlText.find( ';', startIndex );
    htmlText   = htmlText[:startIndex] + "var electronApp=0" + htmlText[endIndex:];
    startIndex = htmlText.find( "var electronApp=" );
    endIndex   = htmlText.find( ';', startIndex );
    htmlText   = htmlText[:startIndex] + "var electronApp=0" + htmlText[endIndex:];
    #----------------- Print all included files ---------------------
    for file in jsFiles:
        print( "include       : " + file );
    for file in cssFiles:
        print( "include       : " + file );
    #------------------------- Encode images -------------------------
    counter = 1;
    for img in imgFiles:
        index = htmlText.find( img );
        if index > -1:
            nameSt   = htmlText.rfind( '"', 0, index ) + 1;
            nameEn   = htmlText.find( '"', index );
            imgStr   = encodeImg( os.path.join( imgPath, img ) );
            htmlText = htmlText[:nameSt] + imgStr + htmlText[nameEn:];
            sizeA    = len( imgStr ) / 1024;
            sizeB    = compressString( imgStr ) / 1024;
            delta    = ( sizeA - sizeB ) * 100 / sizeA;
            print( "Image {}       : from {} Kb to {} Kb ({}%)".format( counter, sizeA, sizeB, delta ) );
            counter = counter + 1;
    #------------------------- Compress file -------------------------
    if compress == True:
        startSize = len( htmlText ) / 1024;
        try:
            out = StringIO.StringIO();
        except:
            out = StringIO();
        with gzip.GzipFile( fileobj = out, mode="w" ) as f:
            f.write( htmlText );
        htmlCompress = out.getvalue();
        finishSize   = len( htmlCompress ) / 1024;
        delta        = ( startSize - finishSize ) * 100 / startSize;
        print( "Compression   : from {} Kb to {} Kb ({}%)".format( startSize, finishSize, delta ) );
    #----------------------- Write output files -----------------------
    output = open( "index.html", "w+" );
    output.write( htmlText );
    output.close();
    if compress == True:
        size = compilHex( outPath, htmlCompress, 1 );
        name = strftime("%y%m%d", gmtime()) + '.ewa';
        compilEWA( os.path.join( path, name ), htmlCompress );
    else:
        size = compilHex( outPath, htmlText, 0 );
    print( "Outut HEX     : " + outPath );
    print( "HEX file      : " + ( str(size / 1024) ) + " Kb (" + str(size) + " byte)"  );
    print( "Done!" );
    print( "****************************************************" );
#*******************************************************************************
if __name__ == "__main__":
    make( minifyHTML = False, optimCSS = False, minifyCSS = False, minifyJS = False, compress = True );
#*******************************************************************************

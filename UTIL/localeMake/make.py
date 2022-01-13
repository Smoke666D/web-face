#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
import os;
import shutil;
import csv;
#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
def make():
  print( "*************************************");
  print( "         Locales maker start         ");
  print( "*************************************");
  rawData    = [];
  path       = os.getcwd();
  if not path.endswith( "localeMake" ):
    path = os.path.join( path, "UTIL" );
    path = os.path.join( path, "localeMake" );
  #-------------------------------------------------
  tablePath  = os.path.join( path,"web-interface-localse.csv" );
  try:
    with open( tablePath, mode='r', encoding='utf-8' ) as file:
      reader  = csv.DictReader( file, delimiter=',' );
      headers = reader.fieldnames;
      for row in reader:
        rawData.append( row );
    locNum = 0;
    for head in headers:
      if ( len( head ) == 2 ):
        locNum += 1;
    print( '>> Table content ' + str( locNum ) + ' languages' );
    print( '>> Table content ' + str( len( rawData ) ) + ' messages' );
    #-------------------------------------------------
    targetPath = os.path.join( os.path.split( os.path.split( path )[0] )[0], 'locales' );
    if os.path.exists( targetPath ) and os.path.isdir( targetPath ):
      shutil.rmtree( targetPath );
    os.makedirs( targetPath );
    #-------------------------------------------------
    for head in headers:
      if ( len( head ) == 2 ):
        print( ">> " + head );
        langPath = os.path.join( targetPath, head );
        os.makedirs( langPath );
        filePath = os.path.join( langPath, 'messages.json' );
        file     = open( filePath, mode='w', encoding='utf-8' );
        file.write( '{\n' );
        for data in rawData:
          file.write( '  "' + data["name"] + '": "' + data[head] + '",\n'  );
        file.write( '\n}' )
  except:
    print( "No language table" );
  #-------------------------------------------------
  return;
#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
if __name__ == "__main__":
    make();
#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
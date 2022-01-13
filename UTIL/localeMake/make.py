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
  tablePath = os.path.join( path,"web-interface-localse.csv" );
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
    tableOpen = True; 
    print( '>> Table contains ' + str( locNum ) + ' languages' );
    print( '>> Table contains ' + str( len( rawData ) ) + ' messages' );
  except:
    tableOpen = False; 
    print( "No language table" );
    #-------------------------------------------------
  if tableOpen == True: 
    targetPath = os.path.join( os.path.split( os.path.split( path )[0] )[0], 'locales' );
    if os.path.exists( targetPath ) and os.path.isdir( targetPath ):
      shutil.rmtree( targetPath );
    os.makedirs( targetPath );
    #-------------------------------------------------
    counter = 1;
    for head in headers:
      if ( len( head ) == 2 ):
        print( str( counter ) + '. ' + head );
        valid = True;
        langPath = os.path.join( targetPath, head );
        os.makedirs( langPath );
        filePath = os.path.join( langPath, 'messages.json' );
        file     = open( filePath, mode='w', encoding='utf-8' );
        file.write( '{\n' );
        for data in rawData:
          if len( data[head] ) == 0:
            valid = False;
          file.write( '  "' + data["name"] + '": "' + data[head] + '",\n'  );
        file.write( '\n}' );
        file.close();
        if valid == False:
          print( '>> "' + head + '" language data is invalid! I have delete folder "' + head + '"' );
          if os.path.exists( langPath ) and os.path.isdir( langPath ):
            shutil.rmtree( langPath );
        counter += 1;
  #-------------------------------------------------
  print( "*************************************");
  return;
#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
if __name__ == "__main__":
    make();
#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
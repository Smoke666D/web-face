function SD () {
  function mergeSize ( low, hight )
  {
    return ( low & 0xFFFF ) | ( ( hight & 0xFFFF ) << 16 );
  }
  function setDim ( value ) {
    let dim = 'Кб';
    let out = value;
    if ( out > 1024 ) {
      out = out / 1024;
      dim = 'Мб';
    }
    if ( out > 1024 ) {
      out = out / 1024;
      dim = 'Гб';
    }
    return [out, dim];
  }
  this.update = function ( sizeLow, sizeHight, usageLow, usageHight ) {
    let size  = mergeSize( sizeLow, sizeHight );
    let usage = size - mergeSize( usageLow, usageHight );
    /* Data come in Kb */
    let dimSize  = 'Кб';
    let dimUsage = 'Кб';
    if ( size > 0 ) {    
      let fract = ( usage / size * 100 ).toFixed( 1 ) + '%';
      [size, dimSize]   = setDim( size );
      [usage, dimUsage] = setDim( usage );
      document.getElementById( 'sdStatus' ).innerHTML      = 'Подключена';
      document.getElementById( 'sd-progress' ).style.width = fract;
      document.getElementById( 'sd-procent' ).innerHTML    = fract; 
      document.getElementById( 'sdSize' ).innerHTML        = usage.toFixed( 1 ) + ' ' +  dimUsage + ' из ' + size.toFixed( 1 ) + ' ' + dimSize;
    } else {
      document.getElementById( 'sdStatus' ).innerHTML      = 'Не подключена';
      document.getElementById( 'sd-progress' ).style.width = '0%';
      document.getElementById( 'sd-procent' ).innerHTML    = '0%'; 
      document.getElementById( 'sdSize' ).innerHTML        = '0 Кб из 0 Кб';
    }  
    return;
  }
}

let sdCard = new SD();
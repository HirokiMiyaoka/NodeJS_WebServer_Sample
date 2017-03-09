var http     = require( 'http' );
var fs       = require( 'fs' );
var path     = require( 'path' );

var server   = http.createServer();
var settings = require('./config.json');

console.log( settings );

var docroot = settings.docroot || 'public';

var MIME =
{
	'css':	'text/css',
	'gif':	'image/gif',
	'gz':	'application/gzip',
	'html':	'text/html',
	'ico':	'image/x-icon',
	'jpg':	'image/jpeg',
	'js':	'text/javascript',
	'png':	'image/png',
	'txt':	'text/plain',
	'zip':	'application/zip',
};

if ( settings.mime )
{
	Object.keys( settings.mime ).forEach( function( key )
	{
		MIME[ key ] = settings.mime[ key ];
	} );
}

function e404( res )
{
	res.writeHead( 404, { 'Content-Type': 'text/plain' } );
	res.write( '404: page not found.' );
	res.end();
}

function fileExists( filepath )
{
	try
	{
		fs.statSync(filepath);
		return true
	} catch( err ) {}
	return false;
}

server.on( 'request', function ( req, res )
{
	var filepath = ( req.url || '/' ).split( '?' )[ 0 ];
	if ( filepath.match( /\/$/ ) ) { filepath += 'index.html'; }
	filepath = path.join( docroot, filepath );

	if ( !fileExists( filepath ) ) { return e404( res ); }

	fs.readFile( filepath, 'utf-8', function( err, data )
	{
		if( err ) { return e404( res ); }
		var extname = path.extname( filepath ).replace( '.', '' );
		res.writeHead( 200, { 'Content-Type': MIME[ extname ] || 'text/plain' } );
		res.write( data );
		res.end();
	} );
} );

server.listen( settings.port || 8080, settings.host || '127.0.0.1' );

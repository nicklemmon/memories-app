require( 'dotenv' ).config()

const express = require( 'express' )
const mongoose = require( 'mongoose' )
const bodyParser = require( 'body-parser' )

const app = express()
const router = express.Router()
const port = 3001

const Memory = require( './src/model/memories.js' )

// DB config
mongoose.connect( `mongodb://${process.env.REACT_APP_MLAB_USERNAME}:${process.env.REACT_APP_MLAB_PASSWORD}@${process.env.REACT_APP_MLAB_DB_ADDRESS}` )

// Adding middleware
app.use( bodyParser.urlencoded( { extended: true } ) )
app.use( bodyParser.json() )

// Fixes CORs issues!
app.use( function( req, res, next ) {
  res.setHeader( 'Access-Control-Allow-Origin', '*' )
  res.setHeader( 'Access-Control-Allow-Credentials', 'true' )
  res.setHeader( 'Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE' )
  res.setHeader( 'Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers' )
  res.setHeader( 'Cache-Control', 'no-cache' )
  next()
})

router.get( '/', function( req, res ) {
  res.json( { message: 'API Initialized!' } )
})

router.route( '/memories' )
  .get( function( req, res ) {
    Memory.find( function( err, memories ) {
      if ( err ) res.send( err )

      res.json( memories )
    })
  })
  .post( function( req, res ) {
    const memory = new Memory()

    memory.title = req.body.title
    memory.date = req.body.date
    memory.summary = req.body.summary
    memory.tags = req.body.tags

    memory.save( function( err ) {
      if ( err ) res.send( err )

      res.json( { message: 'Memory successfully added!' } )
    })
  })

router.route( '/memories/:id' )
  .delete( function( req, res ) {
    Memory.remove( {
      _id: req.params.id
    }, function( err, memory ) {
      if ( err ) res.send( err )

      res.json( { message: 'Memory has been deleted' } )
    })
  })
  
// Use our router configuration when we call /api
app.use( '/api', router )

// Starts the server and listens for requests
app.listen( port, function() {
  console.log( `API running on port ${port}` );
})
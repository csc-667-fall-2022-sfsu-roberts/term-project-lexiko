const socketIo = require( 'socket.io' )
const { USER_JOINED, MESSAGE_SEND } = require( '../src/constants/events' )

const Server = socketIo.Server;

const init = ( app, server ) => {
  const io = new Server( server )

  app.set( 'io', io )

  io.on( 'connection', socket => {
    console.log( 'client connected' )

    socket.on( 'disconnect', data => {
      console.log( 'client disconnected' )
    })

    socket.on( USER_JOINED, data => io.emit( USER_JOINED, data ))
    socket.on( "chat message", data => io.emit( "chat message", data ))
    socket.on("game event", data => {
        console.log((data.name + " played " + data.turn + " and ended their turn!"));
        io.emit("game event", (data.name + " played " + data.turn + " and ended their turn!") )
    })
  })
}

module.exports = { init }
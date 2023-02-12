'use strict';

const app = require('express')();
var bodyParser = require('body-parser')
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');
//const server = require('express');
//const socketIO = require('socket.io');
const path = require('path');

const admin = require("firebase-admin");

// this is a firebase adminsdk serviceaccount.  ends in .json
var serviceAccount = require("./ue4topia-firebase-adminsdk-xxxxx.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://uetopia.firebaseio.com"
});

// parse application/json
app.use(bodyParser.json())

// Get the socket for a firebase user
function findFirebaseUserSocket(firebaseUserId) {
  //var allConnectedClients = Object.keys(io.sockets.connected);
  let allConnectedClients = io.sockets.connected;
  //console.log(allConnectedClients);
  for (let socketinstance in allConnectedClients) {
    //console.log('checking for user socket...');
    //console.log(socketinstance);
    //console.log(allConnectedClients[socketinstance].firebaseUserId);
    if (allConnectedClients[socketinstance].firebaseUserId == firebaseUserId ) {
      console.log('found a socket for this firebase user')
      return allConnectedClients[socketinstance];
    }

  }
}

///////////////////////////////////////////////////////////////
// API endpoints for responding to appengine incoming requests
////////////////////////////////////////////////////////////////

// TODO verify authentic request -shared secret sign?
app.put('/user/:userFirebaseUID/friend/:friendUserKeyId', function(req, res) {
  console.log("userFirebaseUID is set to " + req.params.userFirebaseUID);
  console.log("friendUserKeyId is set to " + req.params.friendUserKeyId);
  // testing - find the socket by going through the array
  var targetsocket = findFirebaseUserSocket(req.params.userFirebaseUID);
  if (targetsocket){
    targetsocket.emit('friend_changed', req.body);
  }

  // send the message out to the user's namespace socket connection
  //io.of(req.params.userFirebaseUID).emit('friend_changed', req.body);
  //TODO - check to see if the game they are playing is the same as the game the socket is connected to.
  res.send(req.body);    // echo the result back
});

// TODO verify authentic request -shared secret sign?
app.put('/user/:userFirebaseUID/friend/invite/send', function(req, res) {
  console.log("userFirebaseUID is set to " + req.params.userFirebaseUID);
  // testing - find the socket by going through the array
  var targetsocket = findFirebaseUserSocket(req.params.userFirebaseUID);
  if (targetsocket){
    //console.log("found user socket");
    targetsocket.emit('friend_invitation', req.body);
  }

  // send the message out to the user's namespace socket connection
  //io.of(req.params.userFirebaseUID).emit('friend_changed', req.body);
  //TODO - check to see if the game they are playing is the same as the game the socket is connected to.
  res.send(req.body);    // echo the result back
});

// TODO verify authentic request -shared secret sign?
app.put('/user/:userFirebaseUID/party/invite/send', function(req, res) {
  console.log("userFirebaseUID is set to " + req.params.userFirebaseUID);
  // testing - find the socket by going through the array
  var targetsocket = findFirebaseUserSocket(req.params.userFirebaseUID);
  if (targetsocket){
    //console.log("found user socket");
    targetsocket.emit('party_invitation', req.body);
  }

  // send the message out to the user's namespace socket connection
  //io.of(req.params.userFirebaseUID).emit('friend_changed', req.body);
  //TODO - check to see if the game they are playing is the same as the game the socket is connected to.
  res.send(req.body);    // echo the result back
});

// TODO verify authentic request -shared secret sign?
app.put('/user/:userFirebaseUID/party/invite/response', function(req, res) {
  console.log("userFirebaseUID is set to " + req.params.userFirebaseUID);
  // testing - find the socket by going through the array
  var targetsocket = findFirebaseUserSocket(req.params.userFirebaseUID);
  if (targetsocket){
    //console.log("found user socket");
    targetsocket.emit('party_invitation_response', req.body);
  }

  // send the message out to the user's namespace socket connection
  //io.of(req.params.userFirebaseUID).emit('friend_changed', req.body);
  //TODO - check to see if the game they are playing is the same as the game the socket is connected to.
  res.send(req.body);    // echo the result back
});

// TODO verify authentic request -shared secret sign?
app.put('/user/:userFirebaseUID/team/:teamKeyId', function(req, res) {
  console.log("userFirebaseUID is set to " + req.params.userFirebaseUID);
  console.log("teamKeyId is set to " + req.params.teamKeyId);
  // testing - find the socket by going through the array
  var targetsocket = findFirebaseUserSocket(req.params.userFirebaseUID);
  if (targetsocket){
    targetsocket.emit('party_changed', req.body);
  }

  // send the message out to the user's namespace socket connection
  //io.of(req.params.userFirebaseUID).emit('friend_changed', req.body);
  //TODO - check to see if the game they are playing is the same as the game the socket is connected to.
  res.send(req.body);    // echo the result back
});

// TODO verify authentic request -shared secret sign?
app.put('/user/:userFirebaseUID/matchmaker/started', function(req, res) {
  console.log("userFirebaseUID is set to " + req.params.userFirebaseUID);
  // testing - find the socket by going through the array
  var targetsocket = findFirebaseUserSocket(req.params.userFirebaseUID);
  if (targetsocket){
    targetsocket.emit('matchmaker_started', req.body);
  }

  // send the message out to the user's namespace socket connection
  //io.of(req.params.userFirebaseUID).emit('friend_changed', req.body);
  //TODO - check to see if the game they are playing is the same as the game the socket is connected to.
  res.send(req.body);    // echo the result back
});


// TODO verify authentic request -shared secret sign?
app.put('/user/:userFirebaseUID/matchmaker/complete', function(req, res) {
  console.log("userFirebaseUID is set to " + req.params.userFirebaseUID);
  // testing - find the socket by going through the array
  var targetsocket = findFirebaseUserSocket(req.params.userFirebaseUID);
  if (targetsocket){
    targetsocket.emit('matchmaker_complete', req.body);
  }

  // send the message out to the user's namespace socket connection
  //io.of(req.params.userFirebaseUID).emit('friend_changed', req.body);
  //TODO - check to see if the game they are playing is the same as the game the socket is connected to.
  res.send(req.body);    // echo the result back
});

// TODO verify authentic request -shared secret sign?
app.put('/user/:userFirebaseUID/roomchat/:chatMessageKeyId', function(req, res) {
  console.log("userFirebaseUID is set to " + req.params.userFirebaseUID);
  console.log("chatMessageKeyId is set to " + req.params.chatMessageKeyId);
  // testing - find the socket by going through the array
  var targetsocket = findFirebaseUserSocket(req.params.userFirebaseUID);
  if (targetsocket){
    targetsocket.emit('chat_room_message_incoming', req.body);
  }

  // send the message out to the user's namespace socket connection
  //io.of(req.params.userFirebaseUID).emit('friend_changed', req.body);
  //TODO - check to see if the game they are playing is the same as the game the socket is connected to.
  res.send(req.body);    // echo the result back
});

// TODO verify authentic request -shared secret sign?
app.put('/user/:userFirebaseUID/chat/', function(req, res) {
  console.log("userFirebaseUID is set to " + req.params.userFirebaseUID);
  // testing - find the socket by going through the array
  var targetsocket = findFirebaseUserSocket(req.params.userFirebaseUID);
  if (targetsocket){
    targetsocket.emit('chat_message_incoming', req.body);
  }

  // send the message out to the user's namespace socket connection
  //io.of(req.params.userFirebaseUID).emit('friend_changed', req.body);
  //TODO - check to see if the game they are playing is the same as the game the socket is connected to.
  res.send(req.body);    // echo the result back
});

// TODO verify authentic request -shared secret sign?
app.put('/user/:userFirebaseUID/chat/rooms_changed', function(req, res) {
  console.log("userFirebaseUID is set to " + req.params.userFirebaseUID);
  // testing - find the socket by going through the array
  var targetsocket = findFirebaseUserSocket(req.params.userFirebaseUID);
  if (targetsocket){
    targetsocket.emit('chat_rooms_changed_incoming', req.body);
  }

  // send the message out to the user's namespace socket connection
  //io.of(req.params.userFirebaseUID).emit('friend_changed', req.body);
  //TODO - check to see if the game they are playing is the same as the game the socket is connected to.
  res.send(req.body);    // echo the result back
});

// TODO verify authentic request -shared secret sign?
app.put('/user/:userFirebaseUID/tournaments/list_changed', function(req, res) {
  console.log("userFirebaseUID is set to " + req.params.userFirebaseUID);
  // testing - find the socket by going through the array
  var targetsocket = findFirebaseUserSocket(req.params.userFirebaseUID);
  if (targetsocket){
    targetsocket.emit('tournament_list_changed', req.body);
  }
  // send the message out to the user's namespace socket connection
  //io.of(req.params.userFirebaseUID).emit('friend_changed', req.body);
  //TODO - check to see if the game they are playing is the same as the game the socket is connected to.
  res.send(req.body);    // echo the result back
});

// TODO verify authentic request -shared secret sign?
app.put('/user/:userFirebaseUID/tournament/:tournamentKeyId', function(req, res) {
  console.log("userFirebaseUID is set to " + req.params.userFirebaseUID);
  console.log("tournamentKeyId is set to " + req.params.tournamentKeyId);
  // testing - find the socket by going through the array
  var targetsocket = findFirebaseUserSocket(req.params.userFirebaseUID);
  if (targetsocket){
    targetsocket.emit('tournament_data', req.body);
  }
  // send the message out to the user's namespace socket connection
  //io.of(req.params.userFirebaseUID).emit('friend_changed', req.body);
  //TODO - check to see if the game they are playing is the same as the game the socket is connected to.
  res.send(req.body);    // echo the result back
});

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

//const server = express()
//  .use((req, res) => res.sendFile(INDEX) )
//  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

http.listen(PORT, () => console.log(`Listening on ${ PORT }`));

//const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('disconnect', function() {
    console.log('Client disconnected');
    request.post(
        'https://ue4topia.appspot.com/webhooks/onDisconnect',
        { json: { user_id: socket.firebaseUserId, gameKeyId: socket.gameKeyId } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        }
    );

   } );

    socket.on('authenticate', function(data) {
          console.log('Responding to authenticate command');
          console.log(data);
          var json_obj = JSON.parse(data);
          console.log(json_obj.authString);
          console.log(json_obj.GameKeyId);
          admin.auth().verifyIdToken(json_obj.authString)
          .then(function(decodedToken) {
            var uid = decodedToken.uid;
            console.log(uid);
            // declare the namespace
            //io.of(uid);
            // Save the uid to the client connection
            socket.firebaseUserId = uid;
            socket.encodedToken = json_obj.authString;
            socket.gameKeyId = json_obj.GameKeyId;

            // Call the backend presence function
            request.post(
                'https://ue4topia.appspot.com/webhooks/onConnect',
                { json: { user_id: socket.firebaseUserId, gameKeyId: socket.gameKeyId } },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body)
                    }
                }
            );

            socket.emit('authenticate_success', 'true');



            //io.of(uid).emit('test', 'namespace test');
          }).catch(function(error) {
            socket.emit('authenticate_success', 'false');
            // Handle error
          });
      });
      // end socket.on 'authenticate'

    socket.on('chat_message', function (data) {
      console.log('Responding to chat_message command');
      console.log(socket.firebaseUserId); // This is undefined until authenticate is complete.
      console.log('client sent:',data);
      socket.emit('chat_message', 'Server is echoing your message: ' + data);
    });

    socket.on('set_game', function (data) {
      console.log('Responding to set_game command');
      if (socket.firebaseUserId) {
        console.log(socket.firebaseUserId); // This is undefined until authenticate is complete.
        console.log('client sent:',data);
        socket.gameKeyId = data;




      }
    });


});

// TODO timer to close sockets that did not authenticate
//setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

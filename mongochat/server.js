const mongo = require('mongodb').MongoClient;
const clientServer = require('socket.io').listen(4000).sockets;

// Connect to mono
mongo.connect(
  'mongodb://127.0.0.1/mongochat',
  { useNewUrlParser: true },
  (err, client) => {
    if (err) {
      throw err;
    }

    console.log('MongoDB connected...');

    // Connect to socket.io
    client.on('connection', socket => {
      let chat = client.collection('chats');

      // Create function to send status
      const sendStatus = s => {
        socket.emit('status', s);
      };

      // Get chats from mongo collection
      chat
        .find()
        .limit(100)
        .sort({ _id: 1 })
        .toArray((err, res) => {
          if (err) {
            throw err;
          }
          // Emit the messages
          socket.emit('output', res);
        });

      // Handle Input events
      socket.on('input', data => {
        let name = data.name;
        let message = data.message;

        // Check for name and emssage
        if (name === '' || message === '') {
          // Send error status
          sendStatus('Please enter a name and message');
        } else {
          // Insert message into the database
          chat.insert({ name: name, message: message }, () => {
            clientServer.emit('output', [data]);

            // Send status object
            sendStatus({
              message: 'Message sent',
              clear: true
            });
          });
        }
      });

      // Handle clear
      socket.on('clear', () => {
        // Remove all chats
        chat.remove({}, () => {
          // Emit cleared
          socket.emit('cleared');
        });
      });
    });
  }
);


# Chat

A simple chat demo for socket.io

## How to use

```
$ cd socket.io
$ npm install
$ cd examples/chat
$ npm install
$ node .
```

And point your browser to `http://localhost:3000`. Optionally, specify
a port by supplying the `PORT` env variable.

## Features

- Multiple users can join a chat room by each entering a unique username
on website load.
- Users can type chat messages to the chat room.
- A notification is sent to all users when a user joins or leaves
the chatroom.
- A notification is sent to all users when Battery Status API events are triggered.
- A notification is sent to all users when Ambient Light API events are triggered.
- You can login using HTML5 Fingerprint(after login at least once in the chat and your browser supports).
* Notifications is a message in the channel and message using Notifications API

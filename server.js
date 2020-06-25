const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const app = express();
const server = require("http").createServer(app);
const io = require('socket.io')(server);

const passport = require("./config/passport");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;

io.on("connection", (socket) => {
  socket.on("toggle", (currentState, conversation) => {
    io.emit("toggle", currentState, conversation);
  });
  socket.on("comment", (user, time, conversation) => {
    io.emit("comment", user, time, conversation);
  });
  socket.on("invitation", (maker, joiner, conversationID) => {
    io.emit("invitation", maker, joiner, conversationID);
  });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/audiophile", { useNewUrlParser: true });

server.listen(PORT, function() {
  console.log(`API Server now listening on PORT ${PORT}!`);
});
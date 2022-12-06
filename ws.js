import * as SocketIOClient from "socket.io-client";
import db from "./db.js";
import render from "./render.js";
export default async (channel, iiId) => {
  var socket = SocketIOClient.io('https://www.improved-initiative.com',{
      transports: ['websocket'],
    pingInterval: 1000 * 60 * 5,
    pingTimeout: 1000 * 60 * 3
  });
  // Add a connect listener
  socket.on("connect", function () {
    socket.emit("join encounter", iiId);
     channel.send('connected to improved-initiative' );
  });
  let isTimer = false; 
  socket.on("encounter updated", function (data) {
      const output = [];
      const msg = render(data);
      db.cash[channel.id] = msg;
      db.raw[channel.id] = data;

    if(!isTimer){
        setTimeout(()=>{
          console.log('sedding to '+channel.id); 
          channel.send(db.cash[channel.id]);
          isTimer = false;
        },1200)
        isTimer = true;
    };
    })

  socket.on("disconnect", function () {
    console.log("disconnect");
  });
  return socket
};

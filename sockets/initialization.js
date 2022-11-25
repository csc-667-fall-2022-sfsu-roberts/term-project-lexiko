const socketIO = require("socket.io");
const sessionMiddleware = require("../app-config/session-config");
const Server = socketIO.Server;

const init = (httpServer, app) => {
    const io = new Server(httpServer);

    const wrap = middleware => (socket, next) =>
        middleware(socket.request, {}, next);
    io.use(wrap(sessionMiddleware));

    io.use((socket, next) => {
        const session = socket.request.session;
        if (session && session.authenticated) {
            next();
        } else {
            next(new Error("unauthorized"));
        }
    });

    io.on("connection", (socket) => {
        console.log("Connection happened");
    })

    app.io = io;
};

module.exports = init;
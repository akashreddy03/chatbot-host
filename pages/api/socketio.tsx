import { Server as ServerIO } from "socket.io"
import { Server as NetServer } from "http"
import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/socketiotype";
import getGPTResponse from "../../lib/gpt3";

export default function SocketHandler(req: NextApiRequest, res: NextApiResponseServerIO) {
    if(res.socket.server.io) {
        console.log('Socket Server is already running');
    } else {
        console.log('Scoket is initializing');
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIO(httpServer, {
            path: '/api/socketio/',
        });
        res.socket.server.io = io

        io.on('connection', (socket) => {
            console.log('Connection successfull ', socket.id);

            socket.on('disconnect', () => {
                console.log('Client Disconnected');
            })

            socket.on("message", async (message) => {
                console.log(message);
                const response = await getGPTResponse(message);
                io.emit("message", response);
            })
        })
    }
    res.end();
}
import { io, Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import ChatFooter from "./chatfooter";
import ChatHeader from "./chatheader";
import ChatBody from "./chatbody";

export type IMsg = {
    user: boolean;
    message: string;
}

const socket: Socket = io(`ws://localhost:3000/`, {
    path: '/api/socketio',
    autoConnect: false
});


export default function ChatWindow() {

    const [chat, setChat] = useState<IMsg[]>([]);

    const scrollableRef = useRef<HTMLHeadingElement>(null);
  
    useEffect(() => {
        scrollableRef.current?.scrollIntoView({block: "nearest", inline: "start" });
    }, [chat])

    useEffect(() => {

        socket.connect();

        socket.on("connect", () => {
            console.log("SOCKET Connected", socket.id);
        })

        socket.on("message", (message) => {
            setChat((prevChat) => {
                return [...prevChat, { user:false, message }];
            })
        })

        return () => {
            socket.removeAllListeners();
            socket.disconnect();
        }
        
    }, []);

    return (
        <div className="flex bg-gray-100 dark:bg-neutral-800 flex-col h-full bg-white rounded-lg w-full max-w-4xl shadow-xl">
            <ChatHeader />
            <ChatBody scrollableRef={scrollableRef} chat={chat} />
            <ChatFooter setChat={setChat} socket={socket} />
        </div>
    );
}
